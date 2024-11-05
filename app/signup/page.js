'use client';

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, MenuItem, useTheme, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signUpWithAmplify } from '../../libs/cognitoAuth';
import { FlagIcon } from 'react-flag-kit';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../libs/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';
import { useSnackBar } from '../context/SnackBarContext';

const SignupPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { login } = useAuth();
  const { showSnackBar } = useSnackBar();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    preferredLanguage: 'en',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { email, username, password, preferredLanguage } = formData;
    if (email && password && preferredLanguage) {
      try {
        let preferred_username = username;
        if (preferred_username && isEmailLike(preferred_username)) {
          throw new Error('Username cannot be an email address or resemble one.');
        }
        const signUpResult = await signUpWithAmplify(email, password, preferred_username, preferredLanguage);
        console.log('Sign up result:', signUpResult);
        
        localStorage.setItem('signUpResult', JSON.stringify(signUpResult));
        
        if (signUpResult.isSignUpComplete) {
          showSnackBar('Sign up successful! You can now log in.', 'success', 5000);
        } else if (signUpResult.nextStep && signUpResult.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
          showSnackBar('Sign up successful! Please check your email for the confirmation code.', 'success', 5000);
          localStorage.setItem('confirmSignUpDestination', email);
          router.push('/confirm-signup');
        } else {
          showSnackBar('Unexpected sign up result. Please try again or contact support.', 'error', 5000);
        }
      } catch (error) {
        console.error('Signup failed:', error);
        if (error.name === 'UsernameExistsException') {
          showSnackBar('An account with this email already exists.', 'error', 5000);
        } else if (error.name === 'InvalidPasswordException') {
          showSnackBar('Password does not meet the requirements. Please try a stronger password.', 'error', 5000);
        } else {
          showSnackBar(error.message || 'An error occurred during signup. Please try again.', 'error', 5000);
        }
      } finally {
        setLoading(false);
      }
    } else {
      showSnackBar('Please fill in all required fields', 'error', 5000);
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
        <Typography component="h1" variant="h2">
          Sign up
        </Typography>
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          >
            Sign Up
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
          <Link 
            variant="body2" 
            onClick={() => !loading && router.push('/login')} 
            sx={{ cursor: loading ? 'default' : 'pointer', pointerEvents: loading ? 'none' : 'auto' }}
          >
            Already have an account? Login
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
