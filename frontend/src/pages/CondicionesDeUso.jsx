import React from 'react';
import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

const CondicionesDeUso = () => {
    return (
        <>
            <Navbar />
            <CartDrawer />
            <Container sx={{ marginTop: 12, marginBottom: 12, pb: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Condiciones de Uso
                </Typography>
                <Typography variant="body1">
                    Aquí va el contenido de las Condiciones de Uso.
                </Typography>
            </Container>
            <Footer />
        </>
    );
};

export default CondicionesDeUso;