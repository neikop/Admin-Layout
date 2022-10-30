// import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { forwardRef, useState } from 'react';

// eslint-disable-next-line react/display-name
const InputPassword = forwardRef((props: TextFieldProps, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        inputRef: ref,
        endAdornment: (
          <InputAdornment position='end' className='-mr-2'>
            <IconButton className='text-black/50' onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
});

export default InputPassword;
