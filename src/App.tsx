import { AppLayout } from "./components/layout/AppLayout"

function App() {
  return (
    <AppLayout>
      {/* px-5: 모바일 좌우 20px, md:px-10: 데스크탑 좌우 40px 표준 여백 적용 */}
      {/* 200vh 더미 스크롤 테스트 용도 클래스 제거 (내용물에 맞게 높이가 자연스럽게 잡히도록 함) */}
      <div className="px-5 py-6 md:px-10 md:py-10 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-foreground/90">진행 중인 활동</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {/* Main Mileage Card */}
          <div className="col-span-2 md:col-span-3 rounded-[20px] bg-card/80 border border-border/60 p-6 md:p-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-sm md:text-base font-bold mb-1 text-muted-foreground">이번 달 마일리지</h2>
            <div className="text-[40px] md:text-[48px] font-black tracking-tighter text-primary">
              42.5 <span className="text-2xl md:text-3xl font-bold opacity-80">km</span>
            </div>
          </div>
          
          <div className="h-40 md:h-48 rounded-[20px] bg-muted/40 border border-border/40 p-6 flex flex-col justify-end transition-shadow hover:bg-muted/60">
            <div className="text-2xl md:text-3xl font-black tracking-tight text-foreground/90">4'30"</div>
            <div className="text-xs md:text-sm text-muted-foreground font-bold mt-1">최고 페이스</div>
          </div>
          <div className="h-40 md:h-48 rounded-[20px] bg-muted/40 border border-border/40 p-6 flex flex-col justify-end transition-shadow hover:bg-muted/60">
            <div className="text-2xl md:text-3xl font-black tracking-tight text-foreground/90">2,450</div>
            <div className="text-xs md:text-sm text-muted-foreground font-bold mt-1">소모 칼로리 (kcal)</div>
          </div>
          <div className="col-span-2 md:col-span-1 h-40 md:h-48 rounded-[20px] bg-muted/40 border border-border/40 p-6 flex flex-col justify-end transition-shadow hover:bg-muted/60">
            <div className="text-2xl md:text-3xl font-black tracking-tight text-foreground/90">3개</div>
            <div className="text-xs md:text-sm text-muted-foreground font-bold mt-1">참여 중인 러닝 크루</div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default App
