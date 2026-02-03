import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loading for better performance
const PortfolioHome = lazy(() => import('./pages/PortfolioHome')); 
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const PageLoader = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  // Check if user is already logged in (Senior Check)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main Portfolio */}
          <Route path="/" element={<PortfolioHome />} />

          {/* 🛡️ Admin Entry Point: admin-secret-access */}
          <Route 
            path="/admin-secret-access" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          
          {/* 🛡️ Anti-Guessing: Redirect standard /login or /admin to the secret route */}
          <Route path="/login" element={<Navigate to="/admin-secret-access" replace />} />
          <Route path="/admin" element={<Navigate to="/admin-secret-access" replace />} />

          {/* 🛡️ Protected Dashboard: If not logged in, ProtectedRoute will handle the kick-back */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          
          {/* 404 Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}