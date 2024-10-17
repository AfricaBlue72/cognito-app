import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Welcome to My Website
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Discover amazing content and services tailored just for you. We're here to make your online experience better.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" component={Link} href="/about">
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
