import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { ProductWithRatings } from "@shared/schema";
import { Monitor, Smartphone, Check, Gift, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
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
  const { addToCart } = useCart();
  const { toast } = useToast();

  const triggerProducts = products.filter(p => p.category === "triggers");
  const roomProducts = products.filter(p => p.category === "rooms");
  const bundleProducts = products.filter(p => p.category === "bundles");

  const handleAddToCart = (product: ProductWithRatings) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const ProductCard = ({ product }: { product: ProductWithRatings }) => {
    const features = product.features || [];
    const displayFeatures = features.slice(0, 5);

    return (
      <Card className="neon-border hover-elevate active-elevate-2 transition-all duration-300 overflow-hidden bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <CardHeader className="p-0 relative">
          <Link href={`/product/${product.id}`}>
            <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-purple-900/20 to-black cursor-pointer">
              <img
                src={product.imageUrl.startsWith('/') ? product.imageUrl : getImageForProduct(product.imageUrl)}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                data-testid={`img-product-${product.id}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge className="bg-purple-500/90 hover:bg-purple-500 text-white font-bold px-3 py-1 text-sm shadow-lg shadow-purple-500/50" data-testid={`badge-price-${product.id}`}>
                  ${(product.price / 100).toFixed(2)}
                </Badge>
                {product.isGift && (
                  <Badge className="bg-pink-500/90 hover:bg-pink-500 text-white font-bold px-3 py-1 text-sm shadow-lg shadow-pink-500/50 flex items-center gap-1" data-testid={`badge-gift-${product.id}`}>
                    <Gift className="w-3 h-3" />
                    GIFT
                  </Badge>
                )}
              </div>
            </div>
          </Link>
        </CardHeader>
        <CardContent className="p-5">
          <CardTitle className="text-lg font-exo2 mb-2 text-white">{product.name}</CardTitle>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
          
          {displayFeatures.length > 0 && (
            <ul className="space-y-2 mb-4">
              {displayFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="p-5 pt-0 flex flex-col gap-3">
          <div className="flex gap-2 w-full">
            <Button
              onClick={() => handleAddToCart(product)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg shadow-purple-500/50 neon-glow gap-2"
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Link href={`/product/${product.id}`}>
              <Button
                variant="outline"
                size="icon"
                className="neon-border"
                data-testid={`button-view-${product.id}`}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-gray-400">
            {product.pcSupport && (
              <div className="flex items-center gap-1" data-testid={`icon-pc-${product.id}`}>
                <Monitor className="w-4 h-4" />
                <span className="text-xs">PC</span>
              </div>
            )}
            {product.mobileSupport && (
              <div className="flex items-center gap-1" data-testid={`icon-mobile-${product.id}`}>
                <Smartphone className="w-4 h-4" />
                <span className="text-xs">Mobile</span>
              </div>
            )}
          </div>
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
