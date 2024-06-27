
import React from 'react';
import Root from "../layouts";
import LandingPage from '../pages/LandingPage';
import AvisoLegal from '../pages/AvisoLegal';
import CondicionesDeUso from '../pages/CondicionesDeUso';
import PoliticaDeCookies from '../pages/PoliticaDeCookies';
import Contacto from '../pages/Contacto';
import Signup from '../pages/Signup';
import ProductEditor from '../pages/ProductEditor';
import ProductDetail from '../pages/ProductDetail';
import AdminDashboard from '../pages/AdminDashboard';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import { createBrowserRouter, redirect } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '',
        element: <Root />,
        children: [
            {
                path: '',
                element: <LandingPage />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: '/aviso-legal',
                element: <AvisoLegal />
            },
            {
                path: '/condiciones-de-uso',
                element: <CondicionesDeUso />
            },
            {
                path: '/politica-de-cookies',
                element: <PoliticaDeCookies />
            },
            {
                path: '/contacto',
                element: <Contacto />
            },
            {
                path: '/signUp',
                element: <Signup />
            },
            {
                path: '/editor',
                element: <ProductEditor />
            },
            {
                path: '/product/:id',
                element: <ProductDetail />
            },
            {
                path: '/admin',
                element: <AdminDashboard />
            },
            {
                path: '/login',
                loader: () => {
                    if(localStorage.getItem('token')) {
                        return redirect('/admin')
                    }
                    return null
                },
                element: <Login />
            }
        ]
    }
]);

export default router;
