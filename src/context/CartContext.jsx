import React, { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { getAllCategories, getProducts } from "../utils/api";
import { useSearchParams } from "react-router-dom";

const CartContext = createContext();

function CartContextProvider({ children }) {
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
    products: [],
    totalProduct: {
      filtered: 12,
      all: 35,
    },
    currentPage: 1,
    categories: [],
    isLoading: false,
    loadingError: false,
    search: "",
    category: "",
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
