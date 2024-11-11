"use client";

import React, { useEffect, useState } from 'react';
import { configureAmplify } from '../libs/cognitoConfig';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import Link from 'next/link';
import { getCurrentUserWithAmplify, fetchUserAttributesWithAmplify, fetchAuthSessionWithAmplify } from '../libs/cognitoAuth';

import { useTranslation } from 'react-i18next';

export default function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [userAttributes, setUserAttributes] = useState(null);
  const [authSession, setAuthSession] = useState(null);
  const [error, setError] = useState(null);
  const { t } = useTranslation(['global', 'home']);

  useEffect(() => {
    console.warn('Home useEffect');
    // Configure Amplify when the app component mounts
    try {
      configureAmplify();
      console.log('Amplify configuration attempted');
    } catch (error) {
      console.error('Error during Amplify configuration:', error);
      setError('Failed to configure Amplify');
    }
    // Fetch user details, attributes, and auth session
    const fetchUserInfo = async () => {
      try {
        const session = await fetchAuthSessionWithAmplify(true);
        setAuthSession(session);
        
        if (session) {
        const user = await getCurrentUserWithAmplify();
        setUserDetails(user);
        
          if (user) {
            try{
              const attributes = await fetchUserAttributesWithAmplify();
              setUserAttributes(attributes);
            }
            catch (error) {
              console.log('Error fetching user attributes:', error);
            }
          }
        }
      } catch (error) {
        console.log('Error fetching user information:', error);
        setError('No user information');
      }
    };

    fetchUserInfo();
  }, []);

  const renderJsonObject = (obj) => {
    return (
      <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {JSON.stringify(obj, null, 2)}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {t('home:welcome')}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          {t('description')}
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" component={Link} href="/about">
            {t('global:learn-more')}
          </Button>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
             {t('home:user-details')}
            </Typography>
            {error ? (
              <Typography color="error">{error}</Typography>
            ) : userDetails ? (
              <Box>
                <Typography>Username: {userDetails.username}</Typography>
                <Typography>User ID: {userDetails.userId}</Typography>
                <Typography>Email: {userDetails.signInDetails?.loginId}</Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  User Attributes:
                </Typography>
                {userAttributes ? renderJsonObject(userAttributes) : <Typography>Loading user attributes...</Typography>}
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Auth Session:
                </Typography>
                {authSession ? renderJsonObject(authSession) : <Typography>Loading auth session...</Typography>}
              </Box>
            ) : (
              <Typography>{t('nouser')}</Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
