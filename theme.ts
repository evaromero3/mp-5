"use client";

import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: { main: '#7E846B' },
    secondary: { main: '#2F2504' },
    background: { default: '#FFE8D1' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // Customize heading fonts, sizes, etc.
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // disable capitalization
        },
      },
    },

  },
});

export default theme;
