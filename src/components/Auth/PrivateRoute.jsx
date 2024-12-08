import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // Get authentication status from Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  // Get user data from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  
  // Extract user role from the stored data
  const userRole = storedUserData?.role;

  // Get current location/path
  const location = useLocation();

  // If the user is authenticated and trying to access the login page
  if ((isAuthenticated || storedUserData) && location.pathname === "/login") {
    if (userRole === "admin") {
      // Redirect admin to the /admin page
      return <Navigate to="/admin" />;
    } else if (userRole === "employee") {
      // Redirect employee to the /user page
      return <Navigate to="/user" />;
    }
  }

  // If the user is not authenticated and trying to access protected routes, redirect to /login
  if (!isAuthenticated && !storedUserData) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the children (protected route)
  return children;
};

export default PrivateRoute;
