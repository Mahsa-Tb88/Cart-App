import React, { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { getAllCategories, getProducts } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import LoadingError from "../components/LoadingError";

const CartContext = createContext();

function CartContextProvider({ children }) {
  useEffect(() => {
    const timeOut = setTimeout(fetchGetCategories, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function fetchGetCategories() {
    console.log(state.products);
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
    categories: [],
    isLoading: false,
    loadingError: false,
  });

  let content = "";

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {state.isLoading ? (
        <Loading />
      ) : state.loadingError ? (
        <LoadingError reload={fetchGetCategories} />
      ) : (
        children
      )}
    </CartContext.Provider>
  );
}

function useCartContext() {
  return useContext(CartContext);
}
export { useCartContext, CartContextProvider };
