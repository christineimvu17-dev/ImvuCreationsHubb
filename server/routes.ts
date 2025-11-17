import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { randomBytes } from "crypto";
import { insertOrderSchema, insertChatMessageSchema, insertContactFormSchema, insertReviewSchema, insertProductSchema, insertSiteReviewSchema } from "@shared/schema";
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
  app.use("/uploaded_assets", express.static(path.join(process.cwd(), "uploaded_assets")));
  app.use("/attached_assets", express.static(path.join(process.cwd(), "attached_assets")));

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
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, validatedData);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ success: true, product });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
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

  app.get("/api/site-reviews", async (req, res) => {
    try {
      const reviews = await storage.getApprovedSiteReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch site reviews" });
    }
  });

  app.post("/api/site-reviews", async (req, res) => {
    try {
      const { insertPublicSiteReviewSchema } = await import("@shared/schema");
      const validatedData = insertPublicSiteReviewSchema.parse(req.body);
      const review = await storage.createSiteReview({
        ...validatedData,
        displayDate: new Date(),
      });
      res.json({ success: true, review, message: "Thank you for your review! It will be published after approval." });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to submit review" });
    }
  });

  app.get("/api/admin/site-reviews", requireAdmin, async (req, res) => {
    try {
      const reviews = await storage.getAllSiteReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch site reviews" });
    }
  });

  app.post("/api/admin/site-reviews", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertSiteReviewSchema.parse(req.body);
      const review = await storage.createSiteReview(validatedData);
      res.json({ success: true, review });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create site review" });
    }
  });

  app.patch("/api/admin/site-reviews/:id/approve", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const review = await storage.approveSiteReview(id);
      res.json({ success: true, review });
    } catch (error) {
      res.status(500).json({ error: "Failed to approve site review" });
    }
  });

  app.delete("/api/admin/site-reviews/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteSiteReview(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete site review" });
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

  app.post("/api/admin/seed-products", requireAdmin, async (req, res) => {
    try {
      const seedProducts = [
        { id: '64dd98ef-5cef-486b-870b-845f12618a3f', name: 'BBC KING V5', description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 5399, category: 'triggers' as const, type: 'Permanent', imageUrl: '/uploaded_assets/products/bbc king v5_1763085064531.jpg', videoUrl: null, isGift: false, features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Premium Trigger'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: true, pcSupport: true, mobileSupport: true },
        { id: '169f4537-bab3-4c1f-8479-841fa33a1e9a', name: 'BBC King (Gifting)', description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nGifting Method (No login required) secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 3899, category: 'triggers' as const, type: 'Gifting', imageUrl: '/uploaded_assets/products/bbc king_1763085064531.jpg', videoUrl: null, isGift: true, features: ['Gifting Method (No Login)', 'Permanent Warranty (Extra Costs)', 'Works on both PC & Mobile'], loginMethod: 'Gift', vipRequired: false, sexRoomNeeded: true, pcSupport: true, mobileSupport: true },
        { id: 'c5a434a9-3fec-4188-9b38-0b85fe8e096c', name: 'Deluxe Room', description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 3999, category: 'rooms' as const, type: 'Premium', imageUrl: '/attached_assets/generated_images/Deluxe_Room_Thumbnail_473ee414.png', videoUrl: '/uploaded_assets/products/delux room_1763085064531.mp4', isGift: false, features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', 'Bestseller'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: false, pcSupport: true, mobileSupport: true },
        { id: 'dee205cb-6875-46bb-ac49-f665f8967abb', name: 'Double Room Offer', description: 'Buy any 2 Rooms + Get 1 Permanent Trigger FREE! Most Popular Room Pack - Save More. Perfect for Couples & RP Players. Best Value Deal!', price: 5999, category: 'bundles' as const, type: 'Bundle', imageUrl: '/uploaded_assets/products/threesome room_1763085064533.mp4', videoUrl: null, isGift: false, features: ['Buy any 2 Rooms + Get 1 Permanent Trigger FREE', 'Most Popular Room Pack', 'Save More', 'Perfect for Couples & RP Players', 'Best Value Deal'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: false, pcSupport: true, mobileSupport: true },
        { id: 'c14b5bda-cdd2-4951-a788-3fe290d75428', name: 'Female Trigger', description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 3899, category: 'triggers' as const, type: 'Permanent', imageUrl: '/uploaded_assets/products/female trigger_1763085064532.jpg', videoUrl: null, isGift: false, features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'For Female'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: true, pcSupport: true, mobileSupport: true },
        { id: '55b9dc18-a282-4724-9239-8d7eb9191148', name: 'King Cummy', description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 3499, category: 'triggers' as const, type: 'Permanent', imageUrl: '/uploaded_assets/products/king cummy_1763085064532.jpg', videoUrl: null, isGift: false, features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Cheapest Price'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: true, pcSupport: true, mobileSupport: true },
        { id: '23514adb-2e73-45d3-9982-bbd8c9a15d74', name: 'King Kong V4', description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 3999, category: 'triggers' as const, type: 'Permanent', imageUrl: '/uploaded_assets/products/king kong v4_1763085064532.jpg', videoUrl: null, isGift: false, features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Realistic'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: true, pcSupport: true, mobileSupport: true },
        { id: '6826ce21-c5a4-4363-a3fe-fc8757e036e0', name: 'Kong Ultra (Gifting)', description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nGifting Method (No login required) secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 4299, category: 'triggers' as const, type: 'Gifting', imageUrl: '/uploaded_assets/products/kong ultra_1763085064532.jpg', videoUrl: null, isGift: true, features: ['Gifting Method (No Login)', 'Permanent Warranty (Extra Costs)', 'Works on both PC & Mobile'], loginMethod: 'Gift', vipRequired: false, sexRoomNeeded: true, pcSupport: true, mobileSupport: true },
        { id: '749cdeef-b4eb-4caa-969c-ef1c719263b1', name: 'Modern Apartment', description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 3799, category: 'rooms' as const, type: 'Premium', imageUrl: '/attached_assets/generated_images/Modern_Apartment_Thumbnail_d17f2723.png', videoUrl: '/uploaded_assets/products/modern apartment_1763085064532.mp4', isGift: false, features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', 'Premium'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: false, pcSupport: true, mobileSupport: true },
        { id: '09cfe739-a04e-4099-a563-4f7953f7ea21', name: 'Pink Room', description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 3799, category: 'rooms' as const, type: 'Premium', imageUrl: '/attached_assets/generated_images/Pink_Room_Thumbnail_f80f6036.png', videoUrl: '/uploaded_assets/products/pink room_1763085064533.mp4', isGift: false, features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', 'Girl\'s Favourite'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: false, pcSupport: true, mobileSupport: true },
        { id: '1f7ad20e-188b-47b0-8f30-6c5f16674d5a', name: 'Realistic King Cummy', description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 4999, category: 'triggers' as const, type: 'Permanent', imageUrl: '/uploaded_assets/products/realistic king cummy_1763085064533.jpg', videoUrl: null, isGift: false, features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Perfect One'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: true, pcSupport: true, mobileSupport: true },
        { id: 'a8a329ad-1190-479e-adb7-89ff555c3a47', name: 'Resort Room', description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 3999, category: 'rooms' as const, type: 'Premium', imageUrl: '/attached_assets/generated_images/Resort_Room_Thumbnail_74c295c9.png', videoUrl: '/uploaded_assets/products/resort room_1763085064533.mp4', isGift: false, features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', 'Luxury'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: false, pcSupport: true, mobileSupport: true },
        { id: '4e986709-7795-439a-a447-f6c82383a39e', name: 'Room + Trigger Combo', description: 'Buy any 1 Room + any 1 Permanent Trigger. Best Budget Combo - Perfect for New Buyers with Instant Delivery and Permanent Warranty Included!', price: 5699, category: 'bundles' as const, type: 'Bundle', imageUrl: '/uploaded_assets/products/delux room_1763085064531.mp4', videoUrl: null, isGift: false, features: ['Buy any 1 Room + any 1 Permanent Trigger', 'Best Budget Combo', 'Perfect for New Buyers', 'Instant Delivery', 'Permanent Warranty Included'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: false, pcSupport: true, mobileSupport: true },
        { id: 'bf9e9e03-a0e6-4066-80cb-c931fe94d80e', name: 'Threesome Room', description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 4399, category: 'rooms' as const, type: 'Premium', imageUrl: '/attached_assets/generated_images/Threesome_Room_Thumbnail_9e0f8e2d.png', videoUrl: '/uploaded_assets/products/threesome room_1763085064533.mp4', isGift: false, features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', '3some / 4some'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: false, pcSupport: true, mobileSupport: true },
        { id: 'cf62b321-79fc-4c9e-922c-3e0a0553f21c', name: 'Ultimate Starter Pack', description: '💎 The Complete Starter Package for New Users – Get everything you need to start your IMVU journey! This exclusive bundle includes 1 Premium Trigger, 1 Sex Room, and Premium Support. Perfect for beginners who want the full BM Creations experience. 18+ Long Premium Poses, High-Quality Animations, Permanent Warranty – enjoy lifetime support and updates, Login Method Required – secure and fast delivery, Poses Type - Timerless, PC & Mobile Supported – fully compatible on all devices, One-Time Platinum VIP Needed – no repeated purchases.', price: 7999, category: 'bundles' as const, type: 'Bundle', imageUrl: '/uploaded_assets/products/delux room_1763085064531.mp4', videoUrl: null, isGift: false, features: ['1 Premium Permanent Trigger (King Cummy)', '1 Premium Sex Room (Modern Apartment)', 'Lifetime warranty on all items', 'Priority customer support', 'PC & Mobile compatible', 'Instant delivery'], loginMethod: 'IMVU Account', vipRequired: false, sexRoomNeeded: false, pcSupport: true, mobileSupport: true },
        { id: '31c42bf2-118f-450c-be79-e324b49f8d22', name: 'Venom V3', description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases', price: 5099, category: 'triggers' as const, type: 'Permanent', imageUrl: '/uploaded_assets/products/venom 3_1763085064533.jpg', videoUrl: null, isGift: false, features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Biggest From All'], loginMethod: 'Guest/AP', vipRequired: false, sexRoomNeeded: true, pcSupport: true, mobileSupport: true }
      ];

      for (const product of seedProducts) {
        await storage.createProduct(product);
      }

      res.json({ success: true, message: `Successfully seeded ${seedProducts.length} products`, count: seedProducts.length });
    } catch (error: any) {
      console.error("Seed error:", error);
      res.status(500).json({ error: error.message || "Failed to seed products" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
