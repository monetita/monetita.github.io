import React from 'react';
import Box from '@mui/material/Box';

export interface SectionProps {
  className?: string;
  ref?: React.RefObject<HTMLDivElement> | null;
    id?: string;
    children: React.ReactNode;

}

const Section: React.FC<SectionProps> = ({className = "", ref=null, id="", children}) => {
    return (
        <Box id={id} ref={ref} className={`section ${className}`} sx={{
            xs:{
                margin: "0 auto",
                padding: "0 1rem"
            },
            md:{
                margin: "0 auto",
                padding: "0 2rem"
            },
            lg:{
                margin: "0 auto",
                padding: "0 3rem"
            }
        }}>
            {children}
        </Box>
    )
}
export default Section;