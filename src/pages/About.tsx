
import {FC} from 'react';
// import HeroBg from "../assets/HeroBG.tsx";

interface AboutProps {
  className?: string;
}

const About:FC<AboutProps> = ({className=""}) => {
    return (
        <div className={`section ${className}`}>

            <h1>About</h1>
            <p>This is the about page.</p>
        </div>
    )
}

export default About;