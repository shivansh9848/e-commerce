import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrdersAsync, selectAllOrders } from "../../order/orderSlice";
export default function AdminOrders() {
  const Orders = useSelector(selectAllOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);

  console.log(Orders);
  return (
    <>
      <>
        <div className="overflow-x-auto">
          <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
            <div className="w-full">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Order No.</th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th className="py-3 px-6 text-center">Total Amount</th>
                      <th className="py-3 px-6 text-center">
                        Shipping Address
                      </th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Payment Method</th>
                      <th className="py-3 px-6 text-center">Payment Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {Orders.map((order) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="px-7 text-start  whitespace-nowrap">
                          <span className="font-medium">{order.id}</span>
                        </td>
                        {order.items.map((item) => (
                          <td className="flex py-3 px-6 text-left">
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.thumbnail}
                                />
                              </div>
                              <span>
                                {item.title} - #{item.quantity} - ${item.price}
                              </span>
                            </div>
                          </td>
                        ))}

                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            $ {order.amount}
                          </div>
                        </td>

                        <td className="flex flex-col px-7 text-start  whitespace-nowrap">
                          <span className="font-medium">
                            {order.selectedAddress["full-name"]}
                          </span>
                          <span className="font-medium">
                            {order.selectedAddress["street-address"]}
                          </span>
                          <span className="font-medium">
                            {order.selectedAddress["city"]}
                          </span>
                          <span className="font-medium">
                            {order.selectedAddress["state"]}
                          </span>
                          <span className="font-medium">
                            {order.selectedAddress["postal-code"]}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
