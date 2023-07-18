import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchLoggedInUsersOrdersAsync } from "../userSlice";
import { selectUserOrders } from "../userSlice";
export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const userOrders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUsersOrdersAsync(user.id));
  }, [dispatch, user]);
  // console.log(userOrders);

  return (
    <>
      {userOrders.length == 0 ? (
        <section className=" py-4 bg-neutral-200">
          <div className="flex justify-center container content-center px-4 mx-auto">
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-heading mb-3 text-2xl font-semibold">
                It&rsquo;s a bit empty here
              </h2>
              <img
                src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1233.jpg?w=740&t=st=1689077985~exp=1689078585~hmac=5ab80f414b402fd41e7c94763ea006c0f4e97a1fa2fd11895b381b07bd91ea92"
                alt=""
              />
              <button
                onClick={() => navigate("/")}
                type="button"
                className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Shop Now
              </button>
            </div>
          </div>
        </section>
      ) : (
        userOrders.map((Order) => (
          <div
            key={Order.id}
            className="bg-white mt-5 mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8"
          >
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Order#{Order.id}
              </h1>

              <div className="flex items-center"></div>
            </div>
            <div className="flex items-baseline justify-between  border-gray-200 pt-6">
              <h6 className="text-xl font-bold tracking-tight text-red-900">
                Order Status: {Order.status}
              </h6>

              <div className="flex items-center"></div>
            </div>
            <div className=" mt-8">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {Order.items.length &&
                    Order.items.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.images[0]}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{product.title}</h3>
                              <p className="ml-4">{product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {/* {product.color} */}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              Qty :{product.quantity}
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="border-t my-4 border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{Order.amount}</p>
                </div>
                <p className="pt-4 mt-0.5 text-base font-medium text-gray-900">
                  Shipping Address
                </p>
                <ul className="divide-y divide-gray-100">
                  <li className="flex justify-between gap-x-6 py-1">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex align-baseline pr-1 gap-4">
                        {/* <p
                            className="mt-1 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          >
                        
                            </p> */}
                        <div>
                          <label className="text-sm font-semibold leading-6 text-gray-500">
                            {Order.selectedAddress["full-name"]}
                          </label>
                          <div className="block text-sm font-medium leading-6 text-gray-500">
                            {Order.selectedAddress["street-address"]} ,{" "}
                            {Order.selectedAddress.city} ,{" "}
                            {Order.selectedAddress.state} ,{" "}
                            {Order.selectedAddress["postal-code"]}
                          </div>
                          <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {Order.selectedAddress["phone-number"]}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">Home</p>
                      </div> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
