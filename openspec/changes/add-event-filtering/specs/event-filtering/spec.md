## ADDED Requirements

### Requirement: Filter events by district
The system SHALL provide a multi-select dropdown that filters calendar events by their district.

#### Scenario: District dropdown shows all available districts
- **WHEN** the page loads and events are fetched
- **THEN** the district dropdown SHALL list all unique districts found in the data (Famagusta, Larnaca, Limassol, Nicosia, Paphos)

#### Scenario: Selecting a district filters events
- **WHEN** the user selects "Limassol" from the district dropdown
- **THEN** only events with `district: "Limassol"` SHALL appear on the calendar
- **AND** the list view SHALL show only Limassol events

#### Scenario: Multiple districts can be selected
- **WHEN** the user selects "Limassol" and "Larnaca"
- **THEN** events from both districts SHALL appear

#### Scenario: No selection shows all events
- **WHEN** no district is selected (default state)
- **THEN** all events SHALL appear regardless of district

### Requirement: Filter events by language
The system SHALL provide a multi-select dropdown that filters calendar events by their language.

#### Scenario: Language dropdown shows human-readable names
- **WHEN** the page loads
- **THEN** the language dropdown SHALL display "Greek" instead of "el", "English" instead of "en", etc.

#### Scenario: Selecting a language filters events
- **WHEN** the user selects "Greek"
- **THEN** only events with `language: "el"` SHALL appear

### Requirement: Filters combine with AND logic
Both filters SHALL be applied simultaneously using AND logic.

#### Scenario: Both filters active
- **WHEN** district is "Limassol" AND language is "Greek"
- **THEN** only events matching BOTH conditions SHALL appear

### Requirement: Clear filters action
A clear button SHALL reset all active filters.

#### Scenario: Clear button visibility
- **WHEN** any filter is active
- **THEN** a "Clear" button SHALL be visible

#### Scenario: Clicking clear resets all filters
- **WHEN** the user clicks "Clear"
- **THEN** all filter selections SHALL be removed and all events SHALL reappear
