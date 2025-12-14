import React, { useState, useEffect } from 'react';
import { Search, Calendar, GraduationCap, ArrowRight } from 'lucide-react';
import { useNewMemberClasses } from '../hooks/useNewMemberClasses';
import { useMembers } from '../hooks/useMembers';
import { NewMemberClass } from './NewMemberClassDetails';
import AddStudentToClassModal from './AddStudentToClassModal';

const ClassRegistrationPage = () => {
    const { fetchClasses, addStudent, loading } = useNewMemberClasses();
    const { addMember } = useMembers(); // Need full useMembers hook to add new member

    // We can't use useMembers inside addStudent logic easily without refactoring.
    // So we will replicate logic: create member, then add to class.

    const [searchTerm, setSearchTerm] = useState('');
    const [classes, setClasses] = useState<NewMemberClass[]>([]);
    const [selectedClass, setSelectedClass] = useState<NewMemberClass | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        const data = await fetchClasses();
        // Filter only "Em Andamento"
        setClasses(data.filter((c: any) => c.status === 'Em Andamento'));
    };

    const handleOpenRegister = (cls: NewMemberClass) => {
        setSelectedClass(cls);
        setIsModalOpen(true);
    };

    const handleRegister = async (studentData: { name: string; email: string; phone: string }) => {
        if (!selectedClass) return;

        try {
            // 1. Create member
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
                await addStudent(selectedClass.id, newMember.id);
                alert(`Inscrição realizada com sucesso na turma: ${selectedClass.name}`);
                setIsModalOpen(false);
                setSelectedClass(null);
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao realizar inscrição. Tente novamente.');
        }
    };

    const filteredClasses = classes.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20 px-4">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-4">
                        <GraduationCap size={48} className="text-holly-700" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Inscrição Novos Membros</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Selecione uma das turmas disponíveis abaixo para iniciar sua jornada de integração.
                    </p>
                </div>

                <div className="relative max-w-lg mx-auto w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar turma..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-holly-800 text-lg transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Carregando turmas...</div>
                ) : filteredClasses.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <GraduationCap className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma turma disponível</h3>
                        <p className="text-gray-500">No momento não há turmas com inscrições abertas.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredClasses.map((cls) => (
                            <div
                                key={cls.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-holly-50 p-3 rounded-xl text-holly-700 group-hover:bg-holly-600 group-hover:text-white transition-colors">
                                        <GraduationCap size={24} />
                                    </div>
                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
                                        Inscrições Abertas
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-holly-700 transition-colors">
                                    {cls.name}
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Calendar size={18} className="text-gray-400" />
                                        <span>Início: <strong>{new Date(cls.startDate).toLocaleDateString()}</strong></span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleOpenRegister(cls)}
                                    className="w-full py-3 bg-gray-50 hover:bg-holly-700 hover:text-white text-gray-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                                >
                                    Inscrever-se Agora
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AddStudentToClassModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleRegister}
            />
        </div>
    );
};

export default ClassRegistrationPage;
