# Graph Report - /Users/harshshukla/Hackathon  (2026-04-20)

## Corpus Check
- 20 files · ~11,075 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 42 nodes · 39 edges · 19 communities detected
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]

## God Nodes (most connected - your core abstractions)
1. `GET()` - 7 edges
2. `createFallbackNavigationIntel()` - 6 edges
3. `useEventEngine()` - 5 edges
4. `createNavigationUrls()` - 5 edges
5. `createMapEmbedUrl()` - 3 edges
6. `createDirectionsUrl()` - 3 edges
7. `createTaxiUrl()` - 3 edges
8. `EventProvider()` - 2 edges
9. `fetchJson()` - 2 edges
10. `readCoordinate()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `EventProvider()` --calls--> `createFallbackNavigationIntel()`  [INFERRED]
  /Users/harshshukla/Hackathon/src/context/EventContext.tsx → /Users/harshshukla/Hackathon/src/lib/navigation.ts
- `useEventEngine()` --calls--> `BottomNav()`  [INFERRED]
  /Users/harshshukla/Hackathon/src/context/EventContext.tsx → /Users/harshshukla/Hackathon/src/components/BottomNav.tsx
- `useEventEngine()` --calls--> `ExitStrategy()`  [INFERRED]
  /Users/harshshukla/Hackathon/src/context/EventContext.tsx → /Users/harshshukla/Hackathon/src/components/views/ExitStrategy.tsx
- `useEventEngine()` --calls--> `EcoDashboard()`  [INFERRED]
  /Users/harshshukla/Hackathon/src/context/EventContext.tsx → /Users/harshshukla/Hackathon/src/components/views/EcoDashboard.tsx
- `useEventEngine()` --calls--> `Header()`  [INFERRED]
  /Users/harshshukla/Hackathon/src/context/EventContext.tsx → /Users/harshshukla/Hackathon/src/components/Header.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.53
Nodes (4): fetchJson(), fetchOsrmRoute(), GET(), readCoordinate()

### Community 1 - "Community 1"
Cohesion: 0.73
Nodes (5): createDirectionsUrl(), createFallbackNavigationIntel(), createMapEmbedUrl(), createNavigationUrls(), createTaxiUrl()

### Community 2 - "Community 2"
Cohesion: 0.67
Nodes (2): useEventEngine(), Header()

### Community 3 - "Community 3"
Cohesion: 0.67
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 1.0
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 1.0
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (1): EcoDashboard()

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (1): EventProvider()

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (1): BottomNav()

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (1): ExitStrategy()

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

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 4`** (2 nodes): `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (2 nodes): `Home()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (2 nodes): `EcoDashboard()`, `EcoDashboard.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (2 nodes): `EventProvider()`, `EventContext.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (2 nodes): `BottomNav()`, `BottomNav.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (2 nodes): `ExitStrategy()`, `ExitStrategy.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (2 nodes): `toggleNotify()`, `PulseView.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (2 nodes): `LandingPage()`, `LandingPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (2 nodes): `handleReport()`, `EchoFeed.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (1 nodes): `postcss.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `venueIntel.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useEventEngine()` connect `Community 2` to `Community 8`, `Community 9`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Why does `createFallbackNavigationIntel()` connect `Community 1` to `Community 0`, `Community 7`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `EventProvider()` connect `Community 7` to `Community 1`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `GET()` (e.g. with `createFallbackNavigationIntel()` and `createNavigationUrls()`) actually correct?**
  _`GET()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `createFallbackNavigationIntel()` (e.g. with `EventProvider()` and `GET()`) actually correct?**
  _`createFallbackNavigationIntel()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `useEventEngine()` (e.g. with `BottomNav()` and `Header()`) actually correct?**
  _`useEventEngine()` has 4 INFERRED edges - model-reasoned connections that need verification._