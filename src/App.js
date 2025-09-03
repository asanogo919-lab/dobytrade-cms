// src/App.js

import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Layout from './components/Layout';

// 1. Importations de React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. On importe nos nouvelles pages
import ProductPage from './pages/ProductPage';
import CreateContentPage from './pages/CreateContentPage';

Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    // 3. On enveloppe TOUT dans BrowserRouter
    <BrowserRouter>
      <Layout signOut={signOut} user={user}>
        {/* 4. On définit la zone où les pages changeront */}
        <Routes>
          {/* 5. On définit chaque route */}
          <Route path="/products" element={<ProductPage />} />
          <Route path="/create" element={<CreateContentPage />} />
          {/* Route par défaut (la page d'accueil) */}
          <Route path="/" element={<h1>Tableau de bord</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);