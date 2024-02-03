import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
function Cart({ product }) {
  const { state, dispatch } = useCartContext();

  function addToCartHandler(product) {
    const selectedItem = state.shoppingProducts.find(
      (c) => c.product.id == product.id
    );
    if (!selectedItem) {
      dispatch({
        type: "addToCart",
        payload: {
          product,
          numOfItem: 1,
          status: false,
        },
      });

      localStorage.shopping = JSON.stringify([
        ...state.shoppingProducts,
        { product, numOfItem: 1, status: false },
      ]);
    }
  }

  return (
    <div className="card my-4 ">
      <img
        className="card-img-top card-img pb-3"
        src={product.image}
        alt="Card image cap"
      />
      <Link
        to={"/product/" + `${product.id}`}
        className="card-body border-top link"
      >
        <h5 className="card-title ">{product.title}</h5>
      </Link>

      <p className="cart-text  p-2  d-flex justify-content-between">
        <span>Price:</span> <span>${product.price}</span>
      </p>

      {state.shoppingProducts.find((c) => c.product.id == product.id) ? (
        <AddtoCart productId={product.id} />
      ) : (
        <button
          className="btnAddToCart"
          onClick={() => addToCartHandler(product)}
        >
          <span>Add to Cart</span>
        </button>
      )}
    </div>
  );
}

export default Cart;

function AddtoCart({ productId }) {
  const { state, dispatch } = useCartContext();
  const selectedCart = state.shoppingProducts.find(
    (c) => c.product.id == productId
  );

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
    <div className="px-2 d-flex justify-content-between align-items-center btn-add">
      <div
        className="btn-trash d-flex justify-content-center align-items-center"
        onClick={() => removeItem(productId)}
      >
        <FaRegTrashAlt />
      </div>
      <div className="d-flex justify-content-around align-items-center">
        <span className="btn-minus" onClick={() => decNumOfItem(productId)}>
          <FaMinus />
        </span>
        <span className="text-black mx-3">{selectedCart.numOfItem}</span>
        <span className="btn-plus" onClick={() => incNumOfItem(productId)}>
          <FaPlus />
        </span>
      </div>
    </div>
  );
}
