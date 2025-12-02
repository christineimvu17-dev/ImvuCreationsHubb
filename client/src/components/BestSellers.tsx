import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ShoppingBag, Star, Flame, Monitor, Smartphone } from "lucide-react";
import type { Product } from "@shared/schema";

interface BestSellersProps {
  products: Product[];
}

export function BestSellers({ products }: BestSellersProps) {
  const bestSellers = products.slice(0, 4);

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-card/30 to-background" data-testid="section-best-sellers">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 mb-4">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-orange-400 font-semibold">Hot Products</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold neon-text" style={{ fontFamily: 'Orbitron' }}>
            Best Sellers
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our most popular IMVU products loved by customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <Card 
              key={product.id} 
              className="neon-border hover-elevate transition-all duration-300 overflow-hidden group relative"
              data-testid={`card-bestseller-${product.id}`}
            >
              {index === 0 && (
                <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg">
                  <Flame className="w-3 h-3 mr-1" />
                  #1 Best Seller
                </Badge>
              )}
              {index === 1 && (
                <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-none shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              {index === 2 && (
                <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-lg">
                  Trending
                </Badge>
              )}
              {index === 3 && (
                <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none shadow-lg">
                  Hot Deal
                </Badge>
              )}

              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none shadow-lg neon-glow-sm text-lg font-bold px-3">
                  ${(product.price / 100).toFixed(2)}
                </Badge>
              </div>

              <div className="aspect-video relative overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-1" style={{ fontFamily: 'Exo 2' }}>
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  {product.pcSupport && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Monitor className="w-3 h-3" />
                      <span>PC</span>
                    </div>
                  )}
                  {product.mobileSupport && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Smartphone className="w-3 h-3" />
                      <span>Mobile</span>
                    </div>
                  )}
                </div>

                <Link href="/shop">
                  <Button 
                    className="w-full neon-glow gap-2"
                    data-testid={`button-buy-bestseller-${product.id}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Buy Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/shop">
            <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-all-products">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
