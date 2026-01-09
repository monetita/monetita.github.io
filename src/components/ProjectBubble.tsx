import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProjectData } from '../projects';

interface ProjectBubbleProps {
  project: ProjectData;
  x: number; // Position as percentage
  y: number; // Position as percentage
  size: number; // Size in pixels
  color: string;
  animationDelay?: number; // Delay for staggered animations
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

const ProjectBubble: React.FC<ProjectBubbleProps> = ({
  project,
  x,
  y,
  size,
  color,
  animationDelay = 0,
  deviceType = 'desktop',
}) => {
  const navigate = useNavigate();
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const titleSlug = project.title.replace(/\s+/g, '-').toLowerCase();
    navigate(`/project/${titleSlug}`);
  };

  return (
    <motion.div
      ref={bubbleRef}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: deviceType === 'mobile' ? `${size}vw` : deviceType === 'tablet' ? `${size}vh` : `${size}vh`,
        height: deviceType === 'mobile' ? `${size}vw` : deviceType === 'tablet' ? `${size}vh` : `${size}vh`,
        cursor: 'pointer',
        zIndex: 1
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
      }}
      exit={{ 
        scale: 0, 
        opacity: 0,
        transition: {
          duration: 0.6,
          ease: "easeIn"
        }
      }}
      transition={{
        scale: { duration: 1.2, delay: animationDelay, ease: "easeOut" },
        opacity: { duration: 1.2, delay: animationDelay, ease: "easeInOut" },
      }}
      key={project.title}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: color,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          }
        }}
      >
        {project.images && project.images[0] ? (
          <Box
            component="img"
            src={project.images[0]}
            alt={project.title}
            sx={{
              width: '60%',
              height: '60%',
              objectFit: 'cover',
              borderRadius: '50%',
              marginBottom: '5%'
            }}
          />
        ) : (
          <Box
            sx={{
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              marginBottom: '5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: `${Math.max(size * 0.15, 20)}px`,
                color: 'text.secondary'
              }}
            >
              {project.title.charAt(0)}
            </Typography>
          </Box>
        )}
        <Typography
          variant="body2"
          sx={{
            fontSize: `${Math.max(size * 0.07, 9)}px`,
            fontWeight: 'bold',
            color: 'text.primary',
            textAlign: 'center',
            lineHeight: 1.2,
            wordBreak: 'break-word',
            maxWidth: '85%',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
          }}
        >
          {project.title}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default ProjectBubble;

