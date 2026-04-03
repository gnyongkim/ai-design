import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Users, Timer, Crown, Share2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// Mock Data
const MOCK_CHANNEL = {
  id: 1,
  title: "여의도 쾌속 질주",
  hostName: "러닝마스터",
  location: "여의도 한강공원 이벤트 광장",
  pace: "4'30\"",
  distance: "10km",
  bgUrl: "https://picsum.photos/id/1015/800/600",
  briefing: "여의도 한강공원에서 출발해서 10km 빠르게 달립니다. 페이스 맞출 수 있는 분들 우선으로 참여 부탁드립니다. 준비물 없이 몸만 오시면 됩니다!",
  participants: [
    { id: '1', name: '러닝마스터', isHost: true, isReady: true, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: '질주본능', isHost: false, isReady: true, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: '초보러너', isHost: false, isReady: false, avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: '한강스위퍼', isHost: false, isReady: true, avatar: 'https://i.pravatar.cc/150?u=4' },
  ]
};

export function ChannelDetailPage() {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [myStatus, setMyStatus] = useState<'NOT_JOINED' | 'JOINED' | 'READY'>('NOT_JOINED');

  // 페이크 로딩 1.5초 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => navigate(-1);

  if (isLoading) {
    return <ChannelDetailSkeleton />;
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden pb-24">
      {/* 1. Transparent Local Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between px-2 pt-safe-top">
         <Button
           variant="ghost"
           size="icon"
           onClick={handleBack}
           className="rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30"
         >
           <ChevronLeft size={24} />
         </Button>
         <div className="flex gap-2">
           <Button
             variant="ghost"
             size="icon"
             className="rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30"
           >
             <Share2 size={20} />
           </Button>
           <Button
             variant="ghost"
             size="icon"
             className="rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30"
           >
             <MoreHorizontal size={20} />
           </Button>
         </div>
      </header>

      {/* 2. Hero Background (Wide Image Snapshot) */}
      <div className="relative h-[360px] w-full shrink-0 bg-muted">
        <img
          src={MOCK_CHANNEL.bgUrl}
          alt={MOCK_CHANNEL.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* 선명한 텍스트 가독성을 위한 타이트한 블랙 그라데이션 (안개 효과 제거) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

        {/* Hero Title Overlay */}
        <div className="absolute bottom-12 left-5 right-5 flex flex-col gap-2">
           <div className="flex items-center gap-1.5 text-primary drop-shadow-md">
             <MapPin size={16} className="stroke-[2.5px]" />
             <span className="text-[14px] font-bold text-white/95">{MOCK_CHANNEL.location}</span>
           </div>
           <h1 className="text-[28px] font-black leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
             {MOCK_CHANNEL.title}
           </h1>
        </div>
      </div>

      {/* 3. Content Section (Overlap Pattern) */}
      <div className="relative -mt-6 flex flex-col rounded-t-[32px] bg-background pt-8 pb-6 shadow-[0_-8px_20px_rgba(0,0,0,0.05)] z-10 w-full shadow-black/5 dark:shadow-black/20">

        {/* Briefing & Meta Information */}
        <div className="flex flex-col px-5 gap-6">
          {/* Meta Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="gap-1 rounded-2xl p-4 ring-0 border border-border shadow-sm">
              <span className="text-[13px] font-bold text-muted-foreground flex items-center gap-1.5">
                <Timer size={14} className="stroke-[2.5px]" /> 목표 페이스
              </span>
              <div className="flex items-end gap-1 mt-1">
                <span className="text-[22px] font-black leading-none text-foreground">{MOCK_CHANNEL.pace}</span>
                <span className="mb-0.5 text-[12px] font-bold text-muted-foreground">/km</span>
              </div>
            </Card>
            <Card className="gap-1 rounded-2xl p-4 ring-0 border border-border shadow-sm">
              <span className="text-[13px] font-bold text-muted-foreground flex items-center gap-1.5">
                <MapPin size={14} className="stroke-[2.5px]" /> 목표 거리
              </span>
              <div className="flex items-end gap-1 mt-1">
                <span className="text-[22px] font-black leading-none text-foreground">{MOCK_CHANNEL.distance.replace('km', '')}</span>
                <span className="mb-0.5 text-[12px] font-bold text-muted-foreground">km</span>
              </div>
            </Card>
          </div>

          {/* Briefing Text Panel */}
          <Card className="gap-2 rounded-2xl p-4 ring-0 bg-muted/30 border border-border/50">
            <span className="text-[13px] font-bold text-primary">호스트의 한 줄 브리핑</span>
            <p className="text-[15px] font-medium leading-relaxed text-foreground/90">
              {MOCK_CHANNEL.briefing}
            </p>
          </Card>
        </div>

        {/* 4. Participants Grid (Lobby) */}
        <div className="flex flex-col py-6 mt-2">
          <div className="flex items-center justify-between px-5 mb-4">
            <h2 className="text-[18px] font-black text-foreground">대기석 <span className="text-primary">{myStatus !== 'NOT_JOINED' ? MOCK_CHANNEL.participants.length + 1 : MOCK_CHANNEL.participants.length}</span></h2>
            <span className="text-[13px] font-bold text-muted-foreground">최대 10명</span>
          </div>

          {/* Empty State 예외 처리 */}
          {MOCK_CHANNEL.participants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-card/30 rounded-2xl mx-5 border border-border border-dashed">
              <Users size={32} className="text-muted-foreground mb-3 opacity-50" />
              <h3 className="text-[15px] font-bold text-foreground mb-1">참여한 러너가 아직 없어요</h3>
              <p className="text-[13px] font-medium text-muted-foreground">첫 번째 러너가 되어 흐름을 만들어보세요!</p>
            </div>
          ) : (
            <div className="flex w-full overflow-x-auto px-5 pt-3 pb-4 gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">

               {/* If user joined, inject 'my' avatar into the lobby */}
               {myStatus !== 'NOT_JOINED' && (
                  <div className="flex flex-col items-center gap-2 shrink-0 snap-start">
                    <div className={cn(
                      "relative flex h-16 w-16 items-center justify-center rounded-full p-[2.5px] transition-all duration-300",
                      myStatus === 'READY' ? "bg-primary animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_12px_var(--color-primary)] ring-2 ring-primary ring-offset-2 ring-offset-background" : "bg-border"
                    )}>
                      <Avatar className="h-full w-full border-2 border-background">
                        <AvatarImage src="https://i.pravatar.cc/150?u=me" alt="나" />
                        <AvatarFallback>나</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-[13px] font-bold text-foreground">나 (Me)</span>
                  </div>
               )}

               {/* Existing Participants */}
               {MOCK_CHANNEL.participants.map(p => (
                 <div key={p.id} className="flex flex-col items-center gap-2 shrink-0 snap-start">
                   <div className={cn(
                     "relative flex h-16 w-16 items-center justify-center rounded-full p-[2.5px] transition-all duration-300",
                     p.isReady ? "bg-primary shadow-[0_0_8px_var(--color-primary)]" : "bg-border"
                   )}>
                     <Avatar className="h-full w-full border-2 border-background">
                       <AvatarImage src={p.avatar} alt={p.name} />
                       <AvatarFallback>{p.name[0]}</AvatarFallback>
                     </Avatar>
                     {p.isHost && (
                       <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 border-2 border-background shadow-sm">
                         <Crown size={12} className="text-white fill-white" />
                       </div>
                     )}
                   </div>
                   <span className="text-[13px] font-bold text-muted-foreground">{p.name}</span>
                 </div>
               ))}
            </div>
          )}
        </div>

      </div>

      {/* 5. Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-5 bg-gradient-to-t from-background via-background/95 to-transparent pb-[calc(1.25rem+env(safe-area-inset-bottom))] pointer-events-none">
         <div className="pointer-events-auto flex gap-3">
          {myStatus === 'NOT_JOINED' && (
            <Button
              onClick={() => setMyStatus('JOINED')}
              className="w-full h-14 rounded-2xl text-[16px] font-black shadow-[0_8px_20px_rgba(var(--color-primary),0.3)]"
            >
              참가하기
            </Button>
          )}
          {myStatus === 'JOINED' && (
            <>
              <Button
                variant="outline"
                onClick={() => setMyStatus('NOT_JOINED')}
                className="shrink-0 w-14 h-14 rounded-2xl"
              >
                나가기
              </Button>
              <Button
                onClick={() => setMyStatus('READY')}
                className="flex-1 h-14 rounded-2xl bg-foreground text-[16px] font-black text-background shadow-lg hover:bg-foreground/90"
              >
                준비 완료 (READY)
              </Button>
            </>
          )}
          {myStatus === 'READY' && (
            <Button
              variant="outline"
              onClick={() => setMyStatus('JOINED')}
              className="w-full h-14 rounded-2xl border-2 border-primary text-[16px] font-black text-primary shadow-[0_4px_12px_rgba(var(--color-primary),0.2)]"
            >
              준비 취소
            </Button>
          )}
         </div>
      </div>
    </div>
  )
}

function ChannelDetailSkeleton() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background overflow-hidden relative">
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between px-2 pt-safe-top">
         <Skeleton className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800 backdrop-blur-md" />
         <div className="flex gap-2">
           <Skeleton className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800 backdrop-blur-md" />
           <Skeleton className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800 backdrop-blur-md" />
         </div>
      </header>

      {/* Hero Skeleton */}
      <Skeleton className="relative h-[360px] w-full shrink-0 rounded-none bg-neutral-300 dark:bg-neutral-900 duration-1000">
        <div className="absolute bottom-12 left-5 right-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full bg-neutral-400 dark:bg-neutral-700" />
            <Skeleton className="h-4 w-32 rounded-full bg-neutral-400 dark:bg-neutral-700" />
          </div>
          <Skeleton className="h-8 w-[80%] rounded-full bg-neutral-400 dark:bg-neutral-700 mt-1" />
        </div>
      </Skeleton>

      {/* Content Section Skeleton (Overlap) */}
      <div className="relative -mt-6 flex flex-col rounded-t-[32px] bg-background pt-8 pb-6 z-10 w-full h-full border-t border-border/50 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col px-5 gap-6">
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-[96px] rounded-2xl bg-neutral-200 dark:bg-neutral-800 border border-border" />
            <Skeleton className="h-[96px] rounded-2xl bg-neutral-200 dark:bg-neutral-800 border border-border" />
          </div>
          <Skeleton className="h-[104px] rounded-2xl bg-neutral-300/50 dark:bg-neutral-800 border border-border/50" />
        </div>

        <div className="flex flex-col py-8 pb-28 px-5 gap-4">
          <Skeleton className="h-5 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-16 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                <Skeleton className="h-3 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-5 bg-gradient-to-t from-background via-background/95 to-transparent pb-[calc(1.25rem+env(safe-area-inset-bottom))] pointer-events-none">
         <Skeleton className="flex w-full h-14 rounded-2xl bg-neutral-200 dark:bg-neutral-800 border border-border" />
      </div>
    </div>
  );
}
