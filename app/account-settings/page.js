"use client";

import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Avatar } from '@mui/material';
import { useAuth } from '../../libs/AuthContext';
import {
  getCurrentUserWithAmplify,
  fetchUserAttributesWithAmplify,
  fetchAuthSessionWithAmplify
} from '../../libs/cognitoAuth';
import { updateUserAttributes, changePassword } from 'aws-amplify/auth';
import { useTranslation } from 'react-i18next';

const AccountSettings = () => {
  const { refreshUser } = useAuth();
  const { t } = useTranslation('account-settings');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    avatarUrl: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUserWithAmplify();
        const attributes = await fetchUserAttributesWithAmplify();
        setFormData({
          email: attributes.email || '',
          firstName: attributes.given_name || '',
          lastName: attributes.family_name || '',
          birthdate: attributes.birthdate || '',
          avatarUrl: attributes.picture || '',
          password: '',
          newPassword: '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const session = await fetchAuthSessionWithAmplify();
      
      if (formData.newPassword) {
        await changePassword({
          oldPassword: formData.password,
          newPassword: formData.newPassword
        });
      }

      const updatedAttributes = {
        email: formData.email,
        given_name: formData.firstName,
        family_name: formData.lastName,
        birthdate: formData.birthdate,
        picture: formData.avatarUrl,
      };

      await updateUserAttributes({
        attributes: updatedAttributes
      });

      await refreshUser();
      alert(t('account-updated'));
    } catch (error) {
      console.error('Error updating account settings:', error);
      alert(t('update-failed'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={formData.avatarUrl}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography component="h1" variant="h5">
          {t('title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label={t('email')}
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label={t('current-password')}
            type="password"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="newPassword"
            label={t('new-password')}
            type="password"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="firstName"
            label={t('first-name')}
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="lastName"
            label={t('last-name')}
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="birthdate"
            label={t('birthdate')}
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            name="avatarUrl"
            label={t('avatar-url')}
            value={formData.avatarUrl}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('update-settings')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AccountSettings;
