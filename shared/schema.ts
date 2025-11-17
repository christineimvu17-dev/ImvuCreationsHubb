import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(),
  imageUrl: text("image_url").notNull(),
  videoUrl: text("video_url"),
  isGift: boolean("is_gift").notNull().default(false),
  features: text("features").array(),
  loginMethod: text("login_method"),
  vipRequired: boolean("vip_required").notNull().default(false),
  sexRoomNeeded: boolean("sex_room_needed").notNull().default(false),
  pcSupport: boolean("pc_support").notNull().default(true),
  mobileSupport: boolean("mobile_support").notNull().default(true),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type ProductWithRatings = Product & {
  averageRating: number;
  reviewCount: number;
};

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: text("order_id").notNull().unique(),
  imvuId: text("imvu_id").notNull(),
  email: text("email").notNull(),
  productId: varchar("product_id"),
  productName: text("product_name"),
  subtotal: integer("subtotal").notNull().default(0),
  total: integer("total").notNull().default(0),
  paymentMethod: text("payment_method").notNull(),
  transactionId: text("transaction_id"),
  screenshotUrl: text("screenshot_url"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull(),
  productId: varchar("product_id").notNull(),
  productName: text("product_name").notNull(),
  productImageUrl: text("product_image_url"),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull().default(1),
  lineTotal: integer("line_total").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  orderId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
  createdAt: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type OrderWithItems = Order & {
  items: OrderItem[];
};

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  sender: text("sender").notNull(),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export const contactForms = pgTable("contact_forms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  imvuUsername: text("imvu_username").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertContactFormSchema = createInsertSchema(contactForms).omit({
  id: true,
  createdAt: true,
});

export type InsertContactForm = z.infer<typeof insertContactFormSchema>;
export type ContactForm = typeof contactForms.$inferSelect;

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  rating: integer("rating").notNull(),
  reviewText: text("review_text").notNull(),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  approved: true,
  createdAt: true,
}).extend({
  rating: z.number().min(1).max(5),
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true,
});

export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;

export const siteReviews = pgTable("site_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reviewerName: text("reviewer_name").notNull(),
  reviewText: text("review_text").notNull(),
  rating: integer("rating").notNull(),
  displayDate: timestamp("display_date").notNull(),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertSiteReviewSchema = createInsertSchema(siteReviews).omit({
  id: true,
  approved: true,
  createdAt: true,
}).extend({
  rating: z.number().min(1).max(5),
  displayDate: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
});

export const insertPublicSiteReviewSchema = createInsertSchema(siteReviews).omit({
  id: true,
  approved: true,
  displayDate: true,
  createdAt: true,
}).extend({
  rating: z.number().min(1).max(5),
});

export type InsertSiteReview = z.infer<typeof insertSiteReviewSchema>;
export type InsertPublicSiteReview = z.infer<typeof insertPublicSiteReviewSchema>;
export type SiteReview = typeof siteReviews.$inferSelect;
