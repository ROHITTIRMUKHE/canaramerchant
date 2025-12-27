import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User, 
  Building2, 
  Phone, 
  MapPin, 
  CreditCard, 
  Shield, 
  Bell, 
  Key, 
  QrCode, 
  Settings, 
  FileText, 
  Users, 
  CheckCircle, 
  Eye, 
  EyeOff,
  Copy,
  RefreshCw,
  LogOut,
  Globe,
  Smartphone,
  Laptop,
  History,
  Download,
  Edit,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for Profile
const merchantProfile = {
  basicInfo: {
    legalName: 'ABC Traders Pvt Ltd',
    tradeName: 'ABC Store',
    mcc: '5411 - Grocery Stores',
    businessType: 'Private Limited',
    onboardingDate: '15-Mar-2023',
    status: 'Active'
  },
  identifiers: {
    merchantId: 'MID123456789',
    pspId: 'PSP-CANARA-001',
    primaryUpiId: 'abcstore@canarabank',
    subMerchantIds: ['abcstore.branch1@canara', 'abcstore.branch2@canara', 'abcstore.branch3@canara']
  },
  contact: {
    email: 'merchant@abcstore.com',
    mobile: '+91 98765 43210',
    alternatePhone: '+91 98765 43211',
    supportEmail: 'support@abcstore.com'
  },
  address: {
    registered: '123, MG Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038',
    country: 'India'
  },
  settlement: {
    bankName: 'Canara Bank',
    accountNumber: 'XXXX XXXX 4567',
    ifsc: 'CNRB0001234',
    accountHolder: 'ABC Traders Pvt Ltd',
    cycle: 'T+1'
  },
  kyc: {
    pan: 'ABCDE****F',
    gstin: '29ABCDE****F1Z5',
    status: 'Verified',
    lastUpdated: '10-Jan-2024'
  }
};

// Sample audit logs
const auditLogs = [
  { id: 1, action: 'Password Changed', category: 'Security', timestamp: '26-Dec-2024 14:32', user: 'merchant@abcstore.com', status: 'Success' },
  { id: 2, action: '2FA Enabled', category: 'Security', timestamp: '25-Dec-2024 10:15', user: 'merchant@abcstore.com', status: 'Success' },
  { id: 3, action: 'Notification Settings Updated', category: 'Settings', timestamp: '24-Dec-2024 16:45', user: 'merchant@abcstore.com', status: 'Success' },
  { id: 4, action: 'API Key Regenerated', category: 'API', timestamp: '23-Dec-2024 09:20', user: 'merchant@abcstore.com', status: 'Success' },
  { id: 5, action: 'Statement Downloaded', category: 'Report', timestamp: '22-Dec-2024 11:30', user: 'merchant@abcstore.com', status: 'Success' },
  { id: 6, action: 'Transaction Limit Updated', category: 'Settings', timestamp: '21-Dec-2024 15:00', user: 'merchant@abcstore.com', status: 'Pending Approval' },
  { id: 7, action: 'Login from New Device', category: 'Security', timestamp: '20-Dec-2024 08:45', user: 'merchant@abcstore.com', status: 'Success' },
  { id: 8, action: 'Webhook URL Updated', category: 'API', timestamp: '19-Dec-2024 13:22', user: 'merchant@abcstore.com', status: 'Success' },
];

// Active sessions data
const activeSessions = [
  { id: 1, device: 'Chrome on Windows', location: 'Bengaluru, India', lastActive: 'Now', current: true },
  { id: 2, device: 'Safari on iPhone', location: 'Bengaluru, India', lastActive: '2 hours ago', current: false },
  { id: 3, device: 'Firefox on MacOS', location: 'Mumbai, India', lastActive: '1 day ago', current: false },
];

// Section tabs mapping
const sectionTabs = [
  { id: 'profile', label: 'Profile Information', icon: User, description: 'Merchant details, contact & KYC' },
  { id: 'bank', label: 'Bank Details', icon: CreditCard, description: 'Settlement account information' },
  { id: 'api', label: 'API & Integration', icon: Key, description: 'API keys, webhooks & IP whitelist' },
  { id: 'security', label: 'Security & Preferences', icon: Shield, description: 'Settings, sessions & audit logs' },
];

export default function ProfileSettings() {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get initial section from URL or default to 'profile'
  const sectionParam = searchParams.get('section') || 'profile';
  const [activeSection, setActiveSection] = useState(sectionParam);
  
  const [showApiKey, setShowApiKey] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<string | null>(null);
  
  // Refs for section highlighting
  const bankRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HTMLDivElement>(null);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  
  // Settings state
  const [settings, setSettings] = useState({
    language: 'english',
    timezone: 'IST',
    dateFormat: 'DD/MM/YYYY',
    defaultView: 'overview',
    twoFactorEnabled: true,
    notifications: {
      transactionSuccess: { email: true, sms: true, inApp: true },
      transactionFailure: { email: true, sms: true, inApp: true },
      settlementCredit: { email: true, sms: false, inApp: true },
      refundUpdates: { email: true, sms: false, inApp: true },
      disputeUpdates: { email: true, sms: true, inApp: true },
    },
    apiEnabled: true,
    apiKey: 'sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    webhookUrl: 'https://api.abcstore.com/webhooks/payments',
    webhookEvents: ['payment_success', 'payment_failure', 'refund'],
    ipWhitelist: '192.168.1.1, 10.0.0.1',
    defaultQrType: 'dynamic',
    autoGenerateQr: true,
    minAmount: 1,
    maxAmount: 100000,
    dailyCap: 500000,
    settlementCycle: 'T+1',
    reportFormat: 'pdf',
    subMerchantEnabled: true,
    subMerchantApproval: true,
    defaultSubMerchantLimit: 50000,
    termsAccepted: true,
    termsVersion: 'v2.1',
    termsDate: '15-Mar-2023',
    dataPrivacyConsent: true,
  });

  // Handle URL changes and highlight section
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && ['profile', 'bank', 'api', 'security'].includes(section)) {
      setActiveSection(section);
      setHighlightedSection(section);
      
      // Clear highlight after animation
      const timer = setTimeout(() => setHighlightedSection(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Update URL when section changes
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSearchParams({ section });
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: "Your preference has been saved.",
    });
  };

  const handleNotificationChange = (type: string, channel: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: {
          ...prev.notifications[type as keyof typeof prev.notifications],
          [channel]: value
        }
      }
    }));
  };

  const handleRegenerateApiKey = () => {
    toast({
      title: "API Key Regenerated",
      description: "Your new API key has been generated. Please update your integrations.",
    });
    setConfirmDialog(null);
  };

  const handleLogoutAllDevices = () => {
    toast({
      title: "Logged Out",
      description: "All other sessions have been terminated.",
    });
    setConfirmDialog(null);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard.`,
    });
  };

  const InfoRow = ({ label, value, masked = false, copyable = false }: { label: string; value: string; masked?: boolean; copyable?: boolean }) => (
    <div className="flex justify-between items-center py-2">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">{value}</span>
        {copyable && (
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => copyToClipboard(value, label)}>
            <Copy className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
      'Active': { variant: 'default', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
      'Verified': { variant: 'default', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
      'Success': { variant: 'default', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
      'Pending': { variant: 'secondary', className: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
      'Pending Approval': { variant: 'secondary', className: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
      'Suspended': { variant: 'destructive', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
      'Rejected': { variant: 'destructive', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
      'Blocked': { variant: 'destructive', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
    };
    const config = variants[status] || { variant: 'outline' as const, className: '' };
    return <Badge variant="outline" className={config.className}>{status}</Badge>;
  };

  // Get section label for breadcrumb
  const currentSectionLabel = sectionTabs.find(s => s.id === activeSection)?.label || 'Profile Information';

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header with Breadcrumb */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>Profile & Settings</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{currentSectionLabel}</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Profile & Settings</h1>
              <p className="text-muted-foreground">Manage your merchant profile and preferences</p>
            </div>

            {/* Section Tabs */}
            <Tabs value={activeSection} onValueChange={handleSectionChange} className="space-y-6">
              <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
                {sectionTabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id} 
                    className="data-[state=active]:bg-background flex items-center gap-2 px-4 py-2"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Profile Information Tab */}
              <TabsContent value="profile" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* Basic Information */}
                  <Card className={highlightedSection === 'profile' ? 'ring-2 ring-primary' : ''}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Merchant Basic Information</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <InfoRow label="Merchant Legal Name" value={merchantProfile.basicInfo.legalName} />
                      <Separator />
                      <InfoRow label="Trade / Display Name" value={merchantProfile.basicInfo.tradeName} />
                      <Separator />
                      <InfoRow label="Merchant Category Code" value={merchantProfile.basicInfo.mcc} />
                      <Separator />
                      <InfoRow label="Business Type" value={merchantProfile.basicInfo.businessType} />
                      <Separator />
                      <InfoRow label="Date of Onboarding" value={merchantProfile.basicInfo.onboardingDate} />
                      <Separator />
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground text-sm">Merchant Status</span>
                        <StatusBadge status={merchantProfile.basicInfo.status} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Merchant Identifiers */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Merchant Identifiers</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <InfoRow label="Merchant ID (MID)" value={merchantProfile.identifiers.merchantId} copyable />
                      <Separator />
                      <InfoRow label="PSP / Aggregator ID" value={merchantProfile.identifiers.pspId} copyable />
                      <Separator />
                      <InfoRow label="Primary Merchant UPI ID" value={merchantProfile.identifiers.primaryUpiId} copyable />
                      <Separator />
                      <div className="py-2">
                        <span className="text-muted-foreground text-sm">Sub-Merchant UPI IDs</span>
                        <div className="mt-2 space-y-1">
                          {merchantProfile.identifiers.subMerchantIds.map((id, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-muted/50 px-3 py-1.5 rounded text-sm">
                              <span>{id}</span>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => copyToClipboard(id, 'UPI ID')}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">Contact Information</CardTitle>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Edit className="h-3 w-3 mr-1" />
                          Request Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <InfoRow label="Registered Email ID" value={merchantProfile.contact.email} />
                      <Separator />
                      <InfoRow label="Registered Mobile Number" value={merchantProfile.contact.mobile} />
                      <Separator />
                      <InfoRow label="Alternate Contact Number" value={merchantProfile.contact.alternatePhone} />
                      <Separator />
                      <InfoRow label="Support Email ID" value={merchantProfile.contact.supportEmail} />
                    </CardContent>
                  </Card>

                  {/* Business Address */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Business Address</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <InfoRow label="Registered Address" value={merchantProfile.address.registered} />
                      <Separator />
                      <InfoRow label="City" value={merchantProfile.address.city} />
                      <Separator />
                      <InfoRow label="State" value={merchantProfile.address.state} />
                      <Separator />
                      <InfoRow label="PIN Code" value={merchantProfile.address.pinCode} />
                      <Separator />
                      <InfoRow label="Country" value={merchantProfile.address.country} />
                    </CardContent>
                  </Card>

                  {/* KYC & Compliance */}
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">KYC & Compliance</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <span className="text-muted-foreground text-sm">PAN</span>
                          <p className="font-medium">{merchantProfile.kyc.pan}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground text-sm">GSTIN</span>
                          <p className="font-medium">{merchantProfile.kyc.gstin}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground text-sm">KYC Status</span>
                          <div><StatusBadge status={merchantProfile.kyc.status} /></div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground text-sm">Last Updated</span>
                          <p className="font-medium">{merchantProfile.kyc.lastUpdated}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Bank Details Tab */}
              <TabsContent value="bank" className="space-y-6">
                <motion.div
                  ref={bankRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`transition-all duration-300 ${highlightedSection === 'bank' ? 'ring-2 ring-primary rounded-lg' : ''}`}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">Settlement Account Details</CardTitle>
                        </div>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <CardDescription>Your settlement bank account where funds will be credited</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground text-sm">Settlement Bank Name</span>
                              <span className="font-medium">{merchantProfile.settlement.bankName}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground text-sm">Account Number</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium font-mono">{merchantProfile.settlement.accountNumber}</span>
                                <Badge variant="secondary" className="text-xs">Masked</Badge>
                              </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground text-sm">IFSC Code</span>
                              <span className="font-medium font-mono">{merchantProfile.settlement.ifsc}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground text-sm">Account Holder Name</span>
                              <span className="font-medium">{merchantProfile.settlement.accountHolder}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground text-sm">Settlement Cycle</span>
                              <Badge className="bg-primary text-primary-foreground">{merchantProfile.settlement.cycle}</Badge>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground text-sm">Next Settlement</span>
                              <span className="font-medium text-primary">Tomorrow, 10:00 AM</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground text-sm">Pending Amount</span>
                              <span className="font-bold text-lg">₹45,250.00</span>
                            </div>
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            Request Settlement Account Change
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* API & Integration Tab */}
              <TabsContent value="api" className="space-y-6">
                <motion.div
                  ref={apiRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`space-y-6 ${highlightedSection === 'api' ? 'ring-2 ring-primary rounded-lg p-4' : ''}`}
                >
                  {/* API Status Card */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Key className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">API Access</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">API Status</span>
                          <Switch 
                            checked={settings.apiEnabled} 
                            onCheckedChange={(v) => handleSettingChange('apiEnabled', v)} 
                          />
                        </div>
                      </div>
                      <CardDescription>Manage your API credentials and integration settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* API Key Section */}
                      <div className="space-y-3">
                        <Label className="text-base font-medium">API Key</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type={showApiKey ? 'text' : 'password'} 
                            value={settings.apiKey} 
                            readOnly 
                            className="font-mono text-sm flex-1"
                          />
                          <Button variant="ghost" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => copyToClipboard(settings.apiKey, 'API Key')}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <Dialog open={confirmDialog === 'regenerate'} onOpenChange={(o) => setConfirmDialog(o ? 'regenerate' : null)}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Regenerate API Key
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Regenerate API Key?</DialogTitle>
                              <DialogDescription>
                                This will invalidate your current API key. All existing integrations using this key will stop working.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setConfirmDialog(null)}>Cancel</Button>
                              <Button variant="destructive" onClick={handleRegenerateApiKey}>Regenerate</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <Separator />

                      {/* Webhook Configuration */}
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Webhook URL</Label>
                        <Input 
                          value={settings.webhookUrl} 
                          onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
                          placeholder="https://your-domain.com/webhooks"
                        />
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Webhook Events</Label>
                          <div className="flex flex-wrap gap-2">
                            {['Payment Success', 'Payment Failure', 'Refund', 'Settlement', 'Dispute'].map((event) => (
                              <Badge key={event} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">{event}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* IP Whitelist */}
                      <div className="space-y-3">
                        <Label className="text-base font-medium">IP Whitelist</Label>
                        <Input 
                          value={settings.ipWhitelist} 
                          onChange={(e) => handleSettingChange('ipWhitelist', e.target.value)}
                          placeholder="Comma-separated IP addresses"
                        />
                        <p className="text-xs text-muted-foreground">Leave empty to allow all IPs. For security, we recommend whitelisting specific IPs.</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Security & Preferences Tab */}
              <TabsContent value="security" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* Account Preferences */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Account Preferences</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Preferred Language</Label>
                        <Select value={settings.language} onValueChange={(v) => handleSettingChange('language', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                            <SelectItem value="kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                            <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Time Zone</Label>
                        <Select value={settings.timezone} onValueChange={(v) => handleSettingChange('timezone', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date & Time Format</Label>
                        <Select value={settings.dateFormat} onValueChange={(v) => handleSettingChange('dateFormat', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Settings */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Security Settings</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Key className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication (2FA)</Label>
                          <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Switch 
                          checked={settings.twoFactorEnabled} 
                          onCheckedChange={(v) => handleSettingChange('twoFactorEnabled', v)} 
                        />
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Active Sessions ({activeSessions.length})</Label>
                          <Dialog open={confirmDialog === 'logout'} onOpenChange={(o) => setConfirmDialog(o ? 'logout' : null)}>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <LogOut className="h-3 w-3 mr-1" />
                                Logout All
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Logout from All Devices?</DialogTitle>
                                <DialogDescription>
                                  This will terminate all active sessions except the current one.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setConfirmDialog(null)}>Cancel</Button>
                                <Button variant="destructive" onClick={handleLogoutAllDevices}>Logout All</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <div className="space-y-2 mt-2">
                          {activeSessions.map((session) => (
                            <div key={session.id} className="flex items-center justify-between bg-muted/50 p-2 rounded text-sm">
                              <div className="flex items-center gap-2">
                                {session.device.includes('iPhone') ? <Smartphone className="h-4 w-4" /> : <Laptop className="h-4 w-4" />}
                                <div>
                                  <p className="font-medium">{session.device}</p>
                                  <p className="text-xs text-muted-foreground">{session.location}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">{session.lastActive}</p>
                                {session.current && <Badge variant="outline" className="text-xs">Current</Badge>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notification Settings */}
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Notification Settings</CardTitle>
                      </div>
                      <CardDescription>Choose how you want to be notified</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 font-medium">Event Type</th>
                              <th className="text-center py-2 font-medium">Email</th>
                              <th className="text-center py-2 font-medium">SMS</th>
                              <th className="text-center py-2 font-medium">In-App</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { key: 'transactionSuccess', label: 'Transaction Success' },
                              { key: 'transactionFailure', label: 'Transaction Failure' },
                              { key: 'settlementCredit', label: 'Settlement Credit' },
                              { key: 'refundUpdates', label: 'Refund Updates' },
                              { key: 'disputeUpdates', label: 'Dispute Updates' },
                            ].map((item) => (
                              <tr key={item.key} className="border-b">
                                <td className="py-3">{item.label}</td>
                                <td className="text-center py-3">
                                  <Switch 
                                    checked={settings.notifications[item.key as keyof typeof settings.notifications].email}
                                    onCheckedChange={(v) => handleNotificationChange(item.key, 'email', v)}
                                  />
                                </td>
                                <td className="text-center py-3">
                                  <Switch 
                                    checked={settings.notifications[item.key as keyof typeof settings.notifications].sms}
                                    onCheckedChange={(v) => handleNotificationChange(item.key, 'sms', v)}
                                  />
                                </td>
                                <td className="text-center py-3">
                                  <Switch 
                                    checked={settings.notifications[item.key as keyof typeof settings.notifications].inApp}
                                    onCheckedChange={(v) => handleNotificationChange(item.key, 'inApp', v)}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Audit Logs */}
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <History className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">Activity & Audit Logs</CardTitle>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export Logs
                        </Button>
                      </div>
                      <CardDescription>Track all profile updates, settings changes, and security events</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="text-left py-3 px-4 font-medium text-sm">Timestamp</th>
                              <th className="text-left py-3 px-4 font-medium text-sm">Action</th>
                              <th className="text-left py-3 px-4 font-medium text-sm">Category</th>
                              <th className="text-left py-3 px-4 font-medium text-sm">User</th>
                              <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {auditLogs.map((log) => (
                              <tr key={log.id} className="border-b hover:bg-muted/30 transition-colors">
                                <td className="py-3 px-4 text-sm text-muted-foreground">{log.timestamp}</td>
                                <td className="py-3 px-4 text-sm font-medium">{log.action}</td>
                                <td className="py-3 px-4">
                                  <Badge variant="outline" className="text-xs">{log.category}</Badge>
                                </td>
                                <td className="py-3 px-4 text-sm">{log.user}</td>
                                <td className="py-3 px-4">
                                  <StatusBadge status={log.status} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
