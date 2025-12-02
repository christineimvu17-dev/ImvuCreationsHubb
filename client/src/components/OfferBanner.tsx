import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Offer } from "@shared/schema";

function useCountdown(targetDate: Date | null) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isExpired };
}

export function OfferBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { data: offer, isLoading } = useQuery<Offer | null>({
    queryKey: ["/api/offer"],
  });

  const { timeLeft, isExpired } = useCountdown(offer?.expiryDate ? new Date(offer.expiryDate) : null);

  useEffect(() => {
    const dismissedOffers = JSON.parse(localStorage.getItem("dismissedOffers") || "{}");
    if (offer && dismissedOffers[offer.id]) {
      setIsDismissed(true);
    }
  }, [offer]);

  useEffect(() => {
    if (offer && !isDismissed && !isExpired) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [offer, isDismissed, isExpired]);

  const handleDismiss = () => {
    if (offer) {
      const dismissedOffers = JSON.parse(localStorage.getItem("dismissedOffers") || "{}");
      dismissedOffers[offer.id] = true;
      localStorage.setItem("dismissedOffers", JSON.stringify(dismissedOffers));
    }
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 300);
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading || !offer || isDismissed || isExpired) {
    return null;
  }

  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 ease-out ${
        isVisible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
      }`}
      data-testid="offer-banner"
    >
      <div className="bg-gradient-to-r from-purple-900/90 via-purple-800/90 to-blue-900/90 border-b border-purple-500/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNhODU1ZjciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 py-3 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 animate-pulse">
                <Gift className="w-5 h-5 text-purple-400" />
              </div>
              
              <div className="text-center sm:text-left">
                <h3 className="text-white font-bold text-sm sm:text-base flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-purple-300">{offer.title}</span>
                  {offer.freeRoomFirstOrder && (
                    <span className="px-2 py-0.5 text-xs bg-pink-500/20 text-pink-300 border border-pink-500/30 rounded-full">
                      First Order Only
                    </span>
                  )}
                </h3>
                <p className="text-purple-200/80 text-xs sm:text-sm mt-0.5">
                  {offer.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {offer.expiryDate && (
                <div className="flex items-center gap-2 text-xs text-purple-300 bg-black/20 px-3 py-1.5 rounded-lg border border-purple-500/20">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-mono">
                    {timeLeft.days > 0 && `${timeLeft.days}d `}
                    {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
              )}

              <Button
                onClick={scrollToProducts}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-purple-500/25"
                data-testid="button-claim-offer"
              >
                Claim Offer
              </Button>

              <button
                onClick={handleDismiss}
                className="p-1.5 text-purple-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Dismiss offer"
                data-testid="button-dismiss-offer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
    </div>
  );
}
