'use client';

import { useCallback, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { Box, useTheme } from '@mui/material';
import { Global, css } from '@emotion/react';
import type { EventClickArg } from '@fullcalendar/core';
import type { CalendarEvent, CalendarEventExtendedProps } from '../types/event';
import EventPopover from './EventPopover';
import { getEventColor } from '../utils/eventColors';

/** Events longer than this render as dots instead of spanning bars */
const LONG_EVENT_THRESHOLD_DAYS = 7;

interface EventCalendarProps {
    events: CalendarEvent[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
    // Popover state
    const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<{
        title: string;
        start: Date | null;
        end: Date | null;
        url: string;
        extendedProps: CalendarEventExtendedProps;
    } | null>(null);

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // Apply color-coding and show long-duration events as dots
    const displayEvents = useMemo(() => {
        return events.map((event) => {
            const type = event.extendedProps?.type ?? '';
            const color = getEventColor(type, isDark);
            const colored = {
                ...event,
                backgroundColor: color,
                borderColor: color,
            };

            if (!event.end) return colored;
            const start = new Date(event.start).getTime();
            const end = new Date(event.end).getTime();
            const durationDays = (end - start) / (1000 * 60 * 60 * 24);
            if (durationDays > LONG_EVENT_THRESHOLD_DAYS) {
                return { ...colored, display: 'list-item' as const };
            }
            return colored;
        });
    }, [events, isDark]);

    const handleEventClick = useCallback((info: EventClickArg) => {
        // Prevent FullCalendar from navigating to the event URL
        info.jsEvent.preventDefault();

        setPopoverAnchorEl(info.el);
        setSelectedEvent({
            title: info.event.title,
            start: info.event.start,
            end: info.event.end,
            url: info.event.url,
            extendedProps: info.event.extendedProps as CalendarEventExtendedProps,
        });
    }, []);

    const handlePopoverClose = useCallback(() => {
        setPopoverAnchorEl(null);
        setSelectedEvent(null);
    }, []);

    return (
        <Box>
            <Global styles={css`
                .fc {
                    --fc-border-color: ${isDark ? '#333' : '#ddd'};
                    --fc-bg-color: ${isDark ? '#121212' : '#fff'}; 
                    --fc-today-bg-color: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,220,40,0.15)'};
                    --fc-neutral-bg-color: ${isDark ? '#1e1e1e' : '#f8f8f8'};
                    --fc-list-event-hover-bg-color: ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'};
                    --fc-page-bg-color: ${isDark ? '#121212' : '#fff'};
                }
                .fc .fc-col-header-cell,
                .fc .fc-daygrid-day-number,
                .fc .fc-list-day-cushion,
                .fc .fc-toolbar-title,
                .fc .fc-list-event-title a {
                    color: ${isDark ? '#e0e0e0' : 'inherit'};
                }
                .fc .fc-button-primary {
                    background-color: ${isDark ? '#333' : '#2C3E50'};
                    border-color: ${isDark ? '#555' : '#2C3E50'};
                }
                .fc .fc-button-primary:hover {
                    background-color: ${isDark ? '#444' : '#1a252f'};
                }
                .fc .fc-button-primary:not(:disabled).fc-button-active {
                    background-color: ${isDark ? '#555' : '#1a252f'};
                }
                .fc .fc-daygrid-more-link {
                    color: ${isDark ? '#90CAF9' : '#1976d2'};
                }
            `} />
            <FullCalendar
                plugins={[dayGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,listMonth',
                }}
                events={displayEvents}
                eventClick={handleEventClick}
                height="auto"
                dayMaxEvents={4}
                nowIndicator
            />

            {selectedEvent && (
                <EventPopover
                    anchorEl={popoverAnchorEl}
                    open={Boolean(popoverAnchorEl)}
                    onClose={handlePopoverClose}
                    title={selectedEvent.title}
                    start={selectedEvent.start}
                    end={selectedEvent.end}
                    url={selectedEvent.url}
                    extendedProps={selectedEvent.extendedProps}
                />
            )}
        </Box>
    );
}
