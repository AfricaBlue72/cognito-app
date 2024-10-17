"use client";

import React, { createContext, useState, useContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export function Providers({ children }) {
  const [mode, setMode] = useState('light');

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
              primary: '#FFD700',
              secondary: '#FFD700',
            },
          }),
        },
        typography: {
          allVariants: {
            color: mode === 'dark' ? '#FFD700' : 'inherit', // Dark yellow color in dark mode
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? '#FFD700' : 'inherit',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(255, 215, 0, 0.08)' : 'inherit',
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? '#FFD700' : 'inherit',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(255, 215, 0, 0.08)' : 'inherit',
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
