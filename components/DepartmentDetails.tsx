
import React, { useState } from 'react';
import { ChevronLeft, Building2, User, Users, Calendar, MapPin, Edit2, Plus } from 'lucide-react';
import { Department } from '../types';
import AddMemberToDepartmentModal from './AddMemberToDepartmentModal';

interface DepartmentDetailsProps {
    department: Department;
    onBack: () => void;
    onEdit: () => void;
}

const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({ department, onBack, onEdit }) => {
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const handleAddMembers = (memberIds: number[]) => {
        console.log("Adding members:", memberIds);
        // Here you would implement the actual logic to add members to the department
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
                            <div className="w-32 h-32 bg-white rounded-xl shadow-lg border-4 border-white flex items-center justify-center text-holly-700">
                                <Building2 size={48} />
                            </div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{department.name}</h1>
                                <p className="text-gray-500 mt-1 max-w-2xl text-sm">{department.description}</p>
                            </div>
                        </div>
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-2 px-6 py-2.5 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm transition-colors"
                        >
                            <Edit2 size={18} />
                            Editar
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Stats Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
                                <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-2">Informações Gerais</h3>

                                <div className="flex items-start gap-4">
                                    <User className="text-gray-400 mt-1" size={20} />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Líder</p>
                                        <p className="font-medium text-gray-900">{department.leader}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Users className="text-gray-400 mt-1" size={20} />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Membros</p>
                                        <p className="font-medium text-gray-900">{department.membersCount} Membros</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Calendar className="text-gray-400 mt-1" size={20} />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Reuniões</p>
                                        <p className="font-medium text-gray-900">{department.nextMeeting}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h3 className="font-semibold text-blue-900 mb-2">Próximo Encontro</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-center bg-white rounded-lg p-2 min-w-[60px] shadow-sm">
                                        <span className="block text-xs text-gray-500 font-bold uppercase">SET</span>
                                        <span className="block text-xl font-bold text-blue-600">12</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Reunião Geral</p>
                                        <p className="text-sm text-gray-600">Domingo, 19:00</p>
                                    </div>
                                </div>
                                <button className="w-full py-2 bg-white text-blue-600 font-medium rounded-lg text-sm hover:bg-blue-50 border border-blue-200 transition-colors">
                                    Ver Calendário
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                                    <span>Equipe de Membros</span>
                                    <button
                                        onClick={() => setIsAddMemberModalOpen(true)}
                                        className="text-sm bg-holly-50 text-holly-700 px-3 py-1.5 rounded-lg font-bold hover:bg-holly-100 transition-colors flex items-center gap-1"
                                    >
                                        <Plus size={16} />
                                        Adicionar Membro
                                    </button>
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Mock Members */}
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                                            <div>
                                                <p className="font-medium text-gray-900">Membro Exemplo {i}</p>
                                                <p className="text-xs text-gray-500">Líder: Pr. Lucas</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Mural de Avisos</h3>
                                <div className="border border-gray-200 rounded-xl p-6 text-center text-gray-500 bg-gray-50 border-dashed">
                                    <p>Nenhum aviso importante fixado no momento.</p>
                                    <button className="mt-2 text-holly-700 font-medium text-sm hover:underline">Criar Novo Aviso</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddMemberToDepartmentModal
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                onAdd={handleAddMembers}
            />
        </div>
    );
};

export default DepartmentDetails;
