import React, { createContext, useState } from 'react'

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  
    const [numberOfCartItems, setNumberOfCartItems] = useState(0);
    
  
    return <CartContext.Provider value={{numberOfCartItems, setNumberOfCartItems}}>
        { children }
    </CartContext.Provider>
}
