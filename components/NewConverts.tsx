import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, CheckCircle, Heart, ArrowRight } from 'lucide-react';
import { NewConvert } from '../types';
import NewConvertModal from './NewConvertModal';
import NewConvertDetails from './NewConvertDetails';

const mockConverts: NewConvert[] = [
  { id: 1, name: 'Lucas Mendes', email: 'lucas.m@email.com', phone: '(11) 99999-1111', conversionDate: '2024-07-15', mentor: 'Carlos Pereira', status: 'Acompanhamento', avatar: 'https://ui-avatars.com/api/?name=Lucas+Mendes&background=random' },
  { id: 2, name: 'Sofia Alves', email: 'sofia.a@email.com', phone: '(11) 98888-2222', conversionDate: '2024-07-10', mentor: 'Ana Silva', status: 'Acompanhamento', avatar: 'https://ui-avatars.com/api/?name=Sofia+Alves&background=random' },
  { id: 3, name: 'Pedro Rocha', email: 'pedro.r@email.com', phone: '(11) 97777-3333', conversionDate: '2024-07-01', mentor: 'João Oliveira', status: 'Batizado', avatar: 'https://ui-avatars.com/api/?name=Pedro+Rocha&background=random' },
  { id: 4, name: 'Mariana Lima', email: 'mari.l@email.com', phone: '(11) 96666-4444', conversionDate: '2024-06-20', mentor: 'Bruna Costa', status: 'Integrado', avatar: 'https://ui-avatars.com/api/?name=Mariana+Lima&background=random' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Acompanhamento': 'bg-yellow-100 text-yellow-700',
    'Batizado': 'bg-blue-100 text-blue-700',
    'Integrado': 'bg-green-100 text-green-700',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

const NewConverts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [converts, setConverts] = useState<NewConvert[]>(mockConverts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConvert, setEditingConvert] = useState<NewConvert | undefined>(undefined);
  const [viewingConvert, setViewingConvert] = useState<NewConvert | null>(null);

  const handleSaveConvert = (convertData: Omit<NewConvert, 'id'>) => {
    if (editingConvert) {
      setConverts(converts.map(c => c.id === editingConvert.id ? { ...convertData, id: c.id } : c));
    } else {
      const newConvert = { ...convertData, id: converts.length + 1 };
      setConverts([...converts, newConvert]);
    }
    setEditingConvert(undefined);
  };

  const handleEditClick = (e: React.MouseEvent, convert: NewConvert) => {
    e.stopPropagation();
    setEditingConvert(convert);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingConvert(undefined);
    setIsModalOpen(true);
  };

  const handleConvertToMember = (convert: NewConvert) => {
    if (confirm(`Deseja migrar ${convert.name} para a lista de Membros oficiais?`)) {
      alert(`${convert.name} foi migrado com sucesso para Membros!`);
      // In a real app, this would make an API call to create a Member and update/remove the NewConvert
      setViewingConvert(null);
    }
  };

  if (viewingConvert) {
    return (
      <NewConvertDetails
        convert={viewingConvert}
        onBack={() => setViewingConvert(null)}
        onEdit={() => {
          setViewingConvert(null);
          setEditingConvert(viewingConvert);
          setIsModalOpen(true);
        }}
        onConvertToMember={() => handleConvertToMember(viewingConvert)}
      />
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Heart className="text-holly-600" fill="currentColor" />
          Novos Convertidos
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Pesquisar..."
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
            <span className="hidden md:inline">Registrar Decisão</span>
            <span className="md:hidden">Registrar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-gray-500 text-xs font-semibold uppercase mb-1">Total este Mês</div>
          <div className="text-2xl font-bold text-gray-900">15 Almas</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-gray-500 text-xs font-semibold uppercase mb-1">Aguardando Batismo</div>
          <div className="text-2xl font-bold text-blue-600">8 Pessoas</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-gray-500 text-xs font-semibold uppercase mb-1">Em Discipulado</div>
          <div className="text-2xl font-bold text-yellow-600">12 Pessoas</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data Decisão</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Conselheiro/Mentor</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contato</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {converts.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((convert) => (
                <tr
                  key={convert.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setViewingConvert(convert)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={convert.avatar} alt={convert.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-gray-900">{convert.name}</div>
                        <div className="text-sm text-gray-500">{convert.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{new Date(convert.conversionDate).toLocaleDateString()}</td>
                  <td className="p-4 text-sm text-gray-600">{convert.mentor}</td>
                  <td className="p-4 text-sm text-gray-600">{convert.phone}</td>
                  <td className="p-4">
                    <StatusBadge status={convert.status} />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <button
                        onClick={(e) => { e.stopPropagation(); setViewingConvert(convert); }}
                        className="p-1 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Ver Detalhes / Evoluir"
                      >
                        <ArrowRight size={16} />
                      </button>
                      <button
                        onClick={(e) => handleEditClick(e, convert)}
                        className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewConvertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveConvert}
        convert={editingConvert}
      />
    </div>
  );
};

export default NewConverts;