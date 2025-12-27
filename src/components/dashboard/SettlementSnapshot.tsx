import { motion } from 'framer-motion';
import { Calendar, IndianRupee, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-primary" />
            Settlement Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Last Settlement</span>
              </div>
              <p className="font-semibold text-foreground">{settlementData.lastDate}</p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Amount Settled</span>
              </div>
              <p className="font-semibold text-foreground">{settlementData.lastAmount}</p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Status</span>
              </div>
              <Badge variant="outline" className="border-success text-success">
                {settlementData.status}
              </Badge>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
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
