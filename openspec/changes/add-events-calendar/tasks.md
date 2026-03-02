## 1. Setup

- [ ] 1.1 Install `@fullcalendar/list` plugin
- [ ] 1.2 Create `app/types/event.ts` with the `CalendarEvent` TypeScript interface matching `events.json` shape

## 2. Calendar View

- [ ] 2.1 Create `app/components/EventCalendar.tsx` — `'use client'` component that fetches `/events.json`, renders FullCalendar with `dayGridMonth` (default) and `listMonth` views, prev/next/today toolbar buttons
- [ ] 2.2 Update `app/page.tsx` to import and render `EventCalendar`

## 3. Event Detail Popover

- [ ] 3.1 Create `app/components/EventPopover.tsx` — MUI Popover displaying event title, type, description, location, district, formatted date/time, and "More info" link (`target="_blank"`)
- [ ] 3.2 Wire `eventClick` handler in `EventCalendar` to open the popover and prevent default URL navigation

## 4. Verification

- [ ] 4.1 Run `npm run build` to confirm static export succeeds
- [ ] 4.2 Run `npm run dev` and visually verify calendar renders, view switching works, and popover displays correctly
