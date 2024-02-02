import React from "react";
import PageListOfShopping from "../pages/PageListOfShopping";
import ListOfShopping from "./ListOfShopping";
import { IoCloseCircle } from "react-icons/io5";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function ShoppingCart() {
  const { state, dispatch } = useCartContext();
  return (
    <div className="tableShop">
      <div className="d-flex justify-content-between align-items-center p-2 header-cart">
        <h2>Shopping Cart</h2>
        <IoCloseCircle
          className="fs-5 pointer"
          onClick={() =>
            dispatch({ type: "showingShoppingCart", payload: false })
          }
        />
      </div>
      <div className="p-3">
      <Link to="cart" className="linkShoppingPage ">Show Shopping Page</Link>

      <ListOfShopping />
      </div>

    
    </div>
  );
}
