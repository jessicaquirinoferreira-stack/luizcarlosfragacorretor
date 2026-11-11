import React from 'react';
import { Development } from '../../types';
import { DevelopmentCard } from '../developments/DevelopmentCard';
import { Building2, Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedDevelopmentsProps {
  developments: Development[];
  onSelectDevelopment: (dev: Development) => void;
  onViewAll: () => void;
}

export const FeaturedDevelopments: React.FC<FeaturedDevelopmentsProps> = ({
  developments,
  onSelectDevelopment,
  onViewAll
}) => {
  const published = developments.filter(d => d.isPublished).slice(0, 4);

  return (
    <section className="py-20 bg-[#0E0F14] text-white border-t border-[#1F2230]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#242738]">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              Edifícios & Lançamentos em Olinda/PE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Empreendimentos em Destaque
            </h2>
            <p className="text-sm text-gray-400 max-w-xl">
              Condomínios de prestígio na orla e nas regiões mais nobres de Casa Caiada e Bairro Novo.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DFBF7E] hover:text-white transition-colors"
          >
            <span>Conhecer todos os prédios</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {published.map((dev) => (
            <DevelopmentCard
              key={dev.id}
              development={dev}
              onSelect={onSelectDevelopment}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
