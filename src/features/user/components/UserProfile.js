import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// import { selectUser } from "../../auth/authSlice";
// import { useNavigate } from "react-router-dom";
import { updateUserAsync } from "../userSlice";
import { selectUserInfo } from "../userSlice";
export default function UserProfile() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const [editButton, setEditButton] = useState(false);
  const [index, setIndex] = useState(null);
  const [newAddressButton, setNewAddressButton] = useState(null);
  // const navigate = useNavigate();
  const user = useSelector(selectUserInfo);
  const handleRemove = (e, idx) => {
    const newobj = { ...user, address: [...user.address] };
    newobj.address.splice(idx, 1);
    dispatch(updateUserAsync(newobj));
  };
  const onSubmit = (data) => {
    reset();
    const newobj = { ...user, address: [...user.address] };
    newobj.address.splice(index, 1, data);
    dispatch(updateUserAsync(newobj));
    setEditButton(!editButton);
    reset();
  };
  const onSubmit1 = (data) => {
    setEditButton(false);
    const newobj = { ...user, address: [...user.address] };
    newobj.address.push(data);
    dispatch(updateUserAsync(newobj));
    setNewAddressButton(!newAddressButton);
  };
  const handleEditButton = (idx) => {
    setEditButton(!editButton);
    setIndex(idx);
    setValue("full-name", user.address[idx]["full-name"]);
    setValue("email-add", user.address[idx]["email-add"]);
    setValue("phone-number", user.address[idx]["phone-number"]);
    setValue("street-address", user.address[idx]["street-address"]);
    setValue("city", user.address[idx]["city"]);
    setValue("state", user.address[idx]["state"]);
    setValue("postal-code", user.address[idx]["postal-code"]);
  };

  return (
    <>
      {user&&<div className="bg-white mt-5 mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className=" items-baseline  border-b border-gray-200 py-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Name:
              {user.address ? user.address["full-name"] : " Guest 4080"}
            </h1>
            <h6 className="text-xl font-bold tracking-tight text-red-900">
              {user.email}
            </h6>
            <h6 className="text-xl font-bold tracking-tight text-red-900">
              {user&&user.role}
            </h6>
          </div>
          <div className=" items-baseline  py-4">
            <button
              onClick={() => {
                reset();
                setNewAddressButton(!newAddressButton);
              }}
              classname="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flow-root">
          {/* <ul className="-my-6 divide-y divide-gray-200"> */}
          <p className="text-xl py-4 mt-0.5 font-medium text-gray-900">
            Saved Shipping Address
          </p>
          {user.address &&
            user.address.length > 0 &&
            user.address.map((address, idx) => (
              <li key={idx} className="flex pb-4">
                <div className=" border-t  border-gray-200 px-4 pt-6 sm:px-6">
                  {/* <ul className="divide-y divide-gray-100"> */}
                  <li className="flex justify-between pb-1">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex align-baseline pr-1 gap-1">
                        <div>
                          <label className="text-sm font-semibold leading-6 text-gray-500">
                            {address["full-name"]}
                          </label>
                          <div className="block text-sm font-medium leading-6 text-gray-500">
                            {address["street-address"]} , {address.city} ,{" "}
                            {address.state} , {address["postal-code"]}
                          </div>
                          <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address["phone-number"]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <button
                    onClick={(e) => handleEditButton(idx)}
                    className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, idx)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                  >
                    Remove
                  </button>
                  {editButton === true && index == idx ? (
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                      <div className="mt-4 space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <div className="mt-10 grid  gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Full name{" "}
                                <span className="text-red-500">*</span>
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
                                Email address
                                <span className="text-red-500">*</span>
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
                                Street address
                                <span className="text-red-500">*</span>
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
                                State / Province
                                <span className="text-red-500">*</span>
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
                                  <option value="Andhra Pradesh">
                                    Andhra Pradesh
                                  </option>
                                  <option value="Andaman and Nicobar Islands">
                                    Andaman and Nicobar Islands
                                  </option>
                                  <option value="Arunachal Pradesh">
                                    Arunachal Pradesh
                                  </option>
                                  <option value="Assam">Assam</option>
                                  <option value="Bihar">Bihar</option>
                                  <option value="Chandigarh">Chandigarh</option>
                                  <option value="Chhattisgarh">
                                    Chhattisgarh
                                  </option>
                                  <option value="Dadar and Nagar Haveli">
                                    Dadar and Nagar Haveli
                                  </option>
                                  <option value="Daman and Diu">
                                    Daman and Diu
                                  </option>
                                  <option value="Delhi">Delhi</option>
                                  <option value="Lakshadweep">
                                    Lakshadweep
                                  </option>
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
                                  <option value="Madhya Pradesh">
                                    Madhya Pradesh
                                  </option>
                                  <option value="Maharashtra">
                                    Maharashtra
                                  </option>
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
                                  <option value="Uttar Pradesh">
                                    Uttar Pradesh
                                  </option>
                                  <option value="Uttarakhand">
                                    Uttarakhand
                                  </option>
                                  <option value="West Bengal">
                                    West Bengal
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                ZIP / Postal code
                                <span className="text-red-500">*</span>
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
                              Update address
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              </li>
            ))}
          {newAddressButton === true ? (
            <form noValidate onSubmit={handleSubmit(onSubmit1)}>
              <div className="border-t  border-gray-200 mt-4 space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
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
                        Email address
                        <span className="text-red-500">*</span>
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
                        Street address
                        <span className="text-red-500">*</span>
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
                        State / Province
                        <span className="text-red-500">*</span>
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
                        ZIP / Postal code
                        <span className="text-red-500">*</span>
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
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>}
    </>
  );
}
