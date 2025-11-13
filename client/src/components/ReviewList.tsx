import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";

type Review = {
  id: string;
  productId: string;
  customerName: string;
  email: string;
  rating: number;
  reviewText: string;
  createdAt: string;
};

type ReviewListProps = {
  productId: string;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewList({ productId }: ReviewListProps) {
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews", productId],
    queryFn: async () => {
      const response = await fetch(`/api/reviews/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <Card className="border-purple-500/30 bg-black/80">
        <CardContent className="py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-400">Loading reviews...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Card className="border-purple-500/30 bg-black/80">
        <CardHeader>
          <CardTitle className="font-exo2">Customer Reviews</CardTitle>
          <CardDescription>No reviews yet. Be the first to review!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <Card className="border-purple-500/30 bg-black/80">
      <CardHeader>
        <CardTitle className="font-exo2 flex items-center gap-2">
          Customer Reviews
          <span className="text-sm font-normal text-gray-400">
            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(averageRating)} />
          <span className="text-sm text-gray-400">
            {averageRating.toFixed(1)} out of 5
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            data-testid={`review-${review.id}`}
            className="border-t border-purple-500/20 pt-4 first:border-t-0 first:pt-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-purple-300" data-testid={`text-reviewer-name-${review.id}`}>
                    {review.customerName}
                  </span>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-300" data-testid={`text-review-text-${review.id}`}>
                  {review.reviewText}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(review.createdAt), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
