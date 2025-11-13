import { SiDiscord, SiInstagram } from "react-icons/si";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border/40 bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-bold neon-text mb-4" style={{ fontFamily: 'Orbitron' }}>
              BM CREATIONS
            </h3>
            <p className="text-muted-foreground text-sm">
              Your trusted IMVU gaming hub for premium triggers, exclusive rooms, and creative tools.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <a href="/shop" className="hover:text-primary transition-colors">Shop</a>
              <a href="/about" className="hover:text-primary transition-colors">About Us</a>
              <a href="/track" className="hover:text-primary transition-colors">Track Order</a>
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://discord.gg/NR4Z9zeBW2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-2 rounded-md"
                data-testid="link-discord-footer"
              >
                <SiDiscord className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/imvu_trustedshop"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-2 rounded-md"
                data-testid="link-instagram-footer"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:deadpoolserver88@gmail.com"
                className="hover-elevate p-2 rounded-md"
                data-testid="link-email-footer"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Email: deadpoolserver88@gmail.com
            </p>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p className="mb-2">© 2025 BM Creations. All Rights Reserved.</p>
          <p className="text-xs">
            IMVU® is a registered trademark of IMVU Inc. BM Creations is an independent brand not affiliated with IMVU Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
