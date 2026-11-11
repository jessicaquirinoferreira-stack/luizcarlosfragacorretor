/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { 
  Property, 
  Development, 
  Lead, 
  LandingPage, 
  SiteSettings, 
  SearchFilterState 
} from './types';
import { 
  initialSiteSettings, 
  initialProperties, 
  initialDevelopments, 
  initialLandingPages 
} from './lib/initialData';
import { 
  getSiteSettings, 
  subscribeToProperties, 
  subscribeToDevelopments, 
  subscribeToLeads, 
  subscribeToLandingPages, 
  seedInitialDataIfNeeded,
  saveProperty,
  deleteProperty,
  saveDevelopment,
  deleteDevelopment,
  saveLandingPage,
  deleteLandingPage,
  updateSiteSettings
} from './lib/firestoreService';
import { testConnection, auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { RightFloatingIcons } from './components/layout/RightFloatingIcons';
import { VirtualAssistantWidget } from './components/layout/VirtualAssistantWidget';

// Public Views
import { HeroSection } from './components/home/HeroSection';
import { FeaturedProperties } from './components/home/FeaturedProperties';
import { FeaturedDevelopments } from './components/home/FeaturedDevelopments';
import { BrokerAboutSection } from './components/home/BrokerAboutSection';
import { InstagramFeedTeaser } from './components/home/InstagramFeedTeaser';
import { PropertyListingsView } from './components/properties/PropertyListingsView';
import { PropertyDetailView } from './components/properties/PropertyDetailView';
import { DevelopmentListingsView } from './components/developments/DevelopmentListingsView';
import { DevelopmentDetailView } from './components/developments/DevelopmentDetailView';
import { CampaignLandingPageView } from './components/landing/CampaignLandingPageView';
import { AboutPage } from './components/home/AboutPage';
import { ContactPage } from './components/home/ContactPage';
import { ScheduleVisitModal } from './components/leads/ScheduleVisitModal';

// Admin Panel
import { AdminLayout } from './components/admin/AdminLayout';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedDevelopment, setSelectedDevelopment] = useState<Development | null>(null);
  const [selectedLandingPage, setSelectedLandingPage] = useState<LandingPage | null>(null);

  // Data Collections
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [developments, setDevelopments] = useState<Development[]>(initialDevelopments);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [landingPages, setLandingPages] = useState<LandingPage[]>(initialLandingPages);

  // Search Filter propagation
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTransactionType, setSearchTransactionType] = useState<'all' | 'venda' | 'locacao'>('all');

  // Modal controls
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleTargetProperty, setScheduleTargetProperty] = useState<Property | null>(null);
  const [scheduleTargetDev, setScheduleTargetDev] = useState<Development | null>(null);

  // Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Initialize and Seed Firestore on Boot
  useEffect(() => {
    // 1. Validate connection per Firebase skill mandate
    testConnection();

    // 2. Seed data if needed
    seedInitialDataIfNeeded();

    // 3. Load Settings
    getSiteSettings().then(setSiteSettings);

    // 4. Subscriptions
    const unsubProps = subscribeToProperties(setProperties, false);
    const unsubDevs = subscribeToDevelopments(setDevelopments, false);
    const unsubLeads = subscribeToLeads(setLeads);
    const unsubLps = subscribeToLandingPages(setLandingPages, false);

    // 5. Auth listener
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdminAuthenticated(true);
      }
    });

    // 6. Check URL Hash on load (e.g. /#campanha/fonte-atlantico or /#admin)
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) return;

      if (hash === 'admin') {
        setCurrentView('admin');
      } else if (hash.startsWith('campanha/')) {
        const slug = hash.replace('campanha/', '');
        const lp = landingPages.find(l => l.slug === slug);
        if (lp) {
          setSelectedLandingPage(lp);
          setCurrentView('campaign');
        }
      } else if (hash.startsWith('imovel/')) {
        const slug = hash.replace('imovel/', '');
        const p = properties.find(x => x.slug === slug);
        if (p) {
          setSelectedProperty(p);
          setCurrentView('property-detail');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      unsubProps();
      unsubDevs();
      unsubLeads();
      unsubLps();
      unsubAuth();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update hash when view changes
  const navigateTo = (view: string, params?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);

    if (view === 'property-detail' && params) {
      setSelectedProperty(params);
      window.location.hash = `imovel/${params.slug}`;
    } else if (view === 'development-detail' && params) {
      setSelectedDevelopment(params);
      window.location.hash = `empreendimento/${params.slug}`;
    } else if (view === 'campaign' && params) {
      setSelectedLandingPage(params);
      window.location.hash = `campanha/${params.slug}`;
    } else if (view === 'admin') {
      window.location.hash = 'admin';
    } else {
      window.location.hash = view === 'home' ? '' : view;
    }
  };

  const handleHeroSearch = (filters: Partial<SearchFilterState>) => {
    setSearchTransactionType(filters.transactionType || 'all');
    setSearchQuery(filters.neighborhood || filters.type || '');
    navigateTo(filters.transactionType === 'locacao' ? 'alugar' : 'comprar');
  };

  const handleOpenSchedule = (item?: Property | Development) => {
    if (item && 'bedrooms' in item) {
      setScheduleTargetProperty(item as Property);
      setScheduleTargetDev(null);
    } else if (item) {
      setScheduleTargetDev(item as Development);
      setScheduleTargetProperty(null);
    } else {
      setScheduleTargetProperty(null);
      setScheduleTargetDev(null);
    }
    setScheduleModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans selection:bg-[#C5A059] selection:text-black">
      
      {/* If in admin view, render AdminLayout */}
      {currentView === 'admin' ? (
        <AdminLayout
          settings={siteSettings}
          properties={properties}
          developments={developments}
          leads={leads}
          landingPages={landingPages}
          onSaveProperty={saveProperty}
          onDeleteProperty={deleteProperty}
          onSaveDevelopment={saveDevelopment}
          onDeleteDevelopment={deleteDevelopment}
          onSaveLandingPage={saveLandingPage}
          onDeleteLandingPage={deleteLandingPage}
          onSettingsUpdated={setSiteSettings}
          onExitAdmin={() => navigateTo('home')}
          isAuthenticated={isAdminAuthenticated}
          onAuthenticate={setIsAdminAuthenticated}
        />
      ) : currentView === 'campaign' && selectedLandingPage ? (
        <CampaignLandingPageView
          landingPage={selectedLandingPage}
          targetProperty={properties.find(p => p.id === selectedLandingPage.targetId)}
          targetDevelopment={developments.find(d => d.id === selectedLandingPage.targetId)}
          onBack={() => navigateTo('home')}
        />
      ) : (
        <>
          {/* Header */}
          <Header
            settings={siteSettings}
            currentView={currentView}
            onNavigate={(view) => {
              if (view === 'agendar') {
                handleOpenSchedule();
              } else {
                navigateTo(view);
              }
            }}
            isAdminLoggedIn={isAdminAuthenticated}
          />

          {/* Main Content Router */}
          <main className="flex-1">
            {currentView === 'home' && (
              <>
                <HeroSection
                  settings={siteSettings}
                  developments={developments}
                  onSearch={handleHeroSearch}
                  onDirectAction={(action) => navigateTo(action)}
                  onSelectDevelopment={(dev) => navigateTo('development-detail', dev)}
                />

                <FeaturedProperties
                  properties={properties}
                  onSelectProperty={(prop) => navigateTo('property-detail', prop)}
                  onViewAll={(type) => {
                    setSearchTransactionType(type || 'all');
                    navigateTo(type === 'locacao' ? 'alugar' : 'comprar');
                  }}
                  onScheduleVisit={(prop) => handleOpenSchedule(prop)}
                />

                <FeaturedDevelopments
                  developments={developments}
                  onSelectDevelopment={(dev) => navigateTo('development-detail', dev)}
                  onViewAll={() => navigateTo('empreendimentos')}
                />

                <BrokerAboutSection
                  settings={siteSettings}
                  onScheduleClick={() => handleOpenSchedule()}
                />

                <InstagramFeedTeaser
                  settings={siteSettings}
                />
              </>
            )}

            {currentView === 'comprar' && (
              <PropertyListingsView
                properties={properties}
                initialTransactionType="venda"
                initialSearchQuery={searchQuery}
                onSelectProperty={(prop) => navigateTo('property-detail', prop)}
                onScheduleVisit={(prop) => handleOpenSchedule(prop)}
              />
            )}

            {currentView === 'alugar' && (
              <PropertyListingsView
                properties={properties}
                initialTransactionType="locacao"
                initialSearchQuery={searchQuery}
                onSelectProperty={(prop) => navigateTo('property-detail', prop)}
                onScheduleVisit={(prop) => handleOpenSchedule(prop)}
              />
            )}

            {currentView === 'empreendimentos' && (
              <DevelopmentListingsView
                developments={developments}
                onSelectDevelopment={(dev) => navigateTo('development-detail', dev)}
              />
            )}

            {currentView === 'property-detail' && selectedProperty && (
              <PropertyDetailView
                property={selectedProperty}
                allProperties={properties}
                onBack={() => navigateTo('comprar')}
                onSelectProperty={(prop) => navigateTo('property-detail', prop)}
                onScheduleVisit={(prop) => handleOpenSchedule(prop)}
              />
            )}

            {currentView === 'development-detail' && selectedDevelopment && (
              <DevelopmentDetailView
                development={selectedDevelopment}
                associatedProperties={properties.filter(p => p.developmentId === selectedDevelopment.id)}
                onBack={() => navigateTo('empreendimentos')}
                onSelectProperty={(prop) => navigateTo('property-detail', prop)}
                onScheduleVisit={(dev) => handleOpenSchedule(dev)}
              />
            )}

            {currentView === 'sobre' && (
              <AboutPage
                settings={siteSettings}
                onScheduleClick={() => handleOpenSchedule()}
              />
            )}

            {currentView === 'contato' && (
              <ContactPage
                settings={siteSettings}
              />
            )}
          </main>

          {/* Footer */}
          <Footer
            settings={siteSettings}
            onNavigate={(view) => navigateTo(view)}
          />

          {/* Right Floating Official Icons (WhatsApp & Instagram) */}
          <RightFloatingIcons
            whatsappMessage={`Olá Luiz Carlos Fraga! Vim através do site e gostaria de atendimento.`}
            instagramUrl={siteSettings.instagram}
          />

          {/* Left Floating Virtual Assistant with Human Photo & Chat */}
          <VirtualAssistantWidget
            brokerName={siteSettings.brokerName}
            instagramUrl={siteSettings.instagram}
          />

          {/* Schedule Visit Modal */}
          <ScheduleVisitModal
            isOpen={scheduleModalOpen}
            onClose={() => setScheduleModalOpen(false)}
            targetProperty={scheduleTargetProperty}
            targetDevelopment={scheduleTargetDev}
            allProperties={properties}
            allDevelopments={developments}
          />
        </>
      )}

    </div>
  );
}
