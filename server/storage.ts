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
  products as productsTable,
  orders as ordersTable,
  chatMessages as chatMessagesTable,
  contactForms as contactFormsTable,
  reviews as reviewsTable,
  admins as adminsTable,
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
  
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
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
        averageRating: sqlOp<number>`COALESCE(AVG(${reviewsTable.rating}), 0)`,
        reviewCount: sqlOp<number>`COUNT(${reviewsTable.id})`,
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
      .where(eq(reviewsTable.productId, productId))
      .orderBy(desc(reviewsTable.createdAt));
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
}

export const storage = new DatabaseStorage();
