import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
    const [totalInventory, setTotalInventory] = useState([]);
    const [externalVendorsInventory, setExternalVendorsInventory] = useState([]);
    const [ordersInProgress, setOrdersInProgress] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showTotalInventory, setShowTotalInventory] = useState(false);
    const [showExternalVendorsInventory, setShowExternalVendorsInventory] = useState(false);
    const [showOrdersInProgress, setShowOrdersInProgress] = useState(false);
    const [showCompletedOrders, setShowCompletedOrders] = useState(false);
    const [showCustomers, setShowCustomers] = useState(false);

    useEffect(() => {
        // Fetch data from backend
        fetch('http://vps11.alpuca.com:3000/api/product-cards')
            .then(response => response.json())
            .then(data => setTotalInventory(data.product_cards))
            .catch(error => console.error('Error fetching total inventory:', error));

        // Fetch external vendors inventory (adjust endpoint as needed)
        fetch('http://vps11.alpuca.com:3000/api/external-vendors')
            .then(response => response.json())
            .then(data => setExternalVendorsInventory(data.external_vendors))
            .catch(error => console.error('Error fetching external vendors inventory:', error));

        // Fetch orders in progress (adjust endpoint as needed)
        fetch('http://vps11.alpuca.com:3000/api/orders?status=in-progress')
            .then(response => response.json())
            .then(data => setOrdersInProgress(data.orders))
            .catch(error => console.error('Error fetching orders in progress:', error));

        // Fetch completed orders (adjust endpoint as needed)
        fetch('http://vps11.alpuca.com:3000/api/orders?status=completed')
            .then(response => response.json())
            .then(data => setCompletedOrders(data.orders))
            .catch(error => console.error('Error fetching completed orders:', error));

        // Fetch customers (adjust endpoint as needed)
        fetch('http://vps11.alpuca.com:3000/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.customers))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

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
                                            <ListItemText primary={`${item.title} - Cantidad: S: ${item.S}, M: ${item.M}, L: ${item.L}, XL: ${item.XL}`} />
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