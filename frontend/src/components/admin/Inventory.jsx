import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

const Inventory = () => {
    // Aquí se agregarían las funciones para obtener los datos del inventario
    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Inventario Total</Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">Total de productos: 150</Typography>
                <Typography variant="body1">Productos en stock: 100</Typography>
                <Typography variant="body1">Productos agotados: 50</Typography>
            </Box>
        </Paper>
    );
};

export default Inventory;
