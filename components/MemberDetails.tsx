
import React from 'react';
import { ChevronLeft, Mail, Phone, Calendar, Users, MapPin, Clock, Shield } from 'lucide-react';
import { Member } from '../types';

interface MemberDetailsProps {
    member: Member;
    onBack: () => void;
    onEdit: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, onBack, onEdit }) => {
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
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
                                <div className="flex items-center gap-3 text-gray-500 mt-1">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${member.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Ativo' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {member.status}
                                    </span>
                                    <span>•</span>
                                    <span>Membro desde {member.joinDate}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onEdit}
                            className="px-6 py-2.5 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm transition-colors"
                        >
                            Editar Perfil
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="grid gap-4">
                                <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Contato</h3>

                                <div className="flex items-center gap-3 text-gray-600 group hover:text-holly-800 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-holly-50">
                                        <Mail size={20} className="text-gray-400 group-hover:text-holly-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400">Email</p>
                                        <p className="text-sm font-medium">{member.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600 group hover:text-holly-800 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-holly-50">
                                        <Phone size={20} className="text-gray-400 group-hover:text-holly-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400">Telefone</p>
                                        <p className="text-sm font-medium">{member.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600 group hover:text-holly-800 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-holly-50">
                                        <MapPin size={20} className="text-gray-400 group-hover:text-holly-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400">Endereço</p>
                                        <p className="text-sm font-medium">Rua das Flores, 123 - Centro</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Informações Eclesiásticas</h3>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                                        <Calendar size={20} className="text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400">Data de Batismo</p>
                                        <p className="text-sm font-medium">10/05/2015</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Activity & Groups */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Users size={20} className="text-holly-600" />
                                    Grupos e Ministérios
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {member.groups.map((group, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center gap-4 hover:border-holly-200 transition-colors">
                                            <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center text-xl font-bold text-holly-700">
                                                {group.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{group}</h4>
                                                <p className="text-xs text-gray-500">Membro Ativo</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="p-4 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center gap-2 text-gray-400 hover:border-holly-300 hover:text-holly-600 transition-colors">
                                        <Users size={20} />
                                        <span className="font-medium">Adicionar a Grupo</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock size={20} className="text-holly-600" />
                                    Histórico Recente
                                </h3>
                                <div className="relative border-l-2 border-gray-100 ml-3 space-y-6 pl-6 py-2">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full border-4 border-white bg-green-500 shadow-sm"></div>
                                        <p className="text-sm font-medium text-gray-900">Presente no Culto de Celebração</p>
                                        <p className="text-xs text-gray-500">Domingo, 19:00</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full border-4 border-white bg-blue-500 shadow-sm"></div>
                                        <p className="text-sm font-medium text-gray-900">Check-in no Ministério Infantil</p>
                                        <p className="text-xs text-gray-500">Domingo, 09:30</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full border-4 border-white bg-gray-300 shadow-sm"></div>
                                        <p className="text-sm font-medium text-gray-900">Atualização de Cadastro</p>
                                        <p className="text-xs text-gray-500">15/10/2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;
