'use client';

import { Popover, Typography, Box, Chip, Button, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { CalendarEventExtendedProps } from '../types/event';
import { getEventColor, getEventCategory } from '../utils/eventColors';

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
    const category = getEventCategory(extendedProps.type);
    const chipColor = getEventColor(extendedProps.type);

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
                {/* Type chip with category color and emoji */}
                <Chip
                    label={`${category.emoji} ${extendedProps.type}`}
                    size="small"
                    sx={{
                        mb: 1.5,
                        textTransform: 'capitalize',
                        bgcolor: chipColor,
                        color: '#fff',
                        fontWeight: 500,
                    }}
                />

                {/* Title */}
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                    {title}
                </Typography>

                {/* Date/time */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75, color: 'text.secondary' }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, mt: 0.25 }} />
                    <Typography variant="body2">
                        {formatDateRange(start, end)}
                    </Typography>
                </Box>

                {/* Location */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2, color: 'text.secondary' }}>
                    <LocationOnIcon sx={{ fontSize: 16, mt: 0.25 }} />
                    <Typography variant="body2">
                        {extendedProps.location}
                        {extendedProps.district && ` · ${extendedProps.district}`}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 1.5 }} />

                {/* Description */}
                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: 'text.secondary' }}>
                    {extendedProps.description}
                </Typography>

                {/* External link */}
                {url && (
                    <Button
                        variant="contained"
                        size="small"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                        fullWidth
                        sx={{
                            bgcolor: chipColor,
                            '&:hover': { bgcolor: chipColor, filter: 'brightness(0.9)' },
                        }}
                    >
                        More info
                    </Button>
                )}
            </Box>
        </Popover>
    );
}
