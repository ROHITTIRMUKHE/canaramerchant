import { motion } from 'framer-motion';
import GradientMeshBackground from '@/components/landing/GradientMeshBackground';
import PaymentVisualization from '@/components/landing/PaymentVisualization';
import TrustIndicators from '@/components/landing/TrustIndicators';
import LoginCard from '@/components/landing/LoginCard';
import FloatingElements from '@/components/landing/FloatingElements';

export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientMeshBackground />
      <FloatingElements />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 lg:p-8">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(45,90%,50%)] to-[hsl(35,95%,45%)] rounded-xl flex items-center justify-center shadow-lg shadow-[hsl(45,90%,50%)]/20">
              <span className="text-[hsl(220,45%,12%)] font-bold text-lg">CB</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[hsl(0,0%,100%)]">Canara Bank</h1>
              <p className="text-xs text-[hsl(220,20%,60%)]">UPI Merchant Solutions</p>
            </div>
          </motion.div>
        </header>

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 lg:px-16 py-8">
          {/* Left side - Hero content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(220,30%,15%)]/80 backdrop-blur-sm border border-[hsl(220,30%,25%)] text-xs text-[hsl(220,20%,70%)] mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="w-2 h-2 rounded-full bg-[hsl(145,65%,50%)] animate-pulse" />
                India's Trusted Public Sector Bank
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-[hsl(0,0%,100%)]">Accept UPI</span>
                <br />
                <span className="text-[hsl(0,0%,100%)]">Payments </span>
                <span className="bg-gradient-to-r from-[hsl(45,90%,50%)] to-[hsl(35,95%,55%)] bg-clip-text text-transparent">
                  Instantly
                </span>
              </h1>

              <p className="text-lg text-[hsl(220,20%,65%)] mb-8 max-w-lg mx-auto lg:mx-0">
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
          <div className="w-full lg:w-auto flex justify-center">
            <LoginCard />
          </div>
        </div>

        {/* Mobile payment visualization */}
        <div className="lg:hidden px-6 pb-8">
          <PaymentVisualization />
        </div>

        {/* Footer */}
        <footer className="p-6 lg:p-8">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[hsl(220,20%,50%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="flex items-center gap-4">
              <span>Powered by NPCI</span>
              <span>•</span>
              <span>RBI Regulated</span>
              <span>•</span>
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[hsl(45,90%,50%)] transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-[hsl(45,90%,50%)] transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-[hsl(45,90%,50%)] transition-colors">Contact Support</a>
            </div>
          </motion.div>
        </footer>
      </div>
    </main>
  );
}