
import React, { useState } from 'react';
import { ChevronLeft, Calendar, Users, QrCode, CheckCircle, Share2, Copy } from 'lucide-react';
import { Member } from '../types';

import NewMemberAttendanceModal from './NewMemberAttendanceModal';
import AddStudentToClassModal from './AddStudentToClassModal';

export interface ClassLesson {
    id: number;
    title: string;
    date: string;
    completed: boolean;
    attendanceCount: number;
}

export interface NewMemberClass {
    id: number;
    name: string;
    startDate: string;
    lessons: ClassLesson[];
    students: Member[];
}

interface NewMemberClassDetailsProps {
    classData: NewMemberClass;
    onBack: () => void;
}

const NewMemberClassDetails: React.FC<NewMemberClassDetailsProps> = ({ classData, onBack }) => {
    const [activeTab, setActiveTab] = useState<'lessons' | 'students' | 'invite'>('lessons');
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<ClassLesson | null>(null);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

    // Simple QR Code API URL
    const baseUrl = window.location.origin + window.location.pathname + '#/register/class/' + classData.id;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(baseUrl)}`;
    const inviteLink = baseUrl;

    const copyLink = () => {
        navigator.clipboard.writeText(inviteLink);
        alert('Link copiado!');
    };

    const handleOpenAttendance = (lesson: ClassLesson) => {
        setSelectedLesson(lesson);
        setIsAttendanceModalOpen(true);
    };

    const handleSaveAttendance = (lessonId: number, presentStudentIds: number[], summaryDoneStudentIds: number[]) => {
        console.log(`Saving attendance for lesson ${lessonId}`, presentStudentIds, "Summaries:", summaryDoneStudentIds);
        // Implement logic to update lesson status and attendance count
        // For demonstration purposes, we're just logging it
        // In a real app, you'd probably pass a callback to the parent to update state or call an API
    };

    const handleAddStudent = (studentData: { name: string; email: string; phone: string }) => {
        console.log("Adding student:", studentData);
        // Implement logic to add student to class
        // In a real app, pass callback to parent
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-holly-800 mb-6 transition-colors"
            >
                <ChevronLeft size={20} />
                Voltar para a lista
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-8 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{classData.name}</h1>
                            <p className="text-gray-500 flex items-center gap-2 mt-1">
                                <Calendar size={16} />
                                Início: {new Date(classData.startDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-holly-50 text-holly-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                                <Users size={18} />
                                {classData.students.length} Alunos
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('lessons')}
                        className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'lessons' ? 'border-holly-600 text-holly-700' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Aulas (8)
                    </button>
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'students' ? 'border-holly-600 text-holly-700' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Alunos
                    </button>
                    <button
                        onClick={() => setActiveTab('invite')}
                        className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'invite' ? 'border-holly-600 text-holly-700' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Link / QR Code
                    </button>
                </div>

                <div className="p-8">
                    {activeTab === 'lessons' && (
                        <div className="space-y-4">
                            {classData.lessons.map((lesson, index) => (
                                <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${lesson.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                                            <p className="text-sm text-gray-500">{new Date(lesson.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm text-gray-500">
                                            {lesson.attendanceCount} presentes
                                        </div>
                                        <button
                                            onClick={() => handleOpenAttendance(lesson)}
                                            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-holly-300 hover:text-holly-700 transition-colors"
                                        >
                                            Presença
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'students' && (
                        <div className="space-y-4">
                            {classData.students.length > 0 ? (
                                classData.students.map((student) => (
                                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <img src={student.avatar || `https://ui-avatars.com/api/?name=${student.name}`} alt={student.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-gray-900">{student.name}</p>
                                                <p className="text-sm text-gray-500">{student.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600">
                                                {student.status || 'Inscrito'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    Nenhum aluno cadastrado nesta turma ainda.
                                </div>
                            )}
                            <button
                                onClick={() => setIsAddStudentModalOpen(true)}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-holly-400 hover:text-holly-700 transition-colors"
                            >
                                Adicionar Aluno Manualmente
                            </button>
                        </div>
                    )}

                    {activeTab === 'invite' && (
                        <div className="flex flex-col items-center justify-center py-8 space-y-6">
                            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                                <img src={qrCodeUrl} alt="QR Code for Registration" className="w-48 h-48" />
                            </div>
                            <div className="text-center max-w-md">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Auto-cadastro de Alunos</h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    Compartilhe este QR Code ou o link abaixo para que os alunos se cadastrem diretamente nesta turma.
                                </p>

                                <div className="flex items-center gap-2 w-full">
                                    <input
                                        type="text"
                                        readOnly
                                        value={inviteLink}
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none"
                                    />
                                    <button
                                        onClick={copyLink}
                                        className="p-2 bg-holly-100 text-holly-700 rounded-lg hover:bg-holly-200 transition-colors"
                                        title="Copiar Link"
                                    >
                                        <Copy size={20} />
                                    </button>
                                    <button
                                        className="p-2 bg-holly-700 text-white rounded-lg hover:bg-holly-800 transition-colors"
                                        title="Compartilhar"
                                    >
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <NewMemberAttendanceModal
                isOpen={isAttendanceModalOpen}
                onClose={() => setIsAttendanceModalOpen(false)}
                onSave={handleSaveAttendance}
                lesson={selectedLesson}
                students={classData.students}
            />

            <AddStudentToClassModal
                isOpen={isAddStudentModalOpen}
                onClose={() => setIsAddStudentModalOpen(false)}
                onAdd={handleAddStudent}
            />
        </div>
    );
};

export default NewMemberClassDetails;
