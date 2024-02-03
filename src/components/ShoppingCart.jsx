import React, { useEffect } from "react";
import PageListOfShopping from "../pages/PageListOfShopping";
import ListOfShopping from "./ListOfShopping";
import { IoCloseCircle } from "react-icons/io5";
import { useCartContext } from "../context/CartContext";
import { Link, useParams } from "react-router-dom";
export default function ShoppingCart() {
  const { state, dispatch } = useCartContext();
  const params = useParams();
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
        <div className="title d-flex justify-content-between align-items-center  p-2 rounded-2  mb-3">
          <Link
            to="cart"
            className="linkShoppingPage"
            onClick={() =>
              dispatch({ type: "showingShoppingCart", payload: false })
            }
          >
            Show Shopping Cart
          </Link>
          <p className=" m-0">${state.totalPrice}</p>
        </div>

        <ListOfShopping />
      </div>
    </div>
  );
}
