import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronRight, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { colorStyles } from '@/lib/colorSchemes';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'dispute' | 'refund' | 'settlement';
  message: string;
  navigateTo: string;
  icon: React.ReactNode;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'dispute',
    message: '2 disputes awaiting your response',
    navigateTo: '/dashboard/refunds',
    icon: <AlertTriangle className="h-4 w-4" />
  },
  {
    id: '2',
    type: 'refund',
    message: '1 refund failed',
    navigateTo: '/dashboard/refunds',
    icon: <XCircle className="h-4 w-4" />
  },
  {
    id: '3',
    type: 'settlement',
    message: 'Settlement pending for 1 day',
    navigateTo: '/dashboard/settlements',
    icon: <Clock className="h-4 w-4" />
  }
];

export default function AlertsSection() {
  const navigate = useNavigate();

  if (alerts.length === 0) return null;

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'dispute':
        return {
          container: cn(colorStyles.yellow.bg, colorStyles.yellow.border, colorStyles.yellow.text),
          icon: colorStyles.yellow.text
        };
      case 'refund':
        return {
          container: 'bg-red-50 dark:bg-red-950/30 border-red-200/50 dark:border-red-800/30 text-red-600 dark:text-red-400',
          icon: 'text-red-600 dark:text-red-400'
        };
      case 'settlement':
        return {
          container: cn(colorStyles.purple.bg, colorStyles.purple.border, colorStyles.purple.text),
          icon: colorStyles.purple.text
        };
      default:
        return {
          container: 'bg-muted border-border text-muted-foreground',
          icon: 'text-muted-foreground'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <Card className={cn("shadow-card border", colorStyles.yellow.border)}>
        <CardHeader className="pb-3">
          <CardTitle className={cn("text-lg font-semibold flex items-center gap-2", colorStyles.yellow.text)}>
            <AlertTriangle className="h-5 w-5" />
            Alerts & Attention Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AnimatePresence>
              {alerts.map((alert, index) => {
                const styles = getAlertStyles(alert.type);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => navigate(alert.navigateTo)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all",
                      styles.container
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={styles.icon}>{alert.icon}</span>
                      <span className="text-sm font-medium">{alert.message}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
