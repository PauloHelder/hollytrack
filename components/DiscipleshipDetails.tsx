
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, UsersRound, User, Clock, MapPin, Calendar, CheckSquare, Edit2, Users, CalendarCheck, ChevronRight, ChevronDown, Trash2 } from 'lucide-react';
import { DiscipleshipGroup, Member } from '../types';
import DiscipleshipAttendanceModal from './DiscipleshipAttendanceModal';
import AddMemberToDiscipleshipModal from './AddMemberToDiscipleshipModal';
import { useDiscipleships } from '../hooks/useDiscipleships';

interface DiscipleshipDetailsProps {
    group: DiscipleshipGroup;
    onBack: () => void;
    onEdit: () => void;
}

const DiscipleshipDetails: React.FC<DiscipleshipDetailsProps> = ({ group, onBack, onEdit }) => {
    const { addMembersToGroup, getGroupMembers, removeMemberFromGroup, saveSession, getGroupSessions } = useDiscipleships();
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

    // History State
    const [history, setHistory] = useState<{ id: number; date: string; lessonName: string; presentMemberIds: (string | number)[]; totalMembers: number }[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    const [editingMeeting, setEditingMeeting] = useState<{ id: number; date: string; lessonName: string; presentMemberIds: (string | number)[] } | null>(null);
    const [isMembersExpanded, setIsMembersExpanded] = useState(true);
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    // State for members
    const [groupMembers, setGroupMembers] = useState<(Member & { role: string })[]>([]);
    const [loadingMembers, setLoadingMembers] = useState(false);

    const loadMembers = useCallback(async () => {
        try {
            setLoadingMembers(true);
            const members = await getGroupMembers(group.id);
            // Map the response to fit Member type correctly if necessary
            const mappedMembers = members.map((m: any) => ({
                id: m.id,
                name: m.name,
                email: m.email,
                avatar: m.avatar_url,
                role: m.role,
                // Default props if missing
                groups: [],
                joinDate: '',
                status: 'Ativo',
                phone: ''
            }));
            setGroupMembers(mappedMembers);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingMembers(false);
        }
    }, [group.id, getGroupMembers]);

    const loadHistory = useCallback(async () => {
        try {
            setLoadingHistory(true);
            const sessions = await getGroupSessions(group.id);
            const mappedHistory = sessions.map((s: any) => ({
                ...s,
                totalMembers: groupMembers.length // Using current member count as proxy
            }));
            setHistory(mappedHistory);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingHistory(false);
        }
    }, [group.id, getGroupSessions, groupMembers.length]);

    useEffect(() => {
        loadMembers();
    }, [loadMembers]);

    useEffect(() => {
        if (groupMembers.length > 0 || history.length === 0) {
            loadHistory(); // Load history initially or when members might have updated counts
        }
    }, [loadHistory, groupMembers.length]);

    const handleOpenAttendanceModal = (meeting?: typeof editingMeeting) => {
        if (meeting) {
            setEditingMeeting(meeting);
        } else {
            setEditingMeeting(null);
        }
        setIsAttendanceModalOpen(true);
    };

    const handleSaveAttendance = async (data: { id?: number; date: string; lessonName: string; presentMemberIds: (string | number)[] }) => {
        try {
            await saveSession(group.id, data);
            await loadHistory();
            setIsAttendanceModalOpen(false);
        } catch (error) {
            alert('Erro ao salvar chamada.');
        }
    };

    const handleAddMember = async (selectedMemberIds: (string | number)[]) => {
        try {
            await addMembersToGroup(group.id, selectedMemberIds);
            await loadMembers();
            setIsAddMemberModalOpen(false);
        } catch (error) {
            alert('Erro ao adicionar membros.');
        }
    };

    const handleRemoveMember = async (memberId: string | number) => {
        if (confirm('Tem certeza que deseja remover este membro do grupo?')) {
            try {
                await removeMemberFromGroup(group.id, memberId);
                setGroupMembers(current => current.filter(m => m.id !== memberId));
            } catch (error) {
                alert('Erro ao remover membro.');
            }
        }
    };

    const getNextMeetingDate = (dayName: string) => {
        if (!dayName) return 'Data a definir';

        const days: { [key: string]: number } = {
            'domingo': 0,
            'segunda': 1, 'segunda-feira': 1,
            'terça': 2, 'terça-feira': 2, 'terca': 2, 'terca-feira': 2,
            'quarta': 3, 'quarta-feira': 3,
            'quinta': 4, 'quinta-feira': 4,
            'sexta': 5, 'sexta-feira': 5,
            'sábado': 6, 'sabado': 6
        };

        const targetDay = days[dayName.toLowerCase().trim()];
        if (targetDay === undefined) return dayName; // Fallback if format is weird

        const now = new Date();
        const currentDay = now.getDay();

        let daysUntil = targetDay - currentDay;
        // If today is the day, assume it's today (0 days until). 
        // If passed, next week (handled by logic below? No, logic below: -1 + 7 = 6).
        if (daysUntil < 0) daysUntil += 7;

        const nextDate = new Date(now);
        nextDate.setDate(now.getDate() + daysUntil);

        return nextDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
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
                                        <Users size={14} /> {groupMembers.length} participantes
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
                                        <span className="font-bold text-gray-900">{getNextMeetingDate(group.meetingDay)}</span>
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
                                    Membros do Grupo ({groupMembers.length})
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
                                    {loadingMembers ? (
                                        <div className="text-center py-4 text-gray-500">Carregando membros...</div>
                                    ) : groupMembers.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500">Nenhum membro no grupo.</div>
                                    ) : (
                                        groupMembers.map((member) => (
                                            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                                        {member.avatar ? (
                                                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                                                {member.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{member.name}</p>
                                                        <p className="text-xs text-gray-500">{member.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleRemoveMember(member.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 bg-white border border-gray-200 rounded-lg hover:border-red-200"
                                                        title="Remover do Grupo"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <div className="p-3 text-center">
                                        <button className="text-sm text-gray-500 hover:text-gray-700">Ver lista completa</button>
                                    </div>
                                </div>
                            )}


                            {/* Separator - Only visible if members section is expanded or explicitly requested */}
                            <div className="my-8 border-t border-gray-100"></div>

                            {/* Meeting History Section - Keeping Mocked for now */}
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
                                        {loadingHistory ? (
                                            <div className="text-center py-4 text-gray-500">Carregando histórico...</div>
                                        ) : history.length === 0 ? (
                                            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <p className="text-gray-500">Nenhum encontro registrado ainda.</p>
                                                <button
                                                    onClick={() => handleOpenAttendanceModal()}
                                                    className="mt-2 text-holly-700 font-medium hover:underline"
                                                >
                                                    Registrar primeiro encontro
                                                </button>
                                            </div>
                                        ) : (
                                            history.map((meeting) => (
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
                                            )))
                                        }
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
                members={groupMembers}
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
