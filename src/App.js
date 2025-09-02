// src/App.js

import React from 'react';

// Importations Amplify
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Importation de la configuration générée par Amplify
import awsExports from './aws-exports';

// Configuration d'Amplify pour qu'il se connecte à notre backend
Amplify.configure(awsExports);

// Le composant App ne sera affiché QUE si l'utilisateur est connecté.
// 'signOut' et 'user' sont fournis automatiquement par withAuthenticator.
function App({ signOut, user }) {
  return (
    <div>
      <h1>Bonjour, {user.attributes.email} !</h1>
      <p>Bienvenue sur le CMS Dobytrade.</p>
      <button onClick={signOut}>Se déconnecter</button>
    </div>
  );
}

// withAuthenticator est un "Higher-Order Component" qui enveloppe notre App.
// Il gère automatiquement l'affichage du formulaire de connexion/inscription
// si l'utilisateur n'est pas authentifié.
export default withAuthenticator(App);