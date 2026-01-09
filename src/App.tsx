import './App.css'
import {Routes, Route} from 'react-router-dom';
// import Header from "./components/Header.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import "./App.css";

function App() {
    return (
        <>
            {/*<Header/>*/}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/project/:title" element={<ProjectDetail/>}/>
            </Routes>

        </>
    )
}

export default App