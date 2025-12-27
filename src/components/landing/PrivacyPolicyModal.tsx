import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PrivacyPolicyModal({ open, onOpenChange }: PrivacyPolicyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Privacy Policy
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
                Canara Bank ("the Bank", "we", "our", "us") is committed to protecting the privacy, 
                confidentiality, and security of information relating to merchants and authorized users 
                accessing the Canara Bank Merchant Dashboard.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                This Privacy Policy describes how information is collected, used, stored, disclosed, 
                and protected when merchants access or use the Merchant Dashboard and related services.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                By accessing or using the Merchant Dashboard, you acknowledge and agree to the practices 
                described in this Privacy Policy.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                2. Scope of This Policy
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                This Privacy Policy applies to:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Merchants onboarded with Canara Bank</li>
                <li>Authorized users accessing the Merchant Dashboard</li>
                <li>Data generated through use of the dashboard for transaction monitoring, reporting, and operational purposes</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                This policy does not apply to third-party websites, applications, or services that may be linked from the dashboard.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                3. Information We Collect
              </h3>
              
              <h4 className="text-sm font-medium text-foreground mt-3 mb-1">3.1 Merchant and Business Information</h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Merchant name and business details</li>
                <li>Merchant ID and onboarding information</li>
                <li>Registered address and contact details</li>
              </ul>

              <h4 className="text-sm font-medium text-foreground mt-3 mb-1">3.2 User and Access Information</h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Usernames and user roles</li>
                <li>Login and access credentials (in encrypted form)</li>
                <li>Access logs and activity records</li>
              </ul>

              <h4 className="text-sm font-medium text-foreground mt-3 mb-1">3.3 Transaction Information</h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Transaction reference number</li>
                <li>Transaction date and time</li>
                <li>Transaction amount and status</li>
                <li>Masked card information (as permitted)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2 italic">
                Canara Bank does not collect, store, or display sensitive cardholder data such as full card numbers, CVV, PIN, or expiry dates.
              </p>

              <h4 className="text-sm font-medium text-foreground mt-3 mb-1">3.4 Technical and Usage Information</h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>IP address</li>
                <li>Device and browser information</li>
                <li>Session and log data for security and audit purposes</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                4. Purpose of Data Collection
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Information collected through the Merchant Dashboard is used strictly for legitimate banking and operational purposes, including:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Providing secure access to merchant services</li>
                <li>Displaying transaction and settlement information</li>
                <li>Fraud detection and prevention</li>
                <li>System security monitoring and incident investigation</li>
                <li>Regulatory compliance and audit requirements</li>
                <li>Improving system performance and reliability</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                5. Data Sharing and Disclosure
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Canara Bank does not sell, lease, or trade merchant information. Information may be disclosed only under the following circumstances:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>To internal departments of Canara Bank on a need-to-know basis</li>
                <li>To regulatory authorities, law enforcement agencies, or statutory bodies as required by law</li>
                <li>To authorized service providers engaged by the Bank, under strict confidentiality and security obligations</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                All such disclosures are made in accordance with applicable laws and regulations.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                6. Data Security Measures
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Canara Bank implements robust security controls to protect merchant information, including:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Encryption of data in transit</li>
                <li>Secure access control and authentication mechanisms</li>
                <li>Role-based access management</li>
                <li>Continuous monitoring and logging of system activities</li>
                <li>Periodic security assessments and audits</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                These measures are designed to prevent unauthorized access, misuse, alteration, or disclosure of information.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                7. Data Retention
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Merchant information is retained only for the period necessary to:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Fulfill banking and operational requirements</li>
                <li>Comply with regulatory, legal, and audit obligations</li>
                <li>Address dispute resolution or investigations</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Once retention requirements are fulfilled, data is securely archived or disposed of in accordance with Bank policies.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                8. Merchant Responsibilities
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Merchants and authorized users are responsible for:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Maintaining confidentiality of login credentials</li>
                <li>Restricting dashboard access to authorized personnel only</li>
                <li>Using secure devices and networks</li>
                <li>Promptly notifying the Bank of any suspected data breach or unauthorized access</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Failure to follow these responsibilities may result in access restrictions or other actions as deemed appropriate by the Bank.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                9. Cookies and Session Management
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                The Merchant Dashboard may use cookies or similar technologies strictly for:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Session management</li>
                <li>Security validation</li>
                <li>Enhancing user experience</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Cookies do not store sensitive or confidential information.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                10. Limitation of Liability
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                While Canara Bank takes reasonable and appropriate measures to safeguard information, the Bank shall not be liable for losses arising from:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>Merchant negligence</li>
                <li>Unauthorized access caused by compromised credentials</li>
                <li>Factors beyond the Bank's reasonable control</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                11. Changes to This Privacy Policy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Canara Bank reserves the right to update or modify this Privacy Policy from time to time 
                to reflect changes in legal, regulatory, or operational requirements. Updated versions 
                will be made available on the Merchant Dashboard.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                12. Governing Law
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy shall be governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the jurisdiction of competent courts in India.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                13. Contact and Grievance Redressal
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                For any queries, concerns, or complaints related to privacy or data protection, merchants 
                may contact Canara Bank through officially designated support or grievance redressal channels.
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
