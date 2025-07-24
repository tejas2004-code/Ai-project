import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function MessageToast({message}) {
  const [open, setOpen] = React.useState(true);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className='z-40 absolute right-0'>
      
      <Snackbar open={open} a autoHideDuration={10000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
       
          variant="filled"
          sx={{ width: '100%' }}
        >
       {message}
        </Alert>
      </Snackbar>
    </div>
  );
}