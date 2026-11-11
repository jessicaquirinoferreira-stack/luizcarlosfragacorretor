import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Clock, 
  ChevronDown,
  FileText
} from 'lucide-react';
import { Lead, LeadStatus } from '../../types';
import { updateLeadStatus, buildWhatsAppLink } from '../../lib/firestoreService';
import { formatDate } from '../../lib/formatters';

interface AdminLeadsProps {
  leads: Lead[];
  onRefresh?: () => void;
}

export const AdminLeads: React.FC<AdminLeadsProps> = ({ leads, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const statusMap: Record<LeadStatus, { label: string; bg: string; text: string }> = {
    novo: { label: 'Novo Lead', bg: 'bg-emerald-500/20 border-emerald-500/40', text: 'text-emerald-400' },
    em_atendimento: { label: 'Em Atendimento', bg: 'bg-blue-500/20 border-blue-500/40', text: 'text-blue-400' },
    visita_solicitada: { label: 'Visita Solicitada', bg: 'bg-amber-500/20 border-amber-500/40', text: 'text-amber-400' },
    visita_confirmada: { label: 'Visita Confirmada', bg: 'bg-purple-500/20 border-purple-500/40', text: 'text-purple-400' },
    aguardando_retorno: { label: 'Aguardando Retorno', bg: 'bg-orange-500/20 border-orange-500/40', text: 'text-orange-400' },
    proposta: { label: 'Proposta em Análise', bg: 'bg-yellow-500/20 border-yellow-500/40', text: 'text-yellow-300' },
    convertido: { label: 'Venda / Locação Concluída', bg: 'bg-emerald-600/30 border-emerald-500', text: 'text-emerald-300' },
    nao_convertido: { label: 'Não Convertido', bg: 'bg-gray-500/20 border-gray-500/40', text: 'text-gray-400' },
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.propertyTitle && l.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.developmentName && l.developmentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadStatus(leadId, newStatus);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    await updateLeadStatus(leadId, selectedLead?.status || 'novo', noteInput);
    if (selectedLead) {
      setSelectedLead({ ...selectedLead, notes: noteInput });
    }
  };

  const handleExportCSV = () => {
    const headers = ['Data', 'Nome', 'Telefone', 'Email', 'Interesse', 'Origem', 'Status', 'Mensagem', 'Notas'];
    const rows = filteredLeads.map(l => [
      formatDate(l.createdAt),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${(l.propertyTitle || l.developmentName || l.interestType).replace(/"/g, '""')}"`,
      `"${l.originPage || ''}"`,
      `"${l.status}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads-luiz-carlos-fraga-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#14151D] p-4 rounded-xl border border-[#252838]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1D1F2C] border border-[#C5A059]/40 flex items-center justify-center">
            <Users className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">Gestão de Leads & CRM</h3>
            <p className="text-xs text-gray-400">
              Total de {leads.length} solicitações registradas no site
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome, fone, imóvel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1C1E2B] border border-[#2F3246] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059] w-64"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1C1E2B] border border-[#2F3246] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
          >
            <option value="all">Todos os Status</option>
            <option value="novo">Novo Lead</option>
            <option value="visita_solicitada">Visita Solicitada</option>
            <option value="visita_confirmada">Visita Confirmada</option>
            <option value="em_atendimento">Em Atendimento</option>
            <option value="proposta">Proposta</option>
            <option value="convertido">Convertido</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-lg bg-[#222434] hover:bg-[#2F3248] text-gray-200 text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#34374E]"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Table Column */}
        <div className={`space-y-3 ${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-gray-500 bg-[#14151D] rounded-xl border border-[#252838]">
              Nenhum lead encontrado com os filtros atuais.
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const statusBadge = statusMap[lead.status] || statusMap.novo;
              const isSelected = selectedLead?.id === lead.id;
              const directClientWhatsApp = buildWhatsAppLink(
                `Olá ${lead.name}! Sou Luiz Carlos Fraga, corretor de imóveis em Olinda. Recebi sua solicitação pelo site sobre "${lead.propertyTitle || lead.developmentName || 'imóveis em Olinda'}" e estou à disposição.`,
                lead.phone
              );

              return (
                <div
                  key={lead.id}
                  onClick={() => {
                    setSelectedLead(lead);
                    setNoteInput(lead.notes || '');
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#181A25] border-[#C5A059] shadow-lg'
                      : 'bg-[#12131A] border-[#222432] hover:border-[#383B4E]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{lead.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${statusBadge.bg} ${statusBadge.text}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    <span className="text-[11px] text-gray-400">
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 mb-2">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                      {lead.phone}
                    </span>
                    {lead.email && (
                      <span className="flex items-center gap-1 text-gray-400">
                        <Mail className="w-3.5 h-3.5" />
                        {lead.email}
                      </span>
                    )}
                  </div>

                  {(lead.propertyTitle || lead.developmentName) && (
                    <div className="text-xs text-[#DFBF7E] font-medium truncate mb-2">
                      Interesse: {lead.propertyTitle || lead.developmentName}
                    </div>
                  )}

                  {lead.message && (
                    <p className="text-xs text-gray-400 line-clamp-1 italic bg-[#171922] p-2 rounded">
                      "{lead.message}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#1F212E]">
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(lead.id, e.target.value as LeadStatus);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#1C1E2A] border border-[#2F3245] rounded px-2 py-1 text-[11px] text-white"
                      >
                        <option value="novo">Novo Lead</option>
                        <option value="visita_solicitada">Visita Solicitada</option>
                        <option value="visita_confirmada">Visita Confirmada</option>
                        <option value="em_atendimento">Em Atendimento</option>
                        <option value="proposta">Proposta</option>
                        <option value="convertido">Convertido (Vendido)</option>
                        <option value="nao_convertido">Não Convertido</option>
                      </select>
                    </div>

                    <a
                      href={directClientWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Lead Detail & Notes Drawer */}
        {selectedLead && (
          <div className="lg:col-span-5 bg-[#14151D] p-6 rounded-xl border border-[#C5A059]/40 space-y-5 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#252838]">
              <div>
                <h4 className="font-bold text-white text-base">{selectedLead.name}</h4>
                <p className="text-xs text-[#C5A059]">Detalhes do Contato & Histórico</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-white text-xs"
              >
                Fechar
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#1C1E2A] rounded-lg space-y-1">
                <span className="text-gray-400 block text-[10px] uppercase">Telefone</span>
                <span className="text-sm font-bold text-white">{selectedLead.phone}</span>
              </div>

              {selectedLead.email && (
                <div className="p-3 bg-[#1C1E2A] rounded-lg space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">E-mail</span>
                  <span className="text-white">{selectedLead.email}</span>
                </div>
              )}

              {selectedLead.propertyTitle && (
                <div className="p-3 bg-[#1C1E2A] rounded-lg space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Imóvel de Interesse</span>
                  <span className="text-[#DFBF7E] font-semibold">{selectedLead.propertyTitle}</span>
                </div>
              )}

              {selectedLead.preferredDate && (
                <div className="p-3 bg-[#1C1E2A] rounded-lg space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Preferência de Visita</span>
                  <span className="text-white font-medium">
                    {selectedLead.preferredDate} ({selectedLead.preferredTime || 'A combinar'})
                  </span>
                </div>
              )}

              {selectedLead.message && (
                <div className="p-3 bg-[#1C1E2A] rounded-lg space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase">Mensagem do Cliente</span>
                  <p className="text-gray-200 leading-relaxed whitespace-pre-line">{selectedLead.message}</p>
                </div>
              )}
            </div>

            {/* Internal CRM notes */}
            <div className="space-y-2 pt-2 border-t border-[#252838]">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Observações Internas (Visitas, contrapropostas, etc.)</span>
              </label>
              <textarea
                rows={3}
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Ex: Cliente tem R$ 150k de entrada e pretende financiar o saldo pela Caixa..."
                className="w-full bg-[#1C1E2A] border border-[#2F3245] rounded-lg p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="button"
                onClick={() => handleSaveNotes(selectedLead.id)}
                className="w-full py-2 bg-[#252838] hover:bg-[#34384D] text-[#DFBF7E] font-semibold text-xs rounded-lg border border-[#3E4258] transition-colors"
              >
                Salvar Anotação Interna
              </button>
            </div>

            {/* Quick WhatsApp Action */}
            <a
              href={buildWhatsAppLink(
                `Olá ${selectedLead.name}! Aqui é Luiz Carlos Fraga (CRECI 12234). Recebi seu contato referente ao imóvel em Olinda. Podemos conversar?`,
                selectedLead.phone
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Iniciar Atendimento no WhatsApp</span>
            </a>

          </div>
        )}

      </div>

    </div>
  );
};
