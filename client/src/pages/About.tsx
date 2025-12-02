import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, 
  RefreshCw, 
  Truck, 
  Shield, 
  FileText, 
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail
} from "lucide-react";
import { Link } from "wouter";
import { SiDiscord } from "react-icons/si";

export default function About() {
  const [activeTab, setActiveTab] = useState("faq");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && ["faq", "refund", "delivery", "privacy", "terms"].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.history.replaceState(null, "", `#${value}`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold neon-text mb-4" style={{ fontFamily: 'Orbitron' }} data-testid="text-policies-title">
            Help & Policies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about shopping with BM Creations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-card/50 p-1 h-auto">
            <TabsTrigger value="faq" className="flex-1 gap-2 py-3" data-testid="tab-faq">
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="refund" className="flex-1 gap-2 py-3" data-testid="tab-refund">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refund</span>
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex-1 gap-2 py-3" data-testid="tab-delivery">
              <Truck className="w-4 h-4" />
              <span className="hidden sm:inline">Delivery</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex-1 gap-2 py-3" data-testid="tab-privacy">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex-1 gap-2 py-3" data-testid="tab-terms">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Terms</span>
            </TabsTrigger>
          </TabsList>

          {/* FAQ Section */}
          <TabsContent value="faq">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl neon-text" style={{ fontFamily: 'Orbitron' }}>
                  <HelpCircle className="w-6 h-6" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" data-testid="faq-item-0">
                    <AccordionTrigger className="text-left">What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      We accept PayPal, CashApp, Binance, Wise, Gift Cards (Amazon, Steam, etc.), and UPI. PayPal is our primary method for fastest processing. For other payment methods, please open a ticket on our Discord server.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" data-testid="faq-item-1">
                    <AccordionTrigger className="text-left">How long does delivery take?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Most orders are delivered within 5-30 minutes after payment confirmation. During peak hours or if our team is busy, delivery may take up to 24 hours. You'll receive a Discord notification when your order is ready.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" data-testid="faq-item-2">
                    <AccordionTrigger className="text-left">Are the triggers and rooms permanent?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes! All our products are permanent and come with a lifetime warranty. If anything stops working, contact us and we'll fix it for free.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" data-testid="faq-item-3">
                    <AccordionTrigger className="text-left">Do products work on PC and Mobile?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Most of our products work on both PC and Mobile. Each product page clearly shows platform compatibility. Some advanced triggers may be PC-only due to IMVU limitations.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" data-testid="faq-item-4">
                    <AccordionTrigger className="text-left">Is my IMVU account safe?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Absolutely! We never ask for your IMVU password. We only need your IMVU ID to deliver products. Your account credentials are never stored and we use secure methods to deliver products.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" data-testid="faq-item-5">
                    <AccordionTrigger className="text-left">How do I track my order?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Visit our Track Order page and enter your Order ID or email address. You'll see the current status of your order. You can also contact us on Discord for updates.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7" data-testid="faq-item-6">
                    <AccordionTrigger className="text-left">What if my product doesn't work?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Contact us immediately on Discord! We provide full support and will either fix the issue or provide a replacement at no extra cost. All products come with lifetime warranty.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8" data-testid="faq-item-7">
                    <AccordionTrigger className="text-left">Can I get a refund?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Refunds are available if we cannot deliver your order. Once a product is delivered, we offer replacement instead of refund. Please see our full Refund Policy for details.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Refund Policy Section */}
          <TabsContent value="refund">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl neon-text" style={{ fontFamily: 'Orbitron' }}>
                  <RefreshCw className="w-6 h-6" />
                  Refund Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Eligible for Refund
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Order cannot be fulfilled due to technical issues on our end</li>
                    <li>Payment made but product not delivered within 48 hours</li>
                    <li>Wrong product delivered (different from what was ordered)</li>
                    <li>Duplicate payment for the same order</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Not Eligible for Refund
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Product already delivered to your IMVU account</li>
                    <li>Change of mind after purchase</li>
                    <li>IMVU account banned or suspended (not our responsibility)</li>
                    <li>Incorrect IMVU ID provided by customer</li>
                    <li>Product issues that can be resolved with support</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Refund Process
                  </h3>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                    <li>Contact us on Discord within 48 hours of purchase</li>
                    <li>Provide your Order ID and payment receipt</li>
                    <li>Explain the reason for your refund request</li>
                    <li>Our team will review and respond within 24 hours</li>
                    <li>If approved, refund will be processed to original payment method</li>
                  </ol>
                </div>

                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> We prioritize customer satisfaction. If you have any issues, please contact us first. We almost always find a solution that works for everyone!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Policy Section */}
          <TabsContent value="delivery">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl neon-text" style={{ fontFamily: 'Orbitron' }}>
                  <Truck className="w-6 h-6" />
                  Delivery Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                    <h4 className="font-semibold mb-1">Standard Delivery</h4>
                    <p className="text-sm text-muted-foreground">5-30 minutes</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border text-center">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <h4 className="font-semibold mb-1">Peak Hours</h4>
                    <p className="text-sm text-muted-foreground">Up to 2 hours</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                    <h4 className="font-semibold mb-1">Maximum Wait</h4>
                    <p className="text-sm text-muted-foreground">24 hours</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Delivery Process</h3>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm flex-shrink-0">1</span>
                      <div>
                        <p className="font-medium">Payment Confirmation</p>
                        <p className="text-sm text-muted-foreground">We verify your payment within minutes</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm flex-shrink-0">2</span>
                      <div>
                        <p className="font-medium">Order Processing</p>
                        <p className="text-sm text-muted-foreground">Our team prepares your product for delivery</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm flex-shrink-0">3</span>
                      <div>
                        <p className="font-medium">Product Delivery</p>
                        <p className="text-sm text-muted-foreground">Product is transferred to your IMVU account</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm flex-shrink-0">4</span>
                      <div>
                        <p className="font-medium">Confirmation</p>
                        <p className="text-sm text-muted-foreground">You receive notification and can start using your product</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <h3 className="font-semibold text-yellow-400 mb-2">Important Notes</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Make sure your IMVU ID is correct before placing an order</li>
                    <li>Keep your IMVU account online during delivery for faster processing</li>
                    <li>Check your IMVU inbox after delivery confirmation</li>
                    <li>Contact Discord support if delivery takes longer than 24 hours</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Policy Section */}
          <TabsContent value="privacy">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl neon-text" style={{ fontFamily: 'Orbitron' }}>
                  <Shield className="w-6 h-6" />
                  Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Information We Collect</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li><strong>IMVU ID:</strong> Required for product delivery</li>
                    <li><strong>Email Address:</strong> For order confirmations and support</li>
                    <li><strong>Payment Information:</strong> Processed securely through third-party providers</li>
                    <li><strong>Order History:</strong> To provide support and warranty services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">How We Use Your Information</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>To process and deliver your orders</li>
                    <li>To provide customer support</li>
                    <li>To send order updates and confirmations</li>
                    <li>To honor product warranties</li>
                    <li>To prevent fraud and abuse</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Data Security</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>We use industry-standard encryption for all data transmission</li>
                    <li>Payment details are never stored on our servers</li>
                    <li>We never ask for or store your IMVU password</li>
                    <li>Access to customer data is restricted to essential staff only</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Information Sharing</h3>
                  <p className="text-muted-foreground">
                    We do not sell, trade, or share your personal information with third parties except as required to process your orders (payment processors) or as required by law.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Your Rights</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Request access to your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data (subject to legal requirements)</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </div>

                <p className="text-sm text-muted-foreground">
                  <strong>Contact:</strong> For privacy-related inquiries, please contact us on Discord or through our Contact page.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms of Service Section */}
          <TabsContent value="terms">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl neon-text" style={{ fontFamily: 'Orbitron' }}>
                  <FileText className="w-6 h-6" />
                  Terms of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">1. Account Requirements</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>You must have a valid IMVU account to purchase products</li>
                    <li>You must be at least 18 years old or have parental consent</li>
                    <li>You are responsible for providing accurate IMVU ID and contact information</li>
                    <li>You must not use our products for any illegal activities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">2. Purchases & Payments</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>All prices are displayed in USD</li>
                    <li>Payment must be completed before order processing</li>
                    <li>We reserve the right to refuse service to anyone</li>
                    <li>Prices may change without notice for future purchases</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">3. Product Usage</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Products are for personal use on your IMVU account only</li>
                    <li>Reselling or redistributing our products is prohibited</li>
                    <li>We are not responsible for how you use the products within IMVU</li>
                    <li>Products may be subject to IMVU's terms of service</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">4. Warranty & Support</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>All products include lifetime warranty for technical issues</li>
                    <li>Warranty does not cover IMVU bans or account issues</li>
                    <li>Support is provided through Discord only</li>
                    <li>We reserve the right to modify warranty terms with notice</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">5. Limitation of Liability</h3>
                  <p className="text-muted-foreground">
                    BM Creations is not responsible for any losses, damages, or issues arising from the use of our products within IMVU. We do not guarantee compatibility with future IMVU updates. Our liability is limited to the purchase price of the product.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">6. Modifications</h3>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
                  </p>
                </div>

                <p className="text-sm text-muted-foreground italic">
                  Last updated: December 2024
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <Card className="neon-border bg-gradient-to-r from-purple-900/20 to-blue-900/20">
            <CardContent className="p-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Orbitron' }}>
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Our support team is available 24/7 on Discord. We're always happy to help!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button className="neon-glow gap-2" data-testid="link-contact-us">
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </Button>
                </Link>
                <a href="https://discord.gg/NR4Z9zeBW2" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="gap-2" data-testid="link-discord-support">
                    <SiDiscord className="w-4 h-4" />
                    Join Discord
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
