import React from 'react';
import { Box, Typography } from '@mui/material';

const Unauthorized = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
      <Typography variant="h4" color="error" gutterBottom>
        Accès non autorisé
      </Typography>
      <Typography variant="body1">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </Typography>
    </Box>
  );
};

export default Unauthorized;