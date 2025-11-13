import { storage } from "./storage";

const SAMPLE_PRODUCTS = [
  { name: "Premium Trigger Pack 1", description: "Smooth animations and exclusive triggers for your IMVU avatar", price: 2999, category: "triggers", type: "permanent", imageUrl: "/generated_images/Premium_trigger_product_icon_bce9e655.png", videoUrl: null },
  { name: "Premium Trigger Pack 2", description: "Advanced trigger collection with unique effects", price: 3499, category: "triggers", type: "permanent", imageUrl: "/generated_images/Premium_trigger_product_icon_bce9e655.png", videoUrl: null },
  { name: "Premium Trigger Pack 3", description: "Elite trigger bundle with premium animations", price: 3999, category: "triggers", type: "permanent", imageUrl: "/generated_images/Premium_trigger_product_icon_bce9e655.png", videoUrl: null },
  { name: "Premium Trigger Pack 4", description: "Exclusive high-end trigger collection", price: 4499, category: "triggers", type: "permanent", imageUrl: "/generated_images/Premium_trigger_product_icon_bce9e655.png", videoUrl: null },
  { name: "Premium Trigger Pack 5", description: "Ultimate trigger experience pack", price: 4999, category: "triggers", type: "permanent", imageUrl: "/generated_images/Premium_trigger_product_icon_bce9e655.png", videoUrl: null },
  { name: "Premium Trigger Pack 6", description: "Master collection with rare triggers", price: 5499, category: "triggers", type: "permanent", imageUrl: "/generated_images/Premium_trigger_product_icon_bce9e655.png", videoUrl: null },
  { name: "Gifting Trigger Bundle 1", description: "Perfect gift triggers for friends", price: 1999, category: "triggers", type: "gifting", imageUrl: "/generated_images/Gifting_trigger_icon_d54ee4bc.png", videoUrl: null },
  { name: "Gifting Trigger Bundle 2", description: "Special gifting trigger collection", price: 2499, category: "triggers", type: "gifting", imageUrl: "/generated_images/Gifting_trigger_icon_d54ee4bc.png", videoUrl: null },
  { name: "Luxury Room Collection 1", description: "Stunning 3D room with neon aesthetics", price: 4999, category: "rooms", type: "permanent", imageUrl: "/generated_images/Virtual_room_product_preview_0f22295e.png", videoUrl: null },
  { name: "Luxury Room Collection 2", description: "Premium virtual space with modern design", price: 5499, category: "rooms", type: "permanent", imageUrl: "/generated_images/Virtual_room_product_preview_0f22295e.png", videoUrl: null },
  { name: "Luxury Room Collection 3", description: "Exclusive high-tech gaming room", price: 5999, category: "rooms", type: "permanent", imageUrl: "/generated_images/Virtual_room_product_preview_0f22295e.png", videoUrl: null },
  { name: "Luxury Room Collection 4", description: "Elite virtual environment setup", price: 6499, category: "rooms", type: "permanent", imageUrl: "/generated_images/Virtual_room_product_preview_0f22295e.png", videoUrl: null },
  { name: "Luxury Room Collection 5", description: "Ultimate room experience pack", price: 6999, category: "rooms", type: "permanent", imageUrl: "/generated_images/Virtual_room_product_preview_0f22295e.png", videoUrl: null },
  { name: "Luxury Room Collection 6", description: "Master room collection with extras", price: 7499, category: "rooms", type: "permanent", imageUrl: "/generated_images/Virtual_room_product_preview_0f22295e.png", videoUrl: null },
  { name: "Gifting Room Bundle 1", description: "Beautiful room gift for friends", price: 3999, category: "rooms", type: "gifting", imageUrl: "/generated_images/Virtual_room_product_preview_0f22295e.png", videoUrl: null },
  { name: "Gifting Room Bundle 2", description: "Premium gifting room collection", price: 4499, category: "rooms", type: "gifting", imageUrl: "/generated_images/Virtual_room_product_preview_0f22295e.png", videoUrl: null },
  { name: "Gifting Room Bundle 3", description: "Exclusive gifting room package", price: 4999, category: "rooms", type: "gifting", imageUrl: "/generated_images/Virtual_room_product_preview_0f22295e.png", videoUrl: null },
  { name: "Ultimate Bundle Pack 1", description: "Room + Trigger combo with exclusive bonuses", price: 8999, category: "bundles", type: "permanent", imageUrl: "/generated_images/Bundle_offer_icon_2dab81cb.png", videoUrl: null },
  { name: "Ultimate Bundle Pack 2", description: "Premium combo with rare items", price: 9999, category: "bundles", type: "permanent", imageUrl: "/generated_images/Bundle_offer_icon_2dab81cb.png", videoUrl: null },
  { name: "Ultimate Bundle Pack 3", description: "Master bundle with everything included", price: 11999, category: "bundles", type: "permanent", imageUrl: "/generated_images/Bundle_offer_icon_2dab81cb.png", videoUrl: null },
];

async function seedDatabase() {
  console.log("Seeding database with products...");
  
  try {
    const existingProducts = await storage.getProducts();
    
    if (existingProducts.length > 0) {
      console.log(`Database already has ${existingProducts.length} products. Skipping seed.`);
      return;
    }

    for (const product of SAMPLE_PRODUCTS) {
      await storage.createProduct(product);
    }
    
    console.log(`Successfully seeded ${SAMPLE_PRODUCTS.length} products!`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seedDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
