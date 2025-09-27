import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Forest green
    },
    secondary: {
      main: '#66BB6A', // Light green
    },
    background: {
      default: '#F1F8E9', // Very light green
    },
  },

   // --- Global Component Overrides for Border Radius ---
  components: {
    // This targets the specific component that draws the border/outline for TextField
    MuiOutlinedInput: {
      styleOverrides: {
        // The root element of the outlined input wrapper
        root: {
          borderRadius: '0.5rem', // Applying a global radius (equivalent to rounded-xl in Tailwind)
        },
      },
    },
  }
});

export default theme;