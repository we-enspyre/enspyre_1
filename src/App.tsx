import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from 'next-themes'

const queryClient = new QueryClient(); // Create a new instance of QueryClient for React Query

const App = () => ( // Define the main App component
  <ThemeProvider attribute="class" defaultTheme="system">
  <QueryClientProvider client={queryClient}> {/* Provide React Query context to the app */}
    <TooltipProvider> {/* Provide tooltip context to all children */}
      <Toaster /> {/* Render the custom Toaster component for notifications */}
      <Sonner /> {/* Render the Sonner toaster component for notifications */}
      {/* ✅ USE HashRouter */}
      <HashRouter> {/* Use HashRouter for client-side routing */}
        <Routes> {/* Define routing configuration */}
          <Route path="/" element={<Index />} /> {/* Route for the index (home) page */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 Not Found */}
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>

);

export default App; // Export the App component as default
