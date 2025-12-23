import { motion } from 'framer-motion';
import { Smartphone, QrCode, CheckCircle2, ArrowRight, Wallet } from 'lucide-react';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import canaraBankLogo from '@/assets/canara-bank-logo.png';

const steps = [
  { icon: Smartphone, label: 'Scan', delay: 0 },
  { icon: QrCode, label: 'Pay', delay: 0.2 },
  { icon: Wallet, label: 'Process', delay: 0.4 },
  { icon: CheckCircle2, label: 'Done', delay: 0.6 },
];

export default function PaymentVisualization() {
  const { normalizedX, normalizedY } = useMouseParallax();

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Central QR Code Display */}
        <motion.div
          className="relative mx-auto w-64 h-64"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            transform: `perspective(1000px) rotateY(${normalizedX * 5}deg) rotateX(${normalizedY * -5}deg)`
          }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'conic-gradient(from 0deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3), hsl(var(--primary) / 0.3))',
              filter: 'blur(20px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* QR Card */}
          <div className="absolute inset-4 bg-gradient-to-br from-card to-muted rounded-2xl p-4 shadow-2xl">
            {/* QR Pattern */}
            <div className="w-full h-full grid grid-cols-8 gap-1 p-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-sm"
                  style={{
                    backgroundColor: (i % 3 === 0 || i % 7 === 0) ? 'hsl(var(--foreground))' : 'transparent'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.01), duration: 0.2 }}
                />
              ))}
            </div>
            
            {/* Canara Bank Logo Center */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
            >
              <div className="w-16 h-16 bg-card rounded-xl flex items-center justify-center shadow-lg border border-border">
                <img 
                  src={canaraBankLogo} 
                  alt="Canara Bank" 
                  className="w-12 h-12 object-contain"
                />
              </div>
            </motion.div>
          </div>

          {/* Scan line animation */}
          <motion.div
            className="absolute left-4 right-4 h-1 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ top: ['20%', '80%', '20%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Floating phone mockups with parallax */}
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-32 h-56"
          initial={{ x: -50, opacity: 0, rotateY: -20 }}
          animate={{ 
            x: normalizedX * 15, 
            y: normalizedY * 15,
            opacity: 1, 
            rotateY: -15 + normalizedX * 5
          }}
          transition={{ 
            x: { duration: 0.3, ease: 'easeOut' },
            y: { duration: 0.3, ease: 'easeOut' },
            default: { duration: 0.8, delay: 0.5 }
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-secondary to-muted rounded-2xl p-2 shadow-2xl border border-border">
            <div className="w-full h-full bg-gradient-to-br from-background to-muted rounded-xl flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <QrCode className="w-12 h-12 text-primary" />
              </motion.div>
            </div>
          </div>
          {/* Camera indicator */}
          <motion.div
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full border-2 border-primary" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute -right-8 top-1/2 -translate-y-1/2 w-32 h-56"
          initial={{ x: 50, opacity: 0, rotateY: 20 }}
          animate={{ 
            x: normalizedX * -15, 
            y: normalizedY * -15,
            opacity: 1, 
            rotateY: 15 + normalizedX * -5
          }}
          transition={{ 
            x: { duration: 0.3, ease: 'easeOut' },
            y: { duration: 0.3, ease: 'easeOut' },
            default: { duration: 0.8, delay: 0.7 }
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-secondary to-muted rounded-2xl p-2 shadow-2xl border border-border">
            <div className="w-full h-full bg-gradient-to-br from-background to-muted rounded-xl flex flex-col items-center justify-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: 'spring' }}
              >
                <CheckCircle2 className="w-10 h-10 text-chart-4" />
              </motion.div>
              <motion.span 
                className="text-xs text-chart-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                ₹1,250
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Payment flow steps */}
        <motion.div 
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + step.delay }}
            >
              <div className="flex flex-col items-center gap-2">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center"
                  whileHover={{ scale: 1.1, borderColor: 'hsl(var(--primary))' }}
                >
                  <step.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="text-xs text-muted-foreground">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground mt-[-20px]" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
