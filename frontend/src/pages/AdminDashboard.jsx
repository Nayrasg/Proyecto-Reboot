import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Datos ficticios para el dashboard
const totalInventory = [
    { id: 1, title: 'Producto 1', quantity: 10 },
    { id: 2, title: 'Producto 2', quantity: 20 },
    { id: 3, title: 'Producto 3', quantity: 15 },
    // Añadir más productos según sea necesario
];

const externalVendorsInventory = [
    { id: 1, vendor: 'Vendedor 1', title: 'Producto A', quantity: 5 },
    { id: 2, vendor: 'Vendedor 2', title: 'Producto B', quantity: 8 },
    { id: 3, vendor: 'Vendedor 3', title: 'Producto C', quantity: 12 },
    // Añadir más productos según sea necesario
];

const ordersInProgress = [
    { id: 1, customer: 'Cliente 1', product: 'Producto 1', status: 'En progreso' },
    { id: 2, customer: 'Cliente 2', product: 'Producto 2', status: 'En progreso' },
    // Añadir más pedidos según sea necesario
];

const completedOrders = [
    { id: 1, customer: 'Cliente 1', product: 'Producto 3', status: 'Completado' },
    { id: 2, customer: 'Cliente 2', product: 'Producto 4', status: 'Completado' },
    // Añadir más pedidos según sea necesario
];

const customers = [
    { id: 1, name: 'Cliente 1', email: 'cliente1@example.com' },
    { id: 2, name: 'Cliente 2', email: 'cliente2@example.com' },
    // Añadir más clientes según sea necesario
];

const AdminDashboard = () => {
    const [showTotalInventory, setShowTotalInventory] = useState(false);
    const [showExternalVendorsInventory, setShowExternalVendorsInventory] = useState(false);
    const [showOrdersInProgress, setShowOrdersInProgress] = useState(false);
    const [showCompletedOrders, setShowCompletedOrders] = useState(false);
    const [showCustomers, setShowCustomers] = useState(false);

    return (
        <>
            <Navbar />
            <Container sx={{ marginTop: 12, marginBottom: 12, pb: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Panel de Administración
                </Typography>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">Inventario Total</Typography>
                            <Typography variant="h5">{totalInventory.length}</Typography>
                            <Button onClick={() => setShowTotalInventory(!showTotalInventory)}>
                                {showTotalInventory ? 'Ocultar' : 'Mostrar'} Lista
                            </Button>
                            {showTotalInventory && (
                                <List>
                                    {totalInventory.map((item) => (
                                        <ListItem key={item.id}>
                                            <ListItemText primary={`${item.title} - Cantidad: ${item.quantity}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">Inventario de Vendedores Externos</Typography>
                            <Typography variant="h5">{externalVendorsInventory.length}</Typography>
                            <Button onClick={() => setShowExternalVendorsInventory(!showExternalVendorsInventory)}>
                                {showExternalVendorsInventory ? 'Ocultar' : 'Mostrar'} Lista
                            </Button>
                            {showExternalVendorsInventory && (
                                <List>
                                    {externalVendorsInventory.map((item) => (
                                        <ListItem key={item.id}>
                                            <ListItemText primary={`${item.vendor} - ${item.title} - Cantidad: ${item.quantity}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">Pedidos en Proceso</Typography>
                            <Typography variant="h5">{ordersInProgress.length}</Typography>
                            <Button onClick={() => setShowOrdersInProgress(!showOrdersInProgress)}>
                                {showOrdersInProgress ? 'Ocultar' : 'Mostrar'} Lista
                            </Button>
                            {showOrdersInProgress && (
                                <List>
                                    {ordersInProgress.map((order) => (
                                        <ListItem key={order.id}>
                                            <ListItemText primary={`${order.customer} - ${order.product} - Estado: ${order.status}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">Pedidos Completados</Typography>
                            <Typography variant="h5">{completedOrders.length}</Typography>
                            <Button onClick={() => setShowCompletedOrders(!showCompletedOrders)}>
                                {showCompletedOrders ? 'Ocultar' : 'Mostrar'} Lista
                            </Button>
                            {showCompletedOrders && (
                                <List>
                                    {completedOrders.map((order) => (
                                        <ListItem key={order.id}>
                                            <ListItemText primary={`${order.customer} - ${order.product} - Estado: ${order.status}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">Clientes</Typography>
                            <Typography variant="h5">{customers.length}</Typography>
                            <Button onClick={() => setShowCustomers(!showCustomers)}>
                                {showCustomers ? 'Ocultar' : 'Mostrar'} Lista
                            </Button>
                            {showCustomers && (
                                <List>
                                    {customers.map((customer) => (
                                        <ListItem key={customer.id}>
                                            <ListItemText primary={`${customer.name} - Email: ${customer.email}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default AdminDashboard;
