import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  Pause,
  Play,
  XCircle,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  History,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Sample Sub-Merchant Data
const sampleSubMerchants = [
  {
    id: 'SM001',
    name: 'ABC Electronics Store',
    tradeName: 'ABC Electronics',
    mobile: '9876543210',
    email: 'abc@electronics.com',
    vpa: 'abcelectronics@canarabank',
    status: 'Active',
    createdDate: '2024-01-15',
    lastActive: '2024-12-26',
    dailyLimit: 100000,
    monthlyLimit: 2500000,
    address: '123 MG Road, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    totalTransactions: 1245,
    totalVolume: 1856000
  },
  {
    id: 'SM002',
    name: 'Quick Mart Groceries',
    tradeName: 'Quick Mart',
    mobile: '9876543211',
    email: 'quickmart@gmail.com',
    vpa: 'quickmart@canarabank',
    status: 'Active',
    createdDate: '2024-02-20',
    lastActive: '2024-12-25',
    dailyLimit: 75000,
    monthlyLimit: 1500000,
    address: '456 HSR Layout',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560102',
    totalTransactions: 856,
    totalVolume: 945000
  },
  {
    id: 'SM003',
    name: 'Fashion Hub Boutique',
    tradeName: 'Fashion Hub',
    mobile: '9876543212',
    email: 'fashionhub@store.com',
    vpa: 'fashionhub@canarabank',
    status: 'Suspended',
    createdDate: '2024-03-10',
    lastActive: '2024-11-15',
    dailyLimit: 50000,
    monthlyLimit: 1000000,
    address: '789 Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560038',
    totalTransactions: 423,
    totalVolume: 567000
  },
  {
    id: 'SM004',
    name: 'Tech Solutions Pvt Ltd',
    tradeName: 'Tech Solutions',
    mobile: '9876543213',
    email: 'tech@solutions.com',
    vpa: 'techsolutions@canarabank',
    status: 'Active',
    createdDate: '2024-04-05',
    lastActive: '2024-12-26',
    dailyLimit: 200000,
    monthlyLimit: 5000000,
    address: '321 Whitefield',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    totalTransactions: 2156,
    totalVolume: 4560000
  },
  {
    id: 'SM005',
    name: 'Fresh Foods Market',
    tradeName: 'Fresh Foods',
    mobile: '9876543214',
    email: 'freshfoods@market.com',
    vpa: 'freshfoods@canarabank',
    status: 'Revoked',
    createdDate: '2024-01-25',
    lastActive: '2024-08-10',
    dailyLimit: 0,
    monthlyLimit: 0,
    address: '654 Jayanagar',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560041',
    totalTransactions: 189,
    totalVolume: 234000
  }
];

// Sample Audit Trail Data
const sampleAuditLogs = [
  {
    id: 'AUD001',
    subMerchantName: 'ABC Electronics Store',
    subMerchantId: 'SM001',
    mobile: '9876543210',
    vpa: 'abcelectronics@canarabank',
    action: 'Created',
    description: 'Sub-merchant account created with initial limits',
    performedBy: 'MM001',
    timestamp: '2024-01-15 10:30:45',
    status: 'Success'
  },
  {
    id: 'AUD002',
    subMerchantName: 'Quick Mart Groceries',
    subMerchantId: 'SM002',
    mobile: '9876543211',
    vpa: 'quickmart@canarabank',
    action: 'Created',
    description: 'Sub-merchant account created with initial limits',
    performedBy: 'MM001',
    timestamp: '2024-02-20 14:22:10',
    status: 'Success'
  },
  {
    id: 'AUD003',
    subMerchantName: 'Fashion Hub Boutique',
    subMerchantId: 'SM003',
    mobile: '9876543212',
    vpa: 'fashionhub@canarabank',
    action: 'Created',
    description: 'Sub-merchant account created with initial limits',
    performedBy: 'MM001',
    timestamp: '2024-03-10 09:15:33',
    status: 'Success'
  },
  {
    id: 'AUD004',
    subMerchantName: 'Fashion Hub Boutique',
    subMerchantId: 'SM003',
    mobile: '9876543212',
    vpa: 'fashionhub@canarabank',
    action: 'Updated',
    description: 'Daily transaction limit updated from ₹30,000 to ₹50,000',
    performedBy: 'MM001',
    timestamp: '2024-05-22 11:45:20',
    status: 'Success'
  },
  {
    id: 'AUD005',
    subMerchantName: 'Fashion Hub Boutique',
    subMerchantId: 'SM003',
    mobile: '9876543212',
    vpa: 'fashionhub@canarabank',
    action: 'Suspended',
    description: 'Account suspended due to compliance review',
    performedBy: 'MM001',
    timestamp: '2024-11-15 16:30:00',
    status: 'Success'
  },
  {
    id: 'AUD006',
    subMerchantName: 'Tech Solutions Pvt Ltd',
    subMerchantId: 'SM004',
    mobile: '9876543213',
    vpa: 'techsolutions@canarabank',
    action: 'Created',
    description: 'Sub-merchant account created with initial limits',
    performedBy: 'MM001',
    timestamp: '2024-04-05 13:20:55',
    status: 'Success'
  },
  {
    id: 'AUD007',
    subMerchantName: 'Tech Solutions Pvt Ltd',
    subMerchantId: 'SM004',
    mobile: '9876543213',
    vpa: 'techsolutions@canarabank',
    action: 'Updated',
    description: 'Monthly limit increased to ₹50,00,000',
    performedBy: 'MM001',
    timestamp: '2024-08-15 10:10:10',
    status: 'Success'
  },
  {
    id: 'AUD008',
    subMerchantName: 'Fresh Foods Market',
    subMerchantId: 'SM005',
    mobile: '9876543214',
    vpa: 'freshfoods@canarabank',
    action: 'Created',
    description: 'Sub-merchant account created with initial limits',
    performedBy: 'MM001',
    timestamp: '2024-01-25 15:40:30',
    status: 'Success'
  },
  {
    id: 'AUD009',
    subMerchantName: 'Fresh Foods Market',
    subMerchantId: 'SM005',
    mobile: '9876543214',
    vpa: 'freshfoods@canarabank',
    action: 'Suspended',
    description: 'Account suspended for KYC re-verification',
    performedBy: 'MM001',
    timestamp: '2024-06-20 09:00:00',
    status: 'Success'
  },
  {
    id: 'AUD010',
    subMerchantName: 'Fresh Foods Market',
    subMerchantId: 'SM005',
    mobile: '9876543214',
    vpa: 'freshfoods@canarabank',
    action: 'Revoked',
    description: 'Account permanently revoked due to policy violations',
    performedBy: 'MM001',
    timestamp: '2024-08-10 14:25:45',
    status: 'Success'
  },
  {
    id: 'AUD011',
    subMerchantName: 'ABC Electronics Store',
    subMerchantId: 'SM001',
    mobile: '9876543210',
    vpa: 'abcelectronics@canarabank',
    action: 'Updated',
    description: 'Contact email updated',
    performedBy: 'MM001',
    timestamp: '2024-12-20 11:15:00',
    status: 'Success'
  },
  {
    id: 'AUD012',
    subMerchantName: 'Quick Mart Groceries',
    subMerchantId: 'SM002',
    mobile: '9876543211',
    vpa: 'quickmart@canarabank',
    action: 'Updated',
    description: 'Business address updated',
    performedBy: 'MM001',
    timestamp: '2024-12-22 16:45:30',
    status: 'Success'
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
    Active: { variant: 'default', icon: <CheckCircle className="h-3 w-3" /> },
    Suspended: { variant: 'secondary', icon: <AlertTriangle className="h-3 w-3" /> },
    Revoked: { variant: 'destructive', icon: <XCircle className="h-3 w-3" /> },
    Success: { variant: 'default', icon: <CheckCircle className="h-3 w-3" /> },
    Failed: { variant: 'destructive', icon: <XCircle className="h-3 w-3" /> }
  };

  const config = variants[status] || { variant: 'outline' as const, icon: null };

  return (
    <Badge variant={config.variant} className="gap-1">
      {config.icon}
      {status}
    </Badge>
  );
};

const ActionBadge = ({ action }: { action: string }) => {
  const colors: Record<string, string> = {
    Created: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    Updated: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    Suspended: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    Revoked: 'bg-red-500/10 text-red-600 border-red-500/20',
    Reactivated: 'bg-green-500/10 text-green-600 border-green-500/20'
  };

  return (
    <Badge variant="outline" className={colors[action] || ''}>
      {action}
    </Badge>
  );
};

export default function SubMerchantManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('list');
  
  // Sub-Merchant List State
  const [subMerchants, setSubMerchants] = useState(sampleSubMerchants);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubMerchant, setSelectedSubMerchant] = useState<typeof sampleSubMerchants[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: string; merchant: typeof sampleSubMerchants[0] | null }>({ type: '', merchant: null });
  
  // Audit Trail State
  const [auditLogs, setAuditLogs] = useState(sampleAuditLogs);
  const [auditSearchType, setAuditSearchType] = useState('all');
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditFromDate, setAuditFromDate] = useState('');
  const [auditToDate, setAuditToDate] = useState('');
  const [auditCurrentPage, setAuditCurrentPage] = useState(1);
  const auditItemsPerPage = 8;

  // Stats popup state
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [statsDialogType, setStatsDialogType] = useState<'total' | 'active' | 'suspended' | 'revoked'>('total');

  const getFilteredByStatus = (status: 'total' | 'active' | 'suspended' | 'revoked') => {
    if (status === 'total') return subMerchants;
    if (status === 'active') return subMerchants.filter(m => m.status === 'Active');
    if (status === 'suspended') return subMerchants.filter(m => m.status === 'Suspended');
    if (status === 'revoked') return subMerchants.filter(m => m.status === 'Revoked');
    return [];
  };

  const getStatsDialogTitle = () => {
    switch (statsDialogType) {
      case 'total': return 'All Sub-Merchants';
      case 'active': return 'Active Sub-Merchants';
      case 'suspended': return 'Suspended Sub-Merchants';
      case 'revoked': return 'Revoked Sub-Merchants';
    }
  };

  const handleStatsCardClick = (type: 'total' | 'active' | 'suspended' | 'revoked') => {
    setStatsDialogType(type);
    setShowStatsDialog(true);
  };

  // Create Form State
  const [newSubMerchant, setNewSubMerchant] = useState({
    name: '',
    tradeName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    dailyLimit: '',
    monthlyLimit: ''
  });

  // Filter Sub-Merchants
  const filteredSubMerchants = subMerchants.filter(merchant => {
    const matchesSearch = 
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.mobile.includes(searchQuery) ||
      merchant.vpa.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || merchant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter Audit Logs
  const filteredAuditLogs = auditLogs.filter(log => {
    let matchesSearch = true;
    if (auditSearchQuery) {
      switch (auditSearchType) {
        case 'mobile':
          matchesSearch = log.mobile.includes(auditSearchQuery);
          break;
        case 'vpa':
          matchesSearch = log.vpa.toLowerCase().includes(auditSearchQuery.toLowerCase());
          break;
        case 'subMerchantId':
          matchesSearch = log.subMerchantId.toLowerCase().includes(auditSearchQuery.toLowerCase());
          break;
        case 'action':
          matchesSearch = log.action.toLowerCase().includes(auditSearchQuery.toLowerCase());
          break;
        default:
          matchesSearch = 
            log.mobile.includes(auditSearchQuery) ||
            log.vpa.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
            log.subMerchantId.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
            log.subMerchantName.toLowerCase().includes(auditSearchQuery.toLowerCase());
      }
    }
    
    let matchesDate = true;
    if (auditFromDate || auditToDate) {
      const logDate = new Date(log.timestamp.split(' ')[0]);
      if (auditFromDate) {
        matchesDate = matchesDate && logDate >= new Date(auditFromDate);
      }
      if (auditToDate) {
        matchesDate = matchesDate && logDate <= new Date(auditToDate);
      }
    }
    
    return matchesSearch && matchesDate;
  });

  // Pagination for Audit Logs
  const totalAuditPages = Math.ceil(filteredAuditLogs.length / auditItemsPerPage);
  const paginatedAuditLogs = filteredAuditLogs.slice(
    (auditCurrentPage - 1) * auditItemsPerPage,
    auditCurrentPage * auditItemsPerPage
  );

  const handleCreateSubMerchant = () => {
    if (!newSubMerchant.name || !newSubMerchant.mobile || !newSubMerchant.email) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const newId = `SM${String(subMerchants.length + 1).padStart(3, '0')}`;
    const newVpa = `${newSubMerchant.tradeName.toLowerCase().replace(/\s+/g, '')}@canarabank`;
    
    const merchant = {
      id: newId,
      name: newSubMerchant.name,
      tradeName: newSubMerchant.tradeName || newSubMerchant.name,
      mobile: newSubMerchant.mobile,
      email: newSubMerchant.email,
      vpa: newVpa,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      dailyLimit: parseInt(newSubMerchant.dailyLimit) || 50000,
      monthlyLimit: parseInt(newSubMerchant.monthlyLimit) || 1000000,
      address: newSubMerchant.address,
      city: newSubMerchant.city,
      state: newSubMerchant.state,
      pincode: newSubMerchant.pincode,
      totalTransactions: 0,
      totalVolume: 0
    };

    setSubMerchants([...subMerchants, merchant]);
    
    // Add audit log
    const auditEntry = {
      id: `AUD${String(auditLogs.length + 1).padStart(3, '0')}`,
      subMerchantName: merchant.name,
      subMerchantId: merchant.id,
      mobile: merchant.mobile,
      vpa: merchant.vpa,
      action: 'Created',
      description: 'Sub-merchant account created with initial limits',
      performedBy: 'MM001',
      timestamp: new Date().toLocaleString('en-IN', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
      }).replace(/\//g, '-'),
      status: 'Success'
    };
    setAuditLogs([auditEntry, ...auditLogs]);

    setShowCreateForm(false);
    setNewSubMerchant({
      name: '', tradeName: '', mobile: '', email: '',
      address: '', city: '', state: '', pincode: '',
      dailyLimit: '', monthlyLimit: ''
    });

    toast({
      title: "Sub-Merchant Created",
      description: `${merchant.name} has been successfully created with ID: ${merchant.id}`,
    });
  };

  const handleAction = (type: string, merchant: typeof sampleSubMerchants[0]) => {
    setConfirmAction({ type, merchant });
    setShowConfirmDialog(true);
  };

  const executeAction = () => {
    if (!confirmAction.merchant) return;

    const { type, merchant } = confirmAction;
    let newStatus = merchant.status;
    let actionDescription = '';

    switch (type) {
      case 'suspend':
        newStatus = 'Suspended';
        actionDescription = 'Account suspended by Main Merchant';
        break;
      case 'reactivate':
        newStatus = 'Active';
        actionDescription = 'Account reactivated by Main Merchant';
        break;
      case 'revoke':
        newStatus = 'Revoked';
        actionDescription = 'Account permanently revoked by Main Merchant';
        break;
    }

    // Update sub-merchant status
    setSubMerchants(subMerchants.map(m => 
      m.id === merchant.id 
        ? { ...m, status: newStatus, dailyLimit: newStatus === 'Revoked' ? 0 : m.dailyLimit, monthlyLimit: newStatus === 'Revoked' ? 0 : m.monthlyLimit }
        : m
    ));

    // Add audit log
    const auditEntry = {
      id: `AUD${String(auditLogs.length + 1).padStart(3, '0')}`,
      subMerchantName: merchant.name,
      subMerchantId: merchant.id,
      mobile: merchant.mobile,
      vpa: merchant.vpa,
      action: type === 'suspend' ? 'Suspended' : type === 'reactivate' ? 'Reactivated' : 'Revoked',
      description: actionDescription,
      performedBy: 'MM001',
      timestamp: new Date().toLocaleString('en-IN', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
      }).replace(/\//g, '-'),
      status: 'Success'
    };
    setAuditLogs([auditEntry, ...auditLogs]);

    setShowConfirmDialog(false);
    setConfirmAction({ type: '', merchant: null });

    toast({
      title: "Action Completed",
      description: `${merchant.name} has been ${type === 'suspend' ? 'suspended' : type === 'reactivate' ? 'reactivated' : 'revoked'} successfully.`,
    });
  };

  const clearAuditFilters = () => {
    setAuditSearchType('all');
    setAuditSearchQuery('');
    setAuditFromDate('');
    setAuditToDate('');
    setAuditCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Sub-Merchant Management</h1>
                <p className="text-muted-foreground">Create, manage, and audit sub-merchant accounts</p>
              </div>
              <Button onClick={() => setShowCreateForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Sub-Merchant
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card 
                className="cursor-pointer bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/50 dark:border-amber-700/30 hover:shadow-md transition-shadow"
                onClick={() => handleStatsCardClick('total')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sub-Merchants</p>
                      <p className="text-2xl font-bold">{subMerchants.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card 
                className="cursor-pointer bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/50 dark:border-amber-700/30 hover:shadow-md transition-shadow"
                onClick={() => handleStatsCardClick('active')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active</p>
                      <p className="text-2xl font-bold">{subMerchants.filter(m => m.status === 'Active').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card 
                className="cursor-pointer bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/50 dark:border-amber-700/30 hover:shadow-md transition-shadow"
                onClick={() => handleStatsCardClick('suspended')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Suspended</p>
                      <p className="text-2xl font-bold">{subMerchants.filter(m => m.status === 'Suspended').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card 
                className="cursor-pointer bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/50 dark:border-amber-700/30 hover:shadow-md transition-shadow"
                onClick={() => handleStatsCardClick('revoked')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <XCircle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revoked</p>
                      <p className="text-2xl font-bold">{subMerchants.filter(m => m.status === 'Revoked').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="list" className="gap-2">
                  <Users className="h-4 w-4" />
                  Sub-Merchant List
                </TabsTrigger>
                <TabsTrigger value="audit" className="gap-2">
                  <History className="h-4 w-4" />
                  Audit Trail Logs
                </TabsTrigger>
              </TabsList>

              {/* Sub-Merchant List Tab */}
              <TabsContent value="list">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle>Sub-Merchant List</CardTitle>
                        <CardDescription>Manage all your sub-merchant accounts</CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search by name, ID, mobile, VPA..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-64"
                          />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-36">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Suspended">Suspended</SelectItem>
                            <SelectItem value="Revoked">Revoked</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sub-Merchant ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Mobile</TableHead>
                          <TableHead>VPA</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Daily Limit</TableHead>
                          <TableHead>Created Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubMerchants.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No sub-merchants found matching your criteria
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredSubMerchants.map((merchant) => (
                            <TableRow key={merchant.id}>
                              <TableCell className="font-medium">{merchant.id}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{merchant.tradeName}</p>
                                  <p className="text-xs text-muted-foreground">{merchant.name}</p>
                                </div>
                              </TableCell>
                              <TableCell>{merchant.mobile.slice(0, 4)}****{merchant.mobile.slice(-2)}</TableCell>
                              <TableCell className="font-mono text-sm">{merchant.vpa}</TableCell>
                              <TableCell><StatusBadge status={merchant.status} /></TableCell>
                              <TableCell>₹{merchant.dailyLimit.toLocaleString()}</TableCell>
                              <TableCell>{merchant.createdDate}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-popover">
                                    <DropdownMenuItem onClick={() => { setSelectedSubMerchant(merchant); setShowDetails(true); }}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {merchant.status === 'Active' && (
                                      <DropdownMenuItem 
                                        onClick={() => handleAction('suspend', merchant)}
                                        className="text-amber-600"
                                      >
                                        <Pause className="h-4 w-4 mr-2" />
                                        Suspend
                                      </DropdownMenuItem>
                                    )}
                                    {merchant.status === 'Suspended' && (
                                      <>
                                        <DropdownMenuItem 
                                          onClick={() => handleAction('reactivate', merchant)}
                                          className="text-emerald-600"
                                        >
                                          <Play className="h-4 w-4 mr-2" />
                                          Reactivate
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          onClick={() => handleAction('revoke', merchant)}
                                          className="text-destructive"
                                        >
                                          <XCircle className="h-4 w-4 mr-2" />
                                          Revoke Permanently
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                    {merchant.status === 'Revoked' && (
                                      <DropdownMenuItem disabled className="text-muted-foreground">
                                        <XCircle className="h-4 w-4 mr-2" />
                                        No actions available
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Audit Trail Tab */}
              <TabsContent value="audit">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Trail Logs</CardTitle>
                    <CardDescription>Search and review all sub-merchant related activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Search & Filter Panel */}
                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <Label className="text-sm mb-2 block">Search By</Label>
                          <Select value={auditSearchType} onValueChange={setAuditSearchType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Fields</SelectItem>
                              <SelectItem value="mobile">Mobile Number</SelectItem>
                              <SelectItem value="vpa">VPA</SelectItem>
                              <SelectItem value="subMerchantId">Sub-Merchant ID</SelectItem>
                              <SelectItem value="action">Action Type</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm mb-2 block">Search Input</Label>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter search term..."
                              value={auditSearchQuery}
                              onChange={(e) => { setAuditSearchQuery(e.target.value); setAuditCurrentPage(1); }}
                              className="pl-9"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm mb-2 block">From Date</Label>
                          <Input
                            type="date"
                            value={auditFromDate}
                            onChange={(e) => { setAuditFromDate(e.target.value); setAuditCurrentPage(1); }}
                          />
                        </div>
                        <div>
                          <Label className="text-sm mb-2 block">To Date</Label>
                          <Input
                            type="date"
                            value={auditToDate}
                            onChange={(e) => { setAuditToDate(e.target.value); setAuditCurrentPage(1); }}
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <Button variant="outline" onClick={clearAuditFilters} className="flex-1">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Clear
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Audit Log Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Audit ID</TableHead>
                          <TableHead>Sub-Merchant</TableHead>
                          <TableHead>Mobile</TableHead>
                          <TableHead>VPA</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Performed By</TableHead>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              Date & Time
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedAuditLogs.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-12">
                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <FileText className="h-8 w-8" />
                                <p className="font-medium">No audit records found</p>
                                <p className="text-sm">No audit records found for the selected criteria.</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedAuditLogs.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell className="font-mono text-sm">{log.id}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{log.subMerchantName}</p>
                                  <p className="text-xs text-muted-foreground">{log.subMerchantId}</p>
                                </div>
                              </TableCell>
                              <TableCell>{log.mobile.slice(0, 4)}****{log.mobile.slice(-2)}</TableCell>
                              <TableCell className="font-mono text-xs">{log.vpa}</TableCell>
                              <TableCell><ActionBadge action={log.action} /></TableCell>
                              <TableCell className="max-w-48 truncate" title={log.description}>
                                {log.description}
                              </TableCell>
                              <TableCell className="font-mono text-sm">{log.performedBy}</TableCell>
                              <TableCell className="text-sm">{log.timestamp}</TableCell>
                              <TableCell><StatusBadge status={log.status} /></TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>

                    {/* Pagination */}
                    {filteredAuditLogs.length > auditItemsPerPage && (
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          Showing {((auditCurrentPage - 1) * auditItemsPerPage) + 1} to {Math.min(auditCurrentPage * auditItemsPerPage, filteredAuditLogs.length)} of {filteredAuditLogs.length} records
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAuditCurrentPage(p => Math.max(1, p - 1))}
                            disabled={auditCurrentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                          </Button>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: totalAuditPages }, (_, i) => i + 1).map(page => (
                              <Button
                                key={page}
                                variant={auditCurrentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setAuditCurrentPage(page)}
                                className="w-8"
                              >
                                {page}
                              </Button>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAuditCurrentPage(p => Math.min(totalAuditPages, p + 1))}
                            disabled={auditCurrentPage === totalAuditPages}
                          >
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>

      {/* Create Sub-Merchant Sheet */}
      <Sheet open={showCreateForm} onOpenChange={setShowCreateForm}>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Add New Sub-Merchant</SheetTitle>
            <SheetDescription>Create a new sub-merchant under your main merchant account</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Business Information</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Legal Name *</Label>
                    <Input
                      placeholder="Enter legal business name"
                      value={newSubMerchant.name}
                      onChange={(e) => setNewSubMerchant({ ...newSubMerchant, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Trade / Display Name</Label>
                    <Input
                      placeholder="Enter display name"
                      value={newSubMerchant.tradeName}
                      onChange={(e) => setNewSubMerchant({ ...newSubMerchant, tradeName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Contact Details</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Mobile Number *</Label>
                    <Input
                      placeholder="Enter 10-digit mobile number"
                      value={newSubMerchant.mobile}
                      onChange={(e) => setNewSubMerchant({ ...newSubMerchant, mobile: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Email ID *</Label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={newSubMerchant.email}
                      onChange={(e) => setNewSubMerchant({ ...newSubMerchant, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Business Address</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Address</Label>
                    <Textarea
                      placeholder="Enter business address"
                      value={newSubMerchant.address}
                      onChange={(e) => setNewSubMerchant({ ...newSubMerchant, address: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>City</Label>
                      <Input
                        placeholder="City"
                        value={newSubMerchant.city}
                        onChange={(e) => setNewSubMerchant({ ...newSubMerchant, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        placeholder="State"
                        value={newSubMerchant.state}
                        onChange={(e) => setNewSubMerchant({ ...newSubMerchant, state: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>PIN Code</Label>
                    <Input
                      placeholder="Enter 6-digit PIN"
                      value={newSubMerchant.pincode}
                      onChange={(e) => setNewSubMerchant({ ...newSubMerchant, pincode: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Transaction Limits</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Daily Limit (₹)</Label>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={newSubMerchant.dailyLimit}
                      onChange={(e) => setNewSubMerchant({ ...newSubMerchant, dailyLimit: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Monthly Limit (₹)</Label>
                    <Input
                      type="number"
                      placeholder="1000000"
                      value={newSubMerchant.monthlyLimit}
                      onChange={(e) => setNewSubMerchant({ ...newSubMerchant, monthlyLimit: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreateForm(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateSubMerchant} className="flex-1">
                  Create Sub-Merchant
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Sub-Merchant Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sub-Merchant Details</DialogTitle>
            <DialogDescription>Complete information for {selectedSubMerchant?.tradeName}</DialogDescription>
          </DialogHeader>
          {selectedSubMerchant && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedSubMerchant.tradeName}</h3>
                    <p className="text-sm text-muted-foreground">{selectedSubMerchant.name}</p>
                  </div>
                </div>
                <StatusBadge status={selectedSubMerchant.status} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Identifiers
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sub-Merchant ID</span>
                      <span className="font-mono">{selectedSubMerchant.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">VPA</span>
                      <span className="font-mono">{selectedSubMerchant.vpa}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mobile</span>
                      <span>{selectedSubMerchant.mobile}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{selectedSubMerchant.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>{selectedSubMerchant.address}</p>
                    <p>{selectedSubMerchant.city}, {selectedSubMerchant.state} - {selectedSubMerchant.pincode}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Timeline
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span>{selectedSubMerchant.createdDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Active</span>
                      <span>{selectedSubMerchant.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">Transaction Limits</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Limit</span>
                      <span className="font-semibold">₹{selectedSubMerchant.dailyLimit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Limit</span>
                      <span className="font-semibold">₹{selectedSubMerchant.monthlyLimit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Transactions</span>
                      <span className="font-semibold">{selectedSubMerchant.totalTransactions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Volume</span>
                      <span className="font-semibold">₹{selectedSubMerchant.totalVolume.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction.type === 'suspend' && 'Suspend Sub-Merchant'}
              {confirmAction.type === 'reactivate' && 'Reactivate Sub-Merchant'}
              {confirmAction.type === 'revoke' && 'Revoke Sub-Merchant'}
            </DialogTitle>
            <DialogDescription>
              {confirmAction.type === 'suspend' && `Are you sure you want to suspend ${confirmAction.merchant?.tradeName}? They will not be able to process transactions until reactivated.`}
              {confirmAction.type === 'reactivate' && `Are you sure you want to reactivate ${confirmAction.merchant?.tradeName}? They will be able to resume processing transactions.`}
              {confirmAction.type === 'revoke' && `Are you sure you want to permanently revoke ${confirmAction.merchant?.tradeName}? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button 
              variant={confirmAction.type === 'revoke' ? 'destructive' : 'default'}
              onClick={executeAction}
            >
              {confirmAction.type === 'suspend' && 'Suspend'}
              {confirmAction.type === 'reactivate' && 'Reactivate'}
              {confirmAction.type === 'revoke' && 'Revoke Permanently'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Details Dialog */}
      <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{getStatsDialogTitle()}</DialogTitle>
            <DialogDescription>
              Showing {getFilteredByStatus(statsDialogType).length} sub-merchant(s)
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[50vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>VPA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredByStatus(statsDialogType).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No sub-merchants found in this category
                    </TableCell>
                  </TableRow>
                ) : (
                  getFilteredByStatus(statsDialogType).map((merchant) => (
                    <TableRow key={merchant.id}>
                      <TableCell className="font-medium">{merchant.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{merchant.tradeName}</p>
                          <p className="text-xs text-muted-foreground">{merchant.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>{merchant.mobile.slice(0, 4)}****{merchant.mobile.slice(-2)}</TableCell>
                      <TableCell className="font-mono text-sm">{merchant.vpa}</TableCell>
                      <TableCell><StatusBadge status={merchant.status} /></TableCell>
                      <TableCell>{merchant.createdDate}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
