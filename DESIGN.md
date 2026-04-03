# UI/UX DESIGN & PUBLISHING GUIDELINES

이 문서는 당사의 모든 프로젝트에 적용되는 **전사 범용 디자인/퍼블리싱 표준 철학(Core Identity)**과, 현재 진행 중인 **개별 프로젝트 특화 정보(Project Specifics)**를 분리하여 관리합니다.

---

## 🏛️ PART 1. 전사 공통 코어 (Company-wide Universal Standard)
어떤 프로젝트라도 반드시 지켜야 하는 시니어 프로덕트 디자이너 수준의 불변의 원칙입니다.

### 1. Core Identity (디자인 철학)
1. **Pixel-Perfect & Token-based**: 모든 여백, 색상, 타이포그래피는 100% 디자인 토큰(CSS Variables)에 의존해야 합니다.
2. **Mobile First**: 설계와 퍼블리싱은 항상 모바일 해상도를 기준으로 시작하여 데스크탑으로 확장됩니다.
3. **Dark-mode First**: 모든 UI는 다크 모드와 라이트 모드 전환을 기본적으로 염두하여 토큰 기반으로 작성되어야 합니다.

### 2. Publishing Rules (퍼블리싱 절대 규칙)
- **하드코딩 엄금**: `5px`, `#ccc` 같은 임의의 매직 넘버/컬러 기입을 절대 금지합니다.
- **아이콘 표준 (Iconography)**: shadcn/ui 에코시스템과의 100% 호환성 및 벡터 선 두께(`strokeWidth`) 커스터마이징의 통일성을 위해, 프로젝트 내 모든 아이콘은 **반드시 `lucide-react` 만을 사용**합니다. 타 아이콘 라이브러리의 혼용을 절대 금지합니다.
- **광학적 정렬 (Optical Margin Alignment)**: 터치 타겟(패딩)과 눈에 보이는 시각적 아이콘 크기가 다를 경우, 물리적 여백이 아닌 시각적 밸런스를 기준으로 여백을 보정합니다. (예: 음수 마진 활용)
- **Micro-Interaction**: 모든 버튼, 링크, 인터랙티브 요소는 Hover, Active 시 스케일 변화나 색상 변화 등의 명확한 시각적 피드백(터치 애니메이션)을 구현해야 합니다. 전체 UI 레이아웃이 떨리지 않도록 가급적 내부 아이콘/텍스트 요소에 단독으로 트랜지션을 주어야 합니다.

### 3. Layout & Responsive (범용 레이아웃 분기)
- **Mobile (< 768px)**: 좁은 화면과 터치 접근성을 고려하여 하단 탭바(Bottom Navigation) 및 상단 앱바 구조를 지향합니다. iOS Safe Area(`pb-safe`, `env(safe-area-inset-bottom)` 등)를 철저히 지킵니다.
- **Desktop (>= 768px)**: 넓은 가로 공간을 효율적으로 사용하기 위해 모바일 하단 탭바를 좌측 사이드바(Sidebar) 혹은 상단 GNB로 능동적 유연하게 스위칭합니다.
- **다이내믹 그리드**: 기기 해상도에 맞추어 `Grid` 레이아웃 칼럼 수(예: 1열 -> 2열 -> 3열)를 능동적으로 변경합니다.

### 4. Component Pattern (컴포넌트 설계 철학)
- **단일 책임 원칙 (SRP)**: 동일한 역할의 UI 마크업(예: 로그인 버튼, 프로필 카드 등)을 다른 파일에 중복으로 마크업하지 않습니다. 반드시 재사용 가능한 공통 컴포넌트로 분리합니다.
- **JSDoc 주석**: 각 컴포넌트에는 역할을 명시하여 협업 효율을 높입니다.

### 5. 금지 패턴 (Anti-Pattern)
> [!CAUTION]
> 시그니처 퀄리티를 위협하는 아래 안티패턴은 엄격하게 금지합니다.
- 같은 그룹의 버튼에 정렬 방식(중앙 정렬 / 좌측 정렬 등)을 섞어 쓰지 않기.
- 단일 목적 페이지(로그인 폼 등)를 대시보드 리스트에나 쓰는 Card 컨테이너로 불필요하게 감싸지 않기.
- 메인 브랜드 컬러(Primary)를 눈에 띄지 않는 곳에만 두지 않기 (항상 핵심 CTA, 로고, 강조 액션에 적극적으로 분산 배치할 것).

---

## 🎯 PART 2. 현재 프로젝트 명세 (Project Specifics)
본 파트는 프로젝트가 진행됨에 따라 지속적으로 현행화(업데이트)되는 공간입니다. 

### 프로젝트 개요
- **프로젝트 명칭**: Ai-Design
- **핵심 비즈니스**: 지도 기반 실시간 피트니스 운동 + 스포셜 채널 + 커머스 앱
- **테마 무드**: 스포티하고 에너제틱한 피트니스 앱 (Dark Mode 기반 프리미엄 룩)
- **프레임워크**: React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui + lucide-react

### 프로젝트 주요 디자인 의사결정 (Design Decisions)
- **Glassmorphism 보다는 Solid 프레임 지향**: 카드가 투과되는 오버레이 레이아웃(Absolute+투명도)보다는, 콘텐츠 스크롤 영역이 명확히 단절되어 구조적 안정감을 주는 Solid 형태의 헤더/푸터 UI를 더 선호합니다.

### 주요 레이아웃 구조 현황
1. **AppLayout (`/layout/AppLayout.tsx`)**: 뷰포트 전체(100dvh)를 감싸는 반응형 최상위 1-Depth 래퍼.
2. **BottomNav (`/layout/BottomNav.tsx`)**
   - 모바일 전용 GNB. `px-5` 규칙 준수.
   - 중앙에 브랜드 컬러와 타겟 애니메이션 기반의 '플로팅 액션 아이콘' 배치 완료.
3. **Sidebar (`/layout/Sidebar.tsx`)**
   - 크로스 플랫폼(Desktop) 해상도 시 작동하는 좌측 고정 네비게이션. 
   - 프리미엄 로고 SVG 연동 완료.
4. **Header (`/layout/Header.tsx`)**
   - 모바일 전용 얇은 상단 앱바. 
   - 광학적 정렬(`Optical Alignment`)이 적용된 알림 아이콘 우측 배치.
