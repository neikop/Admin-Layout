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
          padding: '30px 30px 10px 10px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
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
          color: '#F4F1EA',
          '&Indicator': {
            color: 'red',
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides:{
        root:{
          '&.MuiGrid-item':{

          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#F4F1EA',
          minHeight: 40,
          '&.Mui-selected': {
            color: '#FC33A3',
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
      active: '#CECECE',
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
