import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./features/auth/LoginPage.jsx";
import { SignupPage } from "./features/auth/SignupPage.jsx";
import { DashboardPage } from "./features/dashboard/DashboardPage.jsx";

export default function MyApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element = {<SignupPage/>} />
                <Route path="/dashboard" element={<DashboardPage/>} />
            </Routes>
        </BrowserRouter>
    );
}
