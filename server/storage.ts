import { neon } from "@neondatabase/serverless";
import {
  type Product,
  type ProductWithRatings,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type ChatMessage,
  type InsertChatMessage,
  type ContactForm,
  type InsertContactForm,
  type Review,
  type InsertReview,
  type Admin,
  type InsertAdmin,
  type SiteReview,
  type InsertSiteReview,
  products as productsTable,
  orders as ordersTable,
  chatMessages as chatMessagesTable,
  contactForms as contactFormsTable,
  reviews as reviewsTable,
  admins as adminsTable,
  siteReviews as siteReviewsTable,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc, ilike, sql as sqlOp, avg, count } from "drizzle-orm";
import { randomUUID } from "crypto";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  getProducts(): Promise<ProductWithRatings[]>;
  getProductById(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrderByOrderId(orderId: string): Promise<Order | undefined>;
  getOrderByEmail(email: string): Promise<Order | undefined>;
  getAllOrders(status?: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(): Promise<ChatMessage[]>;
  
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
  
  createReview(review: InsertReview): Promise<Review>;
  getReviewsByProductId(productId: string): Promise<Review[]>;
  getAllReviews(): Promise<Review[]>;
  getPendingReviews(): Promise<Review[]>;
  approveReview(id: string): Promise<Review | undefined>;
  rejectReview(id: string): Promise<void>;
  
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  
  createSiteReview(review: InsertSiteReview): Promise<SiteReview>;
  getAllSiteReviews(): Promise<SiteReview[]>;
  deleteSiteReview(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<ProductWithRatings[]> {
    const productsWithRatings = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        description: productsTable.description,
        price: productsTable.price,
        category: productsTable.category,
        type: productsTable.type,
        imageUrl: productsTable.imageUrl,
        videoUrl: productsTable.videoUrl,
        isGift: productsTable.isGift,
        features: productsTable.features,
        loginMethod: productsTable.loginMethod,
        vipRequired: productsTable.vipRequired,
        sexRoomNeeded: productsTable.sexRoomNeeded,
        pcSupport: productsTable.pcSupport,
        mobileSupport: productsTable.mobileSupport,
        averageRating: sqlOp<number>`COALESCE(AVG(CASE WHEN ${reviewsTable.approved} = true THEN ${reviewsTable.rating} END), 0)`,
        reviewCount: sqlOp<number>`COUNT(CASE WHEN ${reviewsTable.approved} = true THEN 1 END)`,
      })
      .from(productsTable)
      .leftJoin(reviewsTable, eq(productsTable.id, reviewsTable.productId))
      .groupBy(productsTable.id);

    return productsWithRatings.map(p => ({
      ...p,
      averageRating: Number(p.averageRating) || 0,
      reviewCount: Number(p.reviewCount) || 0,
    }));
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(productsTable)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(productsTable)
      .set(product)
      .where(eq(productsTable.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(productsTable).where(eq(productsTable.id, id));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const orderId = `BM-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    const [newOrder] = await db
      .insert(ordersTable)
      .values({
        ...order,
        orderId,
      })
      .returning();
    return newOrder;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id));
    return order;
  }

  async getOrderByOrderId(orderId: string): Promise<Order | undefined> {
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.orderId, orderId));
    return order;
  }

  async getOrderByEmail(email: string): Promise<Order | undefined> {
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(ilike(ordersTable.email, email))
      .orderBy(desc(ordersTable.createdAt));
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(ordersTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(ordersTable.id, id))
      .returning();
    return updatedOrder;
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db
      .insert(chatMessagesTable)
      .values(message)
      .returning();
    return newMessage;
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return db.select().from(chatMessagesTable);
  }

  async createContactForm(form: InsertContactForm): Promise<ContactForm> {
    const [newForm] = await db
      .insert(contactFormsTable)
      .values(form)
      .returning();
    return newForm;
  }

  async getAllOrders(status?: string): Promise<Order[]> {
    if (status) {
      return db
        .select()
        .from(ordersTable)
        .where(eq(ordersTable.status, status))
        .orderBy(desc(ordersTable.createdAt));
    }
    return db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db
      .insert(reviewsTable)
      .values(review)
      .returning();
    return newReview;
  }

  async getReviewsByProductId(productId: string): Promise<Review[]> {
    return db
      .select()
      .from(reviewsTable)
      .where(sqlOp`${reviewsTable.productId} = ${productId} AND ${reviewsTable.approved} = true`)
      .orderBy(desc(reviewsTable.createdAt));
  }

  async getAllReviews(): Promise<Review[]> {
    return db
      .select()
      .from(reviewsTable)
      .orderBy(desc(reviewsTable.createdAt));
  }

  async getPendingReviews(): Promise<Review[]> {
    return db
      .select()
      .from(reviewsTable)
      .where(eq(reviewsTable.approved, false))
      .orderBy(desc(reviewsTable.createdAt));
  }

  async approveReview(id: string): Promise<Review | undefined> {
    const [approvedReview] = await db
      .update(reviewsTable)
      .set({ approved: true })
      .where(eq(reviewsTable.id, id))
      .returning();
    return approvedReview;
  }

  async rejectReview(id: string): Promise<void> {
    await db.delete(reviewsTable).where(eq(reviewsTable.id, id));
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db
      .select()
      .from(adminsTable)
      .where(eq(adminsTable.username, username));
    return admin;
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const [newAdmin] = await db
      .insert(adminsTable)
      .values(admin)
      .returning();
    return newAdmin;
  }

  async createSiteReview(review: InsertSiteReview): Promise<SiteReview> {
    const [newReview] = await db
      .insert(siteReviewsTable)
      .values(review)
      .returning();
    return newReview;
  }

  async getAllSiteReviews(): Promise<SiteReview[]> {
    return db
      .select()
      .from(siteReviewsTable)
      .orderBy(desc(siteReviewsTable.displayDate));
  }

  async deleteSiteReview(id: string): Promise<void> {
    await db.delete(siteReviewsTable).where(eq(siteReviewsTable.id, id));
  }
}

export const storage = new DatabaseStorage();
