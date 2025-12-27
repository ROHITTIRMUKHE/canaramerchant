import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Settings,
  CheckCircle,
  XCircle,
  Loader2,
  Send,
  Shield,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateSubMerchantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (merchant: any, auditLog: any) => void;
  existingVpas: string[];
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export default function CreateSubMerchantDialog({
  open,
  onOpenChange,
  onSuccess,
  existingVpas
}: CreateSubMerchantDialogProps) {
  // Form State
  const [formData, setFormData] = useState({
    entityName: '',
    displayName: '',
    mobile: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    vpa: '',
    enableDashboardAccess: false,
    permissions: {
      viewTransactions: false,
      viewSettlements: false,
      downloadReports: false,
      raiseDisputes: false,
      initiateRefunds: false
    }
  });

  // OTP States
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);
  const [mobileVerifying, setMobileVerifying] = useState(false);
  const [mobileSending, setMobileSending] = useState(false);

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  // VPA State
  const [vpaChecking, setVpaChecking] = useState(false);
  const [vpaAvailable, setVpaAvailable] = useState<boolean | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createdMerchant, setCreatedMerchant] = useState<any>(null);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setFormData({
      entityName: '',
      displayName: '',
      mobile: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      vpa: '',
      enableDashboardAccess: false,
      permissions: {
        viewTransactions: false,
        viewSettlements: false,
        downloadReports: false,
        raiseDisputes: false,
        initiateRefunds: false
      }
    });
    setMobileOtpSent(false);
    setMobileOtp('');
    setMobileVerified(false);
    setEmailOtpSent(false);
    setEmailOtp('');
    setEmailVerified(false);
    setVpaAvailable(null);
    setErrors({});
    setShowSuccess(false);
    setShowError(false);
    setCreatedMerchant(null);
  };

  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateVpa = (vpa: string) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(vpa);
  };

  const handleSendMobileOtp = async () => {
    if (!validateMobile(formData.mobile)) {
      setErrors(prev => ({ ...prev, mobile: 'Please enter a valid 10-digit mobile number' }));
      return;
    }
    setErrors(prev => ({ ...prev, mobile: '' }));
    setMobileSending(true);
    
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setMobileSending(false);
    setMobileOtpSent(true);
  };

  const handleVerifyMobileOtp = async () => {
    if (mobileOtp.length !== 6) {
      setErrors(prev => ({ ...prev, mobileOtp: 'Please enter 6-digit OTP' }));
      return;
    }
    setErrors(prev => ({ ...prev, mobileOtp: '' }));
    setMobileVerifying(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setMobileVerifying(false);
    setMobileVerified(true);
  };

  const handleSendEmailOtp = async () => {
    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    setEmailSending(true);
    
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEmailSending(false);
    setEmailOtpSent(true);
  };

  const handleVerifyEmailOtp = async () => {
    if (emailOtp.length !== 6) {
      setErrors(prev => ({ ...prev, emailOtp: 'Please enter 6-digit OTP' }));
      return;
    }
    setErrors(prev => ({ ...prev, emailOtp: '' }));
    setEmailVerifying(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEmailVerifying(false);
    setEmailVerified(true);
  };

  const handleVpaChange = async (vpa: string) => {
    setFormData(prev => ({ ...prev, vpa }));
    setVpaAvailable(null);
    
    if (!vpa) return;
    
    if (!validateVpa(vpa)) {
      setErrors(prev => ({ ...prev, vpa: 'Invalid VPA format. Use format: yourname@canara' }));
      return;
    }
    
    setErrors(prev => ({ ...prev, vpa: '' }));
    setVpaChecking(true);
    
    // Simulate VPA uniqueness check
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isAvailable = !existingVpas.includes(vpa.toLowerCase());
    setVpaAvailable(isAvailable);
    setVpaChecking(false);
    
    if (!isAvailable) {
      setErrors(prev => ({ ...prev, vpa: 'This VPA is already in use' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.entityName.trim()) {
      newErrors.entityName = 'Entity name is required';
    }

    if (!mobileVerified) {
      newErrors.mobile = 'Mobile number must be verified';
    }

    if (!emailVerified) {
      newErrors.email = 'Email must be verified';
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Valid 6-digit PIN code is required';
    }

    if (!formData.vpa.trim()) {
      newErrors.vpa = 'VPA is required';
    } else if (!vpaAvailable) {
      newErrors.vpa = 'VPA must be valid and available';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Show first error
      const firstError = Object.values(errors)[0];
      setErrorMessage(firstError || 'Please fill all required fields correctly');
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const now = new Date();
    const merchantId = `SM${String(Math.floor(Math.random() * 900) + 100)}`;
    
    const newMerchant = {
      id: merchantId,
      name: formData.entityName,
      tradeName: formData.displayName || formData.entityName,
      mobile: formData.mobile,
      email: formData.email,
      vpa: formData.vpa,
      status: 'Active',
      createdDate: now.toISOString().split('T')[0],
      createdTime: now.toLocaleTimeString('en-IN', { hour12: false }),
      lastActive: now.toISOString().split('T')[0],
      dailyLimit: 0,
      monthlyLimit: 0,
      address: formData.addressLine1 + (formData.addressLine2 ? ', ' + formData.addressLine2 : ''),
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      country: formData.country,
      dashboardAccess: formData.enableDashboardAccess,
      permissions: formData.permissions,
      totalTransactions: 0,
      totalVolume: 0
    };

    const auditLog = {
      id: `AUD${String(Math.floor(Math.random() * 9000) + 1000)}`,
      subMerchantName: newMerchant.name,
      subMerchantId: newMerchant.id,
      mobile: newMerchant.mobile,
      vpa: newMerchant.vpa,
      action: 'Created',
      description: 'Sub-merchant account created with verified mobile and email',
      performedBy: 'MM001',
      timestamp: now.toLocaleString('en-IN', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
      }).replace(/\//g, '-'),
      status: 'Success'
    };

    setIsSubmitting(false);
    setCreatedMerchant(newMerchant);
    setShowSuccess(true);
    
    onSuccess(newMerchant, auditLog);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!isSubmitting && !showSuccess) {
        onOpenChange(val);
      }
    }}>
      <DialogContent className="max-w-[75vw] w-[75vw] max-h-[90vh] p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8"
            >
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle className="h-10 w-10 text-emerald-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Sub-Merchant Created Successfully</h2>
                <p className="text-muted-foreground mb-8">The sub-merchant account has been set up and is ready to use</p>
                
                <div className="bg-muted/50 rounded-xl p-6 w-full max-w-md mb-8">
                  <div className="space-y-4 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sub-Merchant ID</span>
                      <span className="font-mono font-semibold text-primary">{createdMerchant?.id}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Entity Name</span>
                      <span className="font-medium">{createdMerchant?.name}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">VPA</span>
                      <span className="font-mono">{createdMerchant?.vpa}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Created On</span>
                      <span>{createdMerchant?.createdDate} {createdMerchant?.createdTime}</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleCloseSuccess} size="lg" className="min-w-[200px]">
                  Close
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-xl">Add New Sub-Merchant</DialogTitle>
                <DialogDescription>
                  Create a new sub-merchant under your main merchant account. All fields marked with * are mandatory.
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
                <div className="py-6 space-y-8">
                  {/* Section 1: Entity Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Building2 className="h-5 w-5" />
                      <h3 className="font-semibold text-lg">Entity Details</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pl-7">
                      <div className="space-y-2">
                        <Label>Entity Name *</Label>
                        <Input
                          placeholder="e.g., ABC Retail Outlet"
                          value={formData.entityName}
                          onChange={(e) => setFormData(prev => ({ ...prev, entityName: e.target.value }))}
                          className={errors.entityName ? 'border-destructive' : ''}
                        />
                        {errors.entityName && (
                          <p className="text-xs text-destructive">{errors.entityName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Business / Display Name (Optional)</Label>
                        <Input
                          placeholder="e.g., ABC Store"
                          value={formData.displayName}
                          onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Section 2: Contact & Verification */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Phone className="h-5 w-5" />
                      <h3 className="font-semibold text-lg">Contact & Verification</h3>
                    </div>
                    
                    {/* Mobile Number */}
                    <div className="pl-7 space-y-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          Mobile Number *
                          {mobileVerified && (
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </Label>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <Input
                              placeholder="Enter 10-digit mobile number"
                              value={formData.mobile}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setFormData(prev => ({ ...prev, mobile: val }));
                                if (mobileOtpSent) {
                                  setMobileOtpSent(false);
                                  setMobileVerified(false);
                                  setMobileOtp('');
                                }
                              }}
                              disabled={mobileVerified}
                              className={errors.mobile ? 'border-destructive' : ''}
                            />
                          </div>
                          {!mobileVerified && (
                            <Button
                              variant="outline"
                              onClick={handleSendMobileOtp}
                              disabled={!formData.mobile || formData.mobile.length !== 10 || mobileSending}
                              className="min-w-[120px]"
                            >
                              {mobileSending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : mobileOtpSent ? (
                                'Resend OTP'
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send OTP
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                        {errors.mobile && !mobileVerified && (
                          <p className="text-xs text-destructive">{errors.mobile}</p>
                        )}
                      </div>

                      {/* Mobile OTP Input */}
                      <AnimatePresence>
                        {mobileOtpSent && !mobileVerified && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                          >
                            <Label>Enter OTP sent to +91 {formData.mobile}</Label>
                            <div className="flex gap-3">
                              <Input
                                placeholder="Enter 6-digit OTP"
                                value={mobileOtp}
                                onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className={`max-w-[200px] ${errors.mobileOtp ? 'border-destructive' : ''}`}
                              />
                              <Button
                                onClick={handleVerifyMobileOtp}
                                disabled={mobileOtp.length !== 6 || mobileVerifying}
                              >
                                {mobileVerifying ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  'Verify OTP'
                                )}
                              </Button>
                            </div>
                            {errors.mobileOtp && (
                              <p className="text-xs text-destructive">{errors.mobileOtp}</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <Separator className="my-4" />

                    {/* Email Address */}
                    <div className="pl-7 space-y-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address *
                          {emailVerified && (
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </Label>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <Input
                              type="email"
                              placeholder="Enter email address"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData(prev => ({ ...prev, email: e.target.value }));
                                if (emailOtpSent) {
                                  setEmailOtpSent(false);
                                  setEmailVerified(false);
                                  setEmailOtp('');
                                }
                              }}
                              disabled={emailVerified}
                              className={errors.email ? 'border-destructive' : ''}
                            />
                          </div>
                          {!emailVerified && (
                            <Button
                              variant="outline"
                              onClick={handleSendEmailOtp}
                              disabled={!formData.email || !validateEmail(formData.email) || emailSending}
                              className="min-w-[120px]"
                            >
                              {emailSending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : emailOtpSent ? (
                                'Resend OTP'
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send OTP
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                        {errors.email && !emailVerified && (
                          <p className="text-xs text-destructive">{errors.email}</p>
                        )}
                      </div>

                      {/* Email OTP Input */}
                      <AnimatePresence>
                        {emailOtpSent && !emailVerified && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                          >
                            <Label>Enter OTP sent to {formData.email}</Label>
                            <div className="flex gap-3">
                              <Input
                                placeholder="Enter 6-digit OTP"
                                value={emailOtp}
                                onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className={`max-w-[200px] ${errors.emailOtp ? 'border-destructive' : ''}`}
                              />
                              <Button
                                onClick={handleVerifyEmailOtp}
                                disabled={emailOtp.length !== 6 || emailVerifying}
                              >
                                {emailVerifying ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  'Verify OTP'
                                )}
                              </Button>
                            </div>
                            {errors.emailOtp && (
                              <p className="text-xs text-destructive">{errors.emailOtp}</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <Separator />

                  {/* Section 3: Address Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <MapPin className="h-5 w-5" />
                      <h3 className="font-semibold text-lg">Address Details</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pl-7">
                      <div className="space-y-2 col-span-2">
                        <Label>Address Line 1 *</Label>
                        <Input
                          placeholder="Street address, building name"
                          value={formData.addressLine1}
                          onChange={(e) => setFormData(prev => ({ ...prev, addressLine1: e.target.value }))}
                          className={errors.addressLine1 ? 'border-destructive' : ''}
                        />
                        {errors.addressLine1 && (
                          <p className="text-xs text-destructive">{errors.addressLine1}</p>
                        )}
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label>Address Line 2 (Optional)</Label>
                        <Input
                          placeholder="Apartment, suite, unit, etc."
                          value={formData.addressLine2}
                          onChange={(e) => setFormData(prev => ({ ...prev, addressLine2: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>City *</Label>
                        <Input
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className={errors.city ? 'border-destructive' : ''}
                        />
                        {errors.city && (
                          <p className="text-xs text-destructive">{errors.city}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>State *</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(val) => setFormData(prev => ({ ...prev, state: val }))}
                        >
                          <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && (
                          <p className="text-xs text-destructive">{errors.state}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>PIN Code *</Label>
                        <Input
                          placeholder="6-digit PIN"
                          value={formData.pincode}
                          onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                          className={errors.pincode ? 'border-destructive' : ''}
                        />
                        {errors.pincode && (
                          <p className="text-xs text-destructive">{errors.pincode}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Input
                          value={formData.country}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Section 4: Payment Identity */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <CreditCard className="h-5 w-5" />
                      <h3 className="font-semibold text-lg">Payment Identity</h3>
                    </div>
                    <div className="pl-7 space-y-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          Sub-Merchant VPA *
                          {vpaChecking && (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          )}
                          {vpaAvailable === true && (
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Available
                            </Badge>
                          )}
                          {vpaAvailable === false && (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
                              <XCircle className="h-3 w-3" />
                              Unavailable
                            </Badge>
                          )}
                        </Label>
                        <Input
                          placeholder="e.g., abcstore@canara"
                          value={formData.vpa}
                          onChange={(e) => handleVpaChange(e.target.value.toLowerCase())}
                          className={errors.vpa ? 'border-destructive' : ''}
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter a unique VPA in format: yourname@canara
                        </p>
                        {errors.vpa && (
                          <p className="text-xs text-destructive">{errors.vpa}</p>
                        )}
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Main Merchant Reference:</span>
                          <span className="font-mono font-medium">MM001 (Canara Bank Main Merchant)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Section 5: Access Configuration */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Settings className="h-5 w-5" />
                      <h3 className="font-semibold text-lg">Access Configuration</h3>
                    </div>
                    <div className="pl-7 space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Enable Dashboard Access</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow sub-merchant to access their own dashboard
                          </p>
                        </div>
                        <Switch
                          checked={formData.enableDashboardAccess}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enableDashboardAccess: checked }))}
                        />
                      </div>

                      <AnimatePresence>
                        {formData.enableDashboardAccess && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 bg-muted/30 rounded-lg p-4"
                          >
                            <Label className="text-sm font-medium">Permissions</Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="viewTransactions"
                                  checked={formData.permissions.viewTransactions}
                                  onCheckedChange={(checked) => setFormData(prev => ({
                                    ...prev,
                                    permissions: { ...prev.permissions, viewTransactions: !!checked }
                                  }))}
                                />
                                <Label htmlFor="viewTransactions" className="text-sm font-normal cursor-pointer">
                                  View Transactions
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="viewSettlements"
                                  checked={formData.permissions.viewSettlements}
                                  onCheckedChange={(checked) => setFormData(prev => ({
                                    ...prev,
                                    permissions: { ...prev.permissions, viewSettlements: !!checked }
                                  }))}
                                />
                                <Label htmlFor="viewSettlements" className="text-sm font-normal cursor-pointer">
                                  View Settlements
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="downloadReports"
                                  checked={formData.permissions.downloadReports}
                                  onCheckedChange={(checked) => setFormData(prev => ({
                                    ...prev,
                                    permissions: { ...prev.permissions, downloadReports: !!checked }
                                  }))}
                                />
                                <Label htmlFor="downloadReports" className="text-sm font-normal cursor-pointer">
                                  Download Reports
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="raiseDisputes"
                                  checked={formData.permissions.raiseDisputes}
                                  onCheckedChange={(checked) => setFormData(prev => ({
                                    ...prev,
                                    permissions: { ...prev.permissions, raiseDisputes: !!checked }
                                  }))}
                                />
                                <Label htmlFor="raiseDisputes" className="text-sm font-normal cursor-pointer">
                                  Raise Disputes
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="initiateRefunds"
                                  checked={formData.permissions.initiateRefunds}
                                  onCheckedChange={(checked) => setFormData(prev => ({
                                    ...prev,
                                    permissions: { ...prev.permissions, initiateRefunds: !!checked }
                                  }))}
                                />
                                <Label htmlFor="initiateRefunds" className="text-sm font-normal cursor-pointer">
                                  Initiate Refunds
                                </Label>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t bg-muted/30">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="min-w-[180px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Sub-Merchant'
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Dialog */}
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background border rounded-xl p-6 shadow-xl max-w-md w-full mx-4"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Validation Error</h3>
                  <p className="text-muted-foreground mb-6">{errorMessage}</p>
                  <Button onClick={() => setShowError(false)}>
                    Try Again
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
