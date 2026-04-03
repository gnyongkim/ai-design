import { Heart, Star, ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Product {
  name: string
  brand: string
  price: string
  originalPrice?: string
  discount?: string
  rating: number
  reviews: number
  tag?: string
  emoji: string
}

const PRODUCTS: Product[] = [
  {
    name: "에어맥스 트레이너 프로",
    brand: "FITX Original",
    price: "159,000",
    originalPrice: "219,000",
    discount: "27%",
    rating: 4.8,
    reviews: 342,
    tag: "BEST",
    emoji: "👟",
  },
  {
    name: "퍼포먼스 컴프레션 타이츠",
    brand: "FITX Active",
    price: "89,000",
    rating: 4.6,
    reviews: 218,
    emoji: "🩳",
  },
  {
    name: "프로 리프팅 벨트 X3",
    brand: "IronGrip",
    price: "65,000",
    originalPrice: "85,000",
    discount: "24%",
    rating: 4.9,
    reviews: 567,
    tag: "HOT",
    emoji: "🏋️",
  },
  {
    name: "울트라라이트 트레이닝 슈즈",
    brand: "VeloStep",
    price: "129,000",
    rating: 4.7,
    reviews: 189,
    emoji: "👟",
  },
  {
    name: "드라이핏 트레이닝 탱크탑",
    brand: "FITX Active",
    price: "45,000",
    originalPrice: "59,000",
    discount: "24%",
    rating: 4.5,
    reviews: 431,
    emoji: "👕",
  },
  {
    name: "프리미엄 요가매트 6mm",
    brand: "ZenFlow",
    price: "78,000",
    rating: 4.8,
    reviews: 295,
    tag: "NEW",
    emoji: "🧘",
  },
]

/**
 * 인기 상품 그리드 — 상품 카드 반응형 레이아웃
 */
export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">인기 상품</h2>
          <p className="mt-1 text-sm text-muted-foreground">가장 많이 찾는 베스트 아이템</p>
        </div>
        <a href="#" className="text-sm font-medium text-primary hover:underline underline-offset-4">
          전체 보기
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:gap-5">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href="#"
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-square bg-muted/30 flex items-center justify-center overflow-hidden">
        <span className="text-5xl transition-transform group-hover:scale-110 lg:text-6xl">
          {product.emoji}
        </span>

        {/* 태그 */}
        {product.tag && (
          <Badge
            variant={product.tag === "NEW" ? "secondary" : "default"}
            className="absolute top-2.5 left-2.5 text-[10px]"
          >
            {product.tag}
          </Badge>
        )}

        {/* 위시리스트 */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-2 right-2 bg-background/60 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="위시리스트에 추가"
        >
          <Heart className="size-3.5" />
        </Button>

        {/* 퀵 장바구니 */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full transition-transform group-hover:translate-y-0">
          <div className="flex items-center justify-center gap-2 bg-primary/90 backdrop-blur-sm py-2.5 text-primary-foreground text-xs font-semibold">
            <ShoppingBag className="size-3.5" />
            장바구니 담기
          </div>
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="flex flex-col gap-1.5 p-3 lg:p-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </span>
        <span className="text-sm font-semibold leading-snug text-foreground line-clamp-2">
          {product.name}
        </span>

        {/* 별점 */}
        <div className="flex items-center gap-1">
          <Star className="size-3 fill-primary text-primary" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
        </div>

        {/* 가격 */}
        <div className="flex items-baseline gap-2 pt-1">
          {product.discount && (
            <span className="text-sm font-bold text-primary">{product.discount}</span>
          )}
          <span className="text-sm font-bold text-foreground">{product.price}원</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {product.originalPrice}원
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
