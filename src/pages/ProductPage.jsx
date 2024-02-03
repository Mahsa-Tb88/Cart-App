import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
export default function ProductPage() {
  const { state, dispatch } = useCartContext();
  const [lodadingProduct, setLoadingProduct] = useState(false);
  const params = useParams();
  const id = params.id;
  console.log(state.shoppingProducts);
  const initialProduct = state.shoppingProducts.find((p) => p.product.id == id);
  console.log(initialProduct);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.products);
    const filterProduct = products.find((p) => p.id == id);
    console.log(filterProduct);
    setSelectedProduct(filterProduct);
    setLoadingProduct(true);
  }, [id]);
  console.log("selectedProduct....", selectedProduct);
  function addToCartHandler(id) {
    const selectedItem = state.shoppingProducts.find((c) => c.product.id == id);
    if (!selectedItem) {
      dispatch({
        type: "addToCart",
        payload: {
          product: selectedProduct,
          numOfItem: 1,
          status: false,
        },
      });

      localStorage.shopping = JSON.stringify([
        ...state.shoppingProducts,
        { product: selectedProduct, numOfItem: 1, status: false },
      ]);
    }
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
    console.log(newShoppingCart);
    dispatch({
      type: "updateShoppingProducts",
      payload: newShoppingCart,
    });
  }
  return (
    <div className=" ">
      <p>oo</p>
      {lodadingProduct ? (
        <div className="product-page container ">
          <h1 className="fs-3 ">{selectedProduct.title}</h1>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img className="product-page-img" src={selectedProduct.image} />
            </div>
            <div className="product-page-info">
              <p className="fs-3 mb-5 fw-bold">${selectedProduct.price}</p>
              {initialProduct ? (
                <div className="d-flex justify-content-around align-items-center ">
                  <div
                    className="btn-trash d-flex justify-content-center align-items-center"
                    onClick={() => removeItem(id)}
                  >
                    <FaRegTrashAlt />
                  </div>

                  <div className="d-flex justify-content-around align-items-center">
                    <span
                      className="btn-minus"
                      onClick={() => decNumOfItem(id)}
                    >
                      <FaMinus />
                    </span>
                    <span className="text-black fs-3 mx-4">
                      {initialProduct.numOfItem}
                    </span>
                    <span className="btn-plus" onClick={() => incNumOfItem(id)}>
                      <FaPlus />
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  className="btnAddToCart"
                  onClick={() => addToCartHandler(id)}
                >
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
          <div>
            <h3 className="pb-3 border-bottom border-2">Description</h3>
            <div>{selectedProduct.description}</div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="p-5 bg-dark mt-5 text-white">footer</div>
    </div>
  );
}
