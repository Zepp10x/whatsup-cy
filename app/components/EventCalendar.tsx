'use client';

import { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { Box, CircularProgress, Typography } from '@mui/material';
import type { EventClickArg } from '@fullcalendar/core';
import type { CalendarEvent, CalendarEventExtendedProps } from '../types/event';
import EventPopover from './EventPopover';

export default function EventCalendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Popover state
    const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<{
        title: string;
        start: Date | null;
        end: Date | null;
        url: string;
        extendedProps: CalendarEventExtendedProps;
    } | null>(null);

    useEffect(() => {
        fetch('/events.json')
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
                return res.json();
            })
            .then((data: CalendarEvent[]) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : 'Failed to load events');
                setLoading(false);
            });
    }, []);

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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <FullCalendar
                plugins={[dayGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,listMonth',
                }}
                events={events}
                eventClick={handleEventClick}
                height="auto"
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
