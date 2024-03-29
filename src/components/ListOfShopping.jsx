import React from "react";
import { useCartContext } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
export default function ListOfShopping() {
  const { state, dispatch } = useCartContext();
  const navigate = useNavigate();
  function btnHandler(linkId) {
    dispatch({ type: "showingShoppingCart", payload: false });
    navigate("/product/" + `${linkId}`);
  }

  function removeItem(id) {
    const filteredShoppingCart = state.shoppingProducts.filter(
      (c) => c.product.id != id
    );
    dispatch({ type: "updateShoppingProducts", payload: filteredShoppingCart });
    localStorage.shopping = JSON.stringify(filteredShoppingCart);
  }

  function decNumOfItem(id) {
    const filteredShoppingCart = state.shoppingProducts.find(
      (c) => c.product.id == id
    );
    if (filteredShoppingCart.numOfItem < 2) {
      const filteredShoppingCart = state.shoppingProducts.filter(
        (c) => c.product.id != id
      );
      localStorage.shopping = JSON.stringify(filteredShoppingCart);
      dispatch({
        type: "updateShoppingProducts",
        payload: filteredShoppingCart,
      });
    } else {
      const findIndex = state.shoppingProducts.findIndex(
        (c) => c.product.id == id
      );
      const newfilterShoppingCart = { ...state.shoppingProducts[findIndex] };
      newfilterShoppingCart.numOfItem--;
      const newShoppingCart = [...state.shoppingProducts];
      newShoppingCart[findIndex] = newfilterShoppingCart;
      localStorage.shopping = JSON.stringify(newShoppingCart);
      dispatch({
        type: "updateShoppingProducts",
        payload: newShoppingCart,
      });
    }
  }

  function incNumOfItem(id) {
    const findIndex = state.shoppingProducts.findIndex(
      (c) => c.product.id == id
    );
    const newfilterShoppingCart = { ...state.shoppingProducts[findIndex] };
    newfilterShoppingCart.numOfItem++;
    const newShoppingCart = [...state.shoppingProducts];
    newShoppingCart[findIndex] = newfilterShoppingCart;
    localStorage.shopping = JSON.stringify(newShoppingCart);
    dispatch({
      type: "updateShoppingProducts",
      payload: newShoppingCart,
    });
  }
  if (!state.shoppingProducts.length) {
    return <p className="text-center fs-4">Your card is empty</p>;
  }
  return (
    <div className="listOfShopping">
      {state.shoppingProducts.map((p, index) => {
        return (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center mb-2 pb-3 border-bottom border-1"
          >
            <div className="operation-list">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>{p.numOfItem}</span>
                <div
                  className="btn-trash d-flex justify-content-center align-items-center"
                  onClick={() => removeItem(p.product.id)}
                >
                  <FaRegTrashAlt />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span
                  className="btn-minus"
                  onClick={() => decNumOfItem(p.product.id)}
                >
                  <FaMinus />
                </span>
                <span
                  className="btn-plus"
                  onClick={() => incNumOfItem(p.product.id)}
                >
                  <FaPlus />
                </span>
              </div>
            </div>
            <button
              onClick={() => btnHandler(p.product.id)}
              className="d-flex justify-content-between align-items-center info"
            >
              <div className="title-list">{p.product.title}</div>
              <div>
                <img src={p.product.image} className="img" />
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
