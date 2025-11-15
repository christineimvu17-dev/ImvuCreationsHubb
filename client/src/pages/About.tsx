import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Users, Award } from "lucide-react";
import HowItWorks from "@/components/HowItWorks";

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Who We Are
          </h1>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground">
            <p>
              <span className="text-foreground font-semibold">BM Creations</span> is a creative digital brand for IMVU gamers.
            </p>
            <p>
              We design, sell, and promote high-quality IMVU products including triggers, animations, and custom rooms.
            </p>
            <p>
              Our goal is to give players a <span className="text-primary font-semibold">premium experience</span> inside IMVU — from smooth triggers to luxurious 3D environments.
            </p>
            <p className="text-foreground">
              Trusted by hundreds of satisfied customers for <span className="text-primary font-semibold">honesty, speed, and innovation</span>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card className="neon-border hover-elevate transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-full bg-primary/20 neon-glow-sm">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Trusted Brand</h3>
              <p className="text-sm text-muted-foreground">
                Hundreds of satisfied customers worldwide
              </p>
            </CardContent>
          </Card>

          <Card className="neon-border hover-elevate transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-full bg-secondary/20 neon-glow-blue">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Quick processing and instant delivery
              </p>
            </CardContent>
          </Card>

          <Card className="neon-border hover-elevate transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-full bg-primary/20 neon-glow-sm">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Community First</h3>
              <p className="text-sm text-muted-foreground">
                Active support via Discord community
              </p>
            </CardContent>
          </Card>

          <Card className="neon-border hover-elevate transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-full bg-secondary/20 neon-glow-blue">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                High-quality triggers and exclusive rooms
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-card rounded-xl p-8 neon-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center neon-text" style={{ fontFamily: 'Orbitron' }}>
            Our Mission
          </h2>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            To empower IMVU players with the best digital products and services, creating unforgettable virtual experiences through innovation, quality, and exceptional customer service.
          </p>
        </div>
      </div>

      <HowItWorks />
    </div>
  );
}
