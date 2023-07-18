import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetOrder } from "../features/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
// import { selectUser } from "../features/auth/authSlice";
export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const params = useParams();
  useEffect(() => {
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      <main className="container mx-auto grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully Placed !
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{params["id"] ? params["id"] : ""}
          </h1>
          <p className="mt-6 text-base leading-7 	">
            You can check your order in{" "}
            <span className="font-black"> my Account {`>`} Orders</span>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => navigate("/")}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
