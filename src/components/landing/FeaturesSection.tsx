import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { CreditCard, Shield, Zap, BarChart3, QrCode, Smartphone } from 'lucide-react';
import canaraBankLogo from '@/assets/canara-bank-logo.png';
import { useLanguage } from '@/lib/i18n';

export default function FeaturesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: QrCode,
      title: t.landing.features.instantQr.title,
      description: t.landing.features.instantQr.description,
      color: 'hsl(198 93% 59%)',
      gradient: 'from-[hsl(198,93%,59%)] to-[hsl(198,93%,45%)]'
    },
    {
      icon: Zap,
      title: t.landing.features.realTimeSettlements.title,
      description: t.landing.features.realTimeSettlements.description,
      color: 'hsl(35 92% 50%)',
      gradient: 'from-[hsl(35,92%,50%)] to-[hsl(25,90%,45%)]'
    },
    {
      icon: Shield,
      title: t.landing.features.bankGradeSecurity.title,
      description: t.landing.features.bankGradeSecurity.description,
      color: 'hsl(145 65% 50%)',
      gradient: 'from-[hsl(145,65%,50%)] to-[hsl(145,65%,40%)]'
    },
    {
      icon: BarChart3,
      title: t.landing.features.smartAnalytics.title,
      description: t.landing.features.smartAnalytics.description,
      color: 'hsl(280 80% 60%)',
      gradient: 'from-[hsl(280,80%,60%)] to-[hsl(280,80%,50%)]'
    },
    {
      icon: Smartphone,
      title: t.landing.features.multiDevice.title,
      description: t.landing.features.multiDevice.description,
      color: 'hsl(320 70% 55%)',
      gradient: 'from-[hsl(320,70%,55%)] to-[hsl(320,70%,45%)]'
    },
    {
      icon: CreditCard,
      title: t.landing.features.lowFees.title,
      description: t.landing.features.lowFees.description,
      color: 'hsl(198 93% 59%)',
      gradient: 'from-[hsl(198,93%,59%)] to-[hsl(220,80%,50%)]'
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 lg:px-16 relative z-10 overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[100px] bg-[hsl(198,93%,59%,0.1)]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[120px] bg-[hsl(280,80%,60%,0.08)]" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section header with scroll animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <img src={canaraBankLogo} alt="Canara Bank" className="h-10 w-auto" />
          </motion.div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            {t.landing.whyChoose}{' '}
            <span className="bg-gradient-to-r from-[hsl(198,93%,59%)] via-[hsl(280,80%,60%)] to-[hsl(35,92%,50%)] bg-clip-text text-transparent">
              {t.landing.whyChooseBank}
            </span>{' '}
            {t.landing.whyChooseUpi}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.landing.trustedByMerchants}
          </p>
        </motion.div>

        {/* Features grid with staggered scroll animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ y }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer"
              style={{
                background: hoveredIndex === index 
                  ? `linear-gradient(135deg, ${feature.color.replace(')', ' / 0.15)')}, hsl(var(--card) / 0.8))`
                  : 'hsl(var(--card) / 0.5)',
                borderColor: hoveredIndex === index 
                  ? feature.color.replace(')', ' / 0.5)')
                  : 'hsl(var(--border))',
                boxShadow: hoveredIndex === index 
                  ? `0 20px 40px ${feature.color.replace(')', ' / 0.2)')}`
                  : 'none'
              }}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -10 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${feature.color.replace(')', ' / 0.1)')}, transparent 70%)`
                }}
              />
              
              <motion.div 
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 relative z-10`}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 relative z-10">{feature.title}</h3>
              <p className="text-muted-foreground text-sm relative z-10">{feature.description}</p>
              
              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity"
                style={{
                  background: `radial-gradient(circle at top right, ${feature.color}, transparent 70%)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
