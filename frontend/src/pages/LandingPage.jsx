import React, { useContext, useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../contexts/CartContext';
import banner1 from '../images/Baner1.jpg';
import banner2 from '../images/Baner2.jpg';
import banner3 from '../images/Baner3.jpg';

const LandingPage = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch('http://vps11.alpuca.com:3000/api/product-cards')
            .then(response => response.json())
            .then(data => {
                setProducts(data.product_cards);
                console.log('Fetched Products:', data.product_cards);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <>
            <Navbar />
            <CartDrawer />
            <Container sx={{ marginTop: 12, marginBottom: 12, pb: 8 }}>
                <Box sx={{ marginBottom: 4 }}>
                    <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
                        <div key="banner1">
                            <img src={banner1} alt="Banner 1" />
                        </div>
                        <div key="banner2">
                            <img src={banner2} alt="Banner 2" />
                        </div>
                        <div key="banner3">
                            <img src={banner3} alt="Banner 3" />
                        </div>
                    </Carousel>
                </Box>
                <Typography variant="h4" component="h1" gutterBottom>
                    Todos los Productos
                </Typography>
                <Grid container spacing={4}>
                {products.map((product) => {
                     console.log("Product ID:", product.product_id); // Aquí se imprime el product_id en la consola
                        return (
                            <Grid item key={product.product_id} xs={12} sm={6} md={4}>
                                <ProductCard
                                    product={product}
                                onAddToCart={addToCart}
                            />
                        </Grid>
        );
      })}
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default LandingPage;
