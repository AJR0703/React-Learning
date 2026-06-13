import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Prevents unauthorised access to webpages if user is not logged in (user = null).
 * Provides access to components within ProtectedRoute tag if a user is logged in.
 *
 * @param children component(s) wrapped within ProtectedRoute tag.
 */
export function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return  user ? children : <Navigate to="/login" replace />;
}