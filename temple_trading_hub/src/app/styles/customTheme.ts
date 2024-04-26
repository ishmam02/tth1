import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

// Import the original brand colors
import { brand } from '../theme'; // Replace './originalThemeFile' with the correct path

// Define your custom button styles
const customButtonStyle = {
    // Define your custom button styles here
    root: {
      color: 'white',
      transition: '0.2s ease-out',
      '&:hover': {
        color: '#A31F37',
        fontSize: '30px',
        backgroundColor: 'transparent',
      },
    },
  };
  

// Create the custom MUI theme with only button overrides
const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: customButtonStyle,
    },
  },
});

export default customTheme;
