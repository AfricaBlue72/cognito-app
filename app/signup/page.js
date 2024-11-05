'use client';

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, MenuItem, useTheme, Alert, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signUpWithAmplify } from '../../libs/cognitoAuth';
import { FlagIcon } from 'react-flag-kit';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../libs/AuthContext';

const SignupPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    preferredLanguage: 'en',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isEmailLike = (str) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { email, username, password, preferredLanguage } = formData;
    if (email && password && preferredLanguage) {
      try {
        let preferred_username = username;
        if (preferred_username && isEmailLike(preferred_username)) {
          throw new Error('Username cannot be an email address or resemble one.');
        }
        const signUpResult = await signUpWithAmplify(email, password, preferred_username, preferredLanguage);
        console.log('Sign up result:', signUpResult);
        
        // Store the entire signUpResult in local storage
        localStorage.setItem('signUpResult', JSON.stringify(signUpResult));
        
        if (signUpResult.isSignUpComplete) {
          setSuccess('Sign up successful! You can now log in.');
          // Optionally redirect to login page
          // router.push('/login');
        } else if (signUpResult.nextStep && signUpResult.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
          setSuccess('Sign up successful! Please check your email for the confirmation code.');
          localStorage.setItem('confirmSignUpDestination', email);
          router.push('/confirm-signup');
        } else {
          // Handle any unexpected next steps
          setError('Unexpected sign up result. Please try again or contact support.');
        }
      } catch (error) {
        console.error('Signup failed:', error);
        if (error.name === 'UsernameExistsException') {
          setError('An account with this email already exists.');
        } else if (error.name === 'InvalidPasswordException') {
          setError('Password does not meet the requirements. Please try a stronger password.');
        } else {
          setError(error.message || 'An error occurred during signup. Please try again.');
        }
      }
    } else {
      setError('Please fill in all required fields');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h2">
          Sign up
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }} onClose={() => {}}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }} onClose={() => {}}>
            {success}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username (optional)"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            helperText="Optional. Cannot be an email address or resemble one."
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            slotProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="preferredLanguage"
            label="Preferred Language"
            id="preferredLanguage"
            select
            value={formData.preferredLanguage}
            onChange={handleChange}
            defaultValue="en"
          >
            <MenuItem value="en">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FlagIcon code="GB" size={16} style={{ marginRight: '8px' }} />
                English
              </Box>
            </MenuItem>
            <MenuItem value="es">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FlagIcon code="ES" size={16} style={{ marginRight: '8px' }} />
                Spanish
              </Box>
            </MenuItem>
            <MenuItem value="fr">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FlagIcon code="FR" size={16} style={{ marginRight: '8px' }} />
                French
              </Box>
            </MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
          <Link variant="body2" onClick={() => router.push('/login')} sx={{ cursor: 'pointer' }}>
            Already have an account? Login
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
