import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  Compass, 
  Key, 
  Calendar,
  Lock
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface HeaderProps {
  settings: SiteSettings;
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  isAdminLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  currentView,
  onNavigate,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'comprar', label: 'Comprar' },
    { id: 'alugar', label: 'Alugar' },
    { id: 'empreendimentos', label: 'Empreendimentos' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'contato', label: 'Contato' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  const directWhatsAppUrl = buildWhatsAppLink(
    `Olá Luiz Carlos Fraga! Gostaria de atendimento para encontrar um imóvel em Olinda/PE.`
  );

  return (
    <header className="sticky top-0 z-40 bg-[#0D0E12]/95 backdrop-blur-md border-b border-[#2A2C38] text-white">
      {/* Top micro bar: verified CRECI, address & direct phone */}
      <div className="bg-[#08090C] border-b border-[#1E202A] px-4 py-1.5 text-xs text-[#A0A2B0]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#C5A059] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              CRECI 12234 • Consultor Oficial
            </span>
            <span className="hidden md:inline text-[#4A4C5A]">|</span>
            <span className="hidden md:inline truncate max-w-md">
              Olinda/PE • Casa Caiada, Bairro Novo e Rio Doce
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span className="font-medium">{settings.phone}</span>
            </a>

            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                isAdminLoggedIn 
                  ? 'bg-[#C5A059]/20 text-[#DFBF7E] border border-[#C5A059]/40' 
                  : 'text-[#8A8C9E] hover:text-white'
              }`}
              title="Acesso exclusivo ao Painel Administrativo"
            >
              <Lock className="w-3 h-3 text-[#C5A059]" />
              {isAdminLoggedIn ? 'Painel Ativo' : 'Painel Admin'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left group"
        >
          {/* Free-standing Official Emblem Logo Image */}
          <img 
            src="https://i.postimg.cc/FKXNcL2W/Emblema-Dourado-LCF-Imoveis.png" 
            alt="Emblema Dourado LCF Imóveis" 
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
          />

          <div>
            <span className="text-lg font-bold tracking-tight text-white block group-hover:text-[#DFBF7E] transition-colors">
              {settings.brokerName}
            </span>
            <span className="text-xs tracking-widest uppercase text-[#C5A059] font-medium block">
              Consultor de Imóveis • CRECI {settings.creci}
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  isActive
                    ? 'text-[#DFBF7E] bg-[#1C1E26] shadow-inner font-semibold'
                    : 'text-[#C7C9D6] hover:text-white hover:bg-[#161720]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('agendar')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wide uppercase border border-[#C5A059]/60 text-[#DFBF7E] hover:bg-[#C5A059]/10 rounded-md transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            Agendar Visita
          </button>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] hover:to-[#B38D40] text-[#0D0E12] rounded-md shadow-md hover:shadow-lg transition-all"
          >
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#C7C9D6] hover:text-white hover:bg-[#1C1E26] rounded-md"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121319] border-b border-[#2A2C38] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 text-base rounded-md font-medium transition-colors ${
                currentView === item.id
                  ? 'bg-[#1C1E26] text-[#DFBF7E]'
                  : 'text-[#C7C9D6] hover:bg-[#181922] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-[#232530] flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('agendar')}
              className="w-full py-2.5 text-center text-sm font-semibold tracking-wider uppercase border border-[#C5A059] text-[#DFBF7E] rounded-md"
            >
              Agendar Visita
            </button>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-[#C5A059] to-[#9E7B35] text-[#0D0E12] rounded-md"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
