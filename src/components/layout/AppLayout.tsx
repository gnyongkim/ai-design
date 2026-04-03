import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isFullScreenRoute =
    (location.pathname.startsWith('/social/') && location.pathname !== '/social') ||
    location.pathname === '/go/active' ||
    location.pathname === '/go/result';

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden relative">
      {/* Desktop Sidebar */}
      {!isFullScreenRoute && <Sidebar />}
      
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        {!isFullScreenRoute && <Header />}
        
        {/* Main Content Area */}
        <main className="relative flex-1 overflow-y-auto w-full flex flex-col">
          {children}
        </main>
        
        {/* Mobile Bottom Navigation */}
        {!isFullScreenRoute && <BottomNav />}
      </div>
    </div>
  );
}
