import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden relative">
      {/* Desktop Sidebar */}
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <Header />
        
        {/* Main Content Area */}
        <main className="relative flex-1 overflow-y-auto w-full flex flex-col">
          {children}
        </main>
        
        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
