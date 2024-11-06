"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import { Menu as MenuIcon, Brightness2 as MoonIcon, LightMode as SunIcon, Palette as PaletteIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useTheme as useCustomTheme } from '../themeProvider';
import { signOutWithAmplify } from '../../libs/cognitoAuth';
import { useAuth } from '../../libs/AuthContext';
import Avatar from './Avatar';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { setTheme } = useCustomTheme();
  const { isAuthenticated, isLoading, logout, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutWithAmplify();
      logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleTheme = () => {
    const currentTheme = theme.palette.mode;
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const menuItems = [
    // Static items
    { text: 'Home', href: '/', id: 'home' },
    { text: 'About', href: '/about', id: 'about' },
    // Dynamic items
    ...(isAuthenticated
      ? [
          { text: 'Sign Out', onClick: handleSignOut, id: 'signout' },
          { 
            component: () => <Avatar avatarUrl={user?.attributes?.picture} />,
            id: 'avatar'
          }
        ]
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
          <ListItem key={item.id} onClick={toggleDrawer(false)}>
            {item.href ? (
              <Link href={item.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemText primary={item.text} />
              </Link>
            ) : item.component ? (
              item.component()
            ) : (
              <ListItemText primary={item.text} onClick={item.onClick} />
            )}
          </ListItem>
        ))}
        {isMobile && (
          <ListItem onClick={() => { toggleTheme(); toggleDrawer(false)(); }}>
            <IconButton color="inherit">
              <PaletteIcon />
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
            {menuItems.map((item) => {
              if (item.component) {
                return item.component();
              }
              return item.href ? (
                <Button 
                  key={item.id} 
                  color="inherit" 
                  component={Link} 
                  href={item.href}
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              ) : (
                <Button 
                  key={item.id} 
                  color="inherit" 
                  onClick={item.onClick}
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              );
            })}
            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              <PaletteIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
