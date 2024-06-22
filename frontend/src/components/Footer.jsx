import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ 
            bgcolor: '#84BFFD', 
            p: 2, 
            width: '100%', 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            zIndex: 1300 
        }}>
            <Typography variant="body1" align="center" color="white" sx={{ mb: 1 }}>
                Todos los derechos reservados
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Link href="/aviso-legal" color="inherit" underline="hover">
                    Aviso Legal
                </Link>
                <Link href="/condiciones-de-uso" color="inherit" underline="hover">
                    Condiciones de Uso
                </Link>
                <Link href="/politica-de-cookies" color="inherit" underline="hover">
                    Política de Cookies
                </Link>
                <Link href="/contacto" color="inherit" underline="hover">
                    Contacto
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;

