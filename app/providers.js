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
  const [mode, setMode] = useState('light'); // Start with a default value

  useEffect(() => {
    // Update the mode after the component has mounted
    const storedMode = localStorage.getItem('theme');
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

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

  // Add Solana color constants
const SOLANA_PURPLE = '#9945FF';
const SOLANA_GREEN = '#14F195';
const SOLANA_DARK = '#131313';
// MUI themes require a shadows array with enough elevation levels
// Need to extend current shadows array to include levels 0-24
// Create a function to generate shadow values with increasing intensity
// Add complete shadows array to theme configuration
const createShadow = (px) => {
  return `0px ${px}px ${2 * px}px rgba(0, 0, 0, 0.12)`;
};

const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' && {
            primary: {
              main: SOLANA_PURPLE,
              light: '#B277FF',
              dark: '#7215FF',
            },
            secondary: {
              main: SOLANA_GREEN,
              light: '#47F5B5',
              dark: '#00BA71',
            },
            background: {
              default: '#000000',
              paper: SOLANA_DARK,
            },
            text: {
              primary: '#FFFFFF',
              secondary: 'rgba(255, 255, 255, 0.7)',
            },
          }),
          // Keep existing light mode palette
          ...(mode === 'light' && {
            primary: {
              main: '#FF5A5F',
              light: '#FF7E82',
              dark: '#E00007',
            },
            secondary: {
              main: '#00A699',
              light: '#00C3B4',
              dark: '#00726A',
            },
            error: {
              main: '#FC642D',
            },
            text: {
              primary: '#484848',
              secondary: '#767676',
            },
            background: {
              default: '#ffffff',
              paper: '#ffffff',
            },
          }),
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
          ].join(','),
          allVariants: {
            color: mode === 'dark' ? '#FFFFFF' : 'inherit',
          },
          h1: {
            fontWeight: 700,
            fontSize: '2rem',
            ...(mode === 'dark' && {
              background: `-webkit-linear-gradient(45deg, ${SOLANA_PURPLE}, ${SOLANA_GREEN})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }),
          },
          h2: {
            fontWeight: 600,
            fontSize: '1.5rem',
            ...(mode === 'dark' && {
              background: `-webkit-linear-gradient(45deg, ${SOLANA_PURPLE}, ${SOLANA_GREEN})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }),
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                ...(mode === 'dark' ? {
                  background: `linear-gradient(90deg, ${SOLANA_PURPLE} 0%, ${SOLANA_GREEN} 100%)`,
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  '&:hover': {
                    background: `linear-gradient(90deg, ${SOLANA_PURPLE} 20%, ${SOLANA_GREEN} 80%)`,
                    boxShadow: '0 0 20px rgba(153, 69, 255, 0.4)',
                  },
                } : {
                  color: 'inherit',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }),
              },
              contained: {
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.18)',
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? '#FFFFFF' : 'inherit',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(153, 69, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                ...(mode === 'dark' ? {
                  backgroundColor: SOLANA_DARK,
                  backgroundImage: 'none',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                } : {
                  borderRadius: '12px',
                  boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
                }),
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                border: mode === 'light' ? '1px solid #EBEBEB' : '1px solid rgba(255, 255, 255, 0.1)',
              },
            },
          },
          MuiLink: {
            styleOverrides: {
              root: {
                color: mode === 'dark' ? SOLANA_PURPLE : '#FF5A5F',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            },
          },
        },
        shape: {
          borderRadius: 8,
        },
        shadows: [
          'none',
          '0px 2px 4px rgba(0, 0, 0, 0.18)',
          '0px 4px 8px rgba(0, 0, 0, 0.18)',
          '0px 6px 12px rgba(0, 0, 0, 0.18)',
          '0px 8px 16px rgba(0, 0, 0, 0.18)',
          '0px 10px 20px rgba(0, 0, 0, 0.18)',
          '0px 12px 24px rgba(0, 0, 0, 0.18)',
          '0px 14px 28px rgba(0, 0, 0, 0.18)',
          '0px 16px 32px rgba(0, 0, 0, 0.18)',
          '0px 18px 36px rgba(0, 0, 0, 0.18)',
          '0px 20px 40px rgba(0, 0, 0, 0.18)',
          '0px 22px 44px rgba(0, 0, 0, 0.18)',
          '0px 24px 48px rgba(0, 0, 0, 0.18)',
          '0px 26px 52px rgba(0, 0, 0, 0.18)',
          '0px 28px 56px rgba(0, 0, 0, 0.18)',
          '0px 30px 60px rgba(0, 0, 0, 0.18)',
          '0px 32px 64px rgba(0, 0, 0, 0.18)',
          '0px 34px 68px rgba(0, 0, 0, 0.18)',
          '0px 36px 72px rgba(0, 0, 0, 0.18)',
          '0px 38px 76px rgba(0, 0, 0, 0.18)',
          '0px 40px 80px rgba(0, 0, 0, 0.18)',
          '0px 42px 84px rgba(0, 0, 0, 0.18)',
          '0px 44px 88px rgba(0, 0, 0, 0.18)',
          '0px 46px 92px rgba(0, 0, 0, 0.18)',
          '0px 48px 96px rgba(0, 0, 0, 0.18)',
        ],
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
