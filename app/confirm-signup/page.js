'use client';

import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, useTheme } from '@mui/material';
import { confirmSignUpWithAmplify, resendSignUpCodeWithAmplify, autoLoginWithAmplify } from '../../libs/cognitoAuth';
import { useAuth } from '../../libs/AuthContext';
import { useRouter } from 'next/navigation';
import ConfirmationCodeInput from '../components/ConfirmationCodeInput';
import LoadingOverlay from '../components/LoadingOverlay';
import { useSnackBar } from '../context/SnackBarContext';

export default function ConfirmSignUp() {
  const [destination, setDestination] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { login } = useAuth();
  const router = useRouter();
  const { showSnackBar } = useSnackBar();

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
      showSnackBar('Sign up confirmed successfully!', 'success', 5000);
      
      // Attempt to log in the user
      try {
        await autoLoginWithAmplify(); // Note: password is not available here, might need to be handled differently
        login(); // Update the global auth state
        showSnackBar('Sign up confirmed and logged in successfully!', 'success', 5000);
        setTimeout(() => {
          router.push('/'); // Redirect to home page after successful login
        }, 2000);
      } catch (loginError) {
        showSnackBar('Sign up confirmed successfully. Please log in.', 'info', 5000);
        setTimeout(() => {
          router.push('/login'); // Redirect to login page if automatic login fails
        }, 2000);
      }
    } catch (error) {
      showSnackBar(`Error: ${error.message}`, 'error', 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      await resendSignUpCodeWithAmplify(destination);
      showSnackBar('Confirmation code resent. Please check your email or phone.', 'success', 5000);
    } catch (error) {
      showSnackBar(`Error: ${error.message}`, 'error', 5000);
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
        Confirm Sign Up
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please check your {destination.includes('@') ? 'email' : 'phone'} for your confirmation code.
      </Typography>
      <Box component="form" onSubmit={handleConfirmSignUp} noValidate sx={{ mt: 1, width: '100%' }}>
        <Typography variant="body1" gutterBottom>
          Destination: {destination}
        </Typography>
        <ConfirmationCodeInput onCodeComplete={handleCodeComplete} disabled={loading} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading || code.length !== 6}
        >
          Confirm Sign Up
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleResendCode}
          sx={{ mb: 2 }}
          disabled={loading}
        >
          Resend Code
        </Button>
      </Box>
    </Box>
  );
}
