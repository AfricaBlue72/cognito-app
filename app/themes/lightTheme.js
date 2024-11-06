// Light theme configuration
const createShadow = (px) => {
  return `0px ${px}px ${2 * px}px rgba(0, 0, 0, 0.12)`;
};

export const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#cc33ca',
      light: '#d65cd4',
      dark: '#a329a1',
    },
    secondary: {
      main: '#797979',
      light: '#939393',
      dark: '#5c5c5c',
    },
    error: {
      main: '#ff0000',
    },
    text: {
      primary: '#000000',
      secondary: '#797979',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    allVariants: {
      color: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: '#cc33ca',
          borderRadius: '8px',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: '#a329a1',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#a329a1',
          '&:hover': {
            backgroundColor: 'rgba(163, 41, 161, 0.5)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #EBEBEB',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#cc33ca',
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
};
