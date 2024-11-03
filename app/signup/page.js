'use client';

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, MenuItem, useTheme, Alert, Link , IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import Link from 'next/link';
import { signUpWithAmplify } from '../../libs/cognitoAuth';
import { FlagIcon } from 'react-flag-kit';

const SignupPage = () => {
  const theme = useTheme();
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
    // Simple regex to check if a string resembles an email address
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
        const { isSignUpComplete, userId, nextStep } = await signUpWithAmplify(email, password, preferred_username, preferredLanguage);
        console.log('Sign up result:', { isSignUpComplete, userId, nextStep });
        setSuccess('Sign up successful! You can now log in.');
      } catch (error) {
        console.error('Signup failed:', error);
        setError(error.message || 'An error occurred during signup. Please try again.');
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
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{success}</Alert>}
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
            InputProps={{
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
              ),
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
          {/* <Link href="/login" passHref>
            <MuiLink component="span" variant="body2" sx={{ cursor: 'pointer' }}>
            Already have an account? Login
            </MuiLink>
          </Link> */}
          <Link href="/login" variant="body2">
          Already have an account? Login
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
