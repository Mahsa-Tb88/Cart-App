import React, { useEffect } from "react";
import Filter from "../components/Filter";
import { useCartContext } from "../context/CartContext";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import LoadingError from "../components/LoadingError";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../utils/api";

export default function Shop() {
  const { state, dispatch } = useCartContext();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const timeOut = setTimeout(fetchProducts, 20);
    return () => clearTimeout(timeOut);
  }, [searchParams.get("page")]);

  async function fetchProducts() {
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
    <div className="container">
      <Filter />
      {state.isLoading ? (
        <Loading />
      ) : state.LoadingError ? (
        <LoadingError />
      ) : (
        <div className="row">
          {state.products.map((product) => (
            <div className="col-3" key={product.id}>
              <Cart key={product.id} product={product} />
            </div>
          ))}
        </div>
      )}
      <Pagination />
    </div>
  );
}

function Cart({ product }) {
  return (
    <div className="card my-4 ">
      <img
        className="card-img-top card-img pb-3"
        src={product.image}
        alt="Card image cap"
      />
      <div className="card-body border-top">
        <h5 className="card-title ">{product.title}</h5>
        <p className="cart-text  p-2  d-flex justify-content-between">
          <span>Price:</span> <span>${product.price}</span>
        </p>
      </div>

      <button className="btn btn-lg btn-primary">Add to Cart</button>
    </div>
  );
}
