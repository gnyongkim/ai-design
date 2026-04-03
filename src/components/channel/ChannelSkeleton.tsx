export function ChannelSkeleton() {
  return (
    <div className="relative flex h-[240px] w-full flex-col justify-end overflow-hidden rounded-[24px] bg-neutral-900 shadow-sm mt-1">
      {/* 백그라운드 이미지 영역 스켈레톤 펄스 */}
      <div className="absolute inset-0 bg-neutral-800 animate-pulse duration-1000" />

      {/* 실제 카드와 완전 동일한 깊이감 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
      
      {/* 실제 카드와 동일한 프리미엄 이너 링 */}
      <div className="absolute inset-0 z-20 rounded-[24px] border border-white/15 mix-blend-overlay pointer-events-none" />

      {/* Content Area */}
      <div className="relative z-10 flex w-full flex-col gap-4 p-5">
        
        {/* Top Area: Live Badge Skeleton */}
        <div className="absolute top-4 right-4 flex items-center">
          <div className="h-8 w-[76px] rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-pulse" />
        </div>

        {/* Text Info Skeleton */}
        <div className="flex flex-col gap-2 mt-auto">
          {/* Location Area */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-white/20 animate-pulse drop-shadow-md" />
            <div className="h-3.5 w-32 rounded-full bg-white/20 animate-pulse drop-shadow-md" />
          </div>
          {/* Title Area */}
          <div className="h-7 w-[75%] rounded-full bg-white/30 animate-pulse mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Meta / Metrics Skeleton (Empty Glass Pills) */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex h-[36px] w-[88px] rounded-xl bg-white/10 backdrop-blur-md border border-white/5 animate-pulse" />
          <div className="flex h-[36px] w-[92px] rounded-xl bg-white/10 backdrop-blur-md border border-white/5 animate-pulse" />
          
          <div className="ml-auto h-[36px] w-[70px] rounded-xl bg-primary/20 border border-primary/10 shadow-[0_2px_10px_var(--color-primary)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
