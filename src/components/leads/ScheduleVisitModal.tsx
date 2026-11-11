import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  MessageCircle,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { Property, Development } from '../../types';
import { createLead, buildWhatsAppLink } from '../../lib/firestoreService';
import confetti from 'canvas-confetti';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProperty?: Property | null;
  targetDevelopment?: Development | null;
  allProperties: Property[];
  allDevelopments: Development[];
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  targetProperty,
  targetDevelopment,
  allProperties,
  allDevelopments
}) => {
  const [selectedType, setSelectedType] = useState<'property' | 'development' | 'general'>(
    targetProperty ? 'property' : targetDevelopment ? 'development' : 'property'
  );
  const [selectedTargetId, setSelectedTargetId] = useState(
    targetProperty?.id || targetDevelopment?.id || allProperties[0]?.id || ''
  );
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Manhã (09h - 12h)');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    let targetTitle = '';
    if (selectedType === 'property') {
      const p = allProperties.find(x => x.id === selectedTargetId);
      targetTitle = p ? `${p.title} (${p.code || p.id})` : 'Imóvel selecionado';
    } else if (selectedType === 'development') {
      const d = allDevelopments.find(x => x.id === selectedTargetId);
      targetTitle = d ? `${d.name}` : 'Empreendimento selecionado';
    } else {
      targetTitle = 'Consultoria Geral em Olinda';
    }

    await createLead({
      name,
      phone,
      interestType: selectedType,
      propertyId: selectedType === 'property' ? selectedTargetId : undefined,
      propertyTitle: selectedType === 'property' ? targetTitle : undefined,
      developmentId: selectedType === 'development' ? selectedTargetId : undefined,
      developmentName: selectedType === 'development' ? targetTitle : undefined,
      preferredDate,
      preferredTime,
      message: `Solicitação de visita: ${targetTitle}. Data: ${preferredDate || 'A combinar'} - ${preferredTime}. ${notes}`,
      originPage: '/agendar-visita'
    });

    setIsSubmitted(true);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const selectedItemName = targetProperty?.title || targetDevelopment?.name || 'Imóvel em Olinda';
  const whatsappUrl = buildWhatsAppLink(
    `Olá Luiz Carlos Fraga! Gostaria de agendar uma visita para "${selectedItemName}". Minha preferência: ${preferredDate || 'Esta semana'} (${preferredTime}). Meu nome é ${name || 'Cliente'}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#14151D] text-white rounded-2xl border border-[#C5A059]/40 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#C5A059] text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Agendamento de Visita Personalizada</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Conheça o Imóvel com Luiz Carlos Fraga
          </h3>
          <p className="text-xs text-gray-400">
            CRECI 12234 • Atendimento exclusivo em Olinda/PE
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 rounded-xl bg-[#191C28] border border-emerald-500/50 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h4 className="font-bold text-lg text-white">Solicitação de Visita Registrada!</h4>
              <p className="text-xs text-gray-300">
                Luiz Carlos Fraga confirmará o horário pelo WhatsApp com você.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] text-black font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar Agora no WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-gray-400 hover:text-white"
              >
                Fechar janela
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Target Select if not predetermined */}
            {!targetProperty && !targetDevelopment && (
              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Selecione o imóvel ou empreendimento</label>
                <select
                  value={selectedTargetId}
                  onChange={(e) => setSelectedTargetId(e.target.value)}
                  className="w-full bg-[#1C1E2A] border border-[#2F3245] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#C5A059]"
                >
                  <optgroup label="Imóveis">
                    {allProperties.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.neighborhood})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Empreendimentos">
                    {allDevelopments.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.neighborhood})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            {(targetProperty || targetDevelopment) && (
              <div className="p-3 rounded-lg bg-[#1B1D28] border border-[#2D3042] text-xs flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="truncate font-semibold text-gray-200">
                  {targetProperty ? targetProperty.title : targetDevelopment?.name}
                </span>
              </div>
            )}

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Seu Nome *</label>
                <input
                  type="text"
                  required
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1C1E2A] border border-[#2F3245] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-medium">WhatsApp com DDD *</label>
                <input
                  type="tel"
                  required
                  placeholder="(81) 98531-3434"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1C1E2A] border border-[#2F3245] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* Preferred Date & Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Data preferencial</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#1C1E2A] border border-[#2F3245] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-medium">Turno preferencial</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-[#1C1E2A] border border-[#2F3245] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Manhã (09h - 12h)">Manhã (09h - 12h)</option>
                  <option value="Tarde (14h - 17h)">Tarde (14h - 17h)</option>
                  <option value="Final de semana">Final de semana</option>
                  <option value="A combinar">A combinar</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-medium">Observações adicionais (opcional)</label>
              <textarea
                rows={2}
                placeholder="Ex: Gostaria de saber se aceita financiamento..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#1C1E2A] border border-[#2F3245] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition-all"
            >
              Solicitar Agendamento
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
