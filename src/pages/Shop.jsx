import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { useCartContext } from "../context/CartContext";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import LoadingError from "../components/LoadingError";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../utils/api";

export default function Shop() {
  const { state, dispatch } = useCartContext();
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [loadinErrorProducts, setLoadingErrorProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState({
    filtered: null,
    all: null,
  });
  const [searchParams, setSearchParams] = useSearchParams("");
  useEffect(() => {
    if (searchParams.get("q")) {
      setSearch(searchParams.get("q"));
    }
    if (searchParams.get("category")) {
      setCategory(searchParams.get("category"));
    }
    console.log("useEffect shop");
    const timeOut = setTimeout(fetchProducts, 20);
    return () => clearTimeout(timeOut);
  }, [searchParams.get("page")]);

  async function fetchProducts() {
    setIsLoadingProducts(true);
    setCurrentPage(searchParams.get("page") || 1);
    const result = await getProducts(
      searchParams.get("page") || 1,
      6,
      searchParams.get("q") || "",
      searchParams.get("category") || ""
    );
    console.log(result);
    if (result.success) {
      setProducts(result.body);
      setTotalProduct({
        filtered: result.total.filtered,
        all: result.total.all,
      });
      setLoadingErrorProducts(false);
    } else {
      setLoadingErrorProducts({ message: result.message, code: result.code });
    }
    setIsLoadingProducts(false);
  }
  return (
    <div className="container">
      <Filter
        search={search}
        category={category}
        setSearch={setSearch}
        setCategory={setCategory}
        fetchProducts={fetchProducts}
      />
      {isLoadingProducts ? (
        <Loading />
      ) : loadinErrorProducts ? (
        <LoadingError reload={fetchProducts} error={loadinErrorProducts} />
      ) : (
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-3" key={product.id}>
                <Cart product={product} key={product.id} />
              </div>
            );
          })}
          {totalProduct.all > 6 ? (
            <Pagination
              totalProduct={totalProduct}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              search={search}
              category={category}
            />
          ) : products.length == 0 ? (
            <div className="fs-5 mt-5"> There is not any Product</div>
          ) : (
            ""
          )}
        </div>
      )}
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
