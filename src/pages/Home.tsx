import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import type { HeroBgRef } from "../assets/HeroBG.tsx";
import Box from '@mui/material/Box';
import React, { lazy, Suspense, useEffect, useRef, useState, useCallback } from 'react';

import { useAnimate, useInView } from "motion/react";

// Lazy-load HeroBG — it contains thousands of SVG path points and
// should not block the initial render of visible page content.
const HeroBg = lazy(() => import("../assets/HeroBG"));

const sections = ['Hero', 'Projects', 'About'];

const Home = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<SVGSVGElement>(null);
    const heroBgRef = useRef<HeroBgRef>(null);
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [projectAnimState, setProjectAnimState] = useState<'initial' | 'visible' | 'exitTop'>('initial');
    const projectAnimTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isHeroInView = useInView(heroRef, { margin: "-10% 0px -10% 0px" });
    const isAboutInView = useInView(aboutRef, { margin: "-10% 0px -10% 0px" });
    const isProjectsInView = useInView(projectsRef, { margin: "-10% 0px -10% 0px" });
    const [, animate] = useAnimate();

    const getInitialDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
        if (window.matchMedia("(min-width: 1200px)").matches) return 'desktop';
        if (window.matchMedia("(min-width: 768px)").matches) return 'tablet';
        return 'mobile';
    };

    const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>(getInitialDeviceType());

    const getOriginalViewBox = useCallback((): string => {
        switch (deviceType) {
            case 'mobile':
                return "0 -800 1440 1801";
            case 'tablet':
                return "0 -800 1440 1801";
            case 'desktop':
                return "0 200 1440 1801";
            default:
                return "0 200 1440 1801";
        }
    }, [deviceType]);

    useEffect(() => {
        const mobileMQ = window.matchMedia("(max-width: 767px)");
        const tabletMQ = window.matchMedia("(min-width: 768px) and (max-width: 1199px)");
        const desktopMQ = window.matchMedia("(min-width: 1200px)");

        const updateDeviceType = () => {
            if (desktopMQ.matches) {
                setDeviceType('desktop');
            } else if (tabletMQ.matches) {
                setDeviceType('tablet');
            } else if (mobileMQ.matches) {
                setDeviceType('mobile');
            }
        };

        updateDeviceType();

        mobileMQ.addEventListener("change", updateDeviceType);
        tabletMQ.addEventListener("change", updateDeviceType);
        desktopMQ.addEventListener("change", updateDeviceType);

        return () => {
            mobileMQ.removeEventListener("change", updateDeviceType);
            tabletMQ.removeEventListener("change", updateDeviceType);
            desktopMQ.removeEventListener("change", updateDeviceType);
        };
    }, []);

    const handleHeroInView = (reverse: boolean = false) => {
        const duration = 0.75;
        if (reverse) {
            if (projectAnimTimerRef.current) clearTimeout(projectAnimTimerRef.current);
            setProjectAnimState('initial');
            heroBgRef.current?.bubbleUp(true);
            heroBgRef.current?.restartStarAnimation();
            animate(logoRef.current as SVGSVGElement, { viewBox: getOriginalViewBox() }, { duration: duration });
        }
    };

    const handleAboutInView = (reverse: boolean = false) => {
        const duration = 0.5;
        if (!reverse) {
            setProjectAnimState('exitTop');
        }
        if(reverse) {
            animate(logoRef.current as SVGSVGElement, { rotate: 0 }, { duration: 0.75 });
        }

        if (deviceType === 'desktop') {
            animate(logoRef.current as SVGSVGElement, { viewBox: "0 640 1440 1801" }, { duration: duration, delay: 0 });
        }
        else {
            animate(logoRef.current as SVGSVGElement, { viewBox: "400 -300 1440 1801" }, { duration: duration * 1.25, delay: 0 });
        }

    };

    const handleProjectsInView = (reverse: boolean = false) => {
        const duration = 1.25;
        if (!reverse) {
            heroBgRef.current?.bubbleUp();
            heroBgRef.current?.stopStarAnimation();
            // Delay project bubbles so hero bubbles visibly start first
            if (projectAnimTimerRef.current) clearTimeout(projectAnimTimerRef.current);
            projectAnimTimerRef.current = setTimeout(() => setProjectAnimState('visible'), 100);
        }
        if (reverse) {
            // Coming back from about — bubbles are already off top, bring them back down
            setProjectAnimState('visible');
            animate(logoRef.current as SVGSVGElement, { rotate: 0 }, { duration: 0.75 });
        }
        if (deviceType === 'desktop') {
            const currentViewBox = logoRef.current?.getAttribute('viewBox') || getOriginalViewBox();
            animate(logoRef.current as SVGSVGElement, { viewBox: [currentViewBox, "0 640 1440 1801", "0 640 1440 1801", "-1000 600 5040 4801"] }, { duration: duration, delay: 0, times: [0, 0.4, 0.6, 1], ease: "easeInOut"});
        }
        else {
            const currentViewBox = logoRef.current?.getAttribute('viewBox') || getOriginalViewBox();
            const widthRatio = window.innerWidth / 375;
            const heightRatio = window.innerHeight / 667;
            const maxRatio = Math.max(widthRatio, heightRatio);
            const newX = 600 / maxRatio;
            const newY = 450 / maxRatio;
            animate(logoRef.current as SVGSVGElement, { viewBox: [currentViewBox, "0 1300 1440 1801", "0 1300 1440 1801", `${newX} ${newY} 2040 4801`] }, { duration: duration * 1.25, delay: 0, times: [0 ,0.4, 0.6, 1] });
        }

    };

    const handleSectionInView = (index: number, reverse: boolean = false) => {
        switch (index) {
            case sections.indexOf('Hero'):
                handleHeroInView(reverse);
                break;
            case sections.indexOf('Projects'):
                handleProjectsInView(reverse);
                break;
            case sections.indexOf('About'):
                handleAboutInView(reverse);
                break;
        }
    };

    const getNextActiveIndex = () => {
        if (activeIndex != 0 && isHeroInView) {
            return sections.indexOf('Hero');
        }
        else if (activeIndex != 1 && isProjectsInView) {
            return sections.indexOf('Projects');
        }
        else if (activeIndex != 2 && isAboutInView) {
            return sections.indexOf('About');
        }
        return activeIndex;
    };

    useEffect(() => {
        const previousIndex = activeIndex;
        const nextIndex = getNextActiveIndex();
        if (nextIndex > previousIndex) {
            handleSectionInView(nextIndex);
        }
        else if (nextIndex < previousIndex) {
            handleSectionInView(nextIndex, true);
        }
        setActiveIndex(nextIndex);
    }, [isHeroInView, isAboutInView, isProjectsInView, deviceType, getOriginalViewBox, animate]);

    return (
        <Box id="main" ref={scrollRef} sx={{ bgcolor: "color1.main" }}>
            <Suspense fallback={null}>
                <HeroBg ref={heroBgRef} logoRef={logoRef as React.RefObject<SVGSVGElement>}
                    aboutRef={aboutRef as React.RefObject<HTMLDivElement>} deviceType={deviceType} />
            </Suspense>
            <Hero ref={heroRef as React.RefObject<HTMLDivElement>}
                projectsRef={projectsRef as React.RefObject<HTMLDivElement>}
                deviceType={deviceType} />
            <ProjectsSection ref={projectsRef as React.RefObject<HTMLDivElement>} deviceType={deviceType} animationState={projectAnimState} />
            <AboutSection ref={aboutRef as React.RefObject<HTMLDivElement>}
                projectsRef={projectsRef as React.RefObject<HTMLDivElement>}
                deviceType={deviceType}
            />
            <div className="dot-nav">
                {sections.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${activeIndex === index ? 'active' : ''}`}
                    />
                ))}
            </div>
        </Box>
    )
}

export default Home;
