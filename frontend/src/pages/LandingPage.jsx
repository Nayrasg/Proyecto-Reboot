import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, Tabs, Tab } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

const allProducts = {
    destacados: [
        { id: 1, title: 'Producto 1', price: 19.90, image: 'url_to_image' },
        { id: 2, title: 'Producto 2', price: 19.90, image: 'url_to_image' },
        { id: 3, title: 'Producto 3', price: 19.90, image: 'url_to_image' },
        { id: 4, title: 'Producto 4', price: 19.90, image: 'url_to_image' },
        { id: 5, title: 'Producto 5', price: 19.90, image: 'url_to_image' },
        { id: 6, title: 'Producto 6', price: 19.90, image: 'url_to_image' },
    ],
    nuevas: [
        { id: 7, title: 'Producto 7', price: 19.90, image: 'url_to_image' },
        { id: 8, title: 'Producto 8', price: 19.90, image: 'url_to_image' },
        { id: 9, title: 'Producto 9', price: 19.90, image: 'url_to_image' },
        { id: 10, title: 'Producto 10', price: 19.90, image: 'url_to_image' },
        { id: 11, title: 'Producto 11', price: 19.90, image: 'url_to_image' },
        { id: 12, title: 'Producto 12', price: 19.90, image: 'url_to_image' },
    ],
    populares: [
        { id: 13, title: 'Producto 13', price: 19.90, image: 'url_to_image' },
        { id: 14, title: 'Producto 14', price: 19.90, image: 'url_to_image' },
        { id: 15, title: 'Producto 15', price: 19.90, image: 'url_to_image' },
        { id: 16, title: 'Producto 16', price: 19.90, image: 'url_to_image' },
        { id: 17, title: 'Producto 17', price: 19.90, image: 'url_to_image' },
        { id: 18, title: 'Producto 18', price: 19.90, image: 'url_to_image' },
    ],
    ofertas: [
        { id: 19, title: 'Producto 19', price: 19.90, image: 'url_to_image' },
        { id: 20, title: 'Producto 20', price: 19.90, image: 'url_to_image' },
        { id: 21, title: 'Producto 21', price: 19.90, image: 'url_to_image' },
        { id: 22, title: 'Producto 22', price: 19.90, image: 'url_to_image' },
        { id: 23, title: 'Producto 23', price: 19.90, image: 'url_to_image' },
        { id: 24, title: 'Producto 24', price: 19.90, image: 'url_to_image' },
    ],
};

const categoryNames = {
    destacados: 'Productos destacados',
    nuevas: 'Nuevas',
    populares: 'Populares',
    ofertas: 'Ofertas',
};

const LandingPage = () => {
    const [value, setValue] = useState(0);
    const [cart, setCart] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('destacados');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                setSelectedCategory('destacados');
                break;
            case 1:
                setSelectedCategory('nuevas');
                break;
            case 2:
                setSelectedCategory('populares');
                break;
            case 3:
                setSelectedCategory('ofertas');
                break;
            default:
                setSelectedCategory('destacados');
        }
    };

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        setDrawerOpen(true);
    };

    const updateQuantity = (product, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(product);
        } else {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const removeItem = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    };

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <Navbar cartItems={cart} cartItemCount={cart.length} toggleDrawer={toggleDrawer} />
            <CartDrawer
                cartItems={cart}
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
            />
            <Container sx={{ marginTop: 12, marginBottom: 12, pb: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {categoryNames[selectedCategory]}
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Destacados" />
                        <Tab label="Nuevas" />
                        <Tab label="Populares" />
                        <Tab label="Ofertas" />
                    </Tabs>
                </Box>
                <Grid container spacing={4}>
                    {allProducts[selectedCategory].map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.image}
                                    alt={product.title}
                                />
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography gutterBottom variant="h5" component="div" align="center">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        {product.price.toFixed(2)} €
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Añadir al carrito
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default LandingPage;