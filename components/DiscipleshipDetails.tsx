import React, { useState } from 'react';
import { ChevronLeft, UsersRound, User, Clock, MapPin, Calendar, CheckSquare, Edit2, Users, CalendarCheck, ChevronRight, ChevronDown } from 'lucide-react';
import { DiscipleshipGroup } from '../types';
import DiscipleshipAttendanceModal from './DiscipleshipAttendanceModal';
import AddMemberToDiscipleshipModal from './AddMemberToDiscipleshipModal';

interface DiscipleshipDetailsProps {
    group: DiscipleshipGroup;
    onBack: () => void;
    onEdit: () => void;
}

// Mock Data
const MOCK_HISTORY = [
    { id: 101, date: '2023-10-25', lessonName: 'Aula 1: O Início da Caminhada', presentMemberIds: [1, 2, 3], totalMembers: 5 },
    { id: 102, date: '2023-11-01', lessonName: 'Aula 2: Fundamentos da Fé', presentMemberIds: [1, 2, 4, 5], totalMembers: 5 },
    { id: 103, date: '2023-11-08', lessonName: 'Aula 3: Batismo', presentMemberIds: [1, 2, 3, 4, 5], totalMembers: 5 },
];

const DiscipleshipDetails: React.FC<DiscipleshipDetailsProps> = ({ group, onBack, onEdit }) => {
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
    const [history, setHistory] = useState(MOCK_HISTORY);
    const [editingMeeting, setEditingMeeting] = useState<{ id: number; date: string; lessonName: string; presentMemberIds: number[] } | null>(null);
    const [isMembersExpanded, setIsMembersExpanded] = useState(false);
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const handleOpenAttendanceModal = (meeting?: typeof editingMeeting) => {
        if (meeting) {
            setEditingMeeting(meeting);
        } else {
            setEditingMeeting(null);
        }
        setIsAttendanceModalOpen(true);
    };

    const handleSaveAttendance = (data: { id?: number; date: string; lessonName: string; presentMemberIds: number[] }) => {
        if (data.id) {
            // Edit existing
            setHistory(history.map(item => item.id === data.id ? { ...item, ...data, totalMembers: 5 } : item));
        } else {
            // Create new
            const newEntry = {
                id: Date.now(),
                date: data.date,
                lessonName: data.lessonName,
                presentMemberIds: data.presentMemberIds,
                totalMembers: 5
            };
            setHistory([newEntry, ...history]);
        }
        setIsAttendanceModalOpen(false);
    };

    const handleAddMember = (selectedMemberIds: number[]) => {
        console.log("Adding members:", selectedMemberIds);
        // Implement logic to add members to the group
        setIsAddMemberModalOpen(false);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-holly-800 mb-6 transition-colors"
            >
                <ChevronLeft size={20} />
                Voltar para a lista
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Cover */}
                <div className="h-32 bg-gradient-to-r from-holly-800 to-holly-600"></div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-6">
                            <div className="w-32 h-32 rounded-xl border-4 border-white shadow-lg bg-gray-50 flex items-center justify-center">
                                <UsersRound size={48} className="text-holly-600" />
                            </div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
                                <div className="flex items-center gap-3 text-gray-500 mt-1">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                        {group.targetAudience}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <User size={14} /> Líder: {group.leader}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Users size={14} /> {group.membersCount} participantes
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onEdit}
                            className="px-6 py-2.5 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm transition-colors flex items-center gap-2"
                        >
                            <Edit2 size={18} />
                            Editar Grupo
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                        {/* Info sidebar */}
                        <div className="p-8 lg:col-span-1 space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Informações do Encontro</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{group.meetingDay}</p>
                                            <p className="text-sm text-gray-500">Horário: {group.meetingTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Localização</p>
                                            <p className="text-sm text-gray-500">{group.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Próximo Encontro</h3>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Calendar className="text-holly-700" size={20} />
                                        <span className="font-bold text-gray-900">14 de Dezembro</span>
                                    </div>
                                    <button
                                        onClick={() => handleOpenAttendanceModal()}
                                        className="w-full py-2 bg-holly-700 text-white rounded-lg text-sm font-medium hover:bg-holly-800 transition-colors"
                                    >
                                        Realizar Chamada
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:col-span-2">
                            <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setIsMembersExpanded(!isMembersExpanded)}>
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <UsersRound className="text-holly-600" />
                                    Membros do Grupo
                                </h2>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsAddMemberModalOpen(true);
                                        }}
                                        className="text-sm text-holly-700 font-medium hover:underline"
                                    >
                                        Adicionar Participante
                                    </button>
                                    <ChevronDown
                                        className={`text-gray-400 transition-transform duration-300 ${isMembersExpanded ? 'rotate-180' : ''}`}
                                        size={20}
                                    />
                                </div>
                            </div>

                            {isMembersExpanded && (
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                                <div>
                                                    <p className="font-medium text-gray-900">Participante {i}</p>
                                                    <p className="text-xs text-gray-500">Membro Regular</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-holly-700 bg-white border border-gray-200 rounded-lg hover:border-holly-200" title="Marcar Presença">
                                                    <CheckSquare size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="p-3 text-center">
                                        <button className="text-sm text-gray-500 hover:text-gray-700">Ver lista completa</button>
                                    </div>
                                </div>
                            )}


                            {/* Separator - Only visible if members section is expanded or explicitly requested */}
                            <div className="my-8 border-t border-gray-100"></div>

                            {/* Meeting History Section */}
                            <div className="">
                                <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}>
                                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <CalendarCheck className="text-holly-600" />
                                        Histórico de Encontros
                                    </h2>
                                    <ChevronDown
                                        className={`text-gray-400 transition-transform duration-300 ${isHistoryExpanded ? 'rotate-180' : ''}`}
                                        size={20}
                                    />
                                </div>

                                {isHistoryExpanded && (
                                    <div className="space-y-3">
                                        {history.map((meeting) => (
                                            <div
                                                key={meeting.id}
                                                onClick={() => handleOpenAttendanceModal(meeting)}
                                                className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-holly-200 hover:shadow-sm transition-all cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-gray-200 group-hover:bg-holly-50 group-hover:border-holly-100 transition-colors">
                                                        <span className="text-xs font-bold text-gray-500 uppercase group-hover:text-holly-600">{new Date(meeting.date).toLocaleString('default', { month: 'short' })}</span>
                                                        <span className="text-lg font-bold text-gray-900 group-hover:text-holly-700">{new Date(meeting.date).getDate() + 1}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">{meeting.lessonName}</h4>
                                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                                            <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                                <Users size={12} /> {meeting.presentMemberIds.length} Presentes
                                                            </span>
                                                            <span>•</span>
                                                            <span>{meeting.totalMembers} Total</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-gray-300 group-hover:text-holly-600 transition-colors">
                                                    <ChevronRight size={20} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DiscipleshipAttendanceModal
                isOpen={isAttendanceModalOpen}
                onClose={() => setIsAttendanceModalOpen(false)}
                onSave={handleSaveAttendance}
                groupName={group.name}
                initialData={editingMeeting}
            />

            <AddMemberToDiscipleshipModal
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                onAdd={handleAddMember}
            />
        </div>
    );
};

export default DiscipleshipDetails;
