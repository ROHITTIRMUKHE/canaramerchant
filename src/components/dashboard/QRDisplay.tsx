import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Download, QrCode, Sparkles, CheckCircle2, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import canaraLogo from '@/assets/canara-bank-logo.png';

interface QRDisplayProps {
  qrData: string | null;
  merchantName: string;
  merchantType: 'main' | 'sub';
  qrType: 'static' | 'dynamic' | null;
  amount: string | null;
  isGenerating: boolean;
}

export default function QRDisplay({ 
  qrData, 
  merchantName, 
  merchantType, 
  qrType,
  amount,
  isGenerating 
}: QRDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!qrRef.current || !qrData) return;

    try {
      const dataUrl = await toPng(qrRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `${merchantType}-merchant-${qrType}-qr.jpg`;
      link.href = dataUrl;
      link.click();

      toast({
        title: "✅ QR Downloaded Successfully",
        description: "Your QR code has been saved to your device.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-full border-2 border-sky-100 dark:border-sky-900/50 shadow-xl shadow-sky-500/5 overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-amber-400 via-sky-500 to-amber-400" />
      <CardHeader className="bg-gradient-to-br from-amber-50/80 to-transparent dark:from-amber-950/30">
        <CardTitle className="flex items-center gap-2 text-sky-900 dark:text-sky-100">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-sky-500 to-amber-500">
            <QrCode className="h-4 w-4 text-white" />
          </div>
          QR Preview
          {qrData && <Sparkles className="h-4 w-4 text-amber-500 ml-auto animate-pulse" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[500px] p-6">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Animated Loading */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-sky-500 to-amber-500 animate-spin" style={{ animationDuration: '2s' }}>
                  <div className="absolute inset-1 bg-background rounded-full" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <QrCode className="h-10 w-10 text-sky-500 animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground mb-1">Generating QR Code</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Powered by AI
                </p>
              </div>
            </motion.div>
          ) : qrData ? (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              {/* Success Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium"
              >
                <CheckCircle2 className="h-4 w-4" />
                QR Generated Successfully
              </motion.div>

              {/* QR Code Container */}
              <motion.div 
                ref={qrRef}
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-2xl shadow-sky-500/20 border-4 border-gradient"
                style={{ 
                  width: '340px',
                  borderImage: 'linear-gradient(135deg, #0ea5e9, #f59e0b) 1'
                }}
              >
                {/* Bank Header */}
                <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b-2 border-orange-500">
                  <img 
                    src={canaraLogo} 
                    alt="Canara Bank" 
                    className="h-14 object-contain"
                  />
                </div>

                {/* Scan & Pay Title */}
                <div className="text-center mb-4">
                  <p className="font-bold text-gray-800 text-lg tracking-wide">SCAN & PAY</p>
                  {amount && (
                    <div className="mt-2 inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-lg font-bold shadow-lg">
                      <IndianRupee className="h-5 w-5" />
                      {parseFloat(amount).toLocaleString('en-IN')}
                    </div>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex justify-center mb-4 p-3 bg-white rounded-xl border-2 border-sky-100">
                  <QRCodeSVG
                    value={qrData}
                    size={200}
                    level="H"
                    includeMargin={false}
                    fgColor="#1e3a5f"
                  />
                </div>

                {/* UPI ID */}
                <div className="text-center mb-4 p-2 bg-sky-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">UPI ID</p>
                  <p className="text-sm font-semibold text-sky-700 break-all">
                    {qrData.split('pa=')[1]?.split('&')[0] || 'merchant@upiuatcnrb'}
                  </p>
                </div>

                {/* BHIM UPI Logo */}
                <div className="flex items-center justify-center gap-4 py-3 border-t border-gray-200">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-green-500 rounded-lg">
                    <span className="text-white text-sm font-bold tracking-wider">BHIM</span>
                  </div>
                  <div className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-green-600 rounded-lg">
                    <span className="text-white text-sm font-bold tracking-wider">UPI</span>
                  </div>
                </div>

                {/* Digital Rupee Footer */}
                <div className="mt-4 pt-3 border-t-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 -mx-6 -mb-6 px-6 py-3 rounded-b-xl">
                  <p className="text-center text-sm font-bold text-green-600 flex items-center justify-center gap-2">
                    <span className="text-lg">₹</span>
                    DIGITAL RUPEE ACCEPTED HERE
                  </p>
                </div>
              </motion.div>

              {/* QR Info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center space-y-2 p-4 bg-gradient-to-r from-sky-50 to-amber-50 dark:from-sky-950/50 dark:to-amber-950/50 rounded-xl w-full max-w-xs"
              >
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="font-medium text-foreground">{merchantName}</span>
                </p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{qrType === 'static' ? 'Static QR' : 'Dynamic QR'}</span>
                </p>
              </motion.div>

              {/* Download Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-xs"
              >
                <Button 
                  onClick={handleDownload}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:via-orange-600 hover:to-amber-600 shadow-xl shadow-amber-500/30 border-0 transition-all duration-300 hover:scale-[1.02]"
                  size="lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download QR (JPG)
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              {/* Empty State */}
              <div className="relative">
                <div className="w-56 h-56 border-4 border-dashed border-sky-200 dark:border-sky-800 rounded-3xl flex items-center justify-center bg-gradient-to-br from-sky-50 to-amber-50 dark:from-sky-950/50 dark:to-amber-950/50">
                  <div className="absolute inset-4 border-2 border-dashed border-amber-200 dark:border-amber-800 rounded-2xl" />
                  <QrCode className="h-20 w-20 text-sky-300 dark:text-sky-700" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground mb-2">
                  Ready to Generate
                </p>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Select QR type and click "Generate QR" to preview your banking QR code
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
