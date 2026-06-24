import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./features/auth/LoginPage.jsx";
import { SignupPage } from "./features/auth/SignupPage.jsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import {WorkoutsPage} from "./features/content/WorkoutsPage.jsx";

/**
 * Routes URLs to corresponding pages.
 * Provides protected access to children within ProtectRoute (DashboardPage).
 *
 */
export default function MyApp() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/workout-page" element={ <ProtectedRoute> <WorkoutsPage /> </ProtectedRoute> } />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
