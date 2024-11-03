"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Brightness2 as MoonIcon, LightMode as SunIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useColorMode } from '../providers';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleColorMode } = useColorMode();

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Login', href: '/login' },
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
            <Link href={item.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary={item.text} />
            </Link>
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h2"  sx={{ flexGrow: 1 }}>
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
              <Button 
                key={item.text} 
                color="inherit" 
                component={Link} 
                href={item.href}
                sx={{ mx: 1 }} // Add horizontal padding
              >
                {item.text}
              </Button>
            ))}
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
