import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Radio, Zap, QrCode, AlertCircle } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QRDisplay from '@/components/dashboard/QRDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type MerchantType = 'main' | 'sub';
type QRType = 'static' | 'dynamic';

export default function QRManagement() {
  const [activeMerchant, setActiveMerchant] = useState<MerchantType>('main');
  const [selectedQRType, setSelectedQRType] = useState<QRType | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
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
    setError(null);
  };

  const handleQRTypeChange = (value: string) => {
    setSelectedQRType(value as QRType);
    setQrData(null);
    setError(null);
  };

  const generateQR = async () => {
    if (!selectedQRType) {
      setError('Please select a QR type before generating.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate QR generation with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate UPI ID based on merchant type and QR type
      const merchantId = activeMerchant === 'main' ? 'mainmerchant' : 'submerchant';
      const timestamp = selectedQRType === 'dynamic' ? `_${Date.now()}` : '';
      const upiId = `${merchantId}${timestamp}@upiuatcnrb`;

      setQrData(upiId);
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
        
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <QrCode className="h-7 w-7 text-primary" />
                QR Management
              </h1>
              <p className="text-muted-foreground">
                Generate and manage QR codes for your merchant accounts
              </p>
            </div>

            {/* Main Content - Left Panel & Right Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel - Selection Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Configure QR Code</CardTitle>
                  <CardDescription>
                    Select merchant type and QR configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Merchant Tabs */}
                  <Tabs value={activeMerchant} onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="main" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Main Merchant
                      </TabsTrigger>
                      <TabsTrigger value="sub" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Sub-Merchant
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="main" className="mt-6">
                      <div className="p-4 bg-muted/50 rounded-lg border">
                        <h3 className="font-semibold text-foreground mb-1">Main Merchant – Bank QR</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate QR code for your primary merchant account
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="sub" className="mt-6">
                      <div className="p-4 bg-muted/50 rounded-lg border">
                        <h3 className="font-semibold text-foreground mb-1">Sub-Merchant – Bank QR</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate QR code for your sub-merchant accounts
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* QR Type Selection */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">QR Type</h3>
                      <p className="text-sm text-muted-foreground mb-4">
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
                          "flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all duration-200",
                          selectedQRType === 'static'
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <RadioGroupItem value="static" id="static" className="sr-only" />
                        <div className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
                          selectedQRType === 'static' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        )}>
                          <Radio className="h-7 w-7" />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">Static QR</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Fixed UPI ID, unlimited uses
                          </p>
                        </div>
                      </Label>

                      {/* Dynamic QR Option */}
                      <Label
                        htmlFor="dynamic"
                        className={cn(
                          "flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all duration-200",
                          selectedQRType === 'dynamic'
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <RadioGroupItem value="dynamic" id="dynamic" className="sr-only" />
                        <div className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
                          selectedQRType === 'dynamic' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        )}>
                          <Zap className="h-7 w-7" />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">Dynamic QR</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Unique per transaction
                          </p>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Generate Button */}
                  <Button
                    onClick={generateQR}
                    disabled={!selectedQRType || isGenerating}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <QrCode className="h-5 w-5 mr-2" />
                        Generate QR
                      </>
                    )}
                  </Button>

                  {/* Info Section */}
                  <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
                    <h4 className="text-sm font-medium text-foreground mb-2">Quick Guide</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• <strong>Static QR:</strong> Same QR for all transactions, customer enters amount</li>
                      <li>• <strong>Dynamic QR:</strong> Unique QR per transaction with preset amount</li>
                      <li>• Download the QR in JPG format for print or digital display</li>
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
                isGenerating={isGenerating}
              />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
