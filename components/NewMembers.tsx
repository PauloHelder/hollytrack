import React, { useState, useEffect } from 'react';
import { Search, Plus, Calendar, GraduationCap, Users, Edit2, QrCode, X, Copy, Share2 } from 'lucide-react';
import NewMemberClassModal from './NewMemberClassModal';
import NewMemberClassDetails, { NewMemberClass } from './NewMemberClassDetails';
import { useNewMemberClasses } from '../hooks/useNewMemberClasses';

const NewMembers = () => {
    const { fetchClasses, createClass, updateClass, loading } = useNewMemberClasses();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<NewMemberClass | undefined>(undefined);
    const [viewingClass, setViewingClass] = useState<NewMemberClass | null>(null);
    const [classes, setClasses] = useState<NewMemberClass[]>([]);

    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        const data = await fetchClasses();
        setClasses(data);
    };

    const handleSaveClass = async (data: { name: string; startDate: string; status: 'Em Andamento' | 'Concluída' | 'Cancelada' }) => {
        try {
            if (editingClass) {
                await updateClass(editingClass.id, data);
            } else {
                await createClass(data.name, data.startDate, data.status);
            }
            await loadClasses();
            setIsModalOpen(false);
            setEditingClass(undefined);
        } catch (error) {
            alert('Erro ao salvar turma');
        }
    };

    const openEditModal = (e: React.MouseEvent, cls: NewMemberClass) => {
        e.stopPropagation();
        setEditingClass(cls);
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setEditingClass(undefined);
        setIsModalOpen(true);
    };

    if (viewingClass) {
        return <NewMemberClassDetails classData={viewingClass} onBack={() => { setViewingClass(null); loadClasses(); }} />;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Em Andamento': return 'bg-green-100 text-green-700';
            case 'Concluída': return 'bg-blue-100 text-blue-700';
            case 'Cancelada': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.origin + '/#/inscricao-novos-membros')}`;
    const inviteLink = window.location.origin + '/#/inscricao-novos-membros';

    return (
        <div className="p-4 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <GraduationCap className="text-holly-800" />
                    Novos Membros - Turmas
                </h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowQR(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium shadow-sm transition-colors text-sm"
                    >
                        <QrCode size={16} />
                        QR Code
                    </button>
                    <button
                        onClick={() => window.open('#/inscricao-novos-membros', '_blank')}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-holly-700 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium shadow-sm transition-colors text-sm"
                    >
                        <GraduationCap size={16} />
                        Página de Inscrição
                    </button>
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
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-4 py-2 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm transition-colors"
                    >
                        <Plus size={18} />
                        <span className="hidden md:inline">Nova Turma</span>
                        <span className="md:hidden">Nova</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((cls) => (
                    <div
                        key={cls.id}
                        onClick={() => setViewingClass(cls)}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer group relative"
                    >
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => openEditModal(e, cls)}
                                className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-500 hover:text-holly-700 hover:border-holly-300 transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-holly-50 rounded-lg flex items-center justify-center text-holly-700 group-hover:bg-holly-100 transition-colors">
                                <GraduationCap size={24} />
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(cls.status)}`}>
                                {cls.status}
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
                onSave={handleSaveClass}
                classData={editingClass}
            />

            {showQR && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <QrCode className="text-holly-700" size={24} />
                                QR Code de Inscrição
                            </h2>
                            <button onClick={() => setShowQR(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-8 flex flex-col items-center gap-6">
                            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                                <img src={qrCodeUrl} alt="QR Code for Registration" className="w-56 h-56" />
                            </div>
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Escaneie para acessar a página de inscrição de turmas.
                                </p>
                                <div className="flex items-center gap-2 w-full bg-gray-50 p-2 rounded-lg border border-gray-200">
                                    <input
                                        type="text"
                                        readOnly
                                        value={inviteLink}
                                        className="flex-1 bg-transparent text-sm text-gray-600 focus:outline-none"
                                    />
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(inviteLink);
                                            alert('Link copiado!');
                                        }}
                                        className="p-1.5 text-holly-700 hover:bg-holly-100 rounded-md transition-colors"
                                        title="Copiar Link"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewMembers;
