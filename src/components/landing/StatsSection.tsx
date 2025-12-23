import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const stats = [
  { value: 500, suffix: 'Cr+', label: 'Daily Transaction Volume', prefix: '₹', color: 'hsl(198 93% 59%)' },
  { value: 200000, suffix: '+', label: 'Active Merchants', prefix: '', color: 'hsl(145 65% 50%)' },
  { value: 99.9, suffix: '%', label: 'Platform Uptime', prefix: '', color: 'hsl(280 80% 60%)' },
  { value: 1, suffix: 'sec', label: 'Avg Settlement Time', prefix: '<', color: 'hsl(35 92% 50%)' },
];

function AnimatedCounter({ value, suffix, prefix, color }: { value: number; suffix: string; prefix: string; color: string }) {
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

  return (
    <motion.span 
      ref={ref}
      style={{ color }}
      className="inline-block"
      whileHover={{ scale: 1.1 }}
    >
      {prefix}{value >= 100000 ? `${Math.floor(count / 1000)}K` : count.toLocaleString()}{suffix}
    </motion.span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { normalizedX, normalizedY } = useMouseParallax();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <section ref={ref} className="py-20 px-6 lg:px-16 relative z-10">
      <motion.div
        className="max-w-5xl mx-auto relative rounded-3xl border p-8 lg:p-12 overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              hsl(198 93% 59% / 0.1) 0%, 
              hsl(280 80% 60% / 0.08) 25%, 
              hsl(145 65% 50% / 0.08) 50%, 
              hsl(35 92% 50% / 0.1) 75%,
              transparent 100%
            )
          `,
          borderColor: 'hsl(var(--border))',
          scale,
          rotateX,
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-50"
          style={{
            background: `
              linear-gradient(90deg, 
                hsl(198 93% 59% / 0.3), 
                hsl(280 80% 60% / 0.3), 
                hsl(145 65% 50% / 0.3), 
                hsl(35 92% 50% / 0.3),
                hsl(198 93% 59% / 0.3)
              )
            `,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner content */}
        <div className="relative z-10 bg-background/80 backdrop-blur-sm rounded-2xl p-8">
          {/* Cursor-reactive glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${50 + normalizedX * 20}% ${50 + normalizedY * 20}%, hsl(198 93% 59% / 0.1), transparent 50%)`
            }}
          />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center relative group"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ delay: index * 0.15, duration: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Glow behind number */}
                <motion.div
                  className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${stat.color.replace(')', ' / 0.15)')}, transparent 70%)`
                  }}
                />
                
                <p className="text-3xl lg:text-5xl font-bold mb-2 relative z-10">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} color={stat.color} />
                </p>
                <p className="text-sm text-muted-foreground relative z-10">{stat.label}</p>
                
                {/* Decorative line */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                  style={{ background: stat.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 40 } : { width: 0 }}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}