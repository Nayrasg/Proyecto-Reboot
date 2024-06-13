import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AvisoLegal from './pages/AvisoLegal';
import CondicionesDeUso from './pages/CondicionesDeUso';
import PoliticaDeCookies from './pages/PoliticaDeCookies';
import Contacto from './pages/Contacto';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/aviso-legal" element={<AvisoLegal />} />
                <Route path="/condiciones-de-uso" element={<CondicionesDeUso />} />
                <Route path="/politica-de-cookies" element={<PoliticaDeCookies />} />
                <Route path="/contacto" element={<Contacto />} />
            </Routes>
        </Router>
    </React.StrictMode>
    );