import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";

interface PCIDSSModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PCIDSSModal({ open, onOpenChange }: PCIDSSModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                PCI-DSS Guidelines for Merchants
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Canara Bank Security Compliance
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6 py-4">
          <div className="space-y-6 text-sm text-foreground">
            {/* Section 1 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                1. Overview of PCI-DSS
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                PCI-DSS (Payment Card Industry Data Security Standard) is a global security standard 
                established by major card networks to protect cardholder data during payment processing. 
                Canara Bank's Merchant Dashboard operates in alignment with applicable PCI-DSS requirements.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                2. What PCI-DSS Compliance Means for You
              </h3>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
                <li>Sensitive cardholder data is not stored or displayed on the merchant dashboard</li>
                <li>Card transactions are processed through PCI-DSS certified payment infrastructure</li>
                <li>All transaction data is securely encrypted</li>
                <li>Access to payment systems is restricted and monitored</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                3. Card Data Visibility
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Merchants can view only non-sensitive transaction details such as transaction ID, date, 
                amount, status, and masked card number. Full card number, CVV, PIN, and expiry details 
                are never accessible.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                4. Security Measures by Canara Bank
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Canara Bank implements secure network architecture, encryption, role-based access controls, 
                continuous monitoring, and periodic security audits to maintain compliance.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                5. Merchant Responsibilities
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Merchants must protect login credentials, restrict access to authorized users, use secure 
                devices, and report any suspected security incidents immediately.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                6. Scope Limitation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                PCI-DSS applies only to cardholder data security and does not cover non-payment business 
                information or eliminate all cyber risks.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                7. Compliance Notice
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Any misuse, credential sharing, or unauthorized access may lead to suspension of access 
                or regulatory action as per Canara Bank policy.
              </p>
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
