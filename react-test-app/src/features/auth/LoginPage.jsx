import {useAuth} from "../../hooks/useAuth.js";
import {Link, useNavigate} from "react-router-dom";
import {AuthForm} from "./AuthForm.jsx";
import {useState} from "react";

/**
 * Handles login functionality.
 * Retrieves login function using useAuth().
 * Passes credentials from the AuthForm to the login function.
 *
 */
export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async (credentials) => {
        setError(null);
        setSubmitting(true);
        try {
            await login(credentials);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid Login. Please check email and password");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-dark text-white">
            <h1>Log in</h1>
            <AuthForm submitLabel="Log in" onSubmit={handleLogin} error={error} submitting={submitting} />
            <p>
                No Account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
}