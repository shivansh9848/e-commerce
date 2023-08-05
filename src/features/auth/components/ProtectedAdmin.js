import { selectUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) return <Navigate to="/"></Navigate>;
  if (user.role === "user") return <Navigate to="/"></Navigate>;
  else return children;
};
