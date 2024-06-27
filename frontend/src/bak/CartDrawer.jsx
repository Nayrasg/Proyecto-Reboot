import React, { useContext } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import { CartContext } from '../contexts/CartContext';
import CloseIcon from '@mui/icons-material/Close';

const CartDrawer = () => {
    const { cart, drawerOpen, toggleDrawer, removeFromCart } = useContext(CartContext);

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 300, p: 2 }}>
                <IconButton onClick={toggleDrawer(false)} sx={{ mb: 2 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                    Carrito de Compras
                </Typography>
                <List>
                    {cart.map((item, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                primary={item.title}
                                secondary={`Cantidad: ${item.quantity} - Precio: ${(item.price * item.quantity).toFixed(2)} €`}
                            />
                            <IconButton onClick={() => removeFromCart(item)}>
                                <CloseIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default CartDrawer;
