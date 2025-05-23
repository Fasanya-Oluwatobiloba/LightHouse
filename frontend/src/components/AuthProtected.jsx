import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import pb from "../lib/pocketbase"; // Import PocketBase directly

export default function AuthProtected({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useAuth();

  useEffect(() => {
    // Check auth state directly from PocketBase
    if (!loading && !pb.authStore.isValid) {
      navigate("/admin/login", {
        replace: true,
        state: { from: location },
      });
    }
  }, [loading, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  console.log(
    "AuthProtected - isValid:",
    pb.authStore.isValid,
    "loading:",
    loading
  );
  // Only render children if authenticated
  return pb.authStore.isValid ? children : null;
}
