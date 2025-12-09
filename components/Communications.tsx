import React from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link2, Image, Send, Save, Calendar } from 'lucide-react';

const Communications = () => {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Comunicações</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Editor */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Nova Mensagem</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
              <input 
                type="text" 
                defaultValue="Ex: Boletim Informativo Semanal"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-holly-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1">
                  {[Bold, Italic, Underline, null, List, ListOrdered, null, Link2, Image].map((Icon, i) => (
                    Icon ? (
                      <button key={i} className="p-2 hover:bg-gray-200 rounded text-gray-600">
                        <Icon size={18} />
                      </button>
                    ) : (
                      <div key={i} className="w-px h-6 bg-gray-300 mx-2 self-center"></div>
                    )
                  ))}
                </div>
                {/* Text Area */}
                <textarea 
                  className="w-full h-64 p-4 focus:outline-none resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg border border-gray-200 flex items-center gap-2">
                Salvar Rascunho
              </button>
              <button className="px-4 py-2 bg-holly-800 text-white font-medium rounded-lg hover:bg-holly-900 flex items-center gap-2 shadow-sm">
                <Send size={18} />
                Enviar Mensagem
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="space-y-6">
          {/* Segmentation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-2">Segmentação</h3>
            <p className="text-sm text-gray-500 mb-4">Escolha para quem enviar a mensagem.</p>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className="relative flex items-center">
                  <input type="radio" name="segment" className="peer h-4 w-4 border-gray-300 text-holly-800 focus:ring-holly-800" defaultChecked />
                </div>
                <span className="text-gray-700 font-medium">Todos os Membros</span>
              </label>

              <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className="relative flex items-center">
                  <input type="radio" name="segment" className="peer h-4 w-4 border-gray-300 text-holly-800 focus:ring-holly-800" />
                </div>
                <span className="text-gray-700 font-medium">Grupos Específicos</span>
              </label>

              <div className="pl-9 space-y-2">
                {['Jovens', 'Casais', 'Coral'].map(group => (
                  <label key={group} className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300 text-holly-800 focus:ring-holly-800" />
                    <span className="text-sm text-gray-600">{group}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sending Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Opções de Envio</h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="timing" className="h-4 w-4 border-gray-300 text-holly-800 focus:ring-holly-800" defaultChecked />
                <span className="text-gray-700">Enviar Agora</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="timing" className="h-4 w-4 border-gray-300 text-holly-800 focus:ring-holly-800" />
                <span className="text-gray-700">Agendar Envio</span>
              </label>

              <div className="pt-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="mm/dd/yyyy, --:-- --"
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-holly-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communications;