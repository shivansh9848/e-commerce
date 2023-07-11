import { selectUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Protected = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) return <Navigate to="/login"></Navigate>;
  else return children;
};
