import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? <div>{children}</div> : <Navigate to="/login" />;
};

export default ProtectedRoute;
