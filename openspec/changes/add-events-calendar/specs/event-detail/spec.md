## ADDED Requirements

### Requirement: Clicking an event opens a detail popover
The system SHALL display a popover when the user clicks on an event in the calendar.

#### Scenario: Popover appears on click
- **WHEN** the user clicks on an event in the calendar
- **THEN** a popover SHALL appear anchored near the clicked event

#### Scenario: Popover closes on outside click
- **WHEN** the popover is open and the user clicks outside of it
- **THEN** the popover SHALL close

### Requirement: Popover displays event metadata
The popover SHALL show the event's title, description, location, district, date/time, and event type.

#### Scenario: All metadata fields displayed
- **WHEN** the popover is open for an event
- **THEN** the popover SHALL display the event title, description, location, district, formatted date/time, and type

#### Scenario: Multi-day event shows date range
- **WHEN** the popover is open for an event with both start and end dates
- **THEN** the popover SHALL display the date range (e.g. "Mar 20 – Mar 22, 2026")

### Requirement: Popover includes external link
The popover SHALL include a link to the event's external URL, opening in a new tab.

#### Scenario: External link present
- **WHEN** the popover is open for an event that has a `url` field
- **THEN** the popover SHALL display a link/button labeled "More info" or similar

#### Scenario: Link opens in new tab
- **WHEN** the user clicks the external link in the popover
- **THEN** the browser SHALL open the URL in a new tab (`target="_blank"`)

### Requirement: Event click does not navigate away
The default FullCalendar behavior of navigating to the event URL on click SHALL be prevented. Instead, the popover is shown.

#### Scenario: Click does not leave the page
- **WHEN** the user clicks on an event that has a URL
- **THEN** the browser SHALL NOT navigate to the URL directly
- **AND** the popover SHALL be shown instead
