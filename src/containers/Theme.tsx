import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { useNotification } from 'hooks';

export const appTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'text',
        color: 'primary',
        size: 'large',
        disableElevation: false,
      },
      styleOverrides: {
        sizeLarge: { minHeight: 48, minWidth: 48, fontSize: 16 },
        sizeMedium: { minHeight: 40, minWidth: 40 },
        sizeSmall: { minHeight: 32, minWidth: 32 },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'medium',
        InputLabelProps: { shrink: true },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiMenu: {
      defaultProps: {
        transformOrigin: { horizontal: 'right', vertical: 'top' },
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      },
    },
  },
  typography: {
    fontFamily: 'Noto Sans Display',
    button: { fontWeight: 600, textTransform: 'none' },
  },
  palette: {
    primary: {
      main: '#9689ED',
    },
    secondary: {
      main: '#FF9E7E',
    },
  },
});

const Theme = ({ children }: any) => {
  useNotification();

  return <ThemeProvider theme={responsiveFontSizes(appTheme)}>{children}</ThemeProvider>;
};

export default Theme;
