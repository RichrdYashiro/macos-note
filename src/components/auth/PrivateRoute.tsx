import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteType {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteType) {
  const auth = useAuth();

  const location = useLocation();

  if (!auth || auth.user === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export default PrivateRoute;
