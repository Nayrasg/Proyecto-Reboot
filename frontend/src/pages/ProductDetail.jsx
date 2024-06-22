import React, { useContext, useState } from 'react';
import { Container, Grid, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { CartContext } from '../contexts/CartContext';
import allProducts from '../data/products';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState('');
    const [sizeError, setSizeError] = useState(false);
    const [stockError, setStockError] = useState(false);

    const productCategory = Object.keys(allProducts).find(category =>
        allProducts[category].some(product => product.id === parseInt(id))
    );

    if (!productCategory) {
        return <Typography variant="h6">Producto no encontrado</Typography>;
    }

    const product = allProducts[productCategory].find(product => product.id === parseInt(id));

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
        setSizeError(false);
        setStockError(false);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true);
            return;
        }

        const availableStock = product.stock[selectedSize];
        const selectedQuantity = cart.filter(item => item.id === product.id && item.selectedSize === selectedSize)
                                     .reduce((acc, item) => acc + item.quantity, 0);

        if (selectedQuantity >= availableStock) {
            setStockError(true);
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
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box component="img" src={product.image} alt={product.title} sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {product.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {product.description}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Precio: {product.price.toFixed(2)} €
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Precio con IVA: {calculatePriceWithTax(product.price)} €
                        </Typography>
                        <FormControl sx={{ minWidth: 120, mr: 2, mb: 2 }}>
                            <InputLabel id="size-select-label">Talla</InputLabel>
                            <Select
                                labelId="size-select-label"
                                value={selectedSize}
                                onChange={handleSizeChange}
                                error={sizeError}
                            >
                                <MenuItem value="S">S</MenuItem>
                                <MenuItem value="M">M</MenuItem>
                                <MenuItem value="L">L</MenuItem>
                                <MenuItem value="XL">XL</MenuItem>
                            </Select>
                            {sizeError && (
                                <Typography variant="body2" color="error">Selecciona una talla</Typography>
                            )}
                            {stockError && (
                                <Typography variant="body2" color="error">No quedan más unidades de esta talla en stock</Typography>
                            )}
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                        >
                            Añadir al carrito
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default ProductDetail;
