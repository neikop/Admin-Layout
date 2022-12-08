import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { useNotification } from 'hooks';

export const appTheme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'text',
        disableElevation: false,
      },
      styleOverrides: {
        sizeLarge: { minHeight: 48, minWidth: 48 },
        sizeMedium: { minHeight: 40, minWidth: 40 },
        sizeSmall: { minHeight: 32, minWidth: 32 },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiPagination: {
      defaultProps: {
        variant: 'outlined',
        shape: 'rounded',
        size: 'medium',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        color: 'primary',
        InputLabelProps: { shrink: true },
      },
    },
  },
  typography: {
    fontFamily: 'Noto Sans Display',
    button: { fontWeight: 600, textTransform: 'none' },
    subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: 14, fontWeight: 500, lineHeight: 1.43 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
    caption: { fontSize: 12 },
  },
  palette: {
    primary: {
      light: '#7d302f',
      main: '#b0052c',
      dark: '#330f0d',
    },
    secondary: {
      light: '#b3e7ff',
      main: '#4da7d0',
      dark: '#00bfff',
    },
    mode: 'light',
  },
});

const Theme = ({ children }: any) => {
  useNotification();

  return <ThemeProvider theme={responsiveFontSizes(appTheme)}>{children}</ThemeProvider>;
};

export default Theme;
