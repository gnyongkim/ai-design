import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/**
 * 상품 홈 히어로 배너 — 메인 프로모션 영역 (풀 와이드)
 */
export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent-2">
      {/* 데코 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 size-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 left-20 size-64 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid min-h-[480px] items-center gap-8 py-16 lg:grid-cols-2 lg:py-24">
          {/* 텍스트 영역 */}
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit border-primary/30 text-primary">
              2026 S/S NEW COLLECTION
            </Badge>

            <h1 className="text-4xl font-black leading-tight tracking-tight lg:text-6xl">
              <span className="text-foreground">한계를 넘어</span>
              <br />
              <span className="text-primary">새로운 나</span>
              <span className="text-foreground">를 만나다</span>
            </h1>

            <p className="max-w-md text-base text-muted-foreground leading-relaxed lg:text-lg">
              퍼포먼스와 스타일을 동시에. 프리미엄 운동 장비와 웨어로
              당신의 트레이닝을 완성하세요.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" className="h-11 px-6 text-sm font-bold">
                컬렉션 보기
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-6 text-sm font-bold">
                베스트셀러
              </Button>
            </div>

            {/* 간단 수치 */}
            <div className="flex items-center gap-8 pt-4">
              {[
                { value: "200+", label: "브랜드" },
                { value: "15K+", label: "상품" },
                { value: "98%", label: "만족도" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-black text-foreground lg:text-2xl">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 이미지 플레이스홀더 */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md">
              {/* 백그라운드 서클 */}
              <div className="absolute inset-4 rounded-full bg-primary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <div className="size-24 rounded-2xl bg-muted/50 flex items-center justify-center">
                    <span className="text-4xl">🏋️</span>
                  </div>
                  <span className="text-xs">Hero Image Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
