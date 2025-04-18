
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import { RequireAuth } from "./components/auth/RequireAuth";
import AchievementsPage from "./pages/Achievements";
import LeaderboardPage from "./pages/Leaderboard";
import ProfilePage from "./pages/Profile";

// Define App as a proper function component
function App() {
  // Create QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
              <Route path="/achievements" element={<RequireAuth><AchievementsPage /></RequireAuth>} />
              <Route path="/leaderboard" element={<RequireAuth><LeaderboardPage /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
              <Route path="/profile/:username" element={<RequireAuth><ProfilePage /></RequireAuth>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
