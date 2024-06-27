import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Box, Typography, Button, Avatar, List, ListItem, ListItemText, ListItemAvatar, IconButton, ListItemSecondaryAction } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Checkout = () => {
    const { cart, getTotalWithTax, updateQuantity, removeFromCart } = useContext(CartContext);

    const handleAddQuantity = (product) => {
        const currentQuantity = cart.find(item => item.product_id === product.product_id && item.size === product.size).quantity;
        if (currentQuantity < product.stock) {
            updateQuantity(product, currentQuantity + 1);
        }
    };

    const handleRemoveQuantity = (product) => {
        const currentQuantity = cart.find(item => item.product_id === product.product_id && item.size === product.size).quantity;
        if (currentQuantity > 1) {
            updateQuantity(product, currentQuantity - 1);
        }
    };

    return (
        <>
            <Navbar />
            <CartDrawer /> {/* Añade CartDrawer aquí */}
            <Box sx={{ padding: 20, mt: 8 }}>
                <Typography variant="h4" gutterBottom>Checkout</Typography>
                {cart.length === 0 ? (
                    <Typography>No hay productos en el carrito.</Typography>
                ) : (
                    <List>
                        {cart.map((item, index) => (
                            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                <ListItemAvatar>
                                    <Avatar src={item.image} alt={item.name} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${item.name} - Talla: ${item.size}`}
                                    secondary={`${item.quantity} x $${parseFloat(item.price).toFixed(2)}`}
                                />
                                <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => handleRemoveQuantity(item)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                                    <IconButton onClick={() => handleAddQuantity(item)}>
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton onClick={() => removeFromCart(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )}
                <Typography variant="h6" sx={{ mt: 4 }}>Total con IVA: ${getTotalWithTax()}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>Pagar</Button>
            </Box>
            <Footer />
        </>
    );
};

export default Checkout;
