import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Section from '../components/Section';
import { getProjectByTitle } from '../projects';

const ProjectDetail: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();

  // Convert slug back to title
  const projectTitle = title
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || '';

  const project = getProjectByTitle(projectTitle);

  if (!project) {
    return (
      <Section>
        <Box sx={{ textAlign: 'center', padding: '4rem' }}>
          <Typography variant="h2">Project not found</Typography>
          <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Back to Home
          </Button>
        </Box>
      </Section>
    );
  }

  return (
    <Section>
      <Box sx={{ padding: { xs: '2rem 0', md: '4rem 0' } }}>
        <IconButton
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            {project.images && project.images.length > 0 && (
              <Box
                component="img"
                src={project.images[0]}
                alt={project.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              />
            )}
            {project.images && project.images.length > 1 && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {project.images.slice(1).map((image, index) => (
                  <Grid size={{ xs: 6 }} key={index}>
                    <Box
                      component="img"
                      src={image}
                      alt={`${project.title} ${index + 2}`}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h1" sx={{ mb: 2 }}>
              {project.title}
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3,
                fontSize: '1.2rem',
                color: 'text.secondary'
              }}
            >
              {project.shortDescription}
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3,
                lineHeight: 1.8
              }}
            >
              {project.longDescription}
            </Typography>

            {project.tags && project.tags.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                {project.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    sx={{
                      backgroundColor: 'color3.main',
                      color: 'color3.contrastText',
                      mb: 1
                    }}
                  />
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Box>
    </Section>
  );
};

export default ProjectDetail;

