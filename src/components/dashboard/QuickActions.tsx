import { motion } from 'framer-motion';
import { QrCode, Download, RefreshCcw, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const actions = [
  {
    icon: QrCode,
    label: 'Generate QR',
    description: 'Create new payment QR',
    color: 'bg-chart-1/10 text-chart-1'
  },
  {
    icon: Download,
    label: 'Download Statement',
    description: 'Export transactions',
    color: 'bg-chart-2/10 text-chart-2'
  },
  {
    icon: RefreshCcw,
    label: 'Initiate Refund',
    description: 'Process customer refund',
    color: 'bg-chart-3/10 text-chart-3'
  },
  {
    icon: PlusCircle,
    label: 'Add Sub-Merchant',
    description: 'Register new outlet',
    color: 'bg-chart-4/10 text-chart-4'
  }
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all"
                >
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-sm">{action.label}</span>
                  <span className="text-xs text-muted-foreground text-center">
                    {action.description}
                  </span>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}