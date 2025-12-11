import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

import ClassRegistration from './components/ClassRegistration';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';
  const isRegistrationPage = location.pathname.startsWith('/register/');

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
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/new-converts" element={<NewConverts />} />
          <Route path="/new-members" element={<NewMembers />} />
          <Route path="/discipleships" element={<Discipleships />} />
          <Route path="/communications" element={<Communications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/register/class/:classId" element={<ClassRegistration />} />
          <Route path="*" element={<div className="p-8 text-center text-gray-500">Página em construção</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
