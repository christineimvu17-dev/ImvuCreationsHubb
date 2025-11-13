import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, ArrowLeft, CheckCircle } from "lucide-react";
import type { Product } from "@shared/schema";

const paymentUploadSchema = z.object({
  imvuId: z.string().min(1, "IMVU ID is required"),
  email: z.string().email("Valid email is required"),
  transactionId: z.string().min(1, "Transaction ID is required"),
  screenshot: z.any().refine((file) => file?.length > 0, "Payment screenshot is required"),
});

type PaymentUploadFormData = z.infer<typeof paymentUploadSchema>;

interface PaymentUploadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  paymentMethod: string;
  onBack: () => void;
}

export function PaymentUploadForm({
  open,
  onOpenChange,
  product,
  paymentMethod,
  onBack,
}: PaymentUploadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<PaymentUploadFormData>({
    resolver: zodResolver(paymentUploadSchema),
    defaultValues: {
      imvuId: "",
      email: "",
      transactionId: "",
    },
  });

  const onSubmit = async (data: PaymentUploadFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("imvuId", data.imvuId);
      formData.append("email", data.email);
      formData.append("transactionId", data.transactionId);
      formData.append("productId", product.id);
      formData.append("productName", product.name);
      formData.append("paymentMethod", paymentMethod);
      formData.append("screenshot", data.screenshot[0]);

      const response = await fetch("/api/payment-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit payment proof");
      }

      setSubmitted(true);
      toast({
        title: "Payment Proof Sent Successfully!",
        description: "Please wait for owner confirmation on Discord.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support on Discord.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md neon-border neon-glow-sm">
          <div className="text-center py-8">
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-full bg-primary/20 neon-glow">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 neon-text" style={{ fontFamily: 'Orbitron' }}>
              Payment Proof Sent!
            </h3>
            <p className="text-muted-foreground mb-6">
              Your payment proof has been successfully submitted. Please wait for owner confirmation on Discord.
            </p>
            <Button onClick={() => onOpenChange(false)} className="neon-glow" data-testid="button-close-success">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl neon-border neon-glow-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl neon-text" style={{ fontFamily: 'Orbitron' }}>
              Upload Payment Proof
            </DialogTitle>
          </div>
          <DialogDescription>
            Fill in your details and upload payment screenshot
          </DialogDescription>
        </DialogHeader>

        <div className="bg-card p-4 rounded-lg neon-border mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Product:</span>
            <span className="text-sm">{product.name}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Price:</span>
            <span className="text-lg font-bold text-primary neon-text">
              ${(product.price / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Payment Method:</span>
            <span className="text-sm">{paymentMethod}</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="imvuId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMVU ID *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your IMVU ID"
                      {...field}
                      data-testid="input-imvu-id"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction ID / Reference *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="PayPal transaction ID or payment reference"
                      {...field}
                      data-testid="input-transaction-id"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="screenshot"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Payment Screenshot *</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files)}
                        {...field}
                        data-testid="input-screenshot"
                      />
                      <Upload className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-primary/10 p-3 rounded-lg border border-primary/30">
              <p className="text-sm text-center">
                Make sure your payment screenshot is clear and includes the transaction details.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full neon-glow"
              disabled={isSubmitting}
              data-testid="button-submit-payment"
            >
              {isSubmitting ? "Submitting..." : "Submit Payment Proof"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
