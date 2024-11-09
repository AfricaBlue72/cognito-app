"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, CircularProgress, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Palette as PaletteIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useTheme as useCustomTheme } from '../contexts/themeProvider';
import { signOutWithAmplify } from '../../libs/cognitoAuth';
import { useAuth } from '../contexts/AuthContext';
import Avatar from './Avatar';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { setTheme } = useCustomTheme();
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const { t, i18n } = useTranslation(['header', 'global']);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutWithAmplify();
      logout();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleThemeMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    handleThemeMenuClose();
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLanguageMenuClose();
  };

  const menuItems = [
    { text: t('header:home'), href: '/', id: 'home' },
    { text: t('header:about'), href: '/about', id: 'about' },
    ...(isAuthenticated
      ? [
          { text: t('header:logout'), onClick: handleSignOut, id: 'signout' },
          { 
            component: () => <Avatar avatarUrl={user?.attributes?.picture} />,
            id: 'avatar'
          }
        ]
      : [
          { text: t('header:login'), href: '/login', id: 'login' },
          { text: t('header:signup'), href: '/signup', id: 'signup' },
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

  const handleNavigation = (href) => {
    router.push(href);
    setDrawerOpen(false);
  };

  const drawer = (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} onClick={item.href ? () => handleNavigation(item.href) : item.onClick}>
            {item.component ? (
              item.component()
            ) : (
              <ListItemText primary={item.text} />
            )}
          </ListItem>
        ))}
        {isMobile && (
          <>
            <ListItem>
              <IconButton color="inherit" onClick={handleThemeMenuOpen}>
                <PaletteIcon />
              </IconButton>
              <ListItemText primary={t('global:change-theme')} />
            </ListItem>
            <ListItem>
              <Button color="inherit" onClick={handleLanguageMenuOpen}>
                {i18n.language.toUpperCase()}
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  if (isLoading) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h2" sx={{ flexGrow: 1 }}>
            {t('global:my-website')}
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
          {t('global:my-website')}
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
              return (
                <Button 
                  key={item.id} 
                  color="inherit" 
                  onClick={item.href ? () => router.push(item.href) : item.onClick}
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              );
            })}
            <IconButton sx={{ ml: 1 }} onClick={handleThemeMenuOpen} color="inherit">
              <PaletteIcon />
            </IconButton>
            <Button sx={{ ml: 1 }} onClick={handleLanguageMenuOpen} color="inherit">
              {i18n.language.toUpperCase()}
            </Button>
          </>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleThemeMenuClose}
        >
          <MenuItem onClick={() => handleThemeChange('light')}>{t('global:light-theme')}</MenuItem>
          <MenuItem onClick={() => handleThemeChange('dark')}>{t('global:dark-theme')}</MenuItem>
          <MenuItem onClick={() => handleThemeChange('materialKit')}>{t('global:material-kit-theme')}</MenuItem>
          <MenuItem onClick={() => handleThemeChange('visionUI')}>{t('global:vision-ui-theme')}</MenuItem>
        </Menu>
        <Menu
          anchorEl={languageAnchorEl}
          open={Boolean(languageAnchorEl)}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem onClick={() => changeLanguage('en')}>
            English
          </MenuItem>
          <MenuItem onClick={() => changeLanguage('fr')}>
            Français
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
