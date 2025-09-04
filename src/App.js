import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Import des composants
import Layout from './components/Layout';
import ProductsManagement from './pages/ProductsManagement';
import ContentCreation from './pages/ContentCreation';
import ContentValidation from './pages/ContentValidation';
import PublishedContent from './pages/PublishedContent';
import Calendar from './pages/Calendar';
import Unauthorized from './pages/Unauthorized';

Amplify.configure(awsExports);

function App({ signOut, user }) {
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

  // Fonction pour vérifier les permissions
  const hasPermission = (requiredGroups) => {
    return requiredGroups.some(group => userGroups.includes(group));
  };

  return (
    <Router>
      <Layout signOut={signOut} user={user}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <div>
              <h1>Tableau de bord</h1>
              <p>Bienvenue sur le CMS Dobytrade.</p>
            </div>
          } />
          <Route path="/products" element={
            hasPermission(['gestionnaireDB']) ? 
            <ProductsManagement /> : 
            <Unauthorized />
          } />
          <Route path="/create" element={
            hasPermission(['redacteur']) ? 
            <ContentCreation /> : 
            <Unauthorized />
          } />
          <Route path="/validate" element={
            hasPermission(['redacteur', 'validateurtechnique']) ? 
            <ContentValidation /> : 
            <Unauthorized />
          } />
          <Route path="/published" element={
            hasPermission(['redacteur', 'validateurtechnique']) ? 
            <PublishedContent /> : 
            <Unauthorized />
          } />
          <Route path="/calendar" element={
            hasPermission(['redacteur', 'validateurtechnique', 'gestionnaireDB']) ? 
            <Calendar /> : 
            <Unauthorized />
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default withAuthenticator(App);