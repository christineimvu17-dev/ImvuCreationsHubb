import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ShoppingBag, Zap, Shield, Crown, Clock, CheckCircle, Monitor, Smartphone } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Helmet } from "react-helmet";

export default function ImvuTriggerDeals() {
  const triggers = [
    {
      name: "BBC King V5",
      description: "The most popular IMVU trigger with advanced features and smooth animations. King of all triggers.",
      price: 39.99,
      features: ["100+ Poses", "PC & Mobile", "Smooth Animations", "Best Seller"],
      badge: "MOST POPULAR",
      badgeColor: "bg-orange-500",
    },
    {
      name: "King Cummy",
      description: "Premium trigger with unique effects and high-quality animations. Perfect for power users.",
      price: 44.99,
      features: ["80+ Poses", "Special Effects", "HD Quality", "Premium"],
      badge: "PREMIUM",
      badgeColor: "bg-purple-500",
    },
    {
      name: "Venom V3",
      description: "Dark-themed trigger with aggressive animations and powerful features. For the bold.",
      price: 49.99,
      features: ["90+ Poses", "Dark Theme", "Aggressive Style", "Exclusive"],
      badge: "EXCLUSIVE",
      badgeColor: "bg-red-500",
    },
    {
      name: "Female Trigger",
      description: "Designed specifically for female avatars with elegant and smooth animations.",
      price: 34.99,
      features: ["70+ Poses", "Female-Only", "Elegant Design", "Popular"],
      badge: "FOR HER",
      badgeColor: "bg-pink-500",
    },
    {
      name: "Ultimate Bundle",
      description: "Get multiple triggers at a discounted price. Best value for serious IMVU players.",
      price: 129.99,
      features: ["3+ Triggers", "Save 40%", "All Platforms", "Best Value"],
      badge: "BUNDLE DEAL",
      badgeColor: "bg-green-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>IMVU Trigger Packs Deals | Buy IMVU Triggers | BM Creations</title>
        <meta name="description" content="Best deals on IMVU trigger packs! BBC King V5, King Cummy, Venom V3, Female Trigger and bundles. Permanent triggers with instant delivery." />
        <meta name="keywords" content="IMVU triggers, buy IMVU trigger, IMVU BBC King, IMVU King Cummy, IMVU Venom V3, IMVU trigger pack, IMVU trigger deals" />
        <meta property="og:title" content="IMVU Trigger Packs Deals | Premium Triggers | BM Creations" />
        <meta property="og:description" content="Best deals on IMVU trigger packs. BBC King V5, King Cummy, and more with instant delivery." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://imvublackmarket.xyz/imvu-trigger-deals" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900/30 to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">Hot Trigger Deals</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
                IMVU Trigger Packs Deals
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Premium IMVU triggers at unbeatable prices with instant delivery
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/shop">
                  <Button size="lg" className="neon-glow text-lg px-8 gap-2" data-testid="button-shop-triggers">
                    <Zap className="h-5 w-5" />
                    Shop Triggers - From $34.99
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trigger List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Available IMVU Triggers
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              All triggers are permanent with PC & Mobile support and lifetime warranty
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {triggers.map((trigger, index) => (
                <Card key={index} className="neon-border hover-elevate overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center relative">
                    <Zap className="w-12 h-12 text-blue-400" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full ${trigger.badgeColor} text-white text-xs font-bold`}>
                        {trigger.badge}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{trigger.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{trigger.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trigger.features.map((feature, i) => (
                        <span key={i} className="px-2 py-1 rounded-full bg-card text-xs border border-border">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-primary">${trigger.price}</p>
                      <Link href="/shop">
                        <Button className="neon-glow gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Support */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Works On All Platforms
            </h2>

            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border">
                <Monitor className="w-10 h-10 text-blue-400" />
                <div>
                  <h3 className="font-bold">PC/Desktop</h3>
                  <p className="text-sm text-muted-foreground">Full feature support</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border">
                <Smartphone className="w-10 h-10 text-green-400" />
                <div>
                  <h3 className="font-bold">Mobile</h3>
                  <p className="text-sm text-muted-foreground">iOS & Android</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                  <Crown className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="font-bold mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Smooth animations and effects</p>
              </div>

              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="font-bold mb-2">Instant Delivery</h3>
                <p className="text-sm text-muted-foreground">Get your trigger in minutes</p>
              </div>

              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="font-bold mb-2">Lifetime Warranty</h3>
                <p className="text-sm text-muted-foreground">Permanent ownership</p>
              </div>

              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="font-bold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Help when you need it</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-background to-card/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Get Your Trigger Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers. Premium IMVU triggers at the best prices with instant delivery.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="neon-glow text-lg px-10 gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Shop All Triggers
                </Button>
              </Link>
              <a href="https://discord.gg/NR4Z9zeBW2" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-lg px-8 gap-2">
                  <SiDiscord className="h-5 w-5" />
                  Get Support
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
