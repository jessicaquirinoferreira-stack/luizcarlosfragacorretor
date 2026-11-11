import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  Key, 
  ShieldCheck, 
  MessageCircle,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SiteSettings, SearchFilterState, Development } from '../../types';
import { buildWhatsAppLink } from '../../lib/firestoreService';
import { formatCurrency } from '../../lib/formatters';

interface HeroSectionProps {
  settings: SiteSettings;
  developments: Development[];
  onSearch: (filters: Partial<SearchFilterState>) => void;
  onDirectAction: (action: string) => void;
  onSelectDevelopment: (dev: Development) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  developments,
  onSearch,
  onDirectAction,
  onSelectDevelopment
}) => {
  const [transactionType, setTransactionType] = useState<'venda' | 'locacao'>('venda');
  const [neighborhood, setNeighborhood] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  // Active development background carousel state
  const publishedDevelopments = developments.filter(d => d.isPublished);
  const [currentDevIndex, setCurrentDevIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fallback architectural images if no development registered yet
  const defaultHeroImages = [
    {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2200&q=90",
      title: "Edifício Estação Marcos Freire",
      neighborhood: "Bairro Novo, Olinda/PE",
      price: 990000,
      status: "Alto Padrão Beira-Mar"
    },
    {
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2200&q=90",
      title: "Edifício Fonte Atlântico",
      neighborhood: "Casa Caiada, Olinda/PE",
      price: 350000,
      status: "Pronto para Morar"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90",
      title: "Lançamentos e Oportunidades em Olinda",
      neighborhood: "Casa Caiada & Bairro Novo",
      price: 275000,
      status: "Consultoria Exclusiva"
    }
  ];

  // Auto-rotate every 5.5 seconds
  const totalSlides = publishedDevelopments.length > 0 ? publishedDevelopments.length : defaultHeroImages.length;

  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentDevIndex((prev) => (prev + 1) % totalSlides);
    }, 5500);

    return () => clearInterval(interval);
  }, [totalSlides, isPaused]);

  const handlePrevSlide = () => {
    setCurrentDevIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = () => {
    setCurrentDevIndex((prev) => (prev + 1) % totalSlides);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      transactionType,
      neighborhood,
      type: propertyType,
      maxPrice: maxPrice ? Number(maxPrice) : 0
    });
  };

  // Get current active development or fallback item
  const currentDev = publishedDevelopments[currentDevIndex];
  const currentFallback = defaultHeroImages[currentDevIndex] || defaultHeroImages[0];

  const currentCoverImage = currentDev
    ? (currentDev.images.find(img => img.isCover)?.url || currentDev.images[0]?.url || currentFallback.url)
    : currentFallback.url;

  const currentDevTitle = currentDev ? currentDev.name : currentFallback.title;
  const currentDevNeighborhood = currentDev ? `${currentDev.neighborhood}, ${currentDev.city}/PE` : currentFallback.neighborhood;
  const currentDevPrice = currentDev ? currentDev.startingPrice : currentFallback.price;
  const currentDevStatus = currentDev
    ? (currentDev.status === 'lancamento' ? 'Lançamento' : currentDev.status === 'em_construcao' ? 'Em Obras' : 'Pronto para Morar')
    : currentFallback.status;

  return (
    <section 
      className="relative min-h-[680px] lg:min-h-[760px] flex items-center justify-center bg-[#07080B] text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* Background Architectural Slideshow with High Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {publishedDevelopments.length > 0 ? (
          publishedDevelopments.map((dev, idx) => {
            const imgUrl = dev.images.find(i => i.isCover)?.url || dev.images[0]?.url || defaultHeroImages[0].url;
            const isActive = idx === currentDevIndex;
            return (
              <div
                key={dev.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-85 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
                style={{ transition: 'opacity 1000ms ease-in-out, transform 8000ms ease-out' }}
              >
                <img
                  src={imgUrl}
                  alt={dev.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })
        ) : (
          defaultHeroImages.map((item, idx) => {
            const isActive = idx === currentDevIndex;
            return (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-85 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
                style={{ transition: 'opacity 1000ms ease-in-out, transform 8000ms ease-out' }}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })
        )}

        {/* Refined Luxury Lighting & Vignette Overlay (Allows vivid architecture while preserving text legibility) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/40 to-[#0A0B0E]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0E]/70 via-transparent to-[#0A0B0E]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,11,14,0.15)_0%,rgba(10,11,14,0.75)_85%)] pointer-events-none" />
      </div>

      {/* Manual Slide Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={handlePrevSlide}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-[#C5A059]/40 hover:border-[#C5A059] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105"
            aria-label="Empreendimento anterior"
          >
            <ChevronLeft className="w-6 h-6 text-[#DFBF7E]" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-[#C5A059]/40 hover:border-[#C5A059] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105"
            aria-label="Próximo empreendimento"
          >
            <ChevronRight className="w-6 h-6 text-[#DFBF7E]" />
          </button>
        </>
      )}

      {/* Main Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7 w-full">
        
        {/* Accreditation Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E0F16]/90 border border-[#C5A059]/50 backdrop-blur-md shadow-2xl">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span className="text-xs font-semibold tracking-wider text-[#F0D59B] uppercase">
            Luiz Carlos Fraga • CRECI 12234 • Olinda/PE
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-3.5 max-w-4xl mx-auto drop-shadow-md">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Encontre seu próximo imóvel em Olinda{' '}
            <span className="block gold-gradient-text mt-1">
              com quem realmente entende do mercado local.
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
            {settings.heroSubtitle}
          </p>
        </div>

        {/* Floating Development Showcase Card (Rotates with active background) */}
        <div className="max-w-xl mx-auto">
          <div 
            onClick={() => currentDev && onSelectDevelopment(currentDev)}
            className="group cursor-pointer bg-[#10121A]/85 hover:bg-[#151722]/95 backdrop-blur-md border border-[#C5A059]/60 hover:border-[#DFBF7E] rounded-xl p-3 sm:p-3.5 shadow-2xl flex items-center justify-between gap-3.5 transition-all transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 text-left min-w-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#C5A059]/50 shrink-0 bg-black">
                <img
                  src={currentCoverImage}
                  alt={currentDevTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C5A059] text-black">
                    {currentDevStatus}
                  </span>
                  <span className="text-[11px] text-[#DFBF7E] font-medium truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    {currentDevNeighborhood}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-white truncate group-hover:text-[#F0D59B] transition-colors mt-0.5">
                  {currentDevTitle}
                </h4>
              </div>
            </div>

            <div className="text-right shrink-0 flex items-center gap-2">
              {currentDevPrice && (
                <div className="hidden sm:block">
                  <span className="text-[10px] text-gray-400 block uppercase">A partir de</span>
                  <span className="text-sm font-extrabold text-[#ECC880]">
                    {formatCurrency(currentDevPrice)}
                  </span>
                </div>
              )}
              <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center text-[#DFBF7E] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Carousel Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2.5">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentDevIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentDevIndex
                      ? 'w-8 bg-[#C5A059] shadow-md'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir para empreendimento ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Search Tabbed Form Box */}
        <div className="max-w-4xl mx-auto bg-[#0E0F16]/90 backdrop-blur-2xl p-4 sm:p-6 rounded-2xl border border-[#C5A059]/40 shadow-2xl text-left">
          
          {/* Tabs: Comprar / Alugar / Ver Todos Empreendimentos */}
          <div className="flex items-center gap-2 mb-4 border-b border-[#252838] pb-3">
            <button
              type="button"
              onClick={() => setTransactionType('venda')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                transactionType === 'venda'
                  ? 'bg-[#C5A059] text-black shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Comprar
            </button>
            <button
              type="button"
              onClick={() => setTransactionType('locacao')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                transactionType === 'locacao'
                  ? 'bg-[#C5A059] text-black shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Alugar
            </button>
            <button
              type="button"
              onClick={() => onDirectAction('empreendimentos')}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wider text-gray-300 hover:text-[#E8C782] transition-colors ml-auto flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-[#C5A059]" />
              <span>Ver Todos os Empreendimentos</span>
            </button>
          </div>

          {/* Search Inputs Grid */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Neighborhood */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C5A059]" />
                Bairro / Região
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full bg-[#181A25] border border-[#2E3144] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">Todos os bairros</option>
                <option value="Casa Caiada">Casa Caiada</option>
                <option value="Bairro Novo">Bairro Novo</option>
                <option value="Rio Doce">Rio Doce</option>
                <option value="Jardim Atlântico">Jardim Atlântico</option>
                <option value="Outros">Outras regiões de Olinda</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1">
                <Key className="w-3 h-3 text-[#C5A059]" />
                Tipo de Imóvel
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-[#181A25] border border-[#2E3144] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">Todos os tipos</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="cobertura">Cobertura</option>
                <option value="terreno">Terreno</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            {/* Max Price */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
                Valor Máximo
              </label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-[#181A25] border border-[#2E3144] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">Qualquer valor</option>
                <option value="200000">Até R$ 200.000</option>
                <option value="350000">Até R$ 350.000</option>
                <option value="500000">Até R$ 500.000</option>
                <option value="1000000">Até R$ 1.000.000</option>
                <option value="2000000">Até R$ 2.000.000+</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#A37F38] hover:from-[#D4B066] hover:to-[#B58F44] text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Buscar Imóveis</span>
              </button>
            </div>

          </form>

        </div>

        {/* Quick Features Micro List */}
        <div className="pt-1 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-300 drop-shadow">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            Venda & Locação
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            Administração Patrimonial
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            Avaliação Mercadológica
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            Atendimento Personalizado
          </span>
        </div>

      </div>
    </section>
  );
};
