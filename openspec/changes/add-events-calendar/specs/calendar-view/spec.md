## ADDED Requirements

### Requirement: Calendar renders events from static JSON
The system SHALL fetch events from `/events.json` at runtime and render them in a FullCalendar instance.

#### Scenario: Initial page load
- **WHEN** the user navigates to the home page
- **THEN** the calendar SHALL be visible and populated with events from `events.json`

#### Scenario: Events display on correct dates
- **WHEN** the calendar is loaded
- **THEN** each event SHALL appear on its `start` date in the calendar grid

#### Scenario: Multi-day events span across dates
- **WHEN** an event has both `start` and `end` fields
- **THEN** it SHALL render spanning across all dates from start to end (inclusive)

### Requirement: Month grid is the default view
The calendar SHALL display in `dayGridMonth` view on initial load.

#### Scenario: Default view on load
- **WHEN** the calendar first renders
- **THEN** the active view SHALL be `dayGridMonth`

#### Scenario: Current month is shown by default
- **WHEN** the calendar first renders
- **THEN** the displayed month SHALL be the current month

### Requirement: List view is available as an alternative
The calendar SHALL provide a toggle to switch to `listMonth` view.

#### Scenario: Switching to list view
- **WHEN** the user clicks the list view button in the calendar toolbar
- **THEN** the calendar SHALL switch to `listMonth` view showing events as a scrollable list

#### Scenario: Switching back to month grid
- **WHEN** the user is in list view and clicks the month grid button
- **THEN** the calendar SHALL return to `dayGridMonth` view

### Requirement: Calendar navigation
The calendar SHALL provide previous/next and today buttons for date navigation.

#### Scenario: Navigate to next month
- **WHEN** the user clicks the "next" button
- **THEN** the calendar SHALL advance by one month

#### Scenario: Navigate to previous month
- **WHEN** the user clicks the "prev" button
- **THEN** the calendar SHALL go back by one month

#### Scenario: Return to today
- **WHEN** the user clicks the "today" button
- **THEN** the calendar SHALL return to the current month
