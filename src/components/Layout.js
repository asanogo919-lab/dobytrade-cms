// src/components/Layout.js

import React from 'react';
import {
  Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Button
} from '@mui/material';

// Importons quelques icônes pour notre menu
import InventoryIcon from '@mui/icons-material/Inventory';
import CreateIcon from '@mui/icons-material/Create';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SendIcon from '@mui/icons-material/Send';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// La largeur de notre barre de navigation latérale
const drawerWidth = 280;

// La liste de nos liens de navigation.
// Plus tard, nous afficherons certains liens en fonction du rôle de l'utilisateur.
const navItems = [
  { text: 'Gestion des Produits', icon: <InventoryIcon />, path: '/products' },
  { text: 'Création de Contenu', icon: <CreateIcon />, path: '/create' },
  { text: 'Validation de Contenu', icon: <FactCheckIcon />, path: '/validate' },
  { text: 'Contenus Publiés', icon: <SendIcon />, path: '/published' },
  { text: 'Calendrier', icon: <CalendarMonthIcon />, path: '/calendar' },
];

// Le composant Layout reçoit 'user' et 'signOut' de App.js,
// ainsi que 'children', qui représentera le contenu de la page active.
const Layout = ({ user, signOut, children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* L'en-tête (barre supérieure) */}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: 'background.paper' }}
        elevation={1}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" color="text.primary" sx={{ flexGrow: 1 }}>
            Dobytrade CMS
          </Typography>
          <Typography sx={{ mr: 2 }} color="text.secondary">
            {user?.attributes?.email}
          </Typography>
          <Button variant="outlined" color="primary" onClick={signOut}>
            Se déconnecter
          </Button>
        </Toolbar>
      </AppBar>

      {/* La barre de navigation latérale (Sidebar) */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'white',
            borderRight: '1px solid #eee'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            {/* Vous pouvez mettre un logo Dobytrade ici */}
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            DOBYTRADE
          </Typography>
        </Toolbar>
        
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: 'primary.main'}}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* La zone de contenu principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar /> {/* Un espaceur pour que le contenu ne soit pas caché sous l'AppBar */}
        
        {/* C'est ici que le contenu de nos pages s'affichera */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;