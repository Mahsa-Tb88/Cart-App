import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { useCartContext } from "./context/CartContext";
import Loading from "./components/Loading";
import LoadingError from "./components/LoadingError";
export default function App() {
  const { state, dispatch } = useCartContext();
  // let content = "";
  // state.isLoading
  //   ? (content = <Loading />)
  //   : state.loadingError
  //   ? (content = <LoadingError />)
  //   : (content = (
  //       <div>
  //         <header className="header">
  //           <div className="d-flex justify-content-between align-items-center  container">
  //             <div className="d-flex justify-content-center align-items-center py-3 navbar">
  //               <NavLink
  //                 to="/"
  //                 className="list-unstyled p-2 mx-4 text-decoration-none header-link"
  //               >
  //                 Home
  //               </NavLink>
  //               <NavLink
  //                 to="/shop"
  //                 className="list-unstyled p-2 mx-4 text-decoration-none header-link"
  //               >
  //                 Shop
  //               </NavLink>
  //               <NavLink
  //                 to="/about"
  //                 className="list-unstyled p-2 mx-4 text-decoration-none header-link"
  //               >
  //                 About
  //               </NavLink>
  //             </div>
  //             <Link className="position-relative icon-cart">
  //               <IoCartSharp className="fs-3" />
  //               <span className="item">2</span>
  //             </Link>
  //           </div>
  //         </header>
  //         <div className=" text-center ">
  //           <Outlet />
  //         </div>
  //       </div>
  //     ));
  return (
    <div className="app">
      <header className="header">
        <div className="d-flex justify-content-between align-items-center  container">
          <div className="d-flex justify-content-center align-items-center py-3 navbar">
            <NavLink
              to="/"
              className="list-unstyled p-2 mx-4 text-decoration-none header-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className="list-unstyled p-2 mx-4 text-decoration-none header-link"
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className="list-unstyled p-2 mx-4 text-decoration-none header-link"
            >
              About
            </NavLink>
          </div>
          <Link className="position-relative icon-cart">
            <IoCartSharp className="fs-3" />
            <span className="item">2</span>
          </Link>
        </div>
      </header>
      <div className=" text-center ">
        <Outlet />
      </div>
    </div>
  );
}
