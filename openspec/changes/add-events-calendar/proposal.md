## Why

WhatsUpCy needs its core feature: an interactive calendar displaying events happening across Cyprus. The static `events.json` (310 events, Jan–Nov 2026) is already in place but there is no UI to browse it. The calendar is the MVP's reason to exist.

## What Changes

- Replace the "Hello World" placeholder in `app/page.tsx` with the events calendar
- Add a FullCalendar-powered calendar component with month grid (default) and list views
- Add client-side data fetching from `/events.json`
- Add an event detail popover (MUI Popover) showing title, description, location, district, and external link
- Install `@fullcalendar/list` plugin for the list view

## Capabilities

### New Capabilities
- `calendar-view`: Interactive calendar rendering with month grid and list views, including view switching and date navigation
- `event-detail`: Click-to-reveal event detail popover displaying event metadata and external link

### Modified Capabilities
_(none — no existing specs)_

## Impact

- **Code**: `app/page.tsx` (modified), new components under `app/components/`, new types under `app/types/`
- **Dependencies**: New npm package `@fullcalendar/list`
- **Static export**: All new code is client-side only — no impact on `output: 'export'`
