import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { RoleGuard } from "@/components/admin/RoleGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import Sections from "./pages/admin/Sections";
import Content from "./pages/admin/Content";
import Videos from "./pages/admin/Videos";
import Users from "./pages/admin/Users";
import Navigation from "./pages/admin/Navigation";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<RoleGuard><Dashboard /></RoleGuard>} />
              <Route path="/admin/sections" element={<RoleGuard><Sections /></RoleGuard>} />
              <Route path="/admin/content" element={<RoleGuard><Content /></RoleGuard>} />
              <Route path="/admin/videos" element={<RoleGuard><Videos /></RoleGuard>} />
              <Route path="/admin/navigation" element={<RoleGuard><Navigation /></RoleGuard>} />
              <Route path="/admin/users" element={<RoleGuard requireAdmin><Users /></RoleGuard>} />
              <Route path="/admin/settings" element={<RoleGuard requireAdmin><Settings /></RoleGuard>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
