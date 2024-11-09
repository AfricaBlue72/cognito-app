import React, { createContext, useState, useContext } from 'react';
import CustomSnackBar from '../components/CustomSnackBar';

const SnackBarContext = createContext();

export const useSnackBar = () => useContext(SnackBarContext);

export const SnackBarProvider = ({ children }) => {
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: '',
    severity: 'info',
    duration: null,
  });

  const showSnackBar = (message, severity = 'info', duration = null) => {
    setSnackBar({ open: true, message, severity, duration });
  };

  const hideSnackBar = () => {
    setSnackBar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      {children}
      <CustomSnackBar
        open={snackBar.open}
        message={snackBar.message}
        severity={snackBar.severity}
        duration={snackBar.duration}
        onClose={hideSnackBar}
      />
    </SnackBarContext.Provider>
  );
};
