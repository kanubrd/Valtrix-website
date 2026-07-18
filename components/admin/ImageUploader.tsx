'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, AlertTriangle, Image as ImageIcon, Plus } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  currentImage?: string;
  onUpload: (url: string) => void;
  minWidth?: number;
  label?: string;
}

export function ImageUploader({ currentImage, onUpload, minWidth = 1600, label = 'Image' }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setError(null);

      // Validate dimensions on client first
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        URL.revokeObjectURL(img.src);
        
        if (img.naturalWidth < minWidth) {
          setError(`Image must be at least ${minWidth}px wide (got ${img.naturalWidth}px)`);
          return;
        }

        // Proceed to upload
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('minWidth', minWidth.toString());

        try {
          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Upload failed');
          }

          const data = await res.json();
          setPreview(data.url);
          onUpload(data.url);
        } catch (err: any) {
          setError(err.message || 'Image upload failed');
        } finally {
          setUploading(false);
        }
      };
      img.onerror = () => {
        setError('Invalid image file');
      };
    },
    [minWidth, onUpload]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    disabled: uploading,
    noClick: true, // Disable automatic click behavior to allow custom triggers
  });

  const removeImage = () => {
    setPreview(null);
    onUpload('');
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Keep the dropzone input element always mounted so that open() triggers cleanly */}
      <input {...getInputProps()} />

      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
        {label} (Min Width: {minWidth}px)
      </label>

      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            color: '#B91C1C',
            fontSize: '12px',
            fontWeight: '500',
            marginBottom: '10px',
          }}
        >
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {preview ? (
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
            aspectRatio: minWidth >= 3000 ? '16/9' : '4/3',
            background: '#F8FAFB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain p-2"
          />

          {/* Plus Icon: Add/Update Image button */}
          <button
            type="button"
            onClick={open}
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: '#17A2B8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              zIndex: 10,
              transition: 'all 0.2s',
            }}
            title="Update/Replace Image"
            className="hover:scale-110 hover:bg-[#0D7A8C]"
          >
            <Plus size={16} />
          </button>

          {/* X Icon: Delete Image button */}
          <button
            type="button"
            onClick={removeImage}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(15, 23, 42, 0.65)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              zIndex: 10,
              transition: 'all 0.2s',
            }}
            title="Delete Image"
            className="hover:scale-110 hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          onClick={uploading ? undefined : open}
          style={{
            border: isDragActive ? '2px dashed #17A2B8' : '2px dashed #CBD5E1',
            background: isDragActive ? '#E6F7FA/20' : '#F8FAFB',
            borderRadius: '12px',
            padding: '32px 20px',
            textAlign: 'center',
            cursor: uploading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
          className="hover:border-[#17A2B8] hover:bg-[#E6F7FA]/10"
        >
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  border: '3px solid #E2E8F0',
                  borderTopColor: '#17A2B8',
                  borderRadius: '50%',
                }}
                className="animate-spin"
              />
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Processing image...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#17A2B8', background: '#E6F7FA', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Plus size={20} />
                <Upload size={20} />
              </span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
                {isDragActive ? 'Drop image here' : 'Add Image / Drag & drop'}
              </span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                or click this area to select a file (JPEG, PNG, WebP)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
