"use client";

import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

// Define color variables
const DARK_YELLOW = '#E6C200';
const DARK_YELLOW_HOVER = 'rgba(255, 215, 0, 0.08)';

export function Providers({ children }) {
  const [mode, setMode] = useState(() => {
    // Try to get the theme from localStorage
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('theme');
      return storedMode || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Update localStorage when the theme changes
    localStorage.setItem('theme', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' && {
            text: {
              primary: DARK_YELLOW,
              secondary: DARK_YELLOW,
            },
          }),
        },
        typography: {
          allVariants: {
            color: mode === 'dark' ? DARK_YELLOW : 'inherit',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? DARK_YELLOW : 'inherit',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? DARK_YELLOW_HOVER : 'inherit',
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? DARK_YELLOW : 'inherit',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? DARK_YELLOW_HOVER : 'inherit',
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
