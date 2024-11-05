import React from 'react';
import { Avatar as MuiAvatar, IconButton } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import Link from 'next/link';

const Avatar = ({ avatarUrl, onClick }) => {
  return (
    <IconButton
      component={Link}
      href="/account-settings"
      onClick={onClick}
      sx={{ padding: 0 }}
    >
      <MuiAvatar
        src={avatarUrl}
        alt="User avatar"
        sx={{
          width: 40,
          height: 40,
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        {!avatarUrl && <PersonIcon />}
      </MuiAvatar>
    </IconButton>
  );
};

export default Avatar;
