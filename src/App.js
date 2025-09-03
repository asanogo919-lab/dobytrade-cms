// src/App.js

import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// On importe notre nouveau Layout
import Layout from './components/Layout';

Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    // On enveloppe notre contenu avec le Layout
    // On lui passe les props 'signOut' et 'user' dont il a besoin
    <Layout signOut={signOut} user={user}>
      {/* Ce qui est ici est la prop "children" du Layout */}
      <div>
        <h1>Tableau de bord</h1>
        <p>Bienvenue sur le CMS Dobytrade.</p>
      </div>
    </Layout>
  );
}

export default withAuthenticator(App);