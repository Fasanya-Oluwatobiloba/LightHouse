// hooks/useAuth.js
import { useState } from "react";
import pb from "../lib/pocketbase";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // In your useAuth.js, modify the login function to:
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      console.log("Login successful, authStore:", pb.authStore); // Add this line
      pb.authStore.onChange(() => {}, true); // Optional if already synced
      navigate("/admin/dashboard");
      return authData;
    } catch (err) {
      console.error("Login error:", err); // Add this line
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    pb.authStore.clear();
    navigate("/admin/login");
  };

  const isAuthenticated = () => pb.authStore.isValid;
  const user = pb.authStore.record;

  return { login, logout, isAuthenticated, user, loading, error };
}
