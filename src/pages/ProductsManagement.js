import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { API } from 'aws-amplify';
import { listProduits, createProduit, updateProduit, deleteProduit } from '../graphql/mutations';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ProductsManagement = () => {
  const [produits, setProduits] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ nom: '', description: '', prix: '' });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const produitData = await API.graphql({ query: listProduits });
      setProduits(produitData.data.listProduits.items);
    } catch (error) {
      setMessage({ text: 'Erreur lors du chargement', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await API.graphql({
          query: updateProduit,
          variables: { input: { ...formData, id: editingProduct.id } }
        });
        setMessage({ text: 'Produit modifié !', type: 'success' });
      } else {
        await API.graphql({
          query: createProduit,
          variables: { input: formData }
        });
        setMessage({ text: 'Produit créé !', type: 'success' });
      }
      
      setFormData({ nom: '', description: '', prix: '' });
      setEditingProduct(null);
      setOpenDialog(false);
      fetchProduits();
    } catch (error) {
      setMessage({ text: 'Erreur lors de la sauvegarde', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.graphql({
        query: deleteProduit,
        variables: { input: { id } }
      });
      setMessage({ text: 'Produit supprimé !', type: 'success' });
      fetchProduits();
    } catch (error) {
      setMessage({ text: 'Erreur lors de la suppression', type: 'error' });
    }
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData({
      nom: product.nom,
      description: product.description,
      prix: product.prix
    });
    setOpenDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color="primary">
          Gestion des Produits
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingProduct(null);
            setFormData({ nom: '', description: '', prix: '' });
            setOpenDialog(true);
          }}
        >
          Nouveau Produit
        </Button>
      </Box>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {produits.map((produit) => (
          <Grid item xs={12} md={6} lg={4} key={produit.id}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {produit.nom}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {produit.description}
                </Typography>
                <Typography variant="h5" color="secondary">
                  {produit.prix}€
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => openEditDialog(produit)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(produit.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle color="primary">
          {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Nom du produit"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="number"
              label="Prix (€)"
              value={formData.prix}
              onChange={(e) => setFormData({ ...formData, prix: parseFloat(e.target.value) })}
              margin="normal"
              required
              inputProps={{ step: "0.01" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Annuler
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              {editingProduct ? 'Modifier' : 'Créer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ProductsManagement;