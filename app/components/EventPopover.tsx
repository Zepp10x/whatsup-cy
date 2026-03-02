'use client';

import { Popover, Typography, Box, Chip, Button, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { CalendarEventExtendedProps } from '../types/event';

export interface EventPopoverProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    title: string;
    start: Date | null;
    end: Date | null;
    url: string;
    extendedProps: CalendarEventExtendedProps;
}

function formatDateRange(start: Date | null, end: Date | null): string {
    if (!start) return '';

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    const startStr = start.toLocaleDateString('en-GB', options);

    if (!end || start.getTime() === end.getTime()) {
        return startStr;
    }

    // If same day, only show time range
    if (start.toDateString() === end.toDateString()) {
        const endTime = end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        return `${startStr} – ${endTime}`;
    }

    // Multi-day: show date range
    const endStr = end.toLocaleDateString('en-GB', options);
    return `${startStr} – ${endStr}`;
}

export default function EventPopover({
    anchorEl,
    open,
    onClose,
    title,
    start,
    end,
    url,
    extendedProps,
}: EventPopoverProps) {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{
                paper: {
                    sx: { maxWidth: 380, p: 2.5 },
                },
            }}
        >
            <Box>
                {/* Type chip */}
                <Chip
                    label={extendedProps.type}
                    size="small"
                    sx={{ mb: 1, textTransform: 'capitalize' }}
                />

                {/* Title */}
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                    {title}
                </Typography>

                {/* Date/time */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5, color: 'text.secondary' }}>
                    <CalendarTodayIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">
                        {formatDateRange(start, end)}
                    </Typography>
                </Box>

                {/* Location */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5, color: 'text.secondary' }}>
                    <LocationOnIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">
                        {extendedProps.location}
                        {extendedProps.district && ` · ${extendedProps.district}`}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 1.5 }} />

                {/* Description */}
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {extendedProps.description}
                </Typography>

                {/* External link */}
                {url && (
                    <Button
                        variant="outlined"
                        size="small"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                        fullWidth
                    >
                        More info
                    </Button>
                )}
            </Box>
        </Popover>
    );
}
