import {useState} from "react";
import {Alert, Button, Card, Form} from "react-bootstrap";

export function ConfirmForm({ email, onSubmit, error, submitting }) {
    const [code, setCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({code});
    };

    return (
        <Card className="p-4 mx-auto mt-4 bg-dark text-white"
              style={{maxWidth: "480px", border: "2px solid orange"}}>
            <p>A verification code has been sent to <strong>{email}</strong></p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="confirmForm.Code">
                    <Form.Label>Verification Code</Form.Label>
                    <Form.Control
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="******"
                    />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}

                <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting ? "Please wait..." : "Confirm"}
                </Button>
            </Form>
        </Card>
    );
}