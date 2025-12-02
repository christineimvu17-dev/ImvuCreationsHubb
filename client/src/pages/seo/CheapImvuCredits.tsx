import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ShoppingBag, Star, Shield, Zap, Clock, CheckCircle, Users, Award } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Helmet } from "react-helmet";

export default function CheapImvuCredits() {
  return (
    <>
      <Helmet>
        <title>Cheap IMVU Credits & Products | Buy IMVU Triggers & Rooms | BM Creations</title>
        <meta name="description" content="Buy cheap IMVU credits, triggers, and rooms at the best prices. Instant delivery, 24/7 support, and lifetime warranty. Trusted IMVU marketplace since 2024." />
        <meta name="keywords" content="cheap IMVU credits, buy IMVU credits, IMVU shop, IMVU triggers, IMVU rooms, IMVU products, IMVU marketplace" />
        <meta property="og:title" content="Cheap IMVU Credits & Products | BM Creations" />
        <meta property="og:description" content="The cheapest IMVU credits and products with instant delivery. Trusted by 500+ customers." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://imvublackmarket.xyz/cheap-imvu-credits" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-purple-900/30 to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
                Cheap IMVU Credits & Products
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Get the best prices on IMVU triggers, rooms, and bundles with instant delivery
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/shop">
                  <Button size="lg" className="neon-glow text-lg px-8 gap-2" data-testid="button-shop-credits">
                    <ShoppingBag className="h-5 w-5" />
                    Shop Now - Starting at $34.99
                  </Button>
                </Link>
                <a href="https://discord.gg/NR4Z9zeBW2" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="text-lg px-8 gap-2">
                    <SiDiscord className="h-5 w-5" />
                    Join Our Community
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Buy From Us */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Why Buy IMVU Products From BM Creations?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="neon-border hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Zap className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Cheapest Prices</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer the lowest prices on IMVU triggers and rooms. Compare and save!
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-border hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Clock className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Instant Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your products delivered within minutes after payment confirmation.
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-border hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <Shield className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple payment options with bank-level security protection.
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-border hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                    <Award className="w-7 h-7 text-yellow-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Lifetime Warranty</h3>
                  <p className="text-sm text-muted-foreground">
                    All products come with permanent warranty and free support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Our IMVU Product Categories
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Explore our wide range of premium IMVU products at unbeatable prices
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="neon-border overflow-hidden hover-elevate">
                <div className="h-48 bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-purple-400" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Premium Triggers</h3>
                  <p className="text-muted-foreground mb-4">
                    BBC King V5, King Cummy, Venom V3, Female Trigger and more. Permanent with PC & Mobile support.
                  </p>
                  <p className="text-2xl font-bold text-primary mb-4">From $34.99</p>
                  <Link href="/shop">
                    <Button className="w-full neon-glow">View Triggers</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="neon-border overflow-hidden hover-elevate">
                <div className="h-48 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 flex items-center justify-center">
                  <Users className="w-16 h-16 text-blue-400" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Sex Rooms</h3>
                  <p className="text-muted-foreground mb-4">
                    Deluxe Room, Pink Room, Resort Room, Threesome Room, Modern Apartment and more.
                  </p>
                  <p className="text-2xl font-bold text-primary mb-4">From $14.99</p>
                  <Link href="/shop">
                    <Button className="w-full neon-glow">View Rooms</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="neon-border overflow-hidden hover-elevate">
                <div className="h-48 bg-gradient-to-br from-green-600/30 to-teal-600/30 flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-green-400" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Bundle Deals</h3>
                  <p className="text-muted-foreground mb-4">
                    Save money with our exclusive bundles. Get triggers + rooms at discounted prices.
                  </p>
                  <p className="text-2xl font-bold text-primary mb-4">From $99.99</p>
                  <Link href="/shop">
                    <Button className="w-full neon-glow">View Bundles</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">16+</p>
                <p className="text-muted-foreground">Premium Products</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">24/7</p>
                <p className="text-muted-foreground">Customer Support</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">100%</p>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied IMVU players and get instant access to premium products at the cheapest prices.
            </p>
            <Link href="/shop">
              <Button size="lg" className="neon-glow text-lg px-10 gap-2">
                <ShoppingBag className="h-5 w-5" />
                Browse All Products
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
