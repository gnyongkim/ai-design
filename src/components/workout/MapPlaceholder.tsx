/** 지도 placeholder — 추후 네이버맵으로 교체 */
export function MapPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-neutral-900 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* 가상 경로 라인 */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M120 700 C120 600, 200 550, 220 450 S300 350, 280 250 S200 150, 220 80"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 6"
        />
        {/* 현재 위치 점 */}
        <circle cx="220" cy="80" r="8" fill="hsl(var(--primary))" opacity="0.8" />
        <circle cx="220" cy="80" r="16" fill="hsl(var(--primary))" opacity="0.2">
          <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* 가상 거리명 라벨 */}
      <div className="absolute top-1/3 left-6 text-white/10 text-xs font-medium rotate-[-15deg]">
        올림픽대로
      </div>
      <div className="absolute top-1/2 right-8 text-white/10 text-xs font-medium rotate-[5deg]">
        한강공원길
      </div>
    </div>
  );
}
