# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Design token build (tokens JSON → CSS variables)
npm run tokens:build

# Dev app — development server
npm run dev

# Dev app — production build (tokens → TypeScript check → Vite bundle)
npm run build

# Publishing app — development server
npm run dev:publishing

# Publishing app — production build
npm run build:publishing

# Lint
npm run lint
```

## Architecture

Two-app structure sharing a single design system: **dev** (main app) and **publishing** (design token demo/showcase).

### Project Layout

```
root/
├── src/                         # Dev app entry + shared code
│   ├── App.tsx, main.tsx        # Dev app (루트 vite.config.ts, index.html 사용)
│   ├── components/ui/           # 공유 — shadcn/ui 컴포넌트
│   ├── lib/                     # 공유 — utils (cn helper 등)
│   └── styles/                  # 공유 — globals.css, generated/ (gitignored)
├── publishing/                  # Publishing app (자체 vite.config.ts, index.html)
│   └── src/ (App.tsx, main.tsx)
├── tokens/                      # Style Dictionary 소스 토큰
├── assets/                      # Figma Variables 네이티브 내보내기 원본
└── sd.config.mjs                # Style Dictionary 빌드 설정
```

Both apps share `@/*` → `./src/*` alias. Publishing app's `vite.config.ts` sets `root: __dirname` and resolves `@` to `../src`.

### Token Pipeline

```
tokens/semantic/*.tokens.json  +  tokens/chart/*.tokens.json  +  tokens/border-radii.tokens.json
       ↓
sd.config.mjs    (figma-variables preprocessor → css/shadcn format)
       ↓
src/styles/generated/light.css (:root)  +  dark.css (.dark)    ← auto-generated, gitignored
       ↓
src/styles/globals.css    (imports generated CSS + Tailwind + shadcn + @theme inline 매핑)
       ↓
shadcn/ui components    (consume --primary, --background, etc.)
```

**Token source:** Obra shadcn/ui kit Community Edition (1.6.0) — Figma Variables 네이티브 내보내기 형식.

**Token tiers:**
- **Primitive** (`tokens/primitive/`) — 참조용 원시 값 (raw colors, brand colors, alpha, spacing, typography, shadows). SD 빌드에 미포함.
- **Semantic** (`tokens/semantic/`) — shadcn/ui CSS 변수명에 매핑 (background, primary, destructive 등). 해상된 값 사용.
- **Chart** (`tokens/chart/`) — 차트 컬러 (categorical, sentiment, shades).

**Style Dictionary** (`css/shadcn` format in sd.config.mjs): Figma 색상 객체를 hex/rgba 변환, 카테고리 접두사 제거, flat `--variable-name` CSS 속성 출력.

### Tech Stack

- React 19 + TypeScript (strict) + Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite` plugin, no tailwind.config file)
- shadcn/ui with CSS variables enabled (`components.json`)
- Dark mode: CSS class strategy (`.dark` on container element)

### Path Aliases

`@/*` → `./src/*` (configured in tsconfig.json, tsconfig.app.json, and both vite.config.ts files)

### Key Files

- `sd.config.mjs` — Style Dictionary build config, Figma Variables preprocessor, shadcn CSS format 정의
- `src/styles/globals.css` — CSS entry point; imports Tailwind, shadcn, generated token CSS, `@theme inline` 매핑
- `components.json` — shadcn/ui CLI configuration
- `tokens/semantic/light.tokens.json` / `dark.tokens.json` — 테마 색상 변경 시 편집할 파일
- `tokens/chart/light.tokens.json` / `dark.tokens.json` — 차트 컬러 변경 시 편집할 파일

---

## 디자인 / 퍼블리싱 규칙

디자인 원칙, 퍼블리싱 규칙, 검수 체크리스트는 **[DESIGN.md](./DESIGN.md)** 에서 관리한다. 퍼블리싱 작업 시 반드시 DESIGN.md를 참조할 것.
