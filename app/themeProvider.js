"use client";

import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import all theme files
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';
import { materialKitTheme } from './themes/materialKitTheme';
import { visionUITheme } from './themes/visionUITheme';

const themes = {
  dark: darkTheme,
  light: lightTheme,
  materialKit: materialKitTheme,
  visionUI: visionUITheme,
};

const ThemeContext = createContext({ setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function Providers({ children }) {
  const [currentTheme, setCurrentTheme] = useState('materialKit'); // Start with materialKit theme by default

  useEffect(() => {
    // Update the theme after the component has mounted
    const storedTheme = localStorage.getItem('theme');
    if (themes[storedTheme]) {
      setCurrentTheme(storedTheme);
    } else {
      // If no theme is stored or it's invalid, set it to materialKit
      localStorage.setItem('theme', 'materialKit');
    }
  }, []);

  useEffect(() => {
    // Update localStorage when the theme changes
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const themeContext = useMemo(
    () => ({
      setTheme: (themeName) => {
        if (themes[themeName]) {
          setCurrentTheme(themeName);
        } else {
          console.warn(`Theme "${themeName}" not found. Defaulting to materialKit theme.`);
          setCurrentTheme('materialKit');
        }
      },
    }),
    []
  );

  const theme = useMemo(
    () => createTheme(themes[currentTheme]),
    [currentTheme]
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
