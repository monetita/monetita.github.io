import React from 'react';
import Section from './Section';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import './Hero.css';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";


interface HeroProps {
    className?: string;
    ref?: React.RefObject<HTMLDivElement> | null;
    projectsRef?: React.RefObject<HTMLDivElement> | null;
    deviceType?: 'mobile' | 'tablet' | 'desktop';
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        color3: true;
        color4: true;
        color5: true;


    }
}

const Hero: React.FC<HeroProps> = ({className = "", ref = null, projectsRef = null, deviceType: _deviceType = 'desktop'}) => {
    return (
        <Section id="hero" ref={ref} className={`${className} hero-section`}>
            <Grid container direction="column" sx={{alignItems: "center"}} spacing={8}>
                <Grid>
                    <Typography className={"hero-title"} variant="h1" sx={{typography: {xs: "h5", md: "h2", lg: "h1"}}}>Hi,
                        I'm Michal Moneta</Typography>
                </Grid>
                <Grid>
                    <Typography variant="h2"
                                sx={{
                                    px: "20%"
                                }}>I
                        Design Experiences That Spark Curiosity</Typography>
                    {/*<Typography variant="h2">I mix creativity and technology to*/}
                    {/*    build interactive designs and engaging products*/}
                    {/*    that teach and inspire</Typography>*/}
                </Grid>
                <Grid className={"hero-buttons"}>
                    <IconButton sx={{color: "color6.main", zIndex: 3000}}
                                onClick={() => projectsRef?.current.scrollIntoView({behavior: 'smooth'})}>
                        <KeyboardDoubleArrowDownIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Section>
    )
}

export default Hero;