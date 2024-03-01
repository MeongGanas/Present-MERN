import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname !== "/register") {
        navigate("/login");
      }
    } else {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return children;
};

export default ProtectedRoute;
