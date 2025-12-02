import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ShoppingBag, Users, Zap, Shield, Clock, Star, CreditCard, CheckCircle } from "lucide-react";
import { SiDiscord, SiPaypal, SiCashapp, SiBinance, SiWise } from "react-icons/si";
import HowItWorks from "@/components/HowItWorks";
import { OfferBanner } from "@/components/OfferBanner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <OfferBanner />
      <section
        className="relative flex items-center justify-center min-h-[600px] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(10, 10, 30, 0.85)), url(/images/Futuristic_IMVU_hero_background_36af4450.png)`,
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

      <section className="py-16 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Why Choose Us?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We're committed to providing the best IMVU shopping experience
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-purple-500/20 hover-elevate transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-sm text-center">Fast Delivery</h4>
              <p className="text-xs text-muted-foreground text-center mt-1">Instant to 24hrs</p>
            </div>

            <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-blue-500/20 hover-elevate transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-sm text-center">Secure Payment</h4>
              <p className="text-xs text-muted-foreground text-center mt-1">100% Protected</p>
            </div>

            <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-yellow-500/20 hover-elevate transition-all">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="font-semibold text-sm text-center">Trusted Seller</h4>
              <p className="text-xs text-muted-foreground text-center mt-1">500+ Happy Customers</p>
            </div>

            <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-green-500/20 hover-elevate transition-all">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-sm text-center">Delivery Guarantee</h4>
              <p className="text-xs text-muted-foreground text-center mt-1">Or Money Back</p>
            </div>

            <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-pink-500/20 hover-elevate transition-all col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="font-semibold text-sm text-center">24/7 Support</h4>
              <p className="text-xs text-muted-foreground text-center mt-1">Always Here to Help</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ fontFamily: 'Orbitron' }}>
            Accepted Payment Methods
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            We accept multiple secure payment options for your convenience
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]">
              <SiPaypal className="w-10 h-10 text-[#00457C]" />
              <span className="text-sm font-medium">PayPal</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]">
              <SiCashapp className="w-10 h-10 text-[#00C853]" />
              <span className="text-sm font-medium">CashApp</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]">
              <SiBinance className="w-10 h-10 text-[#F0B90B]" />
              <span className="text-sm font-medium">Binance</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]">
              <SiWise className="w-10 h-10 text-[#9FE870]" />
              <span className="text-sm font-medium">Wise</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]">
              <CreditCard className="w-10 h-10 text-purple-400" />
              <span className="text-sm font-medium">Gift Cards</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                UPI
              </div>
              <span className="text-sm font-medium">UPI</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            All transactions are processed securely. Need help? Contact us on Discord!
          </p>
        </div>
      </section>
    </div>
  );
}
