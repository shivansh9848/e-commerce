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
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      console.log("working");
      dispatch(fetchItemsByUserIDAsync(user.id));
    }
  }, [user]);

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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
