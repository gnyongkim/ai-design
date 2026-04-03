import { Card, CardContent } from "@/components/ui/card";

interface WorkoutResultStatsProps {
  distanceKm: number;
  elapsedSeconds: number;
  avgPaceMinPerKm: number;
  avgSpeedKmH: number;
}

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatPace(paceMinPerKm: number): string {
  if (paceMinPerKm <= 0 || !isFinite(paceMinPerKm)) return "--'--\"";
  const min = Math.floor(paceMinPerKm);
  const sec = Math.round((paceMinPerKm - min) * 60);
  return `${min}'${String(sec).padStart(2, "0")}"`;
}

/** 운동 결과 지표 2×2 그리드 */
export function WorkoutResultStats({
  distanceKm,
  elapsedSeconds,
  avgPaceMinPerKm,
  avgSpeedKmH,
}: WorkoutResultStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard label="총 거리" value={distanceKm.toFixed(2)} unit="km" />
      <StatCard label="총 시간" value={formatTime(elapsedSeconds)} unit="" />
      <StatCard label="평균 페이스" value={formatPace(avgPaceMinPerKm)} unit="min/km" />
      <StatCard label="평균 속도" value={avgSpeedKmH.toFixed(1)} unit="km/h" />
    </div>
  );
}

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <Card className="items-center border-0 ring-0 bg-muted/40">
      <CardContent className="flex flex-col items-center gap-1 p-6">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="text-2xl font-bold tabular-nums text-foreground">{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </CardContent>
    </Card>
  );
}
