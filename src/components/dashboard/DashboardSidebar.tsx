import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Receipt,
  QrCode,
  Users,
  Wallet,
  FileText,
  RefreshCcw,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const menuItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { id: 'transactions', icon: Receipt, label: 'Transactions', path: '/dashboard/transactions' },
  { id: 'qr', icon: QrCode, label: 'QR Management', path: '/dashboard/qr' },
  { id: 'submerchants', icon: Users, label: 'Sub-Merchants', path: '/dashboard/submerchants' },
  { id: 'settlements', icon: Wallet, label: 'Settlements', path: '/dashboard/settlements' },
  { id: 'reports', icon: FileText, label: 'Reports', path: '/dashboard/reports' },
  { id: 'refunds', icon: RefreshCcw, label: 'Refunds & Disputes', path: '/dashboard/refunds' },
];

const bottomItems = [
  { id: 'settings', icon: Settings, label: 'Profile & Settings', path: '/dashboard/settings' },
  { id: 'support', icon: HelpCircle, label: 'Canara Support', path: '/dashboard/support' },
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const MenuItem = ({ item, isActive }: { item: typeof menuItems[0]; isActive: boolean }) => {
    const content = (
      <button
        onClick={() => navigate(item.path)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-semibold"
            : "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-semibold"
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-semibold"
          >
            {item.label}
          </motion.span>
        )}
      </button>
    );

    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold">CB</span>
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="font-bold text-sidebar-foreground">Canara Bank</h1>
              <p className="text-xs text-sidebar-foreground/70">Merchant Portal</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border space-y-2">
        {bottomItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isActive={location.pathname === item.path}
          />
        ))}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all duration-200 font-medium"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-muted-foreground hover:text-foreground font-medium"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
}