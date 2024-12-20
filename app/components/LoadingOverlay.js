import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

const LoadingOverlay = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
