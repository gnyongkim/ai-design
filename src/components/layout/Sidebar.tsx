import { Link, useLocation } from "react-router-dom";
import { navItems } from "./nav";
import { cn } from "../../lib/utils";
import { Logo } from "../ui/Logo";
import { Settings } from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden h-[100dvh] w-[88px] flex-col items-center justify-between border-r border-border/60 bg-sidebar py-6 md:flex shrink-0">
      {/* Logo Area */}
      <div className="flex flex-col items-center gap-2">
        <Logo className="h-11 w-11 rounded-2xl shadow-sm" />
      </div>

      {/* Nav List */}
      <nav className="flex flex-1 flex-col items-center justify-center gap-4 w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isFloating) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="my-5 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_16px_rgb(0,0,0,0.2)] ring-[4px] ring-background transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgb(0,0,0,0.3)] active:scale-95 group"
                aria-label={item.label}
              >
                <Icon size={26} className="fill-current transition-transform group-active:scale-90" />
              </Link>
            );
          }

          return (
            <div key={item.path} className="relative w-full flex justify-center group outline-none">
              <Link
                to={item.path}
                className={cn(
                  "flex w-[64px] flex-col items-center justify-center gap-1.5 rounded-[18px] py-3 transition-colors",
                  isActive ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
                aria-label={item.label}
              >
                <Icon size={24} className={cn("transition-transform group-hover:scale-110 group-active:scale-95", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
                <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
              </Link>
              
              {/* Active Indicator Pill */}
              {isActive && (
                <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary shadow-[2px_0_8px_var(--color-primary)] opacity-90 transition-all duration-300" />
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Area (Settings) */}
      <button className="flex h-11 w-11 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95">
        <Settings size={20} className="stroke-[1.5px]" />
      </button>
    </aside>
  );
}
