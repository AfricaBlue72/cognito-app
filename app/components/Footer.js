"use client";

import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          My Website
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Follow us on social media
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton aria-label="Facebook" color="primary">
            <Facebook />
          </IconButton>
          <IconButton aria-label="Twitter" color="primary">
            <Twitter />
          </IconButton>
          <IconButton aria-label="Instagram" color="primary">
            <Instagram />
          </IconButton>
          <IconButton aria-label="LinkedIn" color="primary">
            <LinkedIn />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} My Website. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;