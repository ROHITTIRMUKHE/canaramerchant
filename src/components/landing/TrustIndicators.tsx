import { motion } from 'framer-motion';
import { Shield, Zap, Users, TrendingUp } from 'lucide-react';

const stats = [
  { icon: TrendingUp, value: '₹500Cr+', label: 'Daily Volume', delay: 0 },
  { icon: Users, value: '2L+', label: 'Merchants', delay: 0.1 },
  { icon: Zap, value: '99.9%', label: 'Uptime', delay: 0.2 },
  { icon: Shield, value: 'NPCI', label: 'Certified', delay: 0.3 },
];

export default function TrustIndicators() {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-6 lg:gap-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-[hsl(220,30%,12%)]/80 backdrop-blur-sm border border-[hsl(220,30%,20%)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + stat.delay }}
          whileHover={{ 
            borderColor: 'hsl(45, 90%, 50%)',
            scale: 1.05 
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(45,90%,50%)] to-[hsl(35,95%,45%)] flex items-center justify-center">
            <stat.icon className="w-4 h-4 text-[hsl(220,45%,12%)]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[hsl(0,0%,100%)]">{stat.value}</p>
            <p className="text-xs text-[hsl(220,20%,60%)]">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}