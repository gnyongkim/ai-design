# 🏃 Workout (실시간 지도 운동) UI/UX 기획 및 정책서

**마지막 업데이트**: 2026-04-03
**비즈니스 목적**: 앱의 가장 중요한 엔진. 사용자의 실시간 GPS 위치를 추적하며 이동 경로, 스피드, 페이스 등 피트니스 핵심 지표를 기록하고 보여주는 HUD 화면.

---

## 🎯 1. 핵심 정책 규정 (UX Core)

### 1-1. 화면 잠금 방지 보장 극대화 (HUD 방식)
- 달리거나 자전거를 타는 중에는 화면을 정밀하게 터치하기 불가능합니다.
- 조작보다는 **'보기(Seeing)'**에 집중한 구성이어야 하며, 햇빛 아래서도 잘 보이는 고채도 색상을 사용하여 대형 HUD 패널처럼 구성되어야 합니다.

### 1-2. 오발동 방지 디자인 (Accident-proof Interactivity)
- 사용자가 뛰다가 땀 묻은 손으로 실수로 '운동 종료'나 '일시 정지'를 누르는 것을 방지해야 합니다.
- **롱 프레스(Long Press) 2초 홀더** 기능 채용. 프로그레스 링 애니메이션으로 시각적 피드백 제공.

---

## 📊 2. 데이터 노출 우선순위 (UI 레이아웃 기준)

1. **지도 컴포넌트 (Map Surface)**: 전체 화면 비율의 70% 이상을 차지. 내 이동 경로와 현재 방향. (타 유저 시인성 확보).
2. **진행 지표 (Current Stats)**:
   - 페이스 (Pace, Min/Km)
   - 소요 시간 (Timer)
   - 이동 거리 (Distance, km)
3. **액션 컨트롤러 (Controls)**: 일시 정지(Pause) / 재개(Resume) / 종료(Stop).

---

## 🎨 3. 레이아웃 및 렌더링 가이드라인

### 3-1. 레이아웃 구조 (Edge-to-Edge)
- 일반적인 Dashboard나 Channel 탭과 다르게 `AppLayout`의 전역 패딩(`px-5`)을 벗어나, **다크 테마 지도(Map)가 화면을 100% 가득 채우는 풀스크린 플로우**입니다.
- 지표를 보여주는 정보 패널은 지도를 완전히 덮지 않고, 화면 하단 또는 상단에 `Bottom Sheet` 형태로 블러 처리되어 떠 있는 패널이어야 합니다.

### 3-2. 컴포넌트 시각적 퀄리티 (Senior Polish)
- **Glassmorphism HUD**: 지도 위에 오버레이 되는 통계 패널은 `backdrop-blur-2xl` 속성으로 뒷배경(지도 노선)이 비치도록 연출.
- **초대형 모노스페이스 숫자**: 러닝 지표(타이머/거리)는 숫자의 폭이 바뀌어도 전체 UI가 흔들리지 않도록 고정 폭 폰트(Monospaced features)인 `tabular-nums` 클래스를 적극 활용합니다.

---

## 🗺 4. 운동 플로우 전체 구조

### 4-1. 운동 상태 흐름도

```
[운동 준비] → GO 버튼 → [카운트다운 3-2-1-GO!] → [운동 중 HUD]
                                                      ↓
                                              [일시정지] ⇄ [운동 재개]
                                                      ↓
                                              [종료 다이얼로그]
                                              ├── 5분 미만 → 경고 → /go (준비 화면)
                                              └── 5분 이상 → 체크박스 분기
                                                  ├── 기록 저장 (체크) → /go/result (결과)
                                                  └── 기록 미저장 (해제) → /go (준비 화면)
```

### 4-2. 운동 종류
- 현재 **러닝(Running)** 단일 타입만 지원. 추후 걷기/자전거 등 확장 예정.

### 4-3. 지도 서비스
- 네이버맵 사용 예정이나 미확정. **퍼블리싱 단계에서는 placeholder 이미지로 대체**.

---

## 📱 5. 화면별 상세 정책

---

### 화면 A. 운동 준비 (WorkoutReadyPage)

| 항목 | 값 |
|------|-----|
| 파일 경로 | `src/pages/workout/WorkoutReadyPage.tsx` |
| 라우트 | `/go` |
| 목적 | GPS 상태를 확인하고 러닝 운동을 시작하는 진입 화면 |

#### 레이아웃 구조 — AppLayout 패딩 유지

| 영역 | 구성 |
|------|------|
| **상단** | 페이지 타이틀 "운동 시작" (Header 영역) |
| **중단** | GPS 상태 배지 (`MapPin` 아이콘 + "GPS 연결됨" / "GPS 검색 중...") + 운동 종류 라벨 (`Footprints` 아이콘 + "러닝") |
| **하단** | 대형 원형 "GO" 시작 버튼 (80×80px 이상, `bg-primary`, 터치 시 `scale-95` 트랜지션) |

#### 포함 UI 요소

| 컴포넌트 | 설명 |
|----------|------|
| `GpsStatusBadge` | GPS 신호 상태 아이콘 + 텍스트 배지 |
| `WorkoutStartButton` | 원형 대형 GO 버튼, `transition-transform duration-150` |
| BottomNav | 표시 유지 |

#### 상태별 UI

| 상태 | 표현 |
|------|------|
| 기본 (GPS 연결됨) | GO 버튼 활성화 |
| GPS 미연결 | GPS 아이콘 `animate-pulse`, GO 버튼 `opacity-50 pointer-events-none` 비활성 |

---

### 화면 B. 운동 중 (WorkoutActivePage)

| 항목 | 값 |
|------|-----|
| 파일 경로 | `src/pages/workout/WorkoutActivePage.tsx` |
| 라우트 | `/go/active` |
| 목적 | 실시간 GPS 운동 HUD — 지도 위에 시간·거리·페이스를 플로팅 표시하고 운동을 제어하는 핵심 화면 |

#### B-1. 카운트다운 상태 (진입 직후 오버레이)

별도 페이지가 아닌 **WorkoutActivePage 진입 직후 오버레이 상태**.

| 요소 | 스펙 |
|------|------|
| 오버레이 배경 | `bg-background/80 backdrop-blur-sm` 풀스크린 |
| 카운트다운 숫자 | 3 → 2 → 1 → "GO!" / `text-7xl font-bold tabular-nums` / 스케일 애니메이션 |
| BottomNav | 숨김 |

카운트다운 완료 후 자동으로 운동 중 HUD 상태로 전환, 타이머 시작.

#### B-2. 운동 중 HUD (활성 상태)

**레이아웃 — Edge-to-Edge 풀스크린, AppLayout 패딩 해제**

| 영역 | 구성 |
|------|------|
| **전체 배경** | `MapPlaceholder` (100% 풀스크린, 추후 네이버맵 교체) |
| **상단 플로팅** | `WorkoutTimerPanel` — 타이머 "00:00:00" |
| **하단 플로팅** | `WorkoutStatsPanel` — 지표 + 컨트롤 버튼 |
| BottomNav | 숨김 |

**상단 플로팅 타이머 (`WorkoutTimerPanel`)**

| 속성 | 값 |
|------|-----|
| 패널 스타일 | `backdrop-blur-2xl bg-background/60 rounded-2xl` |
| 타이머 텍스트 | `text-4xl font-bold tabular-nums text-foreground` / "00:00:00" (HH:MM:SS) |
| 상단 여백 | `pt-safe` 또는 `pt-12` (Safe Area 확보) |

**하단 플로팅 지표 패널 (`WorkoutStatsPanel`)**

| 속성 | 값 |
|------|-----|
| 패널 스타일 | `backdrop-blur-2xl bg-background/60 rounded-t-3xl` |
| 지표 그리드 | 2열 배치 |
| 이동 거리 | 라벨 "거리" + 값 `text-3xl tabular-nums` + 단위 "km" |
| 실시간 페이스 | 라벨 "페이스" + 값 `text-3xl tabular-nums` + 단위 "min/km" |
| 하단 여백 | `pb-safe` 또는 `pb-8` (Safe Area 확보) |

**컨트롤 버튼 (`WorkoutControls`)**

| 운동 상태 | 버튼 구성 |
|-----------|----------|
| 운동 중 (Running) | 일시정지 버튼 1개 중앙 (`Pause` 아이콘, 64×64px, `bg-muted/80`) |
| 일시정지 (Paused) | 재개 버튼(`Play`, `bg-primary`, 64px) 좌측 + 종료 버튼(`Square`, `bg-destructive`, 64px) 우측 |

- 일시정지 시 타이머에 `animate-pulse` 적용하여 정지 상태 시각적 표현
- 종료 버튼: **롱프레스 2초 홀드** (프로그레스 링 애니메이션으로 피드백) — 오발동 방지

#### B-3. 운동 종료 다이얼로그 (`StopConfirmDialog`)

종료 버튼 롱프레스 완료 시 표시. shadcn `AlertDialog` 활용.

**5분 미만 운동:**

| 항목 | 내용 |
|------|------|
| 제목 | "운동 시간이 너무 짧아요" |
| 본문 | "5분 이하의 운동은 기록으로 저장되지 않습니다." |
| 체크박스 | 없음 |
| 버튼 | "계속 운동하기" (Primary) / "종료하기" (Ghost) |
| 종료 시 이동 | `/go` (준비 화면) |

**5분 이상 운동:**

| 항목 | 내용 |
|------|------|
| 제목 | "운동을 종료할까요?" |
| 본문 | 운동 요약 (시간, 거리, 평균 페이스) |
| 체크박스 | "이 운동을 기록으로 저장합니다" — **기본값 체크(checked)** |
| 버튼 | "종료하기" (Primary) / "취소" (Ghost) |
| 체크 유지 + 종료 시 | `/go/result` (결과 화면) |
| 체크 해제 + 종료 시 | `/go` (준비 화면) |

---

### 화면 C. 운동 결과 (WorkoutResultPage)

| 항목 | 값 |
|------|-----|
| 파일 경로 | `src/pages/workout/WorkoutResultPage.tsx` |
| 라우트 | `/go/result` |
| 목적 | 종료된 운동의 총 거리·시간·평균 페이스·경로를 요약하는 기록 상세 화면 |

#### 레이아웃 구조 — 스크롤 가능, AppLayout 패딩 유지

| 영역 | 구성 |
|------|------|
| **상단** | 커스텀 Header — "운동 기록" 타이틀 + 닫기 버튼 (`X` 아이콘, 클릭 시 `/`로 이동) |
| **중단 상부** | 경로 지도 미니맵 카드 (`rounded-2xl overflow-hidden`, 높이 200px, placeholder 이미지) |
| **중단 하부** | 날짜/시간 정보 + 운동 지표 2×2 그리드 |
| **하단** | "확인" 버튼 (`bg-primary w-full`, 클릭 시 `/`로 이동) |
| BottomNav | 숨김 |

#### 포함 UI 요소

**경로 지도 카드 (`WorkoutResultMap`)**

| 속성 | 값 |
|------|-----|
| 스타일 | `rounded-2xl overflow-hidden` |
| 높이 | 200px 고정 |
| 내용 | placeholder 이미지 (경로가 그려진 정적 지도) |

**날짜/시간 정보**

| 항목 | 예시 |
|------|------|
| 운동 날짜 | "2026년 4월 3일 목요일" |
| 운동 시간대 | "오후 3:00 ~ 오후 3:45" |

**운동 지표 그리드 (`WorkoutResultStats`)**

| 지표 | 단위 | 스타일 |
|------|------|--------|
| 총 거리 | km | 라벨 `text-sm text-muted-foreground` + 값 `text-2xl font-bold tabular-nums` |
| 총 시간 | HH:MM:SS | 동일 |
| 평균 페이스 | min/km | 동일 |
| 평균 속도 | km/h | 동일 |

레이아웃: 2×2 그리드, 내부 `p-6`, 지표 간 `gap-4`.

#### 상태별 UI

| 상태 | 표현 |
|------|------|
| 기본 | 운동 데이터 표시 |
| 로딩 | 지표 영역 스켈레톤 (`bg-neutral-200 dark:bg-neutral-800 animate-pulse`) |

---

## 🧩 6. 컴포넌트 구조

```
src/pages/workout/
├── WorkoutReadyPage.tsx            # 운동 준비 화면
├── WorkoutActivePage.tsx           # 운동 중 (카운트다운 + HUD + 종료 다이얼로그)
└── WorkoutResultPage.tsx           # 운동 결과 화면

src/components/workout/
├── GpsStatusBadge.tsx              # GPS 연결 상태 배지
├── WorkoutStartButton.tsx          # 대형 원형 GO 버튼
├── CountdownOverlay.tsx            # 3-2-1-GO 카운트다운 오버레이
├── MapPlaceholder.tsx              # 지도 placeholder (추후 네이버맵 교체)
├── WorkoutTimerPanel.tsx           # 상단 플로팅 타이머 패널 (Glassmorphism)
├── WorkoutStatsPanel.tsx           # 하단 플로팅 지표 + 컨트롤 패널
├── WorkoutControls.tsx             # 일시정지/재개/종료 버튼 그룹
├── StopConfirmDialog.tsx           # 운동 종료 확인 다이얼로그 (5분 분기)
├── WorkoutResultMap.tsx            # 결과 화면 경로 미니맵
└── WorkoutResultStats.tsx          # 결과 화면 지표 그리드
```

---

## 🎨 7. 공통 디자인 요구사항

| 항목 | 규칙 |
|------|------|
| 시각적 위계 | 타이머(최상위) → 거리/페이스(주요 지표) → 컨트롤 버튼(액션) |
| 숫자 타이포 | 모든 숫자 지표에 `tabular-nums` 필수 |
| Glassmorphism | 운동 중 상단/하단 패널: `backdrop-blur-2xl bg-background/60` |
| 오발동 방지 | 종료 버튼 롱프레스 2초 홀드 + 프로그레스 링 |
| BottomNav | 운동 중(`/go/active`)과 결과(`/go/result`)에서 숨김 |
| Safe Area | 풀스크린 화면 상/하단 safe area 여백 필수 |
| 색상 | 모든 색상 CSS Variable, 하드코딩 절대 금지 |
| 간격 | 지표 패널 내부 `p-6`, 지표 간 `gap-4`, 버튼 간 `gap-6` |

---

## 📋 8. 퍼블리싱 프롬프트

### 8-1. WorkoutReadyPage

```
[WorkoutReadyPage] 페이지를 퍼블리싱해줘.

## 페이지 정보
- 파일 경로: src/pages/workout/WorkoutReadyPage.tsx
- 라우트: /go
- 목적: GPS 상태를 확인하고 러닝 운동을 시작하는 진입 화면

## 레이아웃 구조
- 상단: 페이지 타이틀 "운동 시작" (Header 영역)
- 중단: GPS 상태 배지 (MapPin 아이콘 + "GPS 연결됨") + 운동 종류 표시 (Footprints 아이콘 + "러닝")
- 하단: 대형 원형 "GO" 시작 버튼 (80×80px, bg-primary, 터치 시 scale-95)

## 포함 UI 요소
- GpsStatusBadge — GPS 신호 상태 아이콘 + 텍스트
- WorkoutStartButton — 원형 대형 GO 버튼
- BottomNav 표시 유지

## 상태별 UI
- 기본: GPS 연결됨, GO 버튼 활성
- GPS 미연결: 펄스 애니메이션, GO 버튼 opacity-50 pointer-events-none

## 디자인 요구사항
- AppLayout 패딩 유지, 모든 색상 CSS Variable
- GO 버튼에 transition-transform duration-150 적용

## 참고 레퍼런스
- docs/policy/pages/workout/policy.md
```

### 8-2. WorkoutActivePage

```
[WorkoutActivePage] 페이지를 퍼블리싱해줘.

## 페이지 정보
- 파일 경로: src/pages/workout/WorkoutActivePage.tsx
- 라우트: /go/active
- 목적: 실시간 GPS 운동 HUD — 지도 위에 시간·거리·페이스를 플로팅 표시하고 운동을 제어하는 핵심 화면

## 레이아웃 구조
- 전체 배경: MapPlaceholder (Edge-to-Edge 풀스크린, AppLayout 패딩 해제)
- 상단 플로팅: WorkoutTimerPanel — Glassmorphism 패널 (backdrop-blur-2xl bg-background/60 rounded-2xl), 타이머 "00:00:00" (text-4xl font-bold tabular-nums), safe area 상단 여백
- 하단 플로팅: WorkoutStatsPanel — Glassmorphism Bottom Sheet (backdrop-blur-2xl bg-background/60 rounded-t-3xl), 2열 지표 (거리 km + 페이스 min/km, text-3xl tabular-nums) + WorkoutControls
- BottomNav 숨김

## 포함 UI 요소
- CountdownOverlay — 진입 시 3→2→1→GO! 오버레이 (text-7xl, 스케일 애니메이션, bg-background/80 backdrop-blur-sm)
- MapPlaceholder — 풀스크린 지도 placeholder 이미지
- WorkoutTimerPanel — 상단 타이머
- WorkoutStatsPanel — 하단 지표 패널
- WorkoutControls — 운동 중: 일시정지(Pause, 64px, bg-muted/80) 1개 중앙 / 일시정지 상태: 재개(Play, bg-primary) + 종료(Square, bg-destructive) 2개 양쪽
- StopConfirmDialog — 종료 시 확인 모달 (5분 미만: 경고 + 버튼 2개 / 5분 이상: 요약 + 체크박스 "이 운동을 기록으로 저장합니다" 기본 체크 + 버튼 2개)

## 상태별 UI
- 카운트다운: 풀스크린 오버레이, 대형 숫자 애니메이션
- 운동 중 (Running): 일시정지 버튼 1개 중앙
- 일시정지 (Paused): 재개+종료 버튼 양쪽 배치, 타이머 animate-pulse
- 종료 다이얼로그: shadcn AlertDialog 활용

## 디자인 요구사항
- Edge-to-Edge 풀스크린 (AppLayout 전역 패딩 벗어남)
- 종료 버튼 오발동 방지: 롱프레스 2초 홀드 (프로그레스 링 애니메이션)
- 모든 숫자 tabular-nums, 모든 색상 CSS Variable, safe area 상/하단 확보
- Glassmorphism: backdrop-blur-2xl bg-background/60

## 참고 레퍼런스
- docs/policy/pages/workout/policy.md
```

### 8-3. WorkoutResultPage

```
[WorkoutResultPage] 페이지를 퍼블리싱해줘.

## 페이지 정보
- 파일 경로: src/pages/workout/WorkoutResultPage.tsx
- 라우트: /go/result
- 목적: 종료된 운동의 총 거리·시간·평균 페이스·경로를 요약하는 기록 상세 화면

## 레이아웃 구조
- 상단: 커스텀 Header — "운동 기록" 타이틀 + 닫기(X) 버튼 (클릭 시 /로 이동)
- 중단 상부: 경로 지도 미니맵 카드 (rounded-2xl, 높이 200px, placeholder 이미지)
- 중단 하부: 날짜/시간 정보 + 운동 지표 2×2 그리드 (총 거리, 총 시간, 평균 페이스, 평균 속도)
- 하단: "확인" 버튼 (bg-primary w-full, 클릭 시 /로 이동)
- BottomNav 숨김

## 포함 UI 요소
- WorkoutResultMap — 정적 경로 미니맵 (placeholder 이미지)
- 날짜 표시: "2026년 4월 3일 목요일", 시간대: "오후 3:00 ~ 오후 3:45"
- WorkoutResultStats — 2×2 그리드, 라벨(text-sm text-muted-foreground) + 값(text-2xl font-bold tabular-nums) + 단위
- 확인 버튼: w-full bg-primary

## 상태별 UI
- 기본: 운동 데이터 표시
- 로딩: 지표 영역 스켈레톤 (bg-neutral-200 dark:bg-neutral-800 animate-pulse)

## 디자인 요구사항
- AppLayout 패딩 유지, 스크롤 가능
- 지표 내부 p-6, 지표 간 gap-4, 모든 숫자 tabular-nums
- 모든 색상 CSS Variable, 하드코딩 금지

## 참고 레퍼런스
- docs/policy/pages/workout/policy.md
```
