import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { getProducts } from "../utils/api";
import { useSearchParams } from "react-router-dom";

export default function Filter() {
  const { state, dispatch } = useCartContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [firstLoading, setFirstLoading] = useState(true);
  useEffect(() => {
    if (firstLoading) {
      setFirstLoading(false);
      return;
    }
    const timeOut = setTimeout(fetchProducts, 1000);
    return () => clearTimeout(timeOut);
  }, [state.search]);

  useEffect(() => {
    dispatch({ type: "search", payload: searchParams.get("q") });
  }, []);

  function searchhandler(value) {
    dispatch({ type: "search", payload: value });
    setSearchParams({ q: value });
  }
  async function fetchProducts() {
    console.log("filter");

    dispatch({ type: "setIsLoading", payload: true });
    const result = await getProducts(
      searchParams.get("page") || 1,
      6,
      state.search,
      state.category
    );

    if (result.success) {
      dispatch({
        type: "setProducts",
        payload: { products: result.body, totalProduct: result.total },
      });
      dispatch({
        type: "setCurrentPage",
        payload: searchParams.get("page") || 1,
      });
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
          onChange={(e) => searchhandler(e.target.value)}
          value={state.search || ""}
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
