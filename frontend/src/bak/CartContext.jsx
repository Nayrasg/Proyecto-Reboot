import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            console.log('Prev Cart:', prevCart);
            console.log('Adding Product:', JSON.stringify(product, null, 2));

            const existingProduct = prevCart.find((item) => item.product_id === product.product_id);
            console.log('Existing Product:', existingProduct ? JSON.stringify(existingProduct, null, 2) : 'undefined');

            if (existingProduct) {
                return prevCart.map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        setDrawerOpen(true);
    };

    const updateQuantity = (product, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(product);
        } else {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.product_id !== product.product_id));
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <CartContext.Provider value={{
            cart,
            drawerOpen,
            addToCart,
            updateQuantity,
            removeFromCart,
            toggleDrawer
        }}>
            {children}
        </CartContext.Provider>
    );
};