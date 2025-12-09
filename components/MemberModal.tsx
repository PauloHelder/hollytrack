
import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Calendar, Users, Camera } from 'lucide-react';
import { Member } from '../types';

interface MemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (member: Omit<Member, 'id'>) => void;
    member?: Member;
}

const MemberModal: React.FC<MemberModalProps> = ({ isOpen, onClose, onSave, member }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        joinDate: '',
        groups: [] as string[],
        status: 'Ativo' as 'Ativo' | 'Inativo',
        avatar: ''
    });

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name,
                email: member.email,
                phone: member.phone,
                joinDate: member.joinDate,
                groups: member.groups,
                status: member.status,
                avatar: member.avatar
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                joinDate: new Date().toISOString().split('T')[0],
                groups: [],
                status: 'Ativo',
                avatar: 'https://picsum.photos/200/200' // Default placeholder
            });
        }
    }, [member, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">
                        {member ? 'Editar Membro' : 'Novo Membro'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="flex justify-center mb-6">
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                                <img
                                    src={formData.avatar || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <User size={16} /> Nome Completo
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Mail size={16} /> E-mail
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Phone size={16} /> Telefone
                            </label>
                            <input
                                type="tel"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Calendar size={16} /> Data de Entrada
                            </label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                value={formData.joinDate}
                                onChange={e => setFormData({ ...formData, joinDate: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Users size={16} /> Grupos
                            </label>
                            <input
                                type="text"
                                placeholder="Separe por vírgula (ex: Jovens, Coral)"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                value={formData.groups.join(', ')}
                                onChange={e => setFormData({ ...formData, groups: e.target.value.split(',').map(s => s.trim()) })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Status</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as 'Ativo' | 'Inativo' })}
                            >
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
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
                            {member ? 'Salvar Alterações' : 'Cadastrar Membro'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemberModal;
