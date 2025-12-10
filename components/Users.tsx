
import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, ShieldCheck, UserCog, ArrowRight } from 'lucide-react';
import { User } from '../types';
import UserModal from './UserModal';
import UserDetails from './UserDetails';

const mockUsers: User[] = [
  { id: 1, name: 'Admin Principal', email: 'admin@hollytrack.com', role: 'Admin', avatar: 'https://ui-avatars.com/api/?name=Admin+Principal&background=74181D&color=fff', lastAccess: 'Agora', status: 'Ativo' },
  { id: 2, name: 'Pastor Roberto', email: 'pr.roberto@hollytrack.com', role: 'Pastor', avatar: 'https://ui-avatars.com/api/?name=Roberto&background=random', lastAccess: '15 min atrás', status: 'Ativo' },
  { id: 3, name: 'Sarah Secretaria', email: 'secretaria@hollytrack.com', role: 'Secretaria', avatar: 'https://ui-avatars.com/api/?name=Sarah&background=random', lastAccess: '2 horas atrás', status: 'Ativo' },
  { id: 4, name: 'Líder Jovens', email: 'lider.jovens@hollytrack.com', role: 'Líder', avatar: 'https://ui-avatars.com/api/?name=Lider+Jovens&background=random', lastAccess: '1 dia atrás', status: 'Inativo' },
];

const RoleBadge = ({ role }: { role: string }) => {
  const styles: Record<string, string> = {
    'Admin': 'bg-red-100 text-red-700',
    'Pastor': 'bg-purple-100 text-purple-700',
    'Líder': 'bg-blue-100 text-blue-700',
    'Secretaria': 'bg-pink-100 text-pink-700',
    'Supervisor': 'bg-orange-100 text-orange-700',
    'Conselheiro': 'bg-teal-100 text-teal-700',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[role] || 'bg-gray-100 text-gray-700'}`}>
      {role}
    </span>
  );
};

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  const handleSaveUser = (userData: Omit<User, 'id' | 'lastAccess'>) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...userData, id: u.id, lastAccess: u.lastAccess } : u));
    } else {
      const newUser = {
        ...userData,
        id: users.length + 1,
        lastAccess: 'Nunca'
      };
      setUsers([...users, newUser]);
    }
    setEditingUser(undefined);
  };

  const handleEditClick = (e: React.MouseEvent, user: User) => {
    e.stopPropagation();
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  }

  const handleCreateClick = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  if (viewingUser) {
    return (
      <UserDetails
        user={viewingUser}
        onBack={() => setViewingUser(null)}
        onEdit={() => {
          setViewingUser(null);
          setEditingUser(viewingUser);
          setIsModalOpen(true);
        }}
      />
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <UserCog className="text-holly-800" />
          Usuários do Sistema
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar usuário..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-800 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm transition-colors"
          >
            <Plus size={18} />
            <span className="hidden md:inline">Novo Usuário</span>
            <span className="md:hidden">Novo</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuário</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Função</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Último Acesso</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setViewingUser(user)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="p-4 text-sm text-gray-600">{user.lastAccess}</td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      {user.status}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <button
                        onClick={(e) => { e.stopPropagation(); setViewingUser(user); }}
                        className="p-1 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Ver Detalhes"
                      >
                        <ArrowRight size={16} />
                      </button>
                      <button
                        onClick={(e) => handleEditClick(e, user)}
                        className="p-1 hover:text-holly-600 hover:bg-blue-50 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(e, user.id)}
                        className="p-1 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </div>
  );
};

export default UsersPage;
