import { fetchAuthSession } from "aws-amplify/auth";
import { API_BASE_URL } from "../config/amplify.js";

export async function apiFetch(path, options = {}){
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken.toString();

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`,
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
}