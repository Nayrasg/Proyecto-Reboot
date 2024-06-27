import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');

  const handleImageClick = () => {
    navigate(`/product/${product.product_id}`);
  };

  const calculatePriceWithTax = (price) => {
    return (price * 1.21).toFixed(2);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Selecciona una talla');
      return;
    }

    onAddToCart({
      product_id: product.product_id,
      name: product.title,
      price: parseFloat(product.price),  // Asegúrate de que el precio es un número
      image: product.image,
      size: selectedSize,
      stock: product[selectedSize]
    });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.title}
        onClick={handleImageClick}
        sx={{ cursor: 'pointer' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Precio: {parseFloat(product.price).toFixed(2)} €<br />
          Precio con IVA: {calculatePriceWithTax(parseFloat(product.price))} €
        </Typography>
        <FormControl sx={{ minWidth: 120, mt: 2 }}>
          <InputLabel id="size-select-label">Talla</InputLabel>
          <Select
            labelId="size-select-label"
            value={selectedSize}
            onChange={handleSizeChange}
          >
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
