import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Property, Development, Lead, LandingPage, SiteSettings } from '../types';
import {
  initialProperties,
  initialDevelopments,
  initialLandingPages,
  initialSiteSettings
} from './initialData';

const STORAGE_KEYS = {
  SETTINGS: 'lcf_site_settings',
  PROPERTIES: 'lcf_properties_cache',
  DEVELOPMENTS: 'lcf_developments_cache',
  LEADS: 'lcf_leads_cache',
  LANDING_PAGES: 'lcf_landing_pages_cache'
};

// ==========================================
// SEEDING & SYNC
// ==========================================
export async function seedInitialDataIfNeeded(): Promise<void> {
  try {
    // Check settings
    const settingsSnap = await getDoc(doc(db, 'siteSettings', 'global'));
    if (!settingsSnap.exists()) {
      await setDoc(doc(db, 'siteSettings', 'global'), {
        ...initialSiteSettings,
        updatedAt: new Date().toISOString()
      });
    }

    // Check properties
    const propsSnap = await getDocs(collection(db, 'properties'));
    if (propsSnap.empty) {
      for (const prop of initialProperties) {
        await setDoc(doc(db, 'properties', prop.id), prop);
      }
    }

    // Check developments
    const devsSnap = await getDocs(collection(db, 'developments'));
    if (devsSnap.empty) {
      for (const dev of initialDevelopments) {
        await setDoc(doc(db, 'developments', dev.id), dev);
      }
    }

    // Check landing pages
    const lpsSnap = await getDocs(collection(db, 'landingPages'));
    if (lpsSnap.empty) {
      for (const lp of initialLandingPages) {
        await setDoc(doc(db, 'landingPages', lp.id), lp);
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'seedInitialData');
  }
}

// ==========================================
// SITE SETTINGS
// ==========================================
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, 'siteSettings', 'global');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as SiteSettings;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'siteSettings/global');
  }
  return initialSiteSettings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  try {
    const docRef = doc(db, 'siteSettings', 'global');
    await setDoc(docRef, { ...settings, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'siteSettings/global');
    throw error;
  }
}

// ==========================================
// PROPERTIES CRUD
// ==========================================
export function subscribeToProperties(
  callback: (properties: Property[]) => void,
  onlyPublished = true
) {
  try {
    const coll = collection(db, 'properties');
    const q = onlyPublished 
      ? query(coll, where('status', '==', 'published'))
      : coll;

    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
          callback(items);
        } else {
          callback(onlyPublished ? initialProperties.filter(p => p.status === 'published') : initialProperties);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'properties');
        callback(onlyPublished ? initialProperties.filter(p => p.status === 'published') : initialProperties);
      }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'properties');
    callback(onlyPublished ? initialProperties.filter(p => p.status === 'published') : initialProperties);
    return () => {};
  }
}

export async function saveProperty(property: Property): Promise<void> {
  try {
    const docRef = doc(db, 'properties', property.id);
    await setDoc(docRef, {
      ...property,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `properties/${property.id}`);
    throw error;
  }
}

export async function deleteProperty(propertyId: string): Promise<void> {
  try {
    const docRef = doc(db, 'properties', propertyId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `properties/${propertyId}`);
    throw error;
  }
}

// ==========================================
// DEVELOPMENTS CRUD
// ==========================================
export function subscribeToDevelopments(
  callback: (developments: Development[]) => void,
  onlyPublished = true
) {
  try {
    const coll = collection(db, 'developments');
    const q = onlyPublished
      ? query(coll, where('isPublished', '==', true))
      : coll;

    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Development));
          callback(items);
        } else {
          callback(onlyPublished ? initialDevelopments.filter(d => d.isPublished) : initialDevelopments);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'developments');
        callback(onlyPublished ? initialDevelopments.filter(d => d.isPublished) : initialDevelopments);
      }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'developments');
    callback(onlyPublished ? initialDevelopments.filter(d => d.isPublished) : initialDevelopments);
    return () => {};
  }
}

export async function saveDevelopment(development: Development): Promise<void> {
  try {
    const docRef = doc(db, 'developments', development.id);
    await setDoc(docRef, {
      ...development,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `developments/${development.id}`);
    throw error;
  }
}

export async function deleteDevelopment(developmentId: string): Promise<void> {
  try {
    const docRef = doc(db, 'developments', developmentId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `developments/${developmentId}`);
    throw error;
  }
}

// ==========================================
// LEADS & VISITS
// ==========================================
export async function createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const newLead: Lead = {
    ...leadData,
    id: 'lead-' + Date.now(),
    status: 'novo',
    createdAt: new Date().toISOString()
  };

  try {
    const docRef = doc(db, 'leads', newLead.id);
    await setDoc(docRef, newLead);
    return newLead.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `leads/${newLead.id}`);
    // Save locally as fallback if offline
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
      existing.unshift(newLead);
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(existing));
    } catch {
      // ignore
    }
    return newLead.id;
  }
}

export function subscribeToLeads(callback: (leads: Lead[]) => void) {
  try {
    const coll = collection(db, 'leads');
    return onSnapshot(
      coll,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'leads');
        const fallback = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
        callback(fallback);
      }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'leads');
    const fallback = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
    callback(fallback);
    return () => {};
  }
}

export async function updateLeadStatus(leadId: string, status: Lead['status'], notes?: string): Promise<void> {
  try {
    const docRef = doc(db, 'leads', leadId);
    await updateDoc(docRef, {
      status,
      ...(notes !== undefined ? { notes } : {}),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `leads/${leadId}`);
    throw error;
  }
}

// ==========================================
// LANDING PAGES
// ==========================================
export function subscribeToLandingPages(
  callback: (pages: LandingPage[]) => void,
  onlyActive = false
) {
  try {
    const coll = collection(db, 'landingPages');
    return onSnapshot(
      coll,
      (snapshot) => {
        if (!snapshot.empty) {
          let items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LandingPage));
          if (onlyActive) items = items.filter(p => p.isActive);
          callback(items);
        } else {
          callback(onlyActive ? initialLandingPages.filter(p => p.isActive) : initialLandingPages);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'landingPages');
        callback(onlyActive ? initialLandingPages.filter(p => p.isActive) : initialLandingPages);
      }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'landingPages');
    callback(onlyActive ? initialLandingPages.filter(p => p.isActive) : initialLandingPages);
    return () => {};
  }
}

export async function saveLandingPage(page: LandingPage): Promise<void> {
  try {
    const docRef = doc(db, 'landingPages', page.id);
    await setDoc(docRef, {
      ...page,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `landingPages/${page.id}`);
    throw error;
  }
}

export async function deleteLandingPage(pageId: string): Promise<void> {
  try {
    const docRef = doc(db, 'landingPages', pageId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `landingPages/${pageId}`);
    throw error;
  }
}

// ==========================================
// WHATSAPP URL GENERATOR
// ==========================================
export function buildWhatsAppLink(message: string, customPhone = '5581985313434'): string {
  const cleanPhone = customPhone.replace(/\D/g, '');
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
