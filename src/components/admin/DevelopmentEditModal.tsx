import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Star, 
  Plus, 
  Building2, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Development, MediaItem, DevelopmentStatus } from '../../types';
import { generateSlug } from '../../lib/formatters';
import { optimizeImageFile, createMediaItem } from '../../lib/imageOptimizer';

interface DevelopmentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (development: Development) => Promise<void>;
  initialDevelopment?: Development | null;
}

export const DevelopmentEditModal: React.FC<DevelopmentEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDevelopment
}) => {
  const isEditing = !!initialDevelopment;

  const [name, setName] = useState(initialDevelopment?.name || '');
  const [slug, setSlug] = useState(initialDevelopment?.slug || '');
  const [code, setCode] = useState(initialDevelopment?.code || `EMP-${Math.floor(100 + Math.random() * 900)}`);
  const [neighborhood, setNeighborhood] = useState(initialDevelopment?.neighborhood || 'Casa Caiada');
  const [city, setCity] = useState(initialDevelopment?.city || 'Olinda');
  const [status, setStatus] = useState<DevelopmentStatus>(initialDevelopment?.status || 'pronto_para_morar');
  const [startingPrice, setStartingPrice] = useState<number>(initialDevelopment?.startingPrice || 0);
  const [condoFee, setCondoFee] = useState<number>(initialDevelopment?.condoFee || 0);
  const [description, setDescription] = useState(initialDevelopment?.description || '');
  const [featuresString, setFeaturesString] = useState(
    initialDevelopment?.features ? initialDevelopment.features.join(', ') : 'Piscina, Elevador, Salão de Festas, Portaria 24h'
  );
  const [unitsAvailable, setUnitsAvailable] = useState<number>(initialDevelopment?.unitsAvailable || 4);
  const [totalFloors, setTotalFloors] = useState<number>(initialDevelopment?.totalFloors || 10);
  const [unitsPerFloor, setUnitsPerFloor] = useState<number>(initialDevelopment?.unitsPerFloor || 4);
  const [images, setImages] = useState<MediaItem[]>(initialDevelopment?.images || []);
  const [videoUrl, setVideoUrl] = useState(initialDevelopment?.videoUrl || '');
  const [isFeatured, setIsFeatured] = useState(initialDevelopment?.isFeatured || false);
  const [isPublished, setIsPublished] = useState(
    initialDevelopment?.isPublished !== undefined ? initialDevelopment.isPublished : true
  );
  const [pendingConfirmation, setPendingConfirmation] = useState(
    initialDevelopment?.pendingConfirmation !== undefined ? initialDevelopment.pendingConfirmation : true
  );

  const [isUploading, setIsUploading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
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
        const optimized = await optimizeImageFile(file, 1600, 0.85);
        newItems.push({
          id: 'dev-img-' + Date.now() + '-' + i,
          url: optimized,
          caption: file.name.replace(/\.[^/.]+$/, ''),
          isCover: images.length === 0 && i === 0,
          type: 'image'
        });
      }
      setImages([...images, ...newItems]);
    } catch (err) {
      console.error(err);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const devData: Development = {
      id: initialDevelopment?.id || 'dev-' + Date.now(),
      name,
      slug: slug || generateSlug(name),
      code,
      neighborhood,
      city,
      status,
      startingPrice: Number(startingPrice) || undefined,
      condoFee: Number(condoFee) || undefined,
      description,
      features: featuresString.split(',').map(s => s.trim()).filter(Boolean),
      unitsAvailable: Number(unitsAvailable),
      totalFloors: Number(totalFloors),
      unitsPerFloor: Number(unitsPerFloor),
      images: images.length > 0 ? images : [
        {
          id: 'dev-def-1',
          url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fachada',
          isCover: true,
          type: 'image'
        }
      ],
      videoUrl,
      isFeatured,
      isPublished,
      pendingConfirmation,
      createdAt: initialDevelopment?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await onSave(devData);
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
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {isEditing ? 'Editar Empreendimento' : 'Cadastrar Empreendimento'}
            </h3>
            <p className="text-xs text-[#C5A059]">
              Condomínios, Prédios e Lançamentos em Olinda/PE
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
              <label className="text-gray-300 font-semibold">Nome do Empreendimento *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Edifício Fonte Atlântico"
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Código</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Bairro *</label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="Casa Caiada">Casa Caiada</option>
                <option value="Bairro Novo">Bairro Novo</option>
                <option value="Rio Doce">Rio Doce</option>
                <option value="Jardim Atlântico">Jardim Atlântico</option>
                <option value="Carmo">Carmo</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Fase / Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DevelopmentStatus)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="lancamento">Lançamento</option>
                <option value="em_construcao">Em Obras</option>
                <option value="pronto_para_morar">Pronto para Morar</option>
                <option value="entregue">Entregue</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Valor Inicial (R$)</label>
              <input
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(Number(e.target.value))}
                placeholder="Ex: 350000"
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Descrição do Empreendimento</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o prédio, localização, acabamento e diferenciais..."
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Itens de Lazer & Condomínio (Separados por vírgula)</label>
            <input
              type="text"
              value={featuresString}
              onChange={(e) => setFeaturesString(e.target.value)}
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
            />
          </div>

          {/* Gallery */}
          <div className="p-4 rounded-xl bg-[#181A24] border border-[#272938] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Fotos e Plantas do Prédio</span>
              <label className="cursor-pointer px-3 py-1.5 bg-[#C5A059] hover:bg-[#D4B066] text-black font-bold rounded-lg text-xs flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Cole URL direta de foto..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 bg-[#12131A] border border-[#303348] rounded-lg px-3 py-1.5 text-white text-xs"
              />
              <button
                type="button"
                onClick={handleAddUrlImage}
                className="px-3 py-1.5 bg-[#262838] text-white rounded-lg"
              >
                Adicionar
              </button>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                {images.map((img, i) => (
                  <div key={i} className="relative rounded overflow-hidden h-20 bg-black group border border-[#2B2D3C]">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 p-1 bg-red-600 rounded text-white opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg bg-[#181A24] border border-[#272938]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-[#C5A059]"
              />
              <span className="text-white font-semibold">Publicado no Site</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={pendingConfirmation}
                onChange={(e) => setPendingConfirmation(e.target.checked)}
                className="w-4 h-4 text-amber-500"
              />
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Pendente de Confirmação
              </span>
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
              {isSaving ? 'Salvando...' : 'Salvar Empreendimento'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
