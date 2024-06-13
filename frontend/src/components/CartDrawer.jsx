import React from 'react';
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

const CartDrawer = ({ cartItems, drawerOpen, toggleDrawer, updateQuantity, removeItem }) => {
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 400, padding: 2 }} role="presentation">
                <Typography variant="h6" sx={{ mb: 2 }}>Carrito</Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                    {cartItems.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="El carrito está vacío" />
                        </ListItem>
                    ) : (
                        cartItems.map((item, index) => (
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
                                        primary={item.title}
                                        secondary={`Precio unitario: ${(item.price * item.quantity).toFixed(2)} €`}
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
                                    <IconButton onClick={() => removeItem(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        ))
                    )}
                </List>
                {cartItems.length > 0 && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6">
                                Total: {getTotalPrice()} €
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
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