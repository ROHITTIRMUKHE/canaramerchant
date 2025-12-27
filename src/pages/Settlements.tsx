import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, subDays, isAfter, startOfDay, endOfDay } from 'date-fns';
import {
  Search,
  Calendar,
  Filter,
  Download,
  RotateCcw,
  ChevronDown,
  Eye,
  IndianRupee,
  FileText,
  Wallet,
  Users,
  TrendingUp,
  Building2,
  ClipboardList,
  History,
  FileSpreadsheet,
  FileDown,
  Check,
  X,
  Info,
  ChevronRight,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

// Types
interface SubMerchant {
  id: string;
  name: string;
  displayName: string;
  vpa: string;
  mobile: string;
  email: string;
  status: 'active' | 'suspended' | 'revoked';
}

interface SettlementRecord {
  id: string;
  date: Date;
  subMerchantId: string;
  subMerchantName: string;
  subMerchantVpa: string;
  transactionCount: number;
  totalAmount: number;
  settlementStatus: 'settled' | 'pending' | 'processing';
  utr: string;
}

interface Transaction {
  id: string;
  dateTime: Date;
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILURE';
  payerVpa: string;
  payerName: string;
  rrn: string;
  subMerchantId: string;
}

interface AuditLog {
  id: string;
  action: string;
  merchantId: string;
  merchantVpa: string;
  subMerchantId?: string;
  subMerchantVpa?: string;
  details: string;
  performedBy: string;
  timestamp: Date;
}

// Sample Sub-Merchants
const sampleSubMerchants: SubMerchant[] = [
  { id: 'SM001', name: 'ABC Retail Outlet', displayName: 'ABC Retail', vpa: 'abcretail@canara', mobile: '9876543210', email: 'abc@retail.com', status: 'active' },
  { id: 'SM002', name: 'XYZ Electronics', displayName: 'XYZ Store', vpa: 'xyzelectronics@canara', mobile: '9876543211', email: 'xyz@electronics.com', status: 'active' },
  { id: 'SM003', name: 'City Grocery Mart', displayName: 'City Grocery', vpa: 'citygrocery@canara', mobile: '9876543212', email: 'city@grocery.com', status: 'active' },
  { id: 'SM004', name: 'Fresh Food Hub', displayName: 'Fresh Foods', vpa: 'freshfood@canara', mobile: '9876543213', email: 'fresh@food.com', status: 'suspended' },
  { id: 'SM005', name: 'Quick Pharmacy', displayName: 'Quick Pharma', vpa: 'quickpharma@canara', mobile: '9876543214', email: 'quick@pharmacy.com', status: 'active' },
];

// Sample Settlement Data
const generateSettlementData = (): SettlementRecord[] => {
  const records: SettlementRecord[] = [];
  const statuses: ('settled' | 'pending' | 'processing')[] = ['settled', 'settled', 'settled', 'pending', 'processing'];
  
  for (let i = 0; i < 30; i++) {
    const date = subDays(new Date(), i);
    sampleSubMerchants.forEach((sm, idx) => {
      if (sm.status === 'active' && Math.random() > 0.3) {
        records.push({
          id: `SET${String(records.length + 1).padStart(6, '0')}`,
          date,
          subMerchantId: sm.id,
          subMerchantName: sm.displayName,
          subMerchantVpa: sm.vpa,
          transactionCount: Math.floor(Math.random() * 50) + 5,
          totalAmount: Math.floor(Math.random() * 100000) + 5000,
          settlementStatus: statuses[Math.floor(Math.random() * statuses.length)],
          utr: `UTR${Math.floor(Math.random() * 900000000000) + 100000000000}`,
        });
      }
    });
  }
  return records.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Sample Transactions
const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const payerNames = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikash Singh'];
  const statuses: ('SUCCESS' | 'PENDING' | 'FAILURE')[] = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'PENDING', 'FAILURE'];
  
  for (let i = 0; i < 100; i++) {
    const subMerchant = sampleSubMerchants[Math.floor(Math.random() * sampleSubMerchants.length)];
    transactions.push({
      id: `TXN${String(i + 1).padStart(6, '0')}`,
      dateTime: subDays(new Date(), Math.floor(Math.random() * 14)),
      amount: Math.floor(Math.random() * 10000) + 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      payerVpa: `${payerNames[i % 5].toLowerCase().replace(' ', '.')}@upi`,
      payerName: payerNames[i % 5],
      rrn: `${Math.floor(Math.random() * 900000000000) + 100000000000}`,
      subMerchantId: subMerchant.id,
    });
  }
  return transactions.sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());
};

const settlementData = generateSettlementData();
const allTransactions = generateTransactions();

// Role simulation (in real app, this would come from auth context)
const currentUserRole: 'main_merchant' | 'sub_merchant' = 'main_merchant';
const currentSubMerchantId = 'SM001'; // Only used if role is sub_merchant

export default function Settlements() {
  // Filter states
  const [selectedSubMerchant, setSelectedSubMerchant] = useState<string>('all');
  const [merchantSearchOpen, setMerchantSearchOpen] = useState(false);
  const [merchantSearch, setMerchantSearch] = useState('');
  const [dateRange, setDateRange] = useState<'7days' | '14days' | 'custom'>('7days');
  const [fromDate, setFromDate] = useState<Date>(subDays(new Date(), 7));
  const [toDate, setToDate] = useState<Date>(new Date());
  const [showSummary, setShowSummary] = useState(false);
  
  // Download states
  const [settlementType, setSettlementType] = useState<'consolidated' | 'transaction' | 'complete'>('consolidated');
  const [downloadFormat, setDownloadFormat] = useState<'csv' | 'pdf'>('csv');
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Drill-down states
  const [drillDownOpen, setDrillDownOpen] = useState(false);
  const [selectedDrillDown, setSelectedDrillDown] = useState<{ type: 'submerchant' | 'date'; id: string; name: string } | null>(null);
  
  // Audit states
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [auditSearch, setAuditSearch] = useState('');
  
  // Active tab
  const [activeTab, setActiveTab] = useState('summary');

  // Check if user is main merchant
  const isMainMerchant = currentUserRole === 'main_merchant';

  // Get filtered sub-merchants for dropdown
  const filteredSubMerchants = sampleSubMerchants.filter(sm => 
    sm.name.toLowerCase().includes(merchantSearch.toLowerCase()) ||
    sm.vpa.toLowerCase().includes(merchantSearch.toLowerCase()) ||
    sm.id.toLowerCase().includes(merchantSearch.toLowerCase())
  );

  // Get date range
  const getDateRange = () => {
    switch (dateRange) {
      case '7days':
        return { from: subDays(new Date(), 7), to: new Date() };
      case '14days':
        return { from: subDays(new Date(), 14), to: new Date() };
      case 'custom':
        return { from: fromDate, to: toDate };
    }
  };

  // Filter settlement data based on selections
  const filteredSettlements = useMemo(() => {
    const { from, to } = getDateRange();
    
    return settlementData.filter(record => {
      // Date filter
      const recordDate = startOfDay(record.date);
      if (recordDate < startOfDay(from) || recordDate > endOfDay(to)) return false;
      
      // Sub-merchant filter
      if (!isMainMerchant) {
        return record.subMerchantId === currentSubMerchantId;
      }
      if (selectedSubMerchant !== 'all') {
        return record.subMerchantId === selectedSubMerchant;
      }
      return true;
    });
  }, [selectedSubMerchant, dateRange, fromDate, toDate, isMainMerchant]);

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalAmount = filteredSettlements.reduce((sum, r) => sum + r.totalAmount, 0);
    const totalTransactions = filteredSettlements.reduce((sum, r) => sum + r.transactionCount, 0);
    const uniqueDates = new Set(filteredSettlements.map(r => format(r.date, 'yyyy-MM-dd'))).size;
    const uniqueSubMerchants = new Set(filteredSettlements.map(r => r.subMerchantId)).size;
    
    return { totalAmount, totalTransactions, settlementDays: uniqueDates, subMerchantCount: uniqueSubMerchants };
  }, [filteredSettlements]);

  // Sub-merchant breakdown
  const subMerchantBreakdown = useMemo(() => {
    const breakdown: { [key: string]: { name: string; vpa: string; transactions: number; amount: number } } = {};
    
    filteredSettlements.forEach(record => {
      if (!breakdown[record.subMerchantId]) {
        breakdown[record.subMerchantId] = {
          name: record.subMerchantName,
          vpa: record.subMerchantVpa,
          transactions: 0,
          amount: 0,
        };
      }
      breakdown[record.subMerchantId].transactions += record.transactionCount;
      breakdown[record.subMerchantId].amount += record.totalAmount;
    });
    
    return Object.entries(breakdown).map(([id, data]) => ({ id, ...data }));
  }, [filteredSettlements]);

  // Get transactions for drill-down
  const getDrillDownTransactions = () => {
    if (!selectedDrillDown) return [];
    
    return allTransactions.filter(txn => {
      if (selectedDrillDown.type === 'submerchant') {
        return txn.subMerchantId === selectedDrillDown.id;
      }
      return format(txn.dateTime, 'yyyy-MM-dd') === selectedDrillDown.id;
    }).slice(0, 20);
  };

  // Add audit log
  const addAuditLog = (action: string, details: string, subMerchantId?: string) => {
    const newLog: AuditLog = {
      id: `AUD${String(auditLogs.length + 1).padStart(6, '0')}`,
      action,
      merchantId: 'MM001',
      merchantVpa: 'mainmerchant@canara',
      subMerchantId,
      subMerchantVpa: subMerchantId ? sampleSubMerchants.find(s => s.id === subMerchantId)?.vpa : undefined,
      details,
      performedBy: 'Main Merchant',
      timestamp: new Date(),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Handle View Summary
  const handleViewSummary = () => {
    setShowSummary(true);
    addAuditLog(
      'Business Summary Viewed',
      `Viewed business summary for ${selectedSubMerchant === 'all' ? 'all sub-merchants' : selectedSubMerchant} from ${format(getDateRange().from, 'dd MMM yyyy')} to ${format(getDateRange().to, 'dd MMM yyyy')}`,
      selectedSubMerchant !== 'all' ? selectedSubMerchant : undefined
    );
    toast({
      title: "Summary Generated",
      description: "Business summary has been loaded successfully.",
    });
  };

  // Handle Clear Filters
  const handleClearFilters = () => {
    setSelectedSubMerchant('all');
    setDateRange('7days');
    setFromDate(subDays(new Date(), 7));
    setToDate(new Date());
    setShowSummary(false);
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  // Handle Download
  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (filteredSettlements.length === 0) {
      toast({
        variant: "destructive",
        title: "No Data Available",
        description: "There is no settlement data for the selected criteria.",
      });
      setIsDownloading(false);
      return;
    }
    
    addAuditLog(
      'Settlement File Downloaded',
      `Downloaded ${settlementType} settlement file in ${downloadFormat.toUpperCase()} format for ${selectedSubMerchant === 'all' ? 'all sub-merchants' : selectedSubMerchant}`,
      selectedSubMerchant !== 'all' ? selectedSubMerchant : undefined
    );
    
    toast({
      title: "Download Complete",
      description: `Settlement file has been downloaded successfully as ${downloadFormat.toUpperCase()}.`,
    });
    
    setIsDownloading(false);
  };

  // Handle drill-down click
  const handleDrillDown = (type: 'submerchant' | 'date', id: string, name: string) => {
    setSelectedDrillDown({ type, id, name });
    setDrillDownOpen(true);
    addAuditLog(
      'Drill-Down Viewed',
      `Viewed ${type === 'submerchant' ? 'sub-merchant' : 'date'} drill-down for ${name}`,
      type === 'submerchant' ? id : undefined
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter audit logs
  const filteredAuditLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
    (log.subMerchantVpa && log.subMerchantVpa.toLowerCase().includes(auditSearch.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Wallet className="h-7 w-7 text-primary" />
                  Settlement & Business Overview
                </h1>
                <p className="text-muted-foreground mt-1">
                  {isMainMerchant ? 'View cumulative and individual sub-merchant settlements' : 'View your settlement and business data'}
                </p>
              </div>
              {!isMainMerchant && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <Building2 className="h-3 w-3 mr-1" />
                  {sampleSubMerchants.find(s => s.id === currentSubMerchantId)?.displayName}
                </Badge>
              )}
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="summary" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Business Summary
                </TabsTrigger>
                <TabsTrigger value="downloads" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Downloads
                </TabsTrigger>
                <TabsTrigger value="audit" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Audit Trail
                </TabsTrigger>
              </TabsList>

              {/* Business Summary Tab */}
              <TabsContent value="summary" className="space-y-6">
                {/* Filter Panel */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filter Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Sub-Merchant Selection (Main Merchant Only) */}
                      {isMainMerchant && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Sub-Merchant</Label>
                          <Popover open={merchantSearchOpen} onOpenChange={setMerchantSearchOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between text-left font-normal"
                              >
                                <span className="truncate">
                                  {selectedSubMerchant === 'all' 
                                    ? 'All Sub-Merchants (Cumulative)' 
                                    : sampleSubMerchants.find(s => s.id === selectedSubMerchant)?.displayName}
                                </span>
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0" align="start">
                              <Command>
                                <CommandInput 
                                  placeholder="Search by VPA, name, or ID..." 
                                  value={merchantSearch}
                                  onValueChange={setMerchantSearch}
                                />
                                <CommandList>
                                  <CommandEmpty>No sub-merchant found.</CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem
                                      value="all"
                                      onSelect={() => {
                                        setSelectedSubMerchant('all');
                                        setMerchantSearchOpen(false);
                                        setMerchantSearch('');
                                      }}
                                    >
                                      <Users className="mr-2 h-4 w-4" />
                                      All Sub-Merchants (Cumulative)
                                      {selectedSubMerchant === 'all' && <Check className="ml-auto h-4 w-4" />}
                                    </CommandItem>
                                    {filteredSubMerchants.map(sm => (
                                      <CommandItem
                                        key={sm.id}
                                        value={sm.id}
                                        onSelect={() => {
                                          setSelectedSubMerchant(sm.id);
                                          setMerchantSearchOpen(false);
                                          setMerchantSearch('');
                                        }}
                                      >
                                        <Building2 className="mr-2 h-4 w-4" />
                                        <div className="flex flex-col">
                                          <span>{sm.displayName}</span>
                                          <span className="text-xs text-muted-foreground">{sm.vpa}</span>
                                        </div>
                                        {selectedSubMerchant === sm.id && <Check className="ml-auto h-4 w-4" />}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}

                      {/* Date Range Selection */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Date Range</Label>
                        <Select value={dateRange} onValueChange={(v: '7days' | '14days' | 'custom') => setDateRange(v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7days">Last 7 Days</SelectItem>
                            <SelectItem value="14days">Last 14 Days</SelectItem>
                            <SelectItem value="custom">Custom Date Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Custom Date Range */}
                      {dateRange === 'custom' && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">From Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {format(fromDate, 'dd MMM yyyy')}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={fromDate}
                                  onSelect={(d) => d && setFromDate(d)}
                                  disabled={(date) => isAfter(date, new Date())}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">To Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {format(toDate, 'dd MMM yyyy')}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={toDate}
                                  onSelect={(d) => d && setToDate(d)}
                                  disabled={(date) => isAfter(date, new Date())}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                      <Button onClick={handleViewSummary} className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Summary
                      </Button>
                      <Button variant="outline" onClick={handleClearFilters} className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Clear Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary Dashboard */}
                <AnimatePresence>
                  {showSummary && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Total Settlement Amount</p>
                                <p className="text-2xl font-bold text-foreground mt-1">
                                  {formatCurrency(summaryMetrics.totalAmount)}
                                </p>
                              </div>
                              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <IndianRupee className="h-6 w-6 text-emerald-600" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Total Transactions</p>
                                <p className="text-2xl font-bold text-foreground mt-1">
                                  {summaryMetrics.totalTransactions.toLocaleString()}
                                </p>
                              </div>
                              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <FileText className="h-6 w-6 text-blue-600" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Settlement Days</p>
                                <p className="text-2xl font-bold text-foreground mt-1">
                                  {summaryMetrics.settlementDays}
                                </p>
                              </div>
                              <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-purple-600" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {isMainMerchant && (
                          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-muted-foreground">Sub-Merchants Included</p>
                                  <p className="text-2xl font-bold text-foreground mt-1">
                                    {summaryMetrics.subMerchantCount}
                                  </p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                  <Users className="h-6 w-6 text-amber-600" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>

                      {/* Sub-Merchant Breakdown (Main Merchant Only) */}
                      {isMainMerchant && selectedSubMerchant === 'all' && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              Sub-Merchant Breakdown
                            </CardTitle>
                            <CardDescription>
                              Click on a row to view detailed transactions
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Sub-Merchant Name</TableHead>
                                  <TableHead>VPA</TableHead>
                                  <TableHead className="text-right">Total Transactions</TableHead>
                                  <TableHead className="text-right">Total Settlement Amount</TableHead>
                                  <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {subMerchantBreakdown.length === 0 ? (
                                  <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                      No settlement data available for the selected period
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  subMerchantBreakdown.map((sm) => (
                                    <TableRow 
                                      key={sm.id}
                                      className="cursor-pointer hover:bg-muted/50"
                                      onClick={() => handleDrillDown('submerchant', sm.id, sm.name)}
                                    >
                                      <TableCell className="font-medium">{sm.name}</TableCell>
                                      <TableCell className="font-mono text-sm">{sm.vpa}</TableCell>
                                      <TableCell className="text-right">{sm.transactions.toLocaleString()}</TableCell>
                                      <TableCell className="text-right font-medium">{formatCurrency(sm.amount)}</TableCell>
                                      <TableCell className="text-center">
                                        <Button variant="ghost" size="sm" className="gap-1">
                                          View <ChevronRight className="h-3 w-3" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                )}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      )}

                      {/* Date-wise Breakdown */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5" />
                            {isMainMerchant && selectedSubMerchant !== 'all' 
                              ? `Settlement Details - ${sampleSubMerchants.find(s => s.id === selectedSubMerchant)?.displayName}`
                              : 'Date-wise Settlement Details'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[400px]">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Date</TableHead>
                                  {(isMainMerchant && selectedSubMerchant === 'all') && (
                                    <TableHead>Sub-Merchant</TableHead>
                                  )}
                                  <TableHead>Transactions</TableHead>
                                  <TableHead className="text-right">Amount</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>UTR</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredSettlements.length === 0 ? (
                                  <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                      No settlement data available
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  filteredSettlements.slice(0, 50).map((record) => (
                                    <TableRow key={record.id}>
                                      <TableCell className="font-medium">
                                        {format(record.date, 'dd MMM yyyy')}
                                      </TableCell>
                                      {(isMainMerchant && selectedSubMerchant === 'all') && (
                                        <TableCell>
                                          <div>
                                            <p className="font-medium">{record.subMerchantName}</p>
                                            <p className="text-xs text-muted-foreground">{record.subMerchantVpa}</p>
                                          </div>
                                        </TableCell>
                                      )}
                                      <TableCell>{record.transactionCount}</TableCell>
                                      <TableCell className="text-right font-medium">
                                        {formatCurrency(record.totalAmount)}
                                      </TableCell>
                                      <TableCell>
                                        <Badge 
                                          variant="outline"
                                          className={cn(
                                            record.settlementStatus === 'settled' && 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
                                            record.settlementStatus === 'pending' && 'bg-amber-500/15 text-amber-600 border-amber-500/30',
                                            record.settlementStatus === 'processing' && 'bg-blue-500/15 text-blue-600 border-blue-500/30'
                                          )}
                                        >
                                          {record.settlementStatus.charAt(0).toUpperCase() + record.settlementStatus.slice(1)}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="font-mono text-xs">{record.utr}</TableCell>
                                    </TableRow>
                                  ))
                                )}
                              </TableBody>
                            </Table>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>

              {/* Downloads Tab */}
              <TabsContent value="downloads" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileDown className="h-5 w-5" />
                      Settlement File Downloads
                    </CardTitle>
                    <CardDescription>
                      Download settlement files for the selected date range and sub-merchant
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Settlement Type Selection */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">Settlement Type</Label>
                      <RadioGroup value={settlementType} onValueChange={(v: 'consolidated' | 'transaction' | 'complete') => setSettlementType(v)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="consolidated" id="consolidated" className="mt-1" />
                          <div className="space-y-1">
                            <Label htmlFor="consolidated" className="font-medium cursor-pointer">
                              One-Day Consolidated
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Entire day settled as a single record
                            </p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">All transactions for each day are consolidated into a single settlement record</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="transaction" id="transaction" className="mt-1" />
                          <div className="space-y-1">
                            <Label htmlFor="transaction" className="font-medium cursor-pointer">
                              Transaction-Wise
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              One row per transaction
                            </p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Each transaction is listed as a separate row with full details</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="complete" id="complete" className="mt-1" />
                          <div className="space-y-1">
                            <Label htmlFor="complete" className="font-medium cursor-pointer">
                              Complete Settlement File
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              All transactions for selected range
                            </p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Complete settlement data including all transaction details and summaries</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    {/* Download Format */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">Download Format</Label>
                      <div className="flex gap-4">
                        <Button
                          variant={downloadFormat === 'csv' ? 'default' : 'outline'}
                          onClick={() => setDownloadFormat('csv')}
                          className="gap-2"
                        >
                          <FileSpreadsheet className="h-4 w-4" />
                          CSV
                        </Button>
                        <Button
                          variant={downloadFormat === 'pdf' ? 'default' : 'outline'}
                          onClick={() => setDownloadFormat('pdf')}
                          className="gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          PDF
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Download Summary */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <h4 className="font-medium">Download Summary</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Date Range:</span>
                        <span>{format(getDateRange().from, 'dd MMM yyyy')} - {format(getDateRange().to, 'dd MMM yyyy')}</span>
                        <span className="text-muted-foreground">Sub-Merchant:</span>
                        <span>{selectedSubMerchant === 'all' ? 'All Sub-Merchants' : sampleSubMerchants.find(s => s.id === selectedSubMerchant)?.displayName}</span>
                        <span className="text-muted-foreground">Settlement Type:</span>
                        <span className="capitalize">{settlementType.replace('-', ' ')}</span>
                        <span className="text-muted-foreground">Format:</span>
                        <span className="uppercase">{downloadFormat}</span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <Button 
                      onClick={handleDownload} 
                      disabled={isDownloading}
                      className="w-full gap-2"
                      size="lg"
                    >
                      {isDownloading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </motion.div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Download Settlement File
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Audit Trail Tab */}
              <TabsContent value="audit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <History className="h-5 w-5" />
                          Audit Trail
                        </CardTitle>
                        <CardDescription>
                          Read-only log of all settlement-related actions
                        </CardDescription>
                      </div>
                      <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search audit logs..."
                          value={auditSearch}
                          onChange={(e) => setAuditSearch(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[180px]">Date & Time</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Sub-Merchant</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Performed By</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAuditLogs.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>No audit logs yet</p>
                                <p className="text-xs mt-1">Actions will be logged as you use the module</p>
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredAuditLogs.map((log) => (
                              <TableRow key={log.id}>
                                <TableCell className="font-mono text-xs">
                                  {format(log.timestamp, 'dd MMM yyyy, HH:mm:ss')}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{log.action}</Badge>
                                </TableCell>
                                <TableCell>
                                  {log.subMerchantVpa ? (
                                    <span className="font-mono text-sm">{log.subMerchantVpa}</span>
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )}
                                </TableCell>
                                <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                                <TableCell>{log.performedBy}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>

      {/* Drill-Down Dialog */}
      <Dialog open={drillDownOpen} onOpenChange={setDrillDownOpen}>
        <DialogContent className="w-[75vw] max-w-[75vw] h-[90vh] max-h-[90vh] flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-xl flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Transaction Details - {selectedDrillDown?.name}
            </DialogTitle>
            <DialogDescription>
              Showing recent transactions (read-only preview)
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 h-[calc(90vh-180px)] overflow-y-auto px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Payer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>RRN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getDrillDownTransactions().map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                    <TableCell>{format(txn.dateTime, 'dd MMM yyyy, HH:mm')}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{txn.payerName}</p>
                        <p className="text-xs text-muted-foreground">{txn.payerVpa}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(txn.amount)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={cn(
                          txn.status === 'SUCCESS' && 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
                          txn.status === 'PENDING' && 'bg-amber-500/15 text-amber-600 border-amber-500/30',
                          txn.status === 'FAILURE' && 'bg-red-500/15 text-red-600 border-red-500/30'
                        )}
                      >
                        {txn.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{txn.rrn}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <DialogFooter className="px-6 py-4 border-t">
            <Button variant="outline" onClick={() => setDrillDownOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}