import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, subDays, subMonths, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';
import {
  Search,
  Calendar,
  Filter,
  Download,
  RotateCcw,
  ChevronDown,
  X,
  MoreHorizontal,
  Eye,
  Copy,
  AlertTriangle,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Clock,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

// Mock Merchant UPI IDs
const merchantUPIIds = [
  'canarabankmerchant1@canara',
  'canarabankmerchant2@canara',
  'shopkeeper.delhi@canara',
  'retailstore.mumbai@canara',
  'grocerymart.bangalore@canara',
  'electronics.chennai@canara',
  'pharmacy.hyderabad@canara',
  'restaurant.pune@canara',
];

// Status options
const statusOptions = [
  { value: 'SUCCESS', label: 'Success', color: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30' },
  { value: 'PENDING', label: 'Pending', color: 'bg-amber-500/15 text-amber-600 border-amber-500/30' },
  { value: 'FAILURE', label: 'Failure', color: 'bg-red-500/15 text-red-600 border-red-500/30' },
  { value: 'DEEMED', label: 'Deemed', color: 'bg-slate-500/15 text-slate-600 border-slate-500/30' },
];

// Duration options
const durationOptions = [
  { value: 'today', label: 'Today' },
  { value: 'last1month', label: 'Last 1 Month' },
  { value: 'last3months', label: 'Last 3 Months' },
  { value: 'custom', label: 'Custom Date' },
];

// Sample transaction data with all scenarios (displayed by default)
const sampleTransactions = [
  {
    id: 'TXN000001',
    payeeVpa: 'ca****t1@canara',
    payeeVpaFull: 'canarabankmerchant1@canara',
    dateTime: new Date('2024-12-24T14:30:25'),
    rrn: '4123****7890',
    rrnFull: '412345677890',
    amount: 15000,
    status: 'SUCCESS',
    payerVpa: 'ra****ma@upi',
    payerVpaFull: 'rahul.sharma@upi',
    payerName: 'Rahul Sharma',
    remarks: 'Payment for electronics purchase'
  },
  {
    id: 'TXN000002',
    payeeVpa: 'ca****t1@canara',
    payeeVpaFull: 'canarabankmerchant1@canara',
    dateTime: new Date('2024-12-24T13:15:42'),
    rrn: '5234****8901',
    rrnFull: '523456788901',
    amount: 2500,
    status: 'PENDING',
    payerVpa: 'pr****el@upi',
    payerVpaFull: 'priya.patel@upi',
    payerName: 'Priya Patel',
    remarks: 'Bill settlement'
  },
  {
    id: 'TXN000003',
    payeeVpa: 'ca****t1@canara',
    payeeVpaFull: 'canarabankmerchant1@canara',
    dateTime: new Date('2024-12-24T12:45:18'),
    rrn: '6345****9012',
    rrnFull: '634567899012',
    amount: 8750,
    status: 'FAILURE',
    payerVpa: 'am****ar@upi',
    payerVpaFull: 'amit.kumar@upi',
    payerName: 'Amit Kumar',
    remarks: 'Product purchase - Payment failed'
  },
  {
    id: 'TXN000004',
    payeeVpa: 'ca****t1@canara',
    payeeVpaFull: 'canarabankmerchant1@canara',
    dateTime: new Date('2024-12-24T11:20:55'),
    rrn: '7456****0123',
    rrnFull: '745678900123',
    amount: 45000,
    status: 'DEEMED',
    payerVpa: 'sn****dy@upi',
    payerVpaFull: 'sneha.reddy@upi',
    payerName: 'Sneha Reddy',
    remarks: 'Large transaction - Under review'
  },
  {
    id: 'TXN000005',
    payeeVpa: 'ca****t1@canara',
    payeeVpaFull: 'canarabankmerchant1@canara',
    dateTime: new Date('2024-12-24T10:05:33'),
    rrn: '8567****1234',
    rrnFull: '856789011234',
    amount: 1200,
    status: 'SUCCESS',
    payerVpa: 'vi****gh@upi',
    payerVpaFull: 'vikash.singh@upi',
    payerName: 'Vikash Singh',
    remarks: 'Food order payment'
  },
  {
    id: 'TXN000006',
    payeeVpa: 'ca****t2@canara',
    payeeVpaFull: 'canarabankmerchant2@canara',
    dateTime: new Date('2024-12-23T16:45:12'),
    rrn: '9678****2345',
    rrnFull: '967890122345',
    amount: 3500,
    status: 'SUCCESS',
    payerVpa: 'an****ta@upi',
    payerVpaFull: 'anjali.gupta@upi',
    payerName: 'Anjali Gupta',
    remarks: 'Subscription renewal'
  },
  {
    id: 'TXN000007',
    payeeVpa: 'ca****t2@canara',
    payeeVpaFull: 'canarabankmerchant2@canara',
    dateTime: new Date('2024-12-23T15:30:28'),
    rrn: '1789****3456',
    rrnFull: '178901233456',
    amount: 22000,
    status: 'PENDING',
    payerVpa: 'ra****ra@upi',
    payerVpaFull: 'raj.malhotra@upi',
    payerName: 'Raj Malhotra',
    remarks: 'Service fee - Processing'
  },
  {
    id: 'TXN000008',
    payeeVpa: 'sh****hi@canara',
    payeeVpaFull: 'shopkeeper.delhi@canara',
    dateTime: new Date('2024-12-23T14:20:45'),
    rrn: '2890****4567',
    rrnFull: '289012344567',
    amount: 550,
    status: 'SUCCESS',
    payerVpa: 'ne****ma@upi',
    payerVpaFull: 'neha.verma@upi',
    payerName: 'Neha Verma',
    remarks: 'Recharge payment'
  },
  {
    id: 'TXN000009',
    payeeVpa: 'sh****hi@canara',
    payeeVpaFull: 'shopkeeper.delhi@canara',
    dateTime: new Date('2024-12-23T12:10:55'),
    rrn: '3901****5678',
    rrnFull: '390123455678',
    amount: 7800,
    status: 'FAILURE',
    payerVpa: 'su****an@upi',
    payerVpaFull: 'suresh.rajan@upi',
    payerName: 'Suresh Rajan',
    remarks: 'Utility bill - Bank declined'
  },
  {
    id: 'TXN000010',
    payeeVpa: 're****ai@canara',
    payeeVpaFull: 'retailstore.mumbai@canara',
    dateTime: new Date('2024-12-22T18:55:30'),
    rrn: '4012****6789',
    rrnFull: '401234566789',
    amount: 125000,
    status: 'SUCCESS',
    payerVpa: 'de****sh@upi',
    payerVpaFull: 'deepak.joshi@upi',
    payerName: 'Deepak Joshi',
    remarks: 'High value purchase - Verified'
  },
  {
    id: 'TXN000011',
    payeeVpa: 're****ai@canara',
    payeeVpaFull: 'retailstore.mumbai@canara',
    dateTime: new Date('2024-12-22T17:40:18'),
    rrn: '5123****7890',
    rrnFull: '512345677890',
    amount: 890,
    status: 'DEEMED',
    payerVpa: 'ka****ni@upi',
    payerVpaFull: 'kavita.rani@upi',
    payerName: 'Kavita Rani',
    remarks: 'Transaction timeout - Deemed'
  },
  {
    id: 'TXN000012',
    payeeVpa: 'gr****re@canara',
    payeeVpaFull: 'grocerymart.bangalore@canara',
    dateTime: new Date('2024-12-22T16:25:42'),
    rrn: '6234****8901',
    rrnFull: '623456788901',
    amount: 4200,
    status: 'SUCCESS',
    payerVpa: 'mo****ed@upi',
    payerVpaFull: 'mohit.ahmed@upi',
    payerName: 'Mohit Ahmed',
    remarks: 'Grocery shopping'
  },
  {
    id: 'TXN000013',
    payeeVpa: 'gr****re@canara',
    payeeVpaFull: 'grocerymart.bangalore@canara',
    dateTime: new Date('2024-12-22T15:10:55'),
    rrn: '7345****9012',
    rrnFull: '734567899012',
    amount: 18500,
    status: 'PENDING',
    payerVpa: 'sa****ti@upi',
    payerVpaFull: 'sandeep.tiwari@upi',
    payerName: 'Sandeep Tiwari',
    remarks: 'Bulk order - Awaiting confirmation'
  },
  {
    id: 'TXN000014',
    payeeVpa: 'el****ai@canara',
    payeeVpaFull: 'electronics.chennai@canara',
    dateTime: new Date('2024-12-21T14:30:28'),
    rrn: '8456****0123',
    rrnFull: '845678900123',
    amount: 67500,
    status: 'SUCCESS',
    payerVpa: 'ar****an@upi',
    payerVpaFull: 'arun.krishnan@upi',
    payerName: 'Arun Krishnan',
    remarks: 'Laptop purchase'
  },
  {
    id: 'TXN000015',
    payeeVpa: 'el****ai@canara',
    payeeVpaFull: 'electronics.chennai@canara',
    dateTime: new Date('2024-12-21T13:15:42'),
    rrn: '9567****1234',
    rrnFull: '956789011234',
    amount: 2999,
    status: 'FAILURE',
    payerVpa: 'me****ta@upi',
    payerVpaFull: 'meera.mehta@upi',
    payerName: 'Meera Mehta',
    remarks: 'Accessory purchase - Insufficient funds'
  },
  {
    id: 'TXN000016',
    payeeVpa: 'ph****ad@canara',
    payeeVpaFull: 'pharmacy.hyderabad@canara',
    dateTime: new Date('2024-12-21T11:45:18'),
    rrn: '1678****2345',
    rrnFull: '167890122345',
    amount: 1850,
    status: 'SUCCESS',
    payerVpa: 'ra****ri@upi',
    payerVpaFull: 'ramesh.suri@upi',
    payerName: 'Ramesh Suri',
    remarks: 'Medicine purchase'
  },
  {
    id: 'TXN000017',
    payeeVpa: 'ph****ad@canara',
    payeeVpaFull: 'pharmacy.hyderabad@canara',
    dateTime: new Date('2024-12-21T10:30:55'),
    rrn: '2789****3456',
    rrnFull: '278901233456',
    amount: 5600,
    status: 'DEEMED',
    payerVpa: 'la****mi@upi',
    payerVpaFull: 'lakshmi.nair@upi',
    payerName: 'Lakshmi Nair',
    remarks: 'Health products - Status pending'
  },
  {
    id: 'TXN000018',
    payeeVpa: 're****ne@canara',
    payeeVpaFull: 'restaurant.pune@canara',
    dateTime: new Date('2024-12-20T19:20:33'),
    rrn: '3890****4567',
    rrnFull: '389012344567',
    amount: 3200,
    status: 'SUCCESS',
    payerVpa: 'vi****ay@upi',
    payerVpaFull: 'vijay.dubey@upi',
    payerName: 'Vijay Dubey',
    remarks: 'Dinner bill payment'
  },
  {
    id: 'TXN000019',
    payeeVpa: 're****ne@canara',
    payeeVpaFull: 'restaurant.pune@canara',
    dateTime: new Date('2024-12-20T18:05:12'),
    rrn: '4901****5678',
    rrnFull: '490123455678',
    amount: 980,
    status: 'PENDING',
    payerVpa: 'sh****ti@upi',
    payerVpaFull: 'shweta.bharti@upi',
    payerName: 'Shweta Bharti',
    remarks: 'Takeaway order - Processing'
  },
  {
    id: 'TXN000020',
    payeeVpa: 're****ne@canara',
    payeeVpaFull: 'restaurant.pune@canara',
    dateTime: new Date('2024-12-20T16:45:28'),
    rrn: '5012****6789',
    rrnFull: '501234566789',
    amount: 15750,
    status: 'SUCCESS',
    payerVpa: 'ak****ay@upi',
    payerVpaFull: 'akash.pandey@upi',
    payerName: 'Akash Pandey',
    remarks: 'Party order payment'
  },
];

// Mock transaction data generator
const generateMockTransactions = (merchantId: string, count: number = 50) => {
  const statuses = ['SUCCESS', 'PENDING', 'FAILURE', 'DEEMED'];
  const payerNames = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikash Singh', 'Anjali Gupta', 'Raj Malhotra', 'Neha Verma'];
  const remarks = ['Payment for order', 'Bill settlement', 'Product purchase', 'Service fee', 'Subscription', 'Recharge', 'Utility bill', 'Food order'];
  
  return Array.from({ length: count }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = subDays(new Date(), Math.floor(Math.random() * 90));
    const amount = Math.floor(Math.random() * 50000) + 100;
    
    return {
      id: `TXN${String(i + 1).padStart(6, '0')}`,
      payeeVpa: maskVPA(merchantId),
      payeeVpaFull: merchantId,
      dateTime: date,
      rrn: maskRRN(`${Math.floor(Math.random() * 900000000000) + 100000000000}`),
      rrnFull: `${Math.floor(Math.random() * 900000000000) + 100000000000}`,
      amount,
      status,
      payerVpa: maskVPA(`${payerNames[Math.floor(Math.random() * payerNames.length)].toLowerCase().replace(' ', '.')}@upi`),
      payerVpaFull: `${payerNames[Math.floor(Math.random() * payerNames.length)].toLowerCase().replace(' ', '.')}@upi`,
      payerName: payerNames[Math.floor(Math.random() * payerNames.length)],
      remarks: remarks[Math.floor(Math.random() * remarks.length)],
    };
  }).sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());
};

// Mask VPA
const maskVPA = (vpa: string) => {
  if (!vpa) return '';
  const parts = vpa.split('@');
  if (parts[0].length <= 4) return vpa;
  return `${parts[0].slice(0, 2)}****${parts[0].slice(-2)}@${parts[1]}`;
};

// Mask RRN
const maskRRN = (rrn: string) => {
  if (!rrn || rrn.length < 8) return rrn;
  return `${rrn.slice(0, 4)}****${rrn.slice(-4)}`;
};

export default function TransactionSummary() {
  // Filter states
  const [selectedMerchant, setSelectedMerchant] = useState<string>('');
  const [merchantSearchOpen, setMerchantSearchOpen] = useState(false);
  const [merchantSearch, setMerchantSearch] = useState('');
  const [duration, setDuration] = useState('today');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  
  // Data states - show sample transactions by default
  const [transactions, setTransactions] = useState<any[]>(sampleTransactions);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(true); // Show table by default
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter merchants based on search
  const filteredMerchants = merchantUPIIds.filter(id =>
    id.toLowerCase().includes(merchantSearch.toLowerCase())
  );

  // Handle status selection
  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  // Clear all statuses
  const clearStatuses = () => {
    setSelectedStatuses([]);
  };

  // Clear all filters - reset to sample data
  const handleClearFilters = () => {
    setSelectedMerchant('');
    setDuration('today');
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedStatuses([]);
    setTransactions(sampleTransactions);
    setHasSearched(true);
    setCurrentPage(1);
  };

  // Validate date range
  const isValidDateRange = () => {
    if (duration !== 'custom') return true;
    if (!fromDate || !toDate) return false;
    return !isAfter(fromDate, toDate);
  };

  // Get date range based on duration
  const getDateRange = () => {
    const today = new Date();
    switch (duration) {
      case 'today':
        return { from: startOfDay(today), to: endOfDay(today) };
      case 'last1month':
        return { from: subMonths(today, 1), to: today };
      case 'last3months':
        return { from: subMonths(today, 3), to: today };
      case 'custom':
        return { from: fromDate ? startOfDay(fromDate) : today, to: toDate ? endOfDay(toDate) : today };
      default:
        return { from: startOfDay(today), to: endOfDay(today) };
    }
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!selectedMerchant) {
      toast({
        title: "Validation Error",
        description: "Please select a Merchant UPI ID",
        variant: "destructive",
      });
      return;
    }

    if (duration === 'custom' && !isValidDateRange()) {
      toast({
        title: "Invalid Date Range",
        description: "To Date must be greater than or equal to From Date",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCurrentPage(1);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockData = generateMockTransactions(selectedMerchant, 50);
    const dateRange = getDateRange();

    // Filter by date range
    let filtered = mockData.filter(txn => {
      const txnDate = new Date(txn.dateTime);
      return txnDate >= dateRange.from && txnDate <= dateRange.to;
    });

    // Filter by status
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(txn => selectedStatuses.includes(txn.status));
    }

    setTransactions(filtered);
    setHasSearched(true);
    setIsLoading(false);

    toast({
      title: "Data Retrieved",
      description: `Found ${filtered.length} transactions`,
    });
  };

  // Download handler
  const handleDownload = () => {
    if (transactions.length === 0) return;

    const csvContent = [
      ['Payee VPA', 'Date & Time', 'RRN', 'Amount', 'Status', 'Payer VPA', 'Payer Name', 'Remarks'].join(','),
      ...transactions.map(txn => [
        txn.payeeVpa,
        format(txn.dateTime, 'dd/MM/yyyy HH:mm:ss'),
        txn.rrnFull,
        txn.amount,
        txn.status,
        txn.payerVpaFull,
        txn.payerName,
        txn.remarks
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Transaction data is being downloaded",
    });
  };

  // Copy RRN
  const handleCopyRRN = (rrn: string) => {
    navigator.clipboard.writeText(rrn);
    toast({
      title: "Copied",
      description: "RRN copied to clipboard",
    });
  };

  // Calculate summary metrics
  const summary = useMemo(() => {
    const totalCount = transactions.length;
    const totalAmount = transactions.reduce((sum, txn) => sum + txn.amount, 0);
    return { totalCount, totalAmount };
  }, [transactions]);

  // Paginated transactions
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return transactions.slice(start, start + itemsPerPage);
  }, [transactions, currentPage]);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = statusOptions.find(s => s.value === status);
    return (
      <Badge variant="outline" className={cn("font-medium", statusConfig?.color)}>
        {status === 'SUCCESS' && <Check className="w-3 h-3 mr-1" />}
        {status === 'PENDING' && <Clock className="w-3 h-3 mr-1" />}
        {status === 'FAILURE' && <XCircle className="w-3 h-3 mr-1" />}
        {status === 'DEEMED' && <HelpCircle className="w-3 h-3 mr-1" />}
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Transaction Summary</h1>
                <p className="text-muted-foreground text-sm mt-1">View and analyze your transaction history</p>
              </div>
            </div>

            {/* Filter Section */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filters & Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Merchant UPI ID */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-1">
                      Merchant UPI ID <span className="text-destructive">*</span>
                    </Label>
                    <Popover open={merchantSearchOpen} onOpenChange={setMerchantSearchOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between text-left font-normal",
                            !selectedMerchant && "text-muted-foreground"
                          )}
                        >
                          {selectedMerchant || "Search & Select UPI ID"}
                          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0 bg-popover" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="Search Merchant UPI ID..." 
                            value={merchantSearch}
                            onValueChange={setMerchantSearch}
                          />
                          <CommandList>
                            <CommandEmpty>No merchant found.</CommandEmpty>
                            <CommandGroup>
                              {filteredMerchants.map((id) => (
                                <CommandItem
                                  key={id}
                                  value={id}
                                  onSelect={() => {
                                    setSelectedMerchant(id);
                                    setMerchantSearchOpen(false);
                                    setMerchantSearch('');
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedMerchant === id ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {id}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {durationOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom Date Range */}
                  {duration === 'custom' && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">From Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !fromDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {fromDate ? format(fromDate, "dd/MM/yyyy") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-popover" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={fromDate}
                              onSelect={setFromDate}
                              disabled={(date) => date > new Date()}
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
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !toDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {toDate ? format(toDate, "dd/MM/yyyy") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-popover" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={toDate}
                              onSelect={setToDate}
                              disabled={(date) => date > new Date() || (fromDate && date < fromDate)}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </>
                  )}

                  {/* Status Multi-Select */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Status</Label>
                    <Popover open={statusDropdownOpen} onOpenChange={setStatusDropdownOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between text-left font-normal"
                        >
                          <span className="truncate">
                            {selectedStatuses.length === 0
                              ? "All Statuses"
                              : `${selectedStatuses.length} selected`}
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-2 bg-popover" align="start">
                        <div className="space-y-2">
                          {statusOptions.map((status) => (
                            <div
                              key={status.value}
                              className="flex items-center space-x-2 cursor-pointer hover:bg-accent rounded p-2"
                              onClick={() => toggleStatus(status.value)}
                            >
                              <Checkbox
                                id={status.value}
                                checked={selectedStatuses.includes(status.value)}
                                onCheckedChange={() => toggleStatus(status.value)}
                              />
                              <Label htmlFor={status.value} className="cursor-pointer flex-1">
                                {status.label}
                              </Label>
                            </div>
                          ))}
                          {selectedStatuses.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full mt-2 text-destructive hover:text-destructive"
                              onClick={clearStatuses}
                            >
                              <X className="w-3 h-3 mr-1" />
                              Clear Selection
                            </Button>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Selected Status Chips */}
                {selectedStatuses.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedStatuses.map((status) => {
                      const statusConfig = statusOptions.find(s => s.value === status);
                      return (
                        <Badge
                          key={status}
                          variant="outline"
                          className={cn("cursor-pointer", statusConfig?.color)}
                          onClick={() => toggleStatus(status)}
                        >
                          {status}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      );
                    })}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-end pt-2 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedMerchant || isLoading}
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    Submit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    disabled={transactions.length === 0}
                    className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Summary Metrics */}
            <AnimatePresence>
              {hasSearched && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Total Transactions</p>
                          <p className="text-3xl font-bold text-foreground mt-1">{summary.totalCount.toLocaleString()}</p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                          <ArrowUpRight className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Total Amount</p>
                          <p className="text-3xl font-bold text-foreground mt-1 flex items-center">
                            <IndianRupee className="w-6 h-6" />
                            {summary.totalAmount.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                          <IndianRupee className="w-7 h-7 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transaction Table */}
            <AnimatePresence>
              {hasSearched && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Card className="border-border/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">Transaction Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                          <AlertTriangle className="w-12 h-12 mb-4 text-amber-500" />
                          <p className="text-lg font-medium">No transactions found</p>
                          <p className="text-sm">Try adjusting your filters</p>
                        </div>
                      ) : (
                        <>
                          <div className="overflow-x-auto border rounded-lg">
                            <Table className="min-w-full">
                              <TableHeader className="sticky top-0 bg-primary/10 backdrop-blur">
                                <TableRow className="border-b-2 border-primary/30">
                                  <TableHead className="font-bold text-foreground border-r border-border/50 whitespace-nowrap">Payee VPA</TableHead>
                                  <TableHead className="font-bold text-foreground border-r border-border/50 whitespace-nowrap">Date & Time</TableHead>
                                  <TableHead className="font-bold text-foreground border-r border-border/50 whitespace-nowrap">RRN</TableHead>
                                  <TableHead className="font-bold text-foreground border-r border-border/50 whitespace-nowrap text-right">Amount (₹)</TableHead>
                                  <TableHead className="font-bold text-foreground border-r border-border/50 whitespace-nowrap text-center">Status</TableHead>
                                  <TableHead className="font-bold text-foreground border-r border-border/50 whitespace-nowrap">Payer VPA</TableHead>
                                  <TableHead className="font-bold text-foreground border-r border-border/50 whitespace-nowrap">Payer Name</TableHead>
                                  <TableHead className="font-bold text-foreground border-r border-border/50 whitespace-nowrap">Remarks</TableHead>
                                  <TableHead className="font-bold text-foreground whitespace-nowrap text-center">Action</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {paginatedTransactions.map((txn, index) => (
                                  <motion.tr
                                    key={txn.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    className={cn(
                                      "border-b border-border/50 hover:bg-muted/50 transition-colors",
                                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                                    )}
                                  >
                                    <TableCell className="font-mono text-sm border-r border-border/30 py-3">{txn.payeeVpa}</TableCell>
                                    <TableCell className="text-sm border-r border-border/30 py-3">
                                      <div className="whitespace-nowrap">
                                        <p className="font-medium">{format(txn.dateTime, 'dd/MM/yyyy')}</p>
                                        <p className="text-xs text-muted-foreground">{format(txn.dateTime, 'HH:mm:ss')}</p>
                                      </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm border-r border-border/30 py-3">{txn.rrn}</TableCell>
                                    <TableCell className="text-right font-bold border-r border-border/30 py-3">
                                      <span className="flex items-center justify-end text-foreground">
                                        ₹{txn.amount.toLocaleString('en-IN')}
                                      </span>
                                    </TableCell>
                                    <TableCell className="border-r border-border/30 py-3 text-center">
                                      <StatusBadge status={txn.status} />
                                    </TableCell>
                                    <TableCell className="font-mono text-sm border-r border-border/30 py-3">{txn.payerVpa}</TableCell>
                                    <TableCell className="text-sm border-r border-border/30 py-3 font-medium">{txn.payerName}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground border-r border-border/30 py-3 max-w-[200px] truncate">{txn.remarks}</TableCell>
                                    <TableCell className="text-center py-3">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-popover">
                                          <DropdownMenuItem className="cursor-pointer">
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Details
                                          </DropdownMenuItem>
                                          <DropdownMenuItem 
                                            className="cursor-pointer"
                                            onClick={() => handleCopyRRN(txn.rrnFull)}
                                          >
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copy RRN
                                          </DropdownMenuItem>
                                          {txn.status === 'FAILURE' && (
                                            <DropdownMenuItem className="cursor-pointer text-destructive">
                                              <AlertTriangle className="w-4 h-4 mr-2" />
                                              Raise Complaint
                                            </DropdownMenuItem>
                                          )}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                  </motion.tr>
                                ))}
                              </TableBody>
                            </Table>
                          </div>

                          {/* Pagination */}
                          {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                              <p className="text-sm text-muted-foreground">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, transactions.length)} of {transactions.length} entries
                              </p>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                  disabled={currentPage === 1}
                                >
                                  Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                      pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                      pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                      pageNum = totalPages - 4 + i;
                                    } else {
                                      pageNum = currentPage - 2 + i;
                                    }
                                    return (
                                      <Button
                                        key={pageNum}
                                        variant={currentPage === pageNum ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(pageNum)}
                                        className="w-8 h-8 p-0"
                                      >
                                        {pageNum}
                                      </Button>
                                    );
                                  })}
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                  disabled={currentPage === totalPages}
                                >
                                  Next
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Initial state message */}
            {!hasSearched && (
              <Card className="border-dashed border-2 border-primary/20">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Search Transactions</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Select a Merchant UPI ID and apply filters to view transaction history
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
