import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip
} from '@mui/material';
import { API } from 'aws-amplify'; // Retour à l'import original
import { listArticles } from '../graphql/queries';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const PublishedContent = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const articleData = await API.graphql({
        query: listArticles,
        variables: { filter: { statut: { eq: 'PUBLIE' } } }
      });
      setArticles(articleData.data.listArticles.items);
    } catch (error) {
      console.log('Erreur lors du chargement des articles publiés', error);
    }
  };

  const calculerDureeCycle = (article) => {
    if (!article.createdAt || !article.publishedAt) return 'N/A';
    
    const created = new Date(article.createdAt);
    const published = new Date(article.publishedAt);
    const dureeMs = published - created;
    
    const jours = Math.floor(dureeMs / (1000 * 60 * 60 * 24));
    const heures = Math.floor((dureeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${jours}j ${heures}h`;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Contenus Publiés
      </Typography>

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} key={article.id}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Typography variant="h6" color="text.primary">
                    {article.titre}
                  </Typography>
                  <Chip
                    label="Publié"
                    color="info"
                    variant="outlined"
                  />
                </Box>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
                    <Typography color="secondary">Voir l'historique complet</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        <strong>Créé le:</strong> {new Date(article.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                    
                    {article.validatedAt && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTimeIcon color="secondary" sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          <strong>Validé le:</strong> {new Date(article.validatedAt).toLocaleString()}
                        </Typography>
                      </Box>
                    )}
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon color="info" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        <strong>Publié le:</strong> {new Date(article.publishedAt).toLocaleString()}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ mr: 1 }} />
                      <Typography variant="body2" color="primary">
                        <strong>Durée totale:</strong> {calculerDureeCycle(article)}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PublishedContent;