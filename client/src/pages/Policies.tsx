import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, RefreshCw, Truck, Shield, FileText, Clock, CreditCard, MessageSquare, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

const faqItems = [
  {
    question: "How do I purchase products from BM Creations?",
    answer: "Simply browse our catalog, add items to your cart, and proceed to checkout. You'll need to provide your IMVU ID and email address. After payment is confirmed, your product will be delivered directly to your IMVU account."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept PayPal as our primary payment method. Alternative payment methods including CashApp, Binance, Remitly, Wise, Gift Cards, and UPI are handled through our Discord server via ticket system."
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders are delivered within 1-24 hours after payment confirmation. During peak times, delivery may take up to 48 hours. You'll receive an email notification once your product is delivered."
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the digital nature of our products, refunds are only offered if we are unable to deliver your order. Once a product has been delivered to your IMVU account, it cannot be refunded. Please see our Refund Policy for full details."
  },
  {
    question: "What is the 'Free Room for First-Time Buyers' offer?",
    answer: "First-time buyers receive a complimentary room with their first purchase! This is automatically applied when you place your first order. The free room will be delivered along with your purchased items."
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order using the 'Track Order' page. Simply enter your order ID or the email address you used during checkout to see your order status."
  },
  {
    question: "What if I entered the wrong IMVU ID?",
    answer: "Contact us immediately through Discord or our Contact page. If the order hasn't been processed yet, we can update the information. Once delivered, we cannot transfer products to a different account."
  },
  {
    question: "Are your products safe to use?",
    answer: "Yes! We use bank-level encryption for all transactions and automatically delete login credentials after delivery. Our security team monitors all deliveries to ensure your account safety."
  },
  {
    question: "Do you offer bundles or discounts?",
    answer: "Yes! Check our Shop page for bundle deals and special offers. We also have promotional offers displayed on our homepage. Join our Discord for exclusive discount codes!"
  },
  {
    question: "Can I request a custom product?",
    answer: "Yes! Contact us through our Discord server or Contact page to discuss custom orders. We can create custom triggers, rooms, and bundles based on your specifications."
  }
];

export default function Policies() {
  const [, setLocation] = useLocation();
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
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold neon-text mb-4" data-testid="text-policies-title">
            Help & Policies
          </h1>
          <p className="text-gray-400 text-lg">
            Everything you need to know about shopping with BM Creations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="flex flex-wrap w-full bg-black/50 border border-purple-500/30 mb-6">
            <TabsTrigger value="faq" className="flex-1" data-testid="tab-faq">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="refund" className="flex-1" data-testid="tab-refund">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refund
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex-1" data-testid="tab-delivery">
              <Truck className="w-4 h-4 mr-2" />
              Delivery
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex-1" data-testid="tab-privacy">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex-1" data-testid="tab-terms">
              <FileText className="w-4 h-4 mr-2" />
              Terms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="neon-text flex items-center gap-2">
                  <HelpCircle className="w-6 h-6" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqItems.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-purple-500/30 rounded-lg px-4 bg-black/30"
                      data-testid={`faq-item-${index}`}
                    >
                      <AccordionTrigger className="text-white hover:text-purple-300 text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refund">
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="neon-text flex items-center gap-2">
                  <RefreshCw className="w-6 h-6" />
                  Refund Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <p className="text-lg">
                  At BM Creations, we strive to ensure complete customer satisfaction. Please review our refund policy below.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-400 mb-1">Eligible for Refund</h3>
                      <ul className="text-gray-400 space-y-1 text-sm">
                        <li>Order not delivered within 48 hours</li>
                        <li>Wrong product delivered (must contact within 24 hours)</li>
                        <li>Product does not work as described</li>
                        <li>Order cancelled before processing</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-red-400 mb-1">Not Eligible for Refund</h3>
                      <ul className="text-gray-400 space-y-1 text-sm">
                        <li>Product already delivered to your IMVU account</li>
                        <li>Change of mind after purchase</li>
                        <li>Incorrect IMVU ID provided by customer</li>
                        <li>Account banned by IMVU after delivery</li>
                        <li>Gifts already sent to recipient</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <h3 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Refund Process
                  </h3>
                  <ol className="text-gray-400 space-y-2 text-sm list-decimal list-inside">
                    <li>Contact us via Discord or our Contact page</li>
                    <li>Provide your order ID and reason for refund</li>
                    <li>Our team will review your request within 24-48 hours</li>
                    <li>If approved, refund will be processed to original payment method</li>
                    <li>PayPal refunds typically appear within 3-5 business days</li>
                  </ol>
                </div>

                <p className="text-sm text-gray-500 italic">
                  Last updated: December 2024. We reserve the right to modify this policy at any time.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery">
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="neon-text flex items-center gap-2">
                  <Truck className="w-6 h-6" />
                  Delivery Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <p className="text-lg">
                  We pride ourselves on fast, secure delivery of all IMVU products directly to your account.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Delivery Times
                    </h3>
                    <ul className="text-gray-400 space-y-2 text-sm">
                      <li><span className="text-green-400">Standard:</span> 1-24 hours</li>
                      <li><span className="text-yellow-400">Peak Times:</span> Up to 48 hours</li>
                      <li><span className="text-blue-400">Custom Orders:</span> 2-7 days</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Notifications
                    </h3>
                    <ul className="text-gray-400 space-y-2 text-sm">
                      <li>Email confirmation upon order placement</li>
                      <li>Email notification when order is delivered</li>
                      <li>Discord notification (if connected)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h3 className="font-semibold text-blue-300 mb-2">How Delivery Works</h3>
                  <ol className="text-gray-400 space-y-2 text-sm list-decimal list-inside">
                    <li>After payment confirmation, your order enters our queue</li>
                    <li>Our delivery team securely accesses your IMVU account</li>
                    <li>Products are transferred directly to your inventory</li>
                    <li>Login credentials are immediately deleted after delivery</li>
                    <li>You receive an email confirming successful delivery</li>
                  </ol>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <h3 className="font-semibold text-yellow-300 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Important Notes
                  </h3>
                  <ul className="text-gray-400 space-y-1 text-sm">
                    <li>Ensure your IMVU ID is correct before placing an order</li>
                    <li>Do not change your IMVU password during the delivery process</li>
                    <li>If delivery takes longer than expected, check your spam folder</li>
                    <li>Contact us if you don't receive confirmation within 48 hours</li>
                  </ul>
                </div>

                <p className="text-sm text-gray-500 italic">
                  Delivery times are estimates and may vary based on order volume and product availability.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="neon-text flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <p className="text-lg">
                  Your privacy is our top priority. This policy explains how we collect, use, and protect your information.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">Information We Collect</h3>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li><strong>Contact Info:</strong> Email address for order notifications</li>
                      <li><strong>IMVU ID:</strong> Required for product delivery</li>
                      <li><strong>Payment Info:</strong> Processed securely through PayPal (we never see your full payment details)</li>
                      <li><strong>Order History:</strong> To provide support and track deliveries</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">How We Use Your Information</h3>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>Process and deliver your orders</li>
                      <li>Send order confirmations and updates</li>
                      <li>Provide customer support</li>
                      <li>Improve our services</li>
                      <li>Prevent fraud and ensure security</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h3 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security Measures
                    </h3>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>Bank-level SSL encryption for all transactions</li>
                      <li>IMVU login credentials deleted immediately after delivery</li>
                      <li>Secure servers with regular security audits</li>
                      <li>No storage of payment card details</li>
                      <li>Encrypted data transmission</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">Your Rights</h3>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>Request access to your personal data</li>
                      <li>Request deletion of your account and data</li>
                      <li>Opt out of promotional communications</li>
                      <li>Update your information at any time</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <h3 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Third-Party Services
                  </h3>
                  <p className="text-gray-400 text-sm">
                    We use PayPal for payment processing. Your payment information is handled directly by PayPal according to their privacy policy. We never have access to your full payment details.
                  </p>
                </div>

                <p className="text-sm text-gray-500 italic">
                  Last updated: December 2024. Contact us at Discord for any privacy-related questions.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="neon-text flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Terms of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <p className="text-lg">
                  By using BM Creations, you agree to the following terms and conditions.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">1. Account Requirements</h3>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>You must have a valid IMVU account to receive products</li>
                      <li>You must provide accurate information for orders</li>
                      <li>You are responsible for maintaining the security of your IMVU account</li>
                      <li>You must be at least 13 years old to use our services</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">2. Purchases & Payments</h3>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>All prices are in USD unless otherwise stated</li>
                      <li>Payment must be completed before order processing</li>
                      <li>Prices may change without notice</li>
                      <li>Digital products are non-refundable after delivery</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">3. Product Delivery</h3>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>Products are delivered directly to your IMVU account</li>
                      <li>Delivery requires temporary access to your IMVU account</li>
                      <li>We are not responsible for issues caused by incorrect account information</li>
                      <li>Delivery times are estimates, not guarantees</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">4. Prohibited Activities</h3>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>Reselling our products without permission</li>
                      <li>Attempting to defraud or chargeback after delivery</li>
                      <li>Providing false information</li>
                      <li>Harassing our staff or other customers</li>
                      <li>Using our services for any illegal purpose</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <h3 className="font-semibold text-yellow-300 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      5. Disclaimers
                    </h3>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>BM Creations is not affiliated with IMVU Inc.</li>
                      <li>We are not responsible for actions taken by IMVU against your account</li>
                      <li>Products are provided "as is" without warranties</li>
                      <li>We reserve the right to refuse service to anyone</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">6. Intellectual Property</h3>
                    <p className="text-gray-400 text-sm">
                      All content on this website, including logos, designs, and text, is the property of BM Creations. You may not copy, reproduce, or distribute our content without permission.
                    </p>
                  </div>

                  <div className="p-4 bg-black/30 border border-purple-500/30 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-2">7. Changes to Terms</h3>
                    <p className="text-gray-400 text-sm">
                      We may update these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 italic">
                  Last updated: December 2024. By placing an order, you acknowledge that you have read and agree to these terms.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all"
            data-testid="link-contact-us"
          >
            <MessageSquare className="w-5 h-5" />
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
