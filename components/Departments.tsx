
import React, { useState } from 'react';
import { Search, Plus, Building2, Users, Calendar, MoreVertical, Edit2, Trash2, Loader2 } from 'lucide-react';
import { Department } from '../types';
import DepartmentModal from './DepartmentModal';
import DepartmentDetails from './DepartmentDetails';
import { useDepartments } from '../hooks/useDepartments';

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { departments, loading, addDepartment, updateDepartment, deleteDepartment } = useDepartments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | undefined>(undefined);
  const [viewingDept, setViewingDept] = useState<Department | null>(null);

  const handleSaveDepartment = async (deptData: Omit<Department, 'id'>) => {
    try {
      if (editingDept) {
        await updateDepartment(editingDept.id, deptData);
      } else {
        await addDepartment(deptData);
      }
      setEditingDept(undefined);
      setIsModalOpen(false);
    } catch (error) {
      alert('Erro ao salvar departamento.');
    }
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

  const handleDeleteClick = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir este departamento?')) {
      try {
        await deleteDepartment(id);
      } catch (error) {
        alert('Erro ao excluir departamento.');
      }
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

      {loading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="animate-spin text-holly-600" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              Nenhum departamento encontrado. Crie um novo para começar.
            </div>
          ) : (
            departments.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((dept) => (
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
                    {/* More actions placeholder - implementation would go here */}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10">{dept.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                        <span className="font-semibold text-xs">{dept.leader.charAt(0)}</span>
                      </div>
                      <span className="text-gray-700 font-medium">{dept.leader || 'Sem líder'}</span>
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
                      <span>{dept.nextMeeting || 'Não agendada'}</span>
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
            ))
          )}

          {/* Add Card always visible at the end or if empty? better stick to button at top and cards list */}

        </div>
      )}

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
