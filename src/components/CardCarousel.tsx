import { useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface CarouselProps {
    items: (({isActive}: {isActive: boolean}) => React.ReactNode)[];
    visibleCountDesktop?: number; // must be odd
}

export default function CardCarousel({
    items,
    visibleCountDesktop = 3,
}: CarouselProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const visibleCount = isMobile ? 1 : visibleCountDesktop;
    const total = items.length;

    const [index, setIndex] = useState(0);

    const goNext = () => setIndex((i) => (i + 1) % total);
    const goPrev = () => setIndex((i) => (i - 1 + total) % total);

    const center = Math.floor(visibleCount / 2);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                // justifyContent: "center",
                // alignItems: "center",
                py: 2,
                height: "100%",
            }}
        >
            {/* Arrows */}
            <IconButton
                onClick={goPrev}
                sx={{ position: "absolute", left: 10, top: "50%", zIndex: 10 }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
                onClick={goNext}
                sx={{ position: "absolute", right: 10, top: "50%", zIndex: 10 }}
            >
                <ArrowForwardIosIcon />
            </IconButton>

            {/* Track */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    
                    height: "100%",
                    width: "100%",
                    px: 5
                }}
            >
                <motion.div
                    layout
                    style={{
                        display: "flex",
                        
                        // x: `-${index * (100 / visibleCount)}%`,
                        width: `${((total * 100) / visibleCount) - (visibleCount - 1)}%`,
                    }}
                    animate={{
                        x: `-${(index * (100 / visibleCount)) + (index  * 1)}%`,
                        width: `${((total * 100) / visibleCount) - (visibleCount - 1)}%`
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                //   transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                    {items.map((item, i) => {
                        const relative = (i - index + total) % total;
                        const isCenter = relative === center;

                        return (
                            <motion.div
                                key={i}
                                layout
                                style={{
                                    flex: `0 0 ${100 / visibleCount}%`,
                                    scale: isCenter ? 1.5 : 1,
                                    opacity: isCenter ? 1 : 0.6,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                }}
                                animate={{
                                    scale: isCenter ? 1.5 : 1,
                                    opacity: isCenter ? 1 : 0.6,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {typeof item === "function"
                                    ? item({ isActive:isCenter })
                                    : item}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Box>

            {/* Dots */}
            <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "center" }}>
                {items.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => setIndex(i)}
                        sx={{
                            top: -20,
                            position: "relative",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            cursor: "pointer",
                            backgroundColor: i === index ? "primary.main" : "grey.400",
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
