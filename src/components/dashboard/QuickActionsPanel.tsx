import { motion } from 'framer-motion';
import { ArrowRightLeft, Download, RefreshCcw, UserPlus, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface QuickActionsPanelProps {
  isMainMerchant?: boolean;
}

const getActions = (isMainMerchant: boolean) => [
  {
    icon: ArrowRightLeft,
    label: 'View Transactions',
    description: 'View all payment history',
    color: 'bg-chart-1/10 text-chart-1',
    path: '/dashboard/transactions'
  },
  {
    icon: Download,
    label: 'Download Settlement',
    description: 'Export settlement reports',
    color: 'bg-chart-2/10 text-chart-2',
    path: '/dashboard/settlements'
  },
  {
    icon: RefreshCcw,
    label: 'Initiate Refund',
    description: 'Process customer refund',
    color: 'bg-chart-3/10 text-chart-3',
    path: '/dashboard/refunds'
  },
  ...(isMainMerchant ? [{
    icon: UserPlus,
    label: 'Add Sub-Merchant',
    description: 'Register new outlet',
    color: 'bg-chart-4/10 text-chart-4',
    path: '/dashboard/submerchants'
  }] : []),
  {
    icon: QrCode,
    label: 'Generate QR',
    description: 'Create payment QR code',
    color: 'bg-primary/10 text-primary',
    path: '/dashboard/qr'
  }
];

export default function QuickActionsPanel({ isMainMerchant = true }: QuickActionsPanelProps) {
  const navigate = useNavigate();
  const actions = getActions(isMainMerchant);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="shadow-card h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-primary/30 transition-all"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-sm">{action.label}</span>
                  <span className="text-xs text-muted-foreground text-center leading-tight">
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
