'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { resetPasswordWithAmplify } from '../../libs/cognitoAuth';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../components/LoadingOverlay';
import { useSnackBar } from '../context/SnackBarContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showSnackBar } = useSnackBar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPasswordWithAmplify(email);
      showSnackBar('Password reset initiated. Check your email for further instructions.', 'success', 5000);
      router.push('/confirm-forgot-password');
    } catch (err) {
      showSnackBar('Failed to initiate password reset. Please try again.', 'error', 5000);
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
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
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
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
