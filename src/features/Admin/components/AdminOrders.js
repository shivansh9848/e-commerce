import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { discountedPrice } from "../../../app/constants";
export default function AdminOrders() {
  const Orders = useSelector(selectAllOrders);
  console.log("Orders", Orders);
  const [statusEditButton, setStatusEditButton] = useState(1);
  const dispatch = useDispatch();
  const handlestatusEditButton = () => {
    setStatusEditButton(!statusEditButton);
  };
  const handleStatus = (e, order) => {
    e.target.selected = 1;
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setStatusEditButton(!statusEditButton);
  };
  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  // console.log(Orders);
  return (
    <>
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-auto">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order No.</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-left">Total Amount</th>
                    <th className="py-3 px-6 text-left">Shipping Address</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Payment Method</th>
                    <th className="py-3 px-6 text-left">Actions</th>
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
                                src={item.product.thumbnail}
                              />
                            </div>
                            <span>
                              {item.product.title} - #{item.quantity} - &#8377;
                              {discountedPrice(item.product)}
                            </span>
                          </div>
                        </td>
                      ))}

                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          &#8377;{order.amount}
                        </div>
                      </td>

                      <td className="px-7 text-start  ">
                        <div className="font-medium">
                          {order.selectedAddress["full-name"]}
                        </div>
                        <div className="font-medium">
                          {order.selectedAddress["street-address"]}
                        </div>
                        <div className="font-medium">
                          {order.selectedAddress["city"]}
                        </div>
                        <div className="font-medium">
                          {order.selectedAddress["state"]}
                        </div>
                        <div className="font-medium">
                          {order.selectedAddress["postal-code"]}
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        {statusEditButton ? (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        ) : (
                          <select
                            onChange={(e) => handleStatus(e, order)}
                            id="status"
                            name="status"
                          >
                            <option>choose an option</option>
                            <option value="pending">pending</option>
                            <option value="received">received</option>
                            <option value="dispatched">dispatched</option>
                            <option value="delivered">delivered</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        )}
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">
                            {order.paymentMethod}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
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
                          <Link
                            onClick={() => handlestatusEditButton()}
                            className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110"
                          >
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
                          </Link>
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
  );
}
