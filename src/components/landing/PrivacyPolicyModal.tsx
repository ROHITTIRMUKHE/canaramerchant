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
import { useLanguage } from "@/lib/i18n";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PrivacyPolicyModal({ open, onOpenChange }: PrivacyPolicyModalProps) {
  const { t, language } = useLanguage();
  const content = t.privacy;

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
                {content.sections.introduction.title}
              </h3>
              {content.sections.introduction.content.map((para, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed mt-2">
                  {para}
                </p>
              ))}
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.scope.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {content.sections.scope.content}
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                {content.sections.scope.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.dataCollection.title}
              </h3>
              
              <h4 className="text-sm font-medium text-foreground mt-3 mb-1">
                {content.sections.dataCollection.businessInfo.title}
              </h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                {content.sections.dataCollection.businessInfo.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4 className="text-sm font-medium text-foreground mt-3 mb-1">
                {content.sections.dataCollection.userInfo.title}
              </h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                {content.sections.dataCollection.userInfo.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4 className="text-sm font-medium text-foreground mt-3 mb-1">
                {content.sections.dataCollection.transactionInfo.title}
              </h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                {content.sections.dataCollection.transactionInfo.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4 className="text-sm font-medium text-foreground mt-3 mb-1">
                {content.sections.dataCollection.technicalInfo.title}
              </h4>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                {content.sections.dataCollection.technicalInfo.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-2 italic">
                {content.sections.dataCollection.note}
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.purpose.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {content.sections.purpose.content}
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                {content.sections.purpose.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.sharing.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {content.sections.sharing.content}
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                {content.sections.sharing.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.security.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {content.sections.security.content}
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                {content.sections.security.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.governingLaw.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.sections.governingLaw.content}
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {content.sections.contact.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {content.sections.contact.content}
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
