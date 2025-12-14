import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Communications from './components/Communications';
import Reports from './components/Reports';
import Login from './components/Login';
import UsersPage from './components/Users';
import NewConverts from './components/NewConverts';
import NewMembers from './components/NewMembers';
import Discipleships from './components/Discipleships';
import Departments from './components/Departments';
import Settings from './components/Settings';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ClassRegistration from './components/ClassRegistration';
import ClassRegistrationPage from './components/ClassRegistrationPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';
  const isRegistrationPage = location.pathname.startsWith('/register/') || location.pathname === '/inscricao-novos-membros';

  if (isLoginPage || isRegistrationPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 w-full lg:ml-64 flex flex-col transition-all duration-300">
        <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-0">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            <Route path="/new-converts" element={<ProtectedRoute><NewConverts /></ProtectedRoute>} />
            <Route path="/new-members" element={<ProtectedRoute><NewMembers /></ProtectedRoute>} />
            <Route path="/discipleships" element={<ProtectedRoute><Discipleships /></ProtectedRoute>} />
            <Route path="/communications" element={<ProtectedRoute><Communications /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/register/class/:classId" element={<ClassRegistration />} />
            <Route path="/inscricao-novos-membros" element={<ClassRegistrationPage />} />
            <Route path="*" element={<div className="p-8 text-center text-gray-500">404 - Página não encontrada</div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
