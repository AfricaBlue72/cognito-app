"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Brightness4 as MoonIcon, Brightness7 as SunIcon } from '@mui/icons-material';
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
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} href={item.href} onClick={toggleDrawer(false)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button key="login">
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
              <Button key={item.text} color="inherit" component={Link} href={item.href}>
                {item.text}
              </Button>
            ))}
            <Button color="inherit">Login</Button>
          </>
        )}
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;