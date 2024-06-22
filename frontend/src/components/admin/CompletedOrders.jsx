import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

const CompletedOrders = () => {
    // Aquí se agregarían las funciones para obtener los datos de pedidos completados
    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Pedidos Realizados</Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">Total de pedidos realizados: 100</Typography>
            </Box>
        </Paper>
    );
};

export default CompletedOrders;
