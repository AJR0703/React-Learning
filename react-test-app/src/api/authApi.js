import { apiFetch } from "./client.js";

export function getProfile() {
    return apiFetch("/profile", { method: "GET" });
}

export function saveProfile({ name, email }) {
    return apiFetch("/profile", {
        method: "PUT",
        body: JSON.stringify({ name, email }),
    })
}