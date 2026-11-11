import React from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Eye, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { Development } from '../../types';
import { formatCurrency } from '../../lib/formatters';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface DevelopmentCardProps {
  development: Development;
  onSelect: (dev: Development) => void;
}

export const DevelopmentCard: React.FC<DevelopmentCardProps> = ({
  development,
  onSelect
}) => {
  const coverImage = 
    development.images.find(img => img.isCover)?.url ||
    development.images[0]?.url ||
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';

  const statusLabels: Record<Development['status'], { label: string; color: string }> = {
    lancamento: { label: 'Lançamento', color: 'bg-amber-500 text-black' },
    em_construcao: { label: 'Em Obras', color: 'bg-blue-600 text-white' },
    pronto_para_morar: { label: 'Pronto para Morar', color: 'bg-emerald-600 text-white' },
    entregue: { label: 'Entregue', color: 'bg-purple-600 text-white' }
  };

  const statusInfo = statusLabels[development.status] || { label: 'Destaque', color: 'bg-[#C5A059] text-black' };

  const whatsappMessage = `Olá Luiz Carlos Fraga! Gostaria de informações sobre o empreendimento "${development.name}" em Olinda anunciado no site.`;
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  return (
    <div className="bg-[#121319] text-white rounded-xl overflow-hidden border border-[#272936] hover:border-[#C5A059] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group">
      
      {/* Cover Media */}
      <div 
        className="relative h-64 overflow-hidden bg-black cursor-pointer"
        onClick={() => onSelect(development)}
      >
        <img
          src={coverImage}
          alt={development.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#121319] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded shadow ${statusInfo.color}`}>
            {statusInfo.label}
          </span>

          <span className="text-[11px] font-mono px-2 py-0.5 bg-black/60 text-[#DFBF7E] border border-[#C5A059]/40 rounded backdrop-blur-sm">
            {development.code || 'OLINDA'}
          </span>
        </div>

        {development.pendingConfirmation && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-amber-500/90 text-black font-semibold rounded backdrop-blur-sm">
              <AlertCircle className="w-3 h-3" />
              Disponibilidade sujeita a confirmação
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-medium mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{development.neighborhood}, {development.city}/PE</span>
          </div>

          <h3 
            onClick={() => onSelect(development)}
            className="font-serif text-xl font-bold text-white group-hover:text-[#DFBF7E] transition-colors cursor-pointer mb-2"
          >
            {development.name}
          </h3>

          {development.startingPrice ? (
            <div className="mb-3">
              <span className="text-xs text-gray-400 block">A partir de</span>
              <span className="text-2xl font-extrabold text-[#ECC880]">
                {formatCurrency(development.startingPrice)}
              </span>
            </div>
          ) : (
            <div className="text-sm font-semibold text-gray-300 mb-3">
              Consulte valores e unidades
            </div>
          )}

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
            {development.description}
          </p>

          {/* Features Highlights */}
          {development.features && development.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#232532]">
              {development.features.slice(0, 3).map((feat, i) => (
                <span 
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded bg-[#1C1E26] text-gray-300 border border-[#2D3040]"
                >
                  {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onSelect(development)}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-[#222430] hover:bg-[#2F3142] text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Conhecer Prédio</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 text-xs font-bold rounded-lg bg-[#C5A059] hover:bg-[#D4B066] text-black flex items-center justify-center gap-1.5 transition-colors"
            title="Falar no WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>

      </div>

    </div>
  );
};
