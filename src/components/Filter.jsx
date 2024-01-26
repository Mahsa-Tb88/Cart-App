import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { getProducts } from "../utils/api";
import { useSearchParams } from "react-router-dom";

export default function Filter() {
  const { state, dispatch } = useCartContext();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const timeOut = setTimeout(fetchProducts, 1000);
    return () => clearTimeout(timeOut);
  }, [state.search]);

  async function fetchProducts() {
    dispatch({ type: "setIsLoading", payload: true });
    const result = await getProducts(1, 12, state.search, state.category);
    if (result.success) {
      dispatch({
        type: "setProducts",
        payload: { products: result.body, totalProduct: result.total },
      });
      setSearchParams({ page: 1 });
      dispatch({ type: "setLoadingError", payload: false });
    } else {
      dispatch({
        type: "setLoadingError",
        payload: { message: result.message, code: result.code },
      });
    }
    dispatch({ type: "setIsLoading", payload: false });
  }

  return (
    <div className="d-flex justify-content-around align-items-center pt-5 filter">
      <div>
        <input
          className="search"
          placeholder="search..."
          onChange={(e) =>
            dispatch({ type: "search", payload: e.target.value })
          }
        />
      </div>
      <select className="selector">
        <option value="all">All</option>
        {state.categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
