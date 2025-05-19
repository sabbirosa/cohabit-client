import { HelmetProvider } from "react-helmet-async";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
import useAuth from "../contexts/AuthContext";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user)
    return <Navigate to="/auth/login" state={{ from: location }} replace />;

  return <HelmetProvider>{children}</HelmetProvider>;
}

export default PrivateRoute;
