import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

const OrderManagement = () => {
    // Aquí se agregarían las funciones para obtener los datos de pedidos en gestión
    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Pedidos en Gestión</Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">Total de pedidos en gestión: 5</Typography>
            </Box>
        </Paper>
    );
};

export default OrderManagement;
