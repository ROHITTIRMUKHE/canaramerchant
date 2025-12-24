import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Download, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import canaraLogo from '@/assets/canara-bank-logo.png';

interface QRDisplayProps {
  qrData: string | null;
  merchantName: string;
  merchantType: 'main' | 'sub';
  qrType: 'static' | 'dynamic' | null;
  isGenerating: boolean;
}

export default function QRDisplay({ 
  qrData, 
  merchantName, 
  merchantType, 
  qrType,
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
        title: "QR Downloaded",
        description: "QR code has been saved successfully.",
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          QR Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[500px]">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-muted-foreground">Generating QR Code...</p>
          </div>
        ) : qrData ? (
          <div className="flex flex-col items-center gap-6">
            {/* QR Code Container */}
            <div 
              ref={qrRef}
              className="bg-white p-6 rounded-lg shadow-lg border-4 border-primary/20"
              style={{ width: '320px' }}
            >
              {/* Bank Header */}
              <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b-2 border-orange-500">
                <img 
                  src={canaraLogo} 
                  alt="Canara Bank" 
                  className="h-12 object-contain"
                />
              </div>

              {/* Scan & Pay Title */}
              <p className="text-center font-bold text-gray-800 mb-4">SCAN & PAY</p>

              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <QRCodeSVG
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin={false}
                  className="border-2 border-gray-200 p-2 rounded"
                />
              </div>

              {/* UPI ID */}
              <p className="text-center text-sm text-gray-700 mb-4">
                <span className="font-semibold">UPI ID: </span>
                {qrData}
              </p>

              {/* BHIM UPI Logo Placeholder */}
              <div className="flex items-center justify-center gap-4 py-3 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-8 bg-gradient-to-r from-green-600 to-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">BHIM</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-8 bg-gradient-to-r from-orange-500 to-green-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">UPI</span>
                  </div>
                </div>
              </div>

              {/* Digital Rupee Footer */}
              <div className="mt-4 pt-3 border-t-2 border-green-500">
                <p className="text-center text-xs font-semibold text-green-600">
                  ₹ DIGITAL RUPEE ACCEPTED HERE
                </p>
              </div>
            </div>

            {/* QR Info */}
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Merchant:</span> {merchantName}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Type:</span> {qrType === 'static' ? 'Static QR' : 'Dynamic QR'}
              </p>
            </div>

            {/* Download Button */}
            <Button 
              onClick={handleDownload}
              className="w-full max-w-xs"
              size="lg"
            >
              <Download className="h-5 w-5 mr-2" />
              Download QR (JPG)
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-48 h-48 border-2 border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center">
              <QrCode className="h-16 w-16 text-muted-foreground/30" />
            </div>
            <p className="text-muted-foreground">
              Select QR type and click "Generate QR" to preview
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
