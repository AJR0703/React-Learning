import {useState} from "react";
import Form from "react-bootstrap/Form";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 * Function that handles form creation and submission
 * @returns {React.JSX.Element}
 * @constructor
 */
export const LoginForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
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
                        value={form.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registrationForm.Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    <Link to="/dashboard" className="text-white">Login</Link>
                </Button>
            </Form>
        </Card>
    )
}

/**
 * Function that handles form creation and submission
 * @returns {React.JSX.Element}
 * @constructor
 */
export const SignUpForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
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
                        value={form.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registrationForm.Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registrationForm.Password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    <Link to="/dashboard" className="text-white">Register now</Link>
                </Button>
            </Form>
        </Card>
    )
}