import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectItems } from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { selectUserInfo } from "../features/user/userSlice";
import { updateUserAsync } from "../features/user/userSlice";
import { useState } from "react";
import { resetCartAsync } from "../features/cart/cartSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
export default function Checkout() {
  const items = useSelector(selectItems);
  // const navigate = useNavigate();
  const currentOrderID = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedAddress, setSelectedAddress] = useState(null);
  // const [Addressalert, setAddressalert] = useState();
  const user = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const amount = items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const onSubmit = (data) => {
    // console.log(data);
    let dat = { ...user, address: [...user.address, data] };
    dispatch(updateUserAsync(dat));
    reset();
  };
  const handlePayments = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleAddress = (e) => {
    setSelectedAddress(user.address[e.target.value]);
  };
  const handleOrder = () => {
    let add = null;
    if (!selectedAddress) {
      add = user.address[0];
    } else add = selectedAddress;
    const order = {
      items,
      amount,
      paymentMethod,
      selectedAddress: add,
      user: user.id,
      status: "pending",
    };
    dispatch(createOrderAsync(order));
    dispatch(resetCartAsync(user.id));

    console.log("xyz", order);
  };
  // console.log(user.address);
  return (
    <>
      {currentOrderID != null && (
        <Navigate to={`/order-success/${currentOrderID.id}`} replace={true} />
      )}
      <div
        className=" my-5 grid lg:grid-cols-5
     mx-auto max-w-7xl px-4 sm:px-6 gap-20"
      >
        <div className="bg-white lg:col-span-3 p-4">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid  gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("full-name", {
                          required: true,
                        })}
                        type="text"
                        name="full-name"
                        id="full-name"
                        autoComplete="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 sm:row-start-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("email-add", {
                          required: true,
                        })}
                        id="email"
                        name="email-add"
                        type="email-add"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 sm:row-start-3">
                    <label
                      htmlFor="phone-number"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone No.<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("phone-number", {
                          required: true,
                        })}
                        id="phone-number"
                        name="phone-number"
                        type="tel"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full sm:row-start-4">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("street-address", {
                          required: true,
                        })}
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("city", {
                          required: true,
                        })}
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <select
                        {...register("state", {
                          required: true,
                        })}
                        autoComplete="state"
                        name="state"
                        id="state"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadar and Nagar Haveli">
                          Dadar and Nagar Haveli
                        </option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        {...register("postal-code", {
                          required: true,
                        })}
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={() => reset()}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add address
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Addresses
                </h2>
                {user.address.length ? (
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from exisiting addresses
                  </p>
                ) : (
                  <p className="mt-1 text-sm leading-6 text-red-600">
                    Select a address*
                  </p>
                )}
                <ul className="divide-y divide-gray-100">
                  {user.address.length
                    ? user.address.map((address, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between gap-x-6 py-5"
                        >
                          <div className="flex gap-x-4">
                            <div className="min-w-0 flex align-baseline pr-1 gap-4">
                              <input
                                type="radio"
                                name="address"
                                onClick={(e) => handleAddress(e)}
                                value={idx}
                                defaultChecked={idx === 0}
                                className="mt-1 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <div>
                                <label className="text-sm font-semibold leading-6 text-gray-900">
                                  {address["full-name"]}
                                </label>
                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                  {address["street-address"]} , {address.city} ,{" "}
                                  {address.state} , {address["postal-code"]}
                                </div>
                                <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address["phone-number"]}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              Home
                            </p>
                          </div>
                        </li>
                      ))
                    : ""}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose payment method below
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          onClick={(e) => handlePayments(e)}
                          name="payments"
                          type="radio"
                          defaultChecked={paymentMethod === "cash"}
                          value="cash"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          COD (Cash on delivery)
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          onClick={(e) => handlePayments(e)}
                          defaultChecked={paymentMethod === "card"}
                          name="payments"
                          type="radio"
                          value="card"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
              <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                Items in Cart
              </h1>
              <div className="flex items-center"></div>
            </div>
            <div className=" mt-8">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {items.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.thumbnail}
                          alt={product.images[0]}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link>{product.title}</Link>
                            </h3>
                            <p className="ml-4">{product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {/* {product.color} */}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            Qty {product.quantity}
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
                  <p>${amount}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    onClick={() => handleOrder()}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay & Order
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
        </div>
      </div>
    </>
  );
}
