import { createContext, useContext } from 'react';

export const CartContext = createContext();

export function CartProvider({children}) {
    return (
        <CartContext.Provider>
            {children}
        </CartContext.Provider>
    );
}

