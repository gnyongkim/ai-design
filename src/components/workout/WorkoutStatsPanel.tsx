interface WorkoutStatsPanelProps {
  distanceKm: number;
  paceMinPerKm: number;
  children: React.ReactNode;
}

function formatPace(paceMinPerKm: number): string {
  if (paceMinPerKm <= 0 || !isFinite(paceMinPerKm)) return "--'--\"";
  const min = Math.floor(paceMinPerKm);
  const sec = Math.round((paceMinPerKm - min) * 60);
  return `${min}'${String(sec).padStart(2, "0")}"`;
}

/** 하단 플로팅 지표 + 컨트롤 패널 (Glassmorphism Bottom Sheet) */
export function WorkoutStatsPanel({ distanceKm, paceMinPerKm, children }: WorkoutStatsPanelProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      <div className="rounded-t-3xl bg-background/60 backdrop-blur-2xl border-t border-border/30 px-6 pt-6 pb-8 shadow-[0_-8px_30px_rgb(0,0,0,0.15)]">
        {/* 지표 그리드 (2열) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatItem label="거리" value={distanceKm.toFixed(2)} unit="km" />
          <StatItem label="페이스" value={formatPace(paceMinPerKm)} unit="min/km" />
        </div>

        {/* 컨트롤 버튼 영역 */}
        <div className="flex items-center justify-center gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span className="text-3xl font-bold tabular-nums text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{unit}</span>
    </div>
  );
}
