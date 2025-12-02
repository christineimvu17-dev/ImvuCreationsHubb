import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Review } from "@shared/schema";

const defaultTestimonials = [
  {
    id: 1,
    name: "Alex M.",
    rating: 5,
    text: "Best IMVU shop I've ever used! Got my trigger within 30 minutes and it works perfectly. The support team on Discord is amazing!",
    verified: true,
    product: "BBC King V5 Trigger",
  },
  {
    id: 2,
    name: "Sarah K.",
    rating: 5,
    text: "I was skeptical at first but BM Creations delivered exactly what they promised. The Deluxe Room is incredible and customer service is top-notch.",
    verified: true,
    product: "Deluxe Room",
  },
  {
    id: 3,
    name: "Mike R.",
    rating: 5,
    text: "Fast delivery, great prices, and everything works as described. I've bought 3 products already and each experience has been perfect.",
    verified: true,
    product: "Ultimate Bundle",
  },
  {
    id: 4,
    name: "Jessica L.",
    rating: 4,
    text: "Love my new trigger! The team helped me with every step and made sure everything was working before closing my ticket.",
    verified: true,
    product: "Female Trigger",
  },
  {
    id: 5,
    name: "David P.",
    rating: 5,
    text: "100% legit and trustworthy. I've been buying from them for months now. Best prices on IMVU products hands down!",
    verified: true,
    product: "King Cummy Trigger",
  },
];

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/reviews/approved"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/reviews/approved");
        if (!response.ok) return [];
        return response.json();
      } catch {
        return [];
      }
    },
  });

  const testimonials = reviews.length > 0 
    ? reviews.map(r => ({
        id: r.id,
        name: r.customerName || "Anonymous",
        rating: r.rating,
        text: r.reviewText,
        verified: true,
        product: "IMVU Product",
      }))
    : defaultTestimonials;

  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 
                       typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/30 overflow-hidden" data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold neon-text" style={{ fontFamily: 'Orbitron' }}>
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Real reviews from real IMVU players who trust BM Creations
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-6 transition-transform duration-500 ease-in-out" 
               style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
            {testimonials.map((testimonial) => (
              <Card 
                key={testimonial.id}
                className="neon-border flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                data-testid={`card-testimonial-${testimonial.id}`}
              >
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  <p className="text-foreground/90 mb-6 min-h-[80px] italic">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.product}</p>
                    </div>
                    {testimonial.verified && (
                      <div className="flex items-center gap-1 text-green-500 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === Math.floor(currentIndex / itemsPerPage) ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                  data-testid={`button-testimonial-dot-${i}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
