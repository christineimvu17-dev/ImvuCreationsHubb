import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { insertOrderSchema, insertChatMessageSchema, insertContactFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

const PAYMENT_WEBHOOK_URL = process.env.PAYMENT_WEBHOOK_URL || "";
const STATUS_WEBHOOK_URL = process.env.STATUS_WEBHOOK_URL || "";

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

  app.post("/api/orders/:id/status", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
