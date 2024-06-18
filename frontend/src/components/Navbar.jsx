import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { CartContext } from '../contexts/CartContext';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const { cart, toggleDrawer } = useContext(CartContext);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#84BFFD', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>
              Home
            </MenuItem>
            <MenuItem component={RouterLink} to="/editor" onClick={handleMenuClose}>
              Editor Productos
            </MenuItem>
            <MenuItem component={RouterLink} to="/contacto" onClick={handleMenuClose}>
              Contacto
            </MenuItem>
            <MenuItem component={RouterLink} to="/aviso-legal" onClick={handleMenuClose}>
              Aviso Legal
            </MenuItem>
            <MenuItem component={RouterLink} to="/condiciones-de-uso" onClick={handleMenuClose}>
              Condiciones de Uso
            </MenuItem>
            <MenuItem component={RouterLink} to="/politica-de-cookies" onClick={handleMenuClose}>
              Política de Cookies
            </MenuItem>
            <MenuItem component={RouterLink} to="/admin" onClick={handleMenuClose}>
              Panel Administrador
            </MenuItem>
          </Menu>
          <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ flexGrow: 1 }}>
            <Typography variant="h6">
              T-shirt Shop
            </Typography>
          </Link>
          <Button component={RouterLink} to="/login" color="inherit">Login</Button>
          <Button component={RouterLink} to="/signup" color="inherit">Signup</Button>
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
