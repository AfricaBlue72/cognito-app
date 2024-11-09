"use client";

import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Typography, Box, Container, Link, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginWithAmplify, loginWithAmplifyRedirect } from '../../libs/cognitoAuth';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../components/LoadingOverlay';
import { useSnackBar } from '../contexts/SnackBarContext';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const { t } = useTranslation('login');

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await loginWithAmplify(username, password);
      login(); // Update the global auth state
      showSnackBar(t('login-successful'), 'success', 3000);
      router.push('/'); // Redirect to home page after successful login
    } catch (err) {
      showSnackBar(t('login-failed'), 'error', 5000);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    loginWithAmplifyRedirect('Google');
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
        <Typography component="h1" variant="h2">
          {t('title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label={t('email')}
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {t('login-button')}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
          <Link 
            variant="body2" 
            onClick={() => !loading && router.push('/forgot-password')} 
            sx={{ cursor: loading ? 'default' : 'pointer', pointerEvents: loading ? 'none' : 'auto' }}
          >
            {t('forgot-password')}
          </Link>
          <Link 
            variant="body2" 
            onClick={() => !loading && router.push('/signup')} 
            sx={{ cursor: loading ? 'default' : 'pointer', pointerEvents: loading ? 'none' : 'auto' }}
          >
            {t('sign-up')}
          </Link>
        </Box>
        <Divider sx={{ width: '100%', my: 2, borderBottomWidth: 3 }} />
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {t('login-with-google')}
        </Button>
      </Box>
    </Container>
  );
}
