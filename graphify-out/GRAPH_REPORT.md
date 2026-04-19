# Graph Report - /Users/harshshukla/Hackathon  (2026-04-20)

## Corpus Check
- 16 files · ~7,746 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 27 nodes · 15 edges · 15 communities detected
- Extraction: 73% EXTRACTED · 27% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]

## God Nodes (most connected - your core abstractions)
1. `useEventEngine()` - 5 edges
2. `BottomNav()` - 2 edges
3. `Header()` - 2 edges
4. `PulseView()` - 2 edges
5. `ExitStrategy()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `useEventEngine()` --calls--> `Header()`  [INFERRED]
  /Users/harshshukla/Hackathon/src/context/EventContext.tsx → /Users/harshshukla/Hackathon/src/components/Header.tsx
- `useEventEngine()` --calls--> `PulseView()`  [INFERRED]
  /Users/harshshukla/Hackathon/src/context/EventContext.tsx → /Users/harshshukla/Hackathon/src/components/views/PulseView.tsx
- `useEventEngine()` --calls--> `ExitStrategy()`  [INFERRED]
  /Users/harshshukla/Hackathon/src/context/EventContext.tsx → /Users/harshshukla/Hackathon/src/components/views/ExitStrategy.tsx
- `BottomNav()` --calls--> `useEventEngine()`  [INFERRED]
  /Users/harshshukla/Hackathon/src/components/BottomNav.tsx → /Users/harshshukla/Hackathon/src/context/EventContext.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.4
Nodes (2): BottomNav(), useEventEngine()

### Community 1 - "Community 1"
Cohesion: 0.67
Nodes (0): 

### Community 2 - "Community 2"
Cohesion: 1.0
Nodes (0): 

### Community 3 - "Community 3"
Cohesion: 1.0
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 1.0
Nodes (1): Header()

### Community 5 - "Community 5"
Cohesion: 1.0
Nodes (1): PulseView()

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (1): ExitStrategy()

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 2`** (2 nodes): `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 3`** (2 nodes): `Home()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (2 nodes): `Header()`, `Header.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (2 nodes): `PulseView()`, `PulseView.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (2 nodes): `LandingPage()`, `LandingPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (2 nodes): `ExitStrategy()`, `ExitStrategy.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (1 nodes): `postcss.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (1 nodes): `EchoFeed.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `EcoDashboard.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useEventEngine()` connect `Community 0` to `Community 4`, `Community 5`, `Community 7`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `Header()` connect `Community 4` to `Community 0`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `useEventEngine()` (e.g. with `BottomNav()` and `Header()`) actually correct?**
  _`useEventEngine()` has 4 INFERRED edges - model-reasoned connections that need verification._