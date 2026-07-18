'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Save, Loader2, Check, ArrowRight, ArrowLeft, 
  Settings, Link2, Eye, ShieldAlert, RotateCcw, Lock, Unlock, Smartphone, Tablet, Monitor
} from 'lucide-react';
import { ImageUploader } from '../ImageUploader';
import { Product } from '@/lib/content-utils';

export function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [industriesList, setIndustriesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Wizard Navigation
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Custom Slug Lock
  const [slugLocked, setSlugLocked] = useState(true);

  // Undo History & Version History
  const [historyStack, setHistoryStack] = useState<Array<Partial<Product>>>([]);
  const [versions, setVersions] = useState<Array<{ timestamp: string; data: Partial<Product> }>>([]);

  // Live Preview Configurations
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Destructive confirm states
  const [confirmDeleteSlug, setConfirmDeleteSlug] = useState<string | null>(null);
  const [redirectTarget, setRedirectTarget] = useState('');
  const [referencingIndustries, setReferencingIndustries] = useState<string[]>([]);

  const draftTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
      const indRes = await fetch('/api/admin/industries');
      if (indRes.ok) {
        const indData = await indRes.json();
        setIndustriesList(indData);
      }
    } catch (err) {
      showToast('Failed to load products database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

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
      // Save local storage snapshot
      const snapshot = {
        timestamp: new Date().toLocaleTimeString(),
        data: editForm
      };
      
      // Update local version history stack
      setVersions(prev => {
        const updated = [snapshot, ...prev].slice(0, 5); // Max 5 versions
        return updated;
      });

      // Notify parent/user subtly via toast in preview or small saving message
      console.log('Autosaving draft snapshot at:', snapshot.timestamp);
    }, 12000);

    return () => {
      if (draftTimer.current) clearInterval(draftTimer.current);
    };
  }, [editingSlug, editForm]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Push state to undo stack before editing
  const handleInputChange = (field: keyof Product, value: any) => {
    // Keep last 10 actions for Undo stack
    setHistoryStack(prev => [editForm, ...prev].slice(0, 10));

    setEditForm((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate URL slug if unlocked
      if (field === 'name' && isCreatingNew && slugLocked) {
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

  const handleNestedChange = (parent: 'images' | 'seo', field: string, value: any) => {
    setHistoryStack(prev => [editForm, ...prev].slice(0, 10));
    setEditForm((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value,
      },
    }));
  };

  const startEdit = async (prod: Product) => {
    setEditingSlug(prod.slug);
    setIsCreatingNew(false);
    setEditForm({ ...prod });
    setCurrentStep(1);
    setSlugLocked(true);
    setHistoryStack([]);
    setVersions([{ timestamp: 'Initial state', data: prod }]);
  };

  const startCreate = () => {
    setIsCreatingNew(true);
    setEditingSlug('new-product');
    setEditForm({
      slug: '',
      name: '',
      category: '',
      tagline: '',
      description: '',
      features: [],
      specs: [{ label: '', value: '' }],
      applications: [],
      industries: [],
      images: { hero: '', product: '', gallery: [] },
      seo: { title: '', description: '', keywords: [] }
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
      // Check if URL changed on existing product to append 301 redirect
      if (!isCreatingNew && editForm.slug !== editingSlug) {
        await fetch('/api/admin/redirects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source: `/products/${editingSlug}`, destination: `/products/${editForm.slug}` }),
        });
      }

      const res = await fetch('/api/admin/products', {
        method: isCreatingNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        // Save to recently edited
        const recently = JSON.parse(localStorage.getItem('valtrix-recently-edited') || '[]');
        const updatedRecent = [
          { type: 'product', id: editForm.slug, title: editForm.name, updatedAt: 'Just now' },
          ...recently.filter((r: any) => r.id !== editForm.slug)
        ].slice(0, 5);
        localStorage.setItem('valtrix-recently-edited', JSON.stringify(updatedRecent));

        setSaveStatus('saved');
        showToast(isCreatingNew ? 'Product created & auto-wired!' : 'Product updated!', 'success');
        
        setTimeout(() => {
          setSaveStatus('idle');
          setEditingSlug(null);
          setIsCreatingNew(false);
          setEditForm({});
          fetchProducts();
        }, 800);
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      setSaveStatus('idle');
      showToast('Failed to save product.', 'error');
    }
  };

  // Pre-publish Link Safety Validator
  const runPrePublishChecks = (): string[] => {
    const errors: string[] = [];
    if (!editForm.name) errors.push('Product Name is required.');
    if (!editForm.slug) errors.push('URL Page Path (Slug) is required.');
    
    // real-time URL path conflict
    if (isCreatingNew && products.some(p => p.slug === editForm.slug)) {
      errors.push('This Page URL is already taken.');
    }

    // Required Cross-Linking
    if (!editForm.industries || editForm.industries.length === 0) {
      errors.push('You must link this product to at least one Target Sector (Industry).');
    }

    // Image widths/presence
    if (editForm.images?.product && !editForm.images.product.startsWith('/') && !editForm.images.product.startsWith('http')) {
      errors.push('Product image path must be a valid path (starting with /).');
    }

    return errors;
  };

  // Check references before deleting
  const startDeleteCheck = (prod: Product) => {
    setConfirmDeleteSlug(prod.slug);
    setRedirectTarget('');
    
    // Find industries pointing to this product
    const refs: string[] = [];
    industriesList.forEach(ind => {
      const match = ind.products?.some((p: any) => p.href?.includes(prod.slug) || p.name?.toLowerCase() === prod.name.toLowerCase());
      if (match) {
        refs.push(ind.title);
      }
    });
    setReferencingIndustries(refs);
  };

  const executeDelete = async () => {
    if (!confirmDeleteSlug) return;

    try {
      // If redirect target is chosen, register 301
      if (redirectTarget) {
        await fetch('/api/admin/redirects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source: `/products/${confirmDeleteSlug}`, destination: redirectTarget }),
        });
      }

      const res = await fetch(`/api/admin/products?slug=${confirmDeleteSlug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showToast('Product deleted successfully.', 'success');
        setConfirmDeleteSlug(null);
        fetchProducts();
      } else {
        alert('Failed to delete product.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting product.');
    }
  };

  // Step Navigators
  const nextStep = () => {
    // Validate current step before advancing
    if (currentStep === 1) {
      if (!editForm.name || !editForm.slug) {
        showToast('Please fill out the Name and URL Path first.', 'error');
        return;
      }
      if (isCreatingNew && products.some(p => p.slug === editForm.slug)) {
        showToast('This URL is already taken.', 'error');
        return;
      }
    }
    if (currentStep === 5) {
      if (!editForm.industries || editForm.industries.length === 0) {
        showToast('Link at least one industry sector before continuing.', 'error');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Technical Specs List handlers
  const handleSpecChange = (index: number, key: 'label' | 'value', val: string) => {
    const updated = [...(editForm.specs || [])];
    updated[index] = { ...updated[index], [key]: val };
    handleInputChange('specs', updated);
  };

  const addSpecItem = () => {
    handleInputChange('specs', [...(editForm.specs || []), { label: '', value: '' }]);
  };

  const removeSpecItem = (index: number) => {
    handleInputChange('specs', (editForm.specs || []).filter((_, i) => i !== index));
  };

  // String lists handlers
  const handleListChange = (field: 'features' | 'applications' | 'industries', index: number, value: string) => {
    const updated = [...(editForm[field] || [])];
    updated[index] = value;
    handleInputChange(field, updated);
  };

  const addListItem = (field: 'features' | 'applications' | 'industries') => {
    handleInputChange(field, [...(editForm[field] || []), '']);
  };

  const removeListItem = (field: 'features' | 'applications' | 'industries', index: number) => {
    handleInputChange(field, (editForm[field] || []).filter((_, i) => i !== index));
  };

  const toggleIndustryLink = (industryTitle: string) => {
    const current = editForm.industries || [];
    if (current.includes(industryTitle)) {
      handleInputChange('industries', current.filter(i => i !== industryTitle));
    } else {
      handleInputChange('industries', [...current, industryTitle]);
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
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2C3E50' }}>Chemical Products Portfolio</h3>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                Create or edit catalog products. They automatically wire into linked sectors on publish.
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
              <span>Add Product</span>
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading products catalog...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {products.map((prod) => (
                <div
                  key={prod.slug}
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
                    <h4 style={{ fontWeight: 'bold', color: '#334155', fontSize: '15px' }}>{prod.name}</h4>
                    <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '3px' }}>
                      URL: <code className="text-[#17A2B8]">/products/{prod.slug}</code> | Category: {prod.category}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => startEdit(prod)}
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
                      onClick={() => startDeleteCheck(prod)}
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

            {/* Autosave Status / Undo / Versions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              
              {/* Undo */}
              {historyStack.length > 0 && (
                <button
                  onClick={handleUndo}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#17A2B8',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  className="hover:underline"
                >
                  <RotateCcw size={12} />
                  <span>Undo</span>
                </button>
              )}

              {/* Version History Selector */}
              {versions.length > 0 && (
                <select
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (!isNaN(idx) && versions[idx]) {
                      setEditForm(versions[idx].data);
                      showToast('Loaded selected version snapshot.', 'success');
                    }
                  }}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '11px',
                    color: '#64748B',
                    outline: 'none',
                  }}
                >
                  <option value="">Version History</option>
                  {versions.map((ver, idx) => (
                    <option key={idx} value={idx}>
                      Snapshot: {ver.timestamp}
                    </option>
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
              {currentStep === 2 && 'Image Assets'}
              {currentStep === 3 && 'Technical Specs'}
              {currentStep === 4 && 'Features & Applications'}
              {currentStep === 5 && 'Linked Sectors'}
              {currentStep === 6 && 'Review & Publish'}
            </span>
          </div>

          {/* Split Screen Layout */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }} className="flex-col lg:flex-row">
            
            {/* ── LEFT COLUMN: WIZARD FORM ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 1: Product Basics</h4>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. VAMShield-90"
                      value={editForm.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
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
                        valtrixmaterials.com/products/
                      </span>
                      <input
                        type="text"
                        disabled={slugLocked}
                        placeholder="vamshield-90"
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
                      Category Tag (Technical label)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Corrosion Mitigation Science"
                      value={editForm.category || ''}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      Tagline / Title Header
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ash-Free Corrosion Inhibitor for Lubricants"
                      value={editForm.tagline || ''}
                      onChange={(e) => handleInputChange('tagline', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Overview & Images */}
              {currentStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 2: Images & Overview</h4>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      Overview Description
                    </label>
                    <textarea
                      placeholder="Enter a descriptive overview about the chemical compound, properties, and core behaviors..."
                      value={editForm.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  <ImageUploader
                    currentImage={editForm.images?.product || undefined}
                    onUpload={(url) => handleNestedChange('images', 'product', url)}
                    minWidth={1600}
                    label="Main Catalog Card Image"
                  />

                  <ImageUploader
                    currentImage={editForm.images?.hero || undefined}
                    onUpload={(url) => handleNestedChange('images', 'hero', url)}
                    minWidth={1920}
                    label="Top Hero Banner Background Image (Optional)"
                  />
                </div>
              )}

              {/* Step 3: Specs Table */}
              {currentStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 3: Technical Specifications</h4>
                    <button 
                      type="button" 
                      onClick={addSpecItem} 
                      style={{ border: 'none', background: 'transparent', color: '#17A2B8', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                    >
                      + Add Row
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {editForm.specs?.map((spec, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="e.g. Chemical Purity"
                          value={spec.label}
                          onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                          style={{ flex: '1', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                        />
                        <input
                          type="text"
                          placeholder="e.g. >99.8% pure grade"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                          style={{ flex: '1.5', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                        />
                        <button
                          type="button"
                          onClick={() => removeSpecItem(idx)}
                          style={{ border: 'none', background: '#FEE2E2', color: '#DC2626', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Features & Apps */}
              {currentStep === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Features */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 4: Features & Applications</h4>
                      <button type="button" onClick={() => addListItem('features')} style={{ border: 'none', background: 'transparent', color: '#17A2B8', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                        + Add Feature
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {editForm.features?.map((f, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            placeholder="e.g. Superior corrosion protection for multi-metal systems"
                            value={f}
                            onChange={(e) => handleListChange('features', idx, e.target.value)}
                            style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                          />
                          <button
                            type="button"
                            onClick={() => removeListItem('features', idx)}
                            style={{ border: 'none', background: '#FEE2E2', color: '#DC2626', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Key Applications</span>
                      <button type="button" onClick={() => addListItem('applications')} style={{ border: 'none', background: 'transparent', color: '#17A2B8', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                        + Add App
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {editForm.applications?.map((app, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            placeholder="e.g. High-speed CNC Turning & Milling"
                            value={app}
                            onChange={(e) => handleListChange('applications', idx, e.target.value)}
                            style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                          />
                          <button
                            type="button"
                            onClick={() => removeListItem('applications', idx)}
                            style={{ border: 'none', background: '#FEE2E2', color: '#DC2626', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* Step 5: Linked Sectors */}
              {currentStep === 5 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 5: Linked Target Sectors</h4>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>
                    A product **cannot** be published unlinked/orphaned. Link this product to at least one active industry sector dropdown:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                    {industriesList.map((ind) => {
                      const isLinked = editForm.industries?.includes(ind.title);
                      return (
                        <div 
                          key={ind.slug}
                          onClick={() => toggleIndustryLink(ind.title)}
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
                            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>{ind.title}</span>
                            <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{ind.tag}</p>
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

              {/* Step 6: Review & Publish */}
              {currentStep === 6 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>Step 6: Review & SEO Meta</h4>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      SEO Meta Title (Under 60 chars)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. VAMShield-90 | Ash-Free Corrosion Inhibitor | VAM VALTRIX"
                      value={editForm.seo?.title || ''}
                      onChange={(e) => handleNestedChange('seo', 'title', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                    <span style={{ fontSize: '10px', color: (editForm.seo?.title?.length || 0) > 60 ? '#EF4444' : '#94A3B8', marginTop: '4px', display: 'block' }}>
                      Length: {editForm.seo?.title?.length || 0}/60 characters
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>
                      SEO Meta Description (Under 155 chars)
                    </label>
                    <textarea
                      placeholder="Describe the product value proposition plus a call to action..."
                      value={editForm.seo?.description || ''}
                      onChange={(e) => handleNestedChange('seo', 'description', e.target.value)}
                      rows={3}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                    <span style={{ fontSize: '10px', color: (editForm.seo?.description?.length || 0) > 155 ? '#EF4444' : '#94A3B8', marginTop: '4px', display: 'block' }}>
                      Length: {editForm.seo?.description?.length || 0}/155 characters
                    </span>
                  </div>

                  {/* Summary of Errors */}
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

                  {/* Save Button */}
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
                    {saveStatus === 'idle' && (isCreatingNew ? 'Publish New Product' : 'Publish Changes')}
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

                  {/* Render Product Page */}
                  <div>
                    {/* Hero Section */}
                    <div style={{ padding: '24px 16px', background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', color: '#FFFFFF', position: 'relative' }}>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#17A2B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {editForm.category || 'CATEGORY TAG'}
                      </span>
                      <h1 style={{ fontSize: '20px', fontWeight: '800', marginTop: '6px' }}>{editForm.name || 'PRODUCT NAME'}</h1>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                        {editForm.tagline || 'Tagline / Hero Header description'}
                      </p>
                    </div>

                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      
                      {/* Grid / Layout (stacked on mobile preview) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {editForm.images?.product && (
                          <div style={{ width: '100%', height: '140px', background: '#F1F5F9', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                            <img 
                              src={editForm.images.product} 
                              alt="product preview" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                            />
                          </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' }}>Overview</span>
                          <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
                            {editForm.description || 'Provide an overview description to see it render here.'}
                          </p>
                        </div>
                      </div>

                      {/* Linked Sectors Badge Strip */}
                      {(editForm.industries?.length || 0) > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                          {editForm.industries?.map((ind, i) => (
                            <span key={i} style={{ fontSize: '9px', fontWeight: 'bold', color: '#17A2B8', background: 'rgba(23,162,184,0.08)', padding: '3px 8px', borderRadius: '6px' }}>
                              {ind}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Specifications Table */}
                      {(editForm.specs?.length || 0) > 0 && (
                        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                            Specifications
                          </span>
                          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                            {editForm.specs?.map((spec, i) => (
                              <div key={i} style={{ display: 'flex', fontSize: '11px', borderBottom: i === (editForm.specs?.length || 0) - 1 ? 'none' : '1px solid #E2E8F0', padding: '6px 8px' }}>
                                <span style={{ flex: 1, fontWeight: 'bold', color: '#64748B' }}>{spec.label || 'Label'}</span>
                                <span style={{ flex: 1.5, color: '#334155' }}>{spec.value || 'Value'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Features */}
                      {(editForm.features?.length || 0) > 0 && (
                        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                            Features & Benefits
                          </span>
                          <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', fontSize: '11px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {editForm.features?.map((f, i) => (
                              <li key={i}>{f || 'Feature description'}</li>
                            ))}
                          </ul>
                        </div>
                      )}

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
              You are deleting the product <strong className="text-gray-800">/products/{confirmDeleteSlug}</strong>. This will permanently remove the page.
            </p>

            {referencingIndustries.length > 0 && (
              <div style={{ background: '#FFF5F5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FCA5A5' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#C53030', display: 'block' }}>
                  ⚠️ Active References Warning:
                </span>
                <p style={{ fontSize: '11px', color: '#C53030', marginTop: '2px' }}>
                  This product is linked on the following published sectors: <strong>{referencingIndustries.join(', ')}</strong>.
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
                <option value="/solutions">Redirect to Solutions Catalog (/solutions)</option>
                {products.filter(p => p.slug !== confirmDeleteSlug).map(p => (
                  <option key={p.slug} value={`/products/${p.slug}`}>
                    Redirect to alternative product: /products/{p.slug}
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
