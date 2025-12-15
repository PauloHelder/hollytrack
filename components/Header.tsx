import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const userInitial = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.charAt(0).toUpperCase()
    : (user?.email?.charAt(0).toUpperCase() || 'U');

  const userName = user?.user_metadata?.full_name || user?.email || 'Usuário';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-3 px-4 lg:px-8 flex items-center gap-4">
      {/* Mobile Menu Button */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Menu size={24} />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-holly-100 border border-holly-200 flex items-center justify-center text-holly-700 font-bold text-sm">
              {userInitial}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-700 leading-none truncate max-w-[100px]">{userName}</p>
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => { navigate('/settings'); setIsMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <User size={16} />
                Meu Perfil
              </button>
              <button
                onClick={() => { navigate('/settings'); setIsMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Settings size={16} />
                Configurações
              </button>

              <div className="my-1 border-t border-gray-50"></div>

              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} />
                Sair da Conta
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;