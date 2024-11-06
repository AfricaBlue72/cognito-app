// Vision UI Dashboard theme configuration
const VISION_UI_BLUE = '#4318FF';
const VISION_UI_GREY = '#A3AED0';

const createShadow = (px) => {
  return `0px ${px}px ${2 * px}px rgba(0, 0, 0, 0.14), 0px ${px}px ${1.5 * px}px rgba(0, 0, 0, 0.12), 0px ${px / 2}px ${3 * px}px rgba(0, 0, 0, 0.2)`;
};

export const visionUITheme = {
  palette: {
    primary: {
      main: VISION_UI_BLUE,
      light: '#7551FF',
      dark: '#2B3674',
    },
    secondary: {
      main: VISION_UI_GREY,
      light: '#B9B9B9',
      dark: '#626262',
    },
    error: {
      main: '#FF5252',
    },
    background: {
      default: '#0B1437',
      paper: '#111C44',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A3AED0',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Display", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 700,
          textTransform: 'none',
          boxShadow: '0 4px 7px -1px rgba(0,0,0,.11), 0 2px 4px -1px rgba(0,0,0,.07)',
          '&:hover': {
            boxShadow: '0 4px 7px -1px rgba(0,0,0,.11), 0 2px 4px -1px rgba(0,0,0,.07)',
          },
        },
        contained: {
          backgroundColor: VISION_UI_BLUE,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#2B3674',
          },
        },
        outlined: {
          borderColor: VISION_UI_BLUE,
          color: VISION_UI_BLUE,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)',
          background: 'linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          padding: '24px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#0F1535',
          borderRadius: '12px',
          '&.Mui-focused': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    createShadow(1),
    createShadow(2),
    createShadow(3),
    createShadow(4),
    createShadow(5),
    createShadow(6),
    createShadow(7),
    createShadow(8),
    createShadow(9),
    createShadow(10),
    createShadow(11),
    createShadow(12),
    createShadow(13),
    createShadow(14),
    createShadow(15),
    createShadow(16),
    createShadow(17),
    createShadow(18),
    createShadow(19),
    createShadow(20),
    createShadow(21),
    createShadow(22),
    createShadow(23),
    createShadow(24),
  ],
};
