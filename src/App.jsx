import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
export default function App() {
  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center ">
        <div className="d-flex justify-content-center align-items-center">
          <NavLink>Home</NavLink>
          <NavLink>Shop</NavLink>
          <NavLink>About</NavLink>
        </div>
        <Link>
          <IoCartSharp />
          <span>2</span>
        </Link>
      </header>
    </div>
  );
}
