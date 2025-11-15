import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CartCheckoutDialog } from "@/components/CartCheckoutDialog";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setCheckoutOpen(true);
    onOpenChange(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
            </SheetTitle>
          </SheetHeader>

          <div className="mt-8 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add products to your cart to continue shopping
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-3 rounded-lg border neon-border hover-elevate"
                      data-testid={`cart-item-${item.productId}`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        <p className="text-sm text-primary font-semibold">
                          ${(item.price / 100).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            data-testid={`button-decrease-${item.productId}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm" data-testid={`quantity-${item.productId}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            data-testid={`button-increase-${item.productId}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-auto text-destructive"
                            onClick={() => removeFromCart(item.productId)}
                            data-testid={`button-remove-${item.productId}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-secondary">
                          ${(item.lineTotal / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <SheetFooter className="flex-col gap-4 sm:flex-col">
                  <div className="flex justify-between items-center py-4 border-t">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold neon-text">
                      ${(subtotal / 100).toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full neon-glow"
                    size="lg"
                    data-testid="button-checkout"
                  >
                    Proceed to Checkout
                  </Button>
                </SheetFooter>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CartCheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
      />
    </>
  );
}
