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
import { useLanguage } from "@/lib/i18n";

interface ContactSupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactSupportModal({ open, onOpenChange }: ContactSupportModalProps) {
  const { t, language } = useLanguage();
  const content = t.support;

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
                {content.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {content.subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6 py-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Headphones className="h-4 w-4 text-primary" />
                {content.channels.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {content.channels.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{content.channels.email.title}</p>
                    <p className="text-sm text-primary">{content.channels.email.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{content.channels.email.note}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{content.channels.phone.title}</p>
                    <p className="text-sm text-primary">{content.channels.phone.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{content.channels.phone.note}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{content.channels.whatsapp.title}</p>
                    <p className="text-sm text-primary">{content.channels.whatsapp.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{content.channels.whatsapp.note}</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {content.workingHours.title}
              </h3>
              
              <div className="space-y-3 p-4 rounded-lg bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{content.workingHours.weekdays}</span>
                  <span className="font-medium text-foreground">{content.workingHours.weekdaysTime}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{content.workingHours.saturday}</span>
                  <span className="font-medium text-foreground">{content.workingHours.saturdayTime}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{content.workingHours.sunday}</span>
                  <span className="font-medium text-destructive">{content.workingHours.closed}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {content.workingHours.urgentNote}
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-primary" />
                {content.escalation.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {content.escalation.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{content.escalation.level1.title}</p>
                    <p className="text-xs text-muted-foreground">{content.escalation.level1.note}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{content.escalation.level2.title}</p>
                    <p className="text-xs text-muted-foreground">{content.escalation.level2.note}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{content.escalation.level3.title}</p>
                    <p className="text-xs text-muted-foreground">{content.escalation.level3.note}</p>
                  </div>
                </div>
              </div>
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
