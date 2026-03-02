## ADDED Requirements

### Requirement: Custom branded MUI theme
The application SHALL use a custom MUI theme with a Mediterranean-inspired color palette and modern typography.

#### Scenario: Custom font is applied
- **WHEN** the application loads
- **THEN** the typography SHALL use Inter (or similar modern font) instead of browser defaults

#### Scenario: Custom primary color
- **WHEN** MUI components render
- **THEN** the primary color SHALL be a teal tone, not the default MUI blue

### Requirement: Dark mode toggle
The application SHALL provide a toggle to switch between light and dark modes.

#### Scenario: Toggle is visible
- **WHEN** the page loads
- **THEN** a dark/light mode toggle button SHALL be visible in the page header

#### Scenario: Toggle switches theme
- **WHEN** the user clicks the dark mode toggle
- **THEN** the MUI theme, page background, and calendar colors SHALL switch to dark mode

#### Scenario: Preference is persisted
- **WHEN** the user sets a theme preference and reloads the page
- **THEN** the previously selected mode SHALL be restored from localStorage

#### Scenario: Default is light mode
- **WHEN** no preference is stored in localStorage
- **THEN** the application SHALL default to light mode

### Requirement: FullCalendar dark mode styling
The FullCalendar component SHALL be styled to match the active theme mode.

#### Scenario: Calendar background matches dark mode
- **WHEN** dark mode is active
- **THEN** the calendar grid background, borders, and text SHALL use dark mode colors

#### Scenario: Calendar background matches light mode
- **WHEN** light mode is active
- **THEN** the calendar SHALL use its standard light appearance

## MODIFIED Requirements

### Requirement: Calendar renders events from static JSON
The calendar SHALL limit visible events per day cell and show a "+N more" link on busy days.

#### Scenario: Busy day collapses to "+N more"
- **WHEN** a calendar day has more than 4 events
- **THEN** the cell SHALL show 4 events and a "+N more" link for the remainder

#### Scenario: Clicking "+N more" shows all events
- **WHEN** the user clicks the "+N more" link
- **THEN** a FullCalendar popover SHALL appear listing all events for that day

## MODIFIED Requirements

### Requirement: Popover displays event metadata
The popover SHALL show the event's metadata with color-coded type chip and type-specific icon.

#### Scenario: Type chip matches event color
- **WHEN** the popover opens for an event
- **THEN** the type chip background color SHALL match the event's color category

#### Scenario: Type-specific icon is shown
- **WHEN** the popover opens for an event with type "concert"
- **THEN** the type chip SHALL include a 🎵 icon or similar indicator

#### Scenario: Popover has polished appearance
- **WHEN** the popover opens
- **THEN** it SHALL have rounded corners, subtle shadow, and appropriate spacing
