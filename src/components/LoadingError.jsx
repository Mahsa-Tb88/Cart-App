import React from "react";
import { useCartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";

export default function LoadingError({ reload }) {
  console.log("loadin error comp.....");
  const { state, dispatch } = useCartContext();
  return (
    <div className="w-50 mx-auto loadinError ">
      <h3 className="error p-4 my-5 text-light rounded-2 bg-danger">
        {state.loadingError.message}
      </h3>
      <button className="btn text-light bg-info" onClick={reload}>
        Try again
      </button>
    </div>
  );
}
