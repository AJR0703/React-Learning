import {useAuth} from "../../hooks/useAuth.js";
import {Button} from "react-bootstrap";

export function DashboardPage() {
    const { user, logout } = useAuth();

    return (
        <div className="bg-dark text-white">
            <h1>Dashboard</h1>
            <p>Welcome, {user.name}</p>
            <Button onClick={logout}>Log out</Button>
        </div>
    )
}