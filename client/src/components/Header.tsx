import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Home, Info, MessageCircle, Search } from "lucide-react";
import { SiDiscord, SiInstagram } from "react-icons/si";

export function Header() {
  const [location] = useLocation();

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
          <a
            href="https://discord.gg/NR4Z9zeBW2"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-discord-header"
          >
            <Button variant="ghost" size="icon" className="neon-glow-sm">
              <SiDiscord className="h-5 w-5" />
            </Button>
          </a>
          <a
            href="https://www.instagram.com/imvu_trustedshop"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-instagram-header"
          >
            <Button variant="ghost" size="icon" className="neon-glow-sm">
              <SiInstagram className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
