import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, HelpCircle, DollarSign, Package } from "lucide-react";
import { SiDiscord } from "react-icons/si";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to BM Creations! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickActions = [
    { icon: HelpCircle, label: "Product Queries", value: "product" },
    { icon: DollarSign, label: "Payment Queries", value: "payment" },
    { icon: Package, label: "Order Support", value: "order" },
  ];

  const handleQuickAction = (action: string) => {
    let response = "";
    switch (action) {
      case "product":
        response = "I can help you with product information! Please visit our Shop page to see all available triggers, rooms, and bundles. If you have specific questions, feel free to ask or contact us on Discord.";
        break;
      case "payment":
        response = "For payment assistance, we accept PayPal, CashApp, Binance, Remitly, Wise, Gift Cards, and UPI. Please create a ticket on our Discord server for non-PayPal methods: https://discord.gg/NR4Z9zeBW2";
        break;
      case "order":
        response = "You can track your order using the Track Order page with your Order ID or email. If you need additional support, please join our Discord server: https://discord.gg/NR4Z9zeBW2";
        break;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: quickActions.find(a => a.value === action)?.label || "",
      sender: "user",
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "I can't understand what you're saying right now. Please wait for the owner's reply or contact us on Discord for immediate assistance: https://discord.gg/NR4Z9zeBW2",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputValue("");

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue, sender: "user" }),
      });
    } catch (error) {
      console.error("Failed to save chat message:", error);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full neon-glow shadow-xl z-50"
          onClick={() => setIsOpen(true)}
          data-testid="button-open-chat"
        >
          <MessageCircle className="h-6 w-6 animate-pulse" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] z-50 neon-border neon-glow shadow-2xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between p-4 neon-border border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/20 neon-glow-sm">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg neon-text" style={{ fontFamily: 'Orbitron' }}>
                BM Support
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${message.sender}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-secondary text-secondary-foreground neon-glow-blue"
                        : "bg-card neon-border"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <CardContent className="p-4 space-y-3 border-t neon-border">
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.value}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.value)}
                  className="flex flex-col h-auto py-2 gap-1 text-xs"
                  data-testid={`button-quick-${action.value}`}
                >
                  <action.icon className="h-4 w-4" />
                  <span className="text-[10px]">{action.label}</span>
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                data-testid="input-chat-message"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="neon-glow flex-shrink-0"
                data-testid="button-send-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <a
              href="https://discord.gg/NR4Z9zeBW2"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="secondary" size="sm" className="w-full gap-2 neon-glow-blue" data-testid="button-discord-chat">
                <SiDiscord className="h-4 w-4" />
                Join Discord for Live Support
              </Button>
            </a>
          </CardContent>
        </Card>
      )}
    </>
  );
}
