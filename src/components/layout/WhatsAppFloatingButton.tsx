import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface WhatsAppFloatingButtonProps {
  customMessage?: string;
  brokerName?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  customMessage = 'Olá Luiz Carlos Fraga! Gostaria de mais informações sobre imóveis em Olinda.',
  brokerName = 'Luiz Carlos Fraga'
}) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsappUrl = buildWhatsAppLink(customMessage);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip greeting */}
      {showTooltip && (
        <div className="mb-2 bg-[#121319] text-white p-3 rounded-xl border border-[#C5A059]/40 shadow-2xl max-w-xs text-xs animate-bounce relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-1.5 right-1.5 text-gray-400 hover:text-white"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <p className="font-semibold text-[#DFBF7E]">Atendimento Direto</p>
          </div>
          <p className="text-gray-300">
            Fale agora com <strong>{brokerName}</strong> e encontre seu imóvel em Olinda/PE.
          </p>
        </div>
      )}

      {/* Floating button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/20 group relative"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] rounded-full border border-white flex items-center justify-center text-[9px] font-bold text-black">
          1
        </span>
        <MessageCircle className="w-7 h-7 group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
};
