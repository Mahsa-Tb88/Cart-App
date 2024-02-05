import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { useCartContext } from "./context/CartContext";
import Loading from "./components/Loading";
import LoadingError from "./components/LoadingError";
import { getAllCategories } from "./utils/api";
import ShoppingCart from "./components/ShoppingCart";
export default function App() {
  const { state, dispatch } = useCartContext();

  async function anitializationApp() {
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

  function closeHandler(value) {
    if (value) {
      dispatch({ type: "showingShoppingCart", payload: false });
    }
  }

  return (
    <div className="app">
      {state.isLoading ? (
        <Loading />
      ) : state.loadingError ? (
        <LoadingError reload={anitializationApp} error={state.loadingError} />
      ) : (
        <div>
          <div
            className={state.isShowShoppingCart ? "overlay" : ""}
            onClick={(e) => closeHandler(e.target)}
          ></div>
          <div>
            <div>
              <ShoppingCart />
            </div>
            <header className="header">
              <div className="d-flex justify-content-between align-items-center  container">
                <div className="d-flex justify-content-center align-items-center py-3 navbar">
                  <NavLink
                    to="/"
                    className="list-unstyled p-2 mx-4 text-decoration-none header-link"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/shop"
                    className="list-unstyled p-2 mx-4 text-decoration-none header-link"
                  >
                    Shop
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="list-unstyled p-2 mx-4 text-decoration-none header-link"
                  >
                    About
                  </NavLink>
                </div>
                <button
                  className="position-relative icon-cart"
                  onClick={() =>
                    dispatch({ type: "showingShoppingCart", payload: true })
                  }
                >
                  <IoCartSharp className="fs-3" />
                  <span className="item">{state.shoppingProducts.length}</span>
                </button>
              </div>
            </header>
            <div className=" text-center">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
