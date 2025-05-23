import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}