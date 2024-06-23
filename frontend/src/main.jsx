import React from 'react';
import ReactDOM from 'react-dom/client';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import { CartProvider } from './contexts/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);

