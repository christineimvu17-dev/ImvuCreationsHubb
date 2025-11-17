import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { SiteReview } from "@shared/schema";
import { useState } from "react";

export default function Reviews() {
  const { data: reviews, isLoading } = useQuery<SiteReview[]>({
    queryKey: ["/api/site-reviews"],
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      reviewerName: "",
      rating: 5,
      reviewText: "",
    },
  });

  const submitReviewMutation = useMutation({
    mutationFn: async (data: { reviewerName: string; rating: number; reviewText: string }) => {
      const response = await fetch("/api/site-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit review");
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Review Submitted!",
        description: data.message || "Thank you for your review! It will be published after approval.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmitReview = (data: any) => {
    setIsSubmitting(true);
    submitReviewMutation.mutate(data);
  };

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

        <Card className="max-w-4xl mx-auto mb-12 bg-black/40 border-purple-500/30" data-testid="review-submission-form">
          <CardHeader>
            <CardTitle className="text-2xl font-orbitron neon-text text-center">
              Share Your Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitReview)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="reviewerName"
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Your Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your name"
                          className="bg-black/50 border-purple-500/30 text-white"
                          data-testid="input-reviewer-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Rating</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="bg-black/50 border-purple-500/30 text-white"
                            data-testid="select-rating"
                          >
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-black border-purple-500/30">
                          <SelectItem value="5">⭐⭐⭐⭐⭐ (5 stars)</SelectItem>
                          <SelectItem value="4">⭐⭐⭐⭐ (4 stars)</SelectItem>
                          <SelectItem value="3">⭐⭐⭐ (3 stars)</SelectItem>
                          <SelectItem value="2">⭐⭐ (2 stars)</SelectItem>
                          <SelectItem value="1">⭐ (1 star)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reviewText"
                  rules={{ required: "Review text is required", minLength: { value: 10, message: "Review must be at least 10 characters" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Your Review</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Share your experience with BM Creations..."
                          rows={5}
                          className="bg-black/50 border-purple-500/30 text-white resize-none"
                          data-testid="textarea-review-text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isSubmitting}
                  data-testid="button-submit-review"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>

                <p className="text-sm text-gray-400 text-center">
                  Your review will be published after approval by our team
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-orbitron font-bold neon-text text-center mb-8">
          Verified Customer Reviews
        </h2>

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
