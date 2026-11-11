import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Users, 
  Settings, 
  Sparkles, 
  LogOut, 
  Globe, 
  ShieldCheck, 
  Lock, 
  ImageIcon, 
  Menu, 
  X,
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { 
  Property, 
  Development, 
  Lead, 
  LandingPage, 
  SiteSettings 
} from '../../types';
import { AdminDashboard } from './AdminDashboard';
import { AdminLeads } from './AdminLeads';
import { AdminSettings } from './AdminSettings';
import { AdminMediaManager } from './AdminMediaManager';
import { PropertyEditModal } from './PropertyEditModal';
import { DevelopmentEditModal } from './DevelopmentEditModal';
import { LandingPageEditModal } from './LandingPageEditModal';

interface AdminLayoutProps {
  settings: SiteSettings;
  properties: Property[];
  developments: Development[];
  leads: Lead[];
  landingPages: LandingPage[];
  onSaveProperty: (prop: Property) => Promise<void>;
  onDeleteProperty: (id: string) => Promise<void>;
  onSaveDevelopment: (dev: Development) => Promise<void>;
  onDeleteDevelopment: (id: string) => Promise<void>;
  onSaveLandingPage: (page: LandingPage) => Promise<void>;
  onDeleteLandingPage: (id: string) => Promise<void>;
  onSettingsUpdated: (newSettings: SiteSettings) => void;
  onExitAdmin: () => void;
  isAuthenticated: boolean;
  onAuthenticate: (status: boolean) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  settings,
  properties,
  developments,
  leads,
  landingPages,
  onSaveProperty,
  onDeleteProperty,
  onSaveDevelopment,
  onDeleteDevelopment,
  onSaveLandingPage,
  onDeleteLandingPage,
  onSettingsUpdated,
  onExitAdmin,
  isAuthenticated,
  onAuthenticate
}) => {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'properties' | 'developments' | 'leads' | 'landingPages' | 'settings' | 'media'>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [developmentModalOpen, setDevelopmentModalOpen] = useState(false);
  const [editingDevelopment, setEditingDevelopment] = useState<Development | null>(null);

  const [landingPageModalOpen, setLandingPageModalOpen] = useState(false);
  const [editingLandingPage, setEditingLandingPage] = useState<LandingPage | null>(null);

  // Login form state
  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setAuthError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onAuthenticate(true);
    } catch (err: any) {
      console.warn('Google sign in error', err);
      setAuthError('Não foi possível autenticar com Google. Utilize o acesso administrativo por credencial abaixo.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized credentials check: official broker PIN or admin passphrase
    if (adminPin.trim() === '12234' || adminPin.trim().toLowerCase() === 'lcf2026' || adminPin.trim() === 'admin') {
      onAuthenticate(true);
      setAuthError('');
    } else {
      setAuthError('Código de segurança incorreto. Dica: use o número do CRECI (12234) ou chave de consultor.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    onAuthenticate(false);
  };

  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard Geral', icon: Building2 },
    { id: 'leads', label: 'Leads & CRM', icon: Users, badge: leads.filter(l => l.status === 'novo').length },
    { id: 'settings', label: 'Configurações do Site', icon: Settings },
    { id: 'media', label: 'Mídias & Fotos', icon: ImageIcon },
  ];

  // If not logged in, render Secure Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0B0E] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#12131A] text-white p-8 rounded-2xl border border-[#C5A059]/40 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#1B1D28] border-2 border-[#C5A059] flex items-center justify-center mx-auto shadow-lg overflow-hidden p-1.5">
              <img 
                src="https://i.postimg.cc/FKXNcL2W/Emblema-Dourado-LCF-Imoveis.png" 
                alt="Emblema Dourado LCF Imóveis" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">
              Painel Administrativo
            </h2>
            <p className="text-xs text-[#C5A059] uppercase tracking-widest font-semibold">
              Luiz Carlos Fraga • CRECI 12234
            </p>
            <p className="text-xs text-gray-400">
              Acesso exclusivo para gestão de imóveis, leads e conteúdo do site.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs">
              {authError}
            </div>
          )}

          {/* Google Sign In Option */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="w-full py-3 px-4 bg-[#1E202C] hover:bg-[#282B3C] border border-[#303348] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{isLoggingIn ? 'Conectando...' : 'Entrar com Conta Google'}</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#232533] w-full" />
            <span className="bg-[#12131A] px-3 text-[11px] text-gray-500 uppercase">ou com credencial</span>
            <div className="border-t border-[#232533] w-full" />
          </div>

          {/* Quick PIN / Passphrase form */}
          <form onSubmit={handlePinLogin} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-300">
                Chave de Acesso / CRECI
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Digite seu CRECI (12234) ou chave"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full bg-[#1A1C26] border border-[#2B2E3E] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#C5A059] to-[#9E7B35] hover:from-[#D4B066] text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
            >
              Acessar Painel
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onExitAdmin}
              className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao site público</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0D11] text-white flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#101117] border-r border-[#1F212C] p-5 justify-between shrink-0">
        <div className="space-y-6">
          
          {/* Brand Monogram */}
          <div className="flex items-center gap-3 pb-5 border-b border-[#202230]">
            <div className="w-10 h-10 rounded-lg bg-[#181A24] border border-[#C5A059] flex items-center justify-center overflow-hidden p-1">
              <img 
                src="https://i.postimg.cc/FKXNcL2W/Emblema-Dourado-LCF-Imoveis.png" 
                alt="Emblema Dourado LCF Imóveis" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">{settings.brokerName}</h2>
              <p className="text-[11px] text-[#C5A059] font-medium">CRECI {settings.creci}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5 text-xs">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-[#C5A059] text-black font-bold shadow-md'
                      : 'text-gray-300 hover:bg-[#1A1C26] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#1F212C] space-y-2 text-xs">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#1A1C26] hover:text-white"
          >
            <Globe className="w-4 h-4 text-[#C5A059]" />
            <span>Ver Site Público</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-950/40"
          >
            <LogOut className="w-4 h-4" />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0A0B0E]">
        
        {/* Top Header Mobile / Tablet */}
        <div className="bg-[#101117] border-b border-[#1F212C] px-4 py-3 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <span className="font-brand font-bold text-sm text-[#C5A059]">LCF</span>
            <span className="text-xs font-semibold">Painel Administrativo</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExitAdmin}
              className="px-2.5 py-1 text-xs border border-[#C5A059]/40 rounded text-[#DFBF7E]"
            >
              Site
            </button>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-1 text-gray-400 hover:text-white"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-[#12131A] border-b border-[#252838] p-4 space-y-2">
            {navMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id as any);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg ${
                  currentTab === item.id ? 'bg-[#C5A059] text-black font-bold' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Content Container */}
        <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1">
          {currentTab === 'dashboard' && (
            <AdminDashboard
              properties={properties}
              developments={developments}
              leads={leads}
              landingPages={landingPages}
              onNewProperty={() => {
                setEditingProperty(null);
                setPropertyModalOpen(true);
              }}
              onEditProperty={(prop) => {
                setEditingProperty(prop);
                setPropertyModalOpen(true);
              }}
              onDeleteProperty={onDeleteProperty}
              onTogglePropertyStatus={(prop) => {
                onSaveProperty({
                  ...prop,
                  status: prop.status === 'published' ? 'draft' : 'published'
                });
              }}
              onNewDevelopment={() => {
                setEditingDevelopment(null);
                setDevelopmentModalOpen(true);
              }}
              onEditDevelopment={(dev) => {
                setEditingDevelopment(dev);
                setDevelopmentModalOpen(true);
              }}
              onDeleteDevelopment={onDeleteDevelopment}
              onNewLandingPage={() => {
                setEditingLandingPage(null);
                setLandingPageModalOpen(true);
              }}
              onEditLandingPage={(page) => {
                setEditingLandingPage(page);
                setLandingPageModalOpen(true);
              }}
              onDeleteLandingPage={onDeleteLandingPage}
              onNavigateToTab={(tab) => setCurrentTab(tab as any)}
            />
          )}

          {currentTab === 'leads' && (
            <AdminLeads leads={leads} />
          )}

          {currentTab === 'settings' && (
            <AdminSettings settings={settings} onSettingsUpdated={onSettingsUpdated} />
          )}

          {currentTab === 'media' && (
            <AdminMediaManager />
          )}
        </div>

      </main>

      {/* Property Edit / Create Modal */}
      <PropertyEditModal
        isOpen={propertyModalOpen}
        onClose={() => setPropertyModalOpen(false)}
        onSave={onSaveProperty}
        initialProperty={editingProperty}
        developments={developments.map(d => ({ id: d.id, name: d.name }))}
      />

      {/* Development Edit / Create Modal */}
      <DevelopmentEditModal
        isOpen={developmentModalOpen}
        onClose={() => setDevelopmentModalOpen(false)}
        onSave={onSaveDevelopment}
        initialDevelopment={editingDevelopment}
      />

      {/* Landing Page Edit / Create Modal */}
      <LandingPageEditModal
        isOpen={landingPageModalOpen}
        onClose={() => setLandingPageModalOpen(false)}
        onSave={onSaveLandingPage}
        initialPage={editingLandingPage}
      />

    </div>
  );
};
