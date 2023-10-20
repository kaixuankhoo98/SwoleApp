'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme(
  {
    palette: {
      mode: 'dark',
    },
  });  

export default function Main({ children }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box 
        sx={{ 
          margin: '0.5em',
          height: '85vh',
          backgroundColor: '#242526',
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  )
}
