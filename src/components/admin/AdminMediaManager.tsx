import React, { useState } from 'react';
import { 
  ImageIcon, 
  Upload, 
  Copy, 
  Trash2, 
  Check, 
  Plus, 
  ExternalLink,
  Film
} from 'lucide-react';
import { optimizeImageFile, createMediaItem } from '../../lib/imageOptimizer';
import { MediaItem } from '../../types';

interface AdminMediaManagerProps {
  initialItems?: MediaItem[];
}

export const AdminMediaManager: React.FC<AdminMediaManagerProps> = ({
  initialItems = []
}) => {
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => {
    return initialItems.length > 0 ? initialItems : [
      {
        id: 'med-1',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        caption: 'Fachada Edifício Fonte Atlântico',
        type: 'image'
      },
      {
        id: 'med-2',
        url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Edifício Estação Marcos Freire - Orla Bairro Novo',
        type: 'image'
      },
      {
        id: 'med-3',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Living e Varanda com Vista Mar',
        type: 'image'
      },
      {
        id: 'med-4',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        caption: 'Apartamento Bairro Novo - Sala decorada',
        type: 'image'
      },
      {
        id: 'med-5',
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        caption: 'Casa Residencial em Rio Doce',
        type: 'image'
      }
    ];
  });

  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const newMedia: MediaItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await optimizeImageFile(file, 1600, 0.85);
        newMedia.push({
          id: 'media-' + Date.now() + '-' + i,
          url: dataUrl,
          caption: file.name,
          type: 'image'
        });
      }
      setMediaList([...newMedia, ...mediaList]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    const item = createMediaItem(urlInput.trim(), 'Mídia adicionada via URL');
    setMediaList([item, ...mediaList]);
    setUrlInput('');
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#14151D] p-5 rounded-xl border border-[#252838]">
        <div>
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#C5A059]" />
            Gerenciador de Mídias (Fotos & Vídeos)
          </h3>
          <p className="text-xs text-gray-400">
            Armazenamento otimizado de imagens e vídeos de alta definição para imóveis e empreendimentos.
          </p>
        </div>

        <label className="cursor-pointer px-4 py-2 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] text-black font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-lg transition-all">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Processando...' : 'Carregar Imagens'}</span>
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

      {/* Add URL input */}
      <div className="flex gap-2 bg-[#14151D] p-3 rounded-xl border border-[#252838]">
        <input
          type="url"
          placeholder="Ou cole a URL direta de uma imagem ou vídeo para adicionar à biblioteca..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="flex-1 bg-[#1A1C28] border border-[#2F3246] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
        />
        <button
          onClick={handleAddUrl}
          className="px-4 py-2 bg-[#252838] hover:bg-[#34384D] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-[#C5A059]" />
          <span>Adicionar</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaList.map((item) => (
          <div
            key={item.id}
            className="bg-[#14151D] rounded-xl overflow-hidden border border-[#252838] hover:border-[#C5A059] group transition-all"
          >
            <div className="relative h-44 bg-black overflow-hidden">
              <img
                src={item.url}
                alt={item.caption || ''}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.type === 'video' && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[#DFBF7E] text-[10px] font-bold flex items-center gap-1">
                  <Film className="w-3 h-3" />
                  VÍDEO
                </div>
              )}
            </div>

            <div className="p-3 space-y-2">
              <p className="text-xs text-gray-300 truncate font-medium">
                {item.caption || 'Sem legenda'}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#202230]">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="px-2.5 py-1 rounded bg-[#1D1F2C] hover:bg-[#282B3E] text-gray-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#C5A059]" />
                      <span>Copiar URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                  title="Remover"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
