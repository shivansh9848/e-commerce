import React from "react";
import UserProfile from "../features/user/components/UserProfile";
import Navbar from "../features/navbar/navbar";
export const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <UserProfile />
      </Navbar>
    </>
  );
};
export default UserProfilePage;
