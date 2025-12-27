import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronRight, XCircle, Clock, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

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
        return 'bg-warning/10 border-warning/30 text-warning';
      case 'refund':
        return 'bg-destructive/10 border-destructive/30 text-destructive';
      case 'settlement':
        return 'bg-chart-3/10 border-chart-3/30 text-chart-3';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <Card className="shadow-card border-warning/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            Alerts & Attention Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AnimatePresence>
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => navigate(alert.navigateTo)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${getAlertStyles(alert.type)}`}
                >
                  <div className="flex items-center gap-3">
                    {alert.icon}
                    <span className="text-sm font-medium">{alert.message}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
