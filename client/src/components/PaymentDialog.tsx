import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiDiscord } from "react-icons/si";
import { CreditCard, Gift, DollarSign } from "lucide-react";
import { PaymentUploadForm } from "@/components/PaymentUploadForm";
import type { Product } from "@shared/schema";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export function PaymentDialog({ open, onOpenChange, product }: PaymentDialogProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");

  const handlePayPalClick = () => {
    setSelectedPaymentMethod("PayPal");
    setShowUploadForm(true);
  };

  const handleOtherMethodClick = (method: string) => {
    setSelectedPaymentMethod(method);
    window.open("https://discord.gg/NR4Z9zeBW2", "_blank");
  };

  const handleCopyPayPalLink = () => {
    navigator.clipboard.writeText("https://www.paypal.com/ncp/payment/JEX4CVZ4QFCVW");
  };

  const handlePayNow = () => {
    window.open("https://www.paypal.com/ncp/payment/JEX4CVZ4QFCVW", "_blank");
  };

  if (showUploadForm) {
    return (
      <PaymentUploadForm
        open={open}
        onOpenChange={onOpenChange}
        product={product}
        paymentMethod={selectedPaymentMethod}
        onBack={() => setShowUploadForm(false)}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl neon-border neon-glow-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl neon-text" style={{ fontFamily: 'Orbitron' }}>
            Complete Your Purchase
          </DialogTitle>
          <DialogDescription>
            Choose your payment method below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-card p-4 rounded-lg neon-border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Product:</span>
              <span>{product.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Price:</span>
              <span className="text-2xl font-bold text-primary neon-text">
                ${(product.price / 100).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Payment Methods:</h3>

            <div className="space-y-2">
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg neon-border">
                <CreditCard className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">PayPal</span>
                    <Badge variant="outline" className="neon-glow-sm">Recommended</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handlePayNow}
                      size="sm"
                      data-testid="button-pay-now"
                      className="neon-glow"
                    >
                      Pay Now
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyPayPalLink}
                      data-testid="button-copy-paypal"
                    >
                      Copy Payment Link
                    </Button>
                    <Button
                      onClick={handlePayPalClick}
                      size="sm"
                      variant="secondary"
                      data-testid="button-upload-paypal-proof"
                    >
                      Upload Payment Proof
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card rounded-lg neon-border">
                <div className="flex items-start gap-3 mb-3">
                  <DollarSign className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold">Other Payment Methods</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      CashApp, Binance, Remitly, Wise, UPI (India)
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleOtherMethodClick("Other")}
                  className="w-full gap-2 neon-glow-blue"
                  data-testid="button-other-payment"
                >
                  <SiDiscord className="h-4 w-4" />
                  Create Ticket on Discord
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  To use these methods, please create a ticket on our Discord server.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg neon-border">
                <div className="flex items-start gap-3">
                  <Gift className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Gift Card Voucher</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Send code via ticket or DM after payment.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => handleOtherMethodClick("Gift Card")}
                      className="mt-2 gap-2"
                      size="sm"
                      data-testid="button-gift-card"
                    >
                      <SiDiscord className="h-4 w-4" />
                      Open Discord Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
            <p className="text-sm text-center">
              After payment, please send a screenshot and your IMVU ID in the ticket or through the upload form for confirmation.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
