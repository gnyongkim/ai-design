import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footprints } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GpsStatusBadge } from "@/components/workout/GpsStatusBadge";
import { WorkoutStartButton } from "@/components/workout/WorkoutStartButton";

/** 운동 준비 화면 — GPS 상태 확인 후 운동 시작 */
export function WorkoutReadyPage() {
  const navigate = useNavigate();
  const [gpsConnected, setGpsConnected] = useState(false);

  // 1.5초 후 GPS 연결 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => setGpsConnected(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    navigate("/go/active");
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-between px-5 py-8">
      {/* 상단: 타이틀 */}
      <div className="flex flex-col items-center gap-2 pt-4">
        <h1 className="text-2xl font-bold text-foreground">운동 시작</h1>
        <p className="text-sm text-muted-foreground">준비가 되면 GO 버튼을 눌러주세요</p>
      </div>

      {/* 중단: GPS 상태 + 운동 종류 */}
      <div className="flex flex-col items-center gap-6">
        <GpsStatusBadge isConnected={gpsConnected} />
        <Badge variant="secondary" className="gap-2 rounded-full px-4 py-2">
          <Footprints size={18} className="text-primary stroke-[2px]" />
          <span className="text-sm font-semibold text-foreground">러닝</span>
        </Badge>
      </div>

      {/* 하단: GO 버튼 */}
      <div className="flex flex-col items-center gap-4 pb-4">
        <WorkoutStartButton disabled={!gpsConnected} onClick={handleStart} />
        {!gpsConnected && (
          <p className="text-xs text-muted-foreground animate-pulse">
            GPS 신호를 검색 중입니다...
          </p>
        )}
      </div>
    </div>
  );
}
