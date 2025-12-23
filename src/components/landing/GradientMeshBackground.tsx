import { motion } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';

export default function GradientMeshBackground() {
  const { normalizedX, normalizedY } = useMouseParallax();

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, hsl(var(--accent) / 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 50% 80%, hsl(var(--chart-3) / 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Cursor-reactive orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ 
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
          left: '10%',
          top: '20%'
        }}
        animate={{
          x: normalizedX * 30,
          y: normalizedY * 30,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          x: { duration: 0.3, ease: 'easeOut' },
          y: { duration: 0.3, ease: 'easeOut' },
          scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ 
          background: 'radial-gradient(circle, hsl(var(--chart-3) / 0.15) 0%, transparent 70%)',
          right: '5%',
          top: '10%'
        }}
        animate={{
          x: normalizedX * -40,
          y: normalizedY * 50,
          scale: [1, 1.15, 1],
        }}
        transition={{ 
          x: { duration: 0.3, ease: 'easeOut' },
          y: { duration: 0.3, ease: 'easeOut' },
          scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
        style={{ 
          background: 'radial-gradient(circle, hsl(var(--chart-4) / 0.08) 0%, transparent 70%)',
          left: '40%',
          bottom: '10%'
        }}
        animate={{
          x: normalizedX * 20,
          y: normalizedY * -30,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          x: { duration: 0.3, ease: 'easeOut' },
          y: { duration: 0.3, ease: 'easeOut' },
          scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
