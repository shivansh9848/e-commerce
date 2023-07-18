import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectItems, deleteItemAsync, updateCartAsync } from "./orderSlice";
export default function Cart() {
  const products = useSelector(selectItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(products.length);
  const amount = products.reduce(
    (amount, curr) => amount + curr.quantity * curr.price,
    0
  );
  const handleRemove = (id) => {
    dispatch(deleteItemAsync(id));
  };
  const handleQuantity = (e, product) => {
    dispatch(updateCartAsync({ quantity: e.target.value, id: product.id }));
    // e.target.value = product.quantity;
    // console.log(products);
  };

  return (
    <>
      {products.length == 0 ? (
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
        <div className="bg-white mt-5 mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center"></div>
          </div>
          <div className=" mt-8">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {products.length &&
                  products.map((product) => (
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
                            <h3>
                              <Link to={`/product-detail/${product.id}`}>
                                {product.title}
                              </Link>
                            </h3>
                            <p className="ml-4">{product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {/* {product.color} */}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            Qty{" "}
                            <select
                              onClick={(e) => handleQuantity(e, product)}
                              className="pl-1 py-0.5"
                              name="Qty"
                              id="Qty"
                              defaultValue={product.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={(e) => handleRemove(product.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="border-t my-4 border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{amount}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="px-1 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
