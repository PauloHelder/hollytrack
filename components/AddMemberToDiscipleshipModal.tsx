
import React, { useState, useEffect } from 'react';
import { X, Search, Check } from 'lucide-react';
import { useMembers } from '../hooks/useMembers';

interface AddMemberToDiscipleshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (selectedMemberIds: (string | number)[]) => void;
}

const AddMemberToDiscipleshipModal: React.FC<AddMemberToDiscipleshipModalProps> = ({ isOpen, onClose, onAdd }) => {
    const { members, fetchMembers } = useMembers();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMembers, setSelectedMembers] = useState<(string | number)[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetchMembers();
            setSelectedMembers([]);
            setSearchTerm('');
        }
    }, [isOpen, fetchMembers]);

    if (!isOpen) return null;

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleMemberSelection = (memberId: string | number) => {
        if (selectedMembers.includes(memberId)) {
            setSelectedMembers(selectedMembers.filter(id => id !== memberId));
        } else {
            setSelectedMembers([...selectedMembers, memberId]);
        }
    };

    const handleConfirm = () => {
        onAdd(selectedMembers);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Adicionar Participantes</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-4 flex-1 overflow-hidden flex flex-col">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar membros por nome ou email..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-holly-800 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {filteredMembers.length > 0 ? (
                            filteredMembers.map(member => (
                                <div
                                    key={member.id}
                                    onClick={() => toggleMemberSelection(member.id)}
                                    className={`
                                        flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all
                                        ${selectedMembers.includes(member.id)
                                            ? 'border-holly-600 bg-holly-50'
                                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}
                                    `}
                                >
                                    <div className={`
                                        w-6 h-6 rounded border flex items-center justify-center transition-colors
                                        ${selectedMembers.includes(member.id)
                                            ? 'bg-holly-600 border-holly-600 text-white'
                                            : 'border-gray-300 bg-white'}
                                    `}>
                                        {selectedMembers.includes(member.id) && <Check size={14} strokeWidth={3} />}
                                    </div>

                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                        <p className="text-xs text-gray-500">{member.email}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Nenhum membro encontrado.
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={selectedMembers.length === 0}
                        className="px-6 py-2.5 bg-holly-700 text-white rounded-lg font-bold hover:bg-holly-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Adicionar {selectedMembers.length > 0 ? `(${selectedMembers.length})` : ''}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMemberToDiscipleshipModal;
