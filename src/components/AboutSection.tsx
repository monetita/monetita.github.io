import React from 'react';
import Section from './Section';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// import Box from '@mui/material/Box';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import "./AboutSection.css";






interface AboutProps {
    className?: string;
    ref?: React.RefObject<HTMLDivElement> | null;
    projectsRef?: React.RefObject<HTMLDivElement> | null;
    contactRef?: React.RefObject<HTMLDivElement> | null;
    logoRef?: React.RefObject<HTMLDivElement> | null;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        color3: true;
        color4: true;
        color5: true;
        color6: true;


    }
}
declare module '@mui/material/Grid' {
    interface GridPropsColorOverrides {
        color3: true;
        color4: true;
        color5: true;
        color6: true;


    }
}

const AboutSection: React.FC<AboutProps> = ({ className = "", ref = null, projectsRef = null, contactRef = null, logoRef = null, deviceType = 'desktop' }) => {
    return (
        <Section id="about" ref={ref} className={`${className} about-section`}>
            <Grid container spacing={0} direction="row" sx={{ flexGrow: 1, height: "100%" }}>
                {/*About Me:*/}
                <Grid container direction="column" spacing={3} size={4}
                    sx={{
                        
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1,
                            backgroundImage: "url('/src/assets/headingBg1.svg')",
                            backgroundSize: '30%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'top left',
                            backgroundOrigin: "border-box",
                            // borderRadius: "50%",
                            // bgcolor: "color3.main",
                            // pt: "2rem",
                            // pl: "2rem",
                            color: "color3.contrastText",
                            px: "2rem",

                        


                    }}
                >
                    <Grid>
                        <Typography variant={"h1"}
                            sx={{
                                textAlign: "left",
                                pt: "2rem",
                                pl: "6rem",
                                pr: "0%",
                                mb: "1rem",
                                color: "color1.contrastText"
                            }}> About Me
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant={"body1"} sx={{ textAlign: "justify", color: "color1.contrastText" }}>Welcome to my creative space!<br />
                            I'm Michal, a Creative Technology student based in Amsterdam.
                            I love turning ideas into interactive experiences, whether that's through museum
                            projects,
                            smart tech installations, or even my own custom-designed fonts.
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button variant="contained"
                            sx={{ fontSize: { xs: "1rem", lg: "1.5rem" }, m: { xs: "0.5rem", md: "1rem" } }}
                            color="color6"
                            endIcon={<SendIcon />}
                            onClick={() => contactRef?.current.scrollIntoView({ behavior: 'smooth' })}
                        >Contact
                            Me</Button>
                    </Grid>
                    {/* <Grid size={4} sx={{ backgroundColor: "red" }}><Paper><Typography>About Me</Typography></Paper></Grid>
                    <Grid size={4} sx={{ backgroundColor: "blue" }}><Paper><Typography>My Story</Typography></Paper></Grid> */}
                </Grid>
                {/*My Story:*/}
                <Grid container direction="column" size={4} offset={4}
                    spacing={3}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                        zIndex: 1,
                        backgroundImage: "url('/src/assets/headingBg2.svg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'bottom right',
                        backgroundSize: "50%",
                        backgroundOrigin: "border-box",
                        // borderRadius: "50%",
                        color: "color4.contrastText",
                        px: "2rem",
                        

                    }}>
                    <Grid>
                        <Typography variant={"h1"}
                            sx={{
                                textAlign: "left",
                                pt: "2rem",
                                pl: "0rem",
                                pr: "0%",
                                mb: "1rem",
                                color: "color1.contrastText"
                            }}>
                            My Story
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant={"body1"} sx={{ textAlign: "justify", color: "color1.contrastText" }}>My journey is all about blending art
                            with tech.
                            I've had the pleasure of working on projects like an interactive experience for the
                            Rijksmuseum,
                            designing smart bike lane lights for safer streets, and creating a smart mirror for
                            dance
                            training.
                            I also have a passion for teaching and education.
                            Every project I work on is an opportunity to learn, experiment, and share knowledge in a
                            fun
                            way.</Typography>
                    </Grid>
                    <Grid>
                        <Button variant="contained"
                            sx={{ fontSize: { xs: "1rem", lg: "1.5rem" }, m: { xs: "0.5rem", md: "1rem" } }}
                            color="color6"
                            endIcon={<KeyboardDoubleArrowDownIcon sx={{ fontSize: { sx: "1rem", md: "3rem" } }} />}
                            onClick={() => projectsRef?.current.scrollIntoView({ behavior: 'smooth' })}
                        >View My Projects</Button>
                    </Grid>
                </Grid>
            </Grid>

        </Section>
    )
}

export default AboutSection;