import { Navigate } from "react-router-dom";

const ProtectedRouteLogin = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? <Navigate to="/home" /> : <div>{children}</div>;
};

export default ProtectedRouteLogin;
