import {
  Dumbbell,
  Footprints,
  Waves,
  Mountain,
  Bike,
  Trophy,
  Shirt,
  Timer,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Category {
  icon: LucideIcon
  label: string
  count: string
}

const CATEGORIES: Category[] = [
  { icon: Footprints, label: "러닝", count: "2,340" },
  { icon: Dumbbell, label: "피트니스", count: "1,890" },
  { icon: Waves, label: "요가", count: "1,120" },
  { icon: Mountain, label: "아웃도어", count: "980" },
  { icon: Bike, label: "사이클", count: "760" },
  { icon: Trophy, label: "스포츠", count: "1,450" },
  { icon: Shirt, label: "웨어", count: "3,200" },
  { icon: Timer, label: "액세서리", count: "2,100" },
]

/**
 * 운동 카테고리 네비게이션 — 아이콘 + 라벨 그리드
 */
export function CategoryNav() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">카테고리</h2>
          <p className="mt-1 text-sm text-muted-foreground">원하는 운동 카테고리를 선택하세요</p>
        </div>
        <a href="#" className="text-sm font-medium text-primary hover:underline underline-offset-4">
          전체 보기
        </a>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:grid-cols-8">
        {CATEGORIES.map(({ icon: Icon, label, count }) => (
          <a
            key={label}
            href="#"
            className="group flex flex-col items-center gap-2.5 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-primary/5 lg:p-5"
          >
            <div className="flex size-11 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10 lg:size-12">
              <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary lg:size-6" />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xs font-semibold text-foreground sm:text-sm">{label}</span>
              <span className="hidden text-[10px] text-muted-foreground sm:block">{count}개</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
