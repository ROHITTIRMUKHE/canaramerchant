import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Headphones, Mail, Phone, MessageSquare, Clock, ArrowUpRight, AlertCircle } from "lucide-react";

interface ContactSupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactSupportModal({ open, onOpenChange }: ContactSupportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Contact Support
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Canara Bank – Merchant Dashboard Support
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6 py-4">
          <div className="space-y-6">
            {/* Support Channels */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Headphones className="h-4 w-4 text-primary" />
                Support Channels
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Reach out to us through any of the following channels
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email Support</p>
                    <p className="text-sm text-primary">merchantsupport@canarabank.com</p>
                    <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Toll-Free Helpline</p>
                    <p className="text-sm text-primary">1800-425-0018</p>
                    <p className="text-xs text-muted-foreground mt-1">Available 24x7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp Support</p>
                    <p className="text-sm text-primary">+91 80 6883 8888</p>
                    <p className="text-xs text-muted-foreground mt-1">Quick responses during business hours</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Working Hours */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Working Hours
              </h3>
              
              <div className="space-y-3 p-4 rounded-lg bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium text-foreground">9:00 AM - 2:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sunday & Holidays</span>
                  <span className="font-medium text-destructive">Closed</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Toll-free helpline is available 24x7 for urgent transaction issues
                </p>
              </div>
            </section>

            {/* Escalation Matrix */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-primary" />
                Escalation Matrix
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                For unresolved issues, escalate in this order
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Level 1: Support Team</p>
                    <p className="text-xs text-muted-foreground">Response: 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Level 2: Senior Support Manager</p>
                    <p className="text-xs text-muted-foreground">escalation@canarabank.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Level 3: Nodal Officer</p>
                    <p className="text-xs text-muted-foreground">nodalofficer@canarabank.com</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-border">
          <Button 
            onClick={() => onOpenChange(false)} 
            className="w-full"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
