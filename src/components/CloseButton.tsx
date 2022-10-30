import { IconButton, IconButtonProps } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const CloseButton = (props: IconButtonProps) => {
  return (
    <IconButton
      sx={{
        position: 'absolute',
        top: 12,
        left: 16,
      }}
      color='info'
      {...props}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export default CloseButton;
