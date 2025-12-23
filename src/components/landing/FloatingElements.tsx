import { motion } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function FloatingElements() {
  const { normalizedX, normalizedY } = useMouseParallax();
  const { scrollY } = useScrollProgress();

  const coins = [
    { x: '15%', y: '20%', size: 50, delay: 0, parallaxFactor: 0.8 },
    { x: '75%', y: '15%', size: 40, delay: 0.5, parallaxFactor: 1.2 },
    { x: '85%', y: '60%', size: 35, delay: 1, parallaxFactor: 0.6 },
    { x: '10%', y: '70%', size: 45, delay: 1.5, parallaxFactor: 1 },
    { x: '60%', y: '80%', size: 30, delay: 2, parallaxFactor: 0.9 },
  ];

  return (
    <>
      {/* Floating rupee coins with cursor and scroll parallax */}
      {coins.map((coin, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10"
          style={{ left: coin.x, top: coin.y }}
          animate={{ 
            x: normalizedX * 30 * coin.parallaxFactor,
            y: normalizedY * 30 * coin.parallaxFactor - scrollY * 0.1 * coin.parallaxFactor,
            opacity: [0.3, 0.6, 0.3],
            scale: 1,
            rotateY: [0, 180, 360]
          }}
          transition={{ 
            x: { duration: 0.3, ease: 'easeOut' },
            y: { duration: 0.3, ease: 'easeOut' },
            opacity: { duration: 4, delay: coin.delay, repeat: Infinity, ease: 'easeInOut' },
            rotateY: { duration: 4, delay: coin.delay, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <div 
            className="rounded-full flex items-center justify-center font-bold shadow-lg"
            style={{
              width: coin.size,
              height: coin.size,
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)',
              color: 'hsl(var(--primary-foreground))',
              fontSize: coin.size * 0.4,
              boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)'
            }}
          >
            ₹
          </div>
        </motion.div>
      ))}

      {/* Floating UPI badges with parallax */}
      <motion.div
        className="fixed left-[5%] top-[40%] pointer-events-none z-10"
        animate={{ 
          x: normalizedX * 20,
          y: normalizedY * 20 - scrollY * 0.05,
          rotate: [-5, 5, -5]
        }}
        transition={{ 
          x: { duration: 0.3, ease: 'easeOut' },
          y: { duration: 0.3, ease: 'easeOut' },
          rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <div className="px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full border border-border text-xs text-foreground">
          <span className="text-chart-4">●</span> UPI Active
        </div>
      </motion.div>

      <motion.div
        className="fixed right-[8%] top-[35%] pointer-events-none z-10"
        animate={{ 
          x: normalizedX * -25,
          y: normalizedY * 25 - scrollY * 0.08,
          rotate: [5, -5, 5]
        }}
        transition={{ 
          x: { duration: 0.3, ease: 'easeOut' },
          y: { duration: 0.3, ease: 'easeOut' },
          rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <div className="px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full border border-border text-xs text-foreground">
          +₹12,450 <span className="text-chart-4">received</span>
        </div>
      </motion.div>

      {/* Connection lines */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-10 z-0" preserveAspectRatio="none">
        <motion.path
          d="M 100 200 Q 300 100 500 200 T 900 200"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}
