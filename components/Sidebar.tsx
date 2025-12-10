
import React from 'react';
import { LayoutDashboard, Users, UserCog, Heart, UsersRound, Settings, PlusCircle, FileBarChart, Send, User, Building2, X, GraduationCap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    // Auto close on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const NavItem = ({ path, icon: Icon, label }: { path: string; icon: any; label: string }) => (
    <button
      onClick={() => handleNavigation(path)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${isActive(path)
        ? 'bg-holly-600 text-white shadow-md'
        : 'text-gray-200 hover:bg-holly-900/50 hover:text-white'
        }`}
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
      {isActive(path) && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>}
    </button>
  );

  const getButtonLabel = () => {
    if (location.pathname === '/discipleships') return 'Novo Grupo';
    if (location.pathname === '/departments') return 'Novo Departamento';
    if (location.pathname === '/new-converts') return 'Novo Convertido';
    if (location.pathname === '/users') return 'Novo Usuário';
    return 'Novo Membro';
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-holly-800 text-white flex flex-col z-50 shadow-xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <img src="/logo.png" alt="HollyTrack Logo" className="h-[26px] w-[26px] object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight leading-none">HollyTrack</h1>
              <span className="text-[10px] text-red-200 font-medium tracking-wider uppercase">Church Manager</span>
            </div>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-300 hover:text-white rounded-lg hover:bg-holly-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem path="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem path="/members" icon={Users} label="Membros" />
          <NavItem path="/departments" icon={Building2} label="Departamentos" />
          <NavItem path="/discipleships" icon={UsersRound} label="Discipulados" />
          <NavItem path="/new-members" icon={GraduationCap} label="Novos Membros" />
          <NavItem path="/new-converts" icon={Heart} label="Novos Convertidos" />
          <NavItem path="/users" icon={UserCog} label="Usuários" />
          <NavItem path="/communications" icon={Send} label="Comunicações" />
          <NavItem path="/reports" icon={FileBarChart} label="Relatórios" />
          <div className="pt-4 mt-4 border-t border-holly-700">
            <NavItem path="/settings" icon={Settings} label="Configurações" />
          </div>
        </nav>

        {/* CTA Button */}
        <div className="px-4 pb-4">
          <button className="w-full bg-white text-holly-800 py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg transform active:scale-95">
            <PlusCircle size={20} />
            {getButtonLabel()}
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-holly-700 bg-holly-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-holly-600 flex items-center justify-center text-white border-2 border-holly-500">
              <User size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Admin</p>
              <p className="text-xs text-gray-300 truncate">admin@hollytrack.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
