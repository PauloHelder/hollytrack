
import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Users, Mail, Bell, Lock, Plus, Edit2, Trash2 } from 'lucide-react';

interface Role {
    id: number;
    name: string;
    description: string;
    usersCount: number;
    canManageMembers: boolean;
    canManageSchedules: boolean;
    canManageFinance: boolean;
}

const mockRoles: Role[] = [
    { id: 1, name: 'Pastor', description: 'Acesso total a todas as funcionalidades do sistema.', usersCount: 2, canManageMembers: true, canManageSchedules: true, canManageFinance: true },
    { id: 2, name: 'Supervisor', description: 'Gerencia departamentos e líderes.', usersCount: 5, canManageMembers: true, canManageSchedules: true, canManageFinance: false },
    { id: 3, name: 'Líder', description: 'Líder de célula ou ministério.', usersCount: 12, canManageMembers: true, canManageSchedules: true, canManageFinance: false },
    { id: 4, name: 'Conselheiro', description: 'Responsável pelo acompanhamento de membros.', usersCount: 8, canManageMembers: true, canManageSchedules: false, canManageFinance: false },
    { id: 5, name: 'Membro', description: 'Acesso básico ao perfil e agendas.', usersCount: 1500, canManageMembers: false, canManageSchedules: false, canManageFinance: false },
];

const Settings = () => {
    const [activeTab, setActiveTab] = useState('roles'); // Default to roles as requested
    const [roles, setRoles] = useState<Role[]>(mockRoles);

    const tabs = [
        { id: 'general', label: 'Geral', icon: SettingsIcon },
        { id: 'roles', label: 'Cargos e Permissões', icon: Shield },
        { id: 'notifications', label: 'Notificações', icon: Bell },
    ];

    const handleAddRole = () => {
        alert('Funcionalidade de adicionar cargo será implementada em breve.');
    };

    const handleDeleteRole = (id: number) => {
        if (confirm('Tem certeza que deseja remover este cargo?')) {
            setRoles(roles.filter(r => r.id !== id));
        }
    };

    return (
        <div className="p-4 md:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <SettingsIcon className="text-holly-800" />
                Configurações do Sistema
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${activeTab === tab.id
                                    ? 'bg-holly-50 text-holly-700 border border-holly-100'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    {activeTab === 'roles' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Perfis de Usuários</h3>
                                    <p className="text-sm text-gray-500">Gerencie os cargos e acessos do sistema</p>
                                </div>
                                <button
                                    onClick={handleAddRole}
                                    className="flex items-center gap-2 px-4 py-2 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm transition-colors text-sm"
                                >
                                    <Plus size={16} />
                                    Novo Cargo
                                </button>
                            </div>

                            <div className="grid gap-4">
                                {roles.map((role) => (
                                    <div key={role.id} className="border border-gray-200 rounded-lg p-4 hover:border-holly-200 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${role.name === 'Pastor' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    <Shield size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{role.name}</h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                                        <Users size={12} />
                                                        <span>{role.usersCount} usuários ativos</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteRole(role.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4">{role.description}</p>

                                        <div className="flex gap-2 flex-wrap">
                                            {role.canManageMembers && (
                                                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-100">Gestão de Membros</span>
                                            )}
                                            {role.canManageSchedules && (
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">Agendas</span>
                                            )}
                                            {role.canManageFinance && (
                                                <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-100">Financeiro</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'general' && (
                        <div className="text-center py-12 text-gray-500">
                            <SettingsIcon size={48} className="mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900">Configurações Gerais</h3>
                            <p>Opções gerais do sistema estarão disponíveis aqui.</p>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="text-center py-12 text-gray-500">
                            <Bell size={48} className="mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900">Notificações</h3>
                            <p>Gerenciamento de templates de e-mail e SMS.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
