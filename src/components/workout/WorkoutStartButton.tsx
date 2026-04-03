import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface WorkoutStartButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

/** 대형 원형 GO 시작 버튼 */
export function WorkoutStartButton({ disabled, onClick }: WorkoutStartButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-28 w-28 rounded-full text-3xl font-black tracking-tight",
        "shadow-[0_8px_40px_rgb(0,0,0,0.3)]",
        "transition-transform duration-150",
        "hover:scale-105"
      )}
      aria-label="운동 시작"
    >
      GO
    </Button>
  );
}
