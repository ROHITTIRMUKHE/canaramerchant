import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Phone, Eye, EyeOff, Shield, ArrowRight, Fingerprint, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useLanguage } from '@/lib/i18n';
import canaraBankLogo from '@/assets/canara-bank-logo.png';

type LoginMode = 'password' | 'otp';

export default function LoginCard() {
  const [mode, setMode] = useState<LoginMode>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { normalizedX, normalizedY } = useMouseParallax();
  const { t } = useLanguage();

  const handleSendOtp = () => {
    if (mobileNumber.length !== 10) {
      toast({
        title: t.login.invalidMobile,
        description: t.login.invalidMobileDesc,
        variant: "destructive"
      });
      return;
    }
    
    setOtpSent(true);
    setCountdown(30);
    toast({
      title: t.login.otpSentSuccess,
      description: t.login.otpSentDesc,
    });
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = () => {
    if (mobileNumber.length !== 10) {
      toast({
        title: t.login.invalidMobile,
        description: t.login.invalidMobileDesc,
        variant: "destructive"
      });
      return;
    }
    
    if (mode === 'password' && password.length < 6) {
      toast({
        title: t.login.invalidPassword,
        description: t.login.invalidPasswordDesc,
        variant: "destructive"
      });
      return;
    }

    if (mode === 'otp' && otp.length !== 6) {
      toast({
        title: t.login.invalidOtp,
        description: t.login.invalidOtpDesc,
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t.login.loginSuccess,
        description: t.login.loginSuccessDesc,
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-[340px] -mt-16"
      style={{
        transform: `perspective(1000px) rotateY(${normalizedX * 2}deg) rotateX(${normalizedY * -2}deg)`,
      }}
    >
      {/* Light themed card - forced white theme */}
      <div className="relative">
        {/* Card glow effect - subtle blue */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(198,93%,59%)] via-[hsl(210,100%,50%)] to-[hsl(198,93%,59%)] rounded-3xl blur-xl opacity-15" />
        
        {/* FORCED WHITE CARD - ignores dark mode */}
        <div className="relative rounded-2xl border border-[hsl(220,13%,85%)] p-5 shadow-xl"
          style={{ 
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)'
          }}
        >
          {/* Header with Logo */}
          <div className="text-center mb-4">
            <motion.div 
              className="flex items-center justify-center gap-2 mb-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
            >
              <img 
                src={canaraBankLogo} 
                alt="Canara Bank" 
                className="h-10 w-auto object-contain"
              />
            </motion.div>
            <h2 className="text-lg font-bold" style={{ color: '#1a1a1a' }}>{t.login.title}</h2>
            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>{t.login.subtitle}</p>
          </div>

          {/* Login mode toggle - light themed */}
          <div className="flex gap-2 p-1 rounded-xl mb-3" style={{ backgroundColor: '#f3f4f6' }}>
            {(['password', 'otp'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setOtpSent(false); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                  mode === m 
                    ? "shadow-md" 
                    : ""
                )}
                style={{
                  backgroundColor: mode === m ? 'hsl(198,93%,59%)' : 'transparent',
                  color: mode === m ? '#ffffff' : '#374151',
                }}
              >
                {m === 'password' ? <KeyRound className="w-4 h-4" /> : <Fingerprint className="w-4 h-4" />}
                {m === 'password' ? t.login.password : t.login.otp}
              </button>
            ))}
          </div>

          {/* Mobile input */}
          <div className="space-y-2.5">
            <div className="space-y-2">
              <Label className="text-sm font-medium" style={{ color: '#1f2937' }}>{t.login.mobileNumber}</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold" style={{ color: '#374151' }}>+91</span>
                <Phone className="absolute left-12 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#6b7280' }} />
                <input
                  type="tel"
                  placeholder={t.login.mobileNumberPlaceholder}
                  className="w-full pl-20 h-10 rounded-lg text-base font-bold outline-none transition-all"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #d1d5db',
                    color: '#000000',
                  }}
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  disabled={mode === 'otp' && otpSent}
                  onFocus={(e) => e.target.style.borderColor = 'hsl(198,93%,59%)'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'password' ? (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label className="text-sm font-medium" style={{ color: '#1f2937' }}>{t.login.password}</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#6b7280' }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t.login.passwordPlaceholder}
                      className="w-full pl-12 pr-12 h-10 rounded-lg text-base font-bold outline-none transition-all"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '2px solid #d1d5db',
                        color: '#000000',
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = 'hsl(198,93%,59%)'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:opacity-70"
                      style={{ color: '#6b7280' }}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-xs font-medium hover:underline" style={{ color: 'hsl(198,93%,45%)' }}>{t.login.forgotPassword}</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  {!otpSent ? (
                    <Button
                      onClick={handleSendOtp}
                      className="w-full h-10 font-semibold transition-all"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '2px solid hsl(198,93%,59%)',
                        color: 'hsl(198,93%,45%)',
                      }}
                    >
                      {t.login.sendOtp}
                    </Button>
                  ) : (
                    <>
                      <Label className="text-sm font-medium" style={{ color: '#1f2937' }}>{t.login.enterOtp}</Label>
                      <div className="flex gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <input
                            key={i}
                            type="text"
                            maxLength={1}
                            className="w-10 h-10 text-center text-lg font-bold rounded-lg outline-none transition-all"
                            style={{
                              backgroundColor: '#ffffff',
                              border: '2px solid #d1d5db',
                              color: '#000000',
                            }}
                            value={otp[i] || ''}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              const newOtp = otp.split('');
                              newOtp[i] = val;
                              setOtp(newOtp.join('').slice(0, 6));
                              if (val && e.target.nextElementSibling) {
                                (e.target.nextElementSibling as HTMLInputElement).focus();
                              }
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'hsl(198,93%,59%)'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: '#6b7280' }}>
                          {countdown > 0 ? `${t.login.resendIn} ${countdown}s` : ''}
                        </span>
                        <button
                          onClick={handleSendOtp}
                          disabled={countdown > 0}
                          className="font-medium hover:underline"
                          style={{ 
                            color: countdown > 0 ? '#9ca3af' : 'hsl(198,93%,45%)'
                          }}
                        >
                          {t.login.resendOtp}
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login button - Primary Blue */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleLogin}
                disabled={isLoading || (mode === 'otp' && !otpSent)}
                className="w-full h-10 font-semibold transition-all shadow-lg disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, hsl(198,93%,50%) 0%, hsl(210,100%,45%) 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(0,136,204,0.35)',
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.login.authenticating}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {t.login.loginButton}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Security footer - light themed */}
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid #e5e7eb' }}>
            <div className="flex items-center justify-center gap-2 text-xs" style={{ color: '#6b7280' }}>
              <Shield className="h-4 w-4" style={{ color: 'hsl(145,65%,40%)' }} />
              <span>{t.login.securityInfo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright - dark text for visibility */}
      <p className="text-center text-xs mt-3" style={{ color: '#6b7280' }}>
        {t.login.copyright}
      </p>
    </motion.div>
  );
}
