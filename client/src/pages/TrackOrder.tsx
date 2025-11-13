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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "@shared/schema";

const trackOrderSchema = z.object({
  search: z.string().min(1, "Please enter an Order ID or Email"),
});

type TrackOrderFormData = z.infer<typeof trackOrderSchema>;

export default function TrackOrder() {
  const [searchValue, setSearchValue] = useState<string>("");

  const form = useForm<TrackOrderFormData>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      search: "",
    },
  });

  const { data: order, isLoading, refetch } = useQuery<Order>({
    queryKey: ["/api/orders/track", searchValue],
    queryFn: async () => {
      const response = await fetch(`/api/orders/track?search=${encodeURIComponent(searchValue)}`);
      if (!response.ok) {
        throw new Error("Order not found");
      }
      return response.json();
    },
    enabled: !!searchValue,
  });

  const onSubmit = (data: TrackOrderFormData) => {
    setSearchValue(data.search);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case "processing":
        return <Package className="h-6 w-6 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "rejected":
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Awaiting payment confirmation";
      case "processing":
        return "Your order is being completed";
      case "completed":
        return "Your product has been delivered";
      case "rejected":
        return "Payment not verified, please contact support";
      default:
        return "Unknown status";
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Track My Order
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your Order ID or Email to view your order status
          </p>
        </div>

        <Card className="neon-border mb-8">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Order ID or Email"
                          {...field}
                          data-testid="input-track-order"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="neon-glow gap-2" data-testid="button-track">
                  <Search className="h-4 w-4" />
                  Track
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="neon-border">
            <CardContent className="p-12 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Searching for your order...</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && searchValue && !order && (
          <Card className="neon-border">
            <CardContent className="p-12 text-center">
              <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Order Not Found</h3>
              <p className="text-muted-foreground">
                No order found with this Order ID or Email. Please check your information and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {order && (
          <div className="space-y-6">
            <Card className="neon-border neon-glow-sm">
              <CardHeader>
                <CardTitle className="text-2xl neon-text">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-semibold">{order.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Product</p>
                    <p className="font-semibold">{order.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">IMVU ID</p>
                    <p className="font-semibold">{order.imvuId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-semibold">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="text-2xl neon-text">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-card neon-border">
                    {getStatusIcon(order.status)}
                  </div>
                  <div className="flex-1">
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "rejected"
                          ? "destructive"
                          : "outline"
                      }
                      className="mb-2"
                    >
                      {order.status.toUpperCase()}
                    </Badge>
                    <p className="text-muted-foreground">{getStatusText(order.status)}</p>
                  </div>
                </div>

                <div className="relative pt-6">
                  <div className="flex justify-between mb-2">
                    <div className={`flex flex-col items-center ${order.status === "pending" || order.status === "processing" || order.status === "completed" ? "text-primary" : "text-muted-foreground"}`}>
                      <div className={`w-3 h-3 rounded-full ${order.status === "pending" || order.status === "processing" || order.status === "completed" ? "bg-primary neon-glow-sm" : "bg-muted"}`} />
                      <p className="text-xs mt-2 text-center">Pending</p>
                    </div>
                    <div className={`flex flex-col items-center ${order.status === "processing" || order.status === "completed" ? "text-secondary" : "text-muted-foreground"}`}>
                      <div className={`w-3 h-3 rounded-full ${order.status === "processing" || order.status === "completed" ? "bg-secondary neon-glow-blue" : "bg-muted"}`} />
                      <p className="text-xs mt-2 text-center">Processing</p>
                    </div>
                    <div className={`flex flex-col items-center ${order.status === "completed" ? "text-primary" : "text-muted-foreground"}`}>
                      <div className={`w-3 h-3 rounded-full ${order.status === "completed" ? "bg-primary neon-glow-sm" : "bg-muted"}`} />
                      <p className="text-xs mt-2 text-center">Completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
