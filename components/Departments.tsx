import React, { useState } from 'react';
import { Search, Plus, Building2, Users, Calendar, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Department } from '../types';
import DepartmentModal from './DepartmentModal';
import DepartmentDetails from './DepartmentDetails';

const mockDepartments: Department[] = [
  {
    id: 1,
    name: 'Ministério Infantil',
    leader: 'Sarah Oliveira',
    membersCount: 45,
    description: 'Cuidando e ensinando as crianças o caminho do Senhor.',
    nextMeeting: 'Domingo, 09:00'
  },
  {
    id: 2,
    name: 'Louvor e Adoração',
    leader: 'Marcos Santos',
    membersCount: 22,
    description: 'Equipe de músicos e cantores responsáveis pela liturgia.',
    nextMeeting: 'Quinta, 19:30'
  },
  {
    id: 3,
    name: 'Mídia e Comunicação',
    leader: 'Pedro Alencar',
    membersCount: 8,
    description: 'Transmissão, redes sociais e design da igreja.',
    nextMeeting: 'Terça, 20:00'
  },
  {
    id: 4,
    name: 'Diaconia e Acolhimento',
    leader: 'João Batista',
    membersCount: 30,
    description: 'Recepção, organização e serviço durante os cultos.',
    nextMeeting: 'Domingo, 17:00'
  },
  {
    id: 5,
    name: 'Ação Social',
    leader: 'Ana Clara',
    membersCount: 15,
    description: 'Projetos de ajuda à comunidade e distribuição de cestas.',
    nextMeeting: 'Sábado, 14:00'
  },
];

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | undefined>(undefined);
  const [viewingDept, setViewingDept] = useState<Department | null>(null);

  const handleSaveDepartment = (deptData: Omit<Department, 'id'>) => {
    if (editingDept) {
      setDepartments(departments.map(d => d.id === editingDept.id ? { ...deptData, id: d.id } : d));
    } else {
      const newDept = { ...deptData, id: departments.length + 1 };
      setDepartments([...departments, newDept]);
    }
    setEditingDept(undefined);
  };

  const handleEditClick = (e: React.MouseEvent, dept: Department) => {
    e.stopPropagation();
    setEditingDept(dept);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingDept(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir este departamento?')) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  if (viewingDept) {
    return (
      <DepartmentDetails
        department={viewingDept}
        onBack={() => setViewingDept(null)}
        onEdit={() => {
          setViewingDept(null);
          setEditingDept(viewingDept);
          setIsModalOpen(true);
        }}
      />
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Building2 className="text-holly-800" />
          Departamentos e Ministérios
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar departamento..."
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
            <span className="hidden md:inline">Novo Departamento</span>
            <span className="md:hidden">Novo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((dept) => (
          <div
            key={dept.id}
            onClick={() => setViewingDept(dept)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-holly-50 p-3 rounded-lg">
                  <Building2 className="text-holly-800" size={24} />
                </div>
                <div className="relative group">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10">{dept.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <span className="font-semibold text-xs">{dept.leader.charAt(0)}</span>
                  </div>
                  <span className="text-gray-700 font-medium">{dept.leader}</span>
                  <span className="text-gray-400 text-xs px-2 py-0.5 bg-gray-50 rounded-full border border-gray-100">Líder</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} className="text-gray-400" />
                    <span>{dept.membersCount} Voluntários</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>{dept.nextMeeting}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex gap-2">
              <button
                onClick={(e) => handleEditClick(e, dept)}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-holly-800 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
              >
                <Edit2 size={16} /> Editar
              </button>
              <div className="w-px bg-gray-200 my-1"></div>
              <button
                onClick={(e) => handleDeleteClick(e, dept.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
              >
                <Trash2 size={16} /> Excluir
              </button>
            </div>
          </div>
        ))}

        {/* Add Card */}
        <button
          onClick={handleCreateClick}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-holly-300 hover:text-holly-600 transition-all group min-h-[300px]"
        >
          <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-holly-50 flex items-center justify-center mb-4 transition-colors">
            <Plus size={32} />
          </div>
          <span className="font-bold text-lg">Criar Departamento</span>
          <span className="text-sm text-gray-400 mt-2">Adicione um novo ministério ou área</span>
        </button>
      </div>

      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDepartment}
        department={editingDept}
      />
    </div>
  );
};

export default Departments;
