import StyleDictionary from 'style-dictionary';

/* ------------------------------------------------------------------ */
/*  Preprocessor: Figma Variables 형식 → Style Dictionary 호환 값 변환  */
/* ------------------------------------------------------------------ */
StyleDictionary.registerPreprocessor({
  name: 'figma-variables',
  preprocessor: (dictionary) => {
    function walk(obj) {
      for (const key of Object.keys(obj)) {
        // Figma 메타데이터 제거
        if (key === '$extensions' || key === '$description') {
          delete obj[key];
          continue;
        }

        const node = obj[key];
        if (node && typeof node === 'object') {
          if ('$value' in node) {
            // 토큰 노드 — 값 정규화
            const v = node.$value;
            if (typeof v === 'object' && v !== null && 'hex' in v) {
              // Figma 색상 객체 → CSS 문자열
              if (v.alpha != null && v.alpha < 1) {
                const r = Math.round(v.components[0] * 255);
                const g = Math.round(v.components[1] * 255);
                const b = Math.round(v.components[2] * 255);
                const a = parseFloat(v.alpha.toFixed(2));
                node.$value = `rgba(${r}, ${g}, ${b}, ${a})`;
              } else {
                node.$value = v.hex.toLowerCase();
              }
            }
            delete node.$extensions;
            delete node.$description;
          } else {
            walk(node);
          }
        }
      }
    }
    walk(dictionary);
    return dictionary;
  },
});

/* ------------------------------------------------------------------ */
/*  Format: shadcn/ui CSS custom properties                           */
/* ------------------------------------------------------------------ */
const SKIP_CATEGORIES = new Set(['obra-shadcn-docs']);
const CHART_PREFIX_CATEGORIES = new Set(['sentiment', 'shades']);

StyleDictionary.registerFormat({
  name: 'css/shadcn',
  format: ({ dictionary, options }) => {
    const selector = options?.selector || ':root';
    const lines = [];

    for (const token of dictionary.allTokens) {
      const topCategory = token.path[0];
      if (SKIP_CATEGORIES.has(topCategory)) continue;

      // 리프 토큰 이름 사용, 공백 → 하이픈
      let varName = token.path[token.path.length - 1].replace(/\s+/g, '-');

      // chart sentiment/shades 토큰은 chart- 접두사 추가
      if (CHART_PREFIX_CATEGORIES.has(topCategory)) {
        varName = `chart-${varName}`;
      }

      let value = token.$value ?? token.value;

      // 숫자 값(border-radius 등) → rem 변환
      if (token.$type === 'number' && typeof value === 'number') {
        if (value === 0) value = '0px';
        else if (value >= 9999) value = '9999px';
        else value = `${value / 16}rem`;
      }

      lines.push(`  --${varName}: ${value};`);
    }

    return `${selector} {\n${lines.join('\n')}\n}\n`;
  },
});

/* ------------------------------------------------------------------ */
/*  Build: Light + Dark 테마                                           */
/* ------------------------------------------------------------------ */
const sdLight = new StyleDictionary({
  source: [
    'tokens/semantic/light.tokens.json',
    'tokens/chart/light.tokens.json',
    'tokens/border-radii.tokens.json',
  ],
  preprocessors: ['figma-variables'],
  platforms: {
    css: {
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'light.css',
          format: 'css/shadcn',
          options: { selector: ':root' },
        },
      ],
    },
  },
});

const sdDark = new StyleDictionary({
  source: [
    'tokens/semantic/dark.tokens.json',
    'tokens/chart/dark.tokens.json',
  ],
  preprocessors: ['figma-variables'],
  platforms: {
    css: {
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'dark.css',
          format: 'css/shadcn',
          options: { selector: '.dark' },
        },
      ],
    },
  },
});

await sdLight.buildAllPlatforms();
await sdDark.buildAllPlatforms();

console.log('✅ Design tokens built successfully');
