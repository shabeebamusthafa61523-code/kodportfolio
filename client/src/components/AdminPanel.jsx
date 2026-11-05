import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plus, Trash2, Edit2, Upload, ExternalLink, RefreshCw, 
  Key, Check, AlertCircle, Layers, Film, Image as ImageIcon, Settings, LogOut, ArrowLeft, Shield, Sun, Moon, Crop
} from 'lucide-react';
import ImageCropModal from './ImageCropModal';
import { apiUrl } from '../utils/api';

export default function AdminPanel({
  isOpen,
  onClose,
  onLogout,
  logos,
  setLogos,
  reels,
  setReels,
  posters,
  setPosters,
  showcases,
  setShowcases,
  C,
  isLight,
  toggleTheme
}) {
  const [activeTab, setActiveTab] = useState('posters'); // 'posters' | 'logos' | 'reels' | 'settings'

  // Adaptive theme tokens for Admin Console
  const adminTheme = isLight
    ? {
        bg: '#f8f9fc',
        cardBg: '#ffffff',
        headerBg: 'rgba(255, 255, 255, 0.96)',
        border: 'rgba(0, 0, 0, 0.08)',
        subtleBg: 'rgba(0, 0, 0, 0.025)',
        cardBorder: 'rgba(0, 0, 0, 0.08)',
        text: '#111216',
        textMuted: 'rgba(17, 18, 22, 0.65)',
        textDim: 'rgba(17, 18, 22, 0.45)',
        inputBg: '#ffffff',
        inputBorder: 'rgba(0, 0, 0, 0.15)',
        logoTileBg: '#f0f2f7',
        logoTileBorder: 'rgba(0, 0, 0, 0.08)',
        logoFilter: 'none',
        shadow: '0 4px 18px rgba(0, 0, 0, 0.05)'
      }
    : {
        bg: '#08090e',
        cardBg: 'rgba(255, 255, 255, 0.03)',
        headerBg: 'rgba(12, 14, 22, 0.98)',
        border: 'rgba(255, 255, 255, 0.08)',
        subtleBg: 'rgba(255, 255, 255, 0.02)',
        cardBorder: 'rgba(255, 255, 255, 0.08)',
        text: '#f5f5f0',
        textMuted: 'rgba(245, 245, 240, 0.65)',
        textDim: 'rgba(245, 245, 240, 0.45)',
        inputBg: 'rgba(255, 255, 255, 0.06)',
        inputBorder: 'rgba(255, 255, 255, 0.12)',
        logoTileBg: 'rgba(255, 255, 255, 0.03)',
        logoTileBorder: 'rgba(255, 255, 255, 0.06)',
        logoFilter: 'brightness(0) invert(1)',
        shadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      };

  const inputStyle = {
    padding: '0.65rem 0.9rem',
    borderRadius: '8px',
    background: adminTheme.inputBg,
    border: `1px solid ${adminTheme.inputBorder}`,
    color: adminTheme.text,
    fontSize: '0.85rem'
  };

  const cardStyle = {
    background: adminTheme.cardBg,
    borderRadius: '14px',
    border: `1px solid ${adminTheme.cardBorder}`,
    boxShadow: adminTheme.shadow
  };
  const [statusMsg, setStatusMsg] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Modal forms state
  const [editingItem, setEditingItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [logoForm, setLogoForm] = useState({ name: '', src: '' });
  const [reelCategories, setReelCategories] = useState([
    { _id: 'cat-1', name: 'Commercial Ads' },
    { _id: 'cat-2', name: 'Short-Form Reels' },
    { _id: 'cat-3', name: 'Product Showcase' },
    { _id: 'cat-4', name: 'Brand Story' },
    { _id: 'cat-5', name: 'Behind The Scenes' }
  ]);
  const [isManageCategoryOpen, setIsManageCategoryOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [editingCatId, setEditingCatId] = useState(null);
  const [editingCatName, setEditingCatName] = useState('');
  const [catActionLoading, setCatActionLoading] = useState(false);

  const [reelForm, setReelForm] = useState({
    title: '',
    creator: 'Fathima Shiya Hamza',
    avatar: 'FS',
    url: '',
    thumb: '',
    category: 'Commercial Ads'
  });
  const [posterForm, setPosterForm] = useState({
    title: '',
    alt: '',
    src: '',
    campaignTag: 'Visual Campaign'
  });

  // PIN settings state
  const [pinForm, setPinForm] = useState({ currentPin: '', newPin: '', confirmPin: '' });
  const [pinStatus, setPinStatus] = useState(null);

  // Interactive Crop State
  const [cropState, setCropState] = useState({
    isOpen: false,
    imageSrc: null,
    file: null,
    type: 'general',
    onUploaded: null
  });

  const showNotification = (msg, isError = false) => {
    setStatusMsg({ text: msg, isError });
    setTimeout(() => setStatusMsg(null), 3500);
  };

  // Fetch Reel Categories from API
  React.useEffect(() => {
    if (!isOpen) return;
    fetch(apiUrl('/api/reel-categories'))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReelCategories(data);
          setReelForm((prev) => ({
            ...prev,
            category: prev.category || data[0].name
          }));
        }
      })
      .catch((err) => console.warn('Reel categories fetch error:', err.message));
  }, [isOpen]);

  // ── Universal File Upload Helper ──────────────────────────────────────────
  const handleFileUpload = async (file, onUploaded, type = 'general') => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    if (type) formData.append('type', type);

    try {
      const res = await fetch(apiUrl('/api/upload'), {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        onUploaded(data.url);
        showNotification('File uploaded successfully!');
      } else {
        showNotification(data.error || 'Upload failed', true);
      }
    } catch {
      showNotification('Server upload error', true);
    } finally {
      setUploading(false);
    }
  };

  // ── Initiate Upload with Cropper Modal ────────────────────────────────────
  const handleInitiateUpload = (file, onUploaded, type = 'general') => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCropState({
        isOpen: true,
        imageSrc: reader.result,
        file: file,
        type: type,
        onUploaded: onUploaded
      });
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmCrop = (croppedFile) => {
    const { onUploaded, type } = cropState;
    setCropState({ isOpen: false, imageSrc: null, file: null, type: 'general', onUploaded: null });
    handleFileUpload(croppedFile, onUploaded, type);
  };

  const handleSkipCrop = () => {
    const { file, onUploaded, type } = cropState;
    setCropState({ isOpen: false, imageSrc: null, file: null, type: 'general', onUploaded: null });
    handleFileUpload(file, onUploaded, type);
  };

  const handleCloseCrop = () => {
    setCropState({ isOpen: false, imageSrc: null, file: null, type: 'general', onUploaded: null });
  };

  // ── Robust Item Identity Matcher (guards against undefined === undefined) ──
  const matchesItem = (itemA, itemB) => {
    if (!itemA || !itemB) return false;
    const objA = typeof itemA === 'string' ? { src: itemA } : itemA;
    const objB = typeof itemB === 'string' ? { src: itemB } : itemB;
    const idA = objA._id || objA.id;
    const idB = objB._id || objB.id;
    if (idA !== undefined && idB !== undefined && idA !== null && idB !== null) {
      return String(idA) === String(idB);
    }
    if (objA.src && objB.src) {
      return objA.src === objB.src;
    }
    return false;
  };

  // ── 1. LOGOS CRUD ("Trusted by Global Leaders") ───────────────────────────
  const handleSaveLogo = async (e) => {
    e.preventDefault();
    if (!logoForm.name || !logoForm.src) {
      showNotification('Logo name and image URL are required', true);
      return;
    }

    try {
      if (editingItem) {
        // Edit existing logo
        const id = editingItem._id || editingItem.id;
        const res = await fetch(apiUrl(`/api/client-logos/${id}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logoForm)
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to update logo');
        }
        const updated = await res.json();
        setLogos((prev) =>
          prev.map((l) => (matchesItem(l, editingItem) ? (typeof l === 'string' ? updated.src || updated : updated) : l))
        );
        showNotification(`Updated logo: ${logoForm.name}`);
      } else {
        // Add new logo
        const res = await fetch(apiUrl('/api/client-logos'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logoForm)
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to add logo');
        }
        const created = await res.json();
        setLogos((prev) => [...prev, created]);
        showNotification(`Added new partner logo: ${logoForm.name}`);
      }
      setIsAddOpen(false);
      setEditingItem(null);
      setLogoForm({ name: '', src: '' });
    } catch (err) {
      console.warn('Logos API warning, using local fallback:', err.message);
      if (editingItem) {
        setLogos((prev) =>
          prev.map((l) => (matchesItem(l, editingItem) ? (typeof l === 'string' ? logoForm.src : { ...l, ...logoForm }) : l))
        );
      } else {
        setLogos((prev) => [...prev, { id: 'local-' + Date.now(), ...logoForm }]);
      }
      setIsAddOpen(false);
      setEditingItem(null);
      showNotification('Updated logo (local mode)');
    }
  };

  const handleDeleteLogo = async (logoItem) => {
    if (!window.confirm('Delete this partner logo from "Trusted by Global Leaders"?')) return;

    const id = logoItem._id || logoItem.id;
    if (id) {
      try {
        await fetch(apiUrl(`/api/client-logos/${id}`), { method: 'DELETE' });
      } catch (err) {
        console.warn('Delete logo offline', err);
      }
    }
    setLogos((prev) => prev.filter((l) => !matchesItem(l, logoItem)));
    showNotification('Partner logo removed from ticker.');
  };

  // ── Reel Categories CRUD ────────────────────────────────────────────────
  const handleAddCategory = async (e) => {
    if (e) e.preventDefault();
    if (!newCatName || !newCatName.trim()) return;
    const name = newCatName.trim();
    if (reelCategories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      showNotification(`Category "${name}" already exists`, true);
      return;
    }

    setCatActionLoading(true);
    try {
      const res = await fetch(apiUrl('/api/reel-categories'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create category');
      setReelCategories((prev) => [...prev, data]);
      setReelForm((prev) => ({ ...prev, category: data.name }));
      setNewCatName('');
      showNotification(`Added category: "${name}"`);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
      const localCat = { _id: 'local-' + Date.now(), name };
      setReelCategories((prev) => [...prev, localCat]);
      setReelForm((prev) => ({ ...prev, category: name }));
      setNewCatName('');
      showNotification(`Added category: "${name}" (local)`);
    } finally {
      setCatActionLoading(false);
    }
  };

  const handleSaveEditCategory = async (catId) => {
    if (!editingCatName || !editingCatName.trim()) return;
    const trimmed = editingCatName.trim();
    const oldCat = reelCategories.find((c) => (c._id || c.id) === catId);
    const oldName = oldCat ? oldCat.name : '';

    setCatActionLoading(true);
    try {
      const res = await fetch(apiUrl(`/api/reel-categories/${catId}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update category');
      setReelCategories((prev) =>
        prev.map((c) => ((c._id || c.id) === catId ? data : c))
      );
      if (reelForm.category === oldName) {
        setReelForm((prev) => ({ ...prev, category: trimmed }));
      }
      setReels((prev) =>
        prev.map((r) => (r.category === oldName ? { ...r, category: trimmed } : r))
      );
      setEditingCatId(null);
      setEditingCatName('');
      showNotification(`Updated category to "${trimmed}"`);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
      setReelCategories((prev) =>
        prev.map((c) => ((c._id || c.id) === catId ? { ...c, name: trimmed } : c))
      );
      if (reelForm.category === oldName) {
        setReelForm((prev) => ({ ...prev, category: trimmed }));
      }
      setReels((prev) =>
        prev.map((r) => (r.category === oldName ? { ...r, category: trimmed } : r))
      );
      setEditingCatId(null);
      setEditingCatName('');
      showNotification(`Updated category to "${trimmed}" (local)`);
    } finally {
      setCatActionLoading(false);
    }
  };

  const handleDeleteCategory = async (cat) => {
    const catId = cat._id || cat.id;
    if (!window.confirm(`Delete category "${cat.name}"? Existing reels will be reassigned.`)) return;

    setCatActionLoading(true);
    try {
      const res = await fetch(apiUrl(`/api/reel-categories/${catId}`), {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete category');
      const remaining = reelCategories.filter((c) => (c._id || c.id) !== catId);
      setReelCategories(remaining);
      const fallbackName = data.reassignedTo || (remaining[0] ? remaining[0].name : 'General');
      if (reelForm.category === cat.name) {
        setReelForm((prev) => ({ ...prev, category: fallbackName }));
      }
      setReels((prev) =>
        prev.map((r) => (r.category === cat.name ? { ...r, category: fallbackName } : r))
      );
      showNotification(`Deleted category "${cat.name}"`);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
      const remaining = reelCategories.filter((c) => (c._id || c.id) !== catId);
      setReelCategories(remaining);
      const fallbackName = remaining[0] ? remaining[0].name : 'General';
      if (reelForm.category === cat.name) {
        setReelForm((prev) => ({ ...prev, category: fallbackName }));
      }
      setReels((prev) =>
        prev.map((r) => (r.category === cat.name ? { ...r, category: fallbackName } : r))
      );
      showNotification(`Deleted category "${cat.name}" (local)`);
    } finally {
      setCatActionLoading(false);
    }
  };

  // ── 2. REELS CRUD ────────────────────────────────────────────────────────
  const handleSaveReel = async (e) => {
    e.preventDefault();
    if (!reelForm.title || !reelForm.thumb || !reelForm.url) {
      showNotification('Title, thumbnail, and video/Instagram URL are required', true);
      return;
    }

    try {
      if (editingItem) {
        // Edit existing reel
        const id = editingItem._id || editingItem.id;
        const res = await fetch(apiUrl(`/api/reels/${id}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reelForm)
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to update reel');
        }
        const updated = await res.json();
        setReels((prev) =>
          prev.map((r) => (matchesItem(r, editingItem) ? updated : r))
        );
        showNotification(`Updated reel: ${reelForm.title}`);
      } else {
        // Add new reel
        const res = await fetch(apiUrl('/api/reels'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reelForm)
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to add reel');
        }
        const created = await res.json();
        setReels((prev) => [...prev, created]);
        showNotification(`Added new video reel: ${reelForm.title}`);
      }
      setIsAddOpen(false);
      setEditingItem(null);
      setReelForm({ title: '', creator: 'Fathima Shiya Hamza', avatar: 'FS', url: '', thumb: '', category: reelCategories[0]?.name || 'Commercial Ads' });
    } catch (err) {
      console.warn('Reels API warning, using local fallback:', err.message);
      if (editingItem) {
        setReels((prev) =>
          prev.map((r) => (matchesItem(r, editingItem) ? { ...r, ...reelForm } : r))
        );
      } else {
        setReels((prev) => [
          ...prev,
          { id: 'local-' + Date.now(), ...reelForm, rotation: '-2deg', marginTop: '10px' }
        ]);
      }
      setIsAddOpen(false);
      setEditingItem(null);
      showNotification('Saved reel (local mode)');
    }
  };

  const handleDeleteReel = async (reelItem) => {
    if (!window.confirm(`Delete reel "${reelItem.title}"?`)) return;

    const id = reelItem._id || reelItem.id;
    if (id) {
      try {
        await fetch(apiUrl(`/api/reels/${id}`), { method: 'DELETE' });
      } catch (err) {
        console.warn('Delete reel offline', err);
      }
    }
    setReels((prev) => prev.filter((r) => !matchesItem(r, reelItem)));
    showNotification('Video reel deleted.');
  };

  // ── 3. POSTERS CRUD ──────────────────────────────────────────────────────
  const handleSavePoster = async (e) => {
    e.preventDefault();
    if (!posterForm.src) {
      showNotification('Poster image is required', true);
      return;
    }

    try {
      if (editingItem) {
        // Edit existing poster
        const id = editingItem._id || editingItem.id;
        const res = await fetch(apiUrl(`/api/posters/${id}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(posterForm)
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to update poster');
        }
        const updated = await res.json();
        setPosters((prev) =>
          prev.map((p) => (matchesItem(p, editingItem) ? updated : p))
        );
        showNotification('Poster updated.');
      } else {
        // Add new poster
        const res = await fetch(apiUrl('/api/posters'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(posterForm)
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to add poster');
        }
        const created = await res.json();
        setPosters((prev) => [...prev, created]);
        showNotification('New campaign poster added.');
      }
      setIsAddOpen(false);
      setEditingItem(null);
      setPosterForm({ title: '', alt: '', src: '', campaignTag: 'Visual Campaign' });
    } catch (err) {
      console.warn('Posters API warning, using local fallback:', err.message);
      if (editingItem) {
        setPosters((prev) =>
          prev.map((p) => (matchesItem(p, editingItem) ? { ...p, ...posterForm } : p))
        );
      } else {
        setPosters((prev) => [...prev, { id: 'local-' + Date.now(), ...posterForm }]);
      }
      setIsAddOpen(false);
      setEditingItem(null);
      showNotification(editingItem ? 'Poster updated (local mode)' : 'Poster added (local mode)');
    }
  };

  const handleDeletePoster = async (posterItem) => {
    if (!window.confirm('Delete this campaign poster?')) return;

    const id = posterItem._id || posterItem.id;
    if (id) {
      try {
        await fetch(apiUrl(`/api/posters/${id}`), { method: 'DELETE' });
      } catch (err) {
        console.warn('Delete poster offline', err);
      }
    }
    setPosters((prev) => prev.filter((p) => !matchesItem(p, posterItem)));
    showNotification('Poster deleted from exhibition.');
  };

  // ── 4. CHANGE PIN & RESTORE DEFAULTS ─────────────────────────────────────
  const handleChangePin = async (e) => {
    e.preventDefault();
    if (pinForm.newPin !== pinForm.confirmPin) {
      setPinStatus({ error: 'New PIN and Confirm PIN do not match' });
      return;
    }
    if (pinForm.newPin.length < 4) {
      setPinStatus({ error: 'New PIN must be at least 4 digits' });
      return;
    }

    try {
      const res = await fetch(apiUrl('/api/admin/auth/change-pin'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPin: pinForm.currentPin, newPin: pinForm.newPin })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPinStatus({ success: 'Admin PIN successfully changed!' });
        setPinForm({ currentPin: '', newPin: '', confirmPin: '' });
      } else {
        setPinStatus({ error: data.error || 'Failed to change PIN' });
      }
    } catch {
      setPinStatus({ error: 'Server connection error' });
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Reset ALL partner logos, reels, and posters to factory defaults?')) return;

    try {
      const res = await fetch(apiUrl('/api/admin/auth/reset-defaults'), { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        showNotification(data.message);
        // Reload page to reflect seeded defaults cleanly
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch {
      showNotification('Reset defaults error', true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: adminTheme.bg,
        color: adminTheme.text,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
        transition: 'background 0.25s, color 0.25s'
      }}
    >
      {/* ── Top Header Navigation Bar ── */}
      <header
        style={{
          minHeight: '64px',
          padding: '0.75rem clamp(1rem, 2.5vw, 2.5rem)',
          borderBottom: `1px solid ${adminTheme.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          background: adminTheme.headerBg,
          backdropFilter: 'blur(20px)',
          flexShrink: 0,
          zIndex: 50,
          transition: 'all 0.25s'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '12px',
              background: C.acidBadge,
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1rem',
              boxShadow: `0 0 18px ${C.acidGlow}`,
              flexShrink: 0
            }}
          >
            KB
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
                  color: adminTheme.text
                }}
              >
                KODBRAND <span style={{ color: C.acid }}>Admin Console</span>
              </h1>
              <span
                style={{
                  padding: '0.15rem 0.55rem',
                  borderRadius: '6px',
                  background: 'rgba(196,236,13,0.12)',
                  border: '1px solid rgba(196,236,13,0.3)',
                  color: C.acid,
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Full Page Mode
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
              <span style={{ fontSize: '0.72rem', color: adminTheme.textDim }}>
                MongoDB Atlas & Cloudinary Live Sync
              </span>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Light / Dark Mode Toggle Button */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle Light and Dark Theme"
              title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '0.5rem 0.85rem',
                borderRadius: '10px',
                background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.14)'}`,
                color: adminTheme.text,
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
              <span>{isLight ? "Dark" : "Light"}</span>
            </button>
          )}

          <button
            onClick={onClose}
            title="Return to live website"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '0.5rem 0.95rem',
              borderRadius: '10px',
              background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.14)'}`,
              color: adminTheme.text,
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={14} />
            <span>Portfolio</span>
          </button>

          <button
            onClick={onLogout}
            title="Lock and sign out of admin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '0.5rem 0.85rem',
              borderRadius: '10px',
              background: 'rgba(255,77,77,0.12)',
              border: '1px solid rgba(255,77,77,0.25)',
              color: '#ff6b6b',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={14} />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Status Notification Banner */}
      {statusMsg && (
        <div
          style={{
            padding: '0.7rem clamp(1rem, 2.5vw, 2.5rem)',
            background: statusMsg.isError ? 'rgba(255,77,77,0.2)' : 'rgba(196,236,13,0.18)',
            color: statusMsg.isError ? '#ff6b6b' : C.acid,
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid rgba(245,245,240,0.08)'
          }}
        >
          {statusMsg.isError ? <AlertCircle size={16} /> : <Check size={16} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* ── KPI Summary Cards Strip ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.75rem',
          padding: '0.85rem clamp(1rem, 2.5vw, 2.5rem)',
          background: adminTheme.subtleBg,
          borderBottom: `1px solid ${adminTheme.border}`,
          flexShrink: 0,
          transition: 'all 0.25s'
        }}
      >
        <div
          onClick={() => { setActiveTab('posters'); setIsAddOpen(false); }}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            background: activeTab === 'posters' ? 'rgba(196,236,13,0.1)' : adminTheme.cardBg,
            border: activeTab === 'posters' ? `1px solid ${C.acid}` : `1px solid ${adminTheme.cardBorder}`,
            boxShadow: adminTheme.shadow,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ fontSize: '0.7rem', color: adminTheme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Campaign Posters
          </div>
          <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 800, color: C.acid, marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            {posters.length} <span style={{ fontSize: '0.72rem', fontWeight: 500, color: adminTheme.textDim }}>in Exhibition</span>
          </div>
        </div>

        <div
          onClick={() => { setActiveTab('logos'); setIsAddOpen(false); }}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            background: activeTab === 'logos' ? 'rgba(96,165,250,0.14)' : adminTheme.cardBg,
            border: activeTab === 'logos' ? '1px solid #60a5fa' : `1px solid ${adminTheme.cardBorder}`,
            boxShadow: adminTheme.shadow,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ fontSize: '0.7rem', color: adminTheme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Trusted Alliances
          </div>
          <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 800, color: '#60a5fa', marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            {logos.length} <span style={{ fontSize: '0.72rem', fontWeight: 500, color: adminTheme.textDim }}>brand logos</span>
          </div>
        </div>

        <div
          onClick={() => { setActiveTab('reels'); setIsAddOpen(false); }}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            background: activeTab === 'reels' ? 'rgba(244,63,94,0.14)' : adminTheme.cardBg,
            border: activeTab === 'reels' ? '1px solid #f43f5e' : `1px solid ${adminTheme.cardBorder}`,
            boxShadow: adminTheme.shadow,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ fontSize: '0.7rem', color: adminTheme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Video Presentations
          </div>
          <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 800, color: '#f43f5e', marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            {reels.length} <span style={{ fontSize: '0.72rem', fontWeight: 500, color: adminTheme.textDim }}>9:16 reels</span>
          </div>
        </div>

        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            background: adminTheme.cardBg,
            border: `1px solid ${adminTheme.cardBorder}`,
            boxShadow: adminTheme.shadow,
            transition: 'all 0.2s'
          }}
        >
          <div style={{ fontSize: '0.7rem', color: adminTheme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Backend Infrastructure
          </div>
          <div style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.98rem)', fontWeight: 700, color: '#38bdf8', marginTop: 6 }}>
            Atlas DB + Cloudinary
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div
        style={{
          display: 'flex',
          borderBottom: `1px solid ${adminTheme.border}`,
          padding: '0 clamp(0.75rem, 2.5vw, 2.5rem)',
          background: adminTheme.subtleBg,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          flexShrink: 0,
          transition: 'all 0.25s'
        }}
      >
        {[
          { id: 'posters', label: '🖼️ Campaign Posters', count: posters.length },
          { id: 'logos', label: '🤝 Trusted By Logos', count: logos.length },
          { id: 'reels', label: '🎬 Videos & Reels', count: reels.length },
          { id: 'settings', label: '⚙️ Settings & Security PIN' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsAddOpen(false);
                setEditingItem(null);
              }}
              style={{
                padding: '1rem 1.4rem',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? `2px solid ${C.acid}` : '2px solid transparent',
                color: isActive ? C.acid : adminTheme.textMuted,
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '10px',
                    background: isActive ? C.acidBadge : isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                    color: isActive ? '#000' : adminTheme.textMuted,
                    fontWeight: 700
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Full Page Workspace ── */}
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem clamp(1rem, 2.5vw, 2.5rem) 5rem'
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* ══════════════════════════════════════════════════════════════════
              TAB 1: "TRUSTED BY GLOBAL LEADERS" LOGOS
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'logos' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>
                    "Trusted by Global Leaders" Alliance Logos
                  </h3>
                  <p style={{ margin: '0.2rem 0 0', color: 'rgba(245,245,240,0.5)', fontSize: '0.8rem' }}>
                    Manage the partner and client logos that scroll in the Strategic Alliances ticker.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setLogoForm({ name: '', src: '' });
                    setIsAddOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '0.55rem 1.2rem',
                    borderRadius: '20px',
                    background: C.acidBadge,
                    color: '#000',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: `0 0 14px ${C.acidGlow}`
                  }}
                >
                  <Plus size={16} /> Add Partner Logo
                </button>
              </div>

              {/* Add / Edit Form Modal Inline */}
              {isAddOpen && (
                <form
                  onSubmit={handleSaveLogo}
                  style={{
                    background: adminTheme.cardBg,
                    border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : C.acid}`,
                    borderRadius: '16px',
                    padding: 'clamp(1rem, 3vw, 1.5rem)',
                    marginBottom: '2rem',
                    boxShadow: adminTheme.shadow
                  }}
                >
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1rem', color: C.acid }}>
                    {editingItem ? 'Edit Partner Logo' : 'Add New Partner Logo'}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                        Partner Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Redpex, IPAS, Paris Cafe"
                        value={logoForm.name}
                        onChange={(e) => setLogoForm({ ...logoForm, name: e.target.value })}
                        style={{ ...inputStyle, width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                        Logo Image (Upload File or Paste Image URL)
                      </label>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          placeholder="/razain.png or https://..."
                          value={logoForm.src}
                          onChange={(e) => setLogoForm({ ...logoForm, src: e.target.value })}
                          style={{ ...inputStyle, flex: '1 1 180px', minWidth: '160px' }}
                        />
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '0.65rem 1rem',
                            borderRadius: '8px',
                            background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)',
                            border: `1px solid ${adminTheme.inputBorder}`,
                            color: adminTheme.text,
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            flexShrink: 0
                          }}
                        >
                          <Upload size={14} />
                          <span>{uploading ? '...' : 'Upload & Crop'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleInitiateUpload(file, (url) => setLogoForm((prev) => ({ ...prev, src: url })), 'logo');
                              }
                              e.target.value = '';
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {logoForm.src && (
                    <div style={{ marginTop: '0.8rem', display: 'flex', alignItems: 'center', gap: 12, padding: '0.6rem 0.8rem', background: 'rgba(196,236,13,0.06)', borderRadius: '8px', border: '1px solid rgba(196,236,13,0.2)' }}>
                      <img src={logoForm.src} alt="Preview" style={{ height: 44, width: 68, objectFit: 'contain', borderRadius: 4, background: adminTheme.logoTileBg, filter: adminTheme.logoFilter, padding: 4 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.78rem', color: C.acid, fontWeight: 700 }}>✓ Transparent B&W Logo Ready</div>
                        <div style={{ fontSize: '0.72rem', color: adminTheme.textMuted }}>Click "{editingItem ? 'Save Changes' : 'Add Logo to Ticker'}" below to publish to portfolio.</div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: '1.2rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddOpen(false);
                        setEditingItem(null);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        background: 'transparent',
                        border: `1px solid ${adminTheme.inputBorder}`,
                        color: adminTheme.textMuted,
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '0.5rem 1.4rem',
                        borderRadius: '8px',
                        background: C.acidBadge,
                        border: 'none',
                        color: '#000',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {editingItem ? 'Save Changes' : 'Add Logo to Ticker'}
                    </button>
                  </div>
                </form>
              )}

              {/* Logos Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
                  gap: 'clamp(0.75rem, 1.8vw, 1.2rem)'
                }}
              >
                {logos.map((logoItem, idx) => {
                  const src = typeof logoItem === 'string' ? logoItem : logoItem.src;
                  const name = typeof logoItem === 'string' ? logoItem.replace(/\.[^/.]+$/, '').replace('/', '') : logoItem.name;

                  return (
                    <div
                      key={idx}
                      style={{
                        background: adminTheme.cardBg,
                        borderRadius: '14px',
                        border: `1px solid ${adminTheme.cardBorder}`,
                        boxShadow: adminTheme.shadow,
                        padding: '1.2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        position: 'relative'
                      }}
                    >
                      <div
                        style={{
                          height: '95px',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: adminTheme.logoTileBg,
                          border: `1px solid ${adminTheme.logoTileBorder}`,
                          borderRadius: '10px',
                          padding: '0.7rem',
                          position: 'relative'
                        }}
                      >
                        <img
                          src={src}
                          alt={name}
                          style={{
                            maxHeight: '75px',
                            maxWidth: '140px',
                            objectFit: 'contain',
                            filter: adminTheme.logoFilter,
                            opacity: 0.95
                          }}
                        />
                      </div>

                      <div style={{ width: '100%', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: adminTheme.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: adminTheme.textDim, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {src}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 8, width: '100%', justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            setEditingItem(logoItem);
                            setLogoForm({ name, src });
                            setIsAddOpen(true);
                          }}
                          style={{
                            padding: '0.35rem 0.7rem',
                            borderRadius: '6px',
                            background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                            border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'transparent'}`,
                            color: adminTheme.text,
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLogo(logoItem)}
                          style={{
                            padding: '0.35rem 0.7rem',
                            borderRadius: '6px',
                            background: 'rgba(255,77,77,0.15)',
                            border: 'none',
                            color: '#ff6b6b',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 2: VIDEOS & REELS MANAGEMENT
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'reels' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>
                    Short-Form Videos & Reels
                  </h3>
                  <p style={{ margin: '0.2rem 0 0', color: 'rgba(245,245,240,0.5)', fontSize: '0.8rem' }}>
                    Manage the 9:16 vertical video presentations, Instagram reels, and commercial links.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setReelForm({ title: '', creator: 'Fathima Shiya Hamza', avatar: 'FS', url: '', thumb: '', category: reelCategories[0]?.name || 'Commercial Ads' });
                    setIsAddOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '0.55rem 1.2rem',
                    borderRadius: '20px',
                    background: C.acidBadge,
                    color: '#000',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: `0 0 14px ${C.acidGlow}`
                  }}
                >
                  <Plus size={16} /> Add Video / Reel
                </button>
              </div>

              {/* Add / Edit Reel Form */}
              {isAddOpen && (
                <form
                  onSubmit={handleSaveReel}
                  style={{
                    background: adminTheme.cardBg,
                    border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : C.acid}`,
                    borderRadius: '16px',
                    padding: 'clamp(1rem, 3vw, 1.5rem)',
                    marginBottom: '2rem',
                    boxShadow: adminTheme.shadow
                  }}
                >
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1rem', color: C.acid }}>
                    {editingItem ? 'Edit Video Reel' : 'Add New Video Reel'}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                        Video Title / Headline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Matglober UK With The Expert"
                        value={reelForm.title}
                        onChange={(e) => setReelForm({ ...reelForm, title: e.target.value })}
                        style={{ ...inputStyle, width: '100%' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <label style={{ fontSize: '0.75rem', color: adminTheme.textMuted }}>
                          Category
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsManageCategoryOpen(true)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(196,236,13,0.12)',
                            border: `1px solid ${isLight ? 'rgba(0,0,0,0.15)' : C.acid}`,
                            color: isLight ? '#000' : C.acid,
                            borderRadius: '12px',
                            padding: '2px 8px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          title="Add, edit, or delete categories"
                        >
                          <Settings size={12} /> + Manage
                        </button>
                      </div>
                      <select
                        value={reelForm.category || (reelCategories[0]?.name || 'Commercial Ads')}
                        onChange={(e) => setReelForm({ ...reelForm, category: e.target.value })}
                        style={{ ...inputStyle, width: '100%', cursor: 'pointer' }}
                      >
                        {reelCategories.map((cat) => (
                          <option
                            key={cat._id || cat.id || cat.name}
                            value={cat.name}
                            style={{ background: isLight ? '#ffffff' : '#141622', color: isLight ? '#000000' : '#ffffff' }}
                          >
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                        Video Link (Instagram Reel URL or Direct Video Link)
                      </label>
                      <input
                        type="text"
                        placeholder="https://www.instagram.com/reel/DHx3H4stp47/"
                        value={reelForm.url}
                        onChange={(e) => setReelForm({ ...reelForm, url: e.target.value })}
                        style={{ ...inputStyle, width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                        Creator Profile Handle
                      </label>
                      <input
                        type="text"
                        placeholder="Fathima Shiya Hamza"
                        value={reelForm.creator}
                        onChange={(e) => setReelForm({ ...reelForm, creator: e.target.value })}
                        style={{ ...inputStyle, width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                        Avatar Initials (e.g. FS or KB)
                      </label>
                      <input
                        type="text"
                        placeholder="FS"
                        maxLength={4}
                        value={reelForm.avatar}
                        onChange={(e) => setReelForm({ ...reelForm, avatar: e.target.value })}
                        style={{ ...inputStyle, width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                      Thumbnail Image Poster (Upload 9:16 Image or Paste Image URL)
                    </label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="/reels/shiya-reel-1.jpg or https://..."
                        value={reelForm.thumb}
                        onChange={(e) => setReelForm({ ...reelForm, thumb: e.target.value })}
                        style={{ ...inputStyle, flex: '1 1 180px', minWidth: '160px' }}
                      />
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '0.65rem 1.1rem',
                          borderRadius: '8px',
                          background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)',
                          border: `1px solid ${adminTheme.inputBorder}`,
                          color: adminTheme.text,
                          cursor: 'pointer',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          flexShrink: 0
                        }}
                      >
                        <Upload size={14} />
                        <span>{uploading ? '...' : 'Upload & Crop'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleInitiateUpload(file, (url) => setReelForm((prev) => ({ ...prev, thumb: url })), 'reel');
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {reelForm.thumb && (
                    <div style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 12, padding: '0.6rem 0.8rem', background: 'rgba(196,236,13,0.06)', borderRadius: '8px', border: '1px solid rgba(196,236,13,0.2)' }}>
                      <img src={reelForm.thumb} alt="Preview" style={{ height: 50, width: 35, objectFit: 'cover', borderRadius: 4, background: 'rgba(0,0,0,0.4)' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.78rem', color: C.acid, fontWeight: 700 }}>✓ Thumbnail Ready</div>
                        <div style={{ fontSize: '0.72rem', color: adminTheme.textMuted }}>Click "{editingItem ? 'Save Reel' : 'Add to Reel Showcase'}" below to publish to portfolio.</div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddOpen(false);
                        setEditingItem(null);
                      }}
                      style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'transparent', border: `1px solid ${adminTheme.inputBorder}`, color: adminTheme.textMuted, cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '0.5rem 1.4rem', borderRadius: '8px', background: C.acidBadge, border: 'none', color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      {editingItem ? 'Save Reel' : 'Add to Reel Showcase'}
                    </button>
                  </div>
                </form>
              )}

              {/* Reels List */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                  gap: 'clamp(0.8rem, 2vw, 1.2rem)'
                }}
              >
                {reels.map((reel, idx) => (
                  <div
                    key={reel._id || reel.id || idx}
                    style={{
                      background: adminTheme.cardBg,
                      borderRadius: '16px',
                      border: `1px solid ${adminTheme.cardBorder}`,
                      boxShadow: adminTheme.shadow,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ position: 'relative', height: 'clamp(180px, 26vw, 220px)', background: '#000' }}>
                      <img src={reel.thumb} alt={reel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 8, left: 8, padding: '0.2rem 0.5rem', borderRadius: '12px', background: 'rgba(0,0,0,0.7)', fontSize: '0.65rem', fontWeight: 700, color: C.acid }}>
                        {reel.avatar}
                      </div>
                    </div>

                    <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.72rem', color: C.acid, fontWeight: 700, textTransform: 'uppercase' }}>
                            {reel.creator}
                          </span>
                          <span
                            style={{
                              fontSize: '0.64rem',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(196,236,13,0.12)',
                              color: isLight ? '#000' : C.acid,
                              fontWeight: 700
                            }}
                          >
                            {reel.category || 'Short-Form Reels'}
                          </span>
                        </div>
                        <h4 style={{ margin: '0.3rem 0 0.5rem', fontSize: '0.88rem', fontWeight: 600, color: adminTheme.text, lineHeight: 1.3 }}>
                          {reel.title}
                        </h4>
                        <a
                          href={reel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: adminTheme.textDim, textDecoration: 'none' }}
                        >
                          <ExternalLink size={12} /> Watch Reel
                        </a>
                      </div>

                      <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
                        <button
                          onClick={() => {
                            setEditingItem(reel);
                            setReelForm({
                              title: reel.title,
                              creator: reel.creator,
                              avatar: reel.avatar,
                              url: reel.url,
                              thumb: reel.thumb,
                              category: reel.category || (reelCategories[0]?.name || 'Commercial Ads')
                            });
                            setIsAddOpen(true);
                          }}
                          style={{
                            flex: 1,
                            padding: '0.4rem',
                            borderRadius: '6px',
                            background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                            border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'transparent'}`,
                            color: adminTheme.text,
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4
                          }}
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReel(reel)}
                          style={{ padding: '0.4rem 0.7rem', borderRadius: '6px', background: 'rgba(255,77,77,0.15)', border: 'none', color: '#ff6b6b', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 3: POSTERS & CAMPAIGN IMAGES
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'posters' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>
                    Visual Campaign Posters
                  </h3>
                  <p style={{ margin: '0.2rem 0 0', color: 'rgba(245,245,240,0.5)', fontSize: '0.8rem' }}>
                    Manage the posters in the pure exhibition gallery and the 3-mockup sliding showcases.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setPosterForm({ title: '', alt: '', src: '', campaignTag: 'Visual Campaign' });
                    setIsAddOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '0.55rem 1.2rem',
                    borderRadius: '20px',
                    background: C.acidBadge,
                    color: '#000',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: `0 0 14px ${C.acidGlow}`
                  }}
                >
                  <Plus size={16} /> Add Campaign Poster
                </button>
              </div>

              {/* Add / Edit Poster Form */}
              {isAddOpen && (
                <form
                  onSubmit={handleSavePoster}
                  style={{
                    background: adminTheme.cardBg,
                    border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : C.acid}`,
                    borderRadius: '16px',
                    padding: 'clamp(1rem, 3vw, 1.5rem)',
                    marginBottom: '2rem',
                    boxShadow: adminTheme.shadow
                  }}
                >
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1rem', color: C.acid }}>
                    {editingItem ? 'Edit Campaign Poster' : 'Add New Campaign Poster'}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                        Poster Title / Description
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. IPAS Advisory Tax Planning"
                        value={posterForm.title}
                        onChange={(e) => setPosterForm({ ...posterForm, title: e.target.value })}
                        style={{ ...inputStyle, width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                        Campaign Sector / Brand Tag
                      </label>
                      <input
                        type="text"
                        list="campaign-tags"
                        placeholder="e.g. Food & Beverage, Paris Cafe, Finance..."
                        value={posterForm.campaignTag}
                        onChange={(e) => setPosterForm({ ...posterForm, campaignTag: e.target.value })}
                        style={{ ...inputStyle, width: '100%' }}
                      />
                      <datalist id="campaign-tags">
                        <option value="Food & Beverage" />
                        <option value="Paris Cafe" />
                        <option value="Finance & Advisory" />
                        <option value="IPAS Advisory" />
                        <option value="Retail & Platform" />
                        <option value="Redpex" />
                        <option value="Solar & Green Energy" />
                        <option value="Horizone Energy" />
                        <option value="Education" />
                        <option value="Inkspire Study Point" />
                        <option value="Visual Campaign" />
                      </datalist>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                      Poster Image (Upload File or Paste Image URL)
                    </label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="/ipas-3.jpeg or https://..."
                        value={posterForm.src}
                        onChange={(e) => setPosterForm({ ...posterForm, src: e.target.value })}
                        style={{ ...inputStyle, flex: '1 1 180px', minWidth: '160px' }}
                      />
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '0.65rem 1.1rem',
                          borderRadius: '8px',
                          background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)',
                          border: `1px solid ${adminTheme.inputBorder}`,
                          color: adminTheme.text,
                          cursor: 'pointer',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          flexShrink: 0
                        }}
                      >
                        <Upload size={14} />
                        <span>{uploading ? '...' : 'Upload & Crop'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleInitiateUpload(file, (url) => setPosterForm((prev) => ({ ...prev, src: url })), 'poster');
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {posterForm.src && (
                    <div style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 12, padding: '0.6rem 0.8rem', background: 'rgba(196,236,13,0.06)', borderRadius: '8px', border: '1px solid rgba(196,236,13,0.2)' }}>
                      <img src={posterForm.src} alt="Preview" style={{ height: 60, width: 45, objectFit: 'cover', borderRadius: 4, background: 'rgba(0,0,0,0.4)' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.78rem', color: C.acid, fontWeight: 700 }}>✓ Poster Ready</div>
                        <div style={{ fontSize: '0.72rem', color: adminTheme.textMuted }}>Click "{editingItem ? 'Save Poster' : 'Add to Exhibition'}" below to publish to portfolio.</div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddOpen(false);
                        setEditingItem(null);
                      }}
                      style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'transparent', border: `1px solid ${adminTheme.inputBorder}`, color: adminTheme.textMuted, cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '0.5rem 1.4rem', borderRadius: '8px', background: C.acidBadge, border: 'none', color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      {editingItem ? 'Save Poster' : 'Add to Exhibition'}
                    </button>
                  </div>
                </form>
              )}

              {/* Posters Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                  gap: 'clamp(0.8rem, 2vw, 1.2rem)'
                }}
              >
                {posters.map((poster, idx) => (
                  <div
                    key={poster._id || poster.id || idx}
                    style={{
                      background: adminTheme.cardBg,
                      borderRadius: '14px',
                      border: `1px solid ${adminTheme.cardBorder}`,
                      boxShadow: adminTheme.shadow,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ height: 'clamp(180px, 24vw, 220px)', background: '#FFFFFF', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={poster.src} alt={poster.alt || poster.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>

                    <div style={{ padding: '0.9rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: C.acid, fontWeight: 700, textTransform: 'uppercase' }}>
                          {poster.campaignTag || 'Poster'}
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: adminTheme.text, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {poster.title || poster.alt || `Poster ${idx + 1}`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 8, marginTop: '0.8rem' }}>
                        <button
                          onClick={() => {
                            setEditingItem(poster);
                            setPosterForm({
                              title: poster.title || '',
                              alt: poster.alt || '',
                              src: poster.src,
                              campaignTag: poster.campaignTag || 'Visual Campaign'
                            });
                            setIsAddOpen(true);
                          }}
                          style={{
                            flex: 1,
                            padding: '0.35rem',
                            borderRadius: '6px',
                            background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                            border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'transparent'}`,
                            color: adminTheme.text,
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4
                          }}
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePoster(poster)}
                          style={{ padding: '0.35rem 0.65rem', borderRadius: '6px', background: 'rgba(255,77,77,0.15)', border: 'none', color: '#ff6b6b', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 4: SETTINGS & SECURITY
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '580px' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', fontWeight: 600, color: adminTheme.text }}>
                  Admin Security Settings
                </h3>
                <p style={{ margin: 0, color: adminTheme.textMuted, fontSize: '0.82rem' }}>
                  Update your secret 5-click logo access PIN or reset portfolio data.
                </p>
              </div>

              {/* Change PIN Form */}
              <form
                onSubmit={handleChangePin}
                style={{
                  background: adminTheme.cardBg,
                  border: `1px solid ${adminTheme.cardBorder}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  boxShadow: adminTheme.shadow
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.2rem', color: C.acid }}>
                  <Key size={18} />
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Change Secret Admin PIN</h4>
                </div>

                {pinStatus && (
                  <div
                    style={{
                      padding: '0.6rem 0.9rem',
                      borderRadius: '8px',
                      background: pinStatus.error ? 'rgba(255,77,77,0.15)' : 'rgba(196,236,13,0.15)',
                      color: pinStatus.error ? '#ff6b6b' : C.acid,
                      fontSize: '0.8rem',
                      marginBottom: '1rem'
                    }}
                  >
                    {pinStatus.error || pinStatus.success}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                      Current PIN (Default: 12345)
                    </label>
                    <input
                      type="password"
                      maxLength={6}
                      value={pinForm.currentPin}
                      onChange={(e) => setPinForm({ ...pinForm, currentPin: e.target.value })}
                      style={{ ...inputStyle, width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                      New 5-Digit PIN
                    </label>
                    <input
                      type="password"
                      maxLength={6}
                      value={pinForm.newPin}
                      onChange={(e) => setPinForm({ ...pinForm, newPin: e.target.value })}
                      style={{ ...inputStyle, width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: adminTheme.textMuted, marginBottom: 6 }}>
                      Confirm New PIN
                    </label>
                    <input
                      type="password"
                      maxLength={6}
                      value={pinForm.confirmPin}
                      onChange={(e) => setPinForm({ ...pinForm, confirmPin: e.target.value })}
                      style={{ ...inputStyle, width: '100%' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '0.6rem 1.4rem',
                    borderRadius: '8px',
                    background: C.acidBadge,
                    border: 'none',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Update Admin PIN
                </button>
              </form>

              {/* Restore Factory Defaults */}
              <div
                style={{
                  background: 'rgba(255,77,77,0.04)',
                  border: '1px solid rgba(255,77,77,0.15)',
                  borderRadius: '16px',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.6rem', color: '#ff6b6b' }}>
                  <RefreshCw size={18} />
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Restore Factory Defaults</h4>
                </div>
                <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'rgba(245,245,240,0.5)', lineHeight: 1.6 }}>
                  Reset all partner alliance logos, reels, posters, and PIN back to the original portfolio seed data.
                </p>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  style={{
                    padding: '0.55rem 1.2rem',
                    borderRadius: '8px',
                    background: 'rgba(255,77,77,0.18)',
                    border: '1px solid rgba(255,77,77,0.3)',
                    color: '#ff6b6b',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Restore All Default Seeds
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Interactive Image Cropping Modal ── */}
      <ImageCropModal
        isOpen={cropState.isOpen}
        imageSrc={cropState.imageSrc}
        originalFileName={cropState.file?.name || 'upload.png'}
        type={cropState.type}
        isLight={isLight}
        onClose={handleCloseCrop}
        onConfirmCrop={handleConfirmCrop}
        onSkipCrop={handleSkipCrop}
      />

      {/* ── Manage Reel Categories Modal ── */}
      <AnimatePresence>
        {isManageCategoryOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100000,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsManageCategoryOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              style={{
                width: '100%',
                maxWidth: '520px',
                background: isLight ? '#ffffff' : '#141622',
                border: `1px solid ${adminTheme.border}`,
                borderRadius: '18px',
                padding: 'clamp(1rem, 3vw, 1.6rem)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.2rem',
                  paddingBottom: '0.8rem',
                  borderBottom: `1px solid ${adminTheme.border}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      background: 'rgba(196,236,13,0.15)',
                      color: C.acid,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Layers size={18} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: adminTheme.text }}>
                      Manage Reel Categories
                    </h3>
                    <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: adminTheme.textMuted }}>
                      Add, rename, or delete video showcase categories
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsManageCategoryOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: adminTheme.textMuted,
                    cursor: 'pointer',
                    padding: 6,
                    borderRadius: '8px'
                  }}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Add New Category Form */}
              <form onSubmit={handleAddCategory} style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: adminTheme.text, marginBottom: 6 }}>
                  Add New Category
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="e.g. Brand Campaigns, Customer Reviews..."
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="submit"
                    disabled={catActionLoading || !newCatName.trim()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '0 1.1rem',
                      borderRadius: '8px',
                      background: C.acidBadge,
                      color: '#000',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: newCatName.trim() ? 'pointer' : 'not-allowed',
                      opacity: newCatName.trim() ? 1 : 0.6,
                      flexShrink: 0
                    }}
                  >
                    <Plus size={15} /> Add
                  </button>
                </div>
              </form>

              {/* Existing Categories List */}
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4, minHeight: '140px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: adminTheme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Available Categories ({reelCategories.length})
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {reelCategories.map((cat) => {
                    const catId = cat._id || cat.id;
                    const isEditing = editingCatId === catId;
                    const reelCount = reels.filter((r) => r.category === cat.name).length;

                    return (
                      <div
                        key={catId}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '10px',
                          background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${adminTheme.border}`
                        }}
                      >
                        {isEditing ? (
                          <div style={{ display: 'flex', gap: 6, flex: 1, marginRight: 8 }}>
                            <input
                              type="text"
                              value={editingCatName}
                              onChange={(e) => setEditingCatName(e.target.value)}
                              autoFocus
                              style={{ ...inputStyle, padding: '0.35rem 0.6rem', fontSize: '0.82rem', flex: 1 }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEditCategory(catId);
                                if (e.key === 'Escape') setEditingCatId(null);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveEditCategory(catId)}
                              style={{
                                background: C.acidBadge,
                                border: 'none',
                                color: '#000',
                                borderRadius: '6px',
                                padding: '0 8px',
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: '0.75rem'
                              }}
                              title="Save Changes"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingCatId(null)}
                              style={{
                                background: 'transparent',
                                border: `1px solid ${adminTheme.inputBorder}`,
                                color: adminTheme.textMuted,
                                borderRadius: '6px',
                                padding: '0 8px',
                                cursor: 'pointer'
                              }}
                              title="Cancel"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, overflow: 'hidden' }}>
                            <span style={{ fontSize: '0.86rem', fontWeight: 600, color: adminTheme.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {cat.name}
                            </span>
                            <span
                              style={{
                                fontSize: '0.68rem',
                                padding: '2px 7px',
                                borderRadius: '10px',
                                background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                                color: adminTheme.textMuted,
                                flexShrink: 0
                              }}
                            >
                              {reelCount} {reelCount === 1 ? 'reel' : 'reels'}
                            </span>
                          </div>
                        )}

                        {!isEditing && (
                          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCatId(catId);
                                setEditingCatName(cat.name);
                              }}
                              style={{
                                background: 'transparent',
                                border: `1px solid ${adminTheme.inputBorder}`,
                                color: adminTheme.text,
                                borderRadius: '6px',
                                padding: '4px 7px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: '0.72rem'
                              }}
                              title="Rename category"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(cat)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.12)',
                                border: 'none',
                                color: '#ef4444',
                                borderRadius: '6px',
                                padding: '4px 7px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: '0.72rem'
                              }}
                              title="Delete category"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  marginTop: '1.2rem',
                  paddingTop: '0.8rem',
                  borderTop: `1px solid ${adminTheme.border}`,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsManageCategoryOpen(false)}
                  style={{
                    padding: '0.5rem 1.4rem',
                    borderRadius: '8px',
                    background: C.acidBadge,
                    border: 'none',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
