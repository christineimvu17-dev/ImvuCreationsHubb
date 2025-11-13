import { neon } from "@neondatabase/serverless";
import {
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type ChatMessage,
  type InsertChatMessage,
  type ContactForm,
  type InsertContactForm,
  products as productsTable,
  orders as ordersTable,
  chatMessages as chatMessagesTable,
  contactForms as contactFormsTable,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc, ilike } from "drizzle-orm";
import { randomUUID } from "crypto";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrderByOrderId(orderId: string): Promise<Order | undefined>;
  getOrderByEmail(email: string): Promise<Order | undefined>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(): Promise<ChatMessage[]>;
  
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return db.select().from(productsTable);
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
}

export const storage = new DatabaseStorage();
