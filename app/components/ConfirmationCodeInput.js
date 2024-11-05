'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const ConfirmationCodeInput = ({ onCodeComplete }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    // Focus on the first input when the component mounts
    inputRefs[0].current.focus();
  }, []);

  const handleChange = (index, value) => {
    const newCode = [...code];
    
    

    if (value.length <= 1) {
      newCode[index] = value;
      setCode(newCode);

      if (value !== '' && index < 5) {
        inputRefs[index + 1].current.focus();
      }

      if (newCode.every(digit => digit !== '')) {
        if (typeof onCodeComplete === 'function') {
          onCodeComplete(newCode.join(''));
          console.log(newCode.join(''));
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    const newCode = [...code];
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs[index - 1].current.focus();
    }
    else{
      // Clear the input if it's not empty and the user is trying to edit it
      if (code[index] !== '' && e.key !== '') {
        newCode[index] = '';
        setCode(newCode);
        return;
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 1 }}>
      {code.map((digit, index) => (
        <TextField
          key={index}
          inputRef={inputRefs[index]}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              maxLength: 1,
              sx: { textAlign: 'center' }
            }
          }}
          sx={{ width: '16.66%' }}
        />
      ))}
    </Box>
  );
};

export default ConfirmationCodeInput;
