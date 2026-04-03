/** 운동 결과 화면 — 경로 미니맵 placeholder 카드 */
export function WorkoutResultMap() {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-2xl bg-neutral-900">
      {/* 그리드 배경 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* 가상 경로 */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M40 160 C80 140, 100 80, 160 90 S240 40, 300 60 S360 100, 370 50"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* 시작점 */}
        <circle cx="40" cy="160" r="5" fill="hsl(var(--primary))" opacity="0.6" />
        {/* 종료점 */}
        <circle cx="370" cy="50" r="5" fill="hsl(var(--destructive))" />
      </svg>

      {/* 라벨 */}
      <div className="absolute bottom-3 right-3 rounded-lg bg-background/60 backdrop-blur-sm px-2.5 py-1 text-xs text-muted-foreground">
        경로 미리보기
      </div>
    </div>
  );
}
