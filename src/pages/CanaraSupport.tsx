import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  Plus,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronRight,
  Upload,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  MessageCircle,
  X,
  Paperclip,
  Send,
  Filter,
  Search,
  Building2,
  Shield,
  CreditCard,
  QrCode,
  FileBarChart,
  Settings,
  HelpCircle,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Issue categories and sub-categories
const issueCategories = {
  'transaction': {
    label: 'Transaction Issue',
    subCategories: ['Failed Transaction', 'Pending Transaction', 'Duplicate Debit', 'Refund Not Received', 'Wrong Amount Debited', 'Other']
  },
  'settlement': {
    label: 'Settlement Issue',
    subCategories: ['Settlement Delayed', 'Settlement Missing', 'Settlement Amount Mismatch', 'Bank Account Issue', 'Other']
  },
  'qr': {
    label: 'QR Issue',
    subCategories: ['QR Not Working', 'QR Generation Failed', 'Wrong QR Displayed', 'QR Scanning Issue', 'Other']
  },
  'api': {
    label: 'API / Integration Issue',
    subCategories: ['API Connection Failed', 'Webhook Not Received', 'Authentication Error', 'Response Timeout', 'Other']
  },
  'account': {
    label: 'Account / Profile Issue',
    subCategories: ['Profile Update Request', 'KYC Update', 'Password Reset', 'Account Blocked', 'Other']
  },
  'report': {
    label: 'Report / Statement Issue',
    subCategories: ['Report Not Loading', 'Data Mismatch', 'Download Failed', 'Missing Transactions', 'Other']
  },
  'others': {
    label: 'Others',
    subCategories: ['General Query', 'Feedback', 'Feature Request', 'Other']
  }
};

// Sample tickets data
const sampleTickets = [
  {
    id: 'TKT-2025-001234',
    category: 'Transaction Issue',
    subCategory: 'Failed Transaction',
    referenceId: 'TXN789456123',
    dateRaised: '2025-04-15 14:32',
    status: 'Open',
    priority: 'High',
    sla: 'Within SLA',
    description: 'Customer payment failed but amount debited from their account. Transaction ID: TXN789456123. Customer name: Rajesh Kumar. Amount: ₹5,000',
    attachments: ['screenshot_error.png'],
    timeline: [
      { date: '2025-04-15 14:32', action: 'Ticket Created', by: 'Merchant', note: 'Ticket raised for failed transaction' },
      { date: '2025-04-15 15:10', action: 'Assigned', by: 'System', note: 'Assigned to Transaction Support Team' },
      { date: '2025-04-15 16:45', action: 'Comment Added', by: 'Support Agent', note: 'We are investigating this issue. The transaction is under review with NPCI.' }
    ]
  },
  {
    id: 'TKT-2025-001198',
    category: 'Settlement Issue',
    subCategory: 'Settlement Delayed',
    referenceId: 'STL-20250414',
    dateRaised: '2025-04-14 10:15',
    status: 'In Progress',
    priority: 'Medium',
    sla: 'Within SLA',
    description: 'Settlement for 14th April not received. Expected amount: ₹45,678. Settlement cycle: T+1',
    attachments: [],
    timeline: [
      { date: '2025-04-14 10:15', action: 'Ticket Created', by: 'Merchant', note: 'Settlement delay reported' },
      { date: '2025-04-14 11:30', action: 'Assigned', by: 'System', note: 'Assigned to Settlement Team' },
      { date: '2025-04-14 14:00', action: 'Status Updated', by: 'Support Agent', note: 'Settlement is being processed. Expected by EOD today.' }
    ]
  },
  {
    id: 'TKT-2025-001156',
    category: 'QR Issue',
    subCategory: 'QR Not Working',
    referenceId: 'QR-STATIC-001',
    dateRaised: '2025-04-12 09:45',
    status: 'Resolved',
    priority: 'High',
    sla: 'Resolved',
    description: 'Static QR code not scanning. Customers unable to make payments.',
    attachments: ['qr_photo.jpg'],
    timeline: [
      { date: '2025-04-12 09:45', action: 'Ticket Created', by: 'Merchant', note: 'QR scanning issue reported' },
      { date: '2025-04-12 10:00', action: 'Assigned', by: 'System', note: 'Assigned to QR Support Team' },
      { date: '2025-04-12 11:30', action: 'Resolution', by: 'Support Agent', note: 'New QR code generated and shared. Old QR was corrupted due to print quality issue.' }
    ],
    resolution: 'New QR code generated and sent to registered email. Issue was due to poor print quality of the original QR.'
  },
  {
    id: 'TKT-2025-001089',
    category: 'API / Integration Issue',
    subCategory: 'Webhook Not Received',
    referenceId: 'API-WH-001',
    dateRaised: '2025-04-10 16:20',
    status: 'Closed',
    priority: 'Medium',
    sla: 'Resolved',
    description: 'Webhook notifications not being received for successful payments since 10th April.',
    attachments: ['server_logs.txt'],
    timeline: [
      { date: '2025-04-10 16:20', action: 'Ticket Created', by: 'Merchant', note: 'Webhook issue reported' },
      { date: '2025-04-10 17:00', action: 'Assigned', by: 'System', note: 'Assigned to Technical Support' },
      { date: '2025-04-11 10:00', action: 'Comment Added', by: 'Support Agent', note: 'Webhook URL was returning 500 errors. Please check your server.' },
      { date: '2025-04-11 14:00', action: 'Closed', by: 'Merchant', note: 'Issue resolved. Server configuration was updated.' }
    ],
    resolution: 'Merchant server was returning 500 errors. Issue fixed after merchant updated their server configuration.'
  },
  {
    id: 'TKT-2025-000987',
    category: 'Account / Profile Issue',
    subCategory: 'Profile Update Request',
    referenceId: 'ACC-UPD-001',
    dateRaised: '2025-04-08 11:00',
    status: 'Pending Approval',
    priority: 'Low',
    sla: 'Within SLA',
    description: 'Request to update registered mobile number from 98765XXXXX to 99887XXXXX',
    attachments: ['id_proof.pdf', 'request_letter.pdf'],
    timeline: [
      { date: '2025-04-08 11:00', action: 'Ticket Created', by: 'Merchant', note: 'Mobile number update requested' },
      { date: '2025-04-08 12:00', action: 'Documents Received', by: 'System', note: 'Supporting documents uploaded' },
      { date: '2025-04-09 10:00', action: 'Under Review', by: 'Support Agent', note: 'Documents are being verified. Approval pending from compliance team.' }
    ]
  }
];

// FAQ data
const faqData = [
  {
    category: 'UPI Transactions',
    icon: CreditCard,
    questions: [
      { q: 'What is the maximum UPI transaction limit?', a: 'The maximum UPI transaction limit is ₹1,00,000 per transaction for most merchants. However, this may vary based on your merchant category and bank policies.' },
      { q: 'Why did my UPI transaction fail?', a: 'UPI transactions can fail due to various reasons: incorrect UPI PIN, insufficient balance, bank server issues, exceeded daily limits, or network connectivity problems. Check the exact error code for more details.' },
      { q: 'How long does a UPI refund take?', a: 'UPI refunds are typically processed within 3-5 business days. In case of failed transactions where money was debited, the auto-reversal happens within 48-72 hours.' },
      { q: 'What is a pending UPI transaction?', a: 'A pending transaction occurs when the payment is initiated but not completed due to technical issues. Such transactions are automatically reversed within 24-48 hours if not completed.' }
    ]
  },
  {
    category: 'Settlements',
    icon: Building2,
    questions: [
      { q: 'What is my settlement cycle?', a: 'Your settlement cycle depends on your merchant agreement. Most merchants have T+1 settlement (next business day). You can check your specific cycle in Profile & Settings > Settlement Preferences.' },
      { q: 'Why is my settlement delayed?', a: 'Settlements may be delayed due to: bank holidays, pending KYC verification, account validation issues, or high-risk transaction review. Contact support if delay exceeds 3 business days.' },
      { q: 'How do I change my settlement account?', a: 'To change your settlement account, submit a request through Profile & Settings > Settlement Preferences. You will need to provide new bank details and supporting documents. Changes are subject to approval.' },
      { q: 'What are settlement charges?', a: 'Settlement charges include MDR (Merchant Discount Rate) and platform fees. These are deducted from your gross transaction amount before settlement. Check your merchant agreement for exact rates.' }
    ]
  },
  {
    category: 'QR Codes',
    icon: QrCode,
    questions: [
      { q: 'What is the difference between Static and Dynamic QR?', a: 'Static QR codes are fixed and customers enter the amount manually. Dynamic QR codes have a specific amount embedded and expire after use or time limit. Dynamic QR is more secure for specific transactions.' },
      { q: 'My QR code is not scanning, what should I do?', a: 'Ensure the QR code is printed clearly without any damage. Check if the QR is valid and not expired (for dynamic QR). Try regenerating a new QR from the dashboard. If issue persists, raise a support ticket.' },
      { q: 'How do I generate a new QR code?', a: 'Go to QR Management section, click on "Generate QR", select Static or Dynamic type, enter amount (for Dynamic), and generate. You can download, print, or share the QR code.' },
      { q: 'Can I have multiple QR codes?', a: 'Yes, you can have multiple QR codes for different counters, locations, or sub-merchants. Each QR is linked to your primary or sub-merchant VPA.' }
    ]
  },
  {
    category: 'Reports & Statements',
    icon: FileBarChart,
    questions: [
      { q: 'How do I download my transaction statement?', a: 'Go to Reports / Statement section, select your account, choose date range, and click Submit. Once data loads, click Download and select your preferred format (PDF/CSV).' },
      { q: 'Why are some transactions missing in my report?', a: 'Transactions may take up to 24 hours to reflect in reports. Ensure you have selected the correct date range. Pending or failed transactions may be in separate sections.' },
      { q: 'Can I get monthly statements automatically?', a: 'Yes, you can enable automatic monthly statements in Profile & Settings > Notification Settings. Statements will be sent to your registered email on the 1st of each month.' },
      { q: 'What is the maximum date range for reports?', a: 'You can generate reports for up to 90 days in a single request. For longer periods, please download in batches or contact support for a consolidated report.' }
    ]
  },
  {
    category: 'Common Error Codes',
    icon: AlertCircle,
    questions: [
      { q: 'Error U16: Transaction pending', a: 'This error indicates the transaction is stuck in pending state. It will be auto-reversed within 48 hours if not completed. If the amount is debited, it will be refunded.' },
      { q: 'Error U28: Unable to credit/debit', a: 'This occurs when the bank is unable to process the transaction. Common causes include account blocked, insufficient balance, or bank server issues.' },
      { q: 'Error U30: Beneficiary bank offline', a: 'The recipient bank servers are temporarily down. Ask the customer to retry after some time or use an alternative payment method.' },
      { q: 'Error U67: Collect expired', a: 'The collect request has expired as the customer did not respond within the validity period (usually 5-10 minutes). Request the customer to retry the payment.' }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'open': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'in progress': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'resolved': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    case 'closed': return 'bg-muted text-muted-foreground border-border';
    case 'pending approval': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

const getSlaColor = (sla: string) => {
  switch (sla.toLowerCase()) {
    case 'within sla': return 'text-emerald-600';
    case 'resolved': return 'text-emerald-600';
    case 'sla breached': return 'text-destructive';
    case 'approaching sla': return 'text-amber-600';
    default: return 'text-muted-foreground';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'medium': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'low': return 'bg-muted text-muted-foreground border-border';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

export default function CanaraSupport() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('raise');
  const [selectedTicket, setSelectedTicket] = useState<typeof sampleTickets[0] | null>(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form state
  const [ticketForm, setTicketForm] = useState({
    category: '',
    subCategory: '',
    priority: 'medium',
    reference: '',
    description: '',
    attachment: null as File | null
  });

  const handleSubmitTicket = () => {
    if (!ticketForm.category || !ticketForm.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all mandatory fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ticket Submitted Successfully",
      description: `Your ticket has been created with ID: TKT-2025-00${Math.floor(Math.random() * 1000) + 1000}. You will receive updates on your registered email.`,
    });

    setTicketForm({
      category: '',
      subCategory: '',
      priority: 'medium',
      reference: '',
      description: '',
      attachment: null
    });
  };

  const filteredTickets = sampleTickets.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.referenceId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Support & Grievance Management</h1>
                <p className="text-muted-foreground mt-1">Raise, track, and resolve your support issues with Canara Bank</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Avg. Response: 2 hours
                </Badge>
              </div>
            </div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                <TabsTrigger value="raise" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Raise Ticket
                </TabsTrigger>
                <TabsTrigger value="tickets" className="gap-2">
                  <FileText className="h-4 w-4" />
                  My Tickets
                </TabsTrigger>
                <TabsTrigger value="faq" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  FAQs
                </TabsTrigger>
                <TabsTrigger value="contact" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Canara
                </TabsTrigger>
              </TabsList>

              {/* Raise Ticket Tab */}
              <TabsContent value="raise">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-primary" />
                      Raise New Support Ticket
                    </CardTitle>
                    <CardDescription>
                      Fill in the details below to submit your support request. Our team will respond within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Issue Category */}
                      <div className="space-y-2">
                        <Label htmlFor="category">Issue Category <span className="text-destructive">*</span></Label>
                        <Select 
                          value={ticketForm.category} 
                          onValueChange={(value) => setTicketForm({ ...ticketForm, category: value, subCategory: '' })}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(issueCategories).map(([key, cat]) => (
                              <SelectItem key={key} value={key}>{cat.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Sub-Category */}
                      <div className="space-y-2">
                        <Label htmlFor="subCategory">Issue Sub-Category</Label>
                        <Select 
                          value={ticketForm.subCategory} 
                          onValueChange={(value) => setTicketForm({ ...ticketForm, subCategory: value })}
                          disabled={!ticketForm.category}
                        >
                          <SelectTrigger id="subCategory">
                            <SelectValue placeholder="Select sub-category" />
                          </SelectTrigger>
                          <SelectContent>
                            {ticketForm.category && issueCategories[ticketForm.category as keyof typeof issueCategories]?.subCategories.map((sub) => (
                              <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Priority */}
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select 
                          value={ticketForm.priority} 
                          onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}
                        >
                          <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Transaction Reference */}
                      <div className="space-y-2">
                        <Label htmlFor="reference">Transaction Reference (Optional)</Label>
                        <Input 
                          id="reference" 
                          placeholder="Enter Transaction ID, RRN, or Reference Number"
                          value={ticketForm.reference}
                          onChange={(e) => setTicketForm({ ...ticketForm, reference: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your issue in detail. Include relevant transaction details, dates, amounts, and any error messages you received."
                        className="min-h-[120px]"
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      />
                    </div>

                    {/* Attachment */}
                    <div className="space-y-2">
                      <Label>Attachment (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag & drop files here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supported: PDF, JPG, PNG (Max 5MB)
                        </p>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setTicketForm({ ...ticketForm, attachment: e.target.files?.[0] || null })}
                        />
                        <Button variant="outline" size="sm" className="mt-3">
                          Browse Files
                        </Button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button 
                        variant="outline"
                        onClick={() => setTicketForm({
                          category: '',
                          subCategory: '',
                          priority: 'medium',
                          reference: '',
                          description: '',
                          attachment: null
                        })}
                      >
                        Clear Form
                      </Button>
                      <Button onClick={handleSubmitTicket} className="gap-2">
                        <Send className="h-4 w-4" />
                        Submit Ticket
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Tickets Tab */}
              <TabsContent value="tickets">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          My Support Tickets
                        </CardTitle>
                        <CardDescription>View and manage all your support tickets</CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Search tickets..." 
                            className="pl-9 w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-40">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in progress">In Progress</SelectItem>
                            <SelectItem value="pending approval">Pending Approval</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Ticket ID</TableHead>
                            <TableHead className="font-semibold">Category</TableHead>
                            <TableHead className="font-semibold">Reference ID</TableHead>
                            <TableHead className="font-semibold">Date Raised</TableHead>
                            <TableHead className="font-semibold">Priority</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">SLA</TableHead>
                            <TableHead className="font-semibold text-center">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTickets.map((ticket) => (
                            <TableRow key={ticket.id} className="hover:bg-muted/30">
                              <TableCell className="font-mono text-sm font-medium">{ticket.id}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-sm">{ticket.category}</p>
                                  <p className="text-xs text-muted-foreground">{ticket.subCategory}</p>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-sm">{ticket.referenceId}</TableCell>
                              <TableCell className="text-sm">{ticket.dateRaised}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={cn("text-xs", getPriorityColor(ticket.priority))}>
                                  {ticket.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={cn("text-xs", getStatusColor(ticket.status))}>
                                  {ticket.status}
                                </Badge>
                              </TableCell>
                              <TableCell className={cn("text-sm font-medium", getSlaColor(ticket.sla))}>
                                {ticket.sla}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => {
                                      setSelectedTicket(ticket);
                                      setShowTicketDetails(true);
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    disabled={ticket.status === 'Closed'}
                                  >
                                    <MessageCircle className="h-4 w-4" />
                                  </Button>
                                  {ticket.status !== 'Closed' && ticket.status !== 'Resolved' && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Summary Stats */}
                    <div className="mt-6 grid grid-cols-5 gap-4">
                      {[
                        { label: 'Total Tickets', value: sampleTickets.length, color: 'text-foreground' },
                        { label: 'Open', value: sampleTickets.filter(t => t.status === 'Open').length, color: 'text-amber-600' },
                        { label: 'In Progress', value: sampleTickets.filter(t => t.status === 'In Progress').length, color: 'text-blue-600' },
                        { label: 'Resolved', value: sampleTickets.filter(t => t.status === 'Resolved').length, color: 'text-emerald-600' },
                        { label: 'Closed', value: sampleTickets.filter(t => t.status === 'Closed').length, color: 'text-muted-foreground' },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-muted/30 rounded-lg p-4 text-center">
                          <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQs Tab */}
              <TabsContent value="faq">
                <div className="grid grid-cols-1 gap-6">
                  {faqData.map((section) => (
                    <Card key={section.category}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <section.icon className="h-5 w-5 text-primary" />
                          {section.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {section.questions.map((faq, idx) => (
                            <AccordionItem key={idx} value={`${section.category}-${idx}`}>
                              <AccordionTrigger className="text-left hover:no-underline">
                                <span className="font-medium">{faq.q}</span>
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">
                                {faq.a}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Contact Canara Tab */}
              <TabsContent value="contact">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Support Channels */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Headphones className="h-5 w-5 text-primary" />
                        Support Channels
                      </CardTitle>
                      <CardDescription>Reach out to us through any of the following channels</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-primary">merchantsupport@canarabank.com</p>
                          <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Toll-Free Helpline</p>
                          <p className="text-sm text-primary">1800-425-0018</p>
                          <p className="text-xs text-muted-foreground mt-1">Available 24x7</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">WhatsApp Support</p>
                          <p className="text-sm text-primary">+91 80 6883 8888</p>
                          <p className="text-xs text-muted-foreground mt-1">Quick responses during business hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Working Hours & Escalation */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          Working Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Monday - Friday</span>
                          <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Saturday</span>
                          <span className="font-medium">9:00 AM - 2:00 PM</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Sunday & Holidays</span>
                          <span className="font-medium text-destructive">Closed</span>
                        </div>
                        <div className="mt-4 p-3 bg-amber-500/10 rounded-lg">
                          <p className="text-sm text-amber-700 dark:text-amber-400">
                            <AlertCircle className="h-4 w-4 inline mr-2" />
                            Toll-free helpline is available 24x7 for urgent transaction issues
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ArrowUpRight className="h-5 w-5 text-primary" />
                          Escalation Matrix
                        </CardTitle>
                        <CardDescription>For unresolved issues, escalate in this order</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                          <div>
                            <p className="font-medium">Level 1: Support Team</p>
                            <p className="text-xs text-muted-foreground">Response: 24 hours</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                          <div>
                            <p className="font-medium">Level 2: Senior Support Manager</p>
                            <p className="text-xs text-muted-foreground">escalation@canarabank.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                          <div>
                            <p className="font-medium">Level 3: Nodal Officer</p>
                            <p className="text-xs text-muted-foreground">nodalofficer@canarabank.com</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Ticket Details Dialog */}
      <Dialog open={showTicketDetails} onOpenChange={setShowTicketDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span>Ticket Details</span>
              {selectedTicket && (
                <Badge variant="outline" className={cn("text-xs", getStatusColor(selectedTicket.status))}>
                  {selectedTicket.status}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedTicket?.id} • Raised on {selectedTicket?.dateRaised}
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                {/* Ticket Summary */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="font-medium">{selectedTicket.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Sub-Category</p>
                    <p className="font-medium">{selectedTicket.subCategory}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Priority</p>
                    <Badge variant="outline" className={cn("text-xs", getPriorityColor(selectedTicket.priority))}>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Reference ID</p>
                    <p className="font-mono text-sm">{selectedTicket.referenceId}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedTicket.description}</p>
                </div>

                {/* Attachments */}
                {selectedTicket.attachments.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Attachments</h4>
                    <div className="flex gap-2">
                      {selectedTicket.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resolution Notes */}
                {selectedTicket.resolution && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Resolution
                    </h4>
                    <p className="text-sm">{selectedTicket.resolution}</p>
                  </div>
                )}

                {/* Timeline */}
                <div>
                  <h4 className="font-semibold mb-4">Activity Timeline</h4>
                  <div className="space-y-4">
                    {selectedTicket.timeline.map((event, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-3 w-3 rounded-full bg-primary" />
                          {idx < selectedTicket.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-border flex-1 mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{event.action}</span>
                            <span className="text-xs text-muted-foreground">by {event.by}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{event.date}</p>
                          <p className="text-sm text-muted-foreground mt-1">{event.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Comment (for non-closed tickets) */}
                {selectedTicket.status !== 'Closed' && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Add Comment</h4>
                    <div className="flex gap-2">
                      <Textarea placeholder="Type your message..." className="min-h-[80px]" />
                      <Button className="shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}

          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setShowTicketDetails(false)}>
              Close
            </Button>
            {selectedTicket?.status !== 'Closed' && selectedTicket?.status !== 'Resolved' && (
              <Button variant="destructive">
                Close Ticket
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
