import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Hello World
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Welcome to the WhatsUpCy MVP.
        </Typography>
      </Box>
    </Container>
  );
}
