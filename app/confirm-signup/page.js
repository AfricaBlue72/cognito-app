'use client';

import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, useTheme, CircularProgress } from '@mui/material';
import { confirmSignUpWithAmplify, resendSignUpCodeWithAmplify, autoLoginWithAmplify } from '../../libs/cognitoAuth';
import { useAuth } from '../../libs/AuthContext';
import { useRouter } from 'next/navigation';
import ConfirmationCodeInput from '../components/ConfirmationCodeInput';

export default function ConfirmSignUp() {
  const [destination, setDestination] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { login } = useAuth();
  const router = useRouter();

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
      setMessage('Sign up confirmed successfully!');
      
      // Attempt to log in the user
      try {
        await autoLoginWithAmplify(); // Note: password is not available here, might need to be handled differently
        login(); // Update the global auth state
        setMessage('Sign up confirmed and logged in successfully!');
        setTimeout(() => {
          router.push('/'); // Redirect to home page after successful login
        }, 2000);
      } catch (loginError) {
        setMessage('Sign up confirmed successfully. Please log in.');
        setTimeout(() => {
          router.push('/login'); // Redirect to login page if automatic login fails
        }, 2000);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      await resendSignUpCodeWithAmplify(destination);
      setMessage('Confirmation code resent. Please check your email or phone.');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
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
        <ConfirmationCodeInput onCodeComplete={handleCodeComplete} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading || code.length !== 6}
        >
          {loading ? <CircularProgress size={24} /> : 'Confirm Sign Up'}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleResendCode}
          sx={{ mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Resend Code'}
        </Button>
      </Box>
      {message && (
        <Typography color={message.startsWith('Error') ? 'error' : 'success'}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
