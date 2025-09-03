// src/components/Layout.js

import React from 'react';
import {
  Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Button
} from '@mui/material';
import { Link } from 'react-router-dom'; // Assurez-vous que Link est importé

// ... (importez vos icônes)
import InventoryIcon from '@mui/icons-material/Inventory';
import CreateIcon from '@mui/icons-material/Create';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SendIcon from '@mui/icons-material/Send';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const drawerWidth = 280;

// On réintroduit la liste avec les rôles
const navItems = [
  { text: 'Gestion des Produits', icon: <InventoryIcon />, path: '/products', roles: ['GestionnaireBaseDeDonnees'] },
  { text: 'Création de Contenu', icon: <CreateIcon />, path: '/create', roles: ['Redacteur'] },
  { text: 'Validation de Contenu', icon: <FactCheckIcon />, path: '/validate', roles: ['Redacteur', 'ValidateurTechnique'] },
  { text: 'Contenus Publiés', icon: <SendIcon />, path: '/published', roles: ['Redacteur', 'ValidateurTechnique'] },
  { text: 'Calendrier', icon: <CalendarMonthIcon />, path: '/calendar', roles: ['Redacteur', 'ValidateurTechnique', 'GestionnaireBaseDeDonnees'] },
];

const Layout = ({ user, signOut, children }) => {
  // On récupère les groupes de l'utilisateur
  const userGroups = user?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* ... (gardez l'AppBar et le début du Drawer) ... */}
      <AppBar /* ...props... */ >
        <Toolbar>
            {/* ... */}
        </Toolbar>
      </AppBar>
      <Drawer /* ...props... */ >
        <Toolbar /* ...props... */ >
            {/* ... */}
        </Toolbar>
        <List>
          {/* On filtre les liens avant de les afficher */}
          {navItems
            .filter(item => item.roles.some(role => userGroups.includes(role)))
            .map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                <ListItemIcon sx={{color: 'primary.main'}}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;