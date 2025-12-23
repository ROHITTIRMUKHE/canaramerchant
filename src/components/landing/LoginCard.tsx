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

  const handleSendOtp = () => {
    if (mobileNumber.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }
    
    setOtpSent(true);
    setCountdown(30);
    toast({
      title: "OTP Sent Successfully",
      description: "A 6-digit OTP has been sent to your mobile",
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
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }
    
    if (mode === 'password' && password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    if (mode === 'otp' && otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome to Canara Bank UPI Merchant Portal",
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-md"
      style={{
        transform: `perspective(1000px) rotateY(${normalizedX * 2}deg) rotateX(${normalizedY * -2}deg)`
      }}
    >
      {/* Glassmorphism card */}
      <div className="relative">
        {/* Card glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-xl opacity-20" />
        
        <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl border border-border p-8 shadow-2xl">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
            >
              <img 
                src={canaraBankLogo} 
                alt="Canara Bank" 
                className="h-14 w-auto object-contain"
              />
            </motion.div>
            <h2 className="text-xl font-bold text-foreground">Merchant Login</h2>
            <p className="text-sm text-muted-foreground mt-1">Access your UPI dashboard</p>
          </div>

          {/* Login mode toggle */}
          <div className="flex gap-2 p-1 bg-secondary rounded-xl mb-6">
            {(['password', 'otp'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setOtpSent(false); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                  mode === m 
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {m === 'password' ? <KeyRound className="w-4 h-4" /> : <Fingerprint className="w-4 h-4" />}
                {m === 'password' ? 'Password' : 'OTP'}
              </button>
            ))}
          </div>

          {/* Mobile input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Mobile Number</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">+91</span>
                <Phone className="absolute left-12 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  className="pl-20 h-12 bg-secondary border-border text-foreground text-lg font-medium placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  disabled={mode === 'otp' && otpSent}
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
                  <Label className="text-muted-foreground text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="pl-12 pr-12 h-12 bg-secondary border-border text-foreground text-lg font-medium placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-xs text-primary hover:underline">Forgot Password?</button>
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
                      variant="outline"
                      className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      Send OTP
                    </Button>
                  ) : (
                    <>
                      <Label className="text-muted-foreground text-sm">Enter OTP</Label>
                      <div className="flex gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <Input
                            key={i}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-xl font-bold bg-secondary border-border text-foreground focus:border-primary focus:ring-primary/20"
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
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {countdown > 0 ? `Resend in ${countdown}s` : ''}
                        </span>
                        <button
                          onClick={handleSendOtp}
                          disabled={countdown > 0}
                          className={cn(
                            countdown > 0 ? 'text-muted-foreground' : 'text-primary hover:underline'
                          )}
                        >
                          Resend OTP
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleLogin}
                disabled={isLoading || (mode === 'otp' && !otpSent)}
                className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Login to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Security footer */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4 text-chart-4" />
              <span>256-bit SSL Encrypted • NPCI Compliant • PCI DSS Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        © 2024 Canara Bank. All Rights Reserved.
      </p>
    </motion.div>
  );
}
