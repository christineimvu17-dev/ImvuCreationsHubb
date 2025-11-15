import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, CreditCard, Lock, Package, ShieldCheck, Trash2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Choose Your Product",
      description: "Browse our catalog and select the perfect trigger, room, or bundle for your IMVU experience.",
      iconBgClass: "bg-primary/20 neon-glow-sm",
      iconColorClass: "text-primary"
    },
    {
      icon: CreditCard,
      title: "Complete Payment",
      description: "Choose your preferred payment method and complete the secure checkout process.",
      iconBgClass: "bg-secondary/20 neon-glow-blue",
      iconColorClass: "text-secondary"
    },
    {
      icon: Lock,
      title: "Secure Processing",
      description: "Your login credentials are encrypted with military-grade security during processing.",
      iconBgClass: "bg-primary/20 neon-glow-sm",
      iconColorClass: "text-primary"
    },
    {
      icon: Package,
      title: "Instant Delivery",
      description: "Your product is delivered directly to your IMVU account within minutes of verification.",
      iconBgClass: "bg-secondary/20 neon-glow-blue",
      iconColorClass: "text-secondary"
    },
    {
      icon: ShieldCheck,
      title: "Verified & Safe",
      description: "All transactions are monitored and verified by our security team for your protection.",
      iconBgClass: "bg-primary/20 neon-glow-sm",
      iconColorClass: "text-primary"
    },
    {
      icon: Trash2,
      title: "Auto-Deleted",
      description: "Your credentials are automatically deleted from our servers after successful delivery.",
      iconBgClass: "bg-secondary/20 neon-glow-blue",
      iconColorClass: "text-secondary"
    }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            We've made buying IMVU products simple, secure, and fast. Here's how our delivery process works:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="neon-border hover-elevate transition-all duration-300"
              data-testid={`card-how-it-works-${index}`}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className={`p-3 rounded-full ${step.iconBgClass}`}>
                    <step.icon className={`h-6 w-6 ${step.iconColorClass}`} />
                  </div>
                  <span className="text-2xl font-bold text-muted-foreground/50">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl p-8 neon-border" data-testid="section-security-assurance">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 rounded-full bg-primary/20 neon-glow-sm shrink-0">
              <ShieldCheck className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3 neon-text" style={{ fontFamily: 'Orbitron' }}>
                Your Security is Our Priority
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We understand that sharing your login credentials can be concerning. That's why we use{" "}
                <span className="text-primary font-semibold">bank-level encryption</span> to protect your information during processing.{" "}
                Your passwords, IDs, and login details are{" "}
                <span className="text-secondary font-semibold">automatically deleted</span> from our servers{" "}
                immediately after your product is delivered. We never store your sensitive information beyond the delivery window.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
