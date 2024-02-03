import React, { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function PageListOfShopping() {
  const { state, dispatch } = useCartContext();
  useEffect(() => {
    dispatch({ type: "showingShoppingCart", payload: false });
  }, []);
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

  return (
    <div className="shoppingCartPage container">
      <h1 className="mb-5">Shopping Card</h1>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr className="table-row">
            <th scope="col">Row</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Number Of Item</th>
            <th scope="col">Price</th>
            <th scope="col">Total Price</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.shoppingProducts.map((p, i) => {
            return (
              <tr key={p.product.id} className="table-row">
                <th scope="row">{i + 1}</th>
                <td>
                  <img className="shoping-cart-img" src={p.product.image} />{" "}
                </td>
                <td>
                  <Link className="link" to={"/product/" + `${p.product.id}`}>
                    {p.product.title}
                  </Link>
                </td>
                <td>
                  <div className="d-flex justify-content-around align-items-center">
                    <span
                      className="btn-minus"
                      onClick={() => decNumOfItem(p.product.id)}
                    >
                      <FaMinus />
                    </span>
                    <span className="text-black mx-3">{p.numOfItem}</span>
                    <span
                      className="btn-plus"
                      onClick={() => incNumOfItem(p.product.id)}
                    >
                      <FaPlus />
                    </span>
                  </div>
                </td>
                <td>${p.product.price}</td>
                <td>${p.product.price * p.numOfItem}</td>
                <td>
                  <div
                    className="btn-trash d-flex justify-content-center align-items-center"
                    onClick={() => removeItem(p.product.id)}
                  >
                    <FaRegTrashAlt />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className=" fw-bold fs-5">
              Total Price
            </td>
            <td className=" fw-bold fs-5">${state.totalPrice}</td>
            <td colSpan="4"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
