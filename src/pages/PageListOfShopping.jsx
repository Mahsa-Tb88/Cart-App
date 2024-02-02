import React, { useEffect } from "react";
import { useCartContext } from "../context/CartContext";

export default function PageListOfShopping() {
  const { state, dispatch } = useCartContext();
  useEffect(() => {
    dispatch({ type: "showingShoppingCart", payload: false });
  }, []);
  return <div className="shoppingCartPage">PageListOfShopping</div>;
}
