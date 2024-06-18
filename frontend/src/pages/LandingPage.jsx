import React, { useContext, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, Tabs, Tab, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { CartContext } from '../contexts/CartContext';
import banner1 from '../images/Baner1.jpg';
import banner2 from '../images/Baner2.jpg';
import banner3 from '../images/Baner3.jpg';
import allProducts from '../data/products';

const categoryNames = {
    destacados: 'Productos destacados',
    nuevas: 'Nuevas',
    populares: 'Populares',
    ofertas: 'Ofertas',
};

const LandingPage = () => {
    const [value, setValue] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('destacados');
    const [selectedSizes, setSelectedSizes] = useState({});
    const [sizeError, setSizeError] = useState({});
    const [stockError, setStockError] = useState({});
    const { cart, addToCart } = useContext(CartContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const categories = ['destacados', 'nuevas', 'populares', 'ofertas'];
        setSelectedCategory(categories[newValue] || 'destacados');
    };

    const handleSizeChange = (productId, size) => {
        setSelectedSizes({ ...selectedSizes, [productId]: size });
        setSizeError({ ...sizeError, [productId]: false });
        setStockError({ ...stockError, [productId]: false });
    };

    const getAvailableStock = (productId, size) => {
        const product = allProducts[selectedCategory].find((product) => product.id === productId);
        if (product) {
            return product.stock[size];
        }
        return 0;
    };

    const getSelectedQuantity = (productId, size) => {
        const cartItem = cart.find((item) => item.id === productId && item.selectedSize === size);
        if (cartItem) {
            return cartItem.quantity;
        }
        return 0;
    };

    const handleAddToCart = (product) => {
        const selectedSize = selectedSizes[product.id];
        if (!selectedSize) {
            setSizeError({ ...sizeError, [product.id]: true });
            return;
        }

        const availableStock = getAvailableStock(product.id, selectedSize);
        const selectedQuantity = getSelectedQuantity(product.id, selectedSize);

        if (selectedQuantity >= availableStock) {
            setStockError({ ...stockError, [product.id]: true });
            return;
        }

        addToCart({ ...product, selectedSize });
    };

    const calculatePriceWithTax = (price) => {
        return (price * 1.21).toFixed(2);
    };

    return (
        <>
            <Navbar />
            <CartDrawer />
            <Container sx={{ marginTop: 12, marginBottom: 12, pb: 8 }}>
                <Box sx={{ marginBottom: 4 }}>
                    <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
                        <div>
                            <img src={banner1} alt="Banner 1" />
                        </div>
                        <div>
                            <img src={banner2} alt="Banner 2" />
                        </div>
                        <div>
                            <img src={banner3} alt="Banner 3" />
                        </div>
                    </Carousel>
                </Box>
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
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={product.image}
                                        alt={product.title}
                                    />
                                </Link>
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography gutterBottom variant="h5" component="div" align="center">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Precio: {product.price.toFixed(2)} €<br />
                                        Precio con IVA: {calculatePriceWithTax(product.price)} €
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 3 }}>
                                    <FormControl sx={{ minWidth: 120, mr: 2 }}>
                                        <InputLabel id={`size-select-label-${product.id}`}>Talla</InputLabel>
                                        <Select
                                            labelId={`size-select-label-${product.id}`}
                                            value={selectedSizes[product.id] || ''}
                                            onChange={(e) => handleSizeChange(product.id, e.target.value)}
                                            error={sizeError[product.id]}
                                        >
                                            <MenuItem value="S">S</MenuItem>
                                            <MenuItem value="M">M</MenuItem>
                                            <MenuItem value="L">L</MenuItem>
                                            <MenuItem value="XL">XL</MenuItem>
                                        </Select>
                                        {sizeError[product.id] && (
                                            <Typography variant="body2" color="error">Selecciona una talla</Typography>
                                        )}
                                        {stockError[product.id] && (
                                            <Typography variant="body2" color="error">No quedan más unidades de esta talla en stock</Typography>
                                        )}
                                    </FormControl>
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
