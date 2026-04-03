import { useState } from "react";
import { navItems } from "./nav";
import { cn } from "../../lib/utils";

export function BottomNav() {
  const [activePath, setActivePath] = useState("/");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-t border-border/40 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex h-[64px] items-center justify-around relative px-2">
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          const Icon = item.icon;

          if (item.isFloating) {
            return (
              <div key={item.path} className="relative flex-[1.2] flex justify-center h-full">
                {/* Floating Action Button */}
                <button
                  onClick={() => setActivePath(item.path)}
                  className="absolute -top-7 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_30px_rgb(0,0,0,0.25)] ring-[6px] ring-background transition-transform active:scale-95 hover:scale-105 group"
                  aria-label={item.label}
                >
                  <Icon size={28} className="fill-current transition-transform group-active:scale-90" />
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.path}
              onClick={() => setActivePath(item.path)}
              className={cn(
                "group flex flex-1 flex-col items-center justify-center gap-1 pt-1 pb-1 transition-all select-none",
                isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-60 hover:opacity-100"
              )}
              aria-label={item.label}
            >
              <div className="flex h-[28px] items-center justify-center transition-transform group-active:scale-90">
                <Icon size={24} className={isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"} />
              </div>
              <span className="text-[10px] font-bold leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
