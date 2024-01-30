import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";

export default function Filter({}) {
  const { state, dispatch } = useCartContext();
  return (
    <div className="d-flex justify-content-around align-items-center pt-5 filter">
      <div className="border border-1 px-1 rounded-2">
        <input
          className="search border-0 input border-secondary"
          placeholder="search..."
        />
        <FaTimes className="close-btn" />
      </div>

      <select className="selector">
        <option value="all">All</option>
        {state.categories.map((c) => {
          return (
            <option key={c} value={c}>
              {c}
            </option>
          );
        })}
      </select>
    </div>
  );
}
