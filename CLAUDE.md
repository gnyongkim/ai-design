# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Design token build (tokens JSON → CSS variables)
npm run tokens:build

# Development server (builds tokens first, then starts Vite)
npm run dev

# Production build (tokens → TypeScript check → Vite bundle)
npm run build

# Lint
npm run lint
```

## Architecture

This project implements a **Design Token Pipeline**: Figma Variables → Style Dictionary → CSS Variables → shadcn/ui.

### Token Pipeline

```
tokens/primitive/*.tokens.json    (Figma Variables 형식 — raw colors, spacing, typography 등 참조용)
tokens/semantic/*.tokens.json     (light/dark — 해상된 시맨틱 색상 값)
tokens/chart/*.tokens.json        (light/dark — 차트 컬러)
tokens/border-radii.tokens.json   (border radius 토큰)
       ↓
sd.config.mjs                     (Style Dictionary + figma-variables preprocessor)
       ↓
src/styles/generated/             (light.css → :root, dark.css → .dark)  ← auto-generated, gitignored
       ↓
src/styles/globals.css            (imports generated CSS + Tailwind + shadcn)
       ↓
shadcn/ui components              (consume --primary, --background, etc.)
```

**Token source:** Obra shadcn/ui kit Community Edition (1.6.0) — Figma Variables 네이티브 내보내기 형식.

**Token tiers:**
- **Primitive** — 참조용 원시 값 (raw colors, brand colors, alpha, spacing, typography, shadows). SD 빌드에 미포함.
- **Semantic** — shadcn/ui CSS 변수명에 매핑 (background, primary, destructive 등). 해상된 값 사용.
- **Chart** — 차트 컬러 (categorical, sentiment, shades).

**Style Dictionary** (`css/shadcn` format in sd.config.mjs): Figma 색상 객체를 hex/rgba 변환, 카테고리 접두사 제거, flat `--variable-name` CSS 속성 출력.

### Tech Stack

- React 19 + TypeScript (strict) + Vite 8
- Tailwind CSS v4 (uses `@tailwindcss/vite` plugin, no tailwind.config file)
- shadcn/ui with CSS variables enabled (`components.json`)
- Dark mode: CSS class strategy (`.dark` on container element)

### Path Aliases

`@/*` → `./src/*` (configured in tsconfig.json, tsconfig.app.json, and vite.config.ts)

### Key Files

- `sd.config.mjs` — Style Dictionary build config, Figma Variables preprocessor, shadcn CSS format 정의
- `src/styles/globals.css` — CSS entry point; imports Tailwind, shadcn, generated token CSS, `@theme inline` 매핑
- `components.json` — shadcn/ui CLI configuration
- `tokens/semantic/light.tokens.json` / `dark.tokens.json` — 테마 색상 변경 시 편집할 파일
- `tokens/chart/light.tokens.json` / `dark.tokens.json` — 차트 컬러 변경 시 편집할 파일
