import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ShoppingBag, Users, Zap } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import heroImage from "@assets/generated_images/Futuristic_IMVU_hero_background_36af4450.png";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section
        className="relative flex items-center justify-center min-h-[600px] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(10, 10, 30, 0.85)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background animate-glow-pulse" />
        
        <div className="container mx-auto px-4 py-20 relative z-10 text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
              BM Creations - Premium IMVU Triggers & Rooms
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/90" style={{ fontFamily: 'Rajdhani' }}>
              Cheapest IMVU Black Market Shop - Trusted Since 2024
            </p>
            <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-3xl mx-auto">
              Buy permanent IMVU triggers, premium sex rooms, and exclusive bundles with instant delivery. PC & Mobile supported. 24/7 customer support. Permanent warranty on all products.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" data-testid="button-shop-now">
              <Button size="lg" className="neon-glow text-lg px-8 gap-2">
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </Button>
            </Link>
            <a href="https://discord.gg/NR4Z9zeBW2" target="_blank" rel="noopener noreferrer" data-testid="button-join-discord">
              <Button size="lg" variant="secondary" className="neon-glow-blue text-lg px-8 gap-2">
                <SiDiscord className="h-5 w-5" />
                Join Discord
              </Button>
            </a>
            <Link href="/shop" data-testid="button-explore-gallery">
              <Button size="lg" variant="outline" className="text-lg px-8 backdrop-blur-md bg-background/20">
                Explore Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Why Choose BM Creations for IMVU Products?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="neon-border hover-elevate transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-primary/20 neon-glow-sm">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Cheapest IMVU Triggers & Rooms</h3>
                <p className="text-muted-foreground">
                  Best prices for premium IMVU triggers starting at $34.99. Get BBC King, King Cummy, Venom V3, and more high-quality permanent triggers with warranty.
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border hover-elevate transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-secondary/20 neon-glow-blue">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Trusted IMVU Marketplace</h3>
                <p className="text-muted-foreground">
                  Thousands of satisfied IMVU players trust BM Creations. Instant delivery, 24/7 support, secure payment methods including PayPal, CashApp & more.
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border hover-elevate transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-primary/20 neon-glow-sm">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">16 Premium IMVU Products</h3>
                <p className="text-muted-foreground">
                  Shop permanent triggers, premium sex rooms (Deluxe, Pink, Resort, Threesome), bundle deals with lifetime warranty. PC & Mobile compatible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Buy IMVU Triggers & Rooms - Instant Delivery
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Shop BBC King V5, King Cummy, Female Trigger, Deluxe Room, Modern Apartment, Pink Room, Resort Room, Threesome Room, and exclusive bundles. All products include permanent warranty, PC & Mobile support, and 24/7 customer service.
          </p>
          <Link href="/shop" data-testid="button-browse-products">
            <Button size="lg" className="neon-glow text-lg px-8 gap-2">
              <ShoppingBag className="h-5 w-5" />
              Browse Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
