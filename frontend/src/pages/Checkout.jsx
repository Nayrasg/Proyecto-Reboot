import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { CartContext } from '../contexts/CartContext';

const Checkout = () => {
    const { cart } = useContext(CartContext);
    const [postalCode, setPostalCode] = useState('');
    const [taxRate, setTaxRate] = useState(0.21); // Default tax rate for Spain
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalShipping, setTotalShipping] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        creditCardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    useEffect(() => {
        updateTotals(cart, postalCode);
    }, [cart, postalCode]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomerInfo({ ...customerInfo, [name]: value });

        if (name === 'postalCode') {
            if (value.startsWith('35') || value.startsWith('38')) {
                setTaxRate(0.07);
            } else {
                setTaxRate(0.21);
            }
            updateTotals(cart, value);
        }
    };

    const calculatePriceWithTax = (price, rate) => {
        return (price * (1 + rate)).toFixed(2);
    };

    const updateTotals = (cartItems, code) => {
        const rate = (code.startsWith('35') || code.startsWith('38')) ? 0.07 : 0.21;
        const total = cartItems.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0).toFixed(2);

        const shipping = cartItems.reduce((acc, item) => {
            return acc + (item.envio * item.quantity);
        }, 0).toFixed(2);

        const tax = (total * rate).toFixed(2);
        const grandTotal = (parseFloat(total) + parseFloat(shipping) + parseFloat(tax)).toFixed(2);

        setTotalPrice(total);
        setTotalShipping(shipping);
        setTotalTax(tax);
        setGrandTotal(grandTotal);
    };

    const handleCheckout = (event) => {
        event.preventDefault();
        // Aquí puedes añadir la lógica para procesar el pago y enviar los datos del cliente
        console.log('Datos del cliente:', customerInfo);
    };

    return (
        <>
            <Navbar />
            <CartDrawer />
            <Container sx={{ marginTop: 12, marginBottom: 12, pb: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Checkout
                </Typography>
                <List sx={{ mb: 4 }}>
                    {cart.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`${item.title} - ${item.selectedSize}`}
                                secondary={`Cantidad: ${item.quantity}, Precio unitario: ${item.price.toFixed(2)} €, Total: ${(item.price * item.quantity).toFixed(2)} €`}
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ mb: 4 }} />
                <Box component="form" onSubmit={handleCheckout} sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Datos del Cliente
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Dirección"
                                name="address"
                                value={customerInfo.address}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ciudad"
                                name="city"
                                value={customerInfo.city}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Código Postal"
                                name="postalCode"
                                value={customerInfo.postalCode}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="País"
                                name="country"
                                value={customerInfo.country}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Número de Tarjeta de Crédito"
                                name="creditCardNumber"
                                value={customerInfo.creditCardNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fecha de Expiración"
                                name="expirationDate"
                                value={customerInfo.expirationDate}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="CVV"
                                name="cvv"
                                value={customerInfo.cvv}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                    </Grid>
                  
                </Box>
                <Divider sx={{ mb: 4 }} />
                <Typography variant="h6" gutterBottom>
                    Resumen del Pedido
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Total productos" />
                        <Typography>{totalPrice} €</Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Impuestos" />
                        <Typography>{totalTax} €</Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Gastos de envío" />
                        <Typography>{totalShipping} €</Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Total" />
                        <Typography>{grandTotal} €</Typography>
                    </ListItem>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>
                        Pagar
                    </Button>
                </List>
            </Container>
            <Footer />
        </>
    );
};

export default Checkout;
