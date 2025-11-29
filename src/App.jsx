import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import RequestAccess from './components/Auth/RequestAccess';
import Home from './pages/Home';
import Notices from './pages/Notices';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Sessions from './pages/admin/Sessions';
import Requests from './pages/admin/Requests';
import Settings from './pages/admin/Settings';
import ChangePassword from './pages/admin/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/global.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          user ? <Navigate to="/" replace /> : <Login />
        } />
        <Route path="/admin/login" element={
          user?.isAdmin ? <Navigate to="/admin" replace /> : <Login isAdmin={true} />
        } />
        <Route path="/request-access" element={
          user ? <Navigate to="/" replace /> : <RequestAccess />
        } />

        {/* Protected Client Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Home />
              </main>
              <Footer />
            </div>
          </ProtectedRoute>
        } />
        
        <Route path="/notices" element={
          <ProtectedRoute>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Notices />
              </main>
              <Footer />
            </div>
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="requests" element={<Requests />} />
          <Route path="settings" element={<Settings />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Catch all - redirect to home or login  */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </>
  );
}

export default App;
