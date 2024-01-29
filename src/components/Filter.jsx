import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { getAllCategories, getProducts } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Loading from "./Loading";
import LoadingError from "./LoadingError";

export default function Filter({
  search,
  setSearch,
  category,
  setCategory,
  setTotalProduct,
}) {
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
  }, [search, category]);

  async function fetchProducts() {
    dispatch({ type: "setIsLoading", payload: true });
    const result = await getProducts(
      searchParams.get("page") || 1,
      6,
      search,
      category
    );

    if (result.success) {
      dispatch({
        type: "setProducts",
        payload: result.body,
      });
      setTotalProduct(result.total);
      dispatch({ type: "setLoadingError", payload: false });
    } else {
      dispatch({
        type: "setLoadingError",
        payload: { message: result.message, code: result.code },
      });
    }
    dispatch({ type: "setIsLoading", payload: false });
  }

  function searchHandler(value) {
    setSearch(value);
    if (value == "") {
      category ? setSearchParams({ category: category }) : setSearchParams({});
    } else {
      !category
        ? setSearchParams({ q: value })
        : setSearchParams({
            q: value,
            category: category,
          });
    }
  }

  function categoryHandler(value) {
    console.log(value);
    if (value == "all") {
      value = "";
    }
    console.log("value...", value);
    setCategory(value);

    if (value == "") {
      search ? setSearchParams({ q: search }) : setSearchParams({});
    } else {
      !search
        ? setSearchParams({ category: value })
        : setSearchParams({ q: search, category: value });
    }
  }
  async function fetchGetCategories() {
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
  return (
    <div className="d-flex justify-content-around align-items-center pt-5 filter">
      <div className="border border-1 px-1 rounded-2">
        <input
          className="search border-0 input border-secondary"
          placeholder="search..."
          onChange={(e) => searchHandler(e.target.value)}
          value={search}
        />
        <FaTimes className="close-btn" onClick={() => searchHandler("")} />
      </div>

      <select
        className="selector"
        onChange={(e) => categoryHandler(e.target.value)}
        value={category}
      >
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
