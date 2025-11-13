import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SiDiscord, SiInstagram } from "react-icons/si";
import { Mail, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  imvuUsername: z.string().min(1, "IMVU Username is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      imvuUsername: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us on Discord.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text" style={{ fontFamily: 'Orbitron' }}>
            Let's Connect
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help. Reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-2xl neon-text">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            data-testid="input-contact-name"
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
                            data-testid="input-contact-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imvuUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IMVU Username *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your IMVU username"
                            {...field}
                            data-testid="input-contact-imvu"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what you need help with..."
                            rows={6}
                            {...field}
                            data-testid="input-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full neon-glow gap-2"
                    disabled={isSubmitting}
                    data-testid="button-submit-contact"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="text-2xl neon-text">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/20 neon-glow-sm">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a
                      href="mailto:deadpoolserver88@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      deadpoolserver88@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-secondary/20 neon-glow-blue">
                    <SiDiscord className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Discord</p>
                    <a
                      href="https://discord.gg/NR4Z9zeBW2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-secondary transition-colors"
                      data-testid="link-discord-contact"
                    >
                      Join our Discord Server
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/20 neon-glow-sm">
                    <SiInstagram className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Instagram</p>
                    <a
                      href="https://www.instagram.com/imvu_trustedshop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-instagram-contact"
                    >
                      @imvu_trustedshop
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border neon-glow-sm bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3 neon-text" style={{ fontFamily: 'Orbitron' }}>
                  24/7 Support Available
                </h3>
                <p className="text-muted-foreground mb-4">
                  Join our Discord community for instant support and updates!
                </p>
                <a
                  href="https://discord.gg/NR4Z9zeBW2"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-join-discord-contact"
                >
                  <Button variant="secondary" className="neon-glow-blue gap-2">
                    <SiDiscord className="h-5 w-5" />
                    Join Discord Now
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
