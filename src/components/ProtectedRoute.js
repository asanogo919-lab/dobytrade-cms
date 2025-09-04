// src/components/ProtectedRoute.js

import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';

// Ce composant prend les rôles autorisés ('allowedRoles') et la page à afficher ('children')
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const userGroups = user?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];

  // On vérifie si l'utilisateur a au moins un des rôles autorisés
  const isAuthorized = userGroups.some(group => allowedRoles.includes(group));

  if (!isAuthorized) {
    // Si pas autorisé, on le redirige vers la page d'accueil.
    return <Navigate to="/" replace />;
  }

  // Si autorisé, on affiche la page demandée.
  return children;
};

export default ProtectedRoute;