import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Home, Info, MessageCircle, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { CartSheet } from "@/components/CartSheet";

export function Header() {
  const [location] = useLocation();
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2">
            <div className="text-2xl font-bold neon-text tracking-wider" style={{ fontFamily: 'Orbitron' }}>
              BM CREATIONS
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" data-testid="link-home-nav">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="default"
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/shop" data-testid="link-shop">
            <Button
              variant={isActive("/shop") ? "default" : "ghost"}
              size="default"
              className="gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop
            </Button>
          </Link>
          <Link href="/about" data-testid="link-about">
            <Button
              variant={isActive("/about") ? "default" : "ghost"}
              size="default"
              className="gap-2"
            >
              <Info className="h-4 w-4" />
              About
            </Button>
          </Link>
          <Link href="/track" data-testid="link-track">
            <Button
              variant={isActive("/track") ? "default" : "ghost"}
              size="default"
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Track Order
            </Button>
          </Link>
          <Link href="/contact" data-testid="link-contact">
            <Button
              variant={isActive("/contact") ? "default" : "ghost"}
              size="default"
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Contact
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(true)}
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="default"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs neon-glow"
                data-testid="badge-cart-count"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}
