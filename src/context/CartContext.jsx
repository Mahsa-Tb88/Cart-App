import React, { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { getAllCategories } from "../utils/api";

const CartContext = createContext();

function CartContextProvider({ children }) {
  console.log("cart context...");
  useEffect(() => {
    const timeOut = setTimeout(fetchCategories, 20);
    return () => clearTimeout(timeOut);
  }, []);
  async function fetchCategories() {
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
    getAllProducts: [],
    categories: [],
    isLoading: false,
    loadingError: false,
  });
  console.log(state.categories);

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
