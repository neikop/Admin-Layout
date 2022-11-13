import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
export const appTheme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
    },
    // MuiButton: {
    //   defaultProps: {
    //     variant: 'contained',
    //     color: 'primary',
    //     size: 'medium',
    //     disableElevation: false,
    //   },
    //   styleOverrides: {
    //     sizeLarge: { minHeight: 46, minWidth: 46, fontSize: 16 },
    //     sizeMedium: { minHeight: 40, minWidth: 40 },
    //     sizeSmall: { minHeight: 32, minWidth: 32 },
    //   },
    // },
    MuiInput: {
      styleOverrides: {
        root: {
          height: 40,
          // padding: '30px 30px 10px 10px',
          margin: '10px auto',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '10px auto',
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderWidth: 1,
            boxShadow: '0px 0px 4px 0px #FC9669',
            borderColor: '#FC9669A0',
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
          color: '#1E2843',
          '&Indicator': {
            color: 'red',
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          '&.MuiGrid-item': {},
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#465A7A',
          minHeight: 50,
          '&.Mui-selected': {
            color: '#1E2843',
          },
        },
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
    button: { fontWeight: 700, textTransform: 'none' },
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FC9669',
    },
    info: {
      main: '#3FB2FF',
      light: '#00CBFF',
      dark: '#0071BC',
    },
    action: {
      active: '#1E2843',
    },
    // mode: 'dark',
  },
});

const Theme = ({ children }: any) => (
  <ThemeProvider theme={responsiveFontSizes(appTheme)}>
    {/* <LocalizationProvider dateAdapter={DateAdapter}> */}
    {children}
    {/* </LocalizationProvider> */}
  </ThemeProvider>
);

export default Theme;
