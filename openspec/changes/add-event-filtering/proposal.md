## Why

With 308 events across 5 districts and 7 languages, users need a way to focus on events relevant to them. A user in Limassol who speaks Greek shouldn't have to visually scan through events in Nicosia or English-only events. Simple dropdown filters will immediately reduce noise and improve event discovery.

## What Changes

- Add two filter dropdowns above the calendar: **District** and **Language**
- Dynamically populate filter options from the loaded event data
- Filter events client-side before passing to FullCalendar
- Show active filter count and a "Clear filters" action
- Persist filter selections in URL search params for shareability

## Capabilities

### New Capabilities
- `event-filtering`: Dropdown-based filtering of events by district and language, with URL persistence and clear action

### Modified Capabilities
- `calendar-view`: Calendar receives filtered event list instead of full list

## Impact

- **Code**: New filter bar component, updated `EventCalendar.tsx` to accept/apply filters
- **Dependencies**: None — uses MUI Select/Chip components already available
- **Static export**: No impact — all client-side filtering with `useSearchParams`
