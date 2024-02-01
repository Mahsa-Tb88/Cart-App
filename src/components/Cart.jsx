import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function Cart({ product, shoppingCart, setShoppingCart }) {
  useEffect(() => {
    setShoppingCart(JSON.parse(localStorage.shopping) || []);
  }, []);

  function addToCartHandler(id) {
    setShoppingCart([...shoppingCart, { id, numOfItem: 1 }]);
    localStorage.shopping = JSON.stringify([
      ...shoppingCart,
      { id, numOfItem: 1 },
    ]);
  }
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

      <button
        className="btn btn-lg btn-primary"
        onClick={() => addToCartHandler(product.id)}
      >
        aad to card
      </button>
    </div>
  );
}

export default Cart;

function AddtoCart() {
  return (
    <div>
      <div>
        <FaRegTrashAlt />
      </div>
      <div>
        <span className="bg-danger"></span>
        <span></span>
        <span className="bg-success"></span>
      </div>
    </div>
  );
}

// {shoppingCart.find((c) => c.id == product.id) ? (
//   <AddtoCart />
// ) : (
//   "Add to Cart"
// )}
