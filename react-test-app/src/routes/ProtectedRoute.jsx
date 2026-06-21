import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {Spinner} from "react-bootstrap";

/**
 * Prevents unauthorised access to webpages if user is not logged in (user = null).
 * Provides access to components within ProtectedRoute tag if a user is logged in.
 *
 * @param children component(s) wrapped within ProtectedRoute tag.
 */
export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner />
            </div>
        )
    }

    return user ? children : <Navigate to="/login" replace />;
}