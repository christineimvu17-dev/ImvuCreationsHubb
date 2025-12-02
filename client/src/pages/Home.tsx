import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ShoppingBag, Users, Zap, Shield, Clock, Star, CreditCard, CheckCircle, Truck, Headphones, Award, Gift, Search, ArrowRight } from "lucide-react";
import { SiDiscord, SiPaypal, SiCashapp, SiBinance, SiWise } from "react-icons/si";
import { OfferBanner } from "@/components/OfferBanner";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { BestSellers } from "@/components/BestSellers";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen">
      <OfferBanner />
      
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center min-h-[600px] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(10, 10, 30, 0.85)), url(/images/Futuristic_IMVU_hero_background_36af4450.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        data-testid="section-hero"
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

      {/* SECTION 1: Why Choose Us? (First after hero) */}
      <section className="py-20 bg-gradient-to-b from-background to-card/30" data-testid="section-why-choose-us">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Why Choose Us?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We're committed to providing the best IMVU shopping experience with unmatched quality and service
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="neon-border hover-elevate transition-all duration-300 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center mb-4 neon-glow-sm">
                  <Truck className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Exo 2' }}>Instant Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Get your products delivered within minutes to 24 hours. Fast, reliable, and secure delivery guaranteed.
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border hover-elevate transition-all duration-300 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-4 neon-glow-blue">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Exo 2' }}>100% Secure</h3>
                <p className="text-muted-foreground text-sm">
                  Your payment and account details are protected with bank-level encryption. Safe transactions always.
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border hover-elevate transition-all duration-300 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Exo 2' }}>Trusted Seller</h3>
                <p className="text-muted-foreground text-sm">
                  Over 500+ happy customers trust us. Check our reviews and join our growing community.
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border hover-elevate transition-all duration-300 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Exo 2' }}>Money Back Guarantee</h3>
                <p className="text-muted-foreground text-sm">
                  If we can't deliver, you get a full refund. No questions asked, no hassle.
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border hover-elevate transition-all duration-300 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                  <Headphones className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Exo 2' }}>24/7 Support</h3>
                <p className="text-muted-foreground text-sm">
                  Our team is always available on Discord to help you with any questions or issues.
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border hover-elevate transition-all duration-300 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Exo 2' }}>Lifetime Warranty</h3>
                <p className="text-muted-foreground text-sm">
                  All products come with permanent warranty. If anything goes wrong, we've got you covered.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 2: Accepted Payment Methods (Second) */}
      <section className="py-16 bg-card/30" data-testid="section-payment-methods">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Accepted Payment Methods
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            We accept multiple secure payment options for your convenience
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]" data-testid="payment-paypal">
              <SiPaypal className="w-10 h-10 text-[#00457C]" />
              <span className="text-sm font-medium">PayPal</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]" data-testid="payment-cashapp">
              <SiCashapp className="w-10 h-10 text-[#00C853]" />
              <span className="text-sm font-medium">CashApp</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]" data-testid="payment-binance">
              <SiBinance className="w-10 h-10 text-[#F0B90B]" />
              <span className="text-sm font-medium">Binance</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]" data-testid="payment-wise">
              <SiWise className="w-10 h-10 text-[#9FE870]" />
              <span className="text-sm font-medium">Wise</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]" data-testid="payment-giftcards">
              <Gift className="w-10 h-10 text-purple-400" />
              <span className="text-sm font-medium">Gift Cards</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 hover-elevate transition-all min-w-[100px]" data-testid="payment-upi">
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

      {/* SECTION 3: Best Sellers */}
      <BestSellers products={products} />

      {/* SECTION 4: Buy IMVU Triggers & Rooms - Products CTA (Third) */}
      <section className="py-20 bg-gradient-to-b from-card/30 to-background" data-testid="section-products-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Buy IMVU Triggers & Rooms – Instant Delivery
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Shop BBC King V5, King Cummy, Female Trigger, Deluxe Room, Modern Apartment, Pink Room, Resort Room, Threesome Room, and exclusive bundles. All products include permanent warranty, PC & Mobile support, and 24/7 customer service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" data-testid="button-browse-products">
              <Button size="lg" className="neon-glow text-lg px-8 gap-2">
                <ShoppingBag className="h-5 w-5" />
                Browse All Products
              </Button>
            </Link>
            <Link href="/track-order" data-testid="button-track-order-home">
              <Button size="lg" variant="outline" className="text-lg px-8 gap-2">
                <Search className="h-5 w-5" />
                Track Your Order
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: How to Buy - Step by Step */}
      <section className="py-20 bg-card/20" data-testid="section-how-to-buy">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 neon-text" style={{ fontFamily: 'Orbitron' }}>
            How to Buy
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Simple 4-step process to get your IMVU products
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-purple-500/30 hover-elevate transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg shadow-purple-500/30">
                  1
                </div>
                <Search className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-lg font-bold mb-2">Browse Products</h3>
                <p className="text-sm text-muted-foreground">
                  Explore our catalog of triggers, rooms, and bundles. Find the perfect product for you.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <ArrowRight className="w-6 h-6 text-purple-500" />
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-blue-500/30 hover-elevate transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg shadow-blue-500/30">
                  2
                </div>
                <CreditCard className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-lg font-bold mb-2">Make Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Pay securely using PayPal, CashApp, Binance, or other methods. Upload your receipt.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <ArrowRight className="w-6 h-6 text-blue-500" />
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-cyan-500/30 hover-elevate transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg shadow-cyan-500/30">
                  3
                </div>
                <Clock className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-lg font-bold mb-2">We Process</h3>
                <p className="text-sm text-muted-foreground">
                  Our team verifies your payment and prepares your order. Usually takes minutes!
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <ArrowRight className="w-6 h-6 text-cyan-500" />
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-green-500/30 hover-elevate transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg shadow-green-500/30">
                  4
                </div>
                <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-lg font-bold mb-2">Receive Product</h3>
                <p className="text-sm text-muted-foreground">
                  Your product is delivered to your IMVU account. Enjoy with lifetime warranty!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonials Slider */}
      <TestimonialsSlider />

      {/* SECTION 7: Final CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50" data-testid="section-final-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Ready to Level Up Your IMVU Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers and get instant access to premium IMVU triggers and rooms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" data-testid="button-get-started">
              <Button size="lg" className="neon-glow text-lg px-10 gap-2">
                <Zap className="h-5 w-5" />
                Get Started Now
              </Button>
            </Link>
            <a href="https://discord.gg/NR4Z9zeBW2" target="_blank" rel="noopener noreferrer" data-testid="button-discord-support">
              <Button size="lg" variant="secondary" className="text-lg px-8 gap-2">
                <SiDiscord className="h-5 w-5" />
                Get Support
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
