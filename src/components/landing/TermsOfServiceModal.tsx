import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scale } from "lucide-react";

interface TermsOfServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TermsOfServiceModal({ open, onOpenChange }: TermsOfServiceModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Terms of Service
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Canara Bank – Merchant Dashboard
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6 py-4">
          <div className="space-y-6 text-sm text-foreground">
            {/* Section 1 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                1. Introduction
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service ("Terms") govern the access to and use of the Canara Bank 
                Merchant Dashboard ("Dashboard") provided by Canara Bank ("the Bank").
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                By accessing, registering for, or using the Dashboard, the merchant and its authorized 
                users ("Merchant", "you", "your") agree to comply with these Terms. If you do not agree, 
                you must not access or use the Dashboard.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                2. Scope of Services
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                The Merchant Dashboard is provided to enable merchants to:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>View and monitor transaction details</li>
                <li>Access settlement and reconciliation reports</li>
                <li>Track transaction status and summaries</li>
                <li>Perform operational and reporting activities permitted by the Bank</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                The Dashboard is intended solely for business and banking purposes related to the 
                merchant's relationship with Canara Bank.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                3. Eligibility and Access
              </h3>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Access is granted only to merchants duly onboarded with Canara Bank</li>
                <li>Each user shall be provided access based on assigned roles and permissions</li>
                <li>The Bank reserves the right to approve, modify, suspend, or revoke access at its discretion</li>
                <li>Merchants are responsible for ensuring that access is provided only to authorized personnel</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                4. User Responsibilities
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Merchants and authorized users agree to:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Use the Dashboard strictly for lawful and authorized purposes</li>
                <li>Maintain confidentiality of login credentials</li>
                <li>Ensure accuracy of information accessed or submitted</li>
                <li>Immediately notify the Bank of any unauthorized access or security incident</li>
                <li>Comply with all applicable laws, regulations, and Bank policies</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Any misuse of the Dashboard may result in access restrictions or termination.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                5. Prohibited Activities
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Merchants shall not:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Share login credentials with unauthorized individuals</li>
                <li>Attempt to access data or systems beyond authorized scope</li>
                <li>Interfere with system security or performance</li>
                <li>Use the Dashboard for fraudulent, illegal, or abusive activities</li>
                <li>Attempt to reverse engineer, copy, or manipulate system components</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Violation of these provisions may lead to suspension and regulatory action.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                6. Security and Monitoring
              </h3>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>The Bank implements security controls to protect systems and data</li>
                <li>User activities on the Dashboard are logged and monitored</li>
                <li>The Bank may investigate any suspicious or unauthorized activity without prior notice</li>
                <li>Monitoring is conducted strictly for security, compliance, and audit purposes</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                7. Availability and Maintenance
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                The Dashboard is provided on a best-effort basis. While the Bank strives for continuous availability:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Planned maintenance or upgrades may cause temporary unavailability</li>
                <li>Access may be restricted due to technical or regulatory reasons</li>
                <li>The Bank shall not be liable for service interruptions beyond reasonable control</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                8. Data Accuracy and Reports
              </h3>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Transaction and settlement data displayed is based on records available at the time of access</li>
                <li>Merchants are responsible for reviewing and reconciling reports</li>
                <li>The Bank shall not be liable for decisions made solely based on dashboard information without independent verification</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                9. Limitation of Liability
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                To the maximum extent permitted by law, Canara Bank shall not be liable for:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Indirect, incidental, or consequential losses</li>
                <li>Losses arising from merchant negligence or misuse</li>
                <li>Unauthorized access caused by compromised credentials</li>
                <li>Third-party system or network failures</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                10. Suspension and Termination
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                The Bank may suspend or terminate Dashboard access:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>For violation of these Terms</li>
                <li>For security or compliance reasons</li>
                <li>As required by regulatory or statutory authorities</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Termination of access does not affect the merchant's underlying banking or contractual 
                obligations unless separately specified.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                11. Intellectual Property
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All content, systems, and software associated with the Dashboard are the property of 
                Canara Bank or its licensors. Merchants are granted a limited, non-transferable, 
                revocable right to use the Dashboard strictly in accordance with these Terms.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                12. Modifications to Terms
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Canara Bank reserves the right to modify these Terms at any time. Updated Terms will 
                be made available on the Dashboard and continued usage constitutes acceptance of the 
                revised Terms.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                13. Governing Law and Jurisdiction
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India. 
                All disputes shall be subject to the exclusive jurisdiction of competent courts in India.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                14. Grievance Redressal
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                For queries or grievances related to the Dashboard or these Terms, merchants may 
                contact Canara Bank through officially designated support or grievance redressal channels.
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
