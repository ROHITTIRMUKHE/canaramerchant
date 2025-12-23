import { motion } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function GradientMeshBackground() {
  const { normalizedX, normalizedY } = useMouseParallax();
  const { scrollY } = useScrollProgress();

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-background via-background to-background">
      {/* Vibrant colorful mesh gradient overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 20% 30%, hsl(198 93% 59% / 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 80% 20%, hsl(280 80% 60% / 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 50% 80%, hsl(145 65% 42% / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 10% 70%, hsl(35 92% 50% / 0.2) 0%, transparent 50%)
          `
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Primary cyan orb - large, cursor reactive */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px]"
        style={{ 
          background: 'radial-gradient(circle, hsl(198 93% 59% / 0.3) 0%, hsl(198 93% 59% / 0.1) 40%, transparent 70%)',
          left: '5%',
          top: '10%'
        }}
        animate={{
          x: normalizedX * 60,
          y: normalizedY * 60 + scrollY * -0.1,
          scale: [1, 1.15, 1],
        }}
        transition={{ 
          x: { duration: 0.5, ease: 'easeOut' },
          y: { duration: 0.5, ease: 'easeOut' },
          scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      {/* Purple/Magenta orb - adds warmth */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ 
          background: 'radial-gradient(circle, hsl(280 80% 60% / 0.25) 0%, hsl(320 70% 50% / 0.1) 40%, transparent 70%)',
          right: '-5%',
          top: '5%'
        }}
        animate={{
          x: normalizedX * -50,
          y: normalizedY * 40 + scrollY * -0.15,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          x: { duration: 0.4, ease: 'easeOut' },
          y: { duration: 0.4, ease: 'easeOut' },
          scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      {/* Green/Success orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ 
          background: 'radial-gradient(circle, hsl(145 65% 42% / 0.25) 0%, hsl(160 60% 45% / 0.1) 40%, transparent 70%)',
          left: '30%',
          bottom: '0%'
        }}
        animate={{
          x: normalizedX * 35,
          y: normalizedY * -45 + scrollY * -0.08,
          scale: [1, 1.25, 1],
        }}
        transition={{ 
          x: { duration: 0.45, ease: 'easeOut' },
          y: { duration: 0.45, ease: 'easeOut' },
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      {/* Orange/Gold orb - Canara Bank accent */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full blur-[90px]"
        style={{ 
          background: 'radial-gradient(circle, hsl(35 92% 50% / 0.3) 0%, hsl(45 90% 55% / 0.1) 40%, transparent 70%)',
          right: '20%',
          bottom: '10%'
        }}
        animate={{
          x: normalizedX * -40,
          y: normalizedY * -35 + scrollY * -0.12,
          scale: [1, 1.18, 1],
        }}
        transition={{ 
          x: { duration: 0.35, ease: 'easeOut' },
          y: { duration: 0.35, ease: 'easeOut' },
          scale: { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      {/* Animated gradient streaks */}
      <motion.div
        className="absolute w-[300px] h-[2px] blur-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(198 93% 59% / 0.6), transparent)',
          left: '10%',
          top: '30%',
          transformOrigin: 'left center'
        }}
        animate={{
          scaleX: [0, 1, 0],
          x: [0, 200, 400],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[2px] blur-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(280 80% 60% / 0.5), transparent)',
          right: '15%',
          top: '50%',
          transformOrigin: 'right center'
        }}
        animate={{
          scaleX: [0, 1, 0],
          x: [0, -200, -400],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="absolute w-[250px] h-[2px] blur-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(145 65% 50% / 0.6), transparent)',
          left: '40%',
          bottom: '25%',
          transformOrigin: 'center'
        }}
        animate={{
          scaleX: [0, 1, 0],
          y: [0, -100, -200],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Grid pattern with scroll fade */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: Math.max(0.02, 0.08 - scrollY * 0.0001)
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0 ? 'hsl(198 93% 59%)' : i % 3 === 1 ? 'hsl(280 80% 60%)' : 'hsl(145 65% 50%)',
            left: `${10 + (i * 4.2) % 80}%`,
            top: `${5 + (i * 7.3) % 90}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: normalizedX * (5 + i * 2),
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            y: { duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: 0.3, ease: 'easeOut' },
            opacity: { duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
