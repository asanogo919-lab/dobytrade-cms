// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Importation de la police Poppins
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ThemeProvider applique notre thème à toute l'application */}
    <ThemeProvider theme={theme}>
      {/* CssBaseline réinitialise les styles par défaut pour une meilleure cohérence */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);