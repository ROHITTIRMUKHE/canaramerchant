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
import { useLanguage } from "@/lib/i18n";

interface PCIDSSModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PCIDSSModal({ open, onOpenChange }: PCIDSSModalProps) {
  const { t, language } = useLanguage();
  const content = t.pcidss;

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
                {content.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {content.subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6 py-4">
          <div className="space-y-6 text-sm text-foreground">
            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.overview.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.sections.overview.content}
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.compliance.title}
              </h3>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
                {content.sections.compliance.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.cardVisibility.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.sections.cardVisibility.content}
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.securityMeasures.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.sections.securityMeasures.content}
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.merchantResponsibilities.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.sections.merchantResponsibilities.content}
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.scopeLimitation.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.sections.scopeLimitation.content}
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.complianceNotice.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.sections.complianceNotice.content}
              </p>
            </section>

            {language !== 'en' && (
              <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
                {t.common.disclaimer}
              </p>
            )}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-border">
          <Button 
            onClick={() => onOpenChange(false)} 
            className="w-full"
          >
            {t.common.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
