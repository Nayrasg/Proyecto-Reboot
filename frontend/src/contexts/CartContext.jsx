import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1, price: parseFloat(product.price) }]);
    };

    const updateQuantity = (product, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.product_id === product.product_id && item.size === product.size ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.product_id !== product.product_id || item.size !== product.size));
    };

    const getTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const getTotalWithTax = () => {
        const total = getTotal();
        const tax = total * 0.21;
        return (total + tax).toFixed(2);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const checkout = () => {
        console.log("Checkout initiated");
    };

    return (
        <CartContext.Provider
            value={{ cart, drawerOpen, addToCart, updateQuantity, removeFromCart, getTotal, getTotalWithTax, toggleDrawer, checkout }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
