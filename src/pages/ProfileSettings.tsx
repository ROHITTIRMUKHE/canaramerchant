import { useState } from 'react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Shield, 
  Bell, 
  Key, 
  QrCode, 
  Settings, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Copy,
  RefreshCw,
  LogOut,
  Globe,
  Calendar,
  Smartphone,
  Laptop,
  History,
  Download,
  Edit,
  Lock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

export default function ProfileSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<string | null>(null);
  
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

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold text-foreground">Profile & Settings</h1>
              <p className="text-muted-foreground">Manage your merchant profile and preferences</p>
            </div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="profile" className="data-[state=active]:bg-background">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-background">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="audit" className="data-[state=active]:bg-background">
                  <History className="h-4 w-4 mr-2" />
                  Audit Logs
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <Card>
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

                  {/* Settlement Account Details */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Settlement Account Details</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <InfoRow label="Bank Name" value={merchantProfile.settlement.bankName} />
                      <Separator />
                      <InfoRow label="Account Number" value={merchantProfile.settlement.accountNumber} masked />
                      <Separator />
                      <InfoRow label="IFSC Code" value={merchantProfile.settlement.ifsc} />
                      <Separator />
                      <InfoRow label="Account Holder Name" value={merchantProfile.settlement.accountHolder} />
                      <Separator />
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground text-sm">Settlement Cycle</span>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{merchantProfile.settlement.cycle}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* KYC & Compliance */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">KYC & Compliance</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <InfoRow label="PAN" value={merchantProfile.kyc.pan} masked />
                      <Separator />
                      <InfoRow label="GSTIN" value={merchantProfile.kyc.gstin} masked />
                      <Separator />
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground text-sm">KYC Status</span>
                        <StatusBadge status={merchantProfile.kyc.status} />
                      </div>
                      <Separator />
                      <InfoRow label="Last KYC Updated" value={merchantProfile.kyc.lastUpdated} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <div className="space-y-2">
                        <Label>Default Dashboard View</Label>
                        <Select value={settings.defaultView} onValueChange={(v) => handleSettingChange('defaultView', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="overview">Overview</SelectItem>
                            <SelectItem value="transactions">Transactions</SelectItem>
                            <SelectItem value="settlements">Settlements</SelectItem>
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
                        <Label>Last Login</Label>
                        <p className="text-sm text-muted-foreground">26-Dec-2024 14:32 from Bengaluru, India</p>
                      </div>
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
                                  This will terminate all active sessions except the current one. You'll need to log in again on other devices.
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
                              <th className="text-center py-2 font-medium">
                                <div className="flex items-center justify-center gap-1">
                                  <Mail className="h-4 w-4" /> Email
                                </div>
                              </th>
                              <th className="text-center py-2 font-medium">
                                <div className="flex items-center justify-center gap-1">
                                  <Smartphone className="h-4 w-4" /> SMS
                                </div>
                              </th>
                              <th className="text-center py-2 font-medium">
                                <div className="flex items-center justify-center gap-1">
                                  <Bell className="h-4 w-4" /> In-App
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { key: 'transactionSuccess', label: 'Transaction Success' },
                              { key: 'transactionFailure', label: 'Transaction Failure' },
                              { key: 'settlementCredit', label: 'Settlement Credit' },
                              { key: 'refundUpdates', label: 'Refund Updates' },
                              { key: 'disputeUpdates', label: 'Dispute / Complaint Updates' },
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

                  {/* API & Integration Settings */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">API & Integration Settings</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                          <Label>API Access</Label>
                          <p className="text-xs text-muted-foreground">Enable API access for integrations</p>
                        </div>
                        <Switch 
                          checked={settings.apiEnabled} 
                          onCheckedChange={(v) => handleSettingChange('apiEnabled', v)} 
                        />
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>API Key</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type={showApiKey ? 'text' : 'password'} 
                            value={settings.apiKey} 
                            readOnly 
                            className="font-mono text-sm"
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
                            <Button variant="outline" size="sm" className="mt-2">
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
                      <div className="space-y-2">
                        <Label>Webhook URL</Label>
                        <Input 
                          value={settings.webhookUrl} 
                          onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
                          placeholder="https://your-domain.com/webhooks"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Webhook Events</Label>
                        <div className="flex flex-wrap gap-2">
                          {['Payment Success', 'Payment Failure', 'Refund', 'Settlement'].map((event) => (
                            <Badge key={event} variant="secondary" className="cursor-pointer">{event}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>IP Whitelist</Label>
                        <Input 
                          value={settings.ipWhitelist} 
                          onChange={(e) => handleSettingChange('ipWhitelist', e.target.value)}
                          placeholder="Comma-separated IP addresses"
                        />
                        <p className="text-xs text-muted-foreground">Leave empty to allow all IPs</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* QR & Payment Settings */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <QrCode className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">QR & Payment Settings</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Default QR Type</Label>
                        <Select value={settings.defaultQrType} onValueChange={(v) => handleSettingChange('defaultQrType', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="static">Static QR</SelectItem>
                            <SelectItem value="dynamic">Dynamic QR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                          <Label>Auto-generate QR for Sub-Merchants</Label>
                          <p className="text-xs text-muted-foreground">Automatically create QR codes for new sub-merchants</p>
                        </div>
                        <Switch 
                          checked={settings.autoGenerateQr} 
                          onCheckedChange={(v) => handleSettingChange('autoGenerateQr', v)} 
                        />
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Min Amount (₹)</Label>
                          <Input 
                            type="number" 
                            value={settings.minAmount}
                            onChange={(e) => handleSettingChange('minAmount', Number(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Max Amount (₹)</Label>
                          <Input 
                            type="number" 
                            value={settings.maxAmount}
                            onChange={(e) => handleSettingChange('maxAmount', Number(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Daily Cap (₹)</Label>
                          <Input 
                            type="number" 
                            value={settings.dailyCap}
                            onChange={(e) => handleSettingChange('dailyCap', Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Settlement Preferences */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Settlement Preferences</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Settlement Cycle</Label>
                        <Select value={settings.settlementCycle} onValueChange={(v) => handleSettingChange('settlementCycle', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="T+0">T+0 (Same Day)</SelectItem>
                            <SelectItem value="T+1">T+1 (Next Day)</SelectItem>
                            <SelectItem value="T+2">T+2 (Two Days)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" className="w-full justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Request Settlement Account Change
                      </Button>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Statement / Report Format</Label>
                        <Select value={settings.reportFormat} onValueChange={(v) => handleSettingChange('reportFormat', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sub-Merchant Settings */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Sub-Merchant Settings</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                          <Label>Enable Sub-Merchant Creation</Label>
                          <p className="text-xs text-muted-foreground">Allow creating sub-merchants under this account</p>
                        </div>
                        <Switch 
                          checked={settings.subMerchantEnabled} 
                          onCheckedChange={(v) => handleSettingChange('subMerchantEnabled', v)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Default Limit for Sub-Merchants (₹)</Label>
                        <Input 
                          type="number" 
                          value={settings.defaultSubMerchantLimit}
                          onChange={(e) => handleSettingChange('defaultSubMerchantLimit', Number(e.target.value))}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                          <Label>Sub-Merchant Approval Workflow</Label>
                          <p className="text-xs text-muted-foreground">Require approval for new sub-merchants</p>
                        </div>
                        <Switch 
                          checked={settings.subMerchantApproval} 
                          onCheckedChange={(v) => handleSettingChange('subMerchantApproval', v)} 
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Compliance & Consent */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Compliance & Consent</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label>Terms & Conditions</Label>
                          <p className="text-xs text-muted-foreground">Version {settings.termsVersion} • Accepted on {settings.termsDate}</p>
                        </div>
                        <StatusBadge status={settings.termsAccepted ? 'Verified' : 'Pending'} />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                          <Label>Data Privacy Consent</Label>
                          <p className="text-xs text-muted-foreground">Allow processing of transaction data</p>
                        </div>
                        <Switch 
                          checked={settings.dataPrivacyConsent} 
                          onCheckedChange={(v) => handleSettingChange('dataPrivacyConsent', v)} 
                        />
                      </div>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        View Terms & Conditions →
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Audit Logs Tab */}
              <TabsContent value="audit" className="space-y-6">
                <Card>
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
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
