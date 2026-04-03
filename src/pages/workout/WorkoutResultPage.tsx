import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutResultMap } from "@/components/workout/WorkoutResultMap";
import { WorkoutResultStats } from "@/components/workout/WorkoutResultStats";

interface WorkoutResultData {
  elapsedSeconds: number;
  distanceKm: number;
  avgPace: number;
  avgSpeed: number;
}

/** 운동 결과 (기록 상세) 화면 */
export function WorkoutResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // WorkoutActivePage에서 전달된 데이터 또는 기본값 (더미)
  const data: WorkoutResultData = (location.state as WorkoutResultData) ?? {
    elapsedSeconds: 2700,
    distanceKm: 5.23,
    avgPace: 5.17,
    avgSpeed: 8.64,
  };

  const now = new Date();
  const endTime = now;
  const startTime = new Date(now.getTime() - data.elapsedSeconds * 1000);

  const dateStr = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const timeRangeStr = `${formatKoreanTime(startTime)} ~ ${formatKoreanTime(endTime)}`;

  const handleClose = () => navigate("/");

  return (
    <div className="absolute inset-0 flex flex-col bg-background overflow-y-auto">
      {/* 상단 Header */}
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/90 backdrop-blur-md px-5">
        <h1 className="text-lg font-bold text-foreground">운동 기록</h1>
        <button
          onClick={handleClose}
          className="flex h-10 w-10 -mr-2 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted active:scale-95"
          aria-label="닫기"
        >
          <X size={22} className="stroke-[1.5px]" />
        </button>
      </header>

      {/* 콘텐츠 */}
      <div className="flex flex-1 flex-col gap-6 px-5 py-6">
        {/* 경로 미니맵 */}
        <WorkoutResultMap />

        {/* 날짜/시간 정보 */}
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-foreground">{dateStr}</span>
          <span className="text-sm text-muted-foreground">{timeRangeStr}</span>
        </div>

        {/* 운동 지표 그리드 */}
        <WorkoutResultStats
          distanceKm={data.distanceKm}
          elapsedSeconds={data.elapsedSeconds}
          avgPaceMinPerKm={data.avgPace}
          avgSpeedKmH={data.avgSpeed}
        />
      </div>

      {/* 하단 확인 버튼 */}
      <div className="shrink-0 px-5 pb-8 pt-4">
        <Button onClick={handleClose} className="w-full h-12 text-base font-semibold">
          확인
        </Button>
      </div>
    </div>
  );
}

function formatKoreanTime(date: Date): string {
  return date.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
