import './App.css'
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.tsx";

// These pages are never seen on initial load — defer their JS until needed
const About = lazy(() => import("./pages/About.tsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.tsx"));

function App() {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/project/:title" element={<ProjectDetail/>}/>
            </Routes>
        </Suspense>
    )
}

export default App
