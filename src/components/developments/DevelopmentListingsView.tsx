import React, { useState } from 'react';
import { Development } from '../../types';
import { DevelopmentCard } from './DevelopmentCard';
import { Building2, Search } from 'lucide-react';

interface DevelopmentListingsViewProps {
  developments: Development[];
  onSelectDevelopment: (dev: Development) => void;
}

export const DevelopmentListingsView: React.FC<DevelopmentListingsViewProps> = ({
  developments,
  onSelectDevelopment
}) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState('all');

  const filtered = developments
    .filter(d => d.isPublished)
    .filter(d => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (neighborhoodFilter !== 'all' && d.neighborhood !== neighborhoodFilter) return false;
      return true;
    });

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 text-[#14151C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F36] block">
            Prédios, Condomínios e Lançamentos
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111217]">
            Empreendimentos em Olinda/PE
          </h1>
          <p className="text-sm text-gray-600">
            Conheça os melhores edifícios e condomínios fechados em Casa Caiada, Bairro Novo e orla de Olinda.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-[#E5DFD3] flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg px-3 py-2 text-xs text-gray-800"
          >
            <option value="all">Todas as Fases</option>
            <option value="lancamento">Lançamentos</option>
            <option value="em_construcao">Em Construção</option>
            <option value="pronto_para_morar">Prontos para Morar</option>
          </select>

          <select
            value={neighborhoodFilter}
            onChange={(e) => setNeighborhoodFilter(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD7CA] rounded-lg px-3 py-2 text-xs text-gray-800"
          >
            <option value="all">Todos os Bairros</option>
            <option value="Casa Caiada">Casa Caiada</option>
            <option value="Bairro Novo">Bairro Novo</option>
            <option value="Rio Doce">Rio Doce</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dev) => (
            <DevelopmentCard
              key={dev.id}
              development={dev}
              onSelect={onSelectDevelopment}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
