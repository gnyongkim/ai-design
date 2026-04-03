import { Mountain } from "lucide-react";

export interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex w-full h-[calc(100dvh-56px-64px)] md:h-full flex-col items-center justify-center bg-background px-5">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted/30 border border-border/50 shadow-sm">
          <Mountain className="h-10 w-10 text-muted-foreground stroke-[1.5px]" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black tracking-tight text-foreground">{title}</h2>
          <p className="text-[15px] text-muted-foreground font-medium whitespace-pre-line">
            현재 뷰는 서비스 로직을 준비 중입니다.{"\n"}곧 더 멋진 기능으로 찾아오겠습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
