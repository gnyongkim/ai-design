import { Bell } from "lucide-react";
import { Logo } from "../ui/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-[56px] w-full shrink-0 items-center justify-between border-b border-border/40 bg-background/70 px-5 backdrop-blur-2xl md:hidden">
      <div className="flex items-center gap-2.5">
        <Logo className="h-8 w-8 rounded-[8px]" />
        <div className="text-[20px] font-black text-foreground tracking-tighter mt-0.5">Ai-Design</div>
      </div>
      <div className="flex items-center">
        {/* 광학적 정렬(Optical Alignment): 터치 타겟(40px)을 유지하되, 내부 아이콘(22px)의 시각적 여백을 상쇄하기 위해 -mr-2 적용 */}
        <button className="relative flex h-10 w-10 -mr-2 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground active:scale-95 group">
          <div className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary ring-[2.5px] ring-background transition-transform group-active:scale-90" />
          <Bell size={22} className="stroke-[1.5px] transition-transform group-active:scale-90" />
        </button>
      </div>
    </header>
  );
}
