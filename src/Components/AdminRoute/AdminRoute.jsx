import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import UseAdmin from "../../Hookes/AdminVerify/UseAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isAdmin, adminLoading] = UseAdmin();
  const location = useLocation();

  if (loading || adminLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <span className="loading loading-spinner text-error"></span>;
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
