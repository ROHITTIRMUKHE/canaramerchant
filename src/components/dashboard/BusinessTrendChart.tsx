import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Mon', date: '16 Dec', transactions: 45000, settlements: 42000, txnCount: 89 },
  { name: 'Tue', date: '17 Dec', transactions: 52000, settlements: 48000, txnCount: 102 },
  { name: 'Wed', date: '18 Dec', transactions: 48000, settlements: 45000, txnCount: 95 },
  { name: 'Thu', date: '19 Dec', transactions: 61000, settlements: 58000, txnCount: 118 },
  { name: 'Fri', date: '20 Dec', transactions: 55000, settlements: 52000, txnCount: 107 },
  { name: 'Sat', date: '21 Dec', transactions: 67000, settlements: 64000, txnCount: 134 },
  { name: 'Sun', date: '22 Dec', transactions: 72000, settlements: 68000, txnCount: 145 },
];

type ChartView = 'settlements' | 'transactions';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: typeof data[0] }>;
  label?: string;
  view: ChartView;
}

const CustomTooltip = ({ active, payload, label, view }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{dataPoint.date} ({label})</p>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Amount: <span className="font-semibold text-foreground">₹{payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Transactions: <span className="font-semibold text-foreground">{dataPoint.txnCount}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function BusinessTrendChart() {
  const [view, setView] = useState<ChartView>('settlements');

  const chartColor = view === 'settlements' ? 'chart-2' : 'chart-1';
  const gradientId = view === 'settlements' ? 'colorSettlements' : 'colorTransactions';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Business Trend (Last 7 Days)</CardTitle>
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView('settlements')}
              className={cn(
                "h-8 px-3 text-sm",
                view === 'settlements' && "bg-background shadow-sm"
              )}
            >
              Settlements
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView('transactions')}
              className={cn(
                "h-8 px-3 text-sm",
                view === 'transactions' && "bg-background shadow-sm"
              )}
            >
              Transactions
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={`hsl(var(--${chartColor}))`} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={`hsl(var(--${chartColor}))`} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip view={view} />} />
                <Area
                  type="monotone"
                  dataKey={view}
                  stroke={`hsl(var(--${chartColor}))`}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#${gradientId})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
