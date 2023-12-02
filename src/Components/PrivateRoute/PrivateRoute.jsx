import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../Hookes/AuthUser/UseAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  //Loading State Control
  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <span className="loading loading-spinner text-error"></span>;
      </div>
    );
  }
  //If USer Exists
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;
