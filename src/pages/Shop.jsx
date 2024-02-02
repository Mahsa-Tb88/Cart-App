import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import Cart from "../components/Cart";
import Loading from "../components/Loading";
import LoadingError from "../components/LoadingError";
import { json, useSearchParams } from "react-router-dom";
import { getProducts } from "../utils/api";
import { useCartContext } from "../context/CartContext";

export default function Shop() {
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
  const [shoppingCart, setShoppingCart] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams("");
  const { state, dispatch } = useCartContext();

  useEffect(() => {
    if (searchParams.get("q")) {
      setSearch(searchParams.get("q"));
    }
    if (searchParams.get("category")) {
      setCategory(searchParams.get("category"));
    }
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
                <Cart
                  product={product}
                  key={product.id}
                  shoppingCart={shoppingCart}
                  setShoppingCart={setShoppingCart}
                />
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
