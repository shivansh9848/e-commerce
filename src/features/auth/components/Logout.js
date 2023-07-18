import React from "react";
import { Navigate } from "react-router-dom";
import { selectUser } from "../authSlice";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../authSlice";

export default function Logout() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatchEvent(logoutAsync());
  }, [dispatch]);

  return <>{!user ? <Navigate to="/" replace={true} /> : ""}</>;
}
