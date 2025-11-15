import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, ShoppingCart } from "lucide-react";

interface CartCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartCheckoutDialog({ open, onOpenChange }: CartCheckoutDialogProps) {
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imvuId, setImvuId] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const orderMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/orders/cart", {
        method: "POST",
        body: data,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create order");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ID is: ${data.orderId}. We'll process your order shortly.`,
      });
      clearCart();
      onOpenChange(false);
      setImvuId("");
      setEmail("");
      setScreenshot(null);
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imvuId || !email) {
      toast({
        title: "Missing Information",
        description: "Please provide your IMVU ID and email",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod !== "paypal" && !screenshot) {
      toast({
        title: "Payment Proof Required",
        description: "Please upload a payment screenshot",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("imvuId", imvuId);
    formData.append("email", email);
    formData.append("paymentMethod", paymentMethod);
    formData.append("items", JSON.stringify(items));
    formData.append("subtotal", subtotal.toString());
    formData.append("total", subtotal.toString());
    
    if (screenshot) {
      formData.append("screenshot", screenshot);
    }

    orderMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[85vh] overflow-hidden p-0 gap-0 grid-rows-[auto_1fr_auto]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Checkout - {items.length} {items.length === 1 ? "Item" : "Items"}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto px-6 py-4 space-y-6 min-h-0">
          <div className="space-y-3 max-h-40 overflow-y-auto">
            <h3 className="font-semibold text-sm text-muted-foreground">Order Summary</h3>
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm py-2 border-b">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span className="font-semibold text-primary">
                  ${(item.lineTotal / 100).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-lg font-bold pt-2">
              <span>Total:</span>
              <span className="neon-text">${(subtotal / 100).toFixed(2)}</span>
            </div>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imvu-id">IMVU ID *</Label>
              <Input
                id="imvu-id"
                placeholder="Enter your IMVU ID"
                value={imvuId}
                onChange={(e) => setImvuId(e.target.value)}
                data-testid="input-imvu-id"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-email"
                required
              />
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Choose your payment method below
              </p>
            </div>

            <div className="space-y-3">
              <Label>Payment Method *</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" data-testid="radio-paypal" />
                  <Label htmlFor="paypal" className="cursor-pointer">
                    PayPal
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="discord" id="discord" data-testid="radio-discord" />
                  <Label htmlFor="discord" className="cursor-pointer">
                    Other (CashApp, Binance, etc.) - Discord Ticket
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "paypal" && (
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <p className="text-sm mb-3">
                  <strong>Total Amount:</strong> ${(subtotal / 100).toFixed(2)}
                </p>
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="w-full neon-glow-blue"
                  onClick={() => window.open("https://www.paypal.com/paypalme/bmcreationspayments", "_blank")}
                  data-testid="button-paypal"
                >
                  Pay via PayPal
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  After payment, upload screenshot below or submit order and send proof via Discord.
                </p>
              </div>
            )}

            {paymentMethod === "discord" && (
              <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                <p className="text-sm mb-3">
                  Open a Discord ticket for alternative payment methods (CashApp, Binance, Remitly, Wise, Gift Cards, UPI).
                </p>
                <a
                  href="https://discord.gg/NR4Z9zeBW2"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-discord-checkout"
                >
                  <Button type="button" variant="secondary" className="w-full neon-glow-blue">
                    Open Discord Ticket
                  </Button>
                </a>
              </div>
            )}

            {paymentMethod !== "paypal" && (
              <div className="space-y-2">
                <Label htmlFor="screenshot">Payment Screenshot *</Label>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                  data-testid="input-screenshot"
                  required
                />
              </div>
            )}

          </form>
        </div>

        <div className="px-6 py-4 border-t bg-background shrink-0">
          <Button
            type="submit"
            form="checkout-form"
            className="w-full neon-glow"
            size="lg"
            disabled={orderMutation.isPending}
            data-testid="button-submit-order"
          >
            {orderMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Order...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
