import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Function to reduce code duplication.
 * Allows for easy access to data from AuthProvider.
 *
 */
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}