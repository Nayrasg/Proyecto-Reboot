import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

const ExternalInventory = () => {
    // Aquí se agregarían las funciones para obtener los datos del inventario de vendedores externos
    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Inventario de Vendedores Externos</Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">Total de productos: 50</Typography>
                <Typography variant="body1">Productos en stock: 30</Typography>
                <Typography variant="body1">Productos agotados: 20</Typography>
            </Box>
        </Paper>
    );
};

export default ExternalInventory;
