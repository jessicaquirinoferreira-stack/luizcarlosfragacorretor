import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Users, 
  Calendar, 
  Eye, 
  Plus, 
  Sparkles, 
  Copy, 
  Edit, 
  Trash2, 
  Check, 
  AlertCircle,
  ExternalLink,
  MessageCircle,
  TrendingUp,
  Share2
} from 'lucide-react';
import { Property, Development, Lead, LandingPage, SiteSettings } from '../../types';
import { formatCurrency, formatDate } from '../../lib/formatters';

interface AdminDashboardProps {
  properties: Property[];
  developments: Development[];
  leads: Lead[];
  landingPages: LandingPage[];
  onNewProperty: () => void;
  onEditProperty: (prop: Property) => void;
  onDeleteProperty: (id: string) => void;
  onTogglePropertyStatus: (prop: Property) => void;
  onNewDevelopment: () => void;
  onEditDevelopment: (dev: Development) => void;
  onDeleteDevelopment: (id: string) => void;
  onNewLandingPage: () => void;
  onEditLandingPage: (page: LandingPage) => void;
  onDeleteLandingPage: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  properties,
  developments,
  leads,
  landingPages,
  onNewProperty,
  onEditProperty,
  onDeleteProperty,
  onTogglePropertyStatus,
  onNewDevelopment,
  onEditDevelopment,
  onDeleteDevelopment,
  onNewLandingPage,
  onEditLandingPage,
  onDeleteLandingPage,
  onNavigateToTab
}) => {
  const [copiedLpId, setCopiedLpId] = useState<string | null>(null);

  const publishedProps = properties.filter(p => p.status === 'published').length;
  const forSaleCount = properties.filter(p => p.transactionType === 'venda').length;
  const forRentCount = properties.filter(p => p.transactionType === 'locacao').length;
  const visitsCount = leads.filter(l => l.status === 'visita_solicitada' || l.status === 'visita_confirmada').length;
  const totalViews = properties.reduce((acc, p) => acc + (p.viewsCount || 0), 0) + 
                     developments.reduce((acc, d) => acc + (d.viewsCount || 0), 0);

  const handleCopyLandingLink = (lp: LandingPage) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${origin}/#campanha/${lp.slug}?utm_source=instagram&utm_medium=stories&utm_campaign=${lp.slug}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLpId(lp.id);
    setTimeout(() => setCopiedLpId(null), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#171922] via-[#1A1C28] to-[#121319] p-6 sm:p-8 rounded-2xl border border-[#C5A059]/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] block">
            Painel Exclusivo de Gestão
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Luiz Carlos Fraga • CRECI 12234
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Gestão completa do site imobiliário institucional de Olinda/PE.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onNewProperty}
            className="px-4 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Imóvel</span>
          </button>

          <button
            onClick={onNewDevelopment}
            className="px-4 py-2.5 bg-[#252838] hover:bg-[#34384E] text-[#DFBF7E] border border-[#C5A059]/40 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all"
          >
            <Building2 className="w-4 h-4 text-[#C5A059]" />
            <span>Novo Prédio</span>
          </button>

          <button
            onClick={onNewLandingPage}
            className="px-4 py-2.5 bg-[#1F212D] hover:bg-[#2C2F40] text-gray-200 border border-[#303348] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Nova Landing Page</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14151D] p-5 rounded-xl border border-[#252838] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Imóveis Ativos</span>
            <Home className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{publishedProps}</div>
          <div className="text-[11px] text-gray-400">
            {forSaleCount} à venda • {forRentCount} para alugar
          </div>
        </div>

        <div className="bg-[#14151D] p-5 rounded-xl border border-[#252838] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Empreendimentos</span>
            <Building2 className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{developments.length}</div>
          <div className="text-[11px] text-[#DFBF7E]">
            Prédios e condomínios cadastrados
          </div>
        </div>

        <div className="bg-[#14151D] p-5 rounded-xl border border-[#252838] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Leads & Visitas</span>
            <Users className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{leads.length}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">
            {visitsCount} visitas agendadas
          </div>
        </div>

        <div className="bg-[#14151D] p-5 rounded-xl border border-[#252838] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Visualizações</span>
            <Eye className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalViews.toLocaleString('pt-BR')}</div>
          <div className="text-[11px] text-gray-400">
            Tráfego direto & campanhas sociais
          </div>
        </div>
      </div>

      {/* Properties Management Table */}
      <div className="bg-[#14151D] rounded-xl border border-[#252838] overflow-hidden shadow-lg space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Home className="w-5 h-5 text-[#C5A059]" />
              Imóveis Cadastrados ({properties.length})
            </h3>
            <p className="text-xs text-gray-400">
              Controle de status, destaques e edição de unidades em Olinda/PE
            </p>
          </div>

          <button
            onClick={onNewProperty}
            className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#D4B066] text-black font-bold text-xs rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Imóvel</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1D28] text-gray-400 uppercase text-[10px] tracking-wider border-b border-[#2B2D3C]">
              <tr>
                <th className="py-3 px-3">Imóvel</th>
                <th className="py-3 px-3">Finalidade</th>
                <th className="py-3 px-3">Bairro</th>
                <th className="py-3 px-3">Preço</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Confirmação</th>
                <th className="py-3 px-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202230]">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-[#181A24] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={p.images[0]?.url || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=150&q=80'}
                        alt=""
                        className="w-10 h-10 rounded object-cover shrink-0"
                      />
                      <div>
                        <span className="font-semibold text-white block truncate max-w-xs">{p.title}</span>
                        <span className="text-[10px] text-[#DFBF7E] font-mono">{p.code || p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 capitalize">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.transactionType === 'venda' ? 'bg-[#C5A059]/20 text-[#DFBF7E]' : 'bg-blue-900/40 text-blue-300'
                    }`}>
                      {p.transactionType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-300">{p.neighborhood}</td>
                  <td className="py-3 px-3 font-bold text-white">{formatCurrency(p.price)}</td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => onTogglePropertyStatus(p)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'published'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                          : 'bg-gray-800 text-gray-400 border border-gray-600'
                      }`}
                    >
                      {p.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </button>
                  </td>
                  <td className="py-3 px-3">
                    {p.pendingConfirmation ? (
                      <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        Pendente
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400">Confirmado</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEditProperty(p)}
                        className="p-1.5 rounded hover:bg-[#282B3C] text-gray-300 hover:text-white"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProperty(p.id)}
                        className="p-1.5 rounded hover:bg-red-950/60 text-gray-400 hover:text-red-400"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Developments Row */}
      <div className="bg-[#14151D] rounded-xl border border-[#252838] overflow-hidden shadow-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#C5A059]" />
              Empreendimentos & Lançamentos ({developments.length})
            </h3>
            <p className="text-xs text-gray-400">
              Prédios em Olinda vinculados aos imóveis e campanhas
            </p>
          </div>

          <button
            onClick={onNewDevelopment}
            className="px-3 py-1.5 bg-[#252838] hover:bg-[#32364B] text-[#DFBF7E] border border-[#C5A059]/40 font-bold text-xs rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Empreendimento</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {developments.map((dev) => (
            <div key={dev.id} className="p-4 bg-[#1B1D28] rounded-xl border border-[#2B2D3C] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={dev.images[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80'}
                  alt=""
                  className="w-12 h-12 rounded object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">{dev.name}</h4>
                  <p className="text-xs text-[#C5A059]">{dev.neighborhood}, Olinda/PE</p>
                  <p className="text-[11px] text-gray-400">
                    A partir de {formatCurrency(dev.startingPrice)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditDevelopment(dev)}
                  className="p-1.5 rounded hover:bg-[#282B3C] text-gray-300 hover:text-white"
                  title="Editar"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteDevelopment(dev.id)}
                  className="p-1.5 rounded hover:bg-red-950/60 text-gray-400 hover:text-red-400"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Landing Pages & Social Links Section */}
      <div className="bg-[#14151D] rounded-xl border border-[#252838] overflow-hidden shadow-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
              Landing Pages & Links Sociais Prontos ({landingPages.length})
            </h3>
            <p className="text-xs text-gray-400">
              Páginas de alta conversão para Instagram Stories, Bio, Facebook e WhatsApp
            </p>
          </div>

          <button
            onClick={onNewLandingPage}
            className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#D4B066] text-black font-bold text-xs rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Criar Nova Landing Page</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {landingPages.map((lp) => (
            <div key={lp.id} className="p-4 bg-[#1B1D28] rounded-xl border border-[#2F3245] space-y-3">
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] bg-[#12131A] px-2 py-0.5 rounded">
                  /campanha/{lp.slug}
                </span>
                <h4 className="font-bold text-sm text-white mt-1.5 line-clamp-1">{lp.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">{lp.subtitle}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#252838]">
                <span className="text-gray-400">
                  {lp.viewsCount || 0} acessos • {lp.leadsCount || 0} leads
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyLandingLink(lp)}
                    className="p-1.5 rounded bg-[#252838] hover:bg-[#35384D] text-[#DFBF7E]"
                    title="Copiar link com UTM"
                  >
                    {copiedLpId === lp.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => onEditLandingPage(lp)}
                    className="p-1.5 rounded hover:bg-[#282B3C] text-gray-300"
                    title="Editar"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteLandingPage(lp.id)}
                    className="p-1.5 rounded hover:bg-red-950/60 text-gray-400 hover:text-red-400"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
