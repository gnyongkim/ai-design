import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface StopConfirmDialogProps {
  open: boolean;
  elapsedSeconds: number;
  distanceKm: number;
  avgPace: number;
  onCancel: () => void;
  onConfirm: (saveRecord: boolean) => void;
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

/** 운동 종료 확인 다이얼로그 — 5분 미만/이상 분기 */
export function StopConfirmDialog({
  open,
  elapsedSeconds,
  distanceKm,
  avgPace,
  onCancel,
  onConfirm,
}: StopConfirmDialogProps) {
  const [saveRecord, setSaveRecord] = useState(true);
  const isUnderFiveMin = elapsedSeconds < 300;

  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialogContent className="max-w-sm">
        {isUnderFiveMin ? (
          /* 5분 미만 */
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>운동 시간이 너무 짧아요</AlertDialogTitle>
              <AlertDialogDescription>
                5분 이하의 운동은 기록으로 저장되지 않습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => onConfirm(false)}>
                종료하기
              </AlertDialogAction>
              <AlertDialogCancel onClick={onCancel}>계속 운동하기</AlertDialogCancel>
            </AlertDialogFooter>
          </>
        ) : (
          /* 5분 이상 */
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>운동을 종료할까요?</AlertDialogTitle>
              <AlertDialogDescription>운동 요약을 확인하세요</AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3 rounded-xl bg-muted/50 p-4">
                <SummaryItem label="시간" value={formatTime(elapsedSeconds)} />
                <SummaryItem label="거리" value={`${distanceKm.toFixed(2)}km`} />
                <SummaryItem label="페이스" value={formatPace(avgPace)} />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="save-record"
                  checked={saveRecord}
                  onCheckedChange={(v) => setSaveRecord(v === true)}
                />
                <Label htmlFor="save-record" className="text-sm text-foreground cursor-pointer">
                  이 운동을 기록으로 저장합니다
                </Label>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>
              <AlertDialogAction onClick={() => onConfirm(saveRecord)}>
                종료하기
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-bold tabular-nums text-foreground">{value}</span>
    </div>
  );
}
