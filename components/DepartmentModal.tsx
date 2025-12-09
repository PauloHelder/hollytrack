
import React, { useState, useEffect } from 'react';
import { X, Building2, User, Users, AlignLeft, Calendar } from 'lucide-react';
import { Department } from '../types';

interface DepartmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (dept: Omit<Department, 'id'>) => void;
    department?: Department;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({ isOpen, onClose, onSave, department }) => {
    const [formData, setFormData] = useState({
        name: '',
        leader: '',
        membersCount: 0,
        description: '',
        nextMeeting: '',
        budget: ''
    });

    useEffect(() => {
        if (department) {
            setFormData({
                name: department.name,
                leader: department.leader,
                membersCount: department.membersCount,
                description: department.description,
                nextMeeting: department.nextMeeting,
                budget: department.budget || ''
            });
        } else {
            setFormData({
                name: '',
                leader: '',
                membersCount: 0,
                description: '',
                nextMeeting: '',
                budget: ''
            });
        }
    }, [department, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Building2 className="text-holly-700" size={24} />
                        {department ? 'Editar Departamento' : 'Novo Departamento'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nome do Departamento</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                placeholder="Ex: Ministério Infantil"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Líder Responsável</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                placeholder="Nome do líder"
                                value={formData.leader}
                                onChange={e => setFormData({ ...formData, leader: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Membros Atuais</label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                    value={formData.membersCount}
                                    onChange={e => setFormData({ ...formData, membersCount: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Próxima Reunião</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                    placeholder="Ex: Seg, 19h"
                                    value={formData.nextMeeting}
                                    onChange={e => setFormData({ ...formData, nextMeeting: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Descrição</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-3 top-3 text-gray-400" size={18} />
                            <textarea
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500 min-h-[100px]"
                                placeholder="Descreva o propósito e atividades deste departamento..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-holly-700 text-white rounded-lg hover:bg-holly-800 font-medium shadow-sm"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DepartmentModal;
