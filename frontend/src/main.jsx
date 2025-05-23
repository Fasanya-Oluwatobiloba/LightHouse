import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SermonProvider } from './contexts/SermonContext';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SermonProvider>
        <App />
      </SermonProvider>
    </AuthProvider>
  </React.StrictMode>
);