import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  User, 
  LayoutDashboard,
  QrCode,
  Users,
  FileText,
  Wallet,
  RefreshCcw,
  AlertTriangle,
  HelpCircle,
  Settings,
  TrendingUp,
  Plus,
  Download,
  Eye,
  ArrowRight,
  CreditCard,
  Key,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/lib/i18n';

// Define all searchable items with modules and features
const searchableItems = [
  // Pages/Modules
  { type: 'page', label: 'Dashboard', description: 'View overview and statistics', path: '/dashboard', icon: LayoutDashboard, keywords: ['home', 'overview', 'stats', 'main'] },
  { type: 'page', label: 'QR Management', description: 'Create and manage QR codes', path: '/dashboard/qr', icon: QrCode, keywords: ['qr', 'code', 'generate', 'scan'] },
  { type: 'page', label: 'Sub-Merchant Management', description: 'Manage sub-merchants', path: '/dashboard/submerchants', icon: Users, keywords: ['merchant', 'sub', 'partner', 'vendor'] },
  { type: 'page', label: 'Transaction Summary', description: 'View all transactions', path: '/dashboard/transactions', icon: FileText, keywords: ['transaction', 'payment', 'history', 'txn'] },
  { type: 'page', label: 'Settlements', description: 'Settlement and business overview', path: '/dashboard/settlements', icon: Wallet, keywords: ['settlement', 'payout', 'bank', 'credit'] },
  { type: 'page', label: 'Refunds & Disputes', description: 'Manage refunds and disputes', path: '/dashboard/refunds', icon: RefreshCcw, keywords: ['refund', 'dispute', 'chargeback', 'return'] },
  { type: 'page', label: 'Reports', description: 'Generate and download reports', path: '/dashboard/reports', icon: TrendingUp, keywords: ['report', 'analytics', 'export', 'download'] },
  { type: 'page', label: 'Support', description: 'Get help and support', path: '/dashboard/support', icon: HelpCircle, keywords: ['help', 'support', 'contact', 'ticket'] },
  { type: 'page', label: 'Profile Settings', description: 'Manage your profile', path: '/dashboard/settings?section=profile', icon: Settings, keywords: ['profile', 'settings', 'account', 'password'] },
  { type: 'page', label: 'Bank Details', description: 'View settlement account info', path: '/dashboard/settings?section=bank', icon: CreditCard, keywords: ['bank', 'account', 'settlement', 'ifsc'] },
  { type: 'page', label: 'API Keys', description: 'Manage API and integrations', path: '/dashboard/settings?section=api', icon: Key, keywords: ['api', 'key', 'webhook', 'integration'] },
  
  // Quick Actions/Features
  { type: 'action', label: 'Create New QR Code', description: 'Generate a new static or dynamic QR', path: '/dashboard/qr', icon: Plus, keywords: ['create', 'new', 'qr', 'generate'] },
  { type: 'action', label: 'Add Sub-Merchant', description: 'Register a new sub-merchant', path: '/dashboard/submerchants', icon: Plus, keywords: ['add', 'new', 'sub', 'merchant', 'create'] },
  { type: 'action', label: 'Initiate Refund', description: 'Process a new refund request', path: '/dashboard/refunds', icon: RefreshCcw, keywords: ['refund', 'initiate', 'process', 'return'] },
  { type: 'action', label: 'Raise Dispute', description: 'File a new dispute', path: '/dashboard/refunds', icon: AlertTriangle, keywords: ['dispute', 'raise', 'file', 'complaint'] },
  { type: 'action', label: 'Download Settlement Report', description: 'Export settlement data', path: '/dashboard/settlements', icon: Download, keywords: ['download', 'export', 'settlement', 'report'] },
  { type: 'action', label: 'View Business Summary', description: 'Check cumulative business', path: '/dashboard/settlements', icon: Eye, keywords: ['view', 'summary', 'business', 'overview'] },
  { type: 'action', label: 'Check Transaction Status', description: 'Track a specific transaction', path: '/dashboard/transactions', icon: Search, keywords: ['check', 'status', 'transaction', 'track'] },
  { type: 'action', label: 'Regenerate API Key', description: 'Generate new API credentials', path: '/dashboard/settings?section=api', icon: Key, keywords: ['regenerate', 'api', 'key', 'new'] },
  { type: 'action', label: 'Generate Daily Report', description: 'Create daily transaction report', path: '/dashboard/reports', icon: FileText, keywords: ['generate', 'daily', 'report', 'transactions'] },
];

// Recent/Popular suggestions
const quickSuggestions = [
  { label: 'View Today\'s Transactions', path: '/dashboard/transactions', icon: FileText },
  { label: 'Check Settlements', path: '/dashboard/settlements', icon: Wallet },
  { label: 'Manage QR Codes', path: '/dashboard/qr', icon: QrCode },
  { label: 'View Sub-Merchants', path: '/dashboard/submerchants', icon: Users },
];

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter items based on search query
  const filteredItems = searchQuery.trim() 
    ? searchableItems.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.label.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.keywords.some(k => k.includes(query))
        );
      })
    : [];

  // Group filtered items by type
  const pages = filteredItems.filter(i => i.type === 'page');
  const actions = filteredItems.filter(i => i.type === 'action');

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchFocused) return;
      
      const totalItems = searchQuery ? filteredItems.length : quickSuggestions.length;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (searchQuery && filteredItems[selectedIndex]) {
          handleNavigate(filteredItems[selectedIndex].path);
        } else if (!searchQuery && quickSuggestions[selectedIndex]) {
          handleNavigate(quickSuggestions[selectedIndex].path);
        }
      } else if (e.key === 'Escape') {
        setIsSearchFocused(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchFocused, searchQuery, filteredItems, selectedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Search with Command Palette */}
      <div ref={searchRef} className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          ref={inputRef}
          placeholder={t.dashboard.searchPlaceholder}
          className="pl-10 bg-background"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>

        {/* Search Dropdown */}
        {isSearchFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
            <ScrollArea className="max-h-[400px]">
              {/* No search query - show suggestions */}
              {!searchQuery.trim() && (
                <div className="p-2">
                  <p className="text-xs font-medium text-muted-foreground px-2 py-1.5">{t.dashboard.quickActions}</p>
                  {quickSuggestions.map((item, index) => (
                    <button
                      key={item.path + index}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors ${
                        selectedIndex === index ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                      }`}
                      onClick={() => handleNavigate(item.path)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.label}</span>
                      <ArrowRight className="h-3 w-3 ml-auto text-muted-foreground" />
                    </button>
                  ))}
                  <div className="border-t border-border mt-2 pt-2">
                    <p className="text-xs text-muted-foreground px-2 py-1">
                      Type to search pages, features, or actions...
                    </p>
                  </div>
                </div>
              )}

              {/* Search results */}
              {searchQuery.trim() && filteredItems.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{t.dashboard.noResults} "{searchQuery}"</p>
                  <p className="text-xs mt-1">{t.dashboard.trySearching}</p>
                </div>
              )}

              {searchQuery.trim() && filteredItems.length > 0 && (
                <div className="p-2">
                  {/* Pages Section */}
                  {pages.length > 0 && (
                    <>
                      <p className="text-xs font-medium text-muted-foreground px-2 py-1.5 flex items-center gap-2">
                        <LayoutDashboard className="h-3 w-3" />
                        {t.dashboard.pages}
                      </p>
                      {pages.map((item, index) => (
                        <button
                          key={item.path + item.label}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors ${
                            selectedIndex === index ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                          }`}
                          onClick={() => handleNavigate(item.path)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <item.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </>
                  )}

                  {/* Actions Section */}
                  {actions.length > 0 && (
                    <>
                      <p className="text-xs font-medium text-muted-foreground px-2 py-1.5 mt-2 flex items-center gap-2">
                        <Plus className="h-3 w-3" />
                        {t.dashboard.quickActions}
                      </p>
                      {actions.map((item, index) => (
                        <button
                          key={item.path + item.label}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors ${
                            selectedIndex === pages.length + index ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                          }`}
                          onClick={() => handleNavigate(item.path)}
                          onMouseEnter={() => setSelectedIndex(pages.length + index)}
                        >
                          <div className="h-8 w-8 rounded-md bg-green-500/10 flex items-center justify-center">
                            <item.icon className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          </div>
                          <Badge variant="outline" className="text-[10px] shrink-0">Action</Badge>
                        </button>
                      ))}
                    </>
                  )}

                  {/* Keyboard hints */}
                  <div className="border-t border-border mt-2 pt-2 px-2 pb-1 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↑↓</kbd>
                      {t.dashboard.navigate}
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">Enter</kbd>
                      {t.dashboard.select}
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">Esc</kbd>
                      Close
                    </span>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <LanguageSelector />
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium text-sm">Settlement Completed</span>
              <span className="text-xs text-muted-foreground">₹45,250 credited to your account</span>
              <span className="text-xs text-muted-foreground">2 mins ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium text-sm">New Transaction</span>
              <span className="text-xs text-muted-foreground">₹1,200 received from UPI</span>
              <span className="text-xs text-muted-foreground">15 mins ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium text-sm">Refund Processed</span>
              <span className="text-xs text-muted-foreground">₹500 refunded successfully</span>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile / Merchant Store Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  MS
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{t.dashboard.merchantStore}</span>
                <span className="text-xs text-muted-foreground">MID: CANARAXXXX1234</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>ABC Traders Pvt Ltd</span>
              <span className="text-xs font-normal text-muted-foreground">MID: CANARAXXXX1234</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings?section=profile')} className="cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings?section=bank')} className="cursor-pointer">
              <CreditCard className="h-4 w-4 mr-2" />
              Bank Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings?section=api')} className="cursor-pointer">
              <Key className="h-4 w-4 mr-2" />
              API Keys
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/')} className="text-destructive cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
