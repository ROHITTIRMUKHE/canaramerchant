import { motion } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import canaraBankLogo from '@/assets/canara-bank-logo.png';

export default function FloatingElements() {
  const { normalizedX, normalizedY } = useMouseParallax();
  const { scrollY } = useScrollProgress();

  const coins = [
    { x: '12%', y: '18%', size: 55, delay: 0, parallaxFactor: 0.9, color: 'hsl(198 93% 59%)' },
    { x: '78%', y: '12%', size: 45, delay: 0.5, parallaxFactor: 1.3, color: 'hsl(280 80% 60%)' },
    { x: '88%', y: '55%', size: 40, delay: 1, parallaxFactor: 0.7, color: 'hsl(145 65% 50%)' },
    { x: '8%', y: '65%', size: 50, delay: 1.5, parallaxFactor: 1.1, color: 'hsl(35 92% 50%)' },
    { x: '55%', y: '75%', size: 35, delay: 2, parallaxFactor: 1, color: 'hsl(198 93% 59%)' },
    { x: '35%', y: '25%', size: 30, delay: 0.8, parallaxFactor: 0.8, color: 'hsl(320 70% 55%)' },
  ];

  const floatingCards = [
    { x: '5%', y: '38%', rotation: -8, content: 'UPI Active', icon: '●', iconColor: 'hsl(145 65% 50%)' },
    { x: '82%', y: '32%', rotation: 8, content: '+₹12,450', subtext: 'received', iconColor: 'hsl(145 65% 50%)' },
    { x: '70%', y: '70%', rotation: -5, content: '99.9%', subtext: 'uptime', iconColor: 'hsl(198 93% 59%)' },
    { x: '15%', y: '82%', rotation: 6, content: '< 2 sec', subtext: 'settlement', iconColor: 'hsl(35 92% 50%)' },
  ];

  return (
    <>
      {/* Floating colorful rupee coins with cursor and scroll parallax */}
      {coins.map((coin, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10"
          style={{ left: coin.x, top: coin.y }}
          animate={{ 
            x: normalizedX * 40 * coin.parallaxFactor,
            y: normalizedY * 40 * coin.parallaxFactor - scrollY * 0.15 * coin.parallaxFactor,
            opacity: [0.4, 0.8, 0.4],
            rotateY: [0, 180, 360],
            rotateX: [0, 10, 0]
          }}
          transition={{ 
            x: { duration: 0.4, ease: 'easeOut' },
            y: { duration: 0.4, ease: 'easeOut' },
            opacity: { duration: 3, delay: coin.delay, repeat: Infinity, ease: 'easeInOut' },
            rotateY: { duration: 5, delay: coin.delay, repeat: Infinity, ease: 'easeInOut' },
            rotateX: { duration: 3, delay: coin.delay, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <div 
            className="rounded-full flex items-center justify-center font-bold"
            style={{
              width: coin.size,
              height: coin.size,
              background: `linear-gradient(135deg, ${coin.color} 0%, ${coin.color.replace(')', ' / 0.6)')} 100%)`,
              color: 'hsl(var(--primary-foreground))',
              fontSize: coin.size * 0.4,
              boxShadow: `0 8px 32px ${coin.color.replace(')', ' / 0.4)')}`,
              border: `2px solid ${coin.color.replace(')', ' / 0.3)')}`
            }}
          >
            ₹
          </div>
        </motion.div>
      ))}

      {/* Floating info cards with parallax */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={`card-${i}`}
          className="fixed pointer-events-none z-10"
          style={{ left: card.x, top: card.y }}
          animate={{ 
            x: normalizedX * (20 + i * 5) * (i % 2 === 0 ? 1 : -1),
            y: normalizedY * (20 + i * 5) - scrollY * (0.05 + i * 0.02),
            rotate: [card.rotation, card.rotation + 3, card.rotation]
          }}
          transition={{ 
            x: { duration: 0.4, ease: 'easeOut' },
            y: { duration: 0.4, ease: 'easeOut' },
            rotate: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <div 
            className="px-4 py-2.5 backdrop-blur-md rounded-xl border text-sm"
            style={{
              background: 'hsl(var(--card) / 0.7)',
              borderColor: 'hsl(var(--border) / 0.5)',
              boxShadow: '0 8px 32px hsl(var(--background) / 0.3)'
            }}
          >
            {card.icon && (
              <span style={{ color: card.iconColor }} className="mr-1">{card.icon}</span>
            )}
            <span className="font-semibold text-foreground">{card.content}</span>
            {card.subtext && (
              <span className="ml-1 text-xs" style={{ color: card.iconColor }}>{card.subtext}</span>
            )}
          </div>
        </motion.div>
      ))}

      {/* Floating logo with glow */}
      <motion.div
        className="fixed left-[45%] top-[45%] pointer-events-none z-5 opacity-20"
        animate={{ 
          x: normalizedX * 15,
          y: normalizedY * 15 - scrollY * 0.2,
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          x: { duration: 0.5, ease: 'easeOut' },
          y: { duration: 0.5, ease: 'easeOut' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <img 
          src={canaraBankLogo} 
          alt="" 
          className="h-32 w-auto opacity-30"
          style={{ filter: 'blur(1px)' }}
        />
      </motion.div>

      {/* Animated connection lines */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(198 93% 59%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(198 93% 59%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(198 93% 59%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(280 80% 60%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(280 80% 60%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(280 80% 60%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(145 65% 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(145 65% 50%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(145 65% 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M 50 250 Q 250 150 450 250 T 850 250"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 100 400 Q 400 300 700 400 T 1100 350"
          stroke="url(#lineGradient2)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.path
          d="M 200 550 Q 500 450 800 500 T 1200 450"
          stroke="url(#lineGradient3)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </svg>
    </>
  );
}
