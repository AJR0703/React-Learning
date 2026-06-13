import {useAuth} from "../../hooks/useAuth.js";
import {Link, useNavigate} from "react-router-dom";
import {AuthForm} from "./AuthForm.jsx";


/**
 * Handles signup functionality.
 * Retrieves signup function using useAuth().
 * Passes credentials from the AuthForm to the signup function.
 *
 */
export function SignupPage() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (credentials) => {
        await signup(credentials);
        navigate('/dashboard');
    };

    return (
        <div className="bg-dark text-white">
            <h1>Sign up</h1>
            <AuthForm submitLabel="Create Account" onSubmit={handleSignup} />
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    )
}