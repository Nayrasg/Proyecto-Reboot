import React, { createContext, useState, useEffect } from 'react';
import allProducts from '../data/products';

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

    const getAvailableStock = (productId, size) => {
        const productCategory = Object.keys(allProducts).find(category =>
            allProducts[category].some(product => product.id === productId)
        );
        const product = allProducts[productCategory].find(product => product.id === productId);
        return product ? product.stock[size] : 0;
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.id === product.id && item.selectedSize === product.selectedSize
            );
            const availableStock = getAvailableStock(product.id, product.selectedSize);
            if (existingProduct) {
                if (existingProduct.quantity < availableStock) {
                    return prevCart.map((item) =>
                        item.id === product.id && item.selectedSize === product.selectedSize
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    alert(`No quedan más unidades de la talla ${product.selectedSize} en stock`);
                    return prevCart;
                }
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
            const availableStock = getAvailableStock(product.id, product.selectedSize);
            if (newQuantity <= availableStock) {
                setCart((prevCart) =>
                    prevCart.map((item) =>
                        item.id === product.id && item.selectedSize === product.selectedSize
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            } else {
                alert(`No quedan más unidades de la talla ${product.selectedSize} en stock`);
            }
        }
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== product.id || item.selectedSize !== product.selectedSize));
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
