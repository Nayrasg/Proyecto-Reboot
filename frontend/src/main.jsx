import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AvisoLegal from './pages/AvisoLegal';
import CondicionesDeUso from './pages/CondicionesDeUso';
import PoliticaDeCookies from './pages/PoliticaDeCookies';
import Contacto from './pages/Contacto';
import Signup from './pages/Signup';
import ProductEditor from './pages/ProductEditor';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { CartProvider } from './contexts/CartContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/condiciones-de-uso" element={<CondicionesDeUso />} />
          <Route path="/politica-de-cookies" element={<PoliticaDeCookies />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/editor" element={<ProductEditor />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  </React.StrictMode>
);

