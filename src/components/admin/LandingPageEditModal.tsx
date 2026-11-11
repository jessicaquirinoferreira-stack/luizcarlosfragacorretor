import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink,
  MessageCircle,
  Share2
} from 'lucide-react';
import { LandingPage } from '../../types';
import { generateSlug } from '../../lib/formatters';

interface LandingPageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (page: LandingPage) => Promise<void>;
  initialPage?: LandingPage | null;
}

export const LandingPageEditModal: React.FC<LandingPageEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPage
}) => {
  const isEditing = !!initialPage;

  const [title, setTitle] = useState(initialPage?.title || '');
  const [slug, setSlug] = useState(initialPage?.slug || '');
  const [subtitle, setSubtitle] = useState(initialPage?.subtitle || '');
  const [customPrice, setCustomPrice] = useState(initialPage?.customPrice || '');
  const [heroImage, setHeroImage] = useState(
    initialPage?.heroImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80'
  );
  const [highlightsText, setHighlightsText] = useState(
    initialPage?.highlightPoints ? initialPage.highlightPoints.join('\n') : 'Localização nobre em Olinda\nDocumentação pronta para financiamento\nCondomínio organizado'
  );
  const [description, setDescription] = useState(
    initialPage?.description || 'Oportunidade única selecionada por Luiz Carlos Fraga, CRECI 12234. Agende sua visita diretamente.'
  );
  const [whatsappCustomMessage, setWhatsappCustomMessage] = useState(
    initialPage?.whatsappCustomMessage || 'Olá Luiz Carlos Fraga! Gostaria de atendimento para esta oportunidade em Olinda.'
  );
  const [isActive, setIsActive] = useState(initialPage?.isActive !== undefined ? initialPage.isActive : true);
  const [utmSource, setUtmSource] = useState(initialPage?.utmPreset?.source || 'instagram');
  const [utmCampaign, setUtmCampaign] = useState(initialPage?.utmPreset?.campaign || slug || 'campanha');

  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing || !slug) {
      const generated = generateSlug(val);
      setSlug(generated);
      setUtmCampaign(generated);
    }
  };

  const previewLink = typeof window !== 'undefined' 
    ? `${window.location.origin}/#campanha/${slug}?utm_source=${utmSource}&utm_campaign=${utmCampaign}`
    : `/#campanha/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(previewLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const pageData: LandingPage = {
      id: initialPage?.id || 'lp-' + Date.now(),
      title,
      slug: slug || generateSlug(title),
      subtitle,
      heroImage,
      targetType: initialPage?.targetType || 'custom',
      customPrice,
      highlightPoints: highlightsText.split('\n').map(s => s.trim()).filter(Boolean),
      description,
      images: initialPage?.images || [],
      whatsappCustomMessage,
      isActive,
      viewsCount: initialPage?.viewsCount || 0,
      leadsCount: initialPage?.leadsCount || 0,
      utmPreset: {
        source: utmSource,
        campaign: utmCampaign,
        medium: 'social'
      },
      createdAt: initialPage?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await onSave(pageData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#14151D] text-white rounded-2xl border border-[#C5A059]/40 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#252838]">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
              {isEditing ? 'Editar Landing Page de Campanha' : 'Criar Nova Landing Page Premium'}
            </h3>
            <p className="text-xs text-[#C5A059]">
              Gere páginas de alta conversão com links prontos para Instagram Stories, Bio e Anúncios.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#202230]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-gray-300 font-semibold">Título da Campanha *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ex: Oportunidade Exclusiva: Edifício Fonte Atlântico"
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Slug da URL (/campanha/...)</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-sm text-[#DFBF7E] font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Subtítulo / Chamada de Impacto</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Apartamento 3 Quartos em Casa Caiada a passos do mar"
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Condição / Preço Destacado</label>
              <input
                type="text"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                placeholder="Ex: R$ 350.000 ou A partir de R$ 275.000"
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Imagem de Fundo / Banner Principal (URL)</label>
            <input
              type="url"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Pontos Fortes (1 por linha)</label>
            <textarea
              rows={4}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="Digite cada ponto forte em uma linha separada..."
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg p-3 text-white placeholder-gray-500 font-mono text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Mensagem Padrão para o Botão do WhatsApp</label>
            <input
              type="text"
              value={whatsappCustomMessage}
              onChange={(e) => setWhatsappCustomMessage(e.target.value)}
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
            />
          </div>

          {/* Social Share Link Generator */}
          <div className="p-4 rounded-xl bg-[#181A24] border border-[#C5A059]/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#E5C687] flex items-center gap-1.5">
                <Share2 className="w-4 h-4" />
                Link de Divulgação com Rastreamento UTM
              </span>
              <span className="text-[10px] text-gray-400">Pronto para Instagram e Anúncios</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 block mb-1">Origem (UTM Source)</label>
                <select
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  className="w-full bg-[#12131A] border border-[#2D3042] rounded px-2.5 py-1.5 text-white"
                >
                  <option value="instagram_stories">Instagram Stories</option>
                  <option value="instagram_bio">Instagram Bio (Linktree)</option>
                  <option value="whatsapp_status">WhatsApp Status</option>
                  <option value="facebook_ads">Meta / Facebook Ads</option>
                  <option value="google_ads">Google Ads</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Nome Campanha (UTM Campaign)</label>
                <input
                  type="text"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  className="w-full bg-[#12131A] border border-[#2D3042] rounded px-2.5 py-1.5 text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                readOnly
                value={previewLink}
                className="flex-1 bg-[#0E0F14] border border-[#2A2C3C] rounded px-3 py-2 text-xs text-gray-300 font-mono select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4B066] text-black font-bold rounded flex items-center gap-1.5 shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-[#181A24] border border-[#272938]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-[#C5A059]"
              />
              <span className="text-white font-semibold">Landing Page Ativa e Acessível</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#252838]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#303348] text-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] text-black font-bold uppercase rounded-lg"
            >
              {isSaving ? 'Salvando...' : 'Salvar Landing Page'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
