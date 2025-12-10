import React, { useState } from 'react';
import { Search, Filter, Plus, UsersRound, MapPin, Clock, MoreHorizontal } from 'lucide-react';
import { DiscipleshipGroup } from '../types';
import DiscipleshipModal from './DiscipleshipModal';
import DiscipleshipDetails from './DiscipleshipDetails';
import DiscipleshipAttendanceModal from './DiscipleshipAttendanceModal';

const mockGroups: DiscipleshipGroup[] = [
  { id: 1, name: 'Jovens em Cristo', leader: 'Pr. Roberto', meetingDay: 'Quinta-feira', meetingTime: '19:30', location: 'Salão Principal', membersCount: 25, targetAudience: 'Jovens' },
  { id: 2, name: 'Casais de Fé', leader: 'Carlos e Ana', meetingDay: 'Sexta-feira', meetingTime: '20:00', location: 'Casa da Família Silva', membersCount: 12, targetAudience: 'Casais' },
  { id: 3, name: 'Teens Connect', leader: 'Mariana Costa', meetingDay: 'Sábado', meetingTime: '16:00', location: 'Sala 3', membersCount: 18, targetAudience: 'Adolescentes' },
  { id: 4, name: 'Mulheres de Oração', leader: 'Dra. Lúcia', meetingDay: 'Quarta-feira', meetingTime: '15:00', location: 'Sala de Oração', membersCount: 30, targetAudience: 'Mulheres' },
  { id: 5, name: 'Homens de Valor', leader: 'João Oliveira', meetingDay: 'Terça-feira', meetingTime: '20:00', location: 'Anexo B', membersCount: 20, targetAudience: 'Homens' },
];

const Discipleships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<DiscipleshipGroup[]>(mockGroups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<DiscipleshipGroup | undefined>(undefined);
  const [viewingGroup, setViewingGroup] = useState<DiscipleshipGroup | null>(null);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedGroupForAttendance, setSelectedGroupForAttendance] = useState<DiscipleshipGroup | null>(null);

  const handleSaveGroup = (groupData: Omit<DiscipleshipGroup, 'id'>) => {
    if (editingGroup) {
      setGroups(groups.map(g => g.id === editingGroup.id ? { ...groupData, id: g.id } : g));
    } else {
      const newGroup = { ...groupData, id: groups.length + 1 };
      setGroups([...groups, newGroup]);
    }
    setEditingGroup(undefined);
  };

  const handleEditClick = (e: React.MouseEvent, group: DiscipleshipGroup) => {
    e.stopPropagation();
    setEditingGroup(group);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingGroup(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir este grupo?')) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  const handleAttendanceClick = (e: React.MouseEvent, group: DiscipleshipGroup) => {
    e.stopPropagation();
    setSelectedGroupForAttendance(group);
    setIsAttendanceModalOpen(true);
  };

  const handleSaveAttendance = (data: { id?: number; date: string; lessonName: string; presentMemberIds: number[] }) => {
    console.log("Saving attendance for group:", selectedGroupForAttendance?.name, data);
    // Here you would typically save to the backend
    setIsAttendanceModalOpen(false);
    setSelectedGroupForAttendance(null);
  };

  if (viewingGroup) {
    return (
      <DiscipleshipDetails
        group={viewingGroup}
        onBack={() => setViewingGroup(null)}
        onEdit={() => {
          setViewingGroup(null);
          setEditingGroup(viewingGroup);
          setIsModalOpen(true);
        }}
      />
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <UsersRound className="text-holly-800" />
          Discipulados e Pequenos Grupos
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar grupo..."
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
            <span className="hidden md:inline">Novo Grupo</span>
            <span className="md:hidden">Novo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase())).map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setViewingGroup(group)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-2 py-1 bg-holly-50 text-holly-700 text-xs font-semibold rounded mb-2">{group.targetAudience}</span>
                <h3 className="text-lg font-bold text-gray-800">{group.name}</h3>
                <p className="text-sm text-gray-500">Líder: {group.leader}</p>
              </div>
              <div className="relative group">
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <MoreHorizontal size={20} />
                </button>
                {/* Simple Actions Menu Logic */}
                <div className="absolute right-0 top-6 w-32 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block z-10">
                  <button
                    onClick={(e) => handleEditClick(e, group)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(e, group.id)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock size={16} className="text-gray-400" />
                <span>{group.meetingDay} às {group.meetingTime}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400" />
                <span>{group.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <UsersRound size={16} className="text-gray-400" />
                <span>{group.membersCount} participantes</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setViewingGroup(group); }}
                className="flex-1 px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
              >
                Detalhes
              </button>
              <button
                onClick={(e) => handleAttendanceClick(e, group)}
                className="flex-1 px-3 py-2 bg-holly-50 text-holly-800 text-sm font-medium rounded-lg hover:bg-holly-100"
              >
                Frequência
              </button>
            </div>
          </div>
        ))}

        {/* Add new card placeholder */}
        <button
          onClick={handleCreateClick}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-holly-300 hover:text-holly-600 transition-all group min-h-[250px]"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-holly-50 flex items-center justify-center mb-3 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-medium">Criar Novo Grupo</span>
        </button>
      </div>

      <DiscipleshipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGroup}
        group={editingGroup}
      />

      {selectedGroupForAttendance && (
        <DiscipleshipAttendanceModal
          isOpen={isAttendanceModalOpen}
          onClose={() => {
            setIsAttendanceModalOpen(false);
            setSelectedGroupForAttendance(null);
          }}
          onSave={handleSaveAttendance}
          groupName={selectedGroupForAttendance.name}
        />
      )}
    </div>
  );
};

export default Discipleships;