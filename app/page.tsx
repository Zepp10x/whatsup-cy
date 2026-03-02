'use client';

import { Container, Typography, Box, IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import EventCalendar from './components/EventCalendar';
import { useThemeMode } from './ThemeRegistry';

export default function Home() {
  const { mode, toggleMode } = useThemeMode();

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
        <Box sx={{ mt: 2 }}>
          <EventCalendar />
        </Box>
      </Box>
    </Container>
  );
}
