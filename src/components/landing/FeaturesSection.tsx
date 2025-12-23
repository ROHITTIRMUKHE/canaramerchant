import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CreditCard, Shield, Zap, BarChart3, QrCode, Smartphone } from 'lucide-react';
import canaraBankLogo from '@/assets/canara-bank-logo.png';

const features = [
  {
    icon: QrCode,
    title: 'Instant QR Payments',
    description: 'Accept payments instantly with dynamic QR codes. No hardware needed.',
  },
  {
    icon: Zap,
    title: 'Real-time Settlements',
    description: 'Get your money within hours, not days. Faster cash flow for your business.',
  },
  {
    icon: Shield,
    title: 'Bank-grade Security',
    description: 'Protected by Canara Bank\'s enterprise security infrastructure.',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Track every transaction with detailed insights and reports.',
  },
  {
    icon: Smartphone,
    title: 'Multi-device Access',
    description: 'Manage your payments from any device, anywhere, anytime.',
  },
  {
    icon: CreditCard,
    title: 'Low Transaction Fees',
    description: 'Competitive rates that help you keep more of what you earn.',
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 lg:px-16 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={canaraBankLogo} alt="Canara Bank" className="h-8 w-auto" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Canara Bank</span> UPI?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by over 2 lakh merchants across India for secure, reliable UPI payments.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
