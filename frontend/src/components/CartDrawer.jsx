import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, IconButton, Typography, Button, Box, Divider, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar } from '@mui/material';
import { CartContext } from '../contexts/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartDrawer = () => {
    const { cart, drawerOpen, updateQuantity, removeFromCart, toggleDrawer, getTotalWithTax, checkout } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        checkout();
        navigate('/checkout');
    };

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
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
        >
            <Box sx={{ width: 550, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" align="center">Carrito</Typography>
                </Box>
                <Divider />
                <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
                    {cart.length === 0 ? (
                        <Typography align="center">No hay productos en el carrito.</Typography>
                    ) : (
                        <List>
                            {cart.map((product) => (
                                <ListItem key={`${product.product_id}-${product.size}`} divider>
                                    <ListItemAvatar>
                                        <Avatar src={product.image} alt={product.name} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${product.name} - Talla: ${product.size}`}
                                        secondary={`Precio: $${parseFloat(product.price).toFixed(2)}`}
                                    />
                                    <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton onClick={() => handleRemoveQuantity(product)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ mx: 1 }}>{product.quantity}</Typography>
                                        <IconButton onClick={() => handleAddQuantity(product)}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => removeFromCart(product)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
                <Divider />
                <Box sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Total con IVA: ${getTotalWithTax()}</Typography>
                    <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ mb: 2 }}>
                        Checkout
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CartDrawer;
