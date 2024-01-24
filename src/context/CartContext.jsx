import React, { useContext, useReducer } from "react";
import { cartReducer } from "./cartReducer";

const CartContext = useContext();

function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {});
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCartContext() {
  return useContext(CartContext);
}
export { useCartContext, CartContextProvider };
