## Context

WhatsUpCy renders 308 events from `events.json` on a FullCalendar calendar. Events have `extendedProps.district` (5 values: Famagusta, Larnaca, Limassol, Nicosia, Paphos) and `extendedProps.language` (7 values: el, en, es, fr, it, pt, ru). The `EventCalendar` component currently fetches all events and passes them through a `displayEvents` useMemo that handles color-coding and long-duration display. The page is a static export (`output: 'export'`).

## Goals / Non-Goals

**Goals:**
- Let users filter events by district and/or language using dropdown selectors
- Dynamically extract available filter options from the event data
- Apply filters client-side before FullCalendar rendering
- Show which filters are active and provide a clear action

**Non-Goals:**
- Type/category filtering (separate enhancement)
- Full-text search
- Server-side filtering
- URL persistence of filters (keep it simple for MVP — can add later)

## Decisions

### 1. Component architecture

Create a new `FilterBar` component placed above the calendar. It renders two MUI `Select` components (multi-select) for district and language. Filter state lives in `page.tsx` and is passed down to both `FilterBar` and `EventCalendar`.

```
┌──────────────────────────────────────────────────────┐
│  WhatsUpCy                               [🌙 toggle] │
│  Events happening in Cyprus                          │
│                                                      │
│  ┌─District──────────┐  ┌─Language─────────┐  Clear  │
│  │ All districts   ▼ │  │ All languages  ▼ │         │
│  └───────────────────┘  └──────────────────┘         │
│                                                      │
│  ┌─ FullCalendar ───────────────────────────────────┐│
│  │                                                  ││
│  └──────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────┘
```

### 2. Filter state management

- State in `page.tsx`: `selectedDistricts: string[]` and `selectedLanguages: string[]`
- Pass to `EventCalendar` as props; filter in the existing `displayEvents` useMemo
- Pass to `FilterBar` as controlled state with onChange callbacks
- Empty array = no filter (show all)

### 3. Available options extraction

Extract unique districts and languages from the loaded event data inside `EventCalendar`. Pass them up via a callback or compute in `page.tsx` after data is available. Simplest: compute available options in `FilterBar` from the events prop.

Actually, simplest approach: lift data fetching to `page.tsx`, pass events down to both `FilterBar` (for option extraction) and `EventCalendar` (for display). This avoids prop-drilling callbacks.

### 4. Language display

Map ISO codes to human-readable names: `el` → `Greek`, `en` → `English`, etc.

### 5. Filter interaction

- MUI `Select` with `multiple` prop and `Checkbox` `MenuItem`s
- Selected values shown as chips inside the select
- "Clear" button visible when any filter is active
- Filtering is AND between categories: district filter AND language filter must both match

## Risks / Trade-offs

- **Lifting data fetch to page.tsx** changes the data flow. Currently `EventCalendar` owns fetching; we'll move it up one level. This is a minor refactor but keeps state management clean.
- **Language code mapping** — we hardcode 7 languages. If new languages appear in data they won't have a human-readable name, but we can fall back to the ISO code.
