import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Search, 
  Calendar, 
  Download, 
  FileText,
  X,
  ChevronDown,
  Check,
  ArrowUpDown,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Sample accounts
const sampleAccounts = [
  { id: '1', number: '123456789012', name: 'Savings Account' },
  { id: '2', number: '987654321098', name: 'Current Account' },
  { id: '3', number: '456789012345', name: 'Business Account' },
  { id: '4', number: '789012345678', name: 'Fixed Deposit' },
];

// Sample statement data
const sampleStatements = [
  {
    id: 'TXN123456',
    dateTime: new Date('2025-04-01T10:15:00'),
    description: 'ATM Withdrawal',
    debit: 5000,
    credit: null,
    balance: 45000,
    remarks: 'ATM Cash',
  },
  {
    id: 'TXN123457',
    dateTime: new Date('2025-04-02T14:32:00'),
    description: 'UPI Credit',
    debit: null,
    credit: 12000,
    balance: 57000,
    remarks: 'Salary',
  },
  {
    id: 'TXN123458',
    dateTime: new Date('2025-04-03T09:50:00'),
    description: 'POS Purchase',
    debit: 2500,
    credit: null,
    balance: 54500,
    remarks: 'Grocery',
  },
  {
    id: 'TXN123459',
    dateTime: new Date('2025-04-04T18:20:00'),
    description: 'NEFT Credit',
    debit: null,
    credit: 20000,
    balance: 74500,
    remarks: 'Transfer',
  },
  {
    id: 'TXN123460',
    dateTime: new Date('2025-04-05T11:45:00'),
    description: 'RTGS Transfer',
    debit: 15000,
    credit: null,
    balance: 59500,
    remarks: 'Vendor Payment',
  },
  {
    id: 'TXN123461',
    dateTime: new Date('2025-04-06T16:30:00'),
    description: 'Interest Credit',
    debit: null,
    credit: 450,
    balance: 59950,
    remarks: 'Quarterly Interest',
  },
  {
    id: 'TXN123462',
    dateTime: new Date('2025-04-07T08:20:00'),
    description: 'Bill Payment',
    debit: 3200,
    credit: null,
    balance: 56750,
    remarks: 'Electricity Bill',
  },
  {
    id: 'TXN123463',
    dateTime: new Date('2025-04-08T13:15:00'),
    description: 'UPI Credit',
    debit: null,
    credit: 8500,
    balance: 65250,
    remarks: 'Refund',
  },
  {
    id: 'TXN123464',
    dateTime: new Date('2025-04-09T10:00:00'),
    description: 'IMPS Transfer',
    debit: 2000,
    credit: null,
    balance: 63250,
    remarks: 'Personal Transfer',
  },
  {
    id: 'TXN123465',
    dateTime: new Date('2025-04-10T15:45:00'),
    description: 'Dividend Credit',
    debit: null,
    credit: 5000,
    balance: 68250,
    remarks: 'Stock Dividend',
  },
  {
    id: 'TXN123466',
    dateTime: new Date('2025-04-11T09:30:00'),
    description: 'EMI Debit',
    debit: 12500,
    credit: null,
    balance: 55750,
    remarks: 'Home Loan EMI',
  },
  {
    id: 'TXN123467',
    dateTime: new Date('2025-04-12T17:20:00'),
    description: 'NEFT Credit',
    debit: null,
    credit: 35000,
    balance: 90750,
    remarks: 'Freelance Payment',
  },
  {
    id: 'TXN123468',
    dateTime: new Date('2025-04-13T12:10:00'),
    description: 'Card Purchase',
    debit: 4500,
    credit: null,
    balance: 86250,
    remarks: 'Online Shopping',
  },
  {
    id: 'TXN123469',
    dateTime: new Date('2025-04-14T14:55:00'),
    description: 'Cashback Credit',
    debit: null,
    credit: 250,
    balance: 86500,
    remarks: 'Card Cashback',
  },
  {
    id: 'TXN123470',
    dateTime: new Date('2025-04-15T11:30:00'),
    description: 'Insurance Premium',
    debit: 8000,
    credit: null,
    balance: 78500,
    remarks: 'Life Insurance',
  },
];

type TabType = 'all' | 'withdrawals' | 'deposits';

export default function Reports() {
  // Filter states
  const [selectedAccount, setSelectedAccount] = useState<string>('123456789012');
  const [accountSearchOpen, setAccountSearchOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date('2025-04-01'));
  const [toDate, setToDate] = useState<Date | undefined>(new Date('2025-04-15'));
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);
  
  // Data states
  const [statements, setStatements] = useState(sampleStatements);
  const [hasLoaded, setHasLoaded] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Sorting
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Validation
  const [errors, setErrors] = useState<{ account?: string; dateRange?: string }>({});

  // Filter statements based on active tab
  const filteredStatements = useMemo(() => {
    let filtered = [...statements];
    
    if (activeTab === 'withdrawals') {
      filtered = filtered.filter(s => s.debit !== null);
    } else if (activeTab === 'deposits') {
      filtered = filtered.filter(s => s.credit !== null);
    }
    
    // Sort by date
    filtered.sort((a, b) => {
      const comparison = a.dateTime.getTime() - b.dateTime.getTime();
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return filtered;
  }, [statements, activeTab, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredStatements.length / itemsPerPage);
  const paginatedStatements = filteredStatements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Summary calculations
  const summary = useMemo(() => {
    const totalDebit = filteredStatements.reduce((sum, s) => sum + (s.debit || 0), 0);
    const totalCredit = filteredStatements.reduce((sum, s) => sum + (s.credit || 0), 0);
    return { totalDebit, totalCredit, transactionCount: filteredStatements.length };
  }, [filteredStatements]);

  const validateFilters = () => {
    const newErrors: { account?: string; dateRange?: string } = {};
    
    if (!selectedAccount) {
      newErrors.account = 'Account number is required';
    }
    
    if (fromDate && toDate && toDate < fromDate) {
      newErrors.dateRange = 'To date must be greater than or equal to From date';
    }
    
    if (fromDate && fromDate > new Date()) {
      newErrors.dateRange = 'From date cannot be in the future';
    }
    
    if (toDate && toDate > new Date()) {
      newErrors.dateRange = 'To date cannot be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateFilters()) {
      return;
    }
    
    setStatements(sampleStatements);
    setHasLoaded(true);
    setCurrentPage(1);
    toast({
      title: "Statement Loaded",
      description: `Loaded ${sampleStatements.length} transactions for account ${selectedAccount}`,
    });
  };

  const handleClear = () => {
    setSelectedAccount('');
    setFromDate(undefined);
    setToDate(undefined);
    setActiveTab('all');
    setStatements([]);
    setHasLoaded(false);
    setCurrentPage(1);
    setErrors({});
  };

  const handleDownload = (format: 'pdf' | 'csv') => {
    const tabLabel = activeTab === 'all' ? 'All Transactions' : activeTab === 'withdrawals' ? 'Withdrawals' : 'Deposits';
    toast({
      title: "Download Started",
      description: `Downloading ${tabLabel} statement as ${format.toUpperCase()}`,
    });
    
    if (format === 'csv') {
      const headers = ['Date & Time', 'Transaction ID', 'Description', 'Debit (₹)', 'Credit (₹)', 'Balance (₹)', 'Remarks'];
      const rows = filteredStatements.map(s => [
        format === 'csv' ? format : '',
        s.id,
        s.description,
        s.debit?.toLocaleString('en-IN') || '-',
        s.credit?.toLocaleString('en-IN') || '-',
        s.balance.toLocaleString('en-IN'),
        s.remarks,
      ].join(','));
      
      const csvContent = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `statement_${selectedAccount}_${tabLabel.replace(' ', '_')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '—';
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const tabs = [
    { id: 'all' as TabType, label: 'All Transactions' },
    { id: 'withdrawals' as TabType, label: 'Withdrawals' },
    { id: 'deposits' as TabType, label: 'Deposits' },
  ];

  return (
    <div className="flex h-screen bg-background">
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
            <div>
              <h1 className="text-2xl font-bold text-foreground">Account Statement</h1>
              <p className="text-muted-foreground">View and download your account statements</p>
            </div>

            {/* Filter Section */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Statement Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Account Number */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Account Number <span className="text-destructive">*</span>
                    </Label>
                    <Popover open={accountSearchOpen} onOpenChange={setAccountSearchOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={accountSearchOpen}
                          className={cn(
                            "w-full justify-between",
                            errors.account && "border-destructive"
                          )}
                        >
                          {selectedAccount || "Select account..."}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search account..." />
                          <CommandList>
                            <CommandEmpty>No account found.</CommandEmpty>
                            <CommandGroup>
                              {sampleAccounts.map((account) => (
                                <CommandItem
                                  key={account.id}
                                  value={account.number}
                                  onSelect={(value) => {
                                    setSelectedAccount(value);
                                    setAccountSearchOpen(false);
                                    setErrors(prev => ({ ...prev, account: undefined }));
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedAccount === account.number ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">{account.number}</div>
                                    <div className="text-xs text-muted-foreground">{account.name}</div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.account && (
                      <p className="text-xs text-destructive">{errors.account}</p>
                    )}
                  </div>

                  {/* From Date */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">From Date</Label>
                    <Popover open={fromDateOpen} onOpenChange={setFromDateOpen}>
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={fromDate}
                          onSelect={(date) => {
                            setFromDate(date);
                            setFromDateOpen(false);
                          }}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* To Date */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">To Date</Label>
                    <Popover open={toDateOpen} onOpenChange={setToDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !toDate && "text-muted-foreground",
                            errors.dateRange && "border-destructive"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "dd/MM/yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={toDate}
                          onSelect={(date) => {
                            setToDate(date);
                            setToDateOpen(false);
                          }}
                          disabled={(date) => date > new Date() || (fromDate && date < fromDate)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dateRange && (
                      <p className="text-xs text-destructive">{errors.dateRange}</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-end gap-2">
                    <Button variant="outline" onClick={handleClear} className="flex-1">
                      <X className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1">
                      <Search className="mr-2 h-4 w-4" />
                      Submit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" disabled={!hasLoaded}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                          <FileText className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload('csv')}>
                          <FileText className="mr-2 h-4 w-4" />
                          Download CSV
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Type Tabs */}
            <div className="flex gap-2 border-b border-border pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[2px]",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {tab.id === 'all' 
                      ? statements.length 
                      : tab.id === 'withdrawals' 
                        ? statements.filter(s => s.debit !== null).length
                        : statements.filter(s => s.credit !== null).length
                    }
                  </Badge>
                </button>
              ))}
            </div>

            {/* Summary Section */}
            {hasLoaded && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-muted/30">
                  <CardContent className="pt-4">
                    <div className="text-sm text-muted-foreground">Total Transactions</div>
                    <div className="text-2xl font-bold text-foreground">{summary.transactionCount}</div>
                  </CardContent>
                </Card>
                <Card className="bg-destructive/5">
                  <CardContent className="pt-4">
                    <div className="text-sm text-muted-foreground">Total Debit</div>
                    <div className="text-2xl font-bold text-destructive">{formatCurrency(summary.totalDebit)}</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-500/5">
                  <CardContent className="pt-4">
                    <div className="text-sm text-muted-foreground">Total Credit</div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalCredit)}</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Statement Table */}
            <Card>
              <CardContent className="p-0">
                {!hasLoaded ? (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <FileText className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-lg font-medium">No statement loaded</p>
                    <p className="text-sm">Select an account and click Submit to view transactions</p>
                  </div>
                ) : filteredStatements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <FileText className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-lg font-medium">No transactions found</p>
                    <p className="text-sm">No {activeTab === 'withdrawals' ? 'withdrawal' : activeTab === 'deposits' ? 'deposit' : ''} transactions in the selected period</p>
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="sticky top-0 bg-muted/50">
                            <button
                              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                              className="flex items-center gap-1 hover:text-foreground"
                            >
                              Date & Time
                              {sortOrder === 'desc' ? (
                                <ArrowDown className="h-4 w-4" />
                              ) : (
                                <ArrowUp className="h-4 w-4" />
                              )}
                            </button>
                          </TableHead>
                          <TableHead className="sticky top-0 bg-muted/50">Transaction ID</TableHead>
                          <TableHead className="sticky top-0 bg-muted/50">Description</TableHead>
                          {activeTab !== 'deposits' && (
                            <TableHead className={cn(
                              "sticky top-0 bg-muted/50 text-right",
                              activeTab === 'withdrawals' ? "" : ""
                            )}>
                              Debit (₹)
                            </TableHead>
                          )}
                          {activeTab !== 'withdrawals' && (
                            <TableHead className={cn(
                              "sticky top-0 bg-muted/50 text-right",
                              activeTab === 'deposits' ? "" : ""
                            )}>
                              Credit (₹)
                            </TableHead>
                          )}
                          <TableHead className="sticky top-0 bg-muted/50 text-right">Balance (₹)</TableHead>
                          <TableHead className="sticky top-0 bg-muted/50">Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedStatements.map((statement, index) => (
                          <motion.tr
                            key={statement.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className={cn(
                              "border-b border-border transition-colors hover:bg-muted/30",
                              index % 2 === 0 ? "bg-background" : "bg-muted/10"
                            )}
                          >
                            <TableCell className="font-medium whitespace-nowrap">
                              {format(statement.dateTime, "dd/MM/yyyy HH:mm")}
                            </TableCell>
                            <TableCell className="font-mono text-sm">{statement.id}</TableCell>
                            <TableCell>{statement.description}</TableCell>
                            {activeTab !== 'deposits' && (
                              <TableCell className={cn(
                                "text-right font-medium",
                                statement.debit ? "text-destructive" : "text-muted-foreground"
                              )}>
                                {statement.debit ? formatCurrency(statement.debit) : '—'}
                              </TableCell>
                            )}
                            {activeTab !== 'withdrawals' && (
                              <TableCell className={cn(
                                "text-right font-medium",
                                statement.credit ? "text-green-600" : "text-muted-foreground"
                              )}>
                                {statement.credit ? formatCurrency(statement.credit) : '—'}
                              </TableCell>
                            )}
                            <TableCell className="text-right font-semibold">
                              {formatCurrency(statement.balance)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">{statement.remarks}</TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pagination */}
            {hasLoaded && totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
