import React, { useMemo, useState, useEffect } from 'react';
import Section from './Section';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import ProjectBubble from './ProjectBubble';
import { projects, ProjectData } from '../projects';
import Grid from '@mui/material/Grid';
interface ProjectsSectionProps {
    className?: string;
    ref?: React.RefObject<HTMLDivElement> | null;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
    animationState?: 'initial' | 'visible' | 'exitTop';
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
    deviceType = 'desktop',
    animationState = 'initial',
}) => {
    const theme = useTheme();

    // Memoized so bubblePositions useMemo isn't invalidated on every render
    const themeColors = useMemo(() => [
        theme.palette.color2.main, // #EC9A8D
        theme.palette.color3.main, // #F3A933
        theme.palette.color4.main, // #6C9289
        theme.palette.color5.main, // #C53650
        theme.palette.color6.main, // #972E2E
    ], [theme.palette.color2.main, theme.palette.color3.main, theme.palette.color4.main, theme.palette.color5.main, theme.palette.color6.main]);

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

    // Rotate projects with staggered timing
    useEffect(() => {
        const rotationInterval = 12000;

        const interval = setInterval(() => {
            setDisplayedProjects(getUniqueProjects(projects, bubblePositions.length));
        }, rotationInterval);

        return () => clearInterval(interval);
    }, []);

    return (
        <Section id="projects" ref={ref} className={`${className} projects-section`}>
            <Grid container direction="column" justifyContent="center" alignItems="center"
                sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '100dvh',
                    //   padding: { xs: '2rem 0', md: '4rem 0' },
                    overflow: 'hidden'
                }}
            >
                <Grid size={12}>
                <Typography
                    variant="h1"
                    sx={{
                        textAlign: 'center',
                        // marginBottom: { xs: '2rem', md: '4rem' },
                        // pt: '1rem',
                        position: 'relative'
                    }}
                >
                    Projects
                </Typography>
                </Grid>
                <Grid size={12}
                
                    sx={{
                        position: 'relative',
                        width: '100%',
                        minHeight: '80dvh',
                        mb: {'xs': '4rem', 'md': '0rem'},

                        // marginTop: { xs: '2rem', md: '4rem' }
                    }}
                >
                    {bubblePositions.map((position, index) => {
                        const project = displayedProjects[index];
                        if (!project) return null;

                        return (
                            <ProjectBubble
                                key={`bubble-${index}`}
                                project={project}
                                x={position.x}
                                y={position.y}
                                size={position.size}
                                color={position.color}
                                animationDelay={index * 0.12}
                                deviceType={deviceType}
                                animationState={animationState}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Section>
    );
};

export default ProjectsSection;
