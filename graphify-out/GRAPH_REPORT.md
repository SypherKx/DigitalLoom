# Graph Report - .  (2026-04-30)

## Corpus Check
- Corpus is ~18,472 words - fits in a single context window. You may not need a graph.

## Summary
- 106 nodes · 45 edges · 2 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 8|Community 8]]

## God Nodes (most connected - your core abstractions)
1. `reducer()` - 3 edges
2. `dispatch()` - 3 edges
3. `toast()` - 3 edges
4. `Toaster()` - 2 edges
5. `genId()` - 2 edges
6. `addToRemoveQueue()` - 2 edges
7. `useToast()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Toaster()` --calls--> `useToast()`  [INFERRED]
  src\components\ui\toaster.tsx → src\hooks\use-toast.ts

## Communities

### Community 2 - "Community 2"
Cohesion: 0.6
Nodes (5): addToRemoveQueue(), dispatch(), genId(), reducer(), toast()

### Community 8 - "Community 8"
Cohesion: 0.67
Nodes (2): useToast(), Toaster()

## Knowledge Gaps
- **Thin community `Community 8`** (3 nodes): `useToast()`, `toaster.tsx`, `Toaster()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useToast()` connect `Community 8` to `Community 2`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._