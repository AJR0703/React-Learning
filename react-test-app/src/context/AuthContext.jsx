import {createContext, useEffect, useState} from "react";
import {
    signIn, signUp, confirmSignUp, signOut,
    getCurrentUser, fetchUserAttributes,
} from "aws-amplify/auth";

/**
 * Used to hold authentication data, set to null currently.
 *
 */
export const AuthContext = createContext(null);


// TODO: Create a confirm login for verifying code, acting as MFA

const hydrateUser = async () => {
    const { userId } = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    return {
        id: userId,
        email: attributes.email,
        name: attributes.email.split("@")[0]
    };
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        hydrateUser()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async ({ email, password }) => {
        try { await signOut(); } catch { /* no existing session, ignore */ }
        await signIn({ username: email, password });
        setUser(await hydrateUser());
    };

    const signup = async ({ email, password }) => {
        await signUp({
            username: email,
            password,
            options: { userAttributes: { email }},
        });
    };

    const confirmSignup = async ({ email, code }) => {
        await confirmSignUp({ username: email, confirmationCode: code });
    };

    const logout = async () => {
        await signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, signup, confirmSignup, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}