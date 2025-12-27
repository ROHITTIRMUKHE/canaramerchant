import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCcw,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Upload,
  X,
  MessageSquare,
  ArrowRight,
  Calendar,
  ChevronDown,
  RotateCcw,
  ThumbsUp,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

// Sample refund data
const sampleRefunds = [
  {
    id: 'REF20250401001',
    transactionId: 'TXN123456789',
    rrn: '412345678901',
    transactionDate: '01/04/2025',
    transactionAmount: 5000,
    refundType: 'Full',
    refundAmount: 5000,
    status: 'Completed',
    reason: 'Order Cancelled',
    customerRef: 'XXXX1234',
    initiatedDate: '02/04/2025',
    completedDate: '02/04/2025',
    remarks: 'Customer requested cancellation'
  },
  {
    id: 'REF20250402002',
    transactionId: 'TXN123456790',
    rrn: '412345678902',
    transactionDate: '02/04/2025',
    transactionAmount: 12000,
    refundType: 'Partial',
    refundAmount: 3500,
    status: 'In Progress',
    reason: 'Service Not Delivered',
    customerRef: 'XXXX5678',
    initiatedDate: '03/04/2025',
    completedDate: null,
    remarks: 'Partial service delivered'
  },
  {
    id: 'REF20250403003',
    transactionId: 'TXN123456791',
    rrn: '412345678903',
    transactionDate: '03/04/2025',
    transactionAmount: 2500,
    refundType: 'Full',
    refundAmount: 2500,
    status: 'Initiated',
    reason: 'Duplicate Payment',
    customerRef: 'XXXX9012',
    initiatedDate: '04/04/2025',
    completedDate: null,
    remarks: 'Customer paid twice'
  },
  {
    id: 'REF20250404004',
    transactionId: 'TXN123456792',
    rrn: '412345678904',
    transactionDate: '04/04/2025',
    transactionAmount: 8500,
    refundType: 'Full',
    refundAmount: 8500,
    status: 'Failed',
    reason: 'Order Cancelled',
    customerRef: 'XXXX3456',
    initiatedDate: '05/04/2025',
    completedDate: null,
    remarks: 'Bank account closed',
    failureReason: 'Beneficiary account inactive'
  },
  {
    id: 'REF20250405005',
    transactionId: 'TXN123456793',
    rrn: '412345678905',
    transactionDate: '05/04/2025',
    transactionAmount: 15000,
    refundType: 'Partial',
    refundAmount: 7500,
    status: 'Completed',
    reason: 'Other',
    customerRef: 'XXXX7890',
    initiatedDate: '06/04/2025',
    completedDate: '06/04/2025',
    remarks: 'Goodwill refund'
  }
];

// Sample dispute data
const sampleDisputes = [
  {
    id: 'DSP20250401001',
    transactionId: 'TXN987654321',
    rrn: '512345678901',
    transactionDate: '01/04/2025',
    amount: 25000,
    reason: 'Transaction Debited but Not Credited',
    status: 'Under Investigation',
    raisedDate: '02/04/2025',
    slaRemaining: '3 days',
    merchantUpiId: 'merchant@canarabank',
    description: 'Customer payment debited but amount not credited to settlement account',
    documents: ['bank_statement.pdf'],
    timeline: [
      { date: '02/04/2025 10:30', action: 'Dispute Raised', by: 'Merchant' },
      { date: '02/04/2025 11:00', action: 'Acknowledged', by: 'Canara Bank' },
      { date: '03/04/2025 09:15', action: 'Under Investigation', by: 'NPCI' }
    ],
    communications: [
      { date: '02/04/2025 11:00', from: 'Bank', message: 'Your dispute has been acknowledged. We are investigating.' },
      { date: '03/04/2025 09:30', from: 'Bank', message: 'Case escalated to NPCI for resolution.' }
    ]
  },
  {
    id: 'DSP20250402002',
    transactionId: 'TXN987654322',
    rrn: '512345678902',
    transactionDate: '02/04/2025',
    amount: 18500,
    reason: 'Settlement Delay',
    status: 'Awaiting Merchant Input',
    raisedDate: '04/04/2025',
    slaRemaining: '1 day',
    merchantUpiId: 'merchant@canarabank',
    description: 'Settlement for T+1 cycle not received',
    documents: [],
    timeline: [
      { date: '04/04/2025 14:20', action: 'Dispute Raised', by: 'Merchant' },
      { date: '04/04/2025 15:00', action: 'Acknowledged', by: 'Canara Bank' },
      { date: '05/04/2025 10:00', action: 'Additional Info Required', by: 'Bank' }
    ],
    communications: [
      { date: '05/04/2025 10:00', from: 'Bank', message: 'Please provide your settlement account statement for the date range.' }
    ]
  },
  {
    id: 'DSP20250403003',
    transactionId: 'TXN987654323',
    rrn: '512345678903',
    transactionDate: '03/04/2025',
    amount: 5200,
    reason: 'Amount Mismatch',
    status: 'Resolved',
    raisedDate: '04/04/2025',
    slaRemaining: '-',
    merchantUpiId: 'merchant@canarabank',
    description: 'Transaction amount ₹5,200 but only ₹5,000 credited',
    documents: ['screenshot.png'],
    timeline: [
      { date: '04/04/2025 09:00', action: 'Dispute Raised', by: 'Merchant' },
      { date: '04/04/2025 09:30', action: 'Acknowledged', by: 'Canara Bank' },
      { date: '05/04/2025 14:00', action: 'Resolved', by: 'Bank' }
    ],
    communications: [
      { date: '05/04/2025 14:00', from: 'Bank', message: 'The difference of ₹200 has been credited to your account. Platform fee was deducted as per agreement.' }
    ],
    resolution: 'Amount difference was platform fee. Credited ₹200 as goodwill.'
  },
  {
    id: 'DSP20250404004',
    transactionId: 'TXN987654324',
    rrn: '512345678904',
    transactionDate: '04/04/2025',
    amount: 42000,
    reason: 'Technical Failure',
    status: 'Raised',
    raisedDate: '05/04/2025',
    slaRemaining: '5 days',
    merchantUpiId: 'merchant@canarabank',
    description: 'Payment gateway timeout but customer was debited',
    documents: ['gateway_logs.pdf'],
    timeline: [
      { date: '05/04/2025 16:45', action: 'Dispute Raised', by: 'Merchant' }
    ],
    communications: []
  },
  {
    id: 'DSP20250405005',
    transactionId: 'TXN987654325',
    rrn: '512345678905',
    transactionDate: '28/03/2025',
    amount: 75000,
    reason: 'Transaction Debited but Not Credited',
    status: 'Closed',
    raisedDate: '29/03/2025',
    slaRemaining: '-',
    merchantUpiId: 'merchant@canarabank',
    description: 'Large transaction not credited for 3 days',
    documents: ['statement.pdf', 'transaction_proof.png'],
    timeline: [
      { date: '29/03/2025 10:00', action: 'Dispute Raised', by: 'Merchant' },
      { date: '29/03/2025 10:30', action: 'Acknowledged', by: 'Canara Bank' },
      { date: '30/03/2025 09:00', action: 'Under Investigation', by: 'NPCI' },
      { date: '01/04/2025 15:00', action: 'Resolved', by: 'NPCI' },
      { date: '01/04/2025 16:00', action: 'Closed', by: 'Merchant' }
    ],
    communications: [
      { date: '01/04/2025 15:00', from: 'Bank', message: 'Amount has been credited to your settlement account.' }
    ],
    resolution: 'Full amount credited. Issue was with NPCI settlement batch.'
  }
];

// Sample transaction for refund initiation
const sampleTransactionForRefund = {
  transactionId: 'TXN123456794',
  rrn: '412345678906',
  transactionDate: '06/04/2025',
  transactionTime: '14:32:45',
  amount: 10000,
  customerRef: 'XXXX4567',
  customerVpa: 'customer@okaxis',
  merchantUpiId: 'merchant@canarabank'
};

const RefundsDisputes = () => {
  const [activeTab, setActiveTab] = useState('refunds');
  const [refundStatusFilter, setRefundStatusFilter] = useState('all');
  const [disputeStatusFilter, setDisputeStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refund states
  const [showInitiateRefund, setShowInitiateRefund] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<typeof sampleRefunds[0] | null>(null);
  const [refundForm, setRefundForm] = useState({
    refundType: 'Full',
    refundAmount: sampleTransactionForRefund.amount,
    reason: '',
    remarks: ''
  });
  
  // Dispute states
  const [showRaiseDispute, setShowRaiseDispute] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<typeof sampleDisputes[0] | null>(null);
  const [disputeForm, setDisputeForm] = useState({
    reason: '',
    description: '',
    documents: [] as string[]
  });
  const [merchantResponse, setMerchantResponse] = useState('');

  const getRefundStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Initiated': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      'In Progress': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      'Completed': 'bg-green-500/10 text-green-600 border-green-500/20',
      'Failed': 'bg-red-500/10 text-red-600 border-red-500/20'
    };
    return styles[status] || 'bg-muted text-muted-foreground';
  };

  const getDisputeStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Raised': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      'Acknowledged': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      'Under Investigation': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      'Awaiting Merchant Input': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      'Resolved': 'bg-green-500/10 text-green-600 border-green-500/20',
      'Closed': 'bg-muted text-muted-foreground border-muted'
    };
    return styles[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Initiated': <Clock className="h-3 w-3" />,
      'In Progress': <RefreshCcw className="h-3 w-3 animate-spin" />,
      'Completed': <CheckCircle2 className="h-3 w-3" />,
      'Failed': <XCircle className="h-3 w-3" />,
      'Raised': <AlertCircle className="h-3 w-3" />,
      'Acknowledged': <CheckCircle2 className="h-3 w-3" />,
      'Under Investigation': <Search className="h-3 w-3" />,
      'Awaiting Merchant Input': <MessageSquare className="h-3 w-3" />,
      'Resolved': <ThumbsUp className="h-3 w-3" />,
      'Closed': <CheckCircle2 className="h-3 w-3" />
    };
    return icons[status] || <Clock className="h-3 w-3" />;
  };

  const filteredRefunds = sampleRefunds.filter(refund => {
    const matchesStatus = refundStatusFilter === 'all' || refund.status === refundStatusFilter;
    const matchesSearch = searchQuery === '' || 
      refund.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredDisputes = sampleDisputes.filter(dispute => {
    const matchesStatus = disputeStatusFilter === 'all' || dispute.status === disputeStatusFilter;
    const matchesSearch = searchQuery === '' || 
      dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleInitiateRefund = () => {
    if (!refundForm.reason) {
      toast({
        title: "Validation Error",
        description: "Please select a refund reason",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Refund Initiated",
      description: `Refund Reference: REF${Date.now().toString().slice(-10)}`,
    });
    setShowInitiateRefund(false);
    setRefundForm({
      refundType: 'Full',
      refundAmount: sampleTransactionForRefund.amount,
      reason: '',
      remarks: ''
    });
  };

  const handleRaiseDispute = () => {
    if (!disputeForm.reason || !disputeForm.description) {
      toast({
        title: "Validation Error",
        description: "Please fill all mandatory fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Dispute Raised",
      description: `Dispute Reference: DSP${Date.now().toString().slice(-10)}`,
    });
    setShowRaiseDispute(false);
    setDisputeForm({
      reason: '',
      description: '',
      documents: []
    });
  };

  const handleRetryRefund = (refundId: string) => {
    toast({
      title: "Refund Retry Initiated",
      description: `Retry initiated for ${refundId}`,
    });
  };

  const handleAcceptResolution = (disputeId: string) => {
    toast({
      title: "Resolution Accepted",
      description: `Dispute ${disputeId} has been closed`,
    });
  };

  const handleEscalateDispute = (disputeId: string) => {
    toast({
      title: "Dispute Escalated",
      description: `Dispute ${disputeId} has been escalated to senior management`,
    });
  };

  const handleSubmitMerchantResponse = () => {
    if (!merchantResponse.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your response",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Response Submitted",
      description: "Your response has been sent to the bank",
    });
    setMerchantResponse('');
  };

  // Stats calculations
  const refundStats = {
    total: sampleRefunds.length,
    completed: sampleRefunds.filter(r => r.status === 'Completed').length,
    pending: sampleRefunds.filter(r => ['Initiated', 'In Progress'].includes(r.status)).length,
    failed: sampleRefunds.filter(r => r.status === 'Failed').length,
    totalAmount: sampleRefunds.filter(r => r.status === 'Completed').reduce((sum, r) => sum + r.refundAmount, 0)
  };

  const disputeStats = {
    total: sampleDisputes.length,
    open: sampleDisputes.filter(d => !['Resolved', 'Closed'].includes(d.status)).length,
    resolved: sampleDisputes.filter(d => d.status === 'Resolved').length,
    closed: sampleDisputes.filter(d => d.status === 'Closed').length,
    awaitingInput: sampleDisputes.filter(d => d.status === 'Awaiting Merchant Input').length
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Refunds & Disputes</h1>
              <p className="text-muted-foreground mt-1">Manage refunds and resolve transaction disputes</p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
              Online Merchant
            </Badge>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="refunds" className="flex items-center gap-2">
                <RefreshCcw className="h-4 w-4" />
                Refunds
              </TabsTrigger>
              <TabsTrigger value="disputes" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Disputes
              </TabsTrigger>
            </TabsList>

            {/* Refunds Tab */}
            <TabsContent value="refunds" className="space-y-6">
              {/* Refund Stats */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{refundStats.total}</p>
                      <p className="text-sm text-muted-foreground">Total Refunds</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{refundStats.completed}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{refundStats.pending}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{refundStats.failed}</p>
                      <p className="text-sm text-muted-foreground">Failed</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">₹{refundStats.totalAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Refunded</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by Refund ID or Transaction ID..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={refundStatusFilter} onValueChange={setRefundStatusFilter}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Initiated">Initiated</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => setShowInitiateRefund(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Initiate Refund
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Refunds Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Refund Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Refund Reference ID</TableHead>
                          <TableHead>Transaction ID / RRN</TableHead>
                          <TableHead>Transaction Date</TableHead>
                          <TableHead>Refund Type</TableHead>
                          <TableHead className="text-right">Refund Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRefunds.map((refund) => (
                          <TableRow key={refund.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium">{refund.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{refund.transactionId}</p>
                                <p className="text-xs text-muted-foreground">{refund.rrn}</p>
                              </div>
                            </TableCell>
                            <TableCell>{refund.transactionDate}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={
                                refund.refundType === 'Full' 
                                  ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' 
                                  : 'bg-purple-500/10 text-purple-600 border-purple-500/20'
                              }>
                                {refund.refundType}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ₹{refund.refundAmount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`${getRefundStatusBadge(refund.status)} flex items-center gap-1 w-fit`}>
                                {getStatusIcon(refund.status)}
                                {refund.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedRefund(refund)}
                                  className="gap-1"
                                >
                                  <Eye className="h-4 w-4" />
                                  View
                                </Button>
                                {refund.status === 'Failed' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleRetryRefund(refund.id)}
                                    className="gap-1 text-yellow-600 hover:text-yellow-700"
                                  >
                                    <RotateCcw className="h-4 w-4" />
                                    Retry
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Disputes Tab */}
            <TabsContent value="disputes" className="space-y-6">
              {/* Dispute Stats */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{disputeStats.total}</p>
                      <p className="text-sm text-muted-foreground">Total Disputes</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{disputeStats.open}</p>
                      <p className="text-sm text-muted-foreground">Open</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{disputeStats.awaitingInput}</p>
                      <p className="text-sm text-muted-foreground">Awaiting Input</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{disputeStats.resolved}</p>
                      <p className="text-sm text-muted-foreground">Resolved</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-muted-foreground">{disputeStats.closed}</p>
                      <p className="text-sm text-muted-foreground">Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by Dispute ID or Transaction ID..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={disputeStatusFilter} onValueChange={setDisputeStatusFilter}>
                        <SelectTrigger className="w-56">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Raised">Raised</SelectItem>
                          <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                          <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                          <SelectItem value="Awaiting Merchant Input">Awaiting Merchant Input</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => setShowRaiseDispute(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Raise Dispute
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Disputes Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Dispute Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Dispute Reference ID</TableHead>
                          <TableHead>Transaction ID / RRN</TableHead>
                          <TableHead>Transaction Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Dispute Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>SLA Remaining</TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDisputes.map((dispute) => (
                          <TableRow key={dispute.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium">{dispute.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{dispute.transactionId}</p>
                                <p className="text-xs text-muted-foreground">{dispute.rrn}</p>
                              </div>
                            </TableCell>
                            <TableCell>{dispute.transactionDate}</TableCell>
                            <TableCell className="text-right font-medium">
                              ₹{dispute.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{dispute.reason}</span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`${getDisputeStatusBadge(dispute.status)} flex items-center gap-1 w-fit`}>
                                {getStatusIcon(dispute.status)}
                                {dispute.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={
                                dispute.slaRemaining === '-' 
                                  ? 'text-muted-foreground' 
                                  : dispute.slaRemaining.includes('1') 
                                    ? 'text-red-600 font-medium' 
                                    : 'text-yellow-600'
                              }>
                                {dispute.slaRemaining}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedDispute(dispute)}
                                className="gap-1"
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Initiate Refund Sheet */}
      <Sheet open={showInitiateRefund} onOpenChange={setShowInitiateRefund}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <RefreshCcw className="h-5 w-5" />
              Initiate Refund
            </SheetTitle>
            <SheetDescription>
              Process a refund for the selected transaction
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-180px)] mt-6">
            <div className="space-y-6 pr-4">
              {/* Transaction Details - Read Only */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Transaction Details</h4>
                <Card className="bg-muted/30">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transaction ID</span>
                      <span className="text-sm font-medium">{sampleTransactionForRefund.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">RRN</span>
                      <span className="text-sm font-medium">{sampleTransactionForRefund.rrn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date & Time</span>
                      <span className="text-sm font-medium">{sampleTransactionForRefund.transactionDate} {sampleTransactionForRefund.transactionTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount</span>
                      <span className="text-sm font-bold">₹{sampleTransactionForRefund.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Customer Reference</span>
                      <span className="text-sm font-medium">{sampleTransactionForRefund.customerRef}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Refund Details - Editable */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Refund Details</h4>
                
                <div className="space-y-2">
                  <Label>Refund Type *</Label>
                  <Select 
                    value={refundForm.refundType} 
                    onValueChange={(value) => {
                      setRefundForm(prev => ({
                        ...prev,
                        refundType: value,
                        refundAmount: value === 'Full' ? sampleTransactionForRefund.amount : prev.refundAmount
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full">Full Refund</SelectItem>
                      <SelectItem value="Partial">Partial Refund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Refund Amount *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={refundForm.refundAmount}
                      onChange={(e) => setRefundForm(prev => ({ ...prev, refundAmount: Number(e.target.value) }))}
                      disabled={refundForm.refundType === 'Full'}
                      className="pl-8"
                      max={sampleTransactionForRefund.amount}
                    />
                  </div>
                  {refundForm.refundType === 'Partial' && (
                    <p className="text-xs text-muted-foreground">
                      Maximum refundable: ₹{sampleTransactionForRefund.amount.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Refund Reason *</Label>
                  <Select value={refundForm.reason} onValueChange={(value) => setRefundForm(prev => ({ ...prev, reason: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Service Not Delivered">Service Not Delivered</SelectItem>
                      <SelectItem value="Order Cancelled">Order Cancelled</SelectItem>
                      <SelectItem value="Duplicate Payment">Duplicate Payment</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Remarks (Optional)</Label>
                  <Textarea
                    placeholder="Additional notes for this refund..."
                    value={refundForm.remarks}
                    onChange={(e) => setRefundForm(prev => ({ ...prev, remarks: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowInitiateRefund(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleInitiateRefund}>
                  Submit Refund
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Raise Dispute Sheet */}
      <Sheet open={showRaiseDispute} onOpenChange={setShowRaiseDispute}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Raise Dispute
            </SheetTitle>
            <SheetDescription>
              Report an issue with a transaction
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-180px)] mt-6">
            <div className="space-y-6 pr-4">
              {/* Transaction Details - Read Only */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Transaction Details</h4>
                <Card className="bg-muted/30">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transaction ID</span>
                      <span className="text-sm font-medium">{sampleTransactionForRefund.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">RRN</span>
                      <span className="text-sm font-medium">{sampleTransactionForRefund.rrn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date</span>
                      <span className="text-sm font-medium">{sampleTransactionForRefund.transactionDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount</span>
                      <span className="text-sm font-bold">₹{sampleTransactionForRefund.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Merchant UPI ID</span>
                      <span className="text-sm font-medium">{sampleTransactionForRefund.merchantUpiId}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Dispute Details - Editable */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Dispute Details</h4>
                
                <div className="space-y-2">
                  <Label>Dispute Reason *</Label>
                  <Select value={disputeForm.reason} onValueChange={(value) => setDisputeForm(prev => ({ ...prev, reason: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Transaction Debited but Not Credited">Transaction Debited but Not Credited</SelectItem>
                      <SelectItem value="Settlement Delay">Settlement Delay</SelectItem>
                      <SelectItem value="Amount Mismatch">Amount Mismatch</SelectItem>
                      <SelectItem value="Technical Failure">Technical Failure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    placeholder="Describe the issue in detail..."
                    value={disputeForm.description}
                    onChange={(e) => setDisputeForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Supporting Documents (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowRaiseDispute(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleRaiseDispute}>
                  Submit Dispute
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Refund Details Dialog */}
      <Dialog open={!!selectedRefund} onOpenChange={() => setSelectedRefund(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCcw className="h-5 w-5" />
              Refund Details
            </DialogTitle>
            <DialogDescription>
              Reference: {selectedRefund?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRefund && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg ${
                selectedRefund.status === 'Completed' ? 'bg-green-500/10 border border-green-500/20' :
                selectedRefund.status === 'Failed' ? 'bg-red-500/10 border border-red-500/20' :
                'bg-yellow-500/10 border border-yellow-500/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedRefund.status)}
                    <span className="font-medium">{selectedRefund.status}</span>
                  </div>
                  <Badge variant="outline" className={getRefundStatusBadge(selectedRefund.status)}>
                    {selectedRefund.refundType} Refund
                  </Badge>
                </div>
                {selectedRefund.status === 'Failed' && selectedRefund.failureReason && (
                  <p className="text-sm text-red-600 mt-2">Reason: {selectedRefund.failureReason}</p>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                  <p className="font-medium">{selectedRefund.transactionId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">RRN</p>
                  <p className="font-medium">{selectedRefund.rrn}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Transaction Date</p>
                  <p className="font-medium">{selectedRefund.transactionDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Transaction Amount</p>
                  <p className="font-medium">₹{selectedRefund.transactionAmount.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Refund Amount</p>
                  <p className="font-bold text-lg">₹{selectedRefund.refundAmount.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Customer Reference</p>
                  <p className="font-medium">{selectedRefund.customerRef}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Refund Reason</p>
                  <p className="font-medium">{selectedRefund.reason}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Remarks</p>
                  <p className="font-medium">{selectedRefund.remarks || '-'}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h4 className="font-medium">Refund Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Refund Initiated</p>
                      <p className="text-xs text-muted-foreground">{selectedRefund.initiatedDate}</p>
                    </div>
                  </div>
                  {selectedRefund.completedDate && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Refund Completed</p>
                        <p className="text-xs text-muted-foreground">{selectedRefund.completedDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedRefund?.status === 'Failed' && (
              <Button onClick={() => {
                handleRetryRefund(selectedRefund.id);
                setSelectedRefund(null);
              }} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Retry Refund
              </Button>
            )}
            <Button variant="outline" onClick={() => setSelectedRefund(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dispute Details Dialog */}
      <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Dispute Details
            </DialogTitle>
            <DialogDescription>
              Reference: {selectedDispute?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDispute && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 pr-4">
                {/* Status Banner */}
                <div className={`p-4 rounded-lg ${
                  selectedDispute.status === 'Closed' ? 'bg-muted' :
                  selectedDispute.status === 'Resolved' ? 'bg-green-500/10 border border-green-500/20' :
                  selectedDispute.status === 'Awaiting Merchant Input' ? 'bg-orange-500/10 border border-orange-500/20' :
                  'bg-yellow-500/10 border border-yellow-500/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedDispute.status)}
                      <span className="font-medium">{selectedDispute.status}</span>
                    </div>
                    {selectedDispute.slaRemaining !== '-' && (
                      <Badge variant="outline" className={
                        selectedDispute.slaRemaining.includes('1') 
                          ? 'bg-red-500/10 text-red-600 border-red-500/20'
                          : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                      }>
                        <Clock className="h-3 w-3 mr-1" />
                        SLA: {selectedDispute.slaRemaining}
                      </Badge>
                    )}
                  </div>
                  {selectedDispute.resolution && (
                    <p className="text-sm text-green-600 mt-2">Resolution: {selectedDispute.resolution}</p>
                  )}
                </div>

                {/* Summary */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Dispute Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Transaction ID</p>
                        <p className="font-medium">{selectedDispute.transactionId}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">RRN</p>
                        <p className="font-medium">{selectedDispute.rrn}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Transaction Date</p>
                        <p className="font-medium">{selectedDispute.transactionDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-bold">₹{selectedDispute.amount.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <p className="text-muted-foreground">Dispute Reason</p>
                        <p className="font-medium">{selectedDispute.reason}</p>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <p className="text-muted-foreground">Description</p>
                        <p className="font-medium">{selectedDispute.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Status Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedDispute.timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <ArrowRight className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{event.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date} • By {event.by}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Communication Thread */}
                {selectedDispute.communications.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Communication Thread</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedDispute.communications.map((comm, idx) => (
                          <div key={idx} className={`p-3 rounded-lg ${
                            comm.from === 'Bank' ? 'bg-muted/50 mr-8' : 'bg-primary/10 ml-8'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {comm.from}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{comm.date}</span>
                            </div>
                            <p className="text-sm">{comm.message}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Merchant Response Input (when awaiting input) */}
                {selectedDispute.status === 'Awaiting Merchant Input' && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Your Response</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Textarea
                        placeholder="Type your response..."
                        value={merchantResponse}
                        onChange={(e) => setMerchantResponse(e.target.value)}
                        rows={3}
                      />
                      <Button onClick={handleSubmitMerchantResponse} className="w-full">
                        Submit Response
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Documents */}
                {selectedDispute.documents.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Attached Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedDispute.documents.map((doc, idx) => (
                          <Badge key={idx} variant="outline" className="gap-1">
                            <FileText className="h-3 w-3" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          )}
          
          <DialogFooter>
            {selectedDispute?.status === 'Resolved' && (
              <>
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleEscalateDispute(selectedDispute.id);
                    setSelectedDispute(null);
                  }}
                  className="gap-2"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Escalate
                </Button>
                <Button 
                  onClick={() => {
                    handleAcceptResolution(selectedDispute.id);
                    setSelectedDispute(null);
                  }}
                  className="gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Accept Resolution
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setSelectedDispute(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RefundsDisputes;
