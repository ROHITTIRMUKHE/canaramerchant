import { Suspense } from 'react';
import { motion } from 'framer-motion';
import PaymentScene3D from '@/components/landing/PaymentScene3D';
import LoginPanel from '@/components/landing/LoginPanel';
import HeroBackground from '@/components/landing/HeroBackground';

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - 3D Scene (65%) */}
      <section className="relative w-full lg:w-[65%] min-h-[50vh] lg:min-h-screen">
        <HeroBackground />
        
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
          </div>
        }>
          <PaymentScene3D />
        </Suspense>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 gradient-gold rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-secondary-foreground font-bold text-2xl">CB</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-foreground">Canara Bank</h2>
                <p className="text-sm text-primary-foreground/70">Merchant Solutions</p>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              UPI Merchant
              <span className="block text-gradient">Payment Portal</span>
            </h1>
            
            <p className="text-lg text-primary-foreground/80 mb-8">
              Accept instant UPI payments with India's trusted public sector bank. 
              Real-time settlements, zero transaction failures.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-primary-foreground/90">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-secondary font-bold">₹</span>
                <span className="text-sm text-primary-foreground/90">Instant Settlements</span>
              </div>
              <div className="flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm text-primary-foreground/90">NPCI Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Right Side - Login Panel (35%) */}
      <section className="w-full lg:w-[35%] min-h-[50vh] lg:min-h-screen bg-background flex items-center justify-center p-6 lg:p-12">
        <LoginPanel />
      </section>
    </main>
  );
}