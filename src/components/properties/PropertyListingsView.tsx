import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  MapPin, 
  Home, 
  DollarSign, 
  Bed, 
  Car, 
  Maximize2, 
  ArrowUpDown,
  MessageCircle,
  RotateCcw
} from 'lucide-react';
import { Property, SearchFilterState, TransactionType } from '../../types';
import { PropertyCard } from './PropertyCard';
import { buildWhatsAppLink } from '../../lib/firestoreService';

interface PropertyListingsViewProps {
  properties: Property[];
  initialTransactionType?: 'all' | 'venda' | 'locacao';
  initialSearchQuery?: string;
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
}

export const PropertyListingsView: React.FC<PropertyListingsViewProps> = ({
  properties,
  initialTransactionType = 'all',
  initialSearchQuery = '',
  onSelectProperty,
  onScheduleVisit
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [transactionType, setTransactionType] = useState<'all' | 'venda' | 'locacao'>(initialTransactionType);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minBedrooms, setMinBedrooms] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<'recent' | 'price_asc' | 'price_desc' | 'area_desc'>('recent');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setSearchTerm('');
    setTransactionType('all');
    setSelectedNeighborhood('all');
    setSelectedType('all');
    setMinPrice('');
    setMaxPrice('');
    setMinBedrooms('');
    setSortBy('recent');
  };

  const filteredProperties = useMemo(() => {
    return properties
      .filter(p => p.status === 'published')
      .filter(p => {
        // Search term
        if (searchTerm) {
          const query = searchTerm.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(query);
          const matchNeighborhood = p.neighborhood.toLowerCase().includes(query);
          const matchCode = (p.code || '').toLowerCase().includes(query);
          if (!matchTitle && !matchNeighborhood && !matchCode) return false;
        }

        // Transaction Type
        if (transactionType !== 'all' && p.transactionType !== transactionType) {
          return false;
        }

        // Neighborhood
        if (selectedNeighborhood !== 'all' && p.neighborhood !== selectedNeighborhood) {
          return false;
        }

        // Type
        if (selectedType !== 'all' && p.type !== selectedType) {
          return false;
        }

        // Min Price
        if (minPrice && p.price < Number(minPrice)) {
          return false;
        }

        // Max Price
        if (maxPrice && p.price > Number(maxPrice)) {
          return false;
        }

        // Min Bedrooms
        if (minBedrooms && p.bedrooms < Number(minBedrooms)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'area_desc') return b.areaM2 - a.areaM2;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    properties,
    searchTerm,
    transactionType,
    selectedNeighborhood,
    selectedType,
    minPrice,
    maxPrice,
    minBedrooms,
    sortBy
  ]);

  const whatsappEncomendaUrl = buildWhatsAppLink(
    `Olá Luiz Carlos Fraga! Procurei no site por imóveis com características específicas e gostaria que você buscasse opções personalizadas para mim em Olinda.`
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 text-[#14151C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F36] block">
            Portfólio Imobiliário em Olinda/PE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111217]">
            {transactionType === 'venda'
              ? 'Imóveis à Venda em Olinda'
              : transactionType === 'locacao'
              ? 'Imóveis para Locação em Olinda'
              : 'Todos os Imóveis Disponíveis'}
          </h1>
          <p className="text-sm text-gray-600">
            Encontre a melhor opção em Casa Caiada, Bairro Novo, Rio Doce e adjacências com assessoria de Luiz Carlos Fraga (CRECI 12234).
          </p>
        </div>

        {/* Filters Top Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E5DFD3] shadow-sm space-y-4">
          
          {/* Main search and transaction type row */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por bairro, condomínio, código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#14151C] placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* Transaction Type Buttons */}
            <div className="flex items-center gap-1.5 w-full md:w-auto shrink-0">
              <button
                onClick={() => setTransactionType('all')}
                className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  transactionType === 'all'
                    ? 'bg-[#181922] text-white shadow'
                    : 'bg-[#FAF8F5] text-gray-700 border border-[#DDD7CA] hover:border-[#C5A059]'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setTransactionType('venda')}
                className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  transactionType === 'venda'
                    ? 'bg-[#C5A059] text-black shadow'
                    : 'bg-[#FAF8F5] text-gray-700 border border-[#DDD7CA] hover:border-[#C5A059]'
                }`}
              >
                Venda
              </button>
              <button
                onClick={() => setTransactionType('locacao')}
                className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  transactionType === 'locacao'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-[#FAF8F5] text-gray-700 border border-[#DDD7CA] hover:border-[#C5A059]'
                }`}
              >
                Locação
              </button>
            </div>
          </div>

          {/* Secondary filter inputs row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            {/* Neighborhood */}
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:border-[#C5A059]"
            >
              <option value="all">Todos os Bairros</option>
              <option value="Casa Caiada">Casa Caiada</option>
              <option value="Bairro Novo">Bairro Novo</option>
              <option value="Rio Doce">Rio Doce</option>
              <option value="Jardim Atlântico">Jardim Atlântico</option>
              <option value="Carmo">Carmo</option>
            </select>

            {/* Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:border-[#C5A059]"
            >
              <option value="all">Tipos de Imóvel</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="cobertura">Cobertura</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>

            {/* Bedrooms */}
            <select
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value ? Number(e.target.value) : '')}
              className="bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:border-[#C5A059]"
            >
              <option value="">Quartos (Qualquer)</option>
              <option value="1">1+ Quarto</option>
              <option value="2">2+ Quartos</option>
              <option value="3">3+ Quartos</option>
              <option value="4">4+ Quartos</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF8F5] border border-[#DDD7CA] rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:border-[#C5A059]"
            >
              <option value="recent">Mais Recentes</option>
              <option value="price_asc">Menor Preço</option>
              <option value="price_desc">Maior Preço</option>
              <option value="area_desc">Maior Área</option>
            </select>
          </div>

          {/* Active Results count & Reset */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE0] text-xs text-gray-600">
            <span>
              Mostrando <strong>{filteredProperties.length}</strong> imóveis encontrados
            </span>

            <button
              onClick={resetFilters}
              className="text-[#8C6F36] hover:text-black font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar Filtros</span>
            </button>
          </div>

        </div>

        {/* Properties Grid or Empty State */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onScheduleVisit={onScheduleVisit}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-[#E5DFD3] text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF5EC] border border-[#E0D5BE] flex items-center justify-center mx-auto text-[#8C6F36]">
              <Home className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#111217]">
              Nenhum imóvel encontrado com esses critérios
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              Não se preocupe! O mercado de Olinda é dinâmico e Luiz Carlos Fraga possui contatos diretos com proprietários em Casa Caiada, Bairro Novo e Rio Doce.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2.5 rounded-lg border border-[#DDD7CA] text-xs font-semibold text-gray-700 hover:text-black"
              >
                Limpar Todos os Filtros
              </button>

              <a
                href={whatsappEncomendaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#D4B066] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Solicitar Busca Sob Medida</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
