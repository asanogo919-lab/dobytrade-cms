// src/App.js

import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// On importe notre nouveau garde du corps
import ProtectedRoute from './components/ProtectedRoute';

import ProductPage from './pages/ProductPage';
import CreateContentPage from './pages/CreateContentPage';
// (Importez les autres pages de la même manière quand vous les créerez)

Amplify.configure(awsExports);

// La fonction App est maintenant à l'intérieur de withAuthenticator pour pouvoir utiliser les hooks
function AppContent({ signOut, user }) {
  return (
    <BrowserRouter>
      <Layout signOut={signOut} user={user}>
        <Routes>
          {/* Route pour le tableau de bord, accessible à tous les utilisateurs connectés */}
          <Route path="/" element={<h1>Tableau de bord</h1>} />

          {/* Route protégée pour les produits */}
          <Route 
            path="/products" 
            element={
              <ProtectedRoute allowedRoles={['GestionnaireBaseDeDonnees']}>
                <ProductPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Route protégée pour la création */}
          <Route 
            path="/create" 
            element={
              <ProtectedRoute allowedRoles={['Redacteur']}>
                <CreateContentPage />
              </ProtectedRoute>
            } 
          />

          {/* Ajoutez les autres routes protégées ici... */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function App() {
  // On utilise le hook ici pour passer les props à AppContent
  const { signOut, user } = useAuthenticator((context) => [
    context.signOut,
    context.user,
  ]);
  return <AppContent signOut={signOut} user={user} />;
}

export default withAuthenticator(App);