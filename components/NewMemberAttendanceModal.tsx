
import React, { useState, useEffect } from 'react';
import { X, Calendar, Check, Search, User } from 'lucide-react';
import { Member } from '../types';
import { ClassLesson } from './NewMemberClassDetails';

interface NewMemberAttendanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (lessonId: number, presentStudentIds: number[], summaryDoneStudentIds: number[]) => void;
    lesson: ClassLesson | null;
    students: Member[];
}

const NewMemberAttendanceModal: React.FC<NewMemberAttendanceModalProps> = ({ isOpen, onClose, onSave, lesson, students }) => {
    const [presentStudentIds, setPresentStudentIds] = useState<number[]>([]);
    const [summaryDoneStudentIds, setSummaryDoneStudentIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (isOpen && lesson) {
            // In a real app, you would fetch existing attendance for this lesson here
            setPresentStudentIds([]);
            setSummaryDoneStudentIds([]); // Reset summaries as well
        }
    }, [isOpen, lesson]);

    if (!isOpen || !lesson) return null;

    const togglePresence = (studentId: number) => {
        if (presentStudentIds.includes(studentId)) {
            setPresentStudentIds(presentStudentIds.filter(id => id !== studentId));
        } else {
            setPresentStudentIds([...presentStudentIds, studentId]);
        }
    };

    const toggleSummary = (e: React.MouseEvent, studentId: number) => {
        e.stopPropagation();
        if (summaryDoneStudentIds.includes(studentId)) {
            setSummaryDoneStudentIds(summaryDoneStudentIds.filter(id => id !== studentId));
        } else {
            setSummaryDoneStudentIds([...summaryDoneStudentIds, studentId]);
        }
    };

    const markAll = () => {
        setPresentStudentIds(students.map(s => s.id));
    };

    const unmarkAll = () => {
        setPresentStudentIds([]);
        setSummaryDoneStudentIds([]);
    };

    const handleSave = () => {
        onSave(lesson.id, presentStudentIds, summaryDoneStudentIds);
        onClose();
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Registrar Presença</h2>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <Calendar size={14} />
                            {lesson.title} - {new Date(lesson.date).toLocaleDateString()}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 border-b border-gray-100 bg-white">
                    <div className="flex gap-2 mb-3">
                        <button onClick={markAll} className="text-xs font-medium text-holly-700 hover:bg-holly-50 px-3 py-1.5 rounded-lg transition-colors">
                            Marcar Todos
                        </button>
                        <button onClick={unmarkAll} className="text-xs font-medium text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                            Desmarcar Todos
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar aluno..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-800"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                    {filteredStudents.length > 0 ? (
                        <div className="space-y-1">
                            {filteredStudents.map(student => (
                                <div
                                    key={student.id}
                                    onClick={() => togglePresence(student.id)}
                                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${presentStudentIds.includes(student.id)
                                        ? 'bg-holly-50 border-holly-200'
                                        : 'bg-white border-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${presentStudentIds.includes(student.id) ? 'border-holly-500 bg-holly-100 text-holly-700' : 'border-gray-200 bg-gray-50 text-gray-400'
                                            }`}>
                                            {student.avatar ? (
                                                <img src={student.avatar} alt={student.name} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <User size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <p className={`font-medium ${presentStudentIds.includes(student.id) ? 'text-holly-900' : 'text-gray-900'}`}>{student.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={summaryDoneStudentIds.includes(student.id)}
                                                onChange={(e) => toggleSummary(e as any, student.id)}
                                                className="w-4 h-4 text-holly-600 rounded border-gray-300 focus:ring-holly-500"
                                            />
                                            <span>Fez resumo</span>
                                        </label>
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${presentStudentIds.includes(student.id)
                                            ? 'bg-holly-600 border-holly-600 text-white'
                                            : 'border-gray-300 bg-white'
                                            }`}>
                                            {presentStudentIds.includes(student.id) && <Check size={14} strokeWidth={3} />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            Nenhum aluno encontrado.
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        <strong className="text-gray-900">{presentStudentIds.length}</strong> presentes
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-holly-700 text-white rounded-lg font-bold hover:bg-holly-800 transition-colors shadow-lg"
                        >
                            Salvar Presença
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewMemberAttendanceModal;
