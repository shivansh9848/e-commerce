import React from "react";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/navbar/navbar";
export const UserOrdersPage = () => {
  return (
    <>
      <Navbar>
        <UserOrders />
      </Navbar>
    </>
  );
};
export default UserOrdersPage;
