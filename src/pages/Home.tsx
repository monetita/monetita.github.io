import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import Contact from "../components/Contact";
// import ReactFullpage from "@fullpage/react-fullpage";
import HeroBg, { HeroBgRef } from "../assets/HeroBG.tsx";
import Box from '@mui/material/Box';
import React, { useEffect, useRef, useState, useCallback } from 'react';

import { motion, useAnimate, useInView } from "motion/react";
import type { Variants } from "motion/react";

const sections = ['Hero', 'Projects', 'About', 'Contact'];

const Home = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<SVGSVGElement>(null);
    const heroBgRef = useRef<HeroBgRef>(null);
    const scrollRef = useRef(null);
    const sectionRefs = [heroRef, projectsRef, aboutRef, contactRef];
    const [activeIndex, setActiveIndex] = useState(0);
    const isHeroInView = useInView(heroRef, { margin: "-10% 0px -10% 0px" });
    const isAboutInView = useInView(aboutRef, { margin: "-10% 0px -10% 0px" });
    const isProjectsInView = useInView(projectsRef, { margin: "-10% 0px -10% 0px" });
    const isContactInView = useInView(contactRef, { margin: "-10% 0px -10% 0px" });
    const [scope, animate] = useAnimate();

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
            // Revert to original viewBox based on device type
            heroBgRef.current?.bubbleUp(true);
            heroBgRef.current?.restartStarAnimation();
            animate(logoRef.current as SVGSVGElement, { viewBox: getOriginalViewBox() }, { duration: duration });
        }
    };

    const handleAboutInView = (reverse: boolean = false) => {
        const duration = 0.5;
        if(reverse) {
            animate(logoRef.current as SVGSVGElement, { rotate: 0 }, { duration: 0.75 });
        }
        
        if (deviceType === 'desktop') {
            animate(logoRef.current as SVGSVGElement, { viewBox: "0 640 1440 1801" }, { duration: duration, delay: 0 });
        }
        else {
            animate(logoRef.current as SVGSVGElement, { viewBox: "0 1300 1440 1801" }, { duration: duration * 1.25, delay: 0 });
        }
        
    };
    
    const handleProjectsInView = (reverse: boolean = false) => {
        const duration = 1.25;
        if (!reverse) {
    
            heroBgRef.current?.bubbleUp();
            heroBgRef.current?.stopStarAnimation();
        }
        if (reverse) {
            animate(logoRef.current as SVGSVGElement, { rotate: 0 }, { duration: 0.75 });
        }
        if (deviceType === 'desktop') {
            const currentViewBox = logoRef.current?.getAttribute('viewBox') || getOriginalViewBox();
            animate(logoRef.current as SVGSVGElement, { viewBox: [currentViewBox, "0 640 1440 1801", "-1000 600 5040 4801"] }, { duration: duration, delay: 0, times: [0, 0.3, 1], ease: "easeInOut"});
        }
        else {
            const currentViewBox = logoRef.current?.getAttribute('viewBox') || getOriginalViewBox();
            animate(logoRef.current as SVGSVGElement, { viewBox: [currentViewBox, "0 1300 1440 1801", "600 450 2040 4801"] }, { duration: duration * 1.25, delay: 0, times: [0 ,0.30, 1] });
        }

    };

    const handleContactInView = (reverse: boolean = false) => {
        if (!reverse) {
            animate(logoRef.current as SVGSVGElement, { viewBox: "100 450 2040 4801", rotate: -15 }, { duration: 0.75 });
        }
        else {

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
            case sections.indexOf('Contact'):
                handleContactInView(reverse);
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
        else if (activeIndex != 3 && isContactInView) {
            return sections.indexOf('Contact');
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
    }, [isHeroInView, isAboutInView, isProjectsInView, isContactInView, deviceType, getOriginalViewBox, animate]);

    // useEffect(() => {
    //     const container = scrollContainerRef.current;
    //     if (!container) return;

    //     const handleScroll = () => {
    //         gsap.to(".green", { rotation: 27, x: 100, duration: 1 });
    //         const containerTop = container.getBoundingClientRect().top;
    //         const closestIndex = sectionRefs.reduce((closestIdx, section, i) => {
    //             const rect = section.current?.getBoundingClientRect();
    //             if (!rect) return closestIdx;
    //             const offset = Math.abs(rect.top - containerTop);
    //             const closestRect = sectionRefs[closestIdx].current?.getBoundingClientRect();
    //             const closestOffset = Math.abs((closestRect?.top ?? 0) - containerTop);
    //             return offset < closestOffset ? i : closestIdx;
    //         }, 0);
    //         setActiveIndex(closestIndex);
    //         handleScrollHeroBackground(closestIndex);
    //     };

    //     container.addEventListener('scroll', handleScroll, { passive: true });
    //     return () => container.removeEventListener('scroll', handleScroll);
    // }, []);

    // const scrollToSection = (index: number) => {
    //     sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
    // };
    // const handleScrollHeroBackground = (sectionIndex: number) => {
    //     const shouldBeTransparent = sectionIndex != 0;
    //     const ids = ['bubbles', 'gears'];
    //     ids.forEach(id => {
    //         const el = document.getElementById(id);
    //         if (el) {
    //             if (shouldBeTransparent) {
    //                 el.classList.add('transparent');
    //             } else {
    //                 el.classList.remove('transparent');
    //             }
    //         }
    //     });
    // };


    return (
        <Box id="main" ref={scrollRef} sx={{ bgcolor: "color1.main" }}>




            <HeroBg ref={heroBgRef} logoRef={logoRef as React.RefObject<SVGSVGElement>}
                aboutRef={aboutRef as React.RefObject<HTMLDivElement>} deviceType={deviceType} />
            <Hero ref={heroRef as React.RefObject<HTMLDivElement>}
                aboutRef={aboutRef as React.RefObject<HTMLDivElement>} deviceType={deviceType} />
            <ProjectsSection ref={projectsRef as React.RefObject<HTMLDivElement>} deviceType={deviceType} />
            <AboutSection ref={aboutRef as React.RefObject<HTMLDivElement>}
                projectsRef={projectsRef as React.RefObject<HTMLDivElement>}
                contactRef={contactRef as React.RefObject<HTMLDivElement>}
                deviceType={deviceType}
            />
            <Contact ref={contactRef as React.RefObject<HTMLDivElement>} deviceType={deviceType} />

            <div className="dot-nav">
                {sections.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${activeIndex === index ? 'active' : ''}`}
                    // onClick={() => scrollToSection(index)}
                    />
                ))}
            </div>
            {/* <Section ref={heroRef as React.RefObject<HTMLDivElement>}><div id="box1"></div></Section>
            <Section ref={aboutRef as React.RefObject<HTMLDivElement>}><div id="box2"></div></Section>
            <Section ref={projectsRef as React.RefObject<HTMLDivElement>}><div id="box3"></div></Section>
            <Section ref={contactRef as React.RefObject<HTMLDivElement>}><div id="box4"></div></Section> */}
        </Box>


    )
}

export default Home;