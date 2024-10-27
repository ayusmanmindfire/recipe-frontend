//React imports
import * as React from 'react';

//Third party imports
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

//Loader component enables depending on the props (boolean)
export default function SimpleBackdrop({ isLoading }) {
  //All states
  const [open, setOpen] = React.useState(isLoading);
  
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
