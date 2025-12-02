import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  HelpCircle,
  Mail,
  Hash,
  Truck,
  ShoppingBag
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SiDiscord } from "react-icons/si";
import type { Order } from "@shared/schema";

const trackOrderSchema = z.object({
  search: z.string().min(1, "Please enter an Order ID or Email"),
});

type TrackOrderFormData = z.infer<typeof trackOrderSchema>;

const sampleStatuses = [
  {
    status: "pending",
    label: "Pending",
    description: "Awaiting payment confirmation",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
  },
  {
    status: "processing",
    label: "Processing",
    description: "Your order is being prepared",
    icon: Package,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
  {
    status: "completed",
    label: "Completed",
    description: "Product delivered to your IMVU account",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/20",
  },
  {
    status: "rejected",
    label: "Rejected",
    description: "Payment not verified - contact support",
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/20",
  },
];

export default function TrackOrder() {
  const [submittedSearch, setSubmittedSearch] = useState<string>("");

  const form = useForm<TrackOrderFormData>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      search: "",
    },
  });

  const { data: order, isLoading, isError } = useQuery<Order>({
    queryKey: ["/api/orders/track", submittedSearch],
    queryFn: async () => {
      const response = await fetch(`/api/orders/track?search=${encodeURIComponent(submittedSearch)}`);
      if (!response.ok) {
        throw new Error("Order not found");
      }
      return response.json();
    },
    enabled: !!submittedSearch,
    retry: false,
  });

  const onSubmit = (data: TrackOrderFormData) => {
    setSubmittedSearch(data.search);
  };

  const getStatusIcon = (status: string) => {
    const statusInfo = sampleStatuses.find(s => s.status === status);
    if (!statusInfo) return <Clock className="h-6 w-6 text-muted-foreground" />;
    const Icon = statusInfo.icon;
    return <Icon className={`h-6 w-6 ${statusInfo.color}`} />;
  };

  const getStatusText = (status: string) => {
    const statusInfo = sampleStatuses.find(s => s.status === status);
    return statusInfo?.description || "Unknown status";
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Track Your Order
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your Order ID or Email address to check your order status in real-time
          </p>
        </div>

        {/* Search Form */}
        <Card className="neon-border mb-8">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              placeholder="Enter Order ID (e.g., BM-ABC123) or Email"
                              className="pl-10 h-12 text-base"
                              {...field}
                              data-testid="input-track-order"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="neon-glow gap-2 h-12" data-testid="button-track">
                    <Search className="h-5 w-5" />
                    Track Order
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* How to Track Section */}
        {!submittedSearch && (
          <div className="space-y-8">
            <Card className="neon-border bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  How to Track Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Hash className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Using Order ID</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Enter your unique Order ID that was provided after checkout.
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Example formats:</p>
                        <code className="text-xs bg-background/50 px-2 py-1 rounded">BM-ABC123</code>
                        <code className="text-xs bg-background/50 px-2 py-1 rounded ml-2">BM-XYZ789</code>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Using Email</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Enter the email address you used during checkout.
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Example:</p>
                        <code className="text-xs bg-background/50 px-2 py-1 rounded">yourname@email.com</code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Guide */}
            <Card className="neon-border bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Truck className="w-6 h-6 text-primary" />
                  Order Status Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sampleStatuses.map((status) => {
                    const Icon = status.icon;
                    return (
                      <div 
                        key={status.status}
                        className={`flex items-center gap-4 p-4 rounded-lg ${status.bgColor} border border-border/30`}
                        data-testid={`status-example-${status.status}`}
                      >
                        <div className="w-12 h-12 rounded-full bg-background/30 flex items-center justify-center flex-shrink-0">
                          <Icon className={`w-6 h-6 ${status.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{status.label}</h4>
                          <p className="text-sm text-muted-foreground">{status.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="neon-border bg-gradient-to-r from-purple-900/20 to-blue-900/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-12 h-12 text-yellow-500" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-2">Can't Find Your Order?</h3>
                    <p className="text-muted-foreground text-sm">
                      If you can't find your order or need help, please contact our support team on Discord. 
                      Make sure to have your payment receipt ready.
                    </p>
                  </div>
                  <a href="https://discord.gg/NR4Z9zeBW2" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" className="gap-2" data-testid="button-discord-help">
                      <SiDiscord className="w-4 h-4" />
                      Get Help on Discord
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="neon-border">
            <CardContent className="p-12 text-center">
              <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Searching for your order...</p>
            </CardContent>
          </Card>
        )}

        {/* Order Not Found */}
        {!isLoading && submittedSearch && isError && (
          <Card className="neon-border">
            <CardContent className="p-8 text-center">
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Order Not Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find an order with this Order ID or Email. Please double-check your information and try again.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSubmittedSearch("")}
                  data-testid="button-try-again"
                >
                  Try Again
                </Button>
                <a href="https://discord.gg/NR4Z9zeBW2" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="gap-2">
                    <SiDiscord className="w-4 h-4" />
                    Contact Support
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Found - Display Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Info Card */}
            <Card className="neon-border neon-glow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 border-b border-border/50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    <span className="text-xl font-bold" style={{ fontFamily: 'Orbitron' }}>
                      Order #{order.orderId}
                    </span>
                  </div>
                  <Badge
                    variant={
                      order.status === "completed"
                        ? "default"
                        : order.status === "rejected"
                        ? "destructive"
                        : "outline"
                    }
                    className="text-sm px-3 py-1"
                    data-testid="badge-order-status"
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Product</p>
                    <p className="font-semibold text-lg">{order.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">IMVU ID</p>
                    <p className="font-semibold text-lg">{order.imvuId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                    <p className="font-semibold">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="font-semibold text-lg text-primary">
                      ${(order.total / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Progress Card */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="text-xl neon-text" style={{ fontFamily: 'Orbitron' }}>
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-card">
                  <div className="p-3 rounded-full bg-card neon-border">
                    {getStatusIcon(order.status)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg capitalize">{order.status}</p>
                    <p className="text-muted-foreground">{getStatusText(order.status)}</p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="relative">
                  <div className="flex justify-between items-start">
                    {/* Step 1: Pending */}
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        order.status !== "rejected" 
                          ? "bg-primary neon-glow-sm text-primary-foreground" 
                          : "bg-muted"
                      }`}>
                        <Clock className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-center font-medium">Pending</p>
                    </div>

                    {/* Connector */}
                    <div className={`flex-1 h-1 mt-5 mx-1 ${
                      order.status === "processing" || order.status === "completed"
                        ? "bg-primary"
                        : "bg-muted"
                    }`} />

                    {/* Step 2: Processing */}
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        order.status === "processing" || order.status === "completed"
                          ? "bg-secondary neon-glow-blue text-secondary-foreground"
                          : "bg-muted"
                      }`}>
                        <Package className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-center font-medium">Processing</p>
                    </div>

                    {/* Connector */}
                    <div className={`flex-1 h-1 mt-5 mx-1 ${
                      order.status === "completed"
                        ? "bg-green-500"
                        : "bg-muted"
                    }`} />

                    {/* Step 3: Completed */}
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        order.status === "completed"
                          ? "bg-green-500 shadow-lg shadow-green-500/30"
                          : "bg-muted"
                      }`}>
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-center font-medium">Completed</p>
                    </div>
                  </div>
                </div>

                {order.status === "rejected" && (
                  <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-red-400">Payment Not Verified</p>
                        <p className="text-sm text-muted-foreground">
                          Please contact our support team on Discord with your payment receipt.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {order.status === "completed" && (
                  <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-green-400">Order Complete!</p>
                        <p className="text-sm text-muted-foreground">
                          Your product has been delivered to your IMVU account. Check your IMVU inbox!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Search Another Order */}
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setSubmittedSearch("");
                  form.reset();
                }}
                className="gap-2"
                data-testid="button-search-another"
              >
                <Search className="w-4 h-4" />
                Track Another Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
