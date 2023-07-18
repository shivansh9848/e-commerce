import React, { useEffect } from "react";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./features/cart/Cart";
import Checkout from "./pages/Checkout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import { Protected } from "./features/auth/components/Protected";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/auth/authSlice";
import { fetchItemsByUserIDAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIDAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Home />,
        </Protected>
      ),
    },
    {
      path: "cart",
      element: (
        <Protected>
          <Cart />,
        </Protected>
      ),
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignUpPage />,
    },
    {
      path: "checkout",
      element: (
        <Protected>
          <Checkout />,
        </Protected>
      ),
    },
    {
      path: "product-detail/:id",
      element: (
        <Protected>
          <ProductDetailPage />,
        </Protected>
      ),
    },
    {
      path: "/logout",
      element: <LoginPage />,
    },
    {
      path: "/order-success/:id",
      element: (
        <Protected>
          <OrderSuccessPage />,
        </Protected>
      ),
    },
    {
      path: "/orders",
      element: (
        <Protected>
          <UserOrdersPage />,
        </Protected>
      ),
    },
    {
      path: "/profile",
      element: (
        <Protected>
          <UserProfilePage />,
        </Protected>
      ),
    },
    {
      path: "/logout",
      element: (
        <Protected>
          <Logout />,
        </Protected>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
