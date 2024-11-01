'use client';

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, useTheme } from '@mui/material';
import { signUpWithAmplify, confirmSignUpWithAmplify, resendSignUpCodeWithAmplify } from '../../libs/cognitoAuth';

const SignupPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    preferredLanguage: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).every(field => field)) {
      try {
        await signUpWithAmplify(formData);
        setOpenDialog(true);
      } catch (error) {
        console.error('Signup failed:', error);
        // Handle error (e.g., show error message to user)
      }
    } else {
      // Show error message about incomplete fields
      console.error('Please fill in all fields');
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUpWithAmplify(formData.username, otp);
      setOpenDialog(false);
      // Handle successful confirmation (e.g., redirect to login page)
    } catch (error) {
      console.error('Confirmation failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCodeWithAmplify(formData.username);
      // Show success message to user
    } catch (error) {
      console.error('Code resend failed:', error);
      // Handle error (e.g., show error message to user)
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
        <Typography component="h1" variant="h5">
          Sign up
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
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
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
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setOpenDialog(true)}
            sx={{ mt: 1, mb: 2 }}
          >
            Enter Confirmation Code
          </Button>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the 6-digit OTP sent to your email.
          </DialogContentText>
          <Typography variant="body1">Email: {formData.email}</Typography>
          <Typography variant="body1">Username: {formData.username}</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="otp"
            label="OTP"
            type="text"
            fullWidth
            variant="standard"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmSignUp}>Confirm</Button>
          <Button onClick={handleResendCode}>Resend Code</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SignupPage;
