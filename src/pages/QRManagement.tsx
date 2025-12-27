import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Radio, Zap, QrCode, AlertCircle, IndianRupee, Sparkles } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QRDisplay from '@/components/dashboard/QRDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

type MerchantType = 'main' | 'sub';
type QRType = 'static' | 'dynamic';

export default function QRManagement() {
  const { t } = useLanguage();
  const [activeMerchant, setActiveMerchant] = useState<MerchantType>('main');
  const [selectedQRType, setSelectedQRType] = useState<QRType | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [qrData, setQrData] = useState<string | null>(null);
  const [qrAmount, setQrAmount] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const merchantNames = {
    main: 'Main Merchant Store',
    sub: 'Sub-Merchant Outlet',
  };

  const handleTabChange = (value: string) => {
    setActiveMerchant(value as MerchantType);
    setSelectedQRType(null);
    setQrData(null);
    setQrAmount(null);
    setAmount('');
    setError(null);
  };

  const handleQRTypeChange = (value: string) => {
    setSelectedQRType(value as QRType);
    setQrData(null);
    setQrAmount(null);
    setAmount('');
    setError(null);
  };

  const generateQR = async () => {
    if (!selectedQRType) {
      setError('Please select a QR type before generating.');
      return;
    }

    if (selectedQRType === 'dynamic' && (!amount || parseFloat(amount) <= 0)) {
      setError('Please enter a valid amount for Dynamic QR.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate QR generation with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 1800));

      // Generate UPI ID based on merchant type and QR type
      const merchantId = activeMerchant === 'main' ? 'canarastore' : 'canaraoutlet';
      const timestamp = selectedQRType === 'dynamic' ? `${Date.now().toString(36)}` : '';
      
      let upiString = '';
      if (selectedQRType === 'static') {
        upiString = `upi://pay?pa=${merchantId}@upiuatcnrb&pn=Canara%20Bank%20Merchant&cu=INR`;
      } else {
        upiString = `upi://pay?pa=${merchantId}${timestamp}@upiuatcnrb&pn=Canara%20Bank%20Merchant&am=${amount}&cu=INR&tn=Payment`;
      }

      setQrData(upiString);
      setQrAmount(selectedQRType === 'dynamic' ? amount : null);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-sky-50/50 via-background to-amber-50/30 dark:from-sky-950/20 dark:via-background dark:to-amber-950/10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header with gradient */}
            <div className="mb-6 relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-sky-400/20 rounded-full blur-3xl" />
              <div className="absolute -top-2 right-20 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl" />
              <div className="relative">
                <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/30">
                    <QrCode className="h-6 w-6" />
                  </div>
                  {t.pages.qrManagement.title}
                  <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
                </h1>
                <p className="text-muted-foreground">
                  {t.pages.qrManagement.subtitle}
                </p>
              </div>
            </div>

            {/* Main Content - Left Panel & Right Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel - Selection Controls */}
              <Card className="border-2 border-sky-100 dark:border-sky-900/50 shadow-xl shadow-sky-500/5 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-amber-400" />
                <CardHeader className="bg-gradient-to-br from-sky-50/80 to-transparent dark:from-sky-950/30">
                  <CardTitle className="flex items-center gap-2 text-sky-900 dark:text-sky-100">
                    <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-900">
                      <QrCode className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    </div>
                    Configure QR Code
                  </CardTitle>
                  <CardDescription>
                    Select merchant type and QR configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  {/* Merchant Tabs */}
                  <Tabs value={activeMerchant} onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2 bg-sky-100/50 dark:bg-sky-900/30 p-1">
                      <TabsTrigger 
                        value="main" 
                        className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-sky-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                      >
                        <Building2 className="h-4 w-4" />
                        Main Merchant
                      </TabsTrigger>
                      <TabsTrigger 
                        value="sub" 
                        className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-sky-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                      >
                        <Users className="h-4 w-4" />
                        Sub-Merchant
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="main" className="mt-6">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-r from-sky-100/80 to-amber-50/50 dark:from-sky-900/40 dark:to-amber-900/20 rounded-xl border-2 border-sky-200/50 dark:border-sky-800/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-sky-500 text-white">
                            <Building2 className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">Main Merchant – Bank QR</h3>
                            <p className="text-sm text-muted-foreground">
                              Generate QR code for your primary merchant account
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="sub" className="mt-6">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-r from-amber-100/80 to-sky-50/50 dark:from-amber-900/40 dark:to-sky-900/20 rounded-xl border-2 border-amber-200/50 dark:border-amber-800/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-amber-500 text-white">
                            <Users className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">Sub-Merchant – Bank QR</h3>
                            <p className="text-sm text-muted-foreground">
                              Generate QR code for your sub-merchant accounts
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>
                  </Tabs>

                  {/* QR Type Selection */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                        QR Type
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 ml-8">
                        Choose the type of QR code you want to generate
                      </p>
                    </div>

                    <RadioGroup
                      value={selectedQRType || ''}
                      onValueChange={handleQRTypeChange}
                      className="grid grid-cols-2 gap-4"
                    >
                      {/* Static QR Option */}
                      <Label
                        htmlFor="static"
                        className={cn(
                          "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group",
                          selectedQRType === 'static'
                            ? "border-sky-500 bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900/50 dark:to-sky-950/30 shadow-lg shadow-sky-500/20"
                            : "border-border hover:border-sky-300 hover:bg-sky-50/50 dark:hover:bg-sky-950/30"
                        )}
                      >
                        <RadioGroupItem value="static" id="static" className="sr-only" />
                        {selectedQRType === 'static' && (
                          <motion.div 
                            layoutId="qrTypeIndicator"
                            className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent"
                          />
                        )}
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg",
                          selectedQRType === 'static' 
                            ? "bg-gradient-to-br from-sky-500 to-sky-600 text-white scale-110" 
                            : "bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 group-hover:scale-105"
                        )}>
                          <Radio className="h-8 w-8" />
                        </div>
                        <div className="text-center relative">
                          <p className="font-bold text-foreground">Static QR</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Fixed UPI ID, unlimited uses
                          </p>
                        </div>
                      </Label>

                      {/* Dynamic QR Option */}
                      <Label
                        htmlFor="dynamic"
                        className={cn(
                          "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group",
                          selectedQRType === 'dynamic'
                            ? "border-amber-500 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/50 dark:to-amber-950/30 shadow-lg shadow-amber-500/20"
                            : "border-border hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/30"
                        )}
                      >
                        <RadioGroupItem value="dynamic" id="dynamic" className="sr-only" />
                        {selectedQRType === 'dynamic' && (
                          <motion.div 
                            layoutId="qrTypeIndicator"
                            className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent"
                          />
                        )}
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg",
                          selectedQRType === 'dynamic' 
                            ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white scale-110" 
                            : "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 group-hover:scale-105"
                        )}>
                          <Zap className="h-8 w-8" />
                        </div>
                        <div className="text-center relative">
                          <p className="font-bold text-foreground">Dynamic QR</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Unique per transaction
                          </p>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>

                  {/* Amount Input for Dynamic QR */}
                  <AnimatePresence>
                    {selectedQRType === 'dynamic' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 overflow-hidden"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                            Transaction Amount
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 ml-8">
                            Enter the payment amount for this QR
                          </p>
                        </div>
                        <div className="relative ml-8">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900">
                            <IndianRupee className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-12 h-12 text-lg font-semibold border-2 border-amber-200 dark:border-amber-800 focus:border-amber-500 bg-amber-50/50 dark:bg-amber-950/30"
                            min="1"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error Alert */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <Alert variant="destructive" className="border-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Generate Button */}
                  <Button
                    onClick={generateQR}
                    disabled={!selectedQRType || isGenerating}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 hover:from-sky-600 hover:via-sky-700 hover:to-sky-600 shadow-xl shadow-sky-500/30 border-0 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        Generating with AI...
                      </>
                    ) : (
                      <>
                        <QrCode className="h-6 w-6 mr-3" />
                        Generate QR Code
                        <Sparkles className="h-4 w-4 ml-2 text-amber-300" />
                      </>
                    )}
                  </Button>

                  {/* Info Section */}
                  <div className="p-4 bg-gradient-to-r from-sky-50 to-amber-50 dark:from-sky-950/50 dark:to-amber-950/50 rounded-xl border-2 border-dashed border-sky-200 dark:border-sky-800">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="text-sky-500">💡</span> Quick Guide
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                        <span><strong className="text-sky-600 dark:text-sky-400">Static QR:</strong> Same QR for all transactions, customer enters amount</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span><strong className="text-amber-600 dark:text-amber-400">Dynamic QR:</strong> Unique QR per transaction with preset amount</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                        <span>Download the QR in JPG format for print or digital display</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Right Panel - QR Display */}
              <QRDisplay
                qrData={qrData}
                merchantName={merchantNames[activeMerchant]}
                merchantType={activeMerchant}
                qrType={selectedQRType}
                amount={qrAmount}
                isGenerating={isGenerating}
              />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
