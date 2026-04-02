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

This project implements a **Design Token Pipeline**: Figma Variables → Token Studio → Style Dictionary → CSS Variables → shadcn/ui.

### Token Pipeline

```
tokens/primitive/*.json   (raw colors, spacing, radii, font sizes)
tokens/semantic/*.json    (light.json, dark.json — reference primitives via {primitive.color.slate.900} syntax)
       ↓
sd.config.mjs             (Style Dictionary + @tokens-studio/sd-transforms)
       ↓
src/styles/generated/     (light.css → :root, dark.css → .dark)  ← auto-generated, gitignored
       ↓
src/styles/globals.css    (imports generated CSS + Tailwind + shadcn)
       ↓
shadcn/ui components      (consume --primary, --background, etc.)
```

**Token tiers:**
- **Primitive** — design-agnostic values (color palettes, dimensions). DTCG format with `$value`/`$type`.
- **Semantic** — meaningful names mapping to shadcn/ui CSS variable names (`background`, `primary`, `destructive`, etc.). Use `{primitive.*}` references.

**Style Dictionary custom format** (`css/shadcn` in sd.config.mjs): filters semantic tokens only, strips `semantic.` prefix, outputs flat `--variable-name` CSS properties. Access resolved values via `token.$value` (not `token.value`).

### Tech Stack

- React 19 + TypeScript (strict) + Vite 8
- Tailwind CSS v4 (uses `@tailwindcss/vite` plugin, no tailwind.config file)
- shadcn/ui with CSS variables enabled (`components.json`)
- Dark mode: CSS class strategy (`.dark` on container element)

### Path Aliases

`@/*` → `./src/*` (configured in tsconfig.json, tsconfig.app.json, and vite.config.ts)

### Key Files

- `sd.config.mjs` — Style Dictionary build config, registers Token Studio transforms, defines light/dark platform builds
- `src/styles/globals.css` — CSS entry point; imports Tailwind, shadcn, generated token CSS, and defines `@theme inline` mappings
- `components.json` — shadcn/ui CLI configuration
- `tokens/semantic/light.json` / `dark.json` — the files to edit when changing theme colors
