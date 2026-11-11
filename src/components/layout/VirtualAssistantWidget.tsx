import React, { useState } from 'react';
import { MessageSquare, X, Send, Instagram, Phone, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface VirtualAssistantWidgetProps {
  brokerName?: string;
  instagramUrl?: string;
}

export const VirtualAssistantWidget: React.FC<VirtualAssistantWidgetProps> = ({
  brokerName = 'Luiz Carlos Fraga',
  instagramUrl = 'https://www.instagram.com/luizcarlosfragacorretor/'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: `Olá! Sou a Juliana, assistente virtual do corretor ${brokerName} (CRECI 12234). Como posso ajudar você a encontrar seu imóvel em Olinda/PE hoje?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: timeNow }]);
    setInputVal('');

    // Simulated intelligent bot response based on keywords
    setTimeout(() => {
      let botReply = `Entendi sua dúvida! Para um atendimento imediato e personalizado com o corretor ${brokerName}, recomendo falar diretamente pelo WhatsApp oficial.`;
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('visita') || lower.includes('agendar')) {
        botReply = 'Você pode agendar uma visita facilmente clicando no botão "Agendar Visita" no menu ou chamando no WhatsApp (81) 98531-3434.';
      } else if (lower.includes('bairro') || lower.includes('casa caiada') || lower.includes('bairro novo') || lower.includes('rio doce')) {
        botReply = `O corretor ${brokerName} é especialista em Casa Caiada, Bairro Novo, Rio Doce e adjacências em Olinda/PE. Temos opções incríveis à venda e locação!`;
      } else if (lower.includes('instagram') || lower.includes('rede social')) {
        botReply = `Siga o perfil oficial no Instagram: @luizcarlosfragacorretor para conferir as novidades e vídeos do feed diariamente!`;
      } else if (lower.includes('creci') || lower.includes('corretor')) {
        botReply = `O consultor responsável é ${brokerName}, inscrito no CRECI 12234 (7ª Região - PE). Atendimento ético, seguro e transparente.`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 600);
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputVal(promptText);
  };

  const whatsappDirectUrl = buildWhatsAppLink(
    `Olá Luiz Carlos Fraga! Falei com a assistente virtual Juliana no site e gostaria de atendimento.`
  );

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      
      {/* Chat Popup Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#12131C] text-white rounded-2xl border border-[#C5A059]/40 shadow-2xl overflow-hidden flex flex-col animate-fade-in">
          
          {/* Header */}
          <div className="bg-[#1A1C28] p-3.5 border-b border-[#2A2C3D] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Juliana - Assistente Virtual"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#C5A059]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1A1C28]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Juliana Fraga</h4>
                <p className="text-[11px] text-[#C5A059] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Assistente Virtual Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg"
              aria-label="Fechar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-3.5 space-y-3 max-h-72 overflow-y-auto text-xs bg-[#0D0E13]">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-[#C5A059] text-black font-medium rounded-br-none' 
                    : 'bg-[#1C1E2B] text-gray-200 border border-[#2B2E40] rounded-bl-none'
                }`}>
                  {m.text}
                </div>
                <span className="text-[9px] text-gray-500 mt-0.5 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-[#14151F] border-t border-[#252837] flex flex-wrap gap-1.5">
            <button
              onClick={() => handleQuickPrompt('Quais os bairros atendidos em Olinda?')}
              className="text-[10px] px-2.5 py-1 bg-[#1C1E2C] hover:bg-[#25283B] text-gray-300 rounded-lg border border-[#2E3147]"
            >
              Bairros em Olinda
            </button>
            <button
              onClick={() => handleQuickPrompt('Como agendar uma visita?')}
              className="text-[10px] px-2.5 py-1 bg-[#1C1E2C] hover:bg-[#25283B] text-gray-300 rounded-lg border border-[#2E3147]"
            >
              Agendar Visita
            </button>
            <button
              onClick={() => handleQuickPrompt('Qual o Instagram oficial?')}
              className="text-[10px] px-2.5 py-1 bg-[#1C1E2C] hover:bg-[#25283B] text-gray-300 rounded-lg border border-[#2E3147]"
            >
              Instagram
            </button>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-2.5 bg-[#181A26] border-t border-[#252837] flex items-center gap-2">
            <input
              type="text"
              placeholder="Digite sua dúvida..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#11121A] border border-[#2E3146] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
            />
            <button
              type="submit"
              className="p-2 bg-[#C5A059] hover:bg-[#D4B066] text-black rounded-lg transition-colors"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct Social Links bar */}
          <div className="bg-[#0A0B0E] p-2 flex items-center justify-around border-t border-[#202230] text-[11px]">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:underline font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp Direto
            </a>
            <span className="text-gray-600">|</span>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#DFBF7E] hover:underline font-semibold"
            >
              <Instagram className="w-3.5 h-3.5" />
              Instagram Oficial
            </a>
          </div>

        </div>
      )}

      {/* Floating Trigger Button with Human Photo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-[#12131A] hover:bg-[#1A1C28] text-white p-2.5 rounded-full border-2 border-[#C5A059] shadow-2xl hover:scale-105 active:scale-95 transition-all group relative"
        aria-label="Abrir assistente virtual"
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
            alt="Juliana Fraga"
            className="w-11 h-11 rounded-full object-cover border border-[#C5A059]"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#12131A]" />
        </div>

        <div className="text-left pr-3 hidden sm:block">
          <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider block">Assistente LCF</span>
          <span className="text-xs font-bold text-white group-hover:text-[#DFBF7E] transition-colors">Juliana Fraga</span>
        </div>
      </button>

    </div>
  );
};
