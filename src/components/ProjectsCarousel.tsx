import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import img1 from "/src/assets/projectImages/1.png";
import img2 from "/src/assets/projectImages/2.png";
import img3 from "/src/assets/projectImages/3.png";
import img4 from "/src/assets/projectImages/4.png";
import img5 from "/src/assets/projectImages/5.png";


// Define your projects (assumed 5 items)
const projects = [
    {
        title: "ARTventure",
        description: "An interactive quest for highschoolers visiting the Rijksmuseum",
        image: img1
    },
    {
        title: "Smart bikelane lights",
        description: "designed smart lights that light up when a pedestrian is about to collide with a bike. The lights light up a 3-second span from the bikes to the pedestrian",
        image: img3
    },
    {
        title: "COREography",
        description: "A conditioning experience using a smart mirror that transforms conditioning into a dance-like group competition",
        image: img4
    },
    {
        title: "Mechanical Walker",
        description: "3d animated model I created in Blender",
        image: img2
    },
    {
        title: "Memory Isle",
        description: "a web game that allows users to explore a world where the interactions they have with their surroundings affect the mood of the game. Good interactions will make the world bloom and everyone happy, while bad interactions will make the world dark and gloomy",
        image: img5
    },
];

interface ProjectsCarouselProps {
    cardWidth?: number;         // Width for each card in pixels (default: 200)
    spaceBetween?: number;      // Space between cards in pixels (default: 10)
    transitionDuration?: number; // Duration of slide animation in ms (default: 500)
    deviceType?: 'mobile' | 'tablet' | 'desktop';
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({


    transitionDuration = 500,
    deviceType = 'desktop'
}) => {
    // Repeat the projects array 3 times.
    const repeatedProjects = [...projects, ...projects, ...projects];
    const total = repeatedProjects.length; // For 5 projects, total is 15.
    // We'll start in the middle copy.
    const initialIndex = projects.length; // e.g. index 5
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    // This flag lets us disable transition momentarily during a reposition.
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    // Track slide start position for mobile slide animation ('100vw' = from right, '-100vw' = from left)
    const [slideStartPosition, setSlideStartPosition] = useState<string | null>(null);
    // Track if we should animate (prevents transition on initial render)
    const [shouldAnimate, setShouldAnimate] = useState(false);
    // Track the previous active index to animate the leaving card
    const [previousIndex, setPreviousIndex] = useState<number | null>(null);
    // Track the leaving direction for the previous card
    const [leavingDirection, setLeavingDirection] = useState<'left' | 'right' | null>(null);
    // Track if leaving animation should be active
    const [shouldLeave, setShouldLeave] = useState(false);

    const cardWidth = deviceType === 'desktop' ? 400 : 200;
    const spaceBetween = deviceType === 'desktop' ? 10 : 1;
    const isMobile = deviceType === 'mobile';
    // For mobile: center only the active card (offset is 0 since non-visible cards have width 0)
    // For tablet/desktop: show 3 cards (activeIndex-1, activeIndex, activeIndex+1)
    const offset = isMobile 
        ? 0 
        : -((activeIndex - 1) * cardWidth);
    const centerCardScale = deviceType === 'desktop' ? 'scale(1.2)' : 'scale(1.5)';
    const sideCardScale = deviceType === 'desktop' ? 'scale(1)' : 'scale(0)';
    // When the transition finishes, check if we're outside the middle copy.
    const handleTransitionEnd = () => {
        // If we’ve moved to the right clone (last block), subtract one full copy.
        if (activeIndex >= total - projects.length) {
            setTransitionEnabled(false);
            setActiveIndex(activeIndex - projects.length);
        }
        // If we’ve moved to the left clone (first block), add one full copy.
        else if (activeIndex < projects.length) {
            setTransitionEnabled(false);
            setActiveIndex(activeIndex + projects.length);
        }
    };

    // Re-enable transitions after repositioning.
    useEffect(() => {
        if (!transitionEnabled) {
            const timer = setTimeout(() => {
                setTransitionEnabled(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [transitionEnabled]);

    // Animate card to center after it starts from the side (for mobile)
    // Also start leaving animation simultaneously
    useEffect(() => {
        if (isMobile && slideStartPosition && (slideStartPosition === '100vw' || slideStartPosition === '-100vw')) {
            // Reset animation flags
            setShouldAnimate(false);
            setShouldLeave(false);
            // Use requestAnimationFrame to ensure the initial position is rendered before animating
            const frame1 = requestAnimationFrame(() => {
                const frame2 = requestAnimationFrame(() => {
                    // Start both animations simultaneously
                    setShouldAnimate(true);
                    setShouldLeave(true);
                    setSlideStartPosition('0');
                });
                return () => cancelAnimationFrame(frame2);
            });
            return () => cancelAnimationFrame(frame1);
        }
    }, [isMobile, slideStartPosition]);

    // Reset slide state after animation completes
    useEffect(() => {
        if (isMobile && slideStartPosition === '0') {
            const timer = setTimeout(() => {
                setSlideStartPosition(null);
                setShouldAnimate(false);
                setPreviousIndex(null);
                setLeavingDirection(null);
                setShouldLeave(false);
            }, transitionDuration);
            return () => clearTimeout(timer);
        }
    }, [isMobile, slideStartPosition, transitionDuration]);

    // Next and Prev update the active index.
    const handleNext = () => {
        if (isMobile) {
            setPreviousIndex(activeIndex);
            setLeavingDirection('left'); // Previous card slides out to the left
            setSlideStartPosition('100vw'); // New card slides in from right
        }
        setActiveIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (isMobile) {
            setPreviousIndex(activeIndex);
            setLeavingDirection('right'); // Previous card slides out to the right
            setSlideStartPosition('-100vw'); // New card slides in from left
        }
        setActiveIndex(prev => prev - 1);
    };

    // Dot click: jump to a specific project in the middle copy.
    const handleDotClick = (dotIndex: number) => {
        setActiveIndex(projects.length + dotIndex);
    };

    return (
        <Grid container direction="row" sx={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Grid size={{ xs: 1, md: 2 }} sx={{ alignSelf: "center", justifycontent: "flex-end" }}>
                <IconButton
                    onClick={handlePrev}
                    sx={{

                        backgroundColor: 'rgba(255,255,255,0.7)',
                    }}
                >
                    <NavigateBefore sx={{ color: "color6.main" }} />
                </IconButton>
            </Grid>
            <Grid size={{ xs: 10, md: 8 }} sx={{
                py: 4,
                overflow: 'hidden',
                height: "90%",
                position: 'relative',
            }}>
                {/* The sliding container renders all repeated slides */}
                <Box
                    sx={{
                        height: "100%",
                        width: '100%',
                        display: 'flex',
                        alignItems: "center",
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            height: "100%",
                            display: 'flex',
                            transition: transitionEnabled ? `transform ${transitionDuration}ms ease` : 'none',
                            transform: isMobile
                                ? `translateX(calc(50% - ${cardWidth / 2}px + ${offset}px))`
                                : `translateX(${offset}px)`,
                            alignItems: "center",
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                    {repeatedProjects.map((project, index) => {
                        // Only the slide at activeIndex is the center card.
                        const isCenter = index === activeIndex;
                        // Check if this is the leaving card (previous center card)
                        const isLeaving = isMobile && previousIndex !== null && index === previousIndex;
                        // On mobile, show center card or leaving card; on other devices show center + 1 on each side
                        const isVisible = isMobile 
                            ? (isCenter || isLeaving)
                            : true; // On desktop/tablet, all cards are in layout but scaled
                        
                        return (
                            <Box key={index} sx={{
                                flex: '0 0 auto',
                                width: isMobile && !isVisible ? 0 : cardWidth,
                                minWidth: isMobile && !isVisible ? 0 : cardWidth,
                                // height: '100%',
                                px: isMobile && !isVisible ? 0 : 1,
                                overflow: 'hidden',
                                ...(isMobile && !isVisible && {
                                    visibility: 'hidden',
                                    opacity: 0,
                                    pointerEvents: 'none'
                                })
                            }}>
                            
                                <Card
                                    key={isMobile && (isCenter || isLeaving) ? `card-${index}-${activeIndex}` : undefined}
                                    sx={{
                                        mx: spaceBetween / 2,
                                        ...(isMobile && (isCenter || isLeaving) ? {
                                            // Mobile: no scale, always full size
                                            transform: (() => {
                                                if (isLeaving && leavingDirection && shouldLeave) {
                                                    // Leaving card slides out in the opposite direction
                                                    return leavingDirection === 'left'
                                                        ? 'translateX(-100vw) scale(1)'
                                                        : 'translateX(100vw) scale(1)';
                                                }
                                                if (isLeaving) {
                                                    // Leaving card starts at center before animating out
                                                    return 'translateX(0) scale(1)';
                                                }
                                                if (isCenter) {
                                                    // New center card slides in
                                                    return slideStartPosition !== null
                                                        ? `translateX(${slideStartPosition}) scale(1)`
                                                        : 'translateX(0) scale(1)';
                                                }
                                                return 'translateX(0) scale(1)';
                                            })(),
                                            // Apply transition for both entering and leaving animations
                                            transition: (shouldAnimate || (isLeaving && shouldLeave))
                                                ? `transform ${transitionDuration}ms ease-out`
                                                : 'none',
                                        } : {
                                            // Desktop/Tablet: scale transform
                                            transform: isCenter ? centerCardScale : sideCardScale,
                                            transition: isCenter
                                                ? (transitionEnabled ? 'transform 0.5s ease' : 'none')
                                                : 'transform 0.5s ease',
                                        }),
                                    }}
                                >
                                    <Grid container direction="column" sx={{height: '100%'}}>
                                    {project.image && (
                                        <Grid size={12}>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            style={{ width: '100%' }}

                                        />
                                        </Grid>
                                    )}
                                    {(deviceType === 'desktop' || isCenter) && (
                                        <Grid size={12}>
                                        <CardContent>
                                            <Typography variant="body1" align="center">
                                                {project.title}
                                            </Typography>

                                            {isCenter && (
                                                <>
                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        {project.description}
                                                    </Typography>
                                                    {/*<Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>*/}
                                                    {/*    <Button variant="contained">Learn More</Button>*/}
                                                    {/*</Box>*/}
                                                </>
                                            )}
                                        </CardContent>
                                        </Grid>
                                    )}
                                    </Grid>
                                </Card>
                            </Box>
                            
                        );
                    })}
                    </Box>
                </Box>
            </Grid>
            {/* Navigation Buttons */}

            <Grid size={{ xs: 1, md: 2 }} sx={{ alignSelf: "center", justifySelf: "flex-start" }}>
                <IconButton
                    onClick={handleNext}
                    sx={{


                        backgroundColor: 'rgba(255,255,255,0.7)',
                    }}
                >
                    <NavigateNext sx={{ color: "color6.main" }} />
                </IconButton>
            </Grid>
            <Grid size={12} sx={{ height: "100%" }}>
                {/* Dot Indicators */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    m: 'auto',
                    // position: 'absolute',
                    // bottom: '1rem',
                    // left: '50%',
                    // transform: 'translateX(-50%)'
                }}>
                    {projects.map((_, idx) => {
                        // Calculate effective index within the real projects.
                        const effectiveIndex = activeIndex % projects.length;
                        const isActiveDot = effectiveIndex === idx;
                        return (
                            <Box
                                key={idx}
                                onClick={() => handleDotClick(idx)}
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    backgroundColor: isActiveDot ? 'color6.main' : 'grey.400',
                                    mx: 0.5,
                                    cursor: 'pointer',
                                }}
                            />
                        );
                    })}
                </Box>
            </Grid>
        </Grid>

    )
        ;
};

export default ProjectsCarousel;
