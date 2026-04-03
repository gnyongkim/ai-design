import { cn } from "../../lib/utils";

export function ChannelTabs({ activeTab, onTabChange }: { activeTab: 'my' | 'explore', onTabChange: (tab: 'my' | 'explore') => void }) {
  return (
    <div className="sticky top-0 z-30 flex h-14 w-full items-center bg-background/90 px-2 backdrop-blur-md">
      <div className="flex gap-2 w-full">
        <button
          onClick={() => onTabChange('explore')}
          className={cn(
            "relative flex h-14 flex-1 items-center justify-center transition-colors px-6",
            activeTab === 'explore' ? "text-foreground font-black text-lg" : "text-muted-foreground opacity-60 hover:opacity-100 font-bold text-base"
          )}
        >
          탐색
          {activeTab === 'explore' && <div className="absolute left-6 right-6 bottom-0 h-1 bg-foreground rounded-t-full" />}
        </button>
        <button
          onClick={() => onTabChange('my')}
          className={cn(
            "relative flex h-14 flex-1 items-center justify-center transition-colors px-6",
            activeTab === 'my' ? "text-foreground font-black text-lg" : "text-muted-foreground opacity-60 hover:opacity-100 font-bold text-base"
          )}
        >
          내 채널
          {activeTab === 'my' && <div className="absolute left-6 right-6 bottom-0 h-1 bg-foreground rounded-t-full" />}
        </button>
      </div>
    </div>
  );
}
