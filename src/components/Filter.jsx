import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../utils/api";

export default function Filter({
  search,
  setSearch,
  category,
  setCategory,
  fetchProducts,
}) {
  const { state, dispatch } = useCartContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [delay, setDelay] = useState(20);
  const [firstLoading, setFirstLoading] = useState(true);
  useEffect(() => {
    if (firstLoading) {
      setFirstLoading(false);
      return;
    }
    console.log("useEffect filter");
    const timeOut = setTimeout(fetchProducts, delay);
    return () => clearTimeout(timeOut);
  }, [search, category]);

  function selectHandler(value) {
    if (value == "all") {
      value = "";
    }
    setCategory(value);
    if (!value && !searchParams.get("q")) {
      setSearchParams({});
    } else if ((value, searchParams.get("q"))) {
      setSearchParams({ q: search, category: value });
    } else if (value && !searchParams.get("q")) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({ q: search });
    }
  }
  function searchHandler(value) {
    setSearch(value);
  }
  return (
    <div className="d-flex justify-content-around align-items-center pt-5 filter">
      <div className="border border-1 px-1 rounded-2">
        <input
          className="search border-0 input border-secondary"
          placeholder="search..."
          onChange={(e) => searchHandler(e.target.value)}
        />
        <FaTimes className="close-btn" />
      </div>

      <select
        className="selector"
        onChange={(e) => selectHandler(e.target.value)}
        value={searchParams.get("category") || "all"}
      >
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
