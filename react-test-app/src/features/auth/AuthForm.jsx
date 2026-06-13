import {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";

/**
 * Creates a reusable form.
 * Handles only email and password input values.
 *
 */
export function AuthForm({ submitLabel, onSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <Card className="p-4 mx-auto mt-4 bg-dark text-white"
              style={{ maxWidth: "480px", border: "2px solid orange" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="registrationForm.Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registrationForm.Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    {submitLabel}
                </Button>
            </Form>
        </Card>
    )
}