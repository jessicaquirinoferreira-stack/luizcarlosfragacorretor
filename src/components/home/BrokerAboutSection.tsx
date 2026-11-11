import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Instagram, 
  MessageCircle, 
  CheckCircle2, 
  Award,
  Home,
  KeyRound,
  FileCheck2,
  TrendingUp
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface BrokerAboutSectionProps {
  settings: SiteSettings;
  onScheduleClick: () => void;
}

export const BrokerAboutSection: React.FC<BrokerAboutSectionProps> = ({
  settings,
  onScheduleClick
}) => {
  const whatsappUrl = buildWhatsAppLink(
    `Olá Luiz Carlos Fraga! Gostaria de conversar com você sobre consultoria imobiliária em Olinda.`
  );

  const pillars = [
    {
      icon: Home,
      title: 'Venda de Imóveis',
      desc: 'Seleção qualificada de casas, apartamentos e terrenos em Olinda com máxima segurança jurídica e documentação regular.'
    },
    {
      icon: KeyRound,
      title: 'Locação Residencial & Comercial',
      desc: 'Processo ágil, análise de crédito assertiva e contratos transparentes para proprietários e inquilinos.'
    },
    {
      icon: FileCheck2,
      title: 'Administração de Imóveis',
      desc: 'Cuidado completo com seu patrimônio, gestão de pagamentos, vistorias detalhadas e suporte contínuo.'
    },
    {
      icon: TrendingUp,
      title: 'Avaliação Mercadológica',
      desc: 'Precificação precisa e fundamentada no mercado real de Casa Caiada, Bairro Novo, Rio Doce e região.'
    }
  ];

  return (
    <section className="py-20 bg-[#FAF8F5] text-[#1E1F27] border-y border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Brand Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Luxury Frame Accent */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#C5A059] via-[#8C6F36] to-[#E6C98A] rounded-2xl opacity-40 blur-sm" />
              
              <div className="relative bg-[#121319] rounded-2xl p-8 text-white border border-[#C5A059]/40 shadow-2xl space-y-6">
                
                {/* Monogram Crest */}
                <div className="flex items-center justify-between pb-6 border-b border-[#242636]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-xl bg-[#1A1C25] border-2 border-[#C5A059] flex items-center justify-center shadow-inner overflow-hidden p-1">
                      <img 
                        src="https://i.postimg.cc/FKXNcL2W/Emblema-Dourado-LCF-Imoveis.png" 
                        alt="Emblema Dourado LCF Imóveis" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                        {settings.brokerName}
                      </h3>
                      <p className="text-xs text-[#DFBF7E] font-medium tracking-widest uppercase">
                        CRECI {settings.creci} • 7ª Região
                      </p>
                    </div>
                  </div>

                  <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
                </div>

                {/* Confirmed Bio Quote */}
                <div className="p-4 rounded-xl bg-[#181A23] border border-[#2B2D3C] text-sm text-gray-300 italic leading-relaxed">
                  "{settings.bio}"
                </div>

                {/* Contact Badges */}
                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{settings.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span className="font-mono">{settings.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <a 
                      href={settings.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#DFBF7E] hover:underline"
                    >
                      {settings.instagramUser}
                    </a>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider bg-[#C5A059] hover:bg-[#D4B066] text-black rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Falar no WhatsApp
                  </a>
                  <button
                    onClick={onScheduleClick}
                    className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider border border-[#C5A059]/60 text-[#DFBF7E] hover:bg-[#C5A059]/15 rounded-lg transition-all"
                  >
                    Agendar
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Institutional Story & 4 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F36] block">
                Atuação Especializada em Olinda/PE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14151C] leading-snug">
                Consultoria Imobiliária com Ética, Segurança e Proximidade.
              </h2>
            </div>

            <p className="text-base text-gray-700 leading-relaxed">
              {settings.aboutText}
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              Com conhecimento profundo da dinâmica urbana e dos condomínios em Casa Caiada, Bairro Novo e Rio Doce, ofereço orientação precisa desde a primeira visita até a assinatura da escritura ou contrato de locação.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((pillar, i) => {
                const IconComponent = pillar.icon;
                return (
                  <div 
                    key={i}
                    className="p-4 rounded-xl bg-white border border-[#E7E2D5] shadow-sm hover:border-[#C5A059] transition-all space-y-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF5EC] border border-[#E0D5BE] flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-[#8C6F36]" />
                    </div>
                    <h4 className="font-semibold text-sm text-[#191A23]">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
