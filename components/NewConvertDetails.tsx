
import React from 'react';
import { ChevronLeft, User, Mail, Phone, Calendar, Heart, CheckCircle, ArrowUpRight } from 'lucide-react';
import { NewConvert } from '../types';

interface NewConvertDetailsProps {
    convert: NewConvert;
    onBack: () => void;
    onEdit: () => void;
    onConvertToMember: () => void;
}

const NewConvertDetails: React.FC<NewConvertDetailsProps> = ({ convert, onBack, onEdit, onConvertToMember }) => {
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
                                    src={convert.avatar}
                                    alt={convert.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{convert.name}</h1>
                                <div className="flex items-center gap-3 text-gray-500 mt-1">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                                        {convert.status}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Heart size={14} className="text-pink-500" fill="currentColor" />
                                        Decisão em {convert.conversionDate}
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
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Contato</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                            <Mail size={16} />
                                        </div>
                                        <span className="font-medium">{convert.email || 'Não informado'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                            <Phone size={16} />
                                        </div>
                                        <span className="font-medium">{convert.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Evolução Espiritual</h3>

                                <div className="relative pl-6 border-l-2 border-gray-100 space-y-6 py-2">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                                            <CheckCircle size={12} className="text-white" />
                                        </div>
                                        <p className="font-bold text-gray-900 text-sm">Decisão por Cristo</p>
                                        <p className="text-xs text-gray-500">{convert.conversionDate}</p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-0 w-6 h-6 bg-gray-200 rounded-full border-4 border-white shadow-sm"></div>
                                        <p className="font-medium text-gray-400 text-sm">Início do Discipulado</p>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-0 w-6 h-6 bg-gray-200 rounded-full border-4 border-white shadow-sm"></div>
                                        <p className="font-medium text-gray-400 text-sm">Batismo</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    onClick={onConvertToMember}
                                    className="w-full py-3 bg-holly-700 text-white rounded-xl shadow-lg hover:bg-holly-800 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 font-bold"
                                >
                                    <ArrowUpRight size={20} />
                                    Tornar Membro da Igreja
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-2">Isso importará os dados para o cadastro de membros.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewConvertDetails;
