import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Share2, 
  Calendar,
  AlertCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { Development, Property } from '../../types';
import { formatCurrency } from '../../lib/formatters';
import { buildWhatsAppLink, createLead } from '../../lib/firestoreService';
import { PropertyCard } from '../properties/PropertyCard';

interface DevelopmentDetailViewProps {
  development: Development;
  associatedProperties: Property[];
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (development: Development) => void;
}

export const DevelopmentDetailView: React.FC<DevelopmentDetailViewProps> = ({
  development,
  associatedProperties,
  onBack,
  onSelectProperty,
  onScheduleVisit
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const images = development.images && development.images.length > 0 
    ? development.images 
    : [{ id: '1', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', type: 'image' as const }];

  const currentMedia = images[activeMediaIndex] || images[0];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    await createLead({
      name: leadName,
      phone: leadPhone,
      interestType: 'development',
      developmentId: development.id,
      developmentName: development.name,
      originPage: `/empreendimento/${development.slug}`
    });

    setLeadSubmitted(true);
  };

  const whatsappMessage = `Olá Luiz Carlos Fraga! Gostaria de consultar disponibilidades e plantas no empreendimento "${development.name}" em Olinda.`;
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${development.name} — Luiz Carlos Fraga Corretor`,
        text: `Confira este empreendimento em Olinda/PE: ${development.name}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 text-[#191A23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#DDD7C8] hover:border-[#C5A059] text-xs font-semibold uppercase tracking-wider text-gray-700 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
            <span>Voltar aos Empreendimentos</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#DDD7C8] hover:border-[#C5A059] text-xs font-semibold text-gray-700 shadow-sm transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{copySuccess ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={() => onScheduleVisit(development)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#D4B066] text-black text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Visita</span>
            </button>
          </div>
        </div>

        {/* Pending confirmation badge */}
        {development.pendingConfirmation && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold">Aviso sobre o empreendimento: </span>
              Informações do histórico divulgado no Instagram oficial. A disponibilidade de unidades, tabela de preços e condições de pagamento estão sujeitas a confirmação.
            </div>
          </div>
        )}

        {/* Development Header Banner */}
        <div className="bg-[#121319] text-white p-6 sm:p-10 rounded-2xl border border-[#2B2D3C] shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-[#C5A059] text-black">
                Empreendimento
              </span>
              <span className="font-mono text-xs px-2.5 py-1 bg-black/50 text-[#DFBF7E] border border-[#C5A059]/30 rounded">
                {development.code || 'OLINDA'}
              </span>
            </div>

            {development.startingPrice && (
              <div className="text-right">
                <span className="text-xs text-gray-400 block">Unidades a partir de</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#ECC880]">
                  {formatCurrency(development.startingPrice)}
                </span>
              </div>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {development.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-[#C5A059]">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{development.neighborhood}, {development.city}/PE</span>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-xl border border-[#2B2D3B]">
          <div className="relative h-[380px] sm:h-[500px] lg:h-[550px] flex items-center justify-center bg-gray-950">
            {currentMedia.type === 'video' ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 space-y-4">
                <Play className="w-12 h-12 text-[#C5A059]" />
                <p className="font-semibold text-lg">Vídeo do Empreendimento</p>
                <a
                  href={currentMedia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1E202B] rounded-lg text-sm text-[#DFBF7E] border border-[#C5A059]/40"
                >
                  Abrir vídeo em nova aba
                </a>
              </div>
            ) : (
              <img
                src={currentMedia.url}
                alt={development.name}
                className="w-full h-full object-contain"
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveMediaIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setActiveMediaIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-xs bg-black/70 text-gray-200 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                {currentMedia.caption || `${development.name} • Galeria Oficial`}
              </span>
              <span className="text-xs font-mono bg-black/70 text-[#E5C687] px-3 py-1.5 rounded-lg backdrop-blur-sm">
                {activeMediaIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {images.length > 1 && (
            <div className="p-3 bg-[#111217] flex items-center gap-2 overflow-x-auto border-t border-[#232533]">
              {images.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeMediaIndex ? 'border-[#C5A059] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Description & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2DDCF] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#111217]">
                Apresentação do Empreendimento
              </h2>
              <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {development.description}
              </div>
            </div>

            {development.features && development.features.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2DDCF] shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#111217]">
                  Infraestrutura & Lazer
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {development.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-gray-800">
                      <CheckCircle2 className="w-4 h-4 text-[#8C6F36] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Units list linked to this development */}
            {associatedProperties.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#111217]">
                  Unidades Disponíveis neste Prédio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {associatedProperties.map((prop) => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      onSelect={onSelectProperty}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#121319] text-white p-6 rounded-2xl border border-[#C5A059]/40 shadow-xl space-y-5 sticky top-24">
              
              <h4 className="font-serif font-bold text-lg text-white">
                Interesse no {development.name}?
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Fale diretamente com <strong>Luiz Carlos Fraga (CRECI 12234)</strong> para receber plantas, tabela e agendar visita.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar no WhatsApp</span>
              </a>

              {/* Form */}
              {leadSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs text-center">
                  <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
                  <p className="font-bold">Solicitação enviada!</p>
                  <p>Retornaremos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3 pt-2">
                  <input
                    type="text"
                    placeholder="Seu Nome *"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full bg-[#1A1C26] border border-[#2E3142] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                  />
                  <input
                    type="tel"
                    placeholder="Seu WhatsApp com DDD *"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full bg-[#1A1C26] border border-[#2E3142] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#252838] hover:bg-[#32364B] text-white text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#3E4259] transition-all"
                  >
                    Receber Informações do Empreendimento
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
