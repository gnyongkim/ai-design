import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPlaceholder } from "@/components/workout/MapPlaceholder";
import { CountdownOverlay } from "@/components/workout/CountdownOverlay";
import { WorkoutTimerPanel } from "@/components/workout/WorkoutTimerPanel";
import { WorkoutStatsPanel } from "@/components/workout/WorkoutStatsPanel";
import { WorkoutControls } from "@/components/workout/WorkoutControls";
import { StopConfirmDialog } from "@/components/workout/StopConfirmDialog";

/** 운동 중 HUD 화면 — 카운트다운 → 운동 → 종료 다이얼로그 */
export function WorkoutActivePage() {
  const navigate = useNavigate();

  // 운동 상태
  const [phase, setPhase] = useState<"countdown" | "running" | "paused">("countdown");
  const [showStopDialog, setShowStopDialog] = useState(false);

  // 타이머
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // 시뮬레이션용 운동 데이터
  const [distanceKm, setDistanceKm] = useState(0);

  // 평균 페이스 계산 (min/km)
  const avgPace = distanceKm > 0 ? (elapsedSeconds / 60) / distanceKm : 0;

  // 타이머 시작/정지
  useEffect(() => {
    if (phase === "running") {
      intervalRef.current = window.setInterval(() => {
        setElapsedSeconds((s) => s + 1);
        // 시뮬레이션: 매 초 약 2.5m 이동 (약 9km/h 페이스)
        setDistanceKm((d) => d + 0.0025);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  const handleCountdownComplete = useCallback(() => {
    setPhase("running");
  }, []);

  const handlePause = () => setPhase("paused");
  const handleResume = () => setPhase("running");
  const handleStopRequest = () => setShowStopDialog(true);

  const handleStopConfirm = (saveRecord: boolean) => {
    setShowStopDialog(false);
    if (saveRecord) {
      // 결과 화면으로 이동 (state로 운동 데이터 전달)
      navigate("/go/result", {
        state: {
          elapsedSeconds,
          distanceKm,
          avgPace,
          avgSpeed: distanceKm > 0 ? (distanceKm / elapsedSeconds) * 3600 : 0,
        },
      });
    } else {
      navigate("/go");
    }
  };

  const handleStopCancel = () => {
    setShowStopDialog(false);
  };

  // 실시간 페이스 (최근 데이터 기반 시뮬레이션)
  const currentPace = distanceKm > 0 ? (elapsedSeconds / 60) / distanceKm : 0;

  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-900">
      {/* 지도 배경 (풀스크린) */}
      <MapPlaceholder className="absolute inset-0 w-full h-full" />

      {/* 카운트다운 오버레이 */}
      {phase === "countdown" && (
        <CountdownOverlay onComplete={handleCountdownComplete} />
      )}

      {/* HUD: 타이머 + 지표 (카운트다운 완료 후) */}
      {phase !== "countdown" && (
        <>
          <WorkoutTimerPanel
            elapsedSeconds={elapsedSeconds}
            isPaused={phase === "paused"}
          />

          <WorkoutStatsPanel distanceKm={distanceKm} paceMinPerKm={currentPace}>
            <WorkoutControls
              isPaused={phase === "paused"}
              onPause={handlePause}
              onResume={handleResume}
              onStop={handleStopRequest}
            />
          </WorkoutStatsPanel>
        </>
      )}

      {/* 종료 확인 다이얼로그 */}
      <StopConfirmDialog
        open={showStopDialog}
        elapsedSeconds={elapsedSeconds}
        distanceKm={distanceKm}
        avgPace={avgPace}
        onCancel={handleStopCancel}
        onConfirm={handleStopConfirm}
      />
    </div>
  );
}
