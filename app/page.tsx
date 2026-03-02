import { Container, Typography, Box } from '@mui/material';
import EventCalendar from './components/EventCalendar';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          WhatsUpCy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Events happening in Cyprus
        </Typography>
        <EventCalendar />
      </Box>
    </Container>
  );
}
