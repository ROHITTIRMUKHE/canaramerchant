import { motion } from 'framer-motion';
import { IndianRupee, Banknote, AlertCircle, Users } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import KPICard from '@/components/dashboard/KPICard';
import SettlementSnapshot from '@/components/dashboard/SettlementSnapshot';
import AlertsSection from '@/components/dashboard/AlertsSection';
import BusinessTrendChart from '@/components/dashboard/BusinessTrendChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import QuickActionsPanel from '@/components/dashboard/QuickActionsPanel';

// Mock role - in real app this would come from auth context
const isMainMerchant = true;

// Mock data - in real app this would come from API
const kpiData = {
  todaysCollection: {
    value: '₹1,45,250',
    change: '+12.5%',
    changeType: 'positive' as const
  },
  todaysSettlements: {
    value: '₹98,500',
    status: 'Completed',
    changeType: 'positive' as const
  },
  pendingActions: {
    count: 4,
    details: '4 items need attention'
  },
  activeSubMerchants: {
    count: 45,
    change: '+3'
  }
};

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Welcome back, Merchant Store
              </h1>
              <p className="text-muted-foreground">
                Here's your business overview for today.
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${isMainMerchant ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 mb-8`}>
              <KPICard
                title="Today's Collection"
                value={kpiData.todaysCollection.value}
                change={kpiData.todaysCollection.change}
                changeType={kpiData.todaysCollection.changeType}
                icon={IndianRupee}
                navigateTo="/dashboard/transactions?filter=today"
                delay={0}
                colorScheme="blue"
              />
              <KPICard
                title="Today's Settlements"
                value={kpiData.todaysSettlements.value}
                subtitle={`Status: ${kpiData.todaysSettlements.status}`}
                changeType={kpiData.todaysSettlements.changeType}
                icon={Banknote}
                navigateTo="/dashboard/settlements"
                delay={0.1}
                colorScheme="green"
              />
              <KPICard
                title="Pending Actions"
                value={String(kpiData.pendingActions.count)}
                subtitle={kpiData.pendingActions.details}
                icon={AlertCircle}
                navigateTo="/dashboard/refunds"
                delay={0.2}
                colorScheme="yellow"
              />
              {isMainMerchant && (
                <KPICard
                  title="Active Sub-Merchants"
                  value={String(kpiData.activeSubMerchants.count)}
                  change={kpiData.activeSubMerchants.change}
                  changeType="positive"
                  icon={Users}
                  navigateTo="/dashboard/submerchants"
                  delay={0.3}
                  colorScheme="purple"
                />
              )}
            </div>

            {/* Settlement Snapshot */}
            <div className="mb-8">
              <SettlementSnapshot />
            </div>

            {/* Alerts Section - Only shown when there are alerts */}
            <div className="mb-8">
              <AlertsSection />
            </div>

            {/* Charts and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <BusinessTrendChart />
              </div>
              <div>
                <QuickActionsPanel isMainMerchant={isMainMerchant} />
              </div>
            </div>

            {/* Recent Transactions */}
            <RecentTransactions />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
