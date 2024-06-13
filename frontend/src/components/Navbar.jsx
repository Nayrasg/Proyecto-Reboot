
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = ({ cartItems, cartItemCount, toggleDrawer }) => {
    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: '#84BFFD', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        T-shirt Shop
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Signup</Button>
                    <IconButton color="inherit" sx={{ ml: 2 }} onClick={toggleDrawer(true)}>
                        <ShoppingCartIcon />
                        {cartItemCount > 0 && (
                            <Typography variant="body2" color="inherit" sx={{ ml: 1 }}>
                                {cartItemCount}
                            </Typography>
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;