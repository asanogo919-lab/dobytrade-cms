import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { API } from '@aws-amplify/api-graphql'; // Modification ici
import { listArticles } from '../graphql/queries';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Le reste du code reste inchangé...
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
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
      console.log('Erreur lors du chargement des articles', error);
    }
  };

  const getArticlesForMonth = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    return articles.filter(article => {
      const articleDate = new Date(article.publishedAt);
      return articleDate.getMonth() === month && articleDate.getFullYear() === year;
    });
  };

  const changeMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CalendarTodayIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h4" color="primary">
          Calendrier des Publications
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => changeMonth(-1)} color="primary">
            <ChevronLeftIcon />
          </IconButton>
          
          <Typography variant="h5" color="secondary">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Typography>
          
          <IconButton onClick={() => changeMonth(1)} color="primary">
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          {getArticlesForMonth().map((article) => (
            <Grid item xs={12} md={6} key={article.id}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="subtitle2" color="info.main" gutterBottom>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {article.titre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.contenu.substring(0, 100)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {getArticlesForMonth().length === 0 && (
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
            Aucune publication prévue pour ce mois
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Calendar;