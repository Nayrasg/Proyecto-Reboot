import React from 'react';
import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PoliticaDeCookies = () => {
    return (
        <>
            <Navbar cartItems={[]} cartItemCount={0} toggleDrawer={() => {}} />
            <Container sx={{ marginTop: 12, marginBottom: 12, pb: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Política de Cookies
                </Typography>
                <Typography variant="body1">
                    Aquí va el contenido de la Política de Cookies.
                </Typography>
            </Container>
            <Footer />
        </>
    );
};

export default PoliticaDeCookies;