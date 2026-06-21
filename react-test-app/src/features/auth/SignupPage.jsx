import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.js";
import {Link, useNavigate} from "react-router-dom";
import {AuthForm} from "./AuthForm.jsx";
import {ConfirmForm} from "./ConfirmForm.jsx";


/**
 * Handles signup functionality.
 * Retrieves signup function using useAuth().
 * Passes credentials from the AuthForm to the signup function.
 *
 */
export function SignupPage() {
    const {signup, confirmSignup, login} = useAuth();
    const navigate = useNavigate();
    const [pending, setPending] = useState(null);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSignup = async ({ email, password }) => {
        setError(null);
        setSubmitting(true);
        try {
            await signup({ email, password });
            setPending({ email, password });
        } catch {
            setError("Sign up failed. Try a different email or stronger password.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleConfirm = async ({ code }) => {
        setError(null);
        setSubmitting(true);
        try {
            await confirmSignup({email: pending.email, code });
            await login({ email: pending.email, password: pending.password });
            navigate("/dashboard");
        } catch {
            setError("Invalid Code. Please check the code sent.");
        } finally {
            setSubmitting(false);
        }
    };

    if (pending) {
        return <ConfirmForm email={pending.email} onSubmit={handleConfirm} error={error} submitting={submitting} />;
    }

    return (
        <div className={"bg-dark text-white"}>
            <h1>Sign Up</h1>
            <AuthForm submitLabel="Create Account" onSubmit={handleSignup} error={error} submitting={submitting}/>
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    )
}