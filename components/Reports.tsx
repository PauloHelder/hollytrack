import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Plus } from 'lucide-react';
import { Report } from '../types';

const growthData = [
  { name: 'Jan', value: 25 },
  { name: 'Fev', value: 32 },
  { name: 'Mar', value: 38 },
  { name: 'Abr', value: 45 },
  { name: 'Mai', value: 55 },
  { name: 'Jun', value: 85 }, // Highlight
  { name: 'Jul', value: 78 },
  { name: 'Ago', value: 92 },
  { name: 'Set', value: 98 },
  { name: 'Out', value: 105 },
  { name: 'Nov', value: 110 },
  { name: 'Dez', value: 115 },
];

const demographicData = [
  { name: 'Homens', value: 750 },
  { name: 'Mulheres', value: 500 },
];

const COLORS = ['#901E24', '#0EA5E9']; // Holly Red, Sky Blue

const Reports = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Relatórios e Análises</h2>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-holly-800 text-white rounded-lg hover:bg-holly-900 font-medium shadow-sm transition-colors">
            <Plus size={18} />
            Gerar Relatório
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Growth Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Crescimento da Membresia</h3>
              <p className="text-sm text-gray-500">Análise anual</p>
            </div>
            <div className="flex gap-2">
              <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-holly-800">
                <option>Últimos 12 meses</option>
                <option>Últimos 6 meses</option>
                <option>Ano Atual</option>
              </select>
              <button className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} barSize={20}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <Tooltip cursor={{ fill: '#F9FAFB' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                   {growthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Jun' ? '#901E24' : '#E5E7EB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics Donut */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2 w-full text-left">Demografia dos Membros</h3>
          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
             {/* Center Text */}
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-gray-900">1.250</span>
                <span className="text-xs text-gray-500">Total</span>
             </div>
          </div>
          <div className="w-full space-y-3 mt-4">
             <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-holly-700"></div>
                   <span className="text-gray-600">Homens</span>
                </div>
                <span className="font-semibold text-gray-900">60% (750)</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                   <span className="text-gray-600">Mulheres</span>
                </div>
                <span className="font-semibold text-gray-900">40% (500)</span>
             </div>
          </div>
        </div>
      </div>

      {/* Saved Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Relatórios Salvos</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nome do Relatório</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Data de Criação</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
             {[
               {name: 'Crescimento de Discipulados Q2 2024', date: '15/07/2024', type: 'Discipulado', color: 'green'},
               {name: 'Análise de Membresia 2023', date: '05/01/2024', type: 'Membros', color: 'blue'},
               {name: 'Novos Convertidos (Junho)', date: '01/07/2024', type: 'Novos Convertidos', color: 'yellow'},
             ].map((report, i) => (
               <tr key={i} className="hover:bg-gray-50">
                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.name}</td>
                 <td className="px-6 py-4 text-sm text-gray-500">{report.date}</td>
                 <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium bg-${report.color}-100 text-${report.color}-800`}>
                      {report.type}
                    </span>
                 </td>
                 <td className="px-6 py-4 text-right">
                    <button className="text-holly-800 hover:text-holly-600 font-medium text-sm">Download</button>
                 </td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;