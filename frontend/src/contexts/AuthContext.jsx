import { createContext, useContext, useEffect, useState } from 'react';
import pb from '../lib/pocketbase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize auth from localStorage
        const storedAuth = localStorage.getItem('pocketbase_auth');
        if (storedAuth) {
            const { token, model } = JSON.parse(storedAuth);
            pb.authStore.save(token, model);
            setUser(model);
        }
        setLoading(false);

        // Listen for auth changes
        const unsubscribe = pb.authStore.onChange((token, model) => {
            setUser(model);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: pb.authStore.isValid
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}