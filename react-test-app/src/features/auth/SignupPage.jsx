import { SignUpForm } from "../components/Forms.jsx";
import { Link } from "react-router-dom";

export const SignupPage = () => {
    return (
        <div className="bg-dark text-white">
            <h1>Sign Up</h1>
            <SignUpForm/>
            <p>Already a member? <Link to="/login">Login now</Link></p>
        </div>
    )
}