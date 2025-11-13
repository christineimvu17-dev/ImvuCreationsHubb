# BM Creations - IMVU E-Commerce Platform

## Overview

BM Creations is a futuristic, gaming-themed e-commerce platform designed for selling IMVU virtual products including triggers, rooms, and bundles. The application features a dark mode, neon-accented interface inspired by cyberpunk aesthetics and gaming marketplaces. It provides a complete shopping experience with product browsing, order placement via multiple payment methods, order tracking, live chat support, and contact forms. The platform emphasizes visual impact through glow effects and animations while maintaining professional credibility and trust.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool. The application uses Wouter for client-side routing and is configured as a Single Page Application (SPA).

**UI Component System**: Built on shadcn/ui (New York style variant) with Radix UI primitives for accessible, unstyled components. All UI components follow a consistent dark theme with customizable CSS variables defined in `client/src/index.css`.

**Styling Strategy**: Tailwind CSS with a custom configuration for the futuristic gaming aesthetic. The design system uses:
- Dark backgrounds (black to dark purple tints)
- Neon accent colors (purple and blue gradients)
- Custom fonts (Orbitron, Exo 2, Rajdhani, Space Mono) for sci-fi styling
- Glow effects and animations through custom CSS classes (`neon-text`, `neon-glow`, `hover-elevate`)

**State Management**: React Query (@tanstack/react-query) for server state management with custom query functions in `client/src/lib/queryClient.ts`. Local state is managed with React hooks.

**Form Handling**: React Hook Form with Zod validation for type-safe form schemas. Forms include payment uploads, contact submissions, and order tracking.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript. The server is configured as an ES module.

**API Design**: RESTful API with the following key endpoints:
- `/api/products` - Product catalog retrieval
- `/api/orders` - Order creation and management
- `/api/orders/track` - Order tracking by email or order ID
- `/api/contact` - Contact form submissions
- `/api/chat` - Live chat message handling

**Request Processing**: 
- JSON body parsing with raw buffer capture for webhook verification
- Multer middleware for file upload handling (payment screenshots)
- Request/response logging for API routes

**File Uploads**: In-memory storage using Multer with 10MB file size limit for payment screenshot uploads.

### Data Storage

**Database**: PostgreSQL accessed via Neon serverless driver (`@neondatabase/serverless`). The connection string is provided through the `DATABASE_URL` environment variable.

**ORM**: Drizzle ORM with schema definitions in `shared/schema.ts`. The schema includes:
- `products` table: Product catalog with name, description, price, category, type, and media URLs
- `orders` table: Order records with IMVU ID, email, payment details, transaction tracking, and status
- `chatMessages` table: Customer support chat messages
- `contactForms` table: Contact form submissions

**Schema Validation**: Drizzle-Zod integration for runtime type checking and validation of insert operations.

**Migrations**: Drizzle Kit handles database migrations with output directory `./migrations` and PostgreSQL dialect.

### Authentication and Authorization

No user authentication system is currently implemented. The application operates as an open e-commerce platform where users can:
- Browse products without login
- Place orders by providing IMVU ID and email
- Track orders using order ID or email as identifiers

### External Dependencies

**Payment Processing**: Multiple payment methods supported:
- PayPal (primary method with direct payment link)
- Alternative methods (CashApp, Binance, Remitly, Wise, Gift Cards, UPI) handled through Discord ticketing system

**Discord Integration**: 
- Webhook notifications for payment confirmations (`PAYMENT_WEBHOOK_URL`)
- Webhook notifications for order status updates (`STATUS_WEBHOOK_URL`)
- File uploads to Discord for payment screenshots
- Community support via Discord server (https://discord.gg/NR4Z9zeBW2)

**Social Media Integration**:
- Instagram: @imvu_trustedshop
- Discord community server for customer support

**Image Assets**: Product images stored in `/attached_assets/generated_images/` directory with static file serving.

**Development Tools**:
- Replit-specific plugins for development environment (cartographer, dev banner, runtime error modal)
- TypeScript for type safety across client, server, and shared code
- ESBuild for server bundling in production

### Key Architectural Decisions

**Monorepo Structure**: Client, server, and shared code organized in a single repository with path aliases configured in TypeScript:
- `@/*` for client code
- `@shared/*` for shared types and schemas
- `@assets/*` for static assets

**Type Safety**: End-to-end type safety using TypeScript with shared schema definitions between frontend and backend via Drizzle-Zod.

**Build Strategy**: 
- Development: Vite dev server proxying API requests to Express
- Production: Vite builds static client bundle, ESBuild bundles server into single output file

**Order Flow**: Orders generate unique IDs server-side and support tracking without user accounts, relying on email/order ID lookup for status checking.

**Chat System**: Simple message storage without real-time WebSocket connections; uses polling or manual refresh for message updates.