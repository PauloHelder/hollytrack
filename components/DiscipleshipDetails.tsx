
import React from 'react';
import { ChevronLeft, UsersRound, User, Clock, MapPin, Calendar, CheckSquare, Edit2, Users } from 'lucide-react';
import { DiscipleshipGroup } from '../types';

interface DiscipleshipDetailsProps {
    group: DiscipleshipGroup;
    onBack: () => void;
    onEdit: () => void;
}

const DiscipleshipDetails: React.FC<DiscipleshipDetailsProps> = ({ group, onBack, onEdit }) => {
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
                <div className="bg-gradient-to-r from-holly-700 to-holly-500 p-8 text-white flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/10">{group.targetAudience}</span>
                            <span className="flex items-center gap-1 text-xs text-white/80">
                                <Users size={14} /> {group.membersCount} participantes
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
                        <div className="flex items-center gap-2 text-white/90">
                            <User size={16} />
                            <span>Líder: <strong>{group.leader}</strong></span>
                        </div>
                    </div>
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 flex items-center gap-2 transition-colors"
                    >
                        <Edit2 size={16} /> Editar
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
                                    <span className="font-bold text-gray-900">14 de Dezembro</span>
                                </div>
                                <button className="w-full py-2 bg-holly-700 text-white rounded-lg text-sm font-medium hover:bg-holly-800 transition-colors">
                                    Realizar Chamada
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <UsersRound className="text-holly-600" />
                                Membros do Grupo
                            </h2>
                            <button className="text-sm text-holly-700 font-medium hover:underline">
                                Adicionar Participante
                            </button>
                        </div>

                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">Participante {i}</p>
                                            <p className="text-xs text-gray-500">Membro Regular</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-gray-400 hover:text-holly-700 bg-white border border-gray-200 rounded-lg hover:border-holly-200" title="Marcar Presença">
                                            <CheckSquare size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="p-3 text-center">
                                <button className="text-sm text-gray-500 hover:text-gray-700">Ver lista completa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscipleshipDetails;
