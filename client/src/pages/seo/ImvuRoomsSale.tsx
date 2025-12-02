import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ShoppingBag, Star, Shield, Home, Clock, CheckCircle, Heart, Sparkles } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Helmet } from "react-helmet";

export default function ImvuRoomsSale() {
  const rooms = [
    {
      name: "Deluxe Sex Room",
      description: "Premium sex room with luxury interior, multiple pose spots, and HD textures. Perfect for couples.",
      price: 24.99,
      features: ["50+ Poses", "HD Textures", "PC & Mobile", "Lifetime Warranty"],
    },
    {
      name: "Pink Room",
      description: "Beautiful pink-themed room with romantic lighting and modern furniture. Great for photoshoots.",
      price: 19.99,
      features: ["40+ Poses", "Pink Theme", "Romantic Lighting", "Instant Delivery"],
    },
    {
      name: "Resort Room",
      description: "Tropical beach resort themed room with outdoor and indoor areas. Paradise experience.",
      price: 24.99,
      features: ["45+ Poses", "Beach Theme", "Indoor/Outdoor", "Premium Quality"],
    },
    {
      name: "Modern Apartment",
      description: "Sleek modern apartment with multiple rooms, kitchen, and bedroom. Urban lifestyle.",
      price: 14.99,
      features: ["30+ Poses", "Multi-Room", "Modern Design", "Best Value"],
    },
    {
      name: "Threesome Room",
      description: "Specialized room designed for multiple avatars with unique pose configurations.",
      price: 29.99,
      features: ["60+ Poses", "3-Person Support", "Premium Features", "Exclusive"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>IMVU Rooms Sale | Buy Premium IMVU Sex Rooms | BM Creations</title>
        <meta name="description" content="Buy premium IMVU sex rooms on sale! Deluxe Room, Pink Room, Resort Room, and more. Instant delivery, best prices, lifetime warranty. Shop now!" />
        <meta name="keywords" content="IMVU rooms, IMVU sex rooms, buy IMVU room, IMVU deluxe room, IMVU pink room, IMVU resort room, IMVU room sale" />
        <meta property="og:title" content="IMVU Rooms Sale | Premium Sex Rooms | BM Creations" />
        <meta property="og:description" content="Premium IMVU sex rooms on sale. Deluxe, Pink, Resort, and more rooms with instant delivery." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://imvublackmarket.xyz/imvu-rooms-sale" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-pink-900/30 to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <span className="text-pink-400 font-semibold">Limited Time Sale</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
                Premium IMVU Rooms Sale
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Get the best IMVU sex rooms at unbeatable prices with instant delivery
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/shop">
                  <Button size="lg" className="neon-glow text-lg px-8 gap-2" data-testid="button-shop-rooms">
                    <Home className="h-5 w-5" />
                    Shop Rooms - From $14.99
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Available Rooms */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Available IMVU Rooms
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              All rooms include permanent ownership, PC & Mobile support, and lifetime warranty
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room, index) => (
                <Card key={index} className="neon-border hover-elevate overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-pink-600/30 to-purple-600/30 flex items-center justify-center relative">
                    <Home className="w-12 h-12 text-pink-400" />
                    {index === 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                          BEST SELLER
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{room.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features.map((feature, i) => (
                        <span key={i} className="px-2 py-1 rounded-full bg-card text-xs border border-border">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-primary">${room.price}</p>
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

        {/* Features */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Why Choose Our IMVU Rooms?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-pink-400" />
                </div>
                <h3 className="font-bold mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">HD textures and professional design</p>
              </div>

              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="font-bold mb-2">Instant Delivery</h3>
                <p className="text-sm text-muted-foreground">Get your room within minutes</p>
              </div>

              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="font-bold mb-2">Lifetime Warranty</h3>
                <p className="text-sm text-muted-foreground">Permanent ownership guaranteed</p>
              </div>

              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="font-bold mb-2">PC & Mobile</h3>
                <p className="text-sm text-muted-foreground">Works on all IMVU platforms</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Transform Your IMVU Experience
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get premium IMVU rooms at the best prices. Instant delivery, lifetime warranty, 24/7 support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="neon-glow text-lg px-10 gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Shop All Rooms
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
