import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import PageListOfShopping from "../pages/PageListOfShopping";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <PageListOfShopping /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default router;
