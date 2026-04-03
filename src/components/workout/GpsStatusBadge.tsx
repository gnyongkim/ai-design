import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GpsStatusBadgeProps {
  isConnected: boolean;
}

/** GPS 신호 연결 상태를 표시하는 배지 컴포넌트 */
export function GpsStatusBadge({ isConnected }: GpsStatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          isConnected
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground animate-pulse"
        )}
      >
        <MapPin size={20} className="stroke-[2px]" />
      </div>
      <div className="flex flex-col gap-1">
        <Badge
          variant={isConnected ? "default" : "secondary"}
          className={cn(
            "text-xs",
            !isConnected && "animate-pulse"
          )}
        >
          {isConnected ? "GPS 연결됨" : "GPS 검색 중..."}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {isConnected ? "위치 정보를 사용할 수 있습니다" : "위치 정보를 확인하고 있습니다"}
        </span>
      </div>
    </div>
  );
}
