import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

type ReviewFormProps = {
  productId: string;
  productName: string;
  onSuccess?: () => void;
};

export function ReviewForm({ productId, productName, onSuccess }: ReviewFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { toast } = useToast();

  const submitReviewMutation = useMutation({
    mutationFn: async (data: {
      productId: string;
      customerName: string;
      email: string;
      rating: number;
      reviewText: string;
    }) => {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews", productId] });
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
      setCustomerName("");
      setEmail("");
      setRating(0);
      setReviewText("");
      onSuccess?.();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit review. Please try again.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !email || rating === 0 || !reviewText) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all fields and select a rating",
      });
      return;
    }

    if (rating < 1 || rating > 5) {
      toast({
        variant: "destructive",
        title: "Invalid Rating",
        description: "Rating must be between 1 and 5 stars",
      });
      return;
    }

    submitReviewMutation.mutate({
      productId,
      customerName,
      email,
      rating,
      reviewText,
    });
  };

  return (
    <Card className="border-purple-500/30 bg-black/80">
      <CardHeader>
        <CardTitle className="font-exo2">Leave a Review</CardTitle>
        <CardDescription>Share your experience with {productName}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Your Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Doe"
                data-testid="input-review-name"
                className="bg-black/50 border-purple-500/30"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                data-testid="input-review-email"
                className="bg-black/50 border-purple-500/30"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  data-testid={`button-rating-${star}`}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-400 self-center">
                  {rating} {rating === 1 ? "star" : "stars"}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewText">Your Review</Label>
            <Textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience with this product..."
              rows={4}
              data-testid="textarea-review-text"
              className="bg-black/50 border-purple-500/30 resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={submitReviewMutation.isPending}
            data-testid="button-submit-review"
            className="w-full"
          >
            {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
