
import React, { useState } from 'react';
import { X, Calendar, Type } from 'lucide-react';

interface NewMemberClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; startDate: string }) => void;
}

const NewMemberClassModal: React.FC<NewMemberClassModalProps> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, startDate });
        setName('');
        setStartDate('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Nova Turma de Novos Membros</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Turma</label>
                        <div className="relative">
                            <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                placeholder="Ex: Turma Julho/2024"
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-800 transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início/Primeira Aula</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="date"
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-holly-800 transition-all"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Serão geradas automaticamente 8 aulas semanais a partir desta data.
                        </p>
                    </div>

                    <div className="pt-4 flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-holly-700 text-white rounded-lg font-bold hover:bg-holly-800 transition-colors shadow-lg"
                        >
                            Criar Turma
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewMemberClassModal;
