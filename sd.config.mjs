import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// Token Studio transforms 등록
register(StyleDictionary);

// 커스텀 포맷: semantic 토큰만 shadcn/ui CSS 변수로 출력
StyleDictionary.registerFormat({
  name: 'css/shadcn',
  format: ({ dictionary, options }) => {
    const selector = options.selector || ':root';
    const vars = dictionary.allTokens
      .filter(token => token.path[0] === 'semantic')
      .map(token => {
        const name = token.path.slice(1).join('-');
        return `  --${name}: ${token.$value};`;
      })
      .join('\n');
    return `${selector} {\n${vars}\n}\n`;
  },
});

// Light 테마
const sdLight = new StyleDictionary({
  source: [
    'tokens/primitive/**/*.json',
    'tokens/semantic/light.json',
  ],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
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

// Dark 테마
const sdDark = new StyleDictionary({
  source: [
    'tokens/primitive/**/*.json',
    'tokens/semantic/dark.json',
  ],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
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

await sdLight.cleanAllPlatforms();
await sdLight.buildAllPlatforms();
await sdDark.cleanAllPlatforms();
await sdDark.buildAllPlatforms();

console.log('✔ Design tokens built successfully');
