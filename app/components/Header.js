"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import { Menu as MenuIcon, Brightness2 as MoonIcon, LightMode as SunIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useColorMode } from '../providers';
import { signOutWithAmplify } from '../../libs/cognitoAuth';
import { useAuth } from '../../libs/AuthContext';
import Avatar from './Avatar';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleColorMode } = useColorMode();
  const { isAuthenticated, isLoading, logout, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutWithAmplify();
      logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    // Static items
    { text: 'Home', href: '/', id: 'home' },
    { text: 'About', href: '/about', id: 'about' },
    // Dynamic items
    ...(isAuthenticated
      ? [{ text: 'Sign Out', onClick: handleSignOut, id: 'signout' }]
      : [
          { text: 'Login', href: '/login', id: 'login' },
          { text: 'Sign Up', href: '/signup', id: 'signup' },
        ]),
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} onClick={toggleDrawer(false)}>
            {item.href ? (
              <Link href={item.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary={item.text} />
              </Link>
            ) : (
              <ListItemText primary={item.text} onClick={item.onClick} />
            )}
          </ListItem>
        ))}
        {isMobile && (
          <ListItem onClick={() => { toggleColorMode(); toggleDrawer(false)(); }}>
            <IconButton color="inherit">
              {theme.palette.mode === 'dark' ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  if (isLoading) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h2" sx={{ flexGrow: 1 }}>
            My Website
          </Typography>
          <CircularProgress color="inherit" size={24} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h2" sx={{ flexGrow: 1 }}>
          My Website
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            {drawer}
          </>
        ) : (
          <>
            {menuItems.map((item) => (
              item.href ? (
                <Button 
                  key={item.text} 
                  color="inherit" 
                  component={Link} 
                  href={item.href}
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              ) : (
                <Button 
                  key={item.text} 
                  color="inherit" 
                  onClick={item.onClick}
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              )
            ))}
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          </>
        )}
        {isAuthenticated && (
          <Avatar avatarUrl={user?.attributes?.picture} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
