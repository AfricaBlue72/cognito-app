'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { confirmResetPasswordWithAmplify } from '../../libs/cognitoAuth';
import { useRouter } from 'next/navigation';
import ConfirmationCodeInput from '../components/ConfirmationCodeInput';
import LoadingOverlay from '../components/LoadingOverlay';
import { useSnackBar } from '../context/SnackBarContext';
import { useTranslation } from 'react-i18next';

export default function ConfirmForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const { t } = useTranslation('confirm-forgot-password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await confirmResetPasswordWithAmplify(email, newPassword, code);
      showSnackBar(t('password-reset-success'), 'success', 5000);
      router.push('/login');
    } catch (err) {
      showSnackBar(t('password-reset-error'), 'error', 5000);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeComplete = (completedCode) => {
    setCode(completedCode);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
          <ConfirmationCodeInput onCodeComplete={handleCodeComplete} disabled={loading} />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label={t('new-password')}
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
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
