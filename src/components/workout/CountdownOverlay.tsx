import { useState, useEffect } from "react";

interface CountdownOverlayProps {
  onComplete: () => void;
}

/** 3→2→1→GO! 카운트다운 풀스크린 오버레이 */
export function CountdownOverlay({ onComplete }: CountdownOverlayProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <span
        key={count}
        className="text-7xl font-black tabular-nums text-primary animate-[countPop_0.6s_ease-out]"
      >
        {count === 0 ? "GO!" : count}
      </span>

      <style>{`
        @keyframes countPop {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
