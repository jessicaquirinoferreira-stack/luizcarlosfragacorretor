import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  Share2, 
  MessageCircle, 
  Calendar, 
  ShieldCheck, 
  AlertCircle, 
  Building,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { Property, Development } from '../../types';
import { formatCurrency, formatArea } from '../../lib/formatters';
import { buildWhatsAppLink, createLead } from '../../lib/firestoreService';

interface PropertyDetailViewProps {
  property: Property;
  allProperties: Property[];
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  allProperties,
  onBack,
  onSelectProperty,
  onScheduleVisit
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMessage, setLeadMessage] = useState(
    `Olá Luiz Carlos Fraga! Tenho interesse no imóvel "${property.title}" (Cód. ${property.code || property.id}). Poderia me dar mais informações?`
  );
  const [copySuccess, setCopySuccess] = useState(false);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : [{ id: '1', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', type: 'image' as const }];

  const currentMedia = images[activeMediaIndex] || images[0];

  const handlePrevMedia = () => {
    setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextMedia = () => {
    setActiveMediaIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    await createLead({
      name: leadName,
      phone: leadPhone,
      email: leadEmail,
      interestType: 'property',
      propertyId: property.id,
      propertyTitle: property.title,
      message: leadMessage,
      originPage: `/imovel/${property.slug}`
    });

    setLeadFormSubmitted(true);
  };

  const directWhatsAppUrl = buildWhatsAppLink(
    leadMessage || `Olá Luiz Carlos Fraga! Gostaria de mais informações sobre o imóvel ${property.title} (Cód. ${property.code || property.id}).`
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${property.title} — Luiz Carlos Fraga Corretor`,
        text: `Confira este imóvel em Olinda/PE: ${property.title}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const similarProperties = allProperties
    .filter(p => p.id !== property.id && p.status === 'published' && (p.neighborhood === property.neighborhood || p.transactionType === property.transactionType))
    .slice(0, 3);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 text-[#1A1B22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#DDD7C8] hover:border-[#C5A059] text-xs font-semibold uppercase tracking-wider text-gray-700 hover:text-black shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
            <span>Voltar para a listagem</span>
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
              onClick={() => onScheduleVisit(property)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#D4B066] text-black text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Visita</span>
            </button>
          </div>
        </div>

        {/* Pending confirmation notice */}
        {property.pendingConfirmation && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold">Aviso sobre disponibilidade: </span>
              Este imóvel faz parte do portfólio divulgado nas redes oficiais. Valores, taxas condominiais e disponibilidade estão sujeitos a confirmação junto ao proprietário/incorporadora. Consulte diretamente pelo WhatsApp.
            </div>
          </div>
        )}

        {/* Header Title & Pricing Info */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2DDCF] shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                property.transactionType === 'venda' ? 'bg-[#C5A059] text-black' : 'bg-emerald-600 text-white'
              }`}>
                {property.transactionType === 'venda' ? 'Venda' : 'Locação'}
              </span>

              <span className="px-3 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 uppercase">
                {property.type}
              </span>

              {property.code && (
                <span className="font-mono text-xs px-2.5 py-1 bg-[#14151C] text-[#E5C687] rounded">
                  Cód: {property.code}
                </span>
              )}
            </div>

            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#111217]">
                {formatCurrency(property.price)}
              </div>
              {property.condoFee ? (
                <div className="text-xs text-gray-500 font-medium">
                  Condomínio: {formatCurrency(property.condoFee)} / mês
                </div>
              ) : null}
            </div>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111217]">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-[#826F4F]">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>{property.neighborhood}, {property.city}/{property.state}</span>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EAE5D9]">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7E2D5] flex items-center gap-3">
              <Maximize2 className="w-5 h-5 text-[#C5A059]" />
              <div>
                <span className="text-[11px] text-gray-500 uppercase block">Área Privativa</span>
                <span className="font-bold text-base text-[#111217]">{formatArea(property.areaM2)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7E2D5] flex items-center gap-3">
              <Bed className="w-5 h-5 text-[#C5A059]" />
              <div>
                <span className="text-[11px] text-gray-500 uppercase block">Quartos</span>
                <span className="font-bold text-base text-[#111217]">{property.bedrooms} quartos</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7E2D5] flex items-center gap-3">
              <Bath className="w-5 h-5 text-[#C5A059]" />
              <div>
                <span className="text-[11px] text-gray-500 uppercase block">Suítes</span>
                <span className="font-bold text-base text-[#111217]">{property.suites} suíte{property.suites > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7E2D5] flex items-center gap-3">
              <Car className="w-5 h-5 text-[#C5A059]" />
              <div>
                <span className="text-[11px] text-gray-500 uppercase block">Vagas</span>
                <span className="font-bold text-base text-[#111217]">{property.parkingSpots} vaga{property.parkingSpots > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-xl border border-[#2B2D3B]">
          {/* Main Stage */}
          <div className="relative h-[380px] sm:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-950">
            {currentMedia.type === 'video' ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C5A059] flex items-center justify-center text-black">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <p className="font-semibold text-lg">Vídeo do Imóvel</p>
                <a
                  href={currentMedia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1E202B] rounded-lg text-sm text-[#DFBF7E] border border-[#C5A059]/40 hover:bg-[#282B3A]"
                >
                  Abrir vídeo em tela cheia
                </a>
              </div>
            ) : (
              <img
                src={currentMedia.url}
                alt={currentMedia.caption || property.title}
                className="w-full h-full object-contain"
              />
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Caption & Counter */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-xs bg-black/70 text-gray-200 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                {currentMedia.caption || `Foto ${activeMediaIndex + 1} de ${images.length}`}
              </span>
              <span className="text-xs font-mono bg-black/70 text-[#E5C687] px-3 py-1.5 rounded-lg backdrop-blur-sm">
                {activeMediaIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnails strip */}
          {images.length > 1 && (
            <div className="p-3 bg-[#111217] flex items-center gap-2 overflow-x-auto border-t border-[#232533]">
              {images.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeMediaIndex ? 'border-[#C5A059] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Details & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Description Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2DDCF] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#111217]">
                Sobre o Imóvel
              </h2>
              <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Features / Diferenciais */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2DDCF] shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#111217]">
                  Características e Diferenciais
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-gray-800">
                      <CheckCircle2 className="w-4 h-4 text-[#8C6F36] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Neighborhood Highlights */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2DDCF] shadow-sm space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#111217] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
                Localização: {property.neighborhood}, Olinda/PE
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Região valorizada em Olinda com fácil acesso à orla marítima, praias, comércios locais, colégios e principais vias da cidade. Endereço exato fornecido mediante agendamento direto com o corretor responsável.
              </p>
            </div>

          </div>

          {/* Right Sticky Sidebar: Contact / Form */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Broker Direct Card */}
            <div className="bg-[#121319] text-white p-6 rounded-2xl border border-[#C5A059]/40 shadow-xl space-y-5 sticky top-24">
              
              <div className="flex items-center gap-3 pb-4 border-b border-[#252838]">
                <div className="w-12 h-12 rounded-lg bg-[#1B1D26] border border-[#C5A059] flex items-center justify-center">
                  <span className="font-brand font-bold text-sm bg-gradient-to-br from-[#F5DEB3] via-[#C5A059] to-[#8C6F36] bg-clip-text text-transparent">
                    LCF
                  </span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-base">
                    Luiz Carlos Fraga
                  </h4>
                  <p className="text-xs text-[#DFBF7E] tracking-wider uppercase font-medium">
                    CRECI 12234 • Consultor Oficial
                  </p>
                </div>
              </div>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] hover:to-[#B38D40] text-black font-bold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Conversar no WhatsApp</span>
              </a>

              {/* Lead Form */}
              <div className="pt-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  Ou solicite contato por formulário:
                </h5>

                {leadFormSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs text-center space-y-2">
                    <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400" />
                    <p className="font-bold text-sm">Mensagem enviada com sucesso!</p>
                    <p>Luiz Carlos Fraga entrará em contato em breve no seu WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Seu Nome Completo *"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full bg-[#1A1C26] border border-[#2E3142] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Seu WhatsApp com DDD *"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full bg-[#1A1C26] border border-[#2E3142] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Seu E-mail (opcional)"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full bg-[#1A1C26] border border-[#2E3142] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        className="w-full bg-[#1A1C26] border border-[#2E3142] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#252838] hover:bg-[#32364B] text-white text-xs font-semibold tracking-wider uppercase rounded-lg border border-[#3E4259] transition-all"
                    >
                      Enviar Proposta / Dúvida
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-2 border-t border-[#222434] text-[11px] text-gray-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Atendimento oficial Luiz Carlos Fraga</span>
                </div>
                <div>(81) 98531-3434 • Olinda/PE</div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
