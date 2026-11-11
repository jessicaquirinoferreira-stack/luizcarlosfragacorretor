import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  ShieldCheck, 
  Instagram, 
  Phone, 
  MapPin, 
  Palette, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { updateSiteSettings } from '../../lib/firestoreService';

interface AdminSettingsProps {
  settings: SiteSettings;
  onSettingsUpdated: (newSettings: SiteSettings) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  onSettingsUpdated
}) => {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSiteSettings(formData);
      onSettingsUpdated(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-[#252838]">
        <div>
          <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#C5A059]" />
            Configurações Institucionais do Site
          </h3>
          <p className="text-xs text-gray-400">
            Gerencie textos, contatos oficiais, CRECI, endereço e identidade visual.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Configurações salvas no Firestore!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* Professional Identity */}
        <div className="p-6 bg-[#14151D] rounded-xl border border-[#252838] space-y-4">
          <h4 className="font-bold text-sm text-[#DFBF7E] uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            Identidade do Consultor & Registro
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-gray-300 font-semibold">Nome Profissional</label>
              <input
                type="text"
                required
                value={formData.brokerName}
                onChange={(e) => handleChange('brokerName', e.target.value)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Registro CRECI</label>
              <input
                type="text"
                required
                value={formData.creci}
                onChange={(e) => handleChange('creci', e.target.value)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-sm text-white font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Bio Oficial (Instagram)</label>
            <input
              type="text"
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Texto Institucional "Sobre"</label>
            <textarea
              rows={3}
              value={formData.aboutText}
              onChange={(e) => handleChange('aboutText', e.target.value)}
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg p-3 text-white leading-relaxed"
            />
          </div>
        </div>

        {/* Contact & Location */}
        <div className="p-6 bg-[#14151D] rounded-xl border border-[#252838] space-y-4">
          <h4 className="font-bold text-sm text-[#DFBF7E] uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#C5A059]" />
            Contatos Oficiais & Localização
          </h4>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Endereço Público</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Telefone Oficial</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">WhatsApp (Número puro com DDI e DDD)</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="5581985313434"
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">URL do Instagram</label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Usuário do Instagram</label>
              <input
                type="text"
                value={formData.instagramUser}
                onChange={(e) => handleChange('instagramUser', e.target.value)}
                className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="p-6 bg-[#14151D] rounded-xl border border-[#252838] space-y-4">
          <h4 className="font-bold text-sm text-[#DFBF7E] uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C5A059]" />
            Frases & Chamadas da Página Inicial
          </h4>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Título Principal do Hero</label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg px-3 py-2 text-white font-serif text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Subtítulo do Hero</label>
            <textarea
              rows={2}
              value={formData.heroSubtitle}
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              className="w-full bg-[#1B1D28] border border-[#2F3245] rounded-lg p-3 text-white leading-relaxed"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] text-black font-bold uppercase tracking-wider rounded-lg shadow-xl flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Salvando...' : 'Salvar Alterações no Site'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
