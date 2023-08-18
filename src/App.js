import React, { useEffect } from "react";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
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
import ForgotPassword from "./features/auth/components/ForgotPassword";
import { ProtectedAdmin } from "./features/auth/components/ProtectedAdmin";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { checkAuthAsync } from "./features/auth/authSlice";
import { selectUserChecked } from "./features/auth/authSlice";
function App() {
  const user = useSelector(selectUser);
  const userChecked = useSelector(selectUserChecked);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIDAsync());
      dispatch(fetchLoggedInUserAsync());
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
      path: "/admin",
      element: (
        <ProtectedAdmin>
          <AdminHome />,
        </ProtectedAdmin>
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
      path: "admin/product-detail/:id",
      element: (
        <ProtectedAdmin>
          <AdminProductDetailPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "admin/product-form",
      element: (
        <ProtectedAdmin>
          <AdminProductFormPage />,
        </ProtectedAdmin>
      ),
    },
    {
      path: "admin/orders",
      element: (
        <ProtectedAdmin>
          <AdminOrdersPage />,
        </ProtectedAdmin>
      ),
    },
    {
      path: "admin/product-form/edit/:id",
      element: (
        <ProtectedAdmin>
          <AdminProductFormPage />,
        </ProtectedAdmin>
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
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <>{<RouterProvider router={router} />}</>;
}

export default App;
