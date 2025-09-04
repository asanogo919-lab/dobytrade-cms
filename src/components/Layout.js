import React from 'react';
import {
  Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography,
  ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import InventoryIcon from '@mui/icons-material/Inventory';
import CreateIcon from '@mui/icons-material/Create';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SendIcon from '@mui/icons-material/Send';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const drawerWidth = 280;

const Layout = ({ user, signOut, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour extraire les groupes de l'utilisateur
  const getUserGroups = () => {
    try {
      return user.signInUserSession.accessToken.payload['cognito:groups'] || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes:", error);
      return [];
    }
  };

  const userGroups = getUserGroups();

  // Définition des liens de navigation avec permissions
  const navItems = [
    { 
      text: 'Gestion des Produits', 
      icon: <InventoryIcon />, 
      path: '/products', 
      groups: ['gestionnaireDB'] 
    },
    { 
      text: 'Création de Contenu', 
      icon: <CreateIcon />, 
      path: '/create', 
      groups: ['redacteur'] 
    },
    { 
      text: 'Validation de Contenu', 
      icon: <FactCheckIcon />, 
      path: '/validate', 
      groups: ['redacteur', 'validateurtechnique'] 
    },
    { 
      text: 'Contenus Publiés', 
      icon: <SendIcon />, 
      path: '/published', 
      groups: ['redacteur', 'validateurtechnique'] 
    },
    { 
      text: 'Calendrier', 
      icon: <CalendarMonthIcon />, 
      path: '/calendar', 
      groups: ['redacteur', 'validateurtechnique', 'gestionnaireDB'] 
    },
  ];

  // Filtrer les liens selon les permissions
  const filteredNavItems = navItems.filter(item => 
    item.groups.some(group => userGroups.includes(group))
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: 'background.paper' }}
        elevation={1}
      >
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            Bonjour, {user?.username}
          </Typography>
        </Toolbar>
      </AppBar>

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
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            DOBYTRADE
          </Typography>
        </Toolbar>
        <List>
          {filteredNavItems.map((item) => (
            <ListItem 
              key={item.text} 
              disablePadding
              onClick={() => navigate(item.path)}
            >
              <ListItemButton selected={location.pathname === item.path}>
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
