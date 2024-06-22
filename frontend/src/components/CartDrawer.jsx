import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const CartDrawer = () => {
    const { cart, drawerOpen, toggleDrawer, updateQuantity, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const getTax = () => {
        return (getTotalPrice() * 0.21).toFixed(2);
    };

    const getShippingCost = () => {
        return 5.00;
    };

    const getTotalWithTaxAndShipping = () => {
        return (parseFloat(getTotalPrice()) + parseFloat(getTax()) + getShippingCost()).toFixed(2);
    };

    const handleCheckout = () => {
        toggleDrawer(false)();
        navigate('/checkout');
    };

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 400, padding: 2 }} role="presentation">
                <Typography variant="h6" sx={{ mb: 2 }}>Carrito</Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                    {cart.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="El carrito está vacío" />
                        </ListItem>
                    ) : (
                        cart.map((item, index) => (
                            <ListItem key={index} sx={{ alignItems: 'flex-start', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', width: '100%', mb: 2, alignItems: 'center' }}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={item.title}
                                            src={item.image}
                                            variant="square"
                                            sx={{ width: 56, height: 56, marginRight: 2 }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${item.title} - Talla: ${item.selectedSize}`}
                                        secondary={`Precio unitario: ${item.price} €`}
                                        sx={{ flexGrow: 1 }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton onClick={() => updateQuantity(item, item.quantity - 1)} disabled={item.quantity === 1}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ padding: '0 8px' }}>{item.quantity}</Typography>
                                        <IconButton onClick={() => updateQuantity(item, item.quantity + 1)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                    <IconButton onClick={() => removeFromCart(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        ))
                    )}
                </List>
                {cart.length > 0 && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6">
                                Subtotal: {getTotalPrice()} €
                            </Typography>
                            <Typography variant="h6">
                                IVA (21%): {getTax()} €
                            </Typography>
                            <Typography variant="h6">
                                Envío: {getShippingCost().toFixed(2)} €
                            </Typography>
                            <Typography variant="h6">
                                Total: {getTotalWithTaxAndShipping()} €
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleCheckout}>
                                Check Out
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default CartDrawer;
