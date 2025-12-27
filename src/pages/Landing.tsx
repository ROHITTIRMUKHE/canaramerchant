import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import GradientMeshBackground from '@/components/landing/GradientMeshBackground';
import PaymentVisualization from '@/components/landing/PaymentVisualization';
import TrustIndicators from '@/components/landing/TrustIndicators';
import LoginCard from '@/components/landing/LoginCard';
import FloatingElements from '@/components/landing/FloatingElements';
import FeaturesSection from '@/components/landing/FeaturesSection';
import StatsSection from '@/components/landing/StatsSection';
import ThemeToggle from '@/components/ThemeToggle';
import PCIDSSModal from '@/components/landing/PCIDSSModal';
import PrivacyPolicyModal from '@/components/landing/PrivacyPolicyModal';
import canaraBankLogo from '@/assets/canara-bank-logo.png';

export default function Landing() {
  const [pciModalOpen, setPciModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh]">
      <GradientMeshBackground />
      <FloatingElements />
      
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={canaraBankLogo} 
              alt="Canara Bank" 
              className="h-10 lg:h-12 w-auto"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold bg-gradient-to-r from-[hsl(198,93%,59%)] via-[hsl(280,80%,60%)] to-[hsl(145,65%,50%)] bg-clip-text text-transparent tracking-wide">
                UPI Merchant Solutions
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </header>

      {/* Hero section - sticky with scroll effects */}
      <motion.section 
        className="sticky top-0 min-h-screen flex flex-col pt-16"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 px-6 lg:px-16 py-4">
          {/* Left side - Hero content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[hsl(198,93%,59%)/15] via-[hsl(280,80%,60%)/15] to-[hsl(145,65%,50%)/15] backdrop-blur-sm border border-[hsl(198,93%,59%)/40] text-sm font-semibold mb-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[hsl(145,65%,50%)] to-[hsl(198,93%,59%)] animate-pulse" />
                <span className="bg-gradient-to-r from-[hsl(198,93%,59%)] via-[hsl(280,80%,60%)] to-[hsl(145,65%,50%)] bg-clip-text text-transparent">
                  India's Trusted Public Sector Bank
                </span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">Accept </span>
                <span className="bg-gradient-to-r from-[hsl(198,93%,59%)] via-[hsl(280,80%,60%)] to-[hsl(145,65%,50%)] bg-clip-text text-transparent">
                  UPI Payments
                </span>
                <br />
                <span className="text-foreground">with </span>
                <span className="bg-gradient-to-r from-[hsl(35,92%,50%)] to-[hsl(198,93%,59%)] bg-clip-text text-transparent">
                  Instant
                </span>
                <span className="text-foreground"> Settlements</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                Power your business with India's most reliable UPI payment infrastructure. 
                Real-time settlements, zero downtime, bank-grade security.
              </p>

              {/* Payment visualization */}
              <div className="hidden lg:block mb-10">
                <PaymentVisualization />
              </div>

              {/* Trust indicators */}
              <TrustIndicators />
            </motion.div>
          </div>

          {/* Right side - Login */}
          <div className="w-full lg:w-auto flex justify-center z-20">
            <LoginCard />
          </div>
        </div>

        {/* Mobile payment visualization */}
        <div className="lg:hidden px-6 pb-8">
          <PaymentVisualization />
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features section */}
      <div className="relative z-10 bg-background/80 backdrop-blur-xl">
        <FeaturesSection />
        <StatsSection />

        {/* Footer */}
        <footer className="py-12 px-6 lg:px-16 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img src={canaraBankLogo} alt="Canara Bank" className="h-10 w-auto" />
                <div className="text-sm text-muted-foreground">
                  <p>Canara Bank UPI Merchant Solutions</p>
                  <p className="text-xs">© 2024 Canara Bank. All Rights Reserved.</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <button
                  onClick={() => setPciModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  PCI-DSS Compliant
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <button onClick={() => setPrivacyModalOpen(true)} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Privacy Policy</button>
                <span className="text-muted-foreground">•</span>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                <span className="text-muted-foreground">•</span>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <PCIDSSModal open={pciModalOpen} onOpenChange={setPciModalOpen} />
      <PrivacyPolicyModal open={privacyModalOpen} onOpenChange={setPrivacyModalOpen} />
    </div>
  );
}
