## Context

WhatsUpCy is a static Next.js 15 app (`output: 'export'`) deployed to GitHub Pages. It currently shows a "Hello World" placeholder. A `public/events.json` file with 310 Cyprus events (Jan–Nov 2026) is ready to be consumed. The project already has `@fullcalendar/react` and `@fullcalendar/daygrid` installed, along with MUI and Emotion.

## Goals / Non-Goals

**Goals:**
- Render events in a FullCalendar month grid (default view) and list view
- Show event details in a popover on click
- Keep everything client-side for static export compatibility
- Use FullCalendar's native styling (no custom theme overrides)

**Non-Goals:**
- Filtering by district, type, or language (deferred to a follow-up change)
- Server-side rendering or API routes
- Custom FullCalendar theme overrides
- Event type normalization in the data

## Decisions

### 1. Component architecture

```
app/
  page.tsx                    ← Server component, imports EventCalendar
  components/
    EventCalendar.tsx         ← 'use client', FullCalendar + data loading
    EventPopover.tsx          ← MUI Popover with event details
  types/
    event.ts                  ← CalendarEvent interface
```

**Rationale:** Keeps FullCalendar (which requires DOM) isolated in a `'use client'` component. The popover is a separate component for clarity and reusability when filtering is added later.

### 2. FullCalendar plugins: daygrid + list

- `@fullcalendar/daygrid` (already installed) — month grid view
- `@fullcalendar/list` (to install) — list/agenda view

**Alternatives considered:**
- `@fullcalendar/timegrid` — rejected; hourly slots are designed for personal scheduling, not event discovery
- Custom calendar — rejected; FullCalendar is already a dependency and handles edge cases (multi-day events, responsive sizing)

### 3. Data loading via fetch in useEffect

Events are loaded client-side with `fetch('/events.json')` inside a `useEffect` hook, then passed to FullCalendar's `events` prop.

**Alternatives considered:**
- Static import at build time — would work but limits future ability to switch to an API
- React Query — overkill for a single static file in the MVP

### 4. Event click → MUI Popover

Clicking an event opens a `Popover` anchored to the click target, showing title, description, location, district, and a "View details" link to the event's external URL.

**Alternatives considered:**
- Open URL directly — too abrupt; users lose context about what they clicked
- Full detail page with routing — too much complexity for the MVP; no additional data to show beyond what's in the popover

### 5. FullCalendar native CSS

Use FullCalendar's default styling. Custom MUI-themed overrides will be tackled in a future styling pass.

## Risks / Trade-offs

- **310 events loaded at once** → Acceptable for the MVP. FullCalendar handles this performantly with DOM recycling. If the dataset grows past ~1000, consider lazy loading by visible date range.
- **Multi-day events (131/310)** → FullCalendar renders these spanning across day cells natively. In list view they appear on their start date. No special handling needed.
- **Inconsistent event types** (e.g. `sport` vs `sports`) → Not addressed in this change. Filtering will need normalization; data cleanup is a separate concern.
