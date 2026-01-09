import React, { useMemo, useState, useEffect } from 'react';
import Section from './Section';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { AnimatePresence } from 'motion/react';
import ProjectBubble from './ProjectBubble';
import { projects, ProjectData } from '../projects';

interface ProjectsSectionProps {
    className?: string;
    ref?: React.RefObject<HTMLDivElement> | null;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
}

// Function to shuffle array (Fisher-Yates)
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Function to get 5 unique projects (shuffled)
const getUniqueProjects = (allProjects: ProjectData[], numberOfProjects: number): ProjectData[] => {
    // Since we have exactly 5 projects and 5 bubbles, we'll shuffle all projects
    // This ensures no duplicates and rotates which project appears in which position
    return shuffleArray(allProjects).slice(0, numberOfProjects);
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
    className = "",
    ref = null,
    deviceType = 'desktop'
}) => {
    const theme = useTheme();

    // Theme colors array
    const themeColors = [
        theme.palette.color2.main, // #EC9A8D
        theme.palette.color3.main, // #F3A933
        theme.palette.color4.main, // #6C9289
        theme.palette.color5.main, // #C53650
        theme.palette.color6.main, // #972E2E
    ];

    // Fixed bubble positions (5 bubbles)
    const bubblePositions = useMemo(() => [
        { x: deviceType === 'mobile' ? 45 : deviceType === 'tablet' ? 5 : 5, 
            y: deviceType === 'mobile' ? 2 : deviceType === 'tablet' ? 20 : 20, 
            size: deviceType === 'mobile' ? 40 : deviceType === 'tablet' ? 30 : 30, 
            color: themeColors[0] },
        { x: deviceType === 'mobile' ? 5 : deviceType === 'tablet' ? 60 : 60, 
            y: deviceType === 'mobile' ? 70 : deviceType === 'tablet' ? 0 : 0, 
            size: deviceType === 'mobile' ? 55 : deviceType === 'tablet' ? 60 : 60, 
            color: themeColors[3] },
        { x: deviceType === 'mobile' ? 25 : deviceType === 'tablet' ? 40 : 40, 
            y: deviceType === 'mobile' ? 22 : deviceType === 'tablet' ? 15 : 15, 
            size: deviceType === 'mobile' ? 35 : deviceType === 'tablet' ? 40 : 40, 
            color: themeColors[2] },
        { x: deviceType === 'mobile' ? 5 : deviceType === 'tablet' ? 55 : 55, 
            y: deviceType === 'mobile' ? 60 : deviceType === 'tablet' ? 50 : 50, 
            size: deviceType === 'mobile' ? 20 : deviceType === 'tablet' ? 20 : 20, 
            color: themeColors[0] },
        { x: deviceType === 'mobile' ? 50 : deviceType === 'tablet' ? 15 : 15, 
            y: deviceType === 'mobile' ? 35 : deviceType === 'tablet' ? 35 : 35, 
            size: deviceType === 'mobile' ? 45 : deviceType === 'tablet' ? 55 : 55, 
            color: themeColors[1] },
        { x: deviceType === 'mobile' ? 50 : deviceType === 'tablet' ? 40 : 40, 
            y: deviceType === 'mobile' ? 65 : deviceType === 'tablet' ? 65 : 65, 
            size: deviceType === 'mobile' ? 30 : deviceType === 'tablet' ? 30 : 30, 
            color: themeColors[4] },
    ], [deviceType, themeColors]);

    // State for currently displayed projects - one per bubble position
    const [displayedProjects, setDisplayedProjects] = useState<ProjectData[]>(() =>
        shuffleArray(projects).slice(0, bubblePositions.length)
    );

    // Track rotation cycle for animation delays
    const [rotationKey, setRotationKey] = useState(0);

    // Rotate projects with staggered timing
    useEffect(() => {
        const rotationInterval = 12000; // Rotate every 12 seconds (longer interval)

        const interval = setInterval(() => {
            const newProjects = getUniqueProjects(projects, bubblePositions.length);
            // Update all projects at once, but increment key to trigger staggered animations
            setDisplayedProjects(newProjects);
            setRotationKey(prev => prev + 1);
        }, rotationInterval);

        return () => clearInterval(interval);
    }, []);

    return (
        <Section id="projects" ref={ref} className={`${className} projects-section`}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '100vh',
                    //   padding: { xs: '2rem 0', md: '4rem 0' },
                    overflow: 'hidden'
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        textAlign: 'center',
                        // marginBottom: { xs: '2rem', md: '4rem' },
                        zIndex: 2,
                        position: 'relative'
                    }}
                >
                    Projects
                </Typography>

                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        minHeight: '80vh',
                        // marginTop: { xs: '2rem', md: '4rem' }
                    }}
                >
                    <AnimatePresence>
                        {bubblePositions.map((position, index) => {
                            const project = displayedProjects[index];
                            if (!project) return null;

                            // Calculate stagger delay based on index (600ms between each)
                            const staggerDelay = index * 0.6;

                            return (
                                <ProjectBubble
                                    key={`bubble-${index}-${project.title}-${rotationKey}`}
                                    project={project}
                                    x={position.x}
                                    y={position.y}
                                    size={position.size}
                                    color={position.color}
                                    animationDelay={staggerDelay}
                                    deviceType={deviceType}
                                />
                            );
                        })}
                    </AnimatePresence>
                </Box>
            </Box>
        </Section>
    );
};

export default ProjectsSection;
