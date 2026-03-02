## 1. Setup

- [x] 1.1 Install `@fullcalendar/list` plugin
- [x] 1.2 Create `app/types/event.ts` with the `CalendarEvent` TypeScript interface matching `events.json` shape

## 2. Calendar View

- [x] 2.1 Create `app/components/EventCalendar.tsx` — `'use client'` component that fetches `/events.json`, renders FullCalendar with `dayGridMonth` (default) and `listMonth` views, prev/next/today toolbar buttons
- [x] 2.2 Update `app/page.tsx` to import and render `EventCalendar`

## 3. Event Detail Popover

- [x] 3.1 Create `app/components/EventPopover.tsx` — MUI Popover displaying event title, type, description, location, district, formatted date/time, and "More info" link (`target="_blank"`)
- [x] 3.2 Wire `eventClick` handler in `EventCalendar` to open the popover and prevent default URL navigation

## 4. Verification

- [x] 4.1 Run `npm run build` to confirm static export succeeds
- [x] 4.2 Run `npm run dev` and visually verify calendar renders, view switching works, and popover displays correctly
