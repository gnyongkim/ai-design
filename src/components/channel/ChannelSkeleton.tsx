import { Skeleton } from "@/components/ui/skeleton";

export function ChannelSkeleton() {
  return (
    <div className="relative flex h-60 w-full flex-col justify-end overflow-hidden rounded-[24px] bg-neutral-200 dark:bg-neutral-800 shadow-sm mt-1 border border-border/50 animate-pulse">
      {/* 프리미엄 이너 링 유지 */}
      <div className="absolute inset-0 z-20 rounded-[24px] border border-white/10 mix-blend-overlay pointer-events-none" />

      {/* Content Area */}
      <div className="relative z-10 flex w-full flex-col gap-4 p-5">

        {/* Top Area: Live Badge Skeleton */}
        <div className="absolute top-4 right-4 flex items-center">
          <Skeleton className="h-8 w-19 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </div>

        {/* Text Info Skeleton */}
        <div className="flex flex-col gap-2 mt-auto">
          {/* Location Area */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <Skeleton className="h-3.5 w-32 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          </div>
          {/* Title Area */}
          <Skeleton className="h-7 w-[75%] rounded-full bg-neutral-300 dark:bg-neutral-700 mt-1" />
        </div>

        {/* Meta / Metrics Skeleton */}
        <div className="flex items-center gap-2 mt-1">
          <Skeleton className="h-9 w-22 rounded-xl bg-neutral-300 dark:bg-neutral-700" />
          <Skeleton className="h-9 w-23 rounded-xl bg-neutral-300 dark:bg-neutral-700" />
          <Skeleton className="ml-auto h-9 w-17 rounded-xl bg-neutral-300 dark:bg-neutral-700" />
        </div>
      </div>
    </div>
  );
}
