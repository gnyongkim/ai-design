import { useState, useRef, useCallback, useEffect } from "react";
import { Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutControlsProps {
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

const LONG_PRESS_DURATION = 2000;

/** 일시정지/재개/종료 컨트롤 버튼 그룹 */
export function WorkoutControls({ isPaused, onPause, onResume, onStop }: WorkoutControlsProps) {
  return (
    <>
      {!isPaused ? (
        /* 운동 중: 일시정지 버튼 1개 */
        <Button
          variant="secondary"
          onClick={onPause}
          className="h-16 w-16 rounded-full shadow-md"
          aria-label="일시정지"
        >
          <Pause size={28} className="stroke-[2px]" />
        </Button>
      ) : (
        /* 일시정지: 재개 + 종료 버튼 */
        <>
          <Button
            onClick={onResume}
            className="h-16 w-16 rounded-full shadow-lg"
            aria-label="재개"
          >
            <Play size={28} className="stroke-[2px]" />
          </Button>
          <LongPressStopButton onStop={onStop} />
        </>
      )}
    </>
  );
}

/** 롱프레스 2초 홀드 종료 버튼 — 프로그레스 링 애니메이션 */
function LongPressStopButton({ onStop }: { onStop: () => void }) {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const stopTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setProgress(0);
  }, []);

  const updateProgress = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const pct = Math.min(elapsed / LONG_PRESS_DURATION, 1);
    setProgress(pct);
    if (pct < 1) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const handlePressStart = useCallback(() => {
    startTimeRef.current = Date.now();
    rafRef.current = requestAnimationFrame(updateProgress);
    timerRef.current = window.setTimeout(() => {
      stopTimers();
      onStop();
    }, LONG_PRESS_DURATION);
  }, [onStop, updateProgress, stopTimers]);

  useEffect(() => {
    return stopTimers;
  }, [stopTimers]);

  const circumference = 2 * Math.PI * 28;
  const dashOffset = circumference * (1 - progress);

  return (
    <Button
      variant="destructive"
      onMouseDown={handlePressStart}
      onMouseUp={stopTimers}
      onMouseLeave={stopTimers}
      onTouchStart={handlePressStart}
      onTouchEnd={stopTimers}
      onTouchCancel={stopTimers}
      className="relative h-16 w-16 rounded-full bg-destructive text-destructive-foreground shadow-lg select-none hover:bg-destructive/90"
      aria-label="종료 (길게 누르기)"
    >
      <Square size={24} className="stroke-[2.5px] fill-current" />

      {/* 프로그레스 링 */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="opacity-40 transition-none"
        />
      </svg>
    </Button>
  );
}
