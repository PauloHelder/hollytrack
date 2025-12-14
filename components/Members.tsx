import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Eye, Loader2 } from 'lucide-react';
import { Member } from '../types';
import MemberModal from './MemberModal';
import MemberDetails from './MemberDetails';
import { useMembers } from '../hooks/useMembers';

interface BadgeProps {
  children: React.ReactNode;
  color: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    purple: 'bg-purple-100 text-purple-700',
    gray: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color] || colorClasses.gray}`}>
      {children}
    </span>
  );
};

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { members, loading, addMember, updateMember, deleteMember } = useMembers(); // Using the hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | undefined>(undefined);
  const [viewingMember, setViewingMember] = useState<Member | null>(null);

  const getGroupColor = (group: string) => {
    if (group === 'Jovens') return 'blue';
    if (group === 'Coral') return 'green';
    if (group === 'Voluntários') return 'purple';
    if (group === 'Crianças') return 'yellow';
    return 'gray';
  };

  const handleSaveMember = async (memberData: Omit<Member, 'id'>) => {
    try {
      if (editingMember) {
        await updateMember(editingMember.id, memberData);
      } else {
        await addMember(memberData);
      }
      setEditingMember(undefined);
      setIsModalOpen(false);
    } catch (error) {
      alert('Erro ao salvar membro. Verifique o console.');
    }
  };

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingMember(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string | number) => {
    if (confirm('Tem certeza que deseja excluir este membro?')) {
      try {
        await deleteMember(id);
      } catch (error) {
        alert('Erro ao excluir membro.');
      }
    }
  };

  if (viewingMember) {
    return (
      <MemberDetails
        member={viewingMember}
        onBack={() => setViewingMember(null)}
        onEdit={() => {
          setViewingMember(null);
          handleEditClick(viewingMember);
        }}
      />
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Gestão de Membros</h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Pesquisar por nome ou e-mail..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-800 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium">
            <Filter size={18} />
            <span className="hidden md:inline">Filtros</span>
          </button>
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm transition-colors"
          >
            <Plus size={18} />
            <span className="hidden md:inline">Adicionar Membro</span>
            <span className="md:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="animate-spin text-holly-600" size={32} />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-4 w-10">
                      <input type="checkbox" className="rounded border-gray-300 text-holly-800 focus:ring-holly-800" />
                    </th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contato</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Grupos</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data de Inscrição</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {members.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-500">
                        Nenhum membro encontrado.
                      </td>
                    </tr>
                  ) : (
                    members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())).map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-4">
                          <input type="checkbox" className="rounded border-gray-300 text-holly-800 focus:ring-holly-800" />
                        </td>
                        <td className="p-4 cursor-pointer" onClick={() => setViewingMember(member)}>
                          <div className="flex items-center gap-3">
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{member.phone}</td>
                        <td className="p-4">
                          <div className="flex gap-1 flex-wrap">
                            {member.groups && member.groups.length > 0 ? member.groups.map(g => (
                              <Badge key={g} color={getGroupColor(g)}>{g}</Badge>
                            )) : <span className="text-xs text-gray-400">-</span>}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{new Date(member.joinDate).toLocaleDateString()}</td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${member.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                            {member.status}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2 text-gray-400">
                            <button
                              onClick={() => setViewingMember(member)}
                              className="p-1 hover:text-holly-600 hover:bg-holly-50 rounded transition-colors"
                              title="Ver Detalhes"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleEditClick(member)}
                              className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(member.id)}
                              className="p-1 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Excluir"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Placeholder - functionality not implemented in hook yet */}
            {members.length > 0 && (
              <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">Mostrando {members.length} membros</span>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-50" disabled>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-holly-50 text-holly-800 font-medium text-sm flex items-center justify-center border border-holly-100">1</button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 disabled" disabled>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMember}
        member={editingMember}
      />
    </div>
  );
};

export default Members;