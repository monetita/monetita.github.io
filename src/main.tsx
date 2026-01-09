// src/main.tsx
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';
import Theme1 from './themes/theme1';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider theme={Theme1}>
            <CssBaseline/>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
