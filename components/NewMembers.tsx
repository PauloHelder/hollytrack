
import React, { useState } from 'react';
import { Search, Plus, Calendar, GraduationCap, Users } from 'lucide-react';
import NewMemberClassModal from './NewMemberClassModal';
import NewMemberClassDetails, { NewMemberClass } from './NewMemberClassDetails';

const NewMembers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingClass, setViewingClass] = useState<NewMemberClass | null>(null);

    // Mock Data
    const [classes, setClasses] = useState<NewMemberClass[]>([
        {
            id: 1,
            name: 'Turma Agosto/2024',
            startDate: '2024-08-01',
            students: [
                { id: 1, name: 'João Silva', email: 'joao@email.com' } as any,
                { id: 2, name: 'Maria Souza', email: 'maria@email.com' } as any
            ],
            lessons: Array.from({ length: 8 }).map((_, i) => ({
                id: i + 1,
                title: `Aula ${i + 1}: Fundamentos ${i + 1}`,
                date: new Date(2024, 7, 1 + (i * 7)).toISOString(),
                completed: i < 2,
                attendanceCount: i < 2 ? 2 : 0
            }))
        }
    ]);

    const handleCreateClass = (data: { name: string; startDate: string }) => {
        const startDateObj = new Date(data.startDate);
        const newLessons = Array.from({ length: 8 }).map((_, i) => {
            const lessonDate = new Date(startDateObj);
            lessonDate.setDate(startDateObj.getDate() + (i * 7)); // Weekly lessons

            return {
                id: Date.now() + i,
                title: `Aula ${i + 1}: Tema a definir`,
                date: lessonDate.toISOString(),
                completed: false,
                attendanceCount: 0
            };
        });

        const newClass: NewMemberClass = {
            id: Date.now(),
            name: data.name,
            startDate: data.startDate,
            students: [],
            lessons: newLessons
        };

        setClasses([newClass, ...classes]);
        setIsModalOpen(false);
    };

    if (viewingClass) {
        return <NewMemberClassDetails classData={viewingClass} onBack={() => setViewingClass(null)} />;
    }

    return (
        <div className="p-4 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <GraduationCap className="text-holly-800" />
                    Novos Membros - Turmas
                </h2>
                <div className="flex items-center gap-3">
                    {/* Search - Visual only for now */}
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar turma..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-800 w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm transition-colors"
                    >
                        <Plus size={18} />
                        <span className="hidden md:inline">Nova Turma</span>
                        <span className="md:hidden">Nova</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                    <div
                        key={cls.id}
                        onClick={() => setViewingClass(cls)}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-holly-50 rounded-lg flex items-center justify-center text-holly-700 group-hover:bg-holly-100 transition-colors">
                                <GraduationCap size={24} />
                            </div>
                            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded">
                                Em Andamento
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">{cls.name}</h3>

                        <div className="space-y-2 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                Início: {new Date(cls.startDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={16} />
                                {cls.students.length} Alunos matriculados
                            </div>
                        </div>

                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-holly-600 h-full rounded-full"
                                style={{ width: `${(cls.lessons.filter(l => l.completed).length / 8) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>Progresso</span>
                            <span>{cls.lessons.filter(l => l.completed).length}/8 Aulas</span>
                        </div>
                    </div>
                ))}
            </div>

            <NewMemberClassModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateClass}
            />
        </div>
    );
};

export default NewMembers;
