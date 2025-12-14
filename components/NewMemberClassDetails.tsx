import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Users, QrCode, CheckCircle, Share2, Copy } from 'lucide-react';
import { Member, NewMemberClass, ClassLesson } from '../types';

import NewMemberAttendanceModal from './NewMemberAttendanceModal';
import AddStudentToClassModal from './AddStudentToClassModal';
import { useNewMemberClasses } from '../hooks/useNewMemberClasses';
import { useMembers } from '../hooks/useMembers';

interface NewMemberClassDetailsProps {
    classData: NewMemberClass;
    onBack: () => void;
}

const NewMemberClassDetails: React.FC<NewMemberClassDetailsProps> = ({ classData, onBack }) => {
    const [activeTab, setActiveTab] = useState<'lessons' | 'students'>('lessons');
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<ClassLesson | null>(null);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

    // Manage local state to support refreshing data
    const [currentClassData, setCurrentClassData] = useState<NewMemberClass>(classData);

    const { saveAttendance, addStudent, getAttendance, getClass } = useNewMemberClasses();
    const { addMember } = useMembers();

    // Refresh data on mount to ensure we see new students registered via public link
    useEffect(() => {
        refreshClassData();
        // Optional: Poll every 30 seconds if actively viewing?
        const interval = setInterval(refreshClassData, 30000);
        return () => clearInterval(interval);
    }, [classData.id]);

    const refreshClassData = async () => {
        try {
            const freshData = await getClass(classData.id);
            if (freshData) {
                // @ts-ignore
                setCurrentClassData(freshData);
            }
        } catch (e) {
            console.error("Failed to refresh class data", e);
        }
    };

    const handleOpenAttendance = async (lesson: ClassLesson) => {
        setSelectedLesson(lesson);
        setIsAttendanceModalOpen(true);
    };

    const handleSaveAttendance = async (lessonId: number, presentStudentIds: number[], summaryDoneStudentIds: number[]) => {
        try {
            await saveAttendance(lessonId, presentStudentIds, summaryDoneStudentIds);
            alert('Presença salva com sucesso!');
            refreshClassData(); // Refresh after save
        } catch (e) {
            alert('Erro ao salvar presença');
        }
    };

    const handleAddStudent = async (studentData: { name: string; email: string; phone: string }) => {
        try {
            // 1. Create member first
            const newMember = await addMember({
                name: studentData.name,
                email: studentData.email,
                phone: studentData.phone,
                joinDate: new Date().toISOString().split('T')[0],
                status: 'Ativo',
                groups: [],
                avatar: `https://ui-avatars.com/api/?name=${studentData.name}&background=random`
            });

            if (newMember) {
                // 2. Add to class
                await addStudent(currentClassData.id, newMember.id);
                alert('Aluno adicionado com sucesso!');
                refreshClassData(); // Refresh list immediately
            }
        } catch (e) {
            console.error(e);
            alert('Erro ao adicionar aluno.');
        }
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
                            <h1 className="text-2xl font-bold text-gray-900">{currentClassData.name}</h1>
                            <p className="text-gray-500 flex items-center gap-2 mt-1">
                                <Calendar size={16} />
                                Início: {new Date(currentClassData.startDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-holly-50 text-holly-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                                <Users size={18} />
                                {currentClassData.students.length} Alunos
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
                </div>

                <div className="p-8">
                    {activeTab === 'lessons' && (
                        <div className="space-y-4">
                            {currentClassData.lessons.map((lesson, index) => (
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
                                            Frequência
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'students' && (
                        <div className="space-y-4">
                            {currentClassData.students.length > 0 ? (
                                currentClassData.students.map((student) => (
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
                </div>
            </div>

            <NewMemberAttendanceModal
                isOpen={isAttendanceModalOpen}
                onClose={() => setIsAttendanceModalOpen(false)}
                onSave={handleSaveAttendance}
                lesson={selectedLesson}
                students={currentClassData.students}
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
