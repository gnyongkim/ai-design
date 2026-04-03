import { Filter } from "lucide-react";
import { cn } from "../../lib/utils";

const FILTERS = ["지역", "거리", "페이스", "목적", "가입가능"];

export function ChannelFilters() {
  return (
    <div className="sticky top-14 z-20 flex h-15 w-full items-center gap-2 overflow-x-auto bg-background/90 px-5 backdrop-blur-md [&::-webkit-scrollbar]:hidden">
      <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card border border-border text-foreground transition-colors hover:bg-muted active:scale-95" aria-label="Filters">
        <Filter size={16} className="stroke-[2.5px]" />
      </button>
      
      {/* Visual Divider */}
      <div className="h-5 w-px bg-border mx-1 shrink-0" />

      {FILTERS.map((f, i) => (
        <button
          key={f}
          className={cn(
            "flex h-9 shrink-0 items-center justify-center rounded-full border px-5 text-sm font-bold transition-all active:scale-95",
            i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
