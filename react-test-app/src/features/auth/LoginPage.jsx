import {useAuth} from "../../hooks/useAuth.js";
import {Link, useNavigate} from "react-router-dom";
import {AuthForm} from "./AuthForm.jsx";

/**
 * Handles login functionality.
 * Retrieves login function using useAuth().
 * Passes credentials from the AuthForm to the login function.
 *
 */
export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        await login(credentials);
        navigate("/dashboard");
    };

    return (
        <div className="bg-dark text-white">
            <h1>Log in</h1>
            <AuthForm submitLabel="Log in" onSubmit={handleLogin} />
            <p>
                No Account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
}