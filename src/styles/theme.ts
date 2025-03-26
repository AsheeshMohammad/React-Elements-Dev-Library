import { Theme, ThemeOptions, createTheme } from '@mui/material/styles';
interface CustomThemeOptions extends ThemeOptions {
  callColors?: {
    selectedTheme?: string;
    themeButtonColor?: string;
  };
}

export const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    
  },
  palette: {
    // primary: {
    //   // main: 'linear-gradient(135deg, #6379c3 0%, #546ee5 60%)',
    // },
    // secondary: {
      // main: 'linear-gradient(135deg, #6379c3 0%, #546ee5 60%)',
    // },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '12px',
        },
        
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          input: {
            padding: '6.38px 14px',
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: '4px 4px 0 8px'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '6.38px 32px 6.38px 14px'
        }
      }
    },
    MuiButton:{
      styleOverrides: {
        root: {
          textTransform:'none'
        }
      }

    }
  }
}) as CustomThemeOptions;

export default customTheme