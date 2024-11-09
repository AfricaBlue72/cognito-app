'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { resetPasswordWithAmplify } from '../../libs/cognitoAuth';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../components/LoadingOverlay';
import { useSnackBar } from '../contexts/SnackBarContext';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const { t } = useTranslation('forgot-password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPasswordWithAmplify(email);
      showSnackBar(t('code-sent'), 'success', 5000);
      router.push('/confirm-forgot-password');
    } catch (err) {
      showSnackBar(t('error-sending-code'), 'error', 5000);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <LoadingOverlay isLoading={loading} />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('title')}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
          {t('instructions')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('email')}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {t('submit')}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => router.push('/login')}
            disabled={loading}
          >
            {t('back-to-login')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
