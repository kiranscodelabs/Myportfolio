import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  // 🛡️ Senior Tip: If you want to get fancy later, you can decode the JWT 
  // here to check if it's expired using 'jwt-decode'.
  
  if (!token) {
    // We send them to login, but keep track of where they were trying to go
    // using 'state'. This is a pro-move for user experience.
    return <Navigate to="/admin-secret-access" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;