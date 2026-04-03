import { useState, useEffect, useRef } from "react";
import { ChannelTabs } from "../../components/channel/ChannelTabs";
import { ChannelFilters } from "../../components/channel/ChannelFilters";
import { ChannelCard } from "../../components/channel/ChannelCard";
import type { ChannelCardProps } from "../../components/channel/ChannelCard";
import { ChannelSkeleton } from "../../components/channel/ChannelSkeleton";
import { Plus } from "lucide-react";

// 실제 배경 이미지가 추가된 더미 데이터
const DUMMY_CHANNELS: ChannelCardProps[] = [
  { id: 1, title: "여의도 쾌속 질주", location: "여의도 한강공원", pace: "4'30\"", distance: "10km", currentMembers: 8, maxMembers: 10, isLive: true, bgUrl: "https://picsum.photos/id/1015/800/600" },
  { id: 2, title: "남산 업힐 극복방", location: "남산도서관 코스", pace: "6'00\"", distance: "5km", currentMembers: 14, maxMembers: 20, isLive: true, bgUrl: "https://picsum.photos/id/1016/800/600" },
  { id: 3, title: "초보환영 수다런", location: "반포 한강공원", pace: "7'00\"", distance: "3km", currentMembers: 2, maxMembers: 5, isLive: false, bgUrl: "https://picsum.photos/id/1018/800/600" },
  { id: 4, title: "오운완 페이스 메이킹", location: "석촌호수", pace: "5'15\"", distance: "8km", currentMembers: 1, maxMembers: 4, isLive: false, bgUrl: "https://picsum.photos/id/1019/800/600" },
  { id: 5, title: "새벽 공기 마시며", location: "서울숲", pace: "6'30\"", distance: "5km", currentMembers: 3, maxMembers: 6, isLive: false, bgUrl: "https://picsum.photos/id/1020/800/600" },
];

export function ChannelPage() {
  const [activeTab, setActiveTab] = useState<'explore' | 'my'>('explore');
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  // 1.5초 딜레이 페이크 로딩 (스켈레톤 UI 테스트용)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 탭 클릭 시 스무스 횡스크롤 애니메이션 이동
  const handleTabChange = (tab: 'explore' | 'my') => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    
    // 클릭(Programmatic Scroll) 플래그 켜기
    isProgrammaticScroll.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: tab === 'explore' ? 0 : containerWidth,
        behavior: 'smooth'
      });
    }

    // 스무스 스크롤 대략 수행 시간(400ms) 이후 락 해제
    scrollTimeout.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 400);
  };

  // 슬라이드(터치 드래그) 시 활성 탭 상태 동기화
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // 탭 버튼 클릭으로 이동 중일 땐 스크롤 싱크 무시 (플리커링 방지)
    if (isProgrammaticScroll.current) return;
    
    const { scrollLeft, clientWidth } = e.currentTarget;
    if (scrollLeft > clientWidth * 0.5) {
      if (activeTab !== 'my') setActiveTab('my');
    } else {
      if (activeTab !== 'explore') setActiveTab('explore');
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col w-full bg-background overflow-hidden">
      {/* 1. Header Navigation (Segmented / Sticky) */}
      <ChannelTabs activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* 2. Filter Carousel */}
      <ChannelFilters />
      
      {/* 3. Horizontal Native Swipe Container (Full Height Remaining) */}
      <div 
        ref={scrollContainerRef}
        className="flex flex-1 w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
      >
        {/* [탭 1] 탐색 구역 (독립 스크롤) */}
        <div className="w-full h-full shrink-0 snap-center overflow-y-auto px-5 pb-24 [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-4 py-6 w-full max-w-4xl mx-auto">
            {isLoading 
              ? Array(4).fill(0).map((_, i) => <ChannelSkeleton key={`skel-ex-${i}`} />)
              : DUMMY_CHANNELS.map(ch => <ChannelCard key={ch.id} {...ch} />)
            }
          </div>
        </div>

        {/* [탭 2] 내 채널 구역 (독립 스크롤) */}
        <div className="w-full h-full shrink-0 snap-center overflow-y-auto px-5 pb-24 [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-4 py-6 w-full max-w-4xl mx-auto">
            {isLoading 
              ? Array(2).fill(0).map((_, i) => <ChannelSkeleton key={`skel-my-${i}`} />)
              : DUMMY_CHANNELS.filter(ch => ch.isLive).map(ch => <ChannelCard key={`my-${ch.id}`} {...ch} />)
            }
          </div>
        </div>
      </div>

      {/* 4. Local Floating Action Button (New Channel) */}
      <button className="absolute bottom-6 right-5 md:bottom-10 md:right-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_rgb(0,0,0,0.3)] hover:-translate-y-1 active:scale-95 transition-all z-40 group">
        <Plus size={28} className="stroke-[2.5px] transition-transform group-hover:rotate-90 group-active:scale-90" />
      </button>
    </div>
  );
}
