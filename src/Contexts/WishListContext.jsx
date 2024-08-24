import React, { createContext, useState } from 'react'

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  
    const [numOfWishList, setNumOfWishList] = useState(0);
    
  
    return <WishListContext.Provider value={{numOfWishList, setNumOfWishList}}>
        { children }
    </WishListContext.Provider>
}
