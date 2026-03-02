'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Typography, Box, IconButton, CircularProgress } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import EventCalendar from './components/EventCalendar';
import FilterBar from './components/FilterBar';
import { useThemeMode } from './ThemeRegistry';
import type { CalendarEvent } from './types/event';

export default function Home() {
  const { mode, toggleMode } = useThemeMode();

  // Data fetching (lifted from EventCalendar)
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/events.json`)
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

  // Filter state
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const handleClearFilters = useCallback(() => {
    setSelectedDistricts([]);
    setSelectedLanguages([]);
  }, []);

  // Apply filters
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const ep = event.extendedProps;
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(ep?.district ?? '')) {
        return false;
      }
      if (selectedLanguages.length > 0 && !selectedLanguages.includes(ep?.language ?? '')) {
        return false;
      }
      return true;
    });
  }, [events, selectedDistricts, selectedLanguages]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 0 }}>
              WhatsUpCy
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Events happening in Cyprus
            </Typography>
          </Box>
          <IconButton
            onClick={toggleMode}
            aria-label="Toggle dark mode"
            sx={{
              bgcolor: 'action.hover',
              '&:hover': { bgcolor: 'action.selected' },
            }}
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <FilterBar
              events={events}
              selectedDistricts={selectedDistricts}
              selectedLanguages={selectedLanguages}
              onDistrictsChange={setSelectedDistricts}
              onLanguagesChange={setSelectedLanguages}
              onClear={handleClearFilters}
            />
            <EventCalendar events={filteredEvents} />
          </Box>
        )}
      </Box>
    </Container>
  );
}
