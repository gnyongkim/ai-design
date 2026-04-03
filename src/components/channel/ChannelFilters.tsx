import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const FILTERS = ["지역", "거리", "페이스", "목적", "가입가능"];

export function ChannelFilters() {
  return (
    <div className="sticky top-14 z-20 flex h-15 w-full items-center gap-2 overflow-x-auto bg-background/90 px-5 backdrop-blur-md [&::-webkit-scrollbar]:hidden">
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 rounded-full dark:border-border dark:bg-card dark:text-foreground"
        aria-label="Filters"
      >
        <Filter size={16} className="stroke-[2.5px]" />
      </Button>

      <Separator orientation="vertical" className="!h-5 !self-center mx-1 shrink-0" />

      {FILTERS.map((f, i) => (
        <Button
          key={f}
          variant={i === 0 ? "default" : "outline"}
          className={cn(
            "shrink-0 rounded-full px-5 text-sm font-bold",
            i === 0 && "border-primary",
            i !== 0 && "dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted"
          )}
        >
          {f}
        </Button>
      ))}
    </div>
  );
}
