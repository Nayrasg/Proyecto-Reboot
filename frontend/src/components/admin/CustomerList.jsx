import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

const CustomerList = () => {
    // Aquí se agregarían las funciones para obtener los datos de los clientes
    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Listado de Clientes</Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">Total de clientes: 50</Typography>
                <Typography variant="body1">Clientes activos: 45</Typography>
                <Typography variant="body1">Clientes inactivos: 5</Typography>
            </Box>
        </Paper>
    );
};

export default CustomerList;
