import React from 'react';
import Section from './Section';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import "./AboutSection.css";
import headingBg1 from '../assets/headingBg1.svg';
import headingBg2 from '../assets/headingBg2.svg';






interface AboutProps {
    className?: string;
    ref?: React.RefObject<HTMLDivElement> | null;
    projectsRef?: React.RefObject<HTMLDivElement> | null;
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

const AboutSection: React.FC<AboutProps> = ({ className = "", ref = null, projectsRef: _projectsRef = null, logoRef: _logoRef = null, deviceType: _deviceType = 'desktop' }) => {
    return (
        <Section id="about" ref={ref} className={`${className} about-section`} >
            <Grid container spacing={0} direction={{ "xs": "column", "md": "row" }}
                sx={{ flexGrow: 1, height: "100%", p: "1rem" }}>
                {/*About Me:*/}
                <Grid container direction="column" spacing={3} size={{ xs: 12, md: 4 }}
                    sx={{

                        justifyContent: { "xs": "flex-start", "md": "center" },
                        alignItems: "center",
                        zIndex: 1,
                        backgroundImage: `url(${headingBg1})`,
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
                        my: { "xs": 0, "md": "auto" },
                        // ml: "1rem",




                    }}
                >
                    <Grid>
                        <Typography variant={"h1"}
                            sx={{
                                textAlign: {"xs": "center", "md": "left"},
                                pt: "3rem",
                                pl: {"xs": "0rem", "md": "3rem"},
                                pr: "0%",
                                mb: {"xs": "0rem", "md": "1rem"},
                                color: "color1.contrastText"
                            }}> About Me
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant={"body1"}
                            sx={{
                                textAlign: "justify",
                                color: "color1.contrastText",
                                // pt: "5rem",
                                pr: "0%",
                                mb: "1rem",
                                width: "100%",
                            }}>Welcome to my creative space!<br />
                            I’m an interaction designer and creative technologist designing playful systems that live between the digital and physical. Based in Haarlem, I bring over a decade of experience in software engineering and product leadership (CTO/CPO) to games, installations, and interactive tools that encourage curiosity and exploration.
                        </Typography>
                    </Grid>
                    {/* <Grid>
                        <Button variant="contained"
                            sx={{ fontSize: { xs: "1rem", lg: "1.5rem" }, m: { xs: "0.5rem", md: "1rem" } }}
                            color="color6"
                            endIcon={<SendIcon />}
                            onClick={() => contactRef?.current.scrollIntoView({ behavior: 'smooth' })}
                        >Contact
                            Me</Button>
                    </Grid> */}
                    {/* <Grid size={4} sx={{ backgroundColor: "red" }}><Paper><Typography>About Me</Typography></Paper></Grid>
                    <Grid size={4} sx={{ backgroundColor: "blue" }}><Paper><Typography>My Story</Typography></Paper></Grid> */}
                </Grid>
                {/* My Story: */}
                <Grid container direction="column" size={{ xs: 12, md: 4 }} offset={{ xs: 0, md: 4 }}
                    spacing={{ "xs": 0, "md": 3 }}
                    sx={{
                        justifyContent: { "xs": "flex-start", "md": "center" },
                        alignItems: "center",
                        zIndex: 1,
                        backgroundImage: `url(${headingBg2})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'bottom right',
                        backgroundSize: "50%",
                        backgroundOrigin: "border-box",
                        // borderRadius: "50%",
                        color: "color4.contrastText",
                        flexGrow: { "xs": 1, "md": 0 },
                       
                        // pr: "10rem",
                        // pb: "10rem",
                        // mr: "1rem",


                    }}>
                    <Grid>

                        <Typography variant={"h1"}
                            sx={{
                                textAlign: "left",
                                pt: "2rem",
                                pl: "0rem",
                                pr: "0%",
                                color: "color1.contrastText"
                            }}>
                            Get In Touch
                        </Typography>
                    </Grid>
                    <Grid sx={{ alignContent: 'center', justifyContent: 'center' }} >
                        <Box sx={{ mt: 0, display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
                            <IconButton
                                href="mailto:michali.moneta@gmail.com"
                                aria-label="Email"
                                sx={{ color: "color1.contrastText" }}
                            >
                                <EmailIcon sx={{ fontSize: { xs: "1rem", lg: "3rem" } }} />
                            </IconButton>
                            <Typography variant="body1" sx={{ textAlign: "justify", color: "color1.contrastText", display: 'flex', alignItems: 'center', gap: 1 }}>
                                michali.moneta@gmail.com
                            </Typography>
                        </Box>
                        <Box sx={{ mt: {xs: 0, md: 2}, display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
                            <IconButton
                                href="https://www.linkedin.com/in/michal-moneta-4b5772b6"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn profile"
                                sx={{
                                    color: "color6.contrastText",
                                    fontSize: { xs: "1rem", lg: "3rem" },
                                    m: { xs: "0.5rem", md: "1rem" },
                                    minHeight: { xs: "2rem", lg: "4rem" },
                                    width: { xs: "2rem", lg: "4rem" },
                                    backgroundColor: "color6.main",
                                    borderRadius: 1,
                                    p: 0,
                                    '&:hover': {
                                        backgroundColor: "color3.main",
                                        color: "color6.contrastText",
                                    },

                                }}
                            >
                                <LinkedInIcon sx={{ fontSize: { xs: "1rem", lg: "3rem" }, p: 0, m: 0 }} />
                            </IconButton>
                            <Button
                                sx={{
                                    fontSize: { xs: "0.7rem", lg: "1.5rem" },
                                    m: { xs: "0.5rem", md: "1rem" },
                                    minHeight: { xs: "2rem", lg: "4rem" },
                                    // px: { xs: 2, lg: 3 }
                                    '&:hover': {
                                        backgroundColor: "color3.main",
                                        color: "color6.contrastText",
                                    },
                                }}
                                variant="contained"
                                color="color6"
                                href="/src/assets/CV_Michal_Moneta.pdf"
                                download
                            >
                                Download CV
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

        </Section>
    )
}

export default AboutSection;