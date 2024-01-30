import React, { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { getAllCategories, getProducts } from "../utils/api";

const CartContext = createContext();

function CartContextProvider({ children }) {
  useEffect(() => {
    const timeOut = setTimeout(anitializationApp, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function anitializationApp() {
    dispatch({ type: "setIsLoading", payload: true });
    const result = await getAllCategories();
    if (result.success) {
      dispatch({ type: "setCategories", payload: result.body });
      dispatch({ type: "setLoadingError", payload: false });
    } else {
      dispatch({
        type: "setLoadingError",
        payload: { message: result.message, code: result.code },
      });
    }
    dispatch({ type: "setIsLoading", payload: false });
  }
  const [state, dispatch] = useReducer(cartReducer, {
    categories: [],
    isLoading: false,
    loadingError: false,
  });

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
