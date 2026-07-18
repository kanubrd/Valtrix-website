'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Save, Loader2, Check, ArrowRight, ArrowLeft, 
  Settings, Link2, Eye, ShieldAlert, RotateCcw, Lock, Unlock, Smartphone, Tablet, Monitor, Briefcase, FileText
} from 'lucide-react';
import { ImageUploader } from '../ImageUploader';
import { Industry } from '@/lib/content-utils';

export function IndustriesTab() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Industry>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Wizard Navigation
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Custom Slug Lock
  const [slugLocked, setSlugLocked] = useState(true);

  // Undo History & Version History
  const [historyStack, setHistoryStack] = useState<Array<Partial<Industry>>>([]);
  const [versions, setVersions] = useState<Array<{ timestamp: string; data: Partial<Industry> }>>([]);

  // Live Preview Configurations
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Destructive confirm states
  const [confirmDeleteSlug, setConfirmDeleteSlug] = useState<string | null>(null);
  const [redirectTarget, setRedirectTarget] = useState('');
  const [referencingPages, setReferencingPages] = useState<string[]>([]);

  const draftTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchIndustries = async () => {
    try {
      const res = await fetch('/api/admin/industries');
      if (res.ok) {
        const data = await res.json();
        setIndustries(data);
      }
      const prodRes = await fetch('/api/admin/products');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProductsList(prodData);
      }
    } catch (err) {
      showToast('Failed to load industries database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();

    // Catch external navigation attempts with unsaved drafts
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (editingSlug) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Exit anyway?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Listen to parent global navigation action
    const handleActionChange = () => {
      const action = sessionStorage.getItem('valtrix-admin-action');
      if (action === 'add') {
        startCreate();
        sessionStorage.removeItem('valtrix-admin-action');
      }
    };
    window.addEventListener('valtrix-admin-action-change', handleActionChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('valtrix-admin-action-change', handleActionChange);
    };
  }, [editingSlug]);

  // Autosave process (every 12 seconds)
  useEffect(() => {
    if (!editingSlug) return;
    if (draftTimer.current) clearInterval(draftTimer.current);

    draftTimer.current = setInterval(() => {
      const snapshot = {
        timestamp: new Date().toLocaleTimeString(),
        data: editForm
      };
      setVersions(prev => [snapshot, ...prev].slice(0, 5));
    }, 12000);

    return () => {
      if (draftTimer.current) clearInterval(draftTimer.current);
    };
  }, [editingSlug, editForm]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (field: keyof Industry, value: any) => {
    setHistoryStack(prev => [editForm, ...prev].slice(0, 10));

    setEditForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && isCreatingNew && slugLocked) {
        updated.slug = (value || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[0];
    setHistoryStack(prev => prev.slice(1));
    setEditForm(previous);
    showToast('Undo applied!', 'success');
  };

  const handleNestedChange = (parent: 'hero' | 'cta' | 'tagColor' | 'metadata', field: string, value: any) => {
    setHistoryStack(prev => [editForm, ...prev].slice(0, 10));
    setEditForm((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value,
      },
    }));
  };

  const startEdit = async (ind: Industry) => {
    setEditingSlug(ind.slug);
    setIsCreatingNew(false);
    setEditForm({ ...ind });
    setCurrentStep(1);
    setSlugLocked(true);
    setHistoryStack([]);
    setVersions([{ timestamp: 'Initial state', data: ind }]);
  };

  const startCreate = () => {
    setIsCreatingNew(true);
    setEditingSlug('new-industry');
    setEditForm({
      slug: '',
      title: '',
      tag: '',
      tagColor: { bg: 'rgba(23, 162, 184, 0.1)', text: '#17A2B8' },
      description: '',
      listingImage: '',
      hero: { image: '', imageAlt: '', imageObjectFit: 'object-contain', heroTagline: '', title: '', subtitle: '' },
      overview: [''],
      applications: [
        { title: '', description: '', image: '', icon: 'Factory' },
        { title: '', description: '', image: '', icon: 'Factory' },
        { title: '', description: '', image: '', icon: 'Factory' }
      ],
      segments: [
        { name: '', description: '', image: '' },
        { name: '', description: '', image: '' },
        { name: '', description: '', image: '' }
      ],
      products: [],
      benefits: [''],
      cta: {
        title: '',
        description: '',
        primaryButton: { text: 'Contact Us', href: '/contact' },
        secondaryButton: { text: 'Explore Other Solutions', href: '/industries' }
      },
      metadata: { title: '', description: '', keywords: [] } as any
    });
    setCurrentStep(1);
    setSlugLocked(true);
    setHistoryStack([]);
    setVersions([]);
  };

  const handleSave = async () => {
    const errors = runPrePublishChecks();
    if (errors.length > 0) {
      showToast(errors[0], 'error');
      return;
    }

    setSaveStatus('saving');
    try {
      // Check if URL changed on existing industry to append 301 redirect
      if (!isCreatingNew && editForm.slug !== editingSlug) {
        await fetch('/api/admin/redirects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source: `/industries/${editingSlug}`, destination: `/industries/${editForm.slug}` }),
        });
      }

      const res = await fetch('/api/admin/industries', {
        method: isCreatingNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        const recently = JSON.parse(localStorage.getItem('valtrix-recently-edited') || '[]');
        const updatedRecent = [
          { type: 'industry', id: editForm.slug, title: editForm.title, updatedAt: 'Just now' },
          ...recently.filter((r: any) => r.id !== editForm.slug)
        ].slice(0, 5);
        localStorage.setItem('valtrix-recently-edited', JSON.stringify(updatedRecent));

        setSaveStatus('saved');
        showToast(isCreatingNew ? 'Target sector published!' : 'Sector updated!', 'success');
        
        setTimeout(() => {
          setSaveStatus('idle');
          setEditingSlug(null);
          setIsCreatingNew(false);
          setEditForm({});
          fetchIndustries();
        }, 800);
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      setSaveStatus('idle');
      showToast('Failed to save changes.', 'error');
    }
  };

  // Pre-publish validation
  const runPrePublishChecks = (): string[] => {
    const errors: string[] = [];
    if (!editForm.title) errors.push('Industry Title is required.');
    if (!editForm.slug) errors.push('URL Page Path (Slug) is required.');
    
    if (isCreatingNew && industries.some(i => i.slug === editForm.slug)) {
      errors.push('This Page URL is already taken.');
    }

    // Required Cross-Linking: Industry must link to at least one product
    if (!editForm.products || editForm.products.length === 0) {
      errors.push('Link at least one product to this industry sector before publishing.');
    }

    return errors;
  };

  // Check references before deleting
  const startDeleteCheck = (ind: Industry) => {
    setConfirmDeleteSlug(ind.slug);
    setRedirectTarget('');

    // Find products linking to this industry tag
    const refs: string[] = [];
    productsList.forEach(prod => {
      const match = prod.industries?.some((tag: string) => tag.toLowerCase().includes(ind.slug.toLowerCase()) || tag.toLowerCase().includes(ind.title.toLowerCase()));
      if (match) {
        refs.push(prod.name);
      }
    });
    setReferencingPages(refs);
  };

  const executeDelete = async () => {
    if (!confirmDeleteSlug) return;

    try {
      if (redirectTarget) {
        await fetch('/api/admin/redirects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source: `/industries/${confirmDeleteSlug}`, destination: redirectTarget }),
        });
      }

      const res = await fetch(`/api/admin/industries?slug=${confirmDeleteSlug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showToast('Industry deleted successfully.', 'success');
        setConfirmDeleteSlug(null);
        fetchIndustries();
      } else {
        alert('Failed to delete industry.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting industry.');
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!editForm.title || !editForm.slug) {
        showToast('Please fill out the Title and URL Path first.', 'error');
        return;
      }
      if (isCreatingNew && industries.some(i => i.slug === editForm.slug)) {
        showToast('This URL is already taken.', 'error');
        return;
      }
    }
    if (currentStep === 4) {
      if (!editForm.products || editForm.products.length === 0) {
        showToast('Link at least one product to this sector before continuing.', 'error');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Dynamic overview handlers
  const handleOverviewChange = (idx: number, val: string) => {
    const updated = [...(editForm.overview || [])];
    updated[idx] = val;
    handleInputChange('overview', updated);
  };

  const addOverviewParagraph = () => {
    handleInputChange('overview', [...(editForm.overview || []), '']);
  };

  const removeOverviewParagraph = (idx: number) => {
    handleInputChange('overview', (editForm.overview || []).filter((_, i) => i !== idx));
  };

  // Dynamic application cards handlers
  const handleApplicationChange = (idx: number, key: 'title' | 'description' | 'image' | 'icon', val: string) => {
    const updated = [...(editForm.applications || [])];
    updated[idx] = { ...updated[idx], [key]: val };
    handleInputChange('applications', updated);
  };

  // Dynamic segments handlers
  const handleSegmentChange = (idx: number, key: 'name' | 'description' | 'image', val: string) => {
    const updated = [...(editForm.segments || [])];
    updated[idx] = { ...updated[idx], [key]: val };
    handleInputChange('segments', updated);
  };

  // Dynamic benefits handlers
  const handleBenefitChange = (idx: number, val: string) => {
    const updated = [...(editForm.benefits || [])];
    updated[idx] = val;
    handleInputChange('benefits', updated);
  };

  const addBenefitItem = () => {
    handleInputChange('benefits', [...(editForm.benefits || []), '']);
  };

  const removeBenefitItem = (idx: number) => {
    handleInputChange('benefits', (editForm.benefits || []).filter((_, i) => i !== idx));
  };

  // Product linking checkboxes
  const toggleProductLink = (prod: any) => {
    const current = editForm.products || [];
    const match = current.find((p: any) => p.name === prod.name);
    
    if (match) {
      handleInputChange('products', current.filter((p: any) => p.name !== prod.name));
    } else {
      const newLink = {
        name: prod.name,
        category: prod.category,
        description: prod.description,
        features: prod.features?.slice(0, 3) || [],
        href: `/solutions?product=${prod.slug}`
      };
      handleInputChange('products', [...current, newLink]);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            style={{
              position: 'fixed',
              top: '24px',
              left: '50%',
              zIndex: 11000,
              padding: '12px 24px',
              borderRadius: '12px',
              background: toast.type === 'success' ? '#10B981' : '#EF4444',
              color: '#FFFFFF',
              fontWeight: 'bold',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CATALOG VIEW ── */}
      {!editingSlug && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2C3E50' }}>Target Industries & Sectors</h3>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                Manage target markets. New industries auto-wire to headers dropdown on publish.
              </p>
            </div>
            <button
              onClick={startCreate}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: '10px',
                background: '#17A2B8',
                color: '#FFFFFF',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                boxShadow: '0 4px 10px rgba(23,162,184,0.15)',
              }}
              className="hover:opacity-95 transition-opacity"
            >
              <Plus size={16} />
              <span>Add Sector</span>
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading industries catalog...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {industries.map((ind) => (
                <div
                  key={ind.slug}
                  style={{
                    padding: '16px 20px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                  }}
                >
                  <div>
                    <h4 style={{ fontWeight: 'bold', color: '#334155', fontSize: '15px' }}>{ind.title}</h4>
                    <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '3px' }}>
                      URL: <code className="text-[#17A2B8]">/industries/{ind.slug}</code> | Code Tag: {ind.tag}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => startEdit(ind)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: '#E6F7FA',
                        color: '#17A2B8',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                      }}
                      className="hover:bg-[#E6F7FA]/80 transition-colors"
                    >
                      Edit
                    </button>
                    
                    <button
                      onClick={() => startDeleteCheck(ind)}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background: '#FEF2F2',
                        color: '#DC2626',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      className="hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── WIZARD & SPLIT PREVIEW VIEW ── */}
      {editingSlug && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Wizard Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <button
              onClick={() => { setEditingSlug(null); setIsCreatingNew(false); setEditForm({}); }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748B',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              className="hover:text-gray-800"
            >
              <ArrowLeft size={16} />
              <span>Exit Wizard</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {historyStack.length > 0 && (
                <button
                  onClick={handleUndo}
                  style={{ background: 'transparent', border: 'none', color: '#17A2B8', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
                  className="hover:underline"
                >
                  <RotateCcw size={12} />
                  <span>Undo</span>
                </button>
              )}

              {versions.length > 0 && (
                <select
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (!isNaN(idx) && versions[idx]) {
                      setEditForm(versions[idx].data);
                      showToast('Loaded selected version snapshot.', 'success');
                    }
                  }}
                  style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '11px', color: '#64748B', outline: 'none' }}
                >
                  <option value="">Version History</option>
                  {versions.map((ver, idx) => (
                    <option key={idx} value={idx}>Snapshot: {ver.timestamp}</option>
                  ))}
                </select>
              )}

              <span style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Autosaved draft</span>
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ background: '#F1F5F9', height: '8px', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                background: 'linear-gradient(90deg, #17A2B8 0%, #0D7A8C 100%)', 
                width: `${(currentStep / totalSteps) * 100}%`,
                transition: 'width 0.3s ease'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', fontWeight: 'bold' }}>
            <span>Step {currentStep} of {totalSteps}</span>
            <span>
              {currentStep === 1 && 'Basic Details'}
              {currentStep === 2 && 'Overview & Hero'}
              {currentStep === 3 && 'Media Cards Layout'}
              {currentStep === 4 && 'Linked Products'}
              {currentStep === 5 && 'Benefits & CTA'}
              {currentStep === 6 && 'Review & Publish'}
            </span>
          </div>

          {/* Split Screen Layout */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }} className="flex-col lg:flex-row">
            
            {/* ── LEFT COLUMN: WIZARD FORM ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Step 1: Basics */}
              {currentStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 1: Sector Basics</h4>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      Sector Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Metal Working Fluids & Lubricants"
                      value={editForm.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      <span>Page URL path</span>
                      <button
                        type="button"
                        onClick={() => setSlugLocked(!slugLocked)}
                        style={{ border: 'none', background: 'transparent', color: '#17A2B8', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        {slugLocked ? <Lock size={10} /> : <Unlock size={10} />}
                        <span>{slugLocked ? 'Customize URL' : 'Lock URL'}</span>
                      </button>
                    </label>
                    
                    <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFB', border: '1.5px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden' }}>
                      <span style={{ padding: '10px 0 10px 12px', fontSize: '13px', color: '#94A3B8', userSelect: 'none' }}>
                        valtrixmaterials.com/industries/
                      </span>
                      <input
                        type="text"
                        disabled={slugLocked}
                        placeholder="metalworking"
                        value={editForm.slug || ''}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        style={{ 
                          flex: 1, 
                          padding: '10px 12px 10px 2px', 
                          border: 'none', 
                          background: 'transparent', 
                          fontSize: '13px',
                          outline: 'none',
                          color: slugLocked ? '#64748B' : '#334155'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      Code Tag (e.g. Header badge label)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. METALWORKING"
                      value={editForm.tag || ''}
                      onChange={(e) => handleInputChange('tag', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      Brief Listing Description
                    </label>
                    <textarea
                      placeholder="Brief 1-2 sentence description displayed on main industries cards grid..."
                      value={editForm.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Overview & Hero */}
              {currentStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 2: Overview paragraphs & Hero</h4>

                  {/* Overview paragraphs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Overview Text Blocks</span>
                      <button type="button" onClick={addOverviewParagraph} style={{ border: 'none', background: 'transparent', color: '#17A2B8', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>
                        + Add Paragraph
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {editForm.overview?.map((p, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                          <textarea
                            placeholder={`Paragraph ${idx + 1} content...`}
                            value={p}
                            onChange={(e) => handleOverviewChange(idx, e.target.value)}
                            rows={3}
                            style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                          />
                          <button
                            type="button"
                            onClick={() => removeOverviewParagraph(idx)}
                            style={{ border: 'none', background: '#FEE2E2', color: '#DC2626', padding: '8px', borderRadius: '8px', cursor: 'pointer', alignSelf: 'flex-start' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hero Images */}
                  <ImageUploader
                    currentImage={editForm.hero?.image || undefined}
                    onUpload={(url) => handleNestedChange('hero', 'image', url)}
                    minWidth={1920}
                    label="Hero Banner Image"
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      Hero Page Tagline / Subtitle
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. High-performance specialty chemicals for surface finishing"
                      value={editForm.hero?.subtitle || ''}
                      onChange={(e) => handleNestedChange('hero', 'subtitle', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Media Cards Layout */}
              {currentStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', maxHeight: '500px', paddingRight: '8px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 3: Applications & Segments</h4>

                  <ImageUploader
                    currentImage={editForm.listingImage || undefined}
                    onUpload={(url) => handleInputChange('listingImage', url)}
                    minWidth={800}
                    label="Main Listing Card Image"
                  />

                  {/* Application Cards (max 3) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Application Cards (3 recommended)</span>
                    
                    {editForm.applications?.map((app, idx) => (
                      <div key={idx} style={{ background: '#F8FAFB', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#17A2B8' }}>Card #{idx + 1}</span>
                        <input
                          type="text"
                          placeholder="Card Title"
                          value={app.title}
                          onChange={(e) => handleApplicationChange(idx, 'title', e.target.value)}
                          style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                        />
                        <textarea
                          placeholder="Card Description"
                          value={app.description}
                          onChange={(e) => handleApplicationChange(idx, 'description', e.target.value)}
                          rows={2}
                          style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                        />
                        <input
                          type="text"
                          placeholder="Image Path (e.g. /cutting-machining.png)"
                          value={app.image}
                          onChange={(e) => handleApplicationChange(idx, 'image', e.target.value)}
                          style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Market Segments (max 3) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Market Segments (3 recommended)</span>
                    
                    {editForm.segments?.map((seg, idx) => (
                      <div key={idx} style={{ background: '#F8FAFB', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#17A2B8' }}>Segment #{idx + 1}</span>
                        <input
                          type="text"
                          placeholder="Segment Name"
                          value={seg.name}
                          onChange={(e) => handleSegmentChange(idx, 'name', e.target.value)}
                          style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                        />
                        <input
                          type="text"
                          placeholder="Segment Description"
                          value={seg.description}
                          onChange={(e) => handleSegmentChange(idx, 'description', e.target.value)}
                          style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                        />
                        <input
                          type="text"
                          placeholder="Image Path"
                          value={seg.image}
                          onChange={(e) => handleSegmentChange(idx, 'image', e.target.value)}
                          style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                        />
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* Step 4: Linked Products */}
              {currentStep === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 4: Linked Products Grid</h4>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>
                    An industry sector **must** display at least one chemical product before publishing:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', overflowY: 'auto', maxHeight: '350px' }}>
                    {productsList.map((prod) => {
                      const isLinked = editForm.products?.some((p: any) => p.name === prod.name);
                      return (
                        <div
                          key={prod.slug}
                          onClick={() => toggleProductLink(prod)}
                          style={{
                            padding: '12px 16px',
                            background: isLinked ? '#E6F7FA' : '#FFFFFF',
                            border: isLinked ? '1.5px solid #17A2B8' : '1.5px solid #E2E8F0',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s',
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>{prod.name}</span>
                            <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{prod.category}</p>
                          </div>

                          <div 
                            style={{ 
                              width: '18px', 
                              height: '18px', 
                              borderRadius: '4px', 
                              border: '2.5px solid #17A2B8',
                              background: isLinked ? '#17A2B8' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#FFFFFF'
                            }}
                          >
                            {isLinked && <Check size={12} strokeWidth={3} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Benefits & CTA */}
              {currentStep === 5 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', maxHeight: '500px', paddingRight: '8px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 5: Benefits & Callout</h4>

                  {/* Benefits */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Key Benefits (List up to 6)</span>
                      <button type="button" onClick={addBenefitItem} style={{ border: 'none', background: 'transparent', color: '#17A2B8', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>
                        + Add Row
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {editForm.benefits?.map((b, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            placeholder="e.g. Reduced friction and wear"
                            value={b}
                            onChange={(e) => handleBenefitChange(idx, e.target.value)}
                            style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                          />
                          <button
                            type="button"
                            onClick={() => removeBenefitItem(idx)}
                            style={{ border: 'none', background: '#FEE2E2', color: '#DC2626', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Bottom Callout Banner details</span>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>CTA Header</label>
                      <input
                        type="text"
                        placeholder="e.g. Ready to Optimize Operations?"
                        value={editForm.cta?.title || ''}
                        onChange={(e) => handleNestedChange('cta', 'title', e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>CTA Paragraph</label>
                      <input
                        type="text"
                        placeholder="Connect with our chemical engineers..."
                        value={editForm.cta?.description || ''}
                        onChange={(e) => handleNestedChange('cta', 'description', e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* Step 6: Review & SEO */}
              {currentStep === 6 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 6: Review & SEO Meta</h4>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      SEO Meta Title (Under 60 chars)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Metalworking Fluids & Lubricants | Manufacturer India | VAM VALTRIX"
                      value={editForm.metadata?.title || ''}
                      onChange={(e) => handleNestedChange('metadata', 'title', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                    <span style={{ fontSize: '10px', color: (editForm.metadata?.title?.length || 0) > 60 ? '#EF4444' : '#94A3B8', marginTop: '4px', display: 'block' }}>
                      Length: {editForm.metadata?.title?.length || 0}/60 characters
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      SEO Meta Description (Under 155 chars)
                    </label>
                    <textarea
                      placeholder="Enter B2B focused meta description..."
                      value={editForm.metadata?.description || ''}
                      onChange={(e) => handleNestedChange('metadata', 'description', e.target.value)}
                      rows={3}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                    <span style={{ fontSize: '10px', color: (editForm.metadata?.description?.length || 0) > 155 ? '#EF4444' : '#94A3B8', marginTop: '4px', display: 'block' }}>
                      Length: {editForm.metadata?.description?.length || 0}/155 characters
                    </span>
                  </div>

                  {runPrePublishChecks().length > 0 && (
                    <div style={{ background: '#FEF2F2', padding: '12px 16px', borderRadius: '10px', border: '1px solid #FCA5A5' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ShieldAlert size={14} />
                        <span>Publish Blocked: Correct the following errors first</span>
                      </span>
                      <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', fontSize: '11px', color: '#B91C1C', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {runPrePublishChecks().map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saveStatus !== 'idle' || runPrePublishChecks().length > 0}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '12px',
                      background: saveStatus === 'saved' ? '#10B981' : '#17A2B8',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      border: 'none',
                      cursor: (saveStatus === 'idle' && runPrePublishChecks().length === 0) ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginTop: '16px',
                      boxShadow: '0 4px 12px rgba(23, 162, 184, 0.15)',
                    }}
                    className="hover:opacity-95 disabled:opacity-50"
                  >
                    {saveStatus === 'saving' && <Loader2 size={18} className="animate-spin" />}
                    {saveStatus === 'saved' && <Check size={18} />}
                    {saveStatus === 'idle' && <Save size={18} />}
                    {saveStatus === 'idle' && (isCreatingNew ? 'Publish Target Sector' : 'Publish Changes')}
                    {saveStatus === 'saving' && 'Saving...'}
                    {saveStatus === 'saved' && 'Published Successfully'}
                  </button>
                </div>
              )}

              {/* Wizard Nav Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '16px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  className="hover:bg-gray-50 disabled:opacity-40"
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={currentStep === totalSteps}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#17A2B8',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  className="hover:opacity-95 disabled:opacity-40"
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>

            {/* ── RIGHT COLUMN: RESPONSIVE LIVE PREVIEW ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F8FAFB', border: '1px solid #E2E8F0', borderRadius: '18px', overflow: 'hidden' }}>
              
              {/* Toolbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Eye size={12} className="text-[#17A2B8]" />
                  <span>Split-Screen Live Preview</span>
                </span>

                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => setViewportSize('desktop')}
                    style={{ padding: '6px', background: viewportSize === 'desktop' ? '#E6F7FA' : 'transparent', border: 'none', borderRadius: '6px', color: viewportSize === 'desktop' ? '#17A2B8' : '#94A3B8', cursor: 'pointer' }}
                    title="Desktop Preview"
                  >
                    <Monitor size={14} />
                  </button>
                  <button
                    onClick={() => setViewportSize('tablet')}
                    style={{ padding: '6px', background: viewportSize === 'tablet' ? '#E6F7FA' : 'transparent', border: 'none', borderRadius: '6px', color: viewportSize === 'tablet' ? '#17A2B8' : '#94A3B8', cursor: 'pointer' }}
                    title="Tablet Preview"
                  >
                    <Tablet size={14} />
                  </button>
                  <button
                    onClick={() => setViewportSize('mobile')}
                    style={{ padding: '6px', background: viewportSize === 'mobile' ? '#E6F7FA' : 'transparent', border: 'none', borderRadius: '6px', color: viewportSize === 'mobile' ? '#17A2B8' : '#94A3B8', cursor: 'pointer' }}
                    title="Mobile Preview"
                  >
                    <Smartphone size={14} />
                  </button>
                </div>
              </div>

              {/* Viewport Frame */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto', maxHeight: '550px' }}>
                
                <div 
                  style={{
                    width: viewportSize === 'mobile' ? '320px' : viewportSize === 'tablet' ? '480px' : '100%',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    border: '1px solid #E2E8F0',
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                  }}
                >
                  
                  {/* Mock Navbar */}
                  <div style={{ height: '36px', background: '#FFFFFF', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#17A2B8' }}>VAM VALTRIX</span>
                  </div>

                  {/* Render Industry Page */}
                  <div>
                    {/* Hero Section */}
                    <div style={{ padding: '32px 20px', background: 'linear-gradient(135deg, #1A2B3C 0%, #0F1D2B 100%)', color: '#FFFFFF', position: 'relative' }}>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#17A2B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {editForm.tag || 'SECTOR TAG'}
                      </span>
                      <h1 style={{ fontSize: '20px', fontWeight: '800', marginTop: '6px' }}>{editForm.title || 'SECTOR TITLE'}</h1>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                        {editForm.hero?.subtitle || 'Hero Subtitle tagline...'}
                      </p>
                    </div>

                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      
                      {/* Overview Text */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' }}>Sector Overview</span>
                        {editForm.overview?.map((p, idx) => (
                          <p key={idx} style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
                            {p || 'Provide overview text paragraphs...'}
                          </p>
                        ))}
                      </div>

                      {/* Application Cards Grid */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' }}>Featured Applications</span>
                        {editForm.applications?.map((app, i) => (
                          <div key={i} style={{ padding: '12px', background: '#F8FAFB', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#334155' }}>{app.title || 'App Card Title'}</span>
                            <p style={{ fontSize: '11px', color: '#64748B' }}>{app.description || 'App description text...'}</p>
                          </div>
                        ))}
                      </div>

                      {/* Linked Products Grid */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' }}>Linked Sourcing Catalog</span>
                        {editForm.products?.map((prod, i) => (
                          <div key={i} style={{ padding: '12px', background: '#E6F7FA/20', borderRadius: '8px', border: '1.5px solid #17A2B8/20' }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#17A2B8' }}>{prod.name}</span>
                            <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{prod.description}</p>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ── DESTRUCTIVE CONFIRMATION MODAL ── */}
      {confirmDeleteSlug && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(15,23,42,0.3)', 
            backdropFilter: 'blur(4px)', 
            zIndex: 10000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', maxWidth: '480px', width: '100%', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={18} />
              <span>Confirm Destructive Action</span>
            </h4>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
              You are deleting the target sector page <strong className="text-gray-800">/industries/{confirmDeleteSlug}</strong>. This will permanently remove the route.
            </p>

            {referencingPages.length > 0 && (
              <div style={{ background: '#FFF5F5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FCA5A5' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#C53030', display: 'block' }}>
                  ⚠️ Active References Warning:
                </span>
                <p style={{ fontSize: '11px', color: '#C53030', marginTop: '2px' }}>
                  The following catalog products are tagged to this industry: <strong>{referencingPages.join(', ')}</strong>.
                </p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>
                Provide a 301 Redirect Target (Prevents 404 links)
              </label>
              <select
                value={redirectTarget}
                onChange={(e) => setRedirectTarget(e.target.value)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '12px',
                  outline: 'none',
                }}
              >
                <option value="">Do not redirect (not recommended - will return 404)</option>
                <option value="/industries">Redirect to Sectors Index (/industries)</option>
                {industries.filter(i => i.slug !== confirmDeleteSlug).map(i => (
                  <option key={i.slug} value={`/industries/${i.slug}`}>
                    Redirect to alternative sector: /industries/{i.slug}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button
                onClick={() => setConfirmDeleteSlug(null)}
                style={{ flex: 1, padding: '10px', border: '1.5px solid #CBD5E1', background: '#FFFFFF', borderRadius: '8px', color: '#475569', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              
              <button
                onClick={executeDelete}
                style={{ flex: 1, padding: '10px', border: 'none', background: '#DC2626', borderRadius: '8px', color: '#FFFFFF', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
