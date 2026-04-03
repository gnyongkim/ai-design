import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

const SEMANTIC_COLORS = [
  "background", "foreground", "primary", "primary-foreground",
  "secondary", "secondary-foreground", "muted", "muted-foreground",
  "accent", "accent-foreground", "destructive", "destructive-foreground",
  "border", "input", "ring",
  "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
]

function App() {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground p-8 transition-colors">
        <div className="max-w-4xl mx-auto space-y-8">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Design Token Pipeline Demo</h1>
              <p className="text-muted-foreground mt-2">
                Figma Variables → Style Dictionary → CSS Variables → shadcn/ui
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="dark-mode">Dark mode</Label>
              <Switch id="dark-mode" checked={dark} onCheckedChange={setDark} />
            </div>
          </div>

          <Separator />

          {/* Buttons */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Buttons</h2>
            <div className="flex gap-4 flex-wrap">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </section>

          <Separator />

          {/* Cards */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Token-Driven Theme</CardTitle>
                  <CardDescription>
                    모든 색상은 디자인 토큰에서 생성됩니다
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Badge>Design</Badge>
                    <Badge variant="secondary">Tokens</Badge>
                    <Badge variant="destructive">Pipeline</Badge>
                    <Badge variant="outline">shadcn/ui</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Workflow</CardTitle>
                  <CardDescription>
                    토큰 JSON 수정 → Style Dictionary 빌드 → CSS 변수 자동 갱신
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1">
                  <p>1. <code>tokens/</code> 에서 JSON 토큰 편집</p>
                  <p>2. <code>npm run tokens:build</code> 실행</p>
                  <p>3. CSS 변수가 자동으로 업데이트</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Form */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Form Inputs</h2>
            <div className="grid gap-4 max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" />
              </div>
              <Button className="w-full">Submit</Button>
            </div>
          </section>

          <Separator />

          {/* Token Swatches */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Semantic Token Swatches</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {SEMANTIC_COLORS.map(name => (
                <div key={name} className="text-center space-y-1">
                  <div
                    className="w-full h-12 rounded-md border border-border"
                    style={{ backgroundColor: `var(--${name})` }}
                  />
                  <span className="text-[10px] text-muted-foreground font-mono">
                    --{name}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default App
