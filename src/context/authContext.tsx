import React, { createContext, useContext } from "react";

interface AuthContextType {
    user: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider = ({
    user,
    children,
}: {
    user: any;
    children: React.ReactNode;
}) => {
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};