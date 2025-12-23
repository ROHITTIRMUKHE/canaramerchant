import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Users, QrCode } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import TransactionsChart from '@/components/dashboard/TransactionsChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import QuickActions from '@/components/dashboard/QuickActions';

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
                Here's what's happening with your payments today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Today's Collection"
                value="₹1,45,250"
                change="+12.5%"
                changeType="positive"
                icon={IndianRupee}
                delay={0}
              />
              <StatsCard
                title="Total Transactions"
                value="1,234"
                change="+8.2%"
                changeType="positive"
                icon={TrendingUp}
                delay={0.1}
              />
              <StatsCard
                title="Active Sub-Merchants"
                value="45"
                change="+3"
                changeType="positive"
                icon={Users}
                delay={0.2}
              />
              <StatsCard
                title="QR Codes Generated"
                value="128"
                change="+15"
                changeType="positive"
                icon={QrCode}
                delay={0.3}
              />
            </div>

            {/* Charts and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <TransactionsChart />
              </div>
              <div>
                <QuickActions />
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