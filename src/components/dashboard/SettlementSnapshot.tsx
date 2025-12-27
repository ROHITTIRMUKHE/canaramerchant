import { motion } from 'framer-motion';
import { Calendar, IndianRupee, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { colorStyles } from '@/lib/colorSchemes';
import { cn } from '@/lib/utils';

const settlementData = {
  lastDate: '22 Dec 2024',
  lastAmount: '₹1,23,450',
  status: 'Completed',
  nextExpected: '24 Dec 2024'
};

export default function SettlementSnapshot() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className={cn("shadow-card border", colorStyles.green.border)}>
        <CardHeader className="pb-3">
          <CardTitle className={cn("text-lg font-semibold flex items-center gap-2", colorStyles.green.text)}>
            <IndianRupee className="h-5 w-5" />
            Settlement Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={cn("p-4 rounded-lg border", colorStyles.blue.bg, colorStyles.blue.border)}>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className={cn("h-4 w-4", colorStyles.blue.text)} />
                <span className="text-xs text-muted-foreground">Last Settlement</span>
              </div>
              <p className="font-semibold text-foreground">{settlementData.lastDate}</p>
            </div>
            
            <div className={cn("p-4 rounded-lg border", colorStyles.green.bg, colorStyles.green.border)}>
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className={cn("h-4 w-4", colorStyles.green.text)} />
                <span className="text-xs text-muted-foreground">Amount Settled</span>
              </div>
              <p className="font-semibold text-foreground">{settlementData.lastAmount}</p>
            </div>
            
            <div className={cn("p-4 rounded-lg border", colorStyles.purple.bg, colorStyles.purple.border)}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={cn("h-4 w-4", colorStyles.purple.text)} />
                <span className="text-xs text-muted-foreground">Status</span>
              </div>
              <Badge variant="outline" className="border-success text-success">
                {settlementData.status}
              </Badge>
            </div>
            
            <div className={cn("p-4 rounded-lg border", colorStyles.yellow.bg, colorStyles.yellow.border)}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className={cn("h-4 w-4", colorStyles.yellow.text)} />
                <span className="text-xs text-muted-foreground">Next Expected</span>
              </div>
              <p className="font-semibold text-foreground">{settlementData.nextExpected}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
