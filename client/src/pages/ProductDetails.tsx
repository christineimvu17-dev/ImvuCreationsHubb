import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentDialog } from "@/components/PaymentDialog";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewList } from "@/components/ReviewList";
import type { ProductWithRatings } from "@shared/schema";
import { Star, ArrowLeft, Check, Gift, Monitor, Smartphone, User, ShieldCheck, Home, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
const getImageForProduct = (imageUrl: string) => {
  // Handle uploaded assets (from admin) - use backend URL
  if (imageUrl.startsWith('/uploaded_assets/')) {
    const API_URL = import.meta.env.VITE_API_URL || '';
    return `${API_URL}${imageUrl}`;
  }
  
  // Handle static images
  if (imageUrl.includes("Premium_trigger")) return "/images/Premium_trigger_product_icon_bce9e655.png";
  if (imageUrl.includes("Gifting_trigger")) return "/images/Gifting_trigger_icon_d54ee4bc.png";
  if (imageUrl.includes("Virtual_room")) return "/images/Virtual_room_product_preview_0f22295e.png";
  if (imageUrl.includes("Bundle_offer")) return "/images/Bundle_offer_icon_2dab81cb.png";
  return "/images/Premium_trigger_product_icon_bce9e655.png";
};

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<ProductWithRatings[]>({
    queryKey: ["/api/products"],
  });

  const product = products?.find(p => p.id === productId);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4 neon-text">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/shop">
            <Button data-testid="button-back-to-shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = product.averageRating || 0;
  const reviewCount = product.reviewCount || 0;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/shop">
          <Button
            variant="ghost"
            className="mb-8"
            data-testid="button-back-to-shop"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <Card className="neon-border overflow-hidden bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="relative aspect-square bg-gradient-to-b from-purple-900/20 to-black">
                {product.videoUrl && product.category === "rooms" ? (
                  <video
                    src={product.videoUrl.startsWith('/uploaded_assets/') ? `${import.meta.env.VITE_API_URL || ''}${product.videoUrl}` : product.videoUrl}
                    controls={true}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className="w-full h-full object-cover"
                    data-testid="video-product"
                  />
                ) : (
                  <img
                    src={product.imageUrl.startsWith('/uploaded_assets/') ? `${import.meta.env.VITE_API_URL || ''}${product.imageUrl}` : (product.imageUrl.startsWith('/') ? product.imageUrl : getImageForProduct(product.imageUrl))}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    data-testid="img-product"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className="bg-purple-500/90 hover:bg-purple-500 text-white font-bold px-4 py-2 text-base shadow-lg shadow-purple-500/50" data-testid="badge-price">
                    ${(product.price / 100).toFixed(2)}
                  </Badge>
                  {product.isGift && (
                    <Badge className="bg-pink-500/90 hover:bg-pink-500 text-white font-bold px-4 py-2 text-base shadow-lg shadow-pink-500/50 flex items-center gap-2" data-testid="badge-gift">
                      <Gift className="w-4 h-4" />
                      GIFT
                    </Badge>
                  )}
                </div>
              </div>
            </Card>

            {reviewCount > 0 && (
              <Card className="neon-border bg-black/40 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">{averageRating.toFixed(1)}</span>
                      <span className="text-muted-foreground"> ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-orbitron font-bold mb-4 neon-text" data-testid="text-product-name">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline" className="text-base border-purple-500/50">
                  {product.category === "triggers" ? "Premium Triggers" : 
                   product.category === "rooms" ? "Sex Rooms" : "Bundle Offers"}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg shadow-purple-500/50 neon-glow"
                onClick={() => setPaymentDialogOpen(true)}
                data-testid="button-buy-now"
              >
                Buy Now - ${(product.price / 100).toFixed(2)}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 neon-border"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </div>

            <Card className="neon-border bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-exo2 flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-400" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed" data-testid="text-product-description">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {product.features && product.features.length > 0 && (
              <Card className="neon-border bg-black/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-exo2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-purple-400" />
                    Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2" data-testid={`feature-${index}`}>
                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card className="neon-border bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-exo2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.loginMethod && (
                  <div className="flex items-center gap-3" data-testid="requirement-login">
                    <User className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">Login Method</div>
                      <div className="font-medium">
                        {product.type === "Gifting" ? product.loginMethod : "Login required for permanent trigger"}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3" data-testid="requirement-vip">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-400">VIP Required</div>
                    <div className="font-medium">
                      {product.vipRequired ? "Yes" : "You need to purchase only one time platinum VIP"}
                    </div>
                  </div>
                </div>
                {product.category !== "rooms" && (
                  <div className="flex items-center gap-3" data-testid="requirement-room">
                    <Home className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">Sex Room Needed</div>
                      <div className="font-medium">
                        {product.sexRoomNeeded ? "Yes" : "Must have sex room"}
                      </div>
                    </div>
                  </div>
                )}
                <div className="border-t border-purple-500/20 pt-3 mt-3">
                  <div className="text-sm text-gray-400 mb-2">Platform Support</div>
                  <div className="flex gap-4">
                    <div className={`flex items-center gap-2 ${product.pcSupport ? 'text-green-400' : 'text-gray-600'}`} data-testid="support-pc">
                      <Monitor className="w-5 h-5" />
                      <span className="font-medium">PC</span>
                    </div>
                    <div className={`flex items-center gap-2 ${product.mobileSupport ? 'text-green-400' : 'text-gray-600'}`} data-testid="support-mobile">
                      <Smartphone className="w-5 h-5" />
                      <span className="font-medium">Mobile</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border-t border-purple-500/30 pt-8">
            <h2 className="text-3xl font-orbitron font-bold mb-6 neon-text">Customer Reviews</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReviewList productId={product.id} />
              <ReviewForm
                productId={product.id}
                productName={product.name}
              />
            </div>
          </div>
        </div>
      </div>

      {product && (
        <PaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          product={product}
        />
      )}
    </div>
  );
}
