import React, { useState, useEffect } from 'react';
import { Eye, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user, loading: sessionLoading } = useAuth();

  // State
  const [view, setView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionLoading && user) {
      navigate('/dashboard');
    }
  }, [user, sessionLoading, navigate]);

  if (sessionLoading || user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-10 h-10 text-holly-800 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Verificando sessão...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (view === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/dashboard');
      } else {
        // Register Logic
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              phone: phone
            }
          }
        });

        if (error) throw error;

        // If auto-confirm is enabled, data.session might exist, otherwise check email
        alert('Cadastro realizado com sucesso! Verifique seu email se necessário ou faça login.');
        if (data.session) {
          navigate('/dashboard');
        } else {
          setView('login');
        }
      }

    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Erro de autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Brand */}
      <div className="hidden lg:flex w-1/2 bg-[#C0392B] p-12 flex-col justify-between relative overflow-hidden">
        {/* Gradient Overlay for texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-holly-800 to-[#922B21] opacity-90"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white p-2 rounded-lg">
              <img src="/logo.png" alt="HollyTrack Logo" className="h-[28px] w-[28px] object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">HollyTrack</h1>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Gerencie sua comunidade com fé e eficiência.
          </h2>
          <p className="text-red-100 text-xl font-light leading-relaxed">
            Conectando membros, simplificando a gestão e fortalecendo os laços da sua igreja.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-red-200 text-sm">© 2024 HollyTrack. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {view === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}
            </h2>
            <p className="text-gray-500">
              {view === 'login'
                ? 'Bem-vindo de volta! Por favor, insira seus dados.'
                : 'Preencha os dados abaixo para começar.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            {view === 'register' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-slate-800 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Telefone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-slate-800 focus:outline-none transition-all"
                    required
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-slate-800 focus:outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-slate-800 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button type="button" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-lg hover:bg-slate-700 transition-colors shadow-lg shadow-slate-800/20 disabled:opacity-50"
            >
              {loading ? 'Processando...' : (view === 'login' ? 'Entrar' : 'Cadastrar')}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            {view === 'login' ? (
              <>
                Não tem uma conta?{' '}
                <button
                  onClick={() => setView('register')}
                  className="font-bold text-slate-800 hover:underline"
                  type="button"
                >
                  Crie uma agora
                </button>
              </>
            ) : (
              <>
                Já tem uma conta?{' '}
                <button
                  onClick={() => setView('login')}
                  className="font-bold text-slate-800 hover:underline"
                  type="button"
                >
                  Faça login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
