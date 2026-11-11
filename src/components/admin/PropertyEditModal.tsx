import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Star, 
  Plus, 
  Image as ImageIcon, 
  Film, 
  Check, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { Property, MediaItem, PropertyType, TransactionType, PropertyStatus } from '../../types';
import { generateSlug } from '../../lib/formatters';
import { optimizeImageFile, createMediaItem } from '../../lib/imageOptimizer';

interface PropertyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (property: Property) => Promise<void>;
  initialProperty?: Property | null;
  developments: { id: string; name: string }[];
}

export const PropertyEditModal: React.FC<PropertyEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProperty,
  developments
}) => {
  const isEditing = !!initialProperty;

  const [title, setTitle] = useState(initialProperty?.title || '');
  const [slug, setSlug] = useState(initialProperty?.slug || '');
  const [code, setCode] = useState(initialProperty?.code || `LCF-${Math.floor(100 + Math.random() * 900)}`);
  const [type, setType] = useState<PropertyType>(initialProperty?.type || 'apartamento');
  const [transactionType, setTransactionType] = useState<TransactionType>(initialProperty?.transactionType || 'venda');
  const [price, setPrice] = useState<number>(initialProperty?.price || 0);
  const [condoFee, setCondoFee] = useState<number>(initialProperty?.condoFee || 0);
  const [iptuFee, setIptuFee] = useState<number>(initialProperty?.iptuFee || 0);
  const [neighborhood, setNeighborhood] = useState(initialProperty?.neighborhood || 'Casa Caiada');
  const [city, setCity] = useState(initialProperty?.city || 'Olinda');
  const [state, setState] = useState(initialProperty?.state || 'PE');
  const [addressPrivate, setAddressPrivate] = useState(initialProperty?.addressPrivate || '');
  const [areaM2, setAreaM2] = useState<number>(initialProperty?.areaM2 || 60);
  const [bedrooms, setBedrooms] = useState<number>(initialProperty?.bedrooms || 2);
  const [suites, setSuites] = useState<number>(initialProperty?.suites || 1);
  const [bathrooms, setBathrooms] = useState<number>(initialProperty?.bathrooms || 2);
  const [parkingSpots, setParkingSpots] = useState<number>(initialProperty?.parkingSpots || 1);
  const [description, setDescription] = useState(initialProperty?.description || '');
  const [featuresString, setFeaturesString] = useState(
    initialProperty?.features ? initialProperty.features.join(', ') : 'Varanda Gourmet, Elevador, Garagem Coberta'
  );
  const [images, setImages] = useState<MediaItem[]>(initialProperty?.images || []);
  const [videoUrl, setVideoUrl] = useState(initialProperty?.videoUrl || '');
  const [isFeatured, setIsFeatured] = useState(initialProperty?.isFeatured || false);
  const [status, setStatus] = useState<PropertyStatus>(initialProperty?.status || 'published');
  const [developmentId, setDevelopmentId] = useState(initialProperty?.developmentId || '');
  const [pendingConfirmation, setPendingConfirmation] = useState(
    initialProperty?.pendingConfirmation !== undefined ? initialProperty.pendingConfirmation : true
  );

  const [isUploading, setIsUploading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing || !slug) {
      setSlug(generateSlug(val));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const newItems: MediaItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const optimizedDataUrl = await optimizeImageFile(file, 1600, 0.85);
        newItems.push({
          id: 'img-' + Date.now() + '-' + i,
          url: optimizedDataUrl,
          caption: file.name.replace(/\.[^/.]+$/, ''),
          isCover: images.length === 0 && i === 0,
          type: 'image'
        });
      }
      setImages([...images, ...newItems]);
    } catch (err) {
      console.error('Upload error', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddUrlImage = () => {
    if (!newImageUrl.trim()) return;
    const newItem = createMediaItem(newImageUrl.trim(), '', images.length === 0);
    setImages([...images, newItem]);
    setNewImageUrl('');
  };

  const handleSetCover = (index: number) => {
    setImages(images.map((img, i) => ({ ...img, isCover: i === index })));
  };

  const handleRemoveImage = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    if (images[index].isCover && next.length > 0) {
      next[0].isCover = true;
    }
    setImages(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const devObj = developments.find(d => d.id === developmentId);

    const propertyData: Property = {
      id: initialProperty?.id || 'prop-' + Date.now(),
      title,
      slug: slug || generateSlug(title),
      code,
      type,
      transactionType,
      price: Number(price),
      condoFee: Number(condoFee) || 0,
      iptuFee: Number(iptuFee) || 0,
      neighborhood,
      city,
      state,
      addressPrivate,
      areaM2: Number(areaM2),
      bedrooms: Number(bedrooms),
      suites: Number(suites),
      bathrooms: Number(bathrooms),
      parkingSpots: Number(parkingSpots),
      description,
      features: featuresString.split(',').map(s => s.trim()).filter(Boolean),
      images: images.length > 0 ? images : [
        {
          id: 'def-1',
          url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
          caption: 'Foto de Apresentação',
          isCover: true,
          type: 'image'
        }
      ],
      videoUrl,
      isFeatured,
      status,
      developmentId: developmentId || undefined,
      developmentName: devObj?.name,
      pendingConfirmation,
      createdAt: initialProperty?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await onSave(propertyData);
      onClose();
    } catch (err) {
      console.error('Error saving property', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#14151D] text-white rounded-2xl border border-[#C5A059]/40 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#252838]">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {isEditing ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}
            </h3>
            <p className="text-xs text-[#C5A059]">
              Gestão de Imóveis • Luiz Carlos Fraga | CRECI 12234
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#202230]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4 text-xs">
          
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-gray-300 font-semibold">Título do Imóvel *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ex: Apartamento em Bairro Novo com Vista Mar"
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Código do Imóvel</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ex: LCF-101"
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* Business & Classification */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Finalidade *</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="venda">Venda</option>
                <option value="locacao">Locação</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Tipo de Imóvel *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="cobertura">Cobertura</option>
                <option value="terreno">Terreno</option>
                <option value="flat">Flat</option>
                <option value="comercial">Comercial</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Status de Publicação</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="published">Publicado no Site</option>
                <option value="draft">Rascunho (Privado)</option>
                <option value="sold">Vendido</option>
                <option value="rented">Alugado</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Vincular a Empreendimento</label>
              <select
                value={developmentId}
                onChange={(e) => setDevelopmentId(e.target.value)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">Nenhum (Imóvel avulso)</option>
                {developments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#181A24] border border-[#272938]">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Preço (R$) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#12131A] border border-[#303348] rounded-lg px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Condomínio Mensal (R$)</label>
              <input
                type="number"
                value={condoFee}
                onChange={(e) => setCondoFee(Number(e.target.value))}
                placeholder="Ex: 580"
                className="w-full bg-[#12131A] border border-[#303348] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">IPTU Anual / Mensal (R$)</label>
              <input
                type="number"
                value={iptuFee}
                onChange={(e) => setIptuFee(Number(e.target.value))}
                placeholder="Ex: 120"
                className="w-full bg-[#12131A] border border-[#303348] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Área Privativa (m²)</label>
              <input
                type="number"
                value={areaM2}
                onChange={(e) => setAreaM2(Number(e.target.value))}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Quartos</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Suítes</label>
              <input
                type="number"
                value={suites}
                onChange={(e) => setSuites(Number(e.target.value))}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Banheiros</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Vagas Garagem</label>
              <input
                type="number"
                value={parkingSpots}
                onChange={(e) => setParkingSpots(Number(e.target.value))}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* Location & Private Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Bairro (Público) *</label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="Casa Caiada">Casa Caiada</option>
                <option value="Bairro Novo">Bairro Novo</option>
                <option value="Rio Doce">Rio Doce</option>
                <option value="Jardim Atlântico">Jardim Atlântico</option>
                <option value="Carmo / Sítio Histórico">Carmo / Sítio Histórico</option>
                <option value="Amparo">Amparo</option>
                <option value="Outros">Outras regiões de Olinda</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-gray-300 font-semibold flex items-center justify-between">
                <span>Endereço Privado (Apenas para o Administrador - NUNCA publicado)</span>
                <span className="text-[10px] text-amber-400">Sigilo Profissional</span>
              </label>
              <input
                type="text"
                value={addressPrivate}
                onChange={(e) => setAddressPrivate(e.target.value)}
                placeholder="Ex: Rua Tertuliano, nº 80, Apto 402 - Chave na portaria"
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Description & Features */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Descrição Detalhada do Imóvel</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escreva detalhes sobre acabamento, ventilação, sol, proximidade com a praia..."
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Características (Separadas por vírgula)</label>
              <input
                type="text"
                value={featuresString}
                onChange={(e) => setFeaturesString(e.target.value)}
                placeholder="Varanda Gourmet, Vista Mar, Armários Embutidos, Piscina..."
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* Media & Unlimited Gallery */}
          <div className="p-4 rounded-xl bg-[#181A24] border border-[#272938] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#C5A059]" />
                  Galeria Ilimitada de Fotos e Vídeos
                </h4>
                <p className="text-[11px] text-gray-400">
                  Adicione fotos via upload direto (com compressão automática para carregamento rápido) ou links de imagem.
                </p>
              </div>

              {/* Upload input button */}
              <label className="cursor-pointer px-4 py-2 bg-[#C5A059] hover:bg-[#D4B066] text-black font-bold rounded-lg flex items-center gap-1.5 transition-all">
                <Upload className="w-4 h-4" />
                <span>{isUploading ? 'Processando...' : 'Carregar Fotos do Computador'}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* Quick add image URL */}
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Ou cole a URL direta de uma foto ou vídeo..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 bg-[#12131A] border border-[#303348] rounded-lg px-3 py-2 text-white text-xs placeholder-gray-500"
              />
              <button
                type="button"
                onClick={handleAddUrlImage}
                className="px-3 py-2 bg-[#262838] hover:bg-[#34374D] text-white rounded-lg flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar</span>
              </button>
            </div>

            {/* Images Grid */}
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
                {images.map((img, i) => (
                  <div 
                    key={i} 
                    className={`relative rounded-lg overflow-hidden border-2 bg-black h-24 group ${
                      img.isCover ? 'border-[#C5A059]' : 'border-[#2C2E40]'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    
                    {img.isCover && (
                      <span className="absolute top-1 left-1 bg-[#C5A059] text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                        Capa
                      </span>
                    )}

                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                      {!img.isCover && (
                        <button
                          type="button"
                          onClick={() => handleSetCover(i)}
                          className="p-1 rounded bg-[#C5A059] text-black hover:bg-yellow-400"
                          title="Definir como foto de capa"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="p-1 rounded bg-red-600 text-white hover:bg-red-700"
                        title="Excluir foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 border border-dashed border-[#303345] rounded-lg">
                Nenhuma foto adicionada ainda. Faça upload ou cole uma URL.
              </div>
            )}
          </div>

          {/* Pending confirmation & featured toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#181A24] border border-[#272938]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-[#C5A059] focus:ring-0 bg-[#12131A]"
              />
              <span className="text-gray-200 font-semibold">Destacar na Página Inicial</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={pendingConfirmation}
                onChange={(e) => setPendingConfirmation(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-0 bg-[#12131A]"
              />
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Marcar como "Pendente de Confirmação" (Item de feed/histórico)
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252838]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-[#303348] text-gray-300 hover:text-white transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] text-black font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Salvando...' : isEditing ? 'Atualizar Imóvel' : 'Publicar Imóvel'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
