import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { products } from './shared/schema';

// This script seeds the production database with all products
// Run this ONCE with your production DATABASE_URL

async function seedProduction() {
  console.log('🌱 Starting production database seed...');
  
  // You'll need to provide your PRODUCTION database URL
  const productionDbUrl = process.env.PRODUCTION_DATABASE_URL;
  
  if (!productionDbUrl) {
    console.error('❌ Error: PRODUCTION_DATABASE_URL environment variable not set');
    console.log('Please set it temporarily to run this seed script');
    process.exit(1);
  }

  const sql = neon(productionDbUrl);
  const db = drizzle(sql);

  // All 16 products from development
  const productsData = [
    {
      id: '64dd98ef-5cef-486b-870b-845f12618a3f',
      name: 'BBC KING V5',
      description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 5399,
      category: 'triggers' as const,
      type: 'Permanent',
      imageUrl: '/uploaded_assets/products/bbc king v5_1763085064531.jpg',
      videoUrl: null,
      isGift: false,
      features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Premium Trigger'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: true,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: '169f4537-bab3-4c1f-8479-841fa33a1e9a',
      name: 'BBC King (Gifting)',
      description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nGifting Method (No login required) secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 3899,
      category: 'triggers' as const,
      type: 'Gifting',
      imageUrl: '/uploaded_assets/products/bbc king_1763085064531.jpg',
      videoUrl: null,
      isGift: true,
      features: ['Gifting Method (No Login)', 'Permanent Warranty (Extra Costs)', 'Works on both PC & Mobile'],
      loginMethod: 'Gift',
      vipRequired: false,
      sexRoomNeeded: true,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: 'c5a434a9-3fec-4188-9b38-0b85fe8e096c',
      name: 'Deluxe Room',
      description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 3999,
      category: 'rooms' as const,
      type: 'Premium',
      imageUrl: '/attached_assets/generated_images/Deluxe_Room_Thumbnail_473ee414.png',
      videoUrl: '/uploaded_assets/products/delux room_1763085064531.mp4',
      isGift: false,
      features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', 'Bestseller'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: false,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: 'dee205cb-6875-46bb-ac49-f665f8967abb',
      name: 'Double Room Offer',
      description: 'Buy any 2 Rooms + Get 1 Permanent Trigger FREE! Most Popular Room Pack - Save More. Perfect for Couples & RP Players. Best Value Deal!',
      price: 5999,
      category: 'bundles' as const,
      type: 'Bundle',
      imageUrl: '/uploaded_assets/products/threesome room_1763085064533.mp4',
      videoUrl: null,
      isGift: false,
      features: ['Buy any 2 Rooms + Get 1 Permanent Trigger FREE', 'Most Popular Room Pack', 'Save More', 'Perfect for Couples & RP Players', 'Best Value Deal'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: false,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: 'c14b5bda-cdd2-4951-a788-3fe290d75428',
      name: 'Female Trigger',
      description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 3899,
      category: 'triggers' as const,
      type: 'Permanent',
      imageUrl: '/uploaded_assets/products/female trigger_1763085064532.jpg',
      videoUrl: null,
      isGift: false,
      features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'For Female'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: true,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: '55b9dc18-a282-4724-9239-8d7eb9191148',
      name: 'King Cummy',
      description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 3499,
      category: 'triggers' as const,
      type: 'Permanent',
      imageUrl: '/uploaded_assets/products/king cummy_1763085064532.jpg',
      videoUrl: null,
      isGift: false,
      features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Cheapest Price'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: true,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: '23514adb-2e73-45d3-9982-bbd8c9a15d74',
      name: 'King Kong V4',
      description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 3999,
      category: 'triggers' as const,
      type: 'Permanent',
      imageUrl: '/uploaded_assets/products/king kong v4_1763085064532.jpg',
      videoUrl: null,
      isGift: false,
      features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Realistic'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: true,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: '6826ce21-c5a4-4363-a3fe-fc8757e036e0',
      name: 'Kong Ultra (Gifting)',
      description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nGifting Method (No login required) secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 4299,
      category: 'triggers' as const,
      type: 'Gifting',
      imageUrl: '/uploaded_assets/products/kong ultra_1763085064532.jpg',
      videoUrl: null,
      isGift: true,
      features: ['Gifting Method (No Login)', 'Permanent Warranty (Extra Costs)', 'Works on both PC & Mobile'],
      loginMethod: 'Gift',
      vipRequired: false,
      sexRoomNeeded: true,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: '749cdeef-b4eb-4caa-969c-ef1c719263b1',
      name: 'Modern Apartment',
      description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 3799,
      category: 'rooms' as const,
      type: 'Premium',
      imageUrl: '/attached_assets/generated_images/Modern_Apartment_Thumbnail_d17f2723.png',
      videoUrl: '/uploaded_assets/products/modern apartment_1763085064532.mp4',
      isGift: false,
      features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', 'Premium'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: false,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: '09cfe739-a04e-4099-a563-4f7953f7ea21',
      name: 'Pink Room',
      description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 3799,
      category: 'rooms' as const,
      type: 'Premium',
      imageUrl: '/attached_assets/generated_images/Pink_Room_Thumbnail_f80f6036.png',
      videoUrl: '/uploaded_assets/products/pink room_1763085064533.mp4',
      isGift: false,
      features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', 'Girl\'s Favourite'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: false,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: '1f7ad20e-188b-47b0-8f30-6c5f16674d5a',
      name: 'Realistic King Cummy',
      description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 4999,
      category: 'triggers' as const,
      type: 'Permanent',
      imageUrl: '/uploaded_assets/products/realistic king cummy_1763085064533.jpg',
      videoUrl: null,
      isGift: false,
      features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Perfect One'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: true,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: 'a8a329ad-1190-479e-adb7-89ff555c3a47',
      name: 'Resort Room',
      description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 3999,
      category: 'rooms' as const,
      type: 'Premium',
      imageUrl: '/attached_assets/generated_images/Resort_Room_Thumbnail_74c295c9.png',
      videoUrl: '/uploaded_assets/products/resort room_1763085064533.mp4',
      isGift: false,
      features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', 'Luxury'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: false,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: '4e986709-7795-439a-a447-f6c82383a39e',
      name: 'Room + Trigger Combo',
      description: 'Buy any 1 Room + any 1 Permanent Trigger. Best Budget Combo - Perfect for New Buyers with Instant Delivery and Permanent Warranty Included!',
      price: 5699,
      category: 'bundles' as const,
      type: 'Bundle',
      imageUrl: '/uploaded_assets/products/delux room_1763085064531.mp4',
      videoUrl: null,
      isGift: false,
      features: ['Buy any 1 Room + any 1 Permanent Trigger', 'Best Budget Combo', 'Perfect for New Buyers', 'Instant Delivery', 'Permanent Warranty Included'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: false,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: 'bf9e9e03-a0e6-4066-80cb-c931fe94d80e',
      name: 'Threesome Room',
      description: '🔥 Features Included:\n\n18+ Long Premium Long Poses, High-Quality Animations.\n\nPermanent Warranty – enjoy lifetime support and updates\n\nLogin Method Required – secure and fast delivery\n\nPoses Type - Timerless\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 4399,
      category: 'rooms' as const,
      type: 'Premium',
      imageUrl: '/attached_assets/generated_images/Threesome_Room_Thumbnail_9e0f8e2d.png',
      videoUrl: '/uploaded_assets/products/threesome room_1763085064533.mp4',
      isGift: false,
      features: ['18 Premium Long Poses', 'Permanent Warranty', 'Compatible with both PC & Mobile', 'Style – Couple', '3some / 4some'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: false,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: 'cf62b321-79fc-4c9e-922c-3e0a0553f21c',
      name: 'Ultimate Starter Pack',
      description: '💎 The Complete Starter Package for New Users – Get everything you need to start your IMVU journey! This exclusive bundle includes 1 Premium Trigger, 1 Sex Room, and Premium Support. Perfect for beginners who want the full BM Creations experience. 18+ Long Premium Poses, High-Quality Animations, Permanent Warranty – enjoy lifetime support and updates, Login Method Required – secure and fast delivery, Poses Type - Timerless, PC & Mobile Supported – fully compatible on all devices, One-Time Platinum VIP Needed – no repeated purchases.',
      price: 7999,
      category: 'bundles' as const,
      type: 'Bundle',
      imageUrl: '/uploaded_assets/products/delux room_1763085064531.mp4',
      videoUrl: null,
      isGift: false,
      features: ['1 Premium Permanent Trigger (King Cummy)', '1 Premium Sex Room (Modern Apartment)', 'Lifetime warranty on all items', 'Priority customer support', 'PC & Mobile compatible', 'Instant delivery'],
      loginMethod: 'IMVU Account',
      vipRequired: false,
      sexRoomNeeded: false,
      pcSupport: true,
      mobileSupport: true
    },
    {
      id: '31c42bf2-118f-450c-be79-e324b49f8d22',
      name: 'Venom V3',
      description: '🔥 Features Included:\n\n40+ High-Quality Actions – including Cum, Pee, Slap, and multiple angle variations\n\nPermanent Warranty – enjoy lifetime support and updates\n\nNON-AP Compatible – works even without AP\n\nLogin Method Required – secure and fast delivery\n\nRequires a Sex Room – to use certain animations\n\nPC & Mobile Supported – fully compatible on all devices\n\nOne-Time Platinum VIP Needed – no repeated purchases',
      price: 5099,
      category: 'triggers' as const,
      type: 'Permanent',
      imageUrl: '/uploaded_assets/products/venom 3_1763085064533.jpg',
      videoUrl: null,
      isGift: false,
      features: ['40+ Trigger Actions', 'Permanent Warranty', 'Works on both PC & Mobile', 'Biggest From All'],
      loginMethod: 'Guest/AP',
      vipRequired: false,
      sexRoomNeeded: true,
      pcSupport: true,
      mobileSupport: true
    }
  ];

  try {
    // Delete existing products to avoid duplicates
    console.log('🗑️  Clearing existing products...');
    await db.delete(products);
    
    // Insert all products
    console.log('📦 Inserting 16 products...');
    await db.insert(products).values(productsData);
    
    console.log('✅ Successfully seeded production database with all 16 products!');
    console.log('🎉 Your published website should now show all products.');
    
  } catch (error) {
    console.error('❌ Error seeding production database:', error);
    process.exit(1);
  }
}

seedProduction();
