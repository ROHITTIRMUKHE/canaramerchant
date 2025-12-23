import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const transactions = [
  {
    id: 'TXN001',
    customer: 'Rahul Sharma',
    upiId: 'rahul@okaxis',
    amount: 1250,
    status: 'success',
    date: '23 Dec 2024',
    time: '10:45 AM',
    type: 'credit'
  },
  {
    id: 'TXN002',
    customer: 'Priya Patel',
    upiId: 'priya@paytm',
    amount: 3500,
    status: 'success',
    date: '23 Dec 2024',
    time: '10:40 AM',
    type: 'credit'
  },
  {
    id: 'TXN003',
    customer: 'Amit Kumar',
    upiId: 'amit@ybl',
    amount: 500,
    status: 'pending',
    date: '23 Dec 2024',
    time: '10:37 AM',
    type: 'credit'
  },
  {
    id: 'TXN004',
    customer: 'Refund - Order #1234',
    upiId: 'customer@upi',
    amount: 750,
    status: 'success',
    date: '23 Dec 2024',
    time: '10:30 AM',
    type: 'debit'
  },
  {
    id: 'TXN005',
    customer: 'Sneha Reddy',
    upiId: 'sneha@okicici',
    amount: 2100,
    status: 'failed',
    date: '23 Dec 2024',
    time: '10:25 AM',
    type: 'credit'
  },
];

export default function RecentTransactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name / VPA</TableHead>
                <TableHead>Date / Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn, index) => (
                <motion.tr
                  key={txn.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center",
                        txn.type === 'credit' ? "bg-success/10" : "bg-destructive/10"
                      )}>
                        {txn.type === 'credit' ? (
                          <ArrowDownLeft className="h-4 w-4 text-success" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{txn.customer}</p>
                        <p className="text-xs text-muted-foreground">{txn.upiId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{txn.date}</p>
                      <p className="text-xs text-muted-foreground">{txn.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className={cn(
                      "font-semibold",
                      txn.type === 'credit' ? "text-success" : "text-destructive"
                    )}>
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        txn.status === 'success' && "border-success text-success",
                        txn.status === 'pending' && "border-warning text-warning",
                        txn.status === 'failed' && "border-destructive text-destructive"
                      )}
                    >
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}