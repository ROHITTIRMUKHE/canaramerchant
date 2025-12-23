import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { value: 500, suffix: 'Cr+', label: 'Daily Transaction Volume', prefix: '₹' },
  { value: 200000, suffix: '+', label: 'Active Merchants', prefix: '' },
  { value: 99.9, suffix: '%', label: 'Platform Uptime', prefix: '' },
  { value: 1, suffix: 'sec', label: 'Avg Settlement Time', prefix: '<' },
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const displayValue = value >= 1000 
    ? value >= 100000 
      ? `${Math.floor(count / 1000)}K` 
      : count.toLocaleString()
    : count.toString();

  return (
    <span ref={ref}>
      {prefix}{value >= 100000 ? `${Math.floor(count / 1000)}K` : count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 px-6 lg:px-16 relative z-10">
      <motion.div
        className="max-w-5xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl border border-primary/20 p-8 lg:p-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
