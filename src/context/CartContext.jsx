import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart]  = useState([]);

    const addItem = (item, quantity) => {
        if (!isInCart(item.id))        
            setCart([...cart, {...item, quantity:quantity}])   
        else {
            let pos = cart.findIndex(prod => prod.id === item.id);
            cart[pos].quantity += quantity;
            setCart([...cart]);        
        }        
    }

    const removeItem = (itemId) => {
        const items = cart.filter(prod => prod.id !== itemId)
        setCart([...items]);
    }

    const clear = () => {
        setCart([])
    }

    const isInCart = (itemId) => {          
        return cart.some(prod => prod.id === itemId)     
    }

    const totalItems = () => {           
        return cart.reduce((acum, item) => acum += item.quantity, 0);          
    }

    const totalMonto = () => {                  
        return cart.reduce((acum, item) => acum += item.quantity * item.precio, 0);        
    }

    return (
        <CartContext.Provider value={{cart, addItem, removeItem, clear, totalItems, totalMonto}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;

