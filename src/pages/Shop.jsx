import React from "react";
import Filter from "../components/Filter";

export default function Shop() {
  return (
    <div>
      <Filter />
      <div className="card ">
        <img
          className="card-img-top card-img pb-3"
          src="../public/images/1.webp"
          alt="Card image cap"
        />
        <div className="card-body border-top">
          <h5 className="card-title ">
            Mobile, Sumsung,
            <br /> Galexy A14,
            <br /> 2 Memory
          </h5>
          <p className="cart-text  p-2  d-flex justify-content-between">
            <span>Price:</span> <span>$200.000</span>
          </p>
        </div>

        <button className="btn  btn-primary">Add to Cart</button>
      </div>
    </div>
  );
}
