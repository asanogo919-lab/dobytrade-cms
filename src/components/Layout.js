// ... (gardez tous les imports du début)

// Importez le composant Link
import { Link } from 'react-router-dom';

// ... (gardez la définition de drawerWidth et navItems)

const Layout = ({ user, signOut, children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* ... (gardez toute la partie AppBar et Drawer jusqu'à la liste) */}
      <Drawer /* ...props... */ >
        <Toolbar /* ...props... */ >
          {/* ... */}
        </Toolbar>
        
        <List>
          {navItems.map((item) => (
            // On utilise le composant Link pour envelopper notre bouton
            <ListItemButton
              key={item.text}
              component={Link} // On dit au bouton de se comporter comme un Link
              to={item.path} // La destination du lien
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