import React, { useState } from 'react';
import { Property } from '../../types';
import { PropertyCard } from '../properties/PropertyCard';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onViewAll: (type?: 'venda' | 'locacao') => void;
  onScheduleVisit: (property: Property) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  onSelectProperty,
  onViewAll,
  onScheduleVisit
}) => {
  const [filterType, setFilterType] = useState<'all' | 'venda' | 'locacao'>('all');

  const filtered = properties
    .filter(p => p.status === 'published')
    .filter(p => (filterType === 'all' ? true : p.transactionType === filterType))
    .slice(0, 6);

  return (
    <section className="py-20 bg-[#FAF8F5] text-[#14151C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#E8E2D5]">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F36] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Oportunidades em Casa Caiada, Bairro Novo e Rio Doce
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111217]">
              Imóveis em Destaque
            </h2>
            <p className="text-sm text-gray-600 max-w-xl">
              Seleção cuidadosa de apartamentos e casas avaliados pessoalmente por Luiz Carlos Fraga (CRECI 12234).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filterType === 'all'
                  ? 'bg-[#181922] text-white shadow'
                  : 'bg-white text-gray-600 hover:text-black border border-[#E0D9CB]'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('venda')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filterType === 'venda'
                  ? 'bg-[#C5A059] text-black shadow'
                  : 'bg-white text-gray-600 hover:text-black border border-[#E0D9CB]'
              }`}
            >
              À Venda
            </button>
            <button
              onClick={() => setFilterType('locacao')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filterType === 'locacao'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-white text-gray-600 hover:text-black border border-[#E0D9CB]'
              }`}
            >
              Locação
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
              onScheduleVisit={onScheduleVisit}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => onViewAll(filterType === 'all' ? undefined : filterType)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#15161E] hover:bg-[#252735] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-xl group"
          >
            <span>Ver Todos os Imóveis Disponíveis</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
