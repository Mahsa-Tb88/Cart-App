import React, { useEffect, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import { NavLink, useSearchParams } from "react-router-dom";
export default function Pagination({
  search,
  category,
  currentPage,
  setCurrentPage,
  totalProduct,
}) {
  const { state, dispatch } = useCartContext();
  const totalPage = Math.ceil(totalProduct.all / 6);
  const [searchParams, setSearchParams] = useSearchParams();
  const prevClasses = [currentPage == 1 ? "disabled" : ""].join(" ");
  const nextClasses = [currentPage == totalPage ? "disabled" : ""].join(" ");

  useEffect(() => {
    searchParams.get("page")
      ? setCurrentPage(searchParams.get("page"))
      : setCurrentPage(1);
  }, []);

  let pages = [];
  function handlePage(i) {
    setCurrentPage(i);
  }
  for (let i = 1; i <= totalPage; i++) {
    pages.push(
      <NavLink
        className={"page-item"}
        key={i}
        to={
          `/shop?page=${i}` +
          (search ? "&q=" + search : "") +
          (category ? "&category=" + category : "")
        }
      >
        <span
          className={"page-link " + (currentPage == i ? "active" : "")}
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
        <NavLink
          className={prevClasses}
          to={
            `/shop?page=${parseInt(currentPage) - 1}` +
            (search ? "&q=" + search : "") +
            (category ? "&category=" + category : "")
          }
        >
          <span
            className="page-link"
            aria-label="Previous"
            onClick={() => handlePage(parseInt(currentPage) - 1)}
          >
            <span aria-hidden="true">
              <FaAngleDoubleLeft />
            </span>
          </span>
        </NavLink>
        {pages}
        <NavLink
          className={nextClasses}
          to={
            `/shop?page=${parseInt(currentPage) + 1}` +
            (search ? "&q=" + search : "") +
            (category ? "&category=" + category : "")
          }
        >
          <span
            className="page-link"
            aria-label="next"
            onClick={() => handlePage(parseInt(currentPage) + 1)}
          >
            <span aria-hidden="true">
              <FaAngleDoubleRight />
            </span>
          </span>
        </NavLink>
      </ul>
    </div>
  );
}
