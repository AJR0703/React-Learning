import { LoginForm } from "../components/Forms.jsx";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    return (
        <div className="bg-dark text-white">
            <h1>Login</h1>
            <LoginForm/>
            <p>Not a member? <Link to="/signup">Register now</Link></p>
        </div>
    )
}