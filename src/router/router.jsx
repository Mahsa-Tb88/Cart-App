import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import PageListOfShopping from "../pages/PageListOfShopping";
import ProductPage from "../pages/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <PageListOfShopping /> },
      {
        path: "product",
        children: [
          { index: true, element: <Navigate to="shop" replace={true} /> },
          { path: ":id", element: <ProductPage /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default router;
