import React, { useState } from 'react';
import { 
  LandingPage, 
  Property, 
  Development 
} from '../../types';
import { 
  ShieldCheck, 
  MessageCircle, 
  Share2, 
  CheckCircle2, 
  MapPin, 
  ArrowLeft,
  Copy,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { buildWhatsAppLink, createLead } from '../../lib/firestoreService';
import confetti from 'canvas-confetti';

interface CampaignLandingPageViewProps {
  landingPage: LandingPage;
  targetProperty?: Property;
  targetDevelopment?: Development;
  onBack: () => void;
}

export const CampaignLandingPageView: React.FC<CampaignLandingPageViewProps> = ({
  landingPage,
  targetProperty,
  targetDevelopment,
  onBack
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const whatsappMessage = landingPage.whatsappCustomMessage || 
    `Olá Luiz Carlos Fraga! Vim através da página exclusiva "${landingPage.title}" e gostaria de mais detalhes.`;
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    await createLead({
      name,
      phone,
      email,
      interestType: landingPage.targetType === 'property' ? 'property' : 'general',
      propertyId: targetProperty?.id,
      propertyTitle: targetProperty?.title,
      developmentId: targetDevelopment?.id,
      developmentName: targetDevelopment?.name,
      originPage: `/campanha/${landingPage.slug}`,
      utmCampaign: landingPage.slug,
      utmSource: landingPage.utmPreset?.source || 'landing_page'
    });

    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="bg-[#0B0C10] text-white min-h-screen">
      
      {/* Top Strip */}
      <div className="bg-[#121319] border-b border-[#252838] py-2.5 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
            <span>Voltar ao site principal</span>
          </button>

          <div className="flex items-center gap-2 text-[#DFBF7E]">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span className="font-semibold uppercase tracking-wider">
              Luiz Carlos Fraga • CRECI 12234
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative min-h-[480px] lg:min-h-[540px] flex items-center justify-center overflow-hidden">
        <img
          src={landingPage.heroImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'}
          alt={landingPage.title}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1C28]/90 border border-[#C5A059]/40 text-[#ECC880] text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Oportunidade Selecionada em Olinda/PE
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {landingPage.title}
          </h1>

          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            {landingPage.subtitle}
          </p>

          {landingPage.customPrice && (
            <div className="inline-block px-6 py-2.5 rounded-xl bg-black/60 border border-[#C5A059]/60 backdrop-blur-md">
              <span className="text-xs text-gray-400 block uppercase tracking-wider">Condição Especial</span>
              <span className="text-2xl sm:text-3xl font-extrabold gold-gradient-text">
                {landingPage.customPrice}
              </span>
            </div>
          )}

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7B35] text-black font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chamar no WhatsApp Direto</span>
            </a>

            <button
              onClick={handleCopyShareLink}
              className="px-5 py-3.5 rounded-xl bg-[#1B1D29] border border-[#2F3244] hover:border-[#C5A059] text-gray-200 text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <Copy className="w-4 h-4 text-[#C5A059]" />
              <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link de Divulgação'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content & Lead Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Highlights & Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#13151D] p-6 sm:p-8 rounded-2xl border border-[#272938] space-y-6">
              <h2 className="font-serif text-2xl font-bold text-white">
                Destaques & Diferenciais
              </h2>

              {landingPage.highlightPoints && landingPage.highlightPoints.length > 0 && (
                <div className="space-y-3">
                  {landingPage.highlightPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-200">
                      <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-[#232532] text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {landingPage.description}
              </div>
            </div>

            {/* Gallery if present */}
            {landingPage.images && landingPage.images.length > 0 && (
              <div className="bg-[#13151D] p-6 sm:p-8 rounded-2xl border border-[#272938] space-y-4">
                <h3 className="font-serif text-xl font-bold text-white">
                  Fotos da Oportunidade
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {landingPage.images.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-[#282B3A] h-48">
                      <img src={img.url} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="lg:col-span-5">
            <div className="bg-[#141620] p-6 sm:p-8 rounded-2xl border-2 border-[#C5A059]/40 shadow-2xl space-y-6 sticky top-20">
              
              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">
                  Fale com Luiz Carlos Fraga
                </h3>
                <p className="text-xs text-[#DFBF7E]">
                  Consultor Imobiliário Oficial • CRECI 12234
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-base text-white">Obrigado pelo contato!</h4>
                  <p className="text-xs text-gray-300">
                    Sua solicitação foi registrada. Se preferir atendimento imediato, clique abaixo:
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Abrir WhatsApp Agora
                  </a>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-300 font-medium block mb-1">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Maria Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#1B1E2B] border border-[#2F3348] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 font-medium block mb-1">
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(81) 98531-3434"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1B1E2B] border border-[#2F3348] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 font-medium block mb-1">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1B1E2B] border border-[#2F3348] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition-all"
                  >
                    Quero Saber Mais Detalhes
                  </button>
                </form>
              )}

              <div className="pt-4 border-t border-[#232636] text-center text-[11px] text-gray-400">
                Atendimento sob sigilo e respeito à sua privacidade (LGPD).
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
