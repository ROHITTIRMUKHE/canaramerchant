import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import QRManagement from "./pages/QRManagement";
import TransactionSummary from "./pages/TransactionSummary";
import Reports from "./pages/Reports";
import ProfileSettings from "./pages/ProfileSettings";
import CanaraSupport from "./pages/CanaraSupport";
import RefundsDisputes from "./pages/RefundsDisputes";
import SubMerchantManagement from "./pages/SubMerchantManagement";
import Settlements from "./pages/Settlements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/qr" element={<QRManagement />} />
              <Route path="/dashboard/transactions" element={<TransactionSummary />} />
              <Route path="/dashboard/reports" element={<Reports />} />
              <Route path="/dashboard/settings" element={<ProfileSettings />} />
              <Route path="/dashboard/support" element={<CanaraSupport />} />
              <Route path="/dashboard/refunds" element={<RefundsDisputes />} />
              <Route path="/dashboard/submerchants" element={<SubMerchantManagement />} />
              <Route path="/dashboard/settlements" element={<Settlements />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;