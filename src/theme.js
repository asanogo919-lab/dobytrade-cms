// src/theme.js

import { createTheme } from '@mui/material/styles';

// Définition de nos couleurs personnalisées
const theme = createTheme({
  palette: {
    primary: {
      main: '#D95B8A', // Rose Dobytrade
    },
    secondary: {
      main: '#2A9D8F', // Vert Nature
    },
    info: {
        main: '#0077B6', // Bleu Confiance
    },
    background: {
      default: '#F4F4F9', // Fond général
      paper: '#FFFFFF',   // Fond des "cartes"
    },
    text: {
      primary: '#333333', // Texte principal
    },
  },
  typography: {
    fontFamily: [
      'Poppins', // Notre police de caractères
      'sans-serif',
    ].join(','),
  },
});

export default theme;