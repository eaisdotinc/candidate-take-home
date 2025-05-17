import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0052cc', contrastText: '#fff' },
    secondary: { main: '#00bfa5' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h6: { fontWeight: 500, fontSize: '1.25rem' },
    body1: { fontSize: '1rem' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 4 },
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;