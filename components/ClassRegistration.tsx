
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Mail, Phone, CheckCircle, ArrowRight } from 'lucide-react';

const ClassRegistration = () => {
    const { classId } = useParams<{ classId: string }>();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [submitted, setSubmitted] = useState(false);

    // Mock class info lookup
    const classInfo = {
        name: 'Turma de Novos Membros - Agosto/2024',
        startDate: '01/08/2024',
        instructor: 'Pastor Carlos'
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send data to API
        console.log('Registered for class:', classId, formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Inscrição Confirmada!</h1>
                    <p className="text-gray-600 mb-6">
                        Parabéns! Você está inscrito na <strong>{classInfo.name}</strong>.
                        Em breve entraremos em contato com mais informações.
                    </p>
                    <Link to="/" className="text-holly-700 font-medium hover:underline">
                        Voltar para a página inicial
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-holly-800 p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <User className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">Inscrição</h1>
                    <p className="text-holly-200 text-sm">
                        {classInfo.name}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-holly-800 transition-all"
                                placeholder="Seu nome"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-holly-800 transition-all"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="tel"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-holly-800 transition-all"
                                placeholder="(00) 00000-0000"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-holly-700 text-white rounded-xl font-bold hover:bg-holly-800 transition-colors shadow-lg mt-4 flex items-center justify-center gap-2 group"
                    >
                        Confirmar Inscrição
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-center text-xs text-gray-400">
                        Seus dados estão seguros conosco.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ClassRegistration;
