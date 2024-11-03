"use client";

import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function About() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" >
          Learn more about our business, goals, and the team behind our success.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Our Business
              </Typography>
              <Typography>
                We are a forward-thinking company dedicated to providing innovative solutions for our clients. Our expertise spans across various industries, allowing us to tackle diverse challenges.
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Our Goals
              </Typography>
              <Typography>
                We aim to revolutionize the industry by delivering cutting-edge products and services. Our goal is to create sustainable solutions that benefit both our clients and the environment.
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Our Team
              </Typography>
              <Typography>
                Our diverse team of experts brings a wealth of knowledge and experience to every project. We foster a culture of collaboration and innovation to deliver the best results for our clients.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
