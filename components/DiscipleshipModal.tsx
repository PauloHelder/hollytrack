
import React, { useState, useEffect } from 'react';
import { X, UsersRound, User, MapPin, Clock, Calendar, Users } from 'lucide-react';
import { DiscipleshipGroup } from '../types';

interface DiscipleshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (group: Omit<DiscipleshipGroup, 'id'>) => void;
    group?: DiscipleshipGroup;
}

const DiscipleshipModal: React.FC<DiscipleshipModalProps> = ({ isOpen, onClose, onSave, group }) => {
    const [formData, setFormData] = useState({
        name: '',
        leader: '',
        meetingDay: '',
        meetingTime: '',
        location: '',
        membersCount: 0,
        targetAudience: ''
    });

    useEffect(() => {
        if (group) {
            setFormData({
                name: group.name,
                leader: group.leader,
                meetingDay: group.meetingDay,
                meetingTime: group.meetingTime,
                location: group.location,
                membersCount: group.membersCount,
                targetAudience: group.targetAudience
            });
        } else {
            setFormData({
                name: '',
                leader: '',
                meetingDay: '',
                meetingTime: '',
                location: '',
                membersCount: 0,
                targetAudience: ''
            });
        }
    }, [group, isOpen]);

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
                        <UsersRound className="text-holly-700" size={24} />
                        {group ? 'Editar Grupo' : 'Novo Grupo de Discipulado'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nome do Grupo</label>
                        <div className="relative">
                            <UsersRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                placeholder="Ex: Jovens em Cristo"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Líder do Grupo</label>
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
                            <label className="text-sm font-medium text-gray-700">Dia da Reunião</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500 appearance-none bg-white"
                                    value={formData.meetingDay}
                                    onChange={e => setFormData({ ...formData, meetingDay: e.target.value })}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Segunda-feira">Segunda-feira</option>
                                    <option value="Terça-feira">Terça-feira</option>
                                    <option value="Quarta-feira">Quarta-feira</option>
                                    <option value="Quinta-feira">Quinta-feira</option>
                                    <option value="Sexta-feira">Sexta-feira</option>
                                    <option value="Sábado">Sábado</option>
                                    <option value="Domingo">Domingo</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Horário</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="time"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                    value={formData.meetingTime}
                                    onChange={e => setFormData({ ...formData, meetingTime: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Local</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                placeholder="Ex: Sala 3 ou Casa do Líder"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Participantes</label>
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
                            <label className="text-sm font-medium text-gray-700">Público Alvo</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-500"
                                placeholder="Ex: Jovens, Casais"
                                value={formData.targetAudience}
                                onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
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

export default DiscipleshipModal;
