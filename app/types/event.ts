/** Extended properties for a calendar event */
export interface CalendarEventExtendedProps {
    type: string;
    description: string;
    location: string;
    district: string;
    language: string;
}

/** A calendar event matching the shape of events.json and FullCalendar's EventInput */
export interface CalendarEvent {
    title: string;
    start: string;
    end?: string;
    url: string;
    extendedProps: CalendarEventExtendedProps;
}
