import { motion } from 'framer-motion';

export default function FloatingElements() {
  return (
    <>
      {/* Floating rupee coins */}
      {[
        { x: '15%', y: '20%', size: 50, delay: 0 },
        { x: '75%', y: '15%', size: 40, delay: 0.5 },
        { x: '85%', y: '60%', size: 35, delay: 1 },
        { x: '10%', y: '70%', size: 45, delay: 1.5 },
        { x: '60%', y: '80%', size: 30, delay: 2 },
      ].map((coin, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: coin.x, top: coin.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: 1,
            y: [0, -20, 0],
            rotateY: [0, 180, 360]
          }}
          transition={{ 
            duration: 4,
            delay: coin.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div 
            className="rounded-full flex items-center justify-center font-bold shadow-lg"
            style={{
              width: coin.size,
              height: coin.size,
              background: 'linear-gradient(135deg, hsl(45, 90%, 55%) 0%, hsl(35, 95%, 45%) 100%)',
              color: 'hsl(220, 45%, 12%)',
              fontSize: coin.size * 0.4,
              boxShadow: '0 4px 20px hsla(45, 90%, 50%, 0.3)'
            }}
          >
            ₹
          </div>
        </motion.div>
      ))}

      {/* Floating UPI badges */}
      <motion.div
        className="absolute left-[5%] top-[40%] pointer-events-none"
        animate={{ 
          y: [0, -15, 0],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="px-4 py-2 bg-[hsl(220,30%,15%)]/80 backdrop-blur-sm rounded-full border border-[hsl(220,30%,25%)] text-xs text-[hsl(0,0%,100%)]">
          <span className="text-[hsl(145,65%,50%)]">●</span> UPI Active
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[35%] pointer-events-none"
        animate={{ 
          y: [0, 15, 0],
          rotate: [5, -5, 5]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="px-4 py-2 bg-[hsl(220,30%,15%)]/80 backdrop-blur-sm rounded-full border border-[hsl(220,30%,25%)] text-xs text-[hsl(0,0%,100%)]">
          +₹12,450 <span className="text-[hsl(145,65%,50%)]">received</span>
        </div>
      </motion.div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" preserveAspectRatio="none">
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
            <stop offset="0%" stopColor="hsl(45, 90%, 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(45, 90%, 50%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(45, 90%, 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}