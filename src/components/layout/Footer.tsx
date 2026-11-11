import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Instagram, 
  MessageCircle, 
  ArrowUp,
  Lock
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappLink = buildWhatsAppLink('Olá Luiz Carlos Fraga! Vim através do seu site oficial.');

  return (
    <footer className="bg-[#090A0D] text-[#A0A2B0] border-t border-[#1F212C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1A1C25]">
          
          {/* Column 1: Institutional & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.postimg.cc/FKXNcL2W/Emblema-Dourado-LCF-Imoveis.png" 
                alt="Emblema Dourado LCF Imóveis" 
                className="w-12 h-12 object-contain drop-shadow"
              />
              <div>
                <h3 className="text-white font-bold text-base tracking-wide">
                  {settings.brokerName}
                </h3>
                <p className="text-xs text-[#C5A059] font-medium tracking-wider">
                  CRECI {settings.creci} • Olinda/PE
                </p>
              </div>
            </div>

            <p className="text-sm text-[#8E90A2] leading-relaxed">
              Consultoria imobiliária especializada em Olinda. Atendimento transparente, ético e focado em encontrar o imóvel ideal em Casa Caiada, Bairro Novo, Rio Doce e adjacências.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#15161F] border border-[#2A2C3A] flex items-center justify-center text-[#C5A059] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all"
                title="Instagram Oficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#15161F] border border-[#2A2C3A] flex items-center justify-center text-[#C5A059] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all"
                title="WhatsApp Oficial"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#C5A059] pl-2.5">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#DFBF7E] transition-colors"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('comprar')}
                  className="hover:text-[#DFBF7E] transition-colors"
                >
                  Imóveis à Venda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('alugar')}
                  className="hover:text-[#DFBF7E] transition-colors"
                >
                  Imóveis para Locação
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('empreendimentos')}
                  className="hover:text-[#DFBF7E] transition-colors"
                >
                  Empreendimentos e Lançamentos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sobre')}
                  className="hover:text-[#DFBF7E] transition-colors"
                >
                  Sobre Luiz Carlos Fraga
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contato')}
                  className="hover:text-[#DFBF7E] transition-colors"
                >
                  Contato & Agendamento
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#C5A059] pl-2.5">
              Atendimento em Olinda
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <span className="leading-snug">
                  {settings.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a 
                  href={`tel:${settings.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a 
                  href={settings.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {settings.instagramUser}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>CRECI 12234 • 7ª Região (PE)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Action & Security Disclaimer */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#C5A059] pl-2.5">
              Segurança & Informação
            </h4>
            <div className="bg-[#12131A] p-4 rounded-lg border border-[#212330] space-y-2.5 text-xs text-[#8A8C9E] leading-relaxed">
              <p>
                As informações dos imóveis e empreendimentos são atualizadas periodicamente. Valores, condomínios e disponibilidades estão sujeitos a confirmação.
              </p>
              <p className="text-[#A4A7BC]">
                Em conformidade com a LGPD e ética imobiliária COFECI/CRECI.
              </p>
            </div>

            <div className="mt-4">
              <button
                onClick={() => onNavigate('admin')}
                className="inline-flex items-center gap-1.5 text-xs text-[#7A7C8E] hover:text-[#C5A059] transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                Área Administrativa (Gestão)
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & scroll-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E7182]">
          <p>
            © {new Date().getFullYear()} Luiz Carlos Fraga • CRECI 12234. Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#C5A059] hover:text-[#DFBF7E] transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
