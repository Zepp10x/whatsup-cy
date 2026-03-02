## Context

WhatsUpCy is a static Next.js 15 app with FullCalendar rendering 308 events from `events.json`. Currently uses FullCalendar's default blue styling and a barebones MUI theme (`mode: 'light'`, no custom palette). The events have 40 distinct `type` values in `extendedProps`. The `ThemeRegistry.tsx` handles Emotion cache setup and MUI theming.

## Goals / Non-Goals

**Goals:**
- Make the calendar visually scannable by color-coding events by type
- Reduce visual clutter on busy days with `dayMaxEvents`
- Give the app a branded, premium look with a custom MUI theme
- Polish the event popover for a cohesive experience
- Support dark mode with proper FullCalendar CSS theming

**Non-Goals:**
- Filtering by type/district (separate change)
- Custom FullCalendar plugins or views
- Animations or transitions beyond basic hover effects
- Mobile-specific layouts (responsive but not mobile-first redesign)

## Decisions

### 1. Event type → color category mapping

Group the 40 event types into ~10 color categories. Create a utility `app/utils/eventColors.ts`:

| Color Category | Types | Color (light/dark) |
|---------------|-------|---------------------|
| Music | concert, music, open mic | Indigo |
| Theatre | theatre, show, comedy | Deep Purple |
| Visual Arts | exhibition, art | Teal |
| Cinema | cinema, movie | Blue Grey |
| Festival | festival, festivals, carnival | Amber |
| Sport | sport, sports, race | Green |
| Food & Drink | food, wine tasting & stargazing | Orange |
| Outdoor | outdoor, walk, hike, adventure | Light Green |
| Community | workshop, talk, bazaar, market, fair, convention, gathering, community, education, summit, games, directory | Cyan |
| Party | party, parties, dance, live shows | Pink |

Unrecognized types fall back to a neutral grey.

**Rationale:** Grouping prevents a chaotic rainbow. 10 colors is scannable; 40 is not.

### 2. Color application

Apply via `backgroundColor` and `borderColor` on each event object in the `displayEvents` useMemo (extending the existing long-event logic). FullCalendar uses these properties directly.

### 3. Theme structure

Extend `ThemeRegistry.tsx` to:
- Use `next/font/google` for Inter font
- Define a custom palette with Mediterranean tones (primary: teal, secondary: amber)
- Support dark mode with a React `useState` toggle, persisted in `localStorage`
- Add FullCalendar CSS overrides via Emotion global styles

### 4. `dayMaxEvents` configuration

Set `dayMaxEvents: 4` on the FullCalendar component. FullCalendar renders a built-in "+N more" link that opens a popover with all events for that day. No custom code needed.

### 5. Popover enhancements

- Type chip background color matches the event's color category
- Type-specific emoji/icon prefix (🎵 Music, 🎭 Theatre, etc.)
- Subtle box shadow and rounded corners
- Slightly more padding and open spacing

### 6. Dark mode approach

- MUI: toggle `palette.mode` between `'light'` and `'dark'`
- FullCalendar: override CSS custom properties (`--fc-bg-color`, `--fc-border-color`, `--fc-today-bg-color`, etc.) via a global stylesheet or Emotion `<Global>` component
- Toggle: MUI `IconButton` with sun/moon icon in the page header
- Persistence: `localStorage.getItem('theme-mode')`

## Risks / Trade-offs

- **FullCalendar CSS overrides for dark mode** → FullCalendar doesn't natively support dark mode. We'll override ~10 CSS custom properties. These may break on FullCalendar version upgrades, but the risk is low since we pin versions.
- **Color accessibility** → Need to ensure sufficient contrast between event text (white) and background colors in both light and dark modes. Will pick colors with good contrast ratios.
- **localStorage for theme** → SSR mismatch risk during hydration (flash of wrong theme). Mitigated by defaulting to light mode and applying the toggle in a `useEffect` after mount.
