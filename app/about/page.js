"use client";

import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';
import CandlestickChart from '../components/CandlestickChart';

export default function About() {
  const { t } = useTranslation('about');

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
          {t('title')}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" >
          {t('description')}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }} direction="column">
          <Grid xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {t('our-mission')}
              </Typography>
              <Typography>
                {t('mission-statement')}
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {t('our-team')}
              </Typography>
              <Typography>
                {t('team-description')}
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {t('our-values')}
              </Typography>
              <Typography>
                {t('values-description')}
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Market Overview
              </Typography>
              <Box sx={{ mt: 2 }}>
                <CandlestickChart />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
