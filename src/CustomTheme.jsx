import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const CustomTheme = ({ children }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#d8602a',
      },
      secondary: {
        main: '#2E5D7E',
      },
      background: {
        default: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: "'Figtree', sans-serif"
    },
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'none',
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  );
};

export default CustomTheme;
