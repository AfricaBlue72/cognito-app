'use client';

import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, useTheme } from '@mui/material';
import { confirmSignUpWithAmplify, resendSignUpCodeWithAmplify, autoLoginWithAmplify } from '../../libs/cognitoAuth';
import { useAuth } from '../../libs/AuthContext';
import { useRouter } from 'next/navigation';
import ConfirmationCodeInput from '../components/ConfirmationCodeInput';
import LoadingOverlay from '../components/LoadingOverlay';
import { useSnackBar } from '../context/SnackBarContext';
import { useTranslation } from 'react-i18next';

export default function ConfirmSignUp() {
  const [destination, setDestination] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { login } = useAuth();
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const { t } = useTranslation('confirm-signup');

  useEffect(() => {
    const destination = localStorage.getItem('confirmSignUpDestination');
    if (destination) {
      try {
        setDestination(destination);
      } catch (error) {
        console.error('Error parsing stored destination:', error);
      }
    }
  }, []);

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await confirmSignUpWithAmplify(destination, code);
      showSnackBar(t('confirmation-successful'), 'success', 5000);
      
      // Attempt to log in the user
      try {
        await autoLoginWithAmplify(); // Note: password is not available here, might need to be handled differently
        login(); // Update the global auth state
        showSnackBar(t('confirmation-successful'), 'success', 5000);
        setTimeout(() => {
          router.push('/'); // Redirect to home page after successful login
        }, 2000);
      } catch (loginError) {
        showSnackBar(t('confirmation-successful'), 'info', 5000);
        setTimeout(() => {
          router.push('/login'); // Redirect to login page if automatic login fails
        }, 2000);
      }
    } catch (error) {
      showSnackBar(t('confirmation-failed'), 'error', 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      await resendSignUpCodeWithAmplify(destination);
      showSnackBar(t('code-resent'), 'success', 5000);
    } catch (error) {
      showSnackBar(t('resend-failed'), 'error', 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeComplete = (completedCode) => {
    setCode(completedCode);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <LoadingOverlay isLoading={loading} />
      <Typography variant="h4" component="h1" gutterBottom>
        {t('title')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('check-email-or-phone', { destination: destination.includes('@') ? t('email') : t('phone') })}
      </Typography>
      <Box component="form" onSubmit={handleConfirmSignUp} noValidate sx={{ mt: 1, width: '100%' }}>
        <Typography variant="body1" gutterBottom>
          {t('destination')}: {destination}
        </Typography>
        <ConfirmationCodeInput onCodeComplete={handleCodeComplete} disabled={loading} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading || code.length !== 6}
        >
          {t('confirm-button')}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleResendCode}
          sx={{ mb: 2 }}
          disabled={loading}
        >
          {t('resend-code')}
        </Button>
      </Box>
    </Box>
  );
}
