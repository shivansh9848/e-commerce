import { Navigate } from "react-router-dom";
import { selectUser } from "../authSlice";
import { useSelector } from "react-redux";
export const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) return <Navigate to="/"></Navigate>;
  else return children;
};
