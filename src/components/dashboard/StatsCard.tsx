import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ColorScheme, colorStyles } from '@/lib/colorSchemes';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  colorScheme?: ColorScheme;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  colorScheme = 'blue',
  delay = 0
}: StatsCardProps) {
  const colors = colorStyles[colorScheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "rounded-xl p-6 shadow-card border hover:shadow-lg transition-shadow",
        colors.card
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", colors.icon)}>
          <Icon className="h-5 w-5" />
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            changeType === 'positive' && "bg-success/10 text-success",
            changeType === 'negative' && "bg-destructive/10 text-destructive",
            changeType === 'neutral' && "bg-muted text-muted-foreground"
          )}>
            {changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
            {changeType === 'negative' && <TrendingDown className="h-3 w-3" />}
            {change}
          </div>
        )}
      </div>
      <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </motion.div>
  );
}
