import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { ProductWithRatings } from "@shared/schema";
import { Star } from "lucide-react";
import triggerImage from "@assets/generated_images/Premium_trigger_product_icon_bce9e655.png";
import roomImage from "@assets/generated_images/Virtual_room_product_preview_0f22295e.png";
import giftTriggerImage from "@assets/generated_images/Gifting_trigger_icon_d54ee4bc.png";
import bundleImage from "@assets/generated_images/Bundle_offer_icon_2dab81cb.png";

const getImageForProduct = (imageUrl: string) => {
  if (imageUrl.includes("Premium_trigger")) return triggerImage;
  if (imageUrl.includes("Gifting_trigger")) return giftTriggerImage;
  if (imageUrl.includes("Virtual_room")) return roomImage;
  if (imageUrl.includes("Bundle_offer")) return bundleImage;
  return triggerImage;
};

export default function Shop() {
  const { data: products = [], isLoading } = useQuery<ProductWithRatings[]>({
    queryKey: ["/api/products"],
  });

  const triggerProducts = products.filter(p => p.category === "triggers");
  const roomProducts = products.filter(p => p.category === "rooms");
  const bundleProducts = products.filter(p => p.category === "bundles");

  const ProductCard = ({ product }: { product: ProductWithRatings }) => {
    const averageRating = product.averageRating || 0;
    const reviewCount = product.reviewCount || 0;

    return (
      <Card className="neon-border hover-elevate transition-all duration-300 overflow-hidden">
        <CardHeader className="p-0">
          <Link href={`/product/${product.id}`}>
            <div className="relative aspect-square overflow-hidden bg-card cursor-pointer">
              <img
                src={getImageForProduct(product.imageUrl)}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                data-testid={`img-product-${product.id}`}
              />
              <Badge className="absolute top-3 right-3 neon-glow-sm">
                {product.type === "permanent" ? "Permanent" : "Gifting"}
              </Badge>
            </div>
          </Link>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center gap-2 mb-3">
            {reviewCount > 0 ? (
              <>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">
                  ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </>
            ) : (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Star className="w-3 h-3" />
                No reviews yet
              </span>
            )}
          </div>
          
          <div className="text-2xl font-bold text-primary neon-text">
            ${(product.price / 100).toFixed(2)}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Link href={`/product/${product.id}`} className="w-full">
            <Button
              className="w-full neon-glow"
              data-testid={`button-buy-${product.id}`}
            >
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Explore Our IMVU Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover premium and permanent IMVU triggers, animation packs, and custom rooms for the best gaming experience.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="neon-border">
                <CardHeader className="p-0">
                  <Skeleton className="aspect-square w-full" />
                </CardHeader>
                <CardContent className="p-6 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-6 w-20" />
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-center mb-8 flex-wrap gap-2">
              <TabsTrigger value="all" data-testid="tab-all">All Products</TabsTrigger>
              <TabsTrigger value="triggers" data-testid="tab-triggers">Premium Triggers</TabsTrigger>
              <TabsTrigger value="rooms" data-testid="tab-rooms">Sex Rooms Collection</TabsTrigger>
              <TabsTrigger value="bundles" data-testid="tab-bundles">Bundle Offers</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="triggers" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {triggerProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rooms" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {roomProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bundles" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {bundleProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
