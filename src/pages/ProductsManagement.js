import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listProduits, createProduit, updateProduit, deleteProduit } from '../graphql/mutations';
import { onCreateProduit, onUpdateProduit, onDeleteProduit } from '../graphql/subscriptions';

const ProductsManagement = () => {
  const [produits, setProduits] = useState([]);
  const [formData, setFormData] = useState({ nom: '', description: '', prix: '' });

  // Charger les produits
  useEffect(() => {
    fetchProduits();
    
    // Abonnements pour les mises à jour en temps réel
    const subscriptionCreate = API.graphql({ query: onCreateProduit })
      .subscribe({
        next: ({ value }) => {
          setProduits(prev => [...prev, value.data.onCreateProduit]);
        }
      });
      
    const subscriptionUpdate = API.graphql({ query: onUpdateProduit })
      .subscribe({
        next: ({ value }) => {
          setProduits(prev => prev.map(p => 
            p.id === value.data.onUpdateProduit.id ? value.data.onUpdateProduit : p
          ));
        }
      });
      
    const subscriptionDelete = API.graphql({ query: onDeleteProduit })
      .subscribe({
        next: ({ value }) => {
          setProduits(prev => prev.filter(p => p.id !== value.data.onDeleteProduit.id));
        }
      });

    return () => {
      subscriptionCreate.unsubscribe();
      subscriptionUpdate.unsubscribe();
      subscriptionDelete.unsubscribe();
    };
  }, []);

  const fetchProduits = async () => {
    try {
      const produitData = await API.graphql({ query: listProduits });
      setProduits(produitData.data.listProduits.items);
    } catch (error) {
      console.log('Erreur lors du chargement des produits', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.graphql({ 
        query: createProduit, 
        variables: { input: formData } 
      });
      setFormData({ nom: '', description: '', prix: '' });
    } catch (error) {
      console.log('Erreur lors de la création du produit', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.graphql({ 
        query: deleteProduit, 
        variables: { input: { id } } 
      });
    } catch (error) {
      console.log('Erreur lors de la suppression du produit', error);
    }
  };

  return (
    <div>
      <h2>Gestion des Produits</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du produit"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={formData.prix}
          onChange={(e) => setFormData({ ...formData, prix: parseFloat(e.target.value) })}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      
      <div>
        {produits.map(produit => (
          <div key={produit.id}>
            <h3>{produit.nom}</h3>
            <p>{produit.description}</p>
            <p>Prix: {produit.prix}€</p>
            <button onClick={() => handleDelete(produit.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsManagement;