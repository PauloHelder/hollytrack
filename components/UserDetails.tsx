
import React from 'react';
import { ChevronLeft, User, Mail, Shield, CheckCircle, Clock, Key } from 'lucide-react';
import { User as UserType } from '../types';

interface UserDetailsProps {
    user: UserType;
    onBack: () => void;
    onEdit: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onBack, onEdit }) => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
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
                    <div className="relative flex justify-between items-end -mt-12 mb-8">
                        <div className="flex items-end gap-6">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                <div className="flex items-center gap-3 text-gray-500 mt-1">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                        <Shield size={12} /> {user.role}
                                    </span>
                                    <span>•</span>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onEdit}
                            className="px-6 py-2.5 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm transition-colors"
                        >
                            Editar Dados
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Informações de Acesso</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                            <Mail size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">E-mail (Login)</p>
                                            <span className="font-medium">{user.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                            <Clock size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Último Acesso</p>
                                            <span className="font-medium">{user.lastAccess || 'Nunca acessou'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Segurança</h3>
                                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
                                            <Key size={16} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">Redefinir Senha</span>
                                    </div>
                                    <span className="text-xs text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Enviar Link</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Log de Atividades (Recente)</h3>

                                <div className="relative pl-6 border-l-2 border-gray-100 space-y-6 py-2">
                                    <div className="relative">
                                        <div className="absolute -left-[29px] top-0 w-4 h-4 bg-gray-200 rounded-full border-2 border-white shadow-sm"></div>
                                        <p className="text-sm text-gray-800">Login no sistema</p>
                                        <p className="text-xs text-gray-500">Hoje, 09:41</p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[29px] top-0 w-4 h-4 bg-gray-200 rounded-full border-2 border-white shadow-sm"></div>
                                        <p className="text-sm text-gray-800">Atualizou perfil de Membro: João Silva</p>
                                        <p className="text-xs text-gray-500">Ontem, 16:30</p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[29px] top-0 w-4 h-4 bg-gray-200 rounded-full border-2 border-white shadow-sm"></div>
                                        <p className="text-sm text-gray-800">Criou novo grupo de Discipulado</p>
                                        <p className="text-xs text-gray-500">08/12/2025, 14:20</p>
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

export default UserDetails;
