## 1. Data Flow Refactor

- [x] 1.1 Lift data fetching from `EventCalendar.tsx` to `page.tsx` — page owns events state, loading, and error
- [x] 1.2 Update `EventCalendar` to accept `events: CalendarEvent[]` as a prop instead of fetching internally

## 2. Filter Bar Component

- [x] 2.1 Create `app/utils/languageNames.ts` — ISO code to human-readable name mapping
- [x] 2.2 Create `app/components/FilterBar.tsx` — two multi-select dropdowns (district, language) with chip display and Clear button

## 3. Filter Integration

- [x] 3.1 Add filter state to `page.tsx` (`selectedDistricts`, `selectedLanguages`) and wire to `FilterBar`
- [x] 3.2 Filter events in `page.tsx` before passing to `EventCalendar`

## 4. Verification

- [x] 4.1 Run `npm run build` to confirm static export succeeds
- [x] 4.2 Visual verification: filter dropdowns appear, selecting filters reduces visible events, clear button resets
