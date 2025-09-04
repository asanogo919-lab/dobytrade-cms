import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from '@mui/material';
import { API } from '@aws-amplify/api-graphql'; // Modification ici
import { listArticles } from '../graphql/queries';
import { updateArticle } from '../graphql/mutations';

// Le reste du code reste inchangé...

const ContentValidation = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const articleData = await API.graphql({
        query: listArticles,
        variables: { filter: { statut: { eq: 'EN_VALIDATION' } } }
      });
      setArticles(articleData.data.listArticles.items);
    } catch (error) {
      console.log('Erreur lors du chargement des articles', error);
      setMessage({ text: 'Erreur lors du chargement', type: 'error' });
    }
  };

  const handleValidation = async (articleId, statut) => {
    try {
      await API.graphql({
        query: updateArticle,
        variables: {
          input: {
            id: articleId,
            statut,
            validatedAt: new Date().toISOString(),
            ...(statut === 'PUBLIE' && { publishedAt: new Date().toISOString() })
          }
        }
      });

      setMessage({ 
        text: statut === 'VALIDE' ? 'Article validé !' : 'Article publié !', 
        type: 'success' 
      });
      fetchArticles();
      
      // Ici vous ajouterez l'envoi SMS et la publication automatique
      if (statut === 'PUBLIE') {
        console.log('Publication sur les réseaux sociaux et envoi SMS');
      }
    } catch (error) {
      setMessage({ text: 'Erreur lors de la validation', type: 'error' });
    }
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'EN_VALIDATION': return 'secondary';
      case 'VALIDE': return 'primary';
      case 'PUBLIE': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Validation de Contenu
      </Typography>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} md={6} key={article.id}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Typography variant="h6" color="text.primary">
                  {article.titre}
                </Typography>
                <Chip
                  label={article.statut}
                  color={getStatutColor(article.statut)}
                  size="small"
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {article.contenu.substring(0, 150)}...
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    setSelectedArticle(article);
                    setOpenDialog(true);
                  }}
                >
                  Voir plus
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleValidation(article.id, 'VALIDE')}
                >
                  Valider
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleValidation(article.id, 'PUBLIE')}
                >
                  Publier
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle color="primary">
          {selectedArticle?.titre}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {selectedArticle?.contenu}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContentValidation;