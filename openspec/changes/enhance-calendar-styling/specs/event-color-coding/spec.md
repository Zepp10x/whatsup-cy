## ADDED Requirements

### Requirement: Events are color-coded by type category
The system SHALL assign a background color to each event based on its `extendedProps.type`, grouped into ~10 color categories.

#### Scenario: Concert event appears in Music color
- **WHEN** an event with `type: "concert"` is rendered on the calendar
- **THEN** it SHALL have the Music category color (indigo) as its background

#### Scenario: Unknown type uses fallback color
- **WHEN** an event has a `type` not in any defined category
- **THEN** it SHALL use a neutral grey fallback color

#### Scenario: Colors are consistent across views
- **WHEN** switching between month grid and list views
- **THEN** the same event SHALL display the same color in both views

### Requirement: Color utility provides type-to-color mapping
A utility module SHALL export functions to get the color for a given event type.

#### Scenario: Utility returns color for known type
- **WHEN** `getEventColor("concert")` is called
- **THEN** it SHALL return the Music category color value

#### Scenario: Utility returns category info
- **WHEN** `getEventCategory("concert")` is called
- **THEN** it SHALL return the category name (e.g., "Music") and associated icon/emoji
