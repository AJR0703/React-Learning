import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { getProfile, saveProfile} from "../../api/authApi.js";

export function DashboardPage() {
    const { user, logout } = useAuth();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        getProfile()
            .then((profile) => {
                if (profile?.name) setName(profile.name);
                if (profile?.email) setEmail(profile?.email);
            })
            .catch(() => {
                // Accounts for new users, where no profile is present on first load.
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus(null);
        try {
            await saveProfile({ name, email });
            setStatus({ ok: true, msg: "Profile saved" });
        } catch {
            setStatus({ ok: false, msg: "Unable to save profile." });
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="bg-dark text-white">
            <h1>Dashboard</h1>
            <p>Welcome, {user.name}</p>

            <Form onSubmit={handleSave} style={{ maxWidth: 480 }}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Button type="submit" variant="primary">Save Profile</Button>
            </Form>

            {status && <Alert className="mt-3" variant={status.ok ? "success" : "danger"}>{status.msg}</Alert>}
            <Button className="mt-3" onClick={logout}>Log out</Button>
        </div>
    );
}