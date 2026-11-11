import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Instagram, 
  MessageCircle, 
  CheckCircle2, 
  Home, 
  KeyRound, 
  FileCheck2, 
  TrendingUp,
  Award
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface AboutPageProps {
  settings: SiteSettings;
  onScheduleClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onScheduleClick }) => {
  const whatsappUrl = buildWhatsAppLink(
    `Olá Luiz Carlos Fraga! Gostaria de agendar uma consultoria com você.`
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 text-[#14151C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF5EB] border border-[#C5A059]/40 text-[#8C6F36] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            CRECI 12234 • 7ª Região (Pernambuco)
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#111217]">
            Luiz Carlos Fraga
          </h1>

          <p className="text-base sm:text-lg text-[#8C6F36] font-medium tracking-wide">
            Consultor de Imóveis • Olinda/PE
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
            "{settings.bio}"
          </p>
        </div>

        {/* Institutional Story Card */}
        <div className="bg-white rounded-2xl border border-[#E5DFD2] p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#121319] border-2 border-[#C5A059]/40 relative shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="Luiz Carlos Fraga Consultor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-brand text-xs font-bold text-[#DFBF7E] block">LCF</span>
                <span className="font-serif font-bold text-lg block">{settings.brokerName}</span>
                <span className="text-[11px] text-gray-300">CRECI 12234</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F36]">
                Compromisso com o Cliente
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111217]">
                Atendimento Personalizado e Transparência Absoluta
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {settings.aboutText}
            </p>

            <p className="text-gray-600 leading-relaxed text-sm">
              Especialista em transações imobiliárias no litoral norte de Pernambuco, com foco primordial na cidade de Olinda. Atuamos com rigor técnico em checagem de certidões, contratos e negociações seguras tanto para proprietários quanto para compradores e inquilinos.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#C5A059] hover:bg-[#D4B066] text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>

              <button
                onClick={onScheduleClick}
                className="px-6 py-3 bg-[#15161E] hover:bg-[#252735] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
              >
                Agendar Reunião / Visita
              </button>
            </div>
          </div>

        </div>

        {/* 4 Pillars Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#111217]">
              Áreas de Atuação
            </h3>
            <p className="text-xs text-gray-600">
              Serviços imobiliários integrais em conformidade com as normas do CRECI-PE
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#E5DFD2] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#8C6F36] flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#111217]">Venda de Imóveis</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Assessoria em compra e venda de apartamentos, casas e coberturas em Olinda com divulgação estratégica.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E5DFD2] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#8C6F36] flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#111217]">Locação Segura</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Análise criteriosa de garantias, vistorias detalhadas e contratos transparentes para locadores e locatários.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E5DFD2] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#8C6F36] flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#111217]">Administração</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Gestão financeira, cobrança, acompanhamento de taxas condominiais e manutenção preventiva do seu imóvel.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E5DFD2] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] text-[#8C6F36] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#111217]">Avaliação Mercadológica</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Precificação técnica baseada em transações reais do mercado de Casa Caiada, Bairro Novo e Rio Doce.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
