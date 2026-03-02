## 1. Event Color Coding

- [x] 1.1 Create `app/utils/eventColors.ts` — type-to-category mapping (10 categories), `getEventColor(type)` and `getEventCategory(type)` functions with emoji icons
- [x] 1.2 Update `EventCalendar.tsx` `displayEvents` useMemo to set `backgroundColor` and `borderColor` from the color utility

## 2. Custom Theme & Typography

- [x] 2.1 Add Inter font via `next/font/google` in `app/layout.tsx`
- [x] 2.2 Rework `ThemeRegistry.tsx` — custom palette (teal primary, amber secondary), Inter typography, rounded component overrides
- [x] 2.3 Add dark mode state with `localStorage` persistence and `useEffect` hydration

## 3. Dark Mode & FullCalendar Theming

- [x] 3.1 Add dark/light toggle `IconButton` (sun/moon) to page header in `page.tsx`
- [x] 3.2 Pass theme mode to `EventCalendar` and apply FullCalendar CSS custom property overrides via Emotion `<Global>` styles

## 4. Calendar Density

- [x] 4.1 Add `dayMaxEvents={4}` prop to FullCalendar in `EventCalendar.tsx`

## 5. Popover Polish

- [x] 5.1 Update `EventPopover.tsx` — color-coded type chip (using `getEventColor`), type-specific emoji from `getEventCategory`, improved spacing and card shadow

## 6. Verification

- [x] 6.1 Run `npm run build` to confirm static export succeeds
- [x] 6.2 Visual verification: light mode with color-coded events, "+4 more" on busy days, polished popover
- [x] 6.3 Visual verification: dark mode toggle works, calendar and popover render correctly in dark mode
