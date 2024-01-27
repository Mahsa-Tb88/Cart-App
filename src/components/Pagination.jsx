import React, { useEffect, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import { NavLink, useSearchParams } from "react-router-dom";
export default function Pagination() {
  const { state, dispatch } = useCartContext();
  const totalPage = Math.ceil(state.totalProduct.all / 6);
  const [searchParams, setSearchParams] = useSearchParams();
  const prevClasses = [state.currentPage == 1 ? "disabled" : ""].join(" ");
  const nextClasses = [state.currentPage == totalPage ? "disabled" : ""].join(
    " "
  );

  useEffect(() => {
    dispatch({
      type: "setCurrentPage",
      payload: searchParams.get("page") || 1,
    });
  }, []);

  let pages = [];
  function handlePage(i) {
    dispatch({ type: "setCurrentPage", payload: i });
  }
  for (let i = 1; i <= totalPage; i++) {
    pages.push(
      <NavLink
        className={"page-item"}
        key={i}
        to={`/shop?page=${i}` + (state.search ? "&q=" + state.search : "")}
      >
        <span
          className={"page-link " + (state.currentPage == i ? "active" : "")}
          onClick={() => handlePage(i)}
        >
          {i}
        </span>
      </NavLink>
    );
  }

  return (
    <div className=" my-5">
      <ul className="pagination paginate">
        <NavLink className={prevClasses}>
          <span className="page-link" aria-label="Previous">
            <span aria-hidden="true">
              <FaAngleDoubleLeft />
            </span>
          </span>
        </NavLink>
        {pages}
        <NavLink className={nextClasses}>
          <span className="page-link" aria-label="Previous">
            <span aria-hidden="true">
              <FaAngleDoubleRight />
            </span>
          </span>
        </NavLink>
      </ul>
    </div>
  );
}

// + state.search
//             ? "&q=" + setSearchParams({ q: state.search })
//             : ""
