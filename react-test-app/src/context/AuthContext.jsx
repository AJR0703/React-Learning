import { createContext, useState } from "react";


/**
 * Used to hold authentication data, set to null currently.
 *
 */
export const AuthContext = createContext(null);


/**
 * Tracks the state (who is logged in currrently), null = nobody logged in.
 * Defines login, signup and logout actions to manipulate the user state.
 *
 * .Provider broadcasts the user, login, signup and logout to all children components.
 *
 * @param children The app and all of the apps children.
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Placeholder login, returns dummy user.
    // TODO: replace with API call.
    const login = async ({ email }) => {
        setUser({ id: "dummy", name: email.split("@")[0], email });
    };

    const signup = async ({ email }) => {
        setUser({ id: "dummy", name: email.split("@")[0], email });
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}