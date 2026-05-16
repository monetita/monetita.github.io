import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  animationState?: 'initial' | 'visible' | 'exitTop';
}

const ASSUMED_MOBILE_WIDTH = 375;
const ASSUMED_MOBILE_HEIGHT = 667;

const ProjectBubble: React.FC<ProjectBubbleProps> = ({
  project,
  x,
  y,
  size,
  color,
  animationDelay = 0,
  deviceType = 'desktop',
  animationState = 'initial',
}) => {
  const navigate = useNavigate();
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [adjustedX, setAdjustedX] = useState(x);
  const [adjustedY, setAdjustedY] = useState(y);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = useCallback(() => {
    if (deviceType === 'mobile') {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const widthRatio = screenWidth / ASSUMED_MOBILE_WIDTH;
      const heightRatio = screenHeight / ASSUMED_MOBILE_HEIGHT;
      const heightOffset = (screenHeight - ASSUMED_MOBILE_HEIGHT) / 2;
      setAdjustedX(x / widthRatio);
      setAdjustedY((y / heightRatio) + (heightOffset / ASSUMED_MOBILE_HEIGHT) * 100);
    } else {
      setAdjustedX(x);
      setAdjustedY(y);
    }
  }, [deviceType, x, y]);

  useEffect(() => {
    updatePosition();

    const handleResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(updatePosition, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, [updatePosition]);

  const handleClick = useCallback(() => {
    const titleSlug = project.title.replace(/\s+/g, '-').toLowerCase();
    navigate(`/project/${titleSlug}`);
  }, [project.title, navigate]);

  const yTarget = animationState === 'visible' ? 0 : animationState === 'exitTop' ? '-120vh' : '110vh';

  const titleFontSize = `${Math.max(size * 0.07, 9)}px`;
  const placeholderFontSize = `${Math.max(size * 0.15, 20)}px`;

  return (
    <motion.div
      ref={bubbleRef}
      style={{
        position: 'absolute',
        left: `${adjustedX}%`,
        top: `${adjustedY}%`,
        width: deviceType === 'mobile' ? `${size}vw` : `${size}dvh`,
        height: deviceType === 'mobile' ? `${size}vw` : `${size}dvh`,
        cursor: 'pointer',
        // zIndex: 1
      }}
      initial={{ y: '110vh' }}
      animate={{ y: yTarget }}
      transition={{
        y: {
          duration: animationState === 'visible' ? 0.8 : 0.6,
          delay: animationDelay,
          ease: animationState === 'visible' ? [0.22, 1, 0.36, 1] : 'easeIn',
        }
      }}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {project.images && project.images[0] ? (
              <Box
                component="img"
                src={project.images[0]}
                alt={project.title}
                loading="lazy"
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
                  sx={{ fontSize: placeholderFontSize, color: 'text.secondary' }}
                >
                  {project.title.charAt(0)}
                </Typography>
              </Box>
            )}
            <Typography
              variant="body2"
              sx={{
                fontSize: titleFontSize,
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
          </motion.div>
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default React.memo(ProjectBubble);
