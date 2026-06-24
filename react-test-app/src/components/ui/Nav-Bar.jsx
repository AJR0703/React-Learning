import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import "./Nav-Bar.css";

const LINKS = [
    { to: "/workout-page", label: "Workouts", key: "workout" },
];

function NavigationBar({ pageTitle }) {
    const [expanded, setExpanded] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        setExpanded(false);
        await logout();
        navigate("/login");
    };

    return (
        <Navbar
            expand={false}
            expanded={expanded}
            onToggle={setExpanded}
            data-bs-theme="dark"
            className="mw-nav"
        >
            <Container fluid className="mw-nav-inner">
                <Navbar.Brand className="mw-nav-brand">{pageTitle}</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" className="mw-nav-toggle" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    className="mw-nav-drawer"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel" className="mw-nav-drawer-title">
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="mw-nav-body">
                        <Nav className="mw-nav-menu">
                            {LINKS.map((link) => {
                                const active = pathname === link.to;
                                return (
                                    <Nav.Link
                                        key={link.key}
                                        as={Link}
                                        to={link.to}
                                        className={`mw-nav-link mw-nav-link--${link.key}${active ? " is-active" : ""}`}
                                        aria-current={active ? "page" : undefined}
                                        onClick={() => setExpanded(false)}
                                    >
                                        {link.label}
                                    </Nav.Link>
                                );
                            })}
                        </Nav>

                        <button type="button" className="mw-nav-logout" onClick={handleLogout}>
                            Log out
                        </button>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
