import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: `Thank you for subscribing! We'll send updates to ${email}`,
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter/subscribers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "This email may already be subscribed",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      subscribeMutation.mutate(email);
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
    }
  };

  return (
    <footer id="contact" className="bg-foreground text-background py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-medium mb-4">About</h3>
            <p className="opacity-80 leading-relaxed mb-4">
              Celebrating Filipino culture through a premium collection of visual, literary, applied, and performance arts.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#collections" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Collections
                </a>
              </li>
              <li>
                <a href="#artists" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Artists
                </a>
              </li>
              <li>
                <a href="#exhibitions" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Exhibitions
                </a>
              </li>
              <li>
                <a href="#about" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Newsletter</h3>
            <p className="opacity-80 mb-4">Subscribe to receive updates about new exhibitions and artworks.</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-background placeholder:text-background/50 focus:border-primary"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                variant="default"
                disabled={subscribeMutation.isPending}
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center opacity-60 text-sm">
          <p>&copy; 2024 Philippine Art Gallery. Celebrating Filipino heritage through art. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
