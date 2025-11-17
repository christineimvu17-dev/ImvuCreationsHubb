import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";
import type { SiteReview } from "@shared/schema";

export default function Reviews() {
  const { data: reviews, isLoading } = useQuery<SiteReview[]>({
    queryKey: ["/api/site-reviews"],
  });

  const getRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? "fill-purple-400 text-purple-400"
              : "text-gray-600"
          }`}
        />
      ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold neon-text mb-4">
            Customer Reviews
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our satisfied customers have to say about BM Creations
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Loading reviews...</p>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="bg-black/40 border-purple-500/30 hover-elevate"
                data-testid={`review-card-${review.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="text-xl font-semibold text-white"
                          data-testid={`reviewer-name-${review.id}`}
                        >
                          {review.reviewerName}
                        </h3>
                      </div>
                      <div className="flex gap-1 mb-2" data-testid={`rating-stars-${review.id}`}>
                        {getRatingStars(review.rating)}
                      </div>
                      <p className="text-sm text-gray-400" data-testid={`review-date-${review.id}`}>
                        Reviewed on {format(new Date(review.displayDate), "MMMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-gray-300 leading-relaxed"
                    data-testid={`review-text-${review.id}`}
                  >
                    {review.reviewText}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No reviews yet. Be the first to leave a review!</p>
          </div>
        )}
      </div>
    </div>
  );
}
