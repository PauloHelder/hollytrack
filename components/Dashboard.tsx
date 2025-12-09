import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, UsersRound, Heart } from 'lucide-react';
import { StatCardProps } from '../types';

const data = [
  { name: 'Jan', value: 20 },
  { name: 'Fev', value: 25 },
  { name: 'Mar', value: 35 },
  { name: 'Abr', value: 50 },
  { name: 'Mai', value: 45 },
  { name: 'Jun', value: 70 },
  { name: 'Jul', value: 65 },
  { name: 'Ago', value: 80 },
];

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
    <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
    <div className={`text-sm font-medium flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
      {change}
      <span className="text-gray-400 font-normal ml-1">vs mês anterior</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Principal</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Membros" value="1.250" change="+1.5%" isPositive={true} />
        <StatCard title="Grupos de Discipulado" value="42" change="+3" isPositive={true} />
        <StatCard title="Média de Presença (Grupos)" value="85%" change="+2.1%" isPositive={true} />
        <StatCard title="Novos Convertidos (Mês)" value="15" change="+12%" isPositive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Crescimento de Membros</h3>
              <p className="text-sm text-gray-500">Últimos 6 meses</p>
            </div>
            <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded text-sm flex items-center gap-1">
              +8% <TrendingUp size={14} />
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  dy={10}
                />
                <Tooltip
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#3B82F6' : '#E5E7EB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          {/* Upcoming Discipleship Meetings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Próximos Encontros</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">Ver todos</button>
            </div>
            <div className="space-y-4">
              {[
                { d: 'Qui', m: '19:30', t: 'Jovens em Cristo', type: 'Grupo Jovem' },
                { d: 'Sex', m: '20:00', t: 'Casais de Fé', type: 'Casais' },
                { d: 'Sáb', m: '16:00', t: 'Teens Connect', type: 'Adolescentes' },
              ].map((evt, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-holly-50 rounded-lg p-2 text-center min-w-[50px] flex flex-col justify-center items-center h-14">
                    <UsersRound size={20} className="text-holly-800 mb-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{evt.t}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-medium text-holly-700">{evt.d}</span>
                      <span>•</span>
                      <span>{evt.m}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Converts */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart size={18} className="text-holly-600" />
              Recém Chegados
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Lucas Mendes', date: 'Há 2 dias', img: 'https://picsum.photos/100/100' },
                { name: 'Sofia Alves', date: 'Há 5 dias', img: 'https://picsum.photos/101/101' },
                { name: 'Pedro Rocha', date: 'Há 1 semana', img: 'https://picsum.photos/102/102' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={p.img} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{p.name}</div>
                      <div className="text-xs text-green-600 font-medium">Em Acompanhamento</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{p.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;