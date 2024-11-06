// Dark theme configuration
const SOLANA_PURPLE = '#9945FF';
const SOLANA_GREEN = '#14F195';
const SOLANA_DARK = '#131313';

const createShadow = (px) => {
  return `0px ${px}px ${2 * px}px rgba(0, 0, 0, 0.12)`;
};

export const darkTheme = {
  palette: {
    mode: 'dark',
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
  },
  typography: {
    allVariants: {
      color: '#FFFFFF',
    },
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
      background: `-webkit-linear-gradient(45deg, ${SOLANA_PURPLE}, ${SOLANA_GREEN})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
      background: `-webkit-linear-gradient(45deg, ${SOLANA_PURPLE}, ${SOLANA_GREEN})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: `linear-gradient(90deg, ${SOLANA_PURPLE} 0%, ${SOLANA_GREEN} 100%)`,
          color: '#FFFFFF',
          borderRadius: '8px',
          padding: '8px 16px',
          '&:hover': {
            background: `linear-gradient(90deg, ${SOLANA_PURPLE} 20%, ${SOLANA_GREEN} 80%)`,
            boxShadow: '0 0 20px rgba(153, 69, 255, 0.4)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: 'rgba(153, 69, 255, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: SOLANA_DARK,
          backgroundImage: 'none',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: SOLANA_PURPLE,
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
