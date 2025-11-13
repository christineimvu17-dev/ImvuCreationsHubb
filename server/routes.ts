import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { randomBytes } from "crypto";
import { insertOrderSchema, insertChatMessageSchema, insertContactFormSchema, insertReviewSchema, insertProductSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import path from "path";
import fs from "fs";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

const productMediaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploaded_assets", "products");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${randomBytes(6).toString('hex')}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const productMediaUpload = multer({
  storage: productMediaStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  }
});

const PAYMENT_WEBHOOK_URL = process.env.PAYMENT_WEBHOOK_URL || "";
const STATUS_WEBHOOK_URL = process.env.STATUS_WEBHOOK_URL || "";

if (!process.env.ADMIN_PASSWORD) {
  console.error("FATAL: ADMIN_PASSWORD environment variable is not set");
  console.error("Please set ADMIN_PASSWORD in your environment to enable admin access");
  process.exit(1);
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const adminSessions = new Set<string>();

function generateSessionToken(): string {
  return randomBytes(32).toString('hex');
}

function requireAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const token = authHeader.substring(7);
  if (!adminSessions.has(token)) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
  
  next();
}

async function sendDiscordWebhook(url: string, content: string, embeds?: any[]) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, embeds }),
    });
    
    if (!response.ok) {
      console.error("Discord webhook failed:", await response.text());
    }
  } catch (error) {
    console.error("Error sending Discord webhook:", error);
  }
}

async function uploadToDiscord(webhookUrl: string, file: Buffer, filename: string, embeds?: any[]) {
  try {
    const formData = new FormData();
    formData.append("file", new Blob([file]), filename);
    if (embeds) {
      formData.append("payload_json", JSON.stringify({ embeds }));
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Discord file upload failed:", await response.text());
    }
  } catch (error) {
    console.error("Error uploading to Discord:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.json(order);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders/track", async (req, res) => {
    try {
      const search = req.query.search as string;
      
      if (!search) {
        return res.status(400).json({ error: "Search parameter is required" });
      }

      const trimmedSearch = search.trim();
      
      let order;
      if (trimmedSearch.includes("@")) {
        order = await storage.getOrderByEmail(trimmedSearch.toLowerCase());
      } else {
        order = await storage.getOrderByOrderId(trimmedSearch);
      }

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.post("/api/payment-upload", upload.single("screenshot"), async (req, res) => {
    try {
      const { imvuId, email, transactionId, productId, productName, paymentMethod } = req.body;
      const screenshot = req.file;

      if (!imvuId || !email || !transactionId || !productId || !productName || !paymentMethod) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (!screenshot) {
        return res.status(400).json({ error: "Payment screenshot is required" });
      }

      const order = await storage.createOrder({
        imvuId,
        email,
        productId,
        productName,
        paymentMethod,
        transactionId,
        screenshotUrl: screenshot.originalname,
        status: "pending",
      });

      const embed = {
        title: "💳 New Payment Proof Submitted",
        color: 0xa855f7,
        fields: [
          { name: "Order ID", value: order.orderId, inline: true },
          { name: "IMVU ID", value: imvuId, inline: true },
          { name: "Email", value: email, inline: false },
          { name: "Product", value: productName, inline: false },
          { name: "Payment Method", value: paymentMethod, inline: true },
          { name: "Transaction ID", value: transactionId, inline: true },
          { name: "Status", value: "Pending Verification", inline: false },
        ],
        timestamp: new Date().toISOString(),
      };

      await uploadToDiscord(PAYMENT_WEBHOOK_URL, screenshot.buffer, screenshot.originalname, [embed]);

      res.json({ success: true, orderId: order.orderId });
    } catch (error) {
      console.error("Payment upload error:", error);
      res.status(500).json({ error: "Failed to upload payment proof" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactFormSchema.parse(req.body);
      const contactForm = await storage.createContactForm(validatedData);

      await sendDiscordWebhook(
        STATUS_WEBHOOK_URL,
        "📬 **New Contact Form Submission**",
        [{
          title: "Contact Form",
          color: 0x3b82f6,
          fields: [
            { name: "Name", value: validatedData.name, inline: true },
            { name: "Email", value: validatedData.email, inline: true },
            { name: "IMVU Username", value: validatedData.imvuUsername, inline: false },
            { name: "Message", value: validatedData.message, inline: false },
          ],
          timestamp: new Date().toISOString(),
        }]
      );

      res.json({ success: true, id: contactForm.id });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const chatMessage = await storage.createChatMessage(validatedData);
      res.json({ success: true, message: chatMessage });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to save chat message" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (password === ADMIN_PASSWORD) {
        const token = generateSessionToken();
        adminSessions.add(token);
        res.json({ success: true, token });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        adminSessions.delete(token);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Logout failed" });
    }
  });

  app.get("/api/admin/orders", requireAdmin, async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const orders = await storage.getAllOrders(status);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.patch("/api/admin/orders/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["pending", "processing", "completed", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const order = await storage.updateOrderStatus(id, status);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const statusMessages: Record<string, string> = {
        pending: "Awaiting payment confirmation",
        processing: "Your order is being completed",
        completed: "Your product has been delivered",
        rejected: "Payment not verified, please contact support",
      };

      await sendDiscordWebhook(
        STATUS_WEBHOOK_URL,
        "📦 **Order Status Updated**",
        [{
          title: `Order ${order.orderId}`,
          color: status === "completed" ? 0x10b981 : status === "rejected" ? 0xef4444 : 0xa855f7,
          fields: [
            { name: "Order ID", value: order.orderId, inline: true },
            { name: "Status", value: status.toUpperCase(), inline: true },
            { name: "Product", value: order.productName, inline: false },
            { name: "IMVU ID", value: order.imvuId, inline: true },
            { name: "Email", value: order.email, inline: true },
            { name: "Message", value: statusMessages[status], inline: false },
          ],
          timestamp: new Date().toISOString(),
        }]
      );

      res.json({ success: true, order });
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  });

  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.json({ success: true, product });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.patch("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.updateProduct(id, req.body);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProduct(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  app.get("/api/admin/reviews", requireAdmin, async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      let reviews;
      
      if (status === "pending") {
        reviews = await storage.getPendingReviews();
      } else {
        reviews = await storage.getAllReviews();
      }
      
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.patch("/api/admin/reviews/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { action } = req.body;

      if (action === "approve") {
        const review = await storage.approveReview(id);
        if (!review) {
          return res.status(404).json({ error: "Review not found" });
        }
        res.json({ success: true, review });
      } else if (action === "reject") {
        await storage.rejectReview(id);
        res.json({ success: true });
      } else {
        res.status(400).json({ error: "Invalid action" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update review" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.json({ success: true, review });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create review" });
    }
  });

  app.get("/api/reviews/:productId", async (req, res) => {
    try {
      const { productId } = req.params;
      const reviews = await storage.getReviewsByProductId(productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/admin/upload-media", requireAdmin, productMediaUpload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileUrl = `/uploaded_assets/products/${req.file.filename}`;
      res.json({ success: true, url: fileUrl });
    } catch (error: any) {
      console.error("File upload error:", error);
      res.status(500).json({ error: error.message || "Failed to upload file" });
    }
  });

  app.use("/uploaded_assets", (req, res, next) => {
    const express = require("express");
    express.static(path.join(process.cwd(), "uploaded_assets"))(req, res, next);
  });

  const httpServer = createServer(app);
  return httpServer;
}
