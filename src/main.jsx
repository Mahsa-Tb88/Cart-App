import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

import "./assets/css/components.scss";
import "./data/testData.js";
import "./utils/globalFunction.js";

import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider >
      <RouterProvider router={router} />
    </CartContextProvider>
  </React.StrictMode>
);
