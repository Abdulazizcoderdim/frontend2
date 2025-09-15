import AllProducts from "@/components/AllProducts";
import BuyNow from "@/components/BuyNow";
import Cart from "@/components/cart/cart";
import CategoryProducts from "@/components/category-products/CategoryProducts";
import Login from "@/components/login/login";
import MyAccount from "@/components/my-accout/my-account";
import SignUp from "@/components/sign-up/sign-up";
import Wishlist from "@/components/wshlist/wishlist";
import Layout from "@/layout/layout";
import NotFoundPage from "@/pages/404/not-found";
import About from "@/pages/about/about";
import Checkout from "@/pages/checkout/checkout";
import Contact from "@/pages/contact/contact";
import GetOne from "@/pages/get-one/get-one";
import Home from "@/pages/home/home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/*",
        element: <NotFoundPage />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/category/:categorySlug/:slug",
        element: <GetOne />,
      },
      {
        path: "/category/:categorySlug",
        element: <CategoryProducts />,
      },
      {
        path: "/account",
        element: <MyAccount />,
      },
      {
        path: "/404",
        element: <NotFoundPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/checkout/:slug",
        element: <BuyNow />,
      },
      {
        path: "/shop",
        element: <AllProducts />,
      },
    ],
  },
]);
