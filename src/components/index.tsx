import { Box, Typography } from '@mui/material';

export { default as InputNumber } from './InputNumber';
export { default as CloseButton } from './CloseButton';
export { default as Spinner } from './Spinner';
export { default as CountdownTimer } from './CountdownTimer';
export { DesignButton } from './DesignButton';
export { default as InputPassword } from './InputPassword';
export { default as RegisterSticker } from './RegisterSticker';
export { default as Ball } from './Ball';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
