import { motion, useInView } from 'framer-motion';
import { Shield, Zap, Users, TrendingUp } from 'lucide-react';
import { useRef } from 'react';
import { useLanguage } from '@/lib/i18n';

export default function TrustIndicators() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: TrendingUp, value: '₹500Cr+', label: t.landing.trustIndicators.dailyVolume, delay: 0 },
    { icon: Users, value: '2L+', label: t.landing.trustIndicators.merchants, delay: 0.1 },
    { icon: Zap, value: '99.9%', label: t.landing.trustIndicators.uptime, delay: 0.2 },
    { icon: Shield, value: 'NPCI', label: t.landing.trustIndicators.certified, delay: 0.3 },
  ];

  return (
    <motion.div 
      ref={ref}
      className="flex flex-wrap justify-center gap-6 lg:gap-10"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.5 + stat.delay }}
          whileHover={{ 
            borderColor: 'hsl(var(--primary))',
            scale: 1.05 
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <stat.icon className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
