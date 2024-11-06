// Material Kit theme configuration
const MATERIAL_KIT_PURPLE = '#9c27b0';
const MATERIAL_KIT_GREY = '#999999';

const createShadow = (px) => {
  return `0px ${px}px ${2 * px}px rgba(0, 0, 0, 0.14), 0px ${px}px ${1.5 * px}px rgba(0, 0, 0, 0.12), 0px ${px / 2}px ${3 * px}px rgba(0, 0, 0, 0.2)`;
};

export const materialKitTheme = {
  palette: {
    primary: {
      main: MATERIAL_KIT_PURPLE,
      light: '#af52bf',
      dark: '#6d1b7b',
    },
    secondary: {
      main: MATERIAL_KIT_GREY,
      light: '#b3b3b3',
      dark: '#6b6b6b',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.3125rem',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '0.00938em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.00938em',
    },
    h3: {
      fontSize: '1.5625rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.00938em',
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.00938em',
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.1875rem',
          padding: '0.75rem 1.875rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          boxShadow: '0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)',
          '&:hover': {
            boxShadow: '0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)',
          },
        },
        contained: {
          backgroundColor: MATERIAL_KIT_PURPLE,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#7b1fa2',
          },
        },
        outlined: {
          borderColor: MATERIAL_KIT_PURPLE,
          color: MATERIAL_KIT_PURPLE,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem',
          boxShadow: '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
          boxShadow: '0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)',
          borderRadius: '0.375rem',
          marginLeft: '1.25rem',
          marginRight: '1.25rem',
          marginTop: '-1.25rem',
          padding: '0.75rem',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
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
