
import React, { useState } from 'react';
import { X, Calendar, BookOpen, Check } from 'lucide-react';

interface DiscipleshipAttendanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { id?: number; date: string; lessonName: string; presentMemberIds: number[] }) => void;
    groupName: string;
    initialData?: { id: number; date: string; lessonName: string; presentMemberIds: number[] } | null;
}

// Mock members for the attendance list
const MOCK_MEMBERS = [
    { id: 1, name: 'Participante 1', role: 'Membro Regular' },
    { id: 2, name: 'Participante 2', role: 'Membro Regular' },
    { id: 3, name: 'Participante 3', role: 'Membro Regular' },
    { id: 4, name: 'Participante 4', role: 'Membro Regular' },
    { id: 5, name: 'Participante 5', role: 'Membro Regular' },
];

const DiscipleshipAttendanceModal: React.FC<DiscipleshipAttendanceModalProps> = ({
    isOpen,
    onClose,
    onSave,
    groupName,
    initialData
}) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [lessonName, setLessonName] = useState('');
    const [presentMemberIds, setPresentMemberIds] = useState<number[]>([]);

    React.useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setDate(initialData.date);
                setLessonName(initialData.lessonName);
                setPresentMemberIds(initialData.presentMemberIds);
            } else {
                setDate(new Date().toISOString().split('T')[0]);
                setLessonName('');
                setPresentMemberIds([]);
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const toggleMemberPresence = (memberId: number) => {
        if (presentMemberIds.includes(memberId)) {
            setPresentMemberIds(presentMemberIds.filter(id => id !== memberId));
        } else {
            setPresentMemberIds([...presentMemberIds, memberId]);
        }
    };

    const toggleAll = () => {
        if (presentMemberIds.length === MOCK_MEMBERS.length) {
            setPresentMemberIds([]);
        } else {
            setPresentMemberIds(MOCK_MEMBERS.map(m => m.id));
        }
    };

    const handleSave = () => {
        onSave({ id: initialData?.id, date, lessonName, presentMemberIds });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Editar Frequência' : 'Registrar Frequência'}</h2>
                        <p className="text-sm text-gray-500">{groupName}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                    {/* Date and Lesson Inputs */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Calendar size={16} className="text-holly-600" />
                                Data do Encontro
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-holly-800 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <BookOpen size={16} className="text-holly-600" />
                                Tema / Aula
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Estudo sobre Oração, Aula 3..."
                                value={lessonName}
                                onChange={(e) => setLessonName(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-holly-800 transition-all"
                            />
                        </div>
                    </div>

                    {/* Members List */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">Lista de Presença</h3>
                            <button
                                onClick={toggleAll}
                                className="text-xs font-medium text-holly-700 hover:underline"
                            >
                                {presentMemberIds.length === MOCK_MEMBERS.length ? 'Desmarcar Todos' : 'Marcar Todos'}
                            </button>
                        </div>

                        <div className="space-y-2 border rounded-xl p-2 max-h-60 overflow-y-auto custom-scrollbar bg-gray-50">
                            {MOCK_MEMBERS.map(member => (
                                <div
                                    key={member.id}
                                    onClick={() => toggleMemberPresence(member.id)}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border
                                        ${presentMemberIds.includes(member.id)
                                            ? 'bg-white border-green-200 shadow-sm'
                                            : 'border-transparent hover:bg-gray-100'}
                                    `}
                                >
                                    <div className={`
                                        w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0
                                        ${presentMemberIds.includes(member.id)
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'border-gray-300 bg-white'}
                                    `}>
                                        {presentMemberIds.includes(member.id) && <Check size={12} strokeWidth={3} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                    </div>
                                    {presentMemberIds.includes(member.id) && (
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Presente</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-holly-700 text-white rounded-lg font-bold hover:bg-holly-800 transition-colors shadow-lg"
                    >
                        Salvar Chamada
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscipleshipAttendanceModal;
