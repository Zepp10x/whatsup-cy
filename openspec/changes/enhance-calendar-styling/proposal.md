## Why

The events calendar is functional but visually generic — every event is the same blue, the grid expands uncontrollably on busy days, and the app lacks any visual identity. With 40 event types and busy March days with 15+ events, users can't quickly scan for what interests them. A styling pass will transform the calendar from a data dump into an engaging discovery tool.

## What Changes

- Color-code events by type category (concerts, theatre, sports, etc.) using a curated ~10-color palette
- Set `dayMaxEvents` to cap visible events per cell and show "+N more" on busy days
- Create a custom MUI theme with Mediterranean-inspired palette, modern typography (Inter/Outfit), and rounded corners
- Polish the event detail popover with color-coded type chip, type-specific icons, and better card styling
- Add dark mode support with a toggle, including FullCalendar CSS theming

## Capabilities

### New Capabilities
- `event-color-coding`: Map event types to color categories and apply colors to calendar events
- `calendar-theme`: Custom MUI theme with branded palette, typography, dark mode toggle, and FullCalendar CSS overrides

### Modified Capabilities
- `calendar-view`: Add `dayMaxEvents` prop to control grid density
- `event-detail`: Polish popover with color-coded type chip, type icon, and improved card styling

## Impact

- **Code**: `ThemeRegistry.tsx` (major rework), `EventCalendar.tsx` (color mapping, dayMaxEvents), `EventPopover.tsx` (polish), new color/type utility files
- **Dependencies**: Google Font (Inter or Outfit via `@fontsource` or Next.js font optimization)
- **CSS**: New FullCalendar CSS overrides for dark mode and theme integration
- **Static export**: No impact — all client-side
