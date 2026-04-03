import { Link, useLocation } from "react-router-dom";
import { navItems } from "./nav";
import { cn } from "../../lib/utils";

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="shrink-0 w-full z-50 bg-background/90 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex h-16 items-center justify-around relative px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isFloating) {
            return (
              <div key={item.path} className="relative flex-[1.2] flex justify-center h-full">
                {/* Floating Action Button */}
                <Link
                  to={item.path}
                  className="absolute -top-7 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_30px_rgb(0,0,0,0.25)] ring-[6px] ring-background transition-transform active:scale-95 hover:scale-105 group"
                  aria-label={item.label}
                >
                  <Icon size={28} className="fill-current transition-transform group-active:scale-90" />
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex flex-1 flex-col items-center justify-center gap-1 pt-1 pb-1 transition-all select-none",
                isActive ? "text-primary opacity-100 font-bold" : "text-muted-foreground opacity-60 hover:opacity-100 font-medium"
              )}
              aria-label={item.label}
            >
              <div className="flex h-7 items-center justify-center transition-transform group-active:scale-90">
                <Icon size={24} className={isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"} />
              </div>
              <span className="text-[0.65rem] leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
