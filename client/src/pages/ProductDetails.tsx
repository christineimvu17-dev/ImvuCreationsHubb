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
import { Star, ArrowLeft } from "lucide-react";
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

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const { data: products, isLoading } = useQuery<ProductWithRatings[]>({
    queryKey: ["/api/products"],
  });

  const product = products?.find(p => p.id === productId);

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
            <Card className="neon-border overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={getImageForProduct(product.imageUrl)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid="img-product"
                />
                <Badge className="absolute top-4 right-4 neon-glow-sm">
                  {product.type === "permanent" ? "Permanent" : "Gifting"}
                </Badge>
              </div>
            </Card>

            {reviewCount > 0 && (
              <Card className="neon-border bg-card/50">
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
                <Badge variant="outline" className="text-base">
                  {product.category === "triggers" ? "Premium Triggers" : 
                   product.category === "rooms" ? "Sex Rooms" : "Bundle Offers"}
                </Badge>
              </div>

              <div className="text-4xl font-bold text-primary neon-text mb-6" data-testid="text-product-price">
                ${(product.price / 100).toFixed(2)}
              </div>
            </div>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="font-exo2">Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed" data-testid="text-product-description">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="font-exo2">Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium capitalize">{product.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product ID:</span>
                  <span className="font-mono text-sm">{product.id}</span>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full h-14 text-lg neon-glow"
              onClick={() => setPaymentDialogOpen(true)}
              data-testid="button-buy-now"
            >
              Buy Now - ${(product.price / 100).toFixed(2)}
            </Button>
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
