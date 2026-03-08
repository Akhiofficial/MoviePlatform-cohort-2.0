import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { UserActivityProvider } from './context/UserActivityContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserActivityProvider>
        <App />
      </UserActivityProvider>
    </AuthProvider>
  </StrictMode>,
);
