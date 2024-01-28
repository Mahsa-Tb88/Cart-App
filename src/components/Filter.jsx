import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { getProducts } from "../utils/api";
import { useSearchParams } from "react-router-dom";

export default function Filter({ search, setSearch, category, setCategory }) {
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
    console.log("filter", search, category);
    dispatch({ type: "setIsLoading", payload: true });
    const result = await getProducts(
      searchParams.get("page") || 1,
      6,
      search,
      category
    );

    if (result.success) {
      console.log(result);
      dispatch({
        type: "setProducts",
        payload: { products: result.body, totalProduct: result.total },
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

  function searchHandler(value) {
    setSearch(value);
    setSearchParams({
      q: value,
      category: category ? category : "",
    });
  }

  function categoryHandler(value) {
    if (value == "all") {
      value = "";
    }
    setCategory(value);
    setSearchParams({ q: search ? search : "", category: value });
  }

  return (
    <div className="d-flex justify-content-around align-items-center pt-5 filter">
      <div>
        <input
          className="search"
          placeholder="search..."
          onChange={(e) => searchHandler(e.target.value)}
          value={search}
        />
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
