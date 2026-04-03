import { cn } from "@/lib/utils";

interface WorkoutTimerPanelProps {
  elapsedSeconds: number;
  isPaused: boolean;
}

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** 상단 플로팅 타이머 패널 (Glassmorphism) */
export function WorkoutTimerPanel({ elapsedSeconds, isPaused }: WorkoutTimerPanelProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex justify-center pt-14 px-6">
      <div className="flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-2xl px-8 py-4 shadow-lg border border-border/30">
        <span
          className={cn(
            "text-4xl font-bold tabular-nums text-foreground tracking-tight",
            isPaused && "animate-pulse"
          )}
        >
          {formatTime(elapsedSeconds)}
        </span>
      </div>
    </div>
  );
}
