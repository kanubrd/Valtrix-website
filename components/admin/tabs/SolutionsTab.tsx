'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Sparkles, Loader2, Check, ArrowRight, CornerDownRight, Eye, Monitor, Tablet, Smartphone, FlaskConical, ShieldCheck, RefreshCw } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';
import { Solution } from '@/lib/content-utils';

export function SolutionsTab() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const previewIconMap: Record<string, React.ComponentType<any>> = {
    FlaskConical,
    ShieldCheck,
    RefreshCw,
    Sparkles,
  };
  const [editForm, setEditForm] = useState<Partial<Solution>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const draftTimer = useRef<NodeJS.Timeout | null>(null);

  const startCreate = () => {
    setIsCreatingNew(true);
    setEditingId('new-solution-id');
    setEditForm({
      id: '',
      icon: 'FlaskConical',
      title: '',
      description: '',
      features: [''],
      image: '',
      sliderImages: [{ src: '', alt: '' }],
      details: {
        overview: '',
        specs: [{ label: '', value: '' }],
        applications: [''],
      },
    });
  };

  // Fetch all solutions
  const fetchSolutions = async () => {
    try {
      const res = await fetch('/api/admin/solutions');
      if (res.ok) {
        const data = await res.json();
        setSolutions(data);
      }
    } catch (err) {
      showToast('Failed to load solutions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  // Autosave draft every 15 seconds while editing
  useEffect(() => {
    if (!editingId || !editForm.id) return;

    if (draftTimer.current) clearInterval(draftTimer.current);

    draftTimer.current = setInterval(async () => {
      try {
        await fetch('/api/admin/drafts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'solution',
            id: editingId,
            data: editForm,
          }),
        });
      } catch (err) {
        console.error('Draft autosave failed:', err);
      }
    }, 15000);

    return () => {
      if (draftTimer.current) clearInterval(draftTimer.current);
    };
  }, [editingId, editForm]);

  // Load draft if exists when starting edit
  const startEdit = async (sol: Solution) => {
    setEditingId(sol.id);
    setEditForm({ ...sol });
    try {
      const res = await fetch(`/api/admin/drafts?type=solution&id=${sol.id}`);
      if (res.ok) {
        const draft = await res.json();
        if (draft && draft.data) {
          const loadDraft = confirm('Draft found for this item from ' + new Date(draft.updatedAt).toLocaleTimeString() + '. Load draft?');
          if (loadDraft) {
            setEditForm(draft.data);
          }
        }
      }
    } catch (err) {
      console.error('Failed to retrieve draft:', err);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (field: keyof Solution, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailsChange = (field: string, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      details: {
        ...(prev.details || { overview: '', specs: [], applications: [] }),
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (field: 'features' | 'applications', index: number, value: string) => {
    if (field === 'features') {
      const updated = [...(editForm.features || [])];
      updated[index] = value;
      handleInputChange('features', updated);
    } else {
      const updated = [...(editForm.details?.applications || [])];
      updated[index] = value;
      handleDetailsChange('applications', updated);
    }
  };

  const addArrayItem = (field: 'features' | 'applications') => {
    if (field === 'features') {
      handleInputChange('features', [...(editForm.features || []), '']);
    } else {
      handleDetailsChange('applications', [...(editForm.details?.applications || []), '']);
    }
  };

  const removeArrayItem = (field: 'features' | 'applications', index: number) => {
    if (field === 'features') {
      const updated = (editForm.features || []).filter((_, i) => i !== index);
      handleInputChange('features', updated);
    } else {
      const updated = (editForm.details?.applications || []).filter((_, i) => i !== index);
      handleDetailsChange('applications', updated);
    }
  };

  // Spec handlers
  const handleSpecChange = (index: number, key: 'label' | 'value', val: string) => {
    const updated = [...(editForm.details?.specs || [])];
    updated[index] = { ...updated[index], [key]: val };
    handleDetailsChange('specs', updated);
  };

  const addSpecItem = () => {
    handleDetailsChange('specs', [...(editForm.details?.specs || []), { label: '', value: '' }]);
  };

  const removeSpecItem = (index: number) => {
    const updated = (editForm.details?.specs || []).filter((_, i) => i !== index);
    handleDetailsChange('specs', updated);
  };

  const handleSave = async () => {
    if (saveStatus !== 'idle') return;
    if (isCreatingNew) {
      if (!editForm.id) {
        showToast('Sector ID (Slug) is required.', 'error');
        return;
      }
      if (solutions.some((s) => s.id === editForm.id)) {
        showToast('This Sector ID is already taken. Please choose another one.', 'error');
        return;
      }
    }
    if (!editForm.title || !editForm.description) {
      showToast('Solution Title and Description are required.', 'error');
      return;
    }
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/solutions', {
        method: isCreatingNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        setSaveStatus('saved');
        showToast(isCreatingNew ? 'Solution created successfully!' : 'Solution saved and published successfully!', 'success');
        
        // Delete draft after publishing
        await fetch(`/api/admin/drafts?type=solution&id=${editingId}`, { method: 'DELETE' });

        setTimeout(() => {
          setSaveStatus('idle');
          setEditingId(null);
          setIsCreatingNew(false);
          setEditForm({});
          fetchSolutions();
        }, 800);
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      setSaveStatus('idle');
      showToast('Failed to save changes', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/solutions?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Solution deleted successfully.', 'success');
        setConfirmDeleteId(null);
        fetchSolutions();
      } else {
        throw new Error('Delete failed');
      }
    } catch {
      showToast('Failed to delete solution.', 'error');
      setConfirmDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Loader2 className="animate-spin text-[#17A2B8]" size={32} />
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 11000,
              padding: '12px 24px',
              borderRadius: '12px',
              background: toast.type === 'success' ? '#10B981' : '#EF4444',
              color: '#FFFFFF',
              fontWeight: '600',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {!editingId ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C3E50' }}>
              Modify Existing Solutions
            </h3>
            <button
              onClick={startCreate}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                background: '#17A2B8',
                color: '#FFFFFF',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              className="hover:brightness-95 active:scale-98 transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>Add Sector</span>
            </button>
          </div>
          <div className="grid gap-4">
            {solutions.map((sol) => (
              <div
                key={sol.id}
                style={{
                  padding: '16px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h4 style={{ fontWeight: 'bold', color: '#334155' }}>{sol.title}</h4>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{sol.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => startEdit(sol)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: '#E6F7FA',
                      color: '#17A2B8',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                    }}
                    className="hover:bg-[#17A2B8] hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  {confirmDeleteId === sol.id ? (
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: '600' }}>Delete?</span>
                      <button
                        onClick={() => handleDelete(sol.id)}
                        style={{
                          padding: '6px 12px', borderRadius: '6px',
                          background: '#DC2626', color: '#FFFFFF',
                          fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '11px',
                        }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        style={{
                          padding: '6px 12px', borderRadius: '6px',
                          background: '#F1F5F9', color: '#64748B',
                          fontWeight: '600', border: '1px solid #CBD5E1', cursor: 'pointer', fontSize: '11px',
                        }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(sol.id)}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background: '#FEF2F2',
                        color: '#DC2626',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      className="hover:bg-red-100 transition-colors"
                      title="Delete solution"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => { setEditingId(null); setIsCreatingNew(false); setEditForm({}); }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748B',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px',
              }}
              className="hover:text-gray-900"
            >
              &larr; Back to Catalog
            </button>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '500' }}>Autosaving draft...</span>
          </div>

          {/* ── SPLIT-SCREEN LAYOUT: FORM + LIVE PREVIEW ── */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

            {/* ── LEFT COLUMN: EDIT FORM ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ padding: '20px', background: '#F8FAFB', borderRadius: '16px', border: '1px solid #E2E8F0' }} className="space-y-5">
                {isCreatingNew && (
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                      Sector ID (Slug) - e.g. oem-coatings
                    </label>
                    <input
                      type="text"
                      value={editForm.id || ''}
                      onChange={(e) => handleInputChange('id', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      placeholder="e.g. oem-coatings"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                    Solution Icon
                  </label>
                  <select
                    value={editForm.icon || 'FlaskConical'}
                    onChange={(e) => handleInputChange('icon', e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  >
                    <option value="FlaskConical">Flask / Chemistry</option>
                    <option value="ShieldCheck">Shield / Protection</option>
                    <option value="RefreshCw">Refresh / Recycling</option>
                    <option value="Sparkles">Sparkles / Premium finish</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                    Solution Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                    Short Description
                  </label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                    Overview (Details Page)
                  </label>
                  <textarea
                    value={editForm.details?.overview || ''}
                    onChange={(e) => handleDetailsChange('overview', e.target.value)}
                    rows={4}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                {/* Image Upload */}
                <ImageUploader
                  currentImage={editForm.image}
                  onUpload={(url) => handleInputChange('image', url)}
                  minWidth={1600}
                  label="Solution Main Image"
                />

                {/* Slider Gallery Images */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                    Slider Gallery Images (Add URL directly for simple CMS)
                  </label>
                  <input
                    type="text"
                    placeholder="Slider image path 1"
                    value={editForm.sliderImages?.[0]?.src || ''}
                    onChange={(e) => {
                      const items = [...(editForm.sliderImages || [])];
                      items[0] = { src: e.target.value, alt: editForm.sliderImages?.[0]?.alt || editForm.title || '' };
                      handleInputChange('sliderImages', items);
                    }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '8px' }}
                  />
                  <input
                    type="text"
                    placeholder="Slider image path 2 (optional)"
                    value={editForm.sliderImages?.[1]?.src || ''}
                    onChange={(e) => {
                      const items = [...(editForm.sliderImages || [])];
                      items[1] = { src: e.target.value, alt: editForm.sliderImages?.[1]?.alt || editForm.title || '' };
                      handleInputChange('sliderImages', items);
                    }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                </div>

                {/* Key Features List */}
                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
                    <span>Key Features List</span>
                    <button type="button" onClick={() => addArrayItem('features')} style={{ border: 'none', background: 'transparent', color: '#17A2B8', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                      + Add Feature
                    </button>
                  </label>
                  <div className="space-y-2">
                    {editForm.features?.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => handleArrayChange('features', idx, e.target.value)}
                          style={{ flex: '1', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('features', idx)}
                          style={{ border: 'none', background: '#FEE2E2', color: '#DC2626', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications Key-Value List */}
                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
                    <span>Technical Specifications</span>
                    <button type="button" onClick={addSpecItem} style={{ border: 'none', background: 'transparent', color: '#17A2B8', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                      + Add Spec
                    </button>
                  </label>
                  <div className="space-y-2">
                    {editForm.details?.specs?.map((spec: any, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          placeholder="Label (e.g. pH)"
                          value={spec.label}
                          onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                          style={{ flex: '1', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. 7.5)"
                          value={spec.value}
                          onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                          style={{ flex: '15', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                        />
                        <button
                          type="button"
                          onClick={() => removeSpecItem(idx)}
                          style={{ border: 'none', background: '#FEE2E2', color: '#DC2626', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications List */}
                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
                    <span>Applications List</span>
                    <button type="button" onClick={() => addArrayItem('applications')} style={{ border: 'none', background: 'transparent', color: '#17A2B8', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                      + Add Application
                    </button>
                  </label>
                  <div className="space-y-2">
                    {editForm.details?.applications?.map((app, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={app}
                          onChange={(e) => handleArrayChange('applications', idx, e.target.value)}
                          style={{ flex: '1', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('applications', idx)}
                          style={{ border: 'none', background: '#FEE2E2', color: '#DC2626', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saveStatus !== 'idle'}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: saveStatus === 'saved' ? '#10B981' : '#17A2B8',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    border: 'none',
                    cursor: saveStatus === 'idle' ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '16px',
                    boxShadow: '0 4px 12px rgba(23, 162, 184, 0.15)',
                  }}
                  className="hover:brightness-95 active:scale-[0.98] transition-all"
                >
                  {saveStatus === 'saving' && <Loader2 size={20} className="animate-spin" />}
                  {saveStatus === 'saved' && <Check size={20} />}
                  {saveStatus === 'idle' && <Save size={20} />}
                  {saveStatus === 'idle' && (isCreatingNew ? 'Create & Publish' : 'Publish Changes')}
                  {saveStatus === 'saving' && 'Saving...'}
                  {saveStatus === 'saved' && 'Saved Successfully'}
                </button>
              </div>
            </div>

            {/* ── RIGHT COLUMN: RESPONSIVE LIVE PREVIEW ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F8FAFB', border: '1px solid #E2E8F0', borderRadius: '18px', overflow: 'hidden', position: 'sticky', top: '20px' }}>

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
              <div style={{ padding: '20px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto', maxHeight: '620px' }}>

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
                    <span style={{ fontSize: '8px', color: '#94A3B8', marginLeft: 'auto' }}>Solutions</span>
                  </div>

                  {/* ── Solution Card Preview (as it appears in the sidebar) ── */}
                  <div style={{ padding: '12px', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px',
                      borderRadius: '10px', border: '1.5px solid #17A2B8', background: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(23, 162, 184, 0.08)',
                    }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, #E6F7FA 0%, #D1F2F7 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {(() => {
                          const IconComp = previewIconMap[editForm.icon || 'FlaskConical'] || FlaskConical;
                          return <IconComp size={16} style={{ color: '#17A2B8' }} />;
                        })()}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: '#2C3E50', margin: 0 }}>
                          {editForm.title || 'Solution Title'}
                        </h4>
                        <p style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {editForm.description || 'Short description of the solution will appear here.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── Solution Detail Preview ── */}
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

                    {/* Image preview */}
                    {editForm.image && (
                      <div style={{ width: '100%', height: '140px', background: '#F1F5F9', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                        <img
                          src={editForm.image}
                          alt="solution preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      </div>
                    )}

                    {/* Overview */}
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Overview</span>
                      <p style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.6' }}>
                        {editForm.details?.overview || 'Provide an overview to see it render here.'}
                      </p>
                    </div>

                    {/* Features */}
                    {(editForm.features?.filter(f => f).length || 0) > 0 && (
                      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          Key Features
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {editForm.features?.filter(f => f).map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#334155' }}>
                              <span style={{ color: '#17A2B8', fontWeight: 'bold' }}>✓</span>
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specifications Table */}
                    {(editForm.details?.specs?.filter(s => s.label || s.value).length || 0) > 0 && (
                      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          Specifications
                        </span>
                        <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                          {editForm.details?.specs?.filter(s => s.label || s.value).map((spec, i, arr) => (
                            <div key={i} style={{
                              display: 'flex', fontSize: '11px',
                              borderBottom: i === arr.length - 1 ? 'none' : '1px solid #E2E8F0',
                              padding: '6px 8px',
                              background: i % 2 === 0 ? '#FAFBFC' : '#FFFFFF',
                            }}>
                              <span style={{ flex: 1, fontWeight: 'bold', color: '#64748B' }}>{spec.label || 'Label'}</span>
                              <span style={{ flex: 1.5, color: '#334155' }}>{spec.value || 'Value'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Applications */}
                    {(editForm.details?.applications?.filter(a => a).length || 0) > 0 && (
                      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          Applications
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {editForm.details?.applications?.filter(a => a).map((app, i) => (
                            <span key={i} style={{
                              fontSize: '10px', fontWeight: '600', color: '#17A2B8',
                              background: 'rgba(23,162,184,0.08)', padding: '4px 10px',
                              borderRadius: '6px', border: '1px solid rgba(23,162,184,0.15)',
                            }}>
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Slider Gallery Preview */}
                    {(editForm.sliderImages?.filter(s => s.src).length || 0) > 0 && (
                      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          Gallery
                        </span>
                        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                          {editForm.sliderImages?.filter(s => s.src).map((slide, i) => (
                            <div key={i} style={{ width: '100px', height: '70px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: '#F1F5F9' }}>
                              <img
                                src={slide.src}
                                alt={slide.alt || 'gallery'}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
