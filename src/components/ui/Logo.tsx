import { Activity } from "lucide-react";
import { cn } from "../../lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-primary shadow-sm",
        className
      )}
    >
      {/* 3D Gloss & Light Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/20 mix-blend-overlay" />
      <div className="absolute -left-[20%] -top-[20%] h-[140%] w-[140%] rotate-45 bg-gradient-to-b from-white/20 to-transparent blur-[1px] mix-blend-overlay" />

      {/* Iconic Fitness/Movement Symbol */}
      <Activity
        className="relative z-10 w-[60%] h-[60%] text-primary-foreground drop-shadow-md"
        strokeWidth={2.5}
      />
    </div>
  );
}
