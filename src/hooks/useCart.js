import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db';

export function useCart() {
    //#region Global Constants
    const MAX_QUANTITY = 5;
    const MIN_QUANTITY = 1;
    //#endregion

    //#region States
    const [guitars] = useState(db);
    const [cart, setCart] = useState(getFromLocalStorage("cart"));
    //#endregion

    //#region Hooks
    useEffect(() => {
        saveLocalStorage("cart");
    }, [cart]);
    //#endregion

    //#region Functions
    function addToCart(guitar) {
        //inmutabilidad en react
        const guitarExists = cart.findIndex((g) => g.id == guitar.id);

        if(guitarExists == -1) {
        guitar.quantity = 1;
        setCart([...cart, guitar]);
        } else {
        const updatedCart = [...cart];
        updatedCart[guitarExists].quantity++;
        setCart(updatedCart);
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(guitar => {
        if(guitar.id === id && guitar.quantity !== MAX_QUANTITY) {
            return {
            ...guitar,
            quantity: guitar.quantity + 1
            };
        }
        return guitar;
        });

        setCart(updatedCart);
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(guitar => {
        if(guitar.id === id && guitar.quantity > MIN_QUANTITY) {
            return {
            ...guitar,
            quantity: guitar.quantity - 1
            };
        }

        return guitar;
        });

        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    function saveLocalStorage(key) {
        //El state de React es asincrono
        localStorage.setItem(key, JSON.stringify(cart));
    }

    function getFromLocalStorage(key) {
        const value = localStorage.getItem(key);

        return value != null ? JSON.parse(value) : [];
    }
    //#endregion

    //Derivated State
    const isEmpty = useMemo(() => cart.length === 0);
    const totalPrice = useMemo(() => cart.reduce((total, guitar) => total + (guitar.quantity * guitar.price), 0));

    return {
        guitars,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        totalPrice
    };
}