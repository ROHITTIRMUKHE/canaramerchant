import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary-foreground) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary-foreground) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'hsl(var(--secondary))' }}
        initial={{ x: '10%', y: '20%' }}
        animate={{
          x: ['10%', '15%', '10%'],
          y: ['20%', '25%', '20%'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: 'hsl(var(--primary))' }}
        initial={{ x: '60%', y: '50%' }}
        animate={{
          x: ['60%', '65%', '60%'],
          y: ['50%', '55%', '50%'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: 'hsl(var(--secondary))' }}
        initial={{ x: '80%', y: '10%' }}
        animate={{
          x: ['80%', '75%', '80%'],
          y: ['10%', '15%', '10%'],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating UPI icons */}
      <motion.div
        className="absolute text-6xl opacity-10"
        style={{ left: '5%', top: '30%' }}
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        ₹
      </motion.div>

      <motion.div
        className="absolute text-4xl opacity-10"
        style={{ left: '25%', top: '60%' }}
        animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        ₹
      </motion.div>

      <motion.div
        className="absolute text-5xl opacity-10"
        style={{ left: '15%', top: '80%' }}
        animate={{ y: [-5, 15, -5], rotate: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        ₹
      </motion.div>

      {/* Overlay text */}
      <div className="absolute bottom-10 left-10 text-primary-foreground/20">
        <p className="text-sm font-medium">Secure UPI Payments powered by Canara Bank</p>
        <p className="text-xs mt-1">Trusted by Merchants Across India</p>
      </div>
    </div>
  );
}