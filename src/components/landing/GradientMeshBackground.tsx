import { motion } from 'framer-motion';

export default function GradientMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[hsl(220,50%,8%)] via-[hsl(220,45%,12%)] to-[hsl(220,40%,18%)]">
      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, hsla(45, 90%, 50%, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, hsla(220, 70%, 40%, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 50% 80%, hsla(200, 80%, 50%, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Animated floating orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ 
          background: 'radial-gradient(circle, hsla(45, 90%, 50%, 0.12) 0%, transparent 70%)',
          left: '10%',
          top: '20%'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ 
          background: 'radial-gradient(circle, hsla(220, 70%, 50%, 0.15) 0%, transparent 70%)',
          right: '5%',
          top: '10%'
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
        style={{ 
          background: 'radial-gradient(circle, hsla(280, 60%, 50%, 0.08) 0%, transparent 70%)',
          left: '40%',
          bottom: '10%'
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(0 0% 100%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(0 0% 100%) 1px, transparent 1px)
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