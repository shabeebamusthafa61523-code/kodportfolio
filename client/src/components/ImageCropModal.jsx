import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { motion, AnimatePresence } from 'framer-motion';
import { Crop, RotateCw, ZoomIn, ZoomOut, Check, X, ArrowRight, ShieldCheck } from 'lucide-react';

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

function rotateSize(width, height, rotation) {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
  };
}

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) return null;

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas export failed'));
      }
    }, 'image/png');
  });
}

export default function ImageCropModal({
  isOpen,
  imageSrc,
  originalFileName = 'upload.png',
  type = 'general', // 'poster' | 'logo' | 'reel' | 'general'
  isLight = false,
  onClose,
  onConfirmCrop,
  onSkipCrop
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Aspect ratio presets tailored to each upload type
  const aspectPresets =
    type === 'poster'
      ? [
          { label: '4:5 (Tablet/Mockup)', value: 4 / 5 },
          { label: '3:4 (Poster)', value: 3 / 4 },
          { label: '9:16 (Story/Reel)', value: 9 / 16 },
          { label: '1:1 (Square)', value: 1 },
          { label: 'Free Form', value: undefined }
        ]
      : type === 'reel'
      ? [
          { label: '9:16 Story/Reel', value: 9 / 16 },
          { label: '3:4 Portrait', value: 3 / 4 },
          { label: 'Free Form', value: undefined }
        ]
      : type === 'logo'
      ? [
          { label: 'Free Form', value: undefined },
          { label: '1:1 Square', value: 1 },
          { label: '16:9 Wide', value: 16 / 9 },
          { label: '3:1 Banner', value: 3 / 1 }
        ]
      : [
          { label: 'Free Form', value: undefined },
          { label: '1:1 Square', value: 1 },
          { label: '4:5 Portrait', value: 4 / 5 },
          { label: '3:4 Portrait', value: 3 / 4 },
          { label: '16:9 Landscape', value: 16 / 9 }
        ];

  const defaultRatio =
    type === 'poster' ? 4 / 5 : type === 'reel' ? 9 / 16 : undefined;
  const [aspect, setAspect] = useState(defaultRatio);

  const onCropComplete = useCallback((croppedArea, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    setProcessing(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      const croppedFile = new File(
        [croppedBlob],
        originalFileName.replace(/\.[^/.]+$/, '') + '-cropped.png',
        { type: 'image/png' }
      );
      onConfirmCrop(croppedFile);
    } catch (err) {
      console.error('Cropping error:', err);
      alert('Could not crop image. Uploading original.');
      onSkipCrop();
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen || !imageSrc) return null;

  const bg = isLight ? '#ffffff' : '#10121a';
  const text = isLight ? '#111216' : '#f5f5f0';
  const border = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
  const acid = '#c4ec0d';

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(8px)',
          padding: 'clamp(0.5rem, 2vw, 1rem)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          style={{
            background: bg,
            color: text,
            borderRadius: '20px',
            border: `1px solid ${border}`,
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '94vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(1rem, 2.5vw, 1.5rem)',
              borderBottom: `1px solid ${border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'rgba(196,236,13,0.15)',
                  color: acid,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Crop size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 'clamp(0.92rem, 2vw, 1.05rem)', fontWeight: 600 }}>
                  Crop & Frame {type === 'poster' ? 'Poster' : type === 'logo' ? 'Brand Logo' : type === 'reel' ? 'Video Thumbnail' : 'Image'}
                </h3>
                <span style={{ fontSize: '0.72rem', color: isLight ? '#666' : 'rgba(245,245,240,0.5)' }}>
                  Drag to reposition • Scroll or use slider to zoom • Select aspect ratio
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: text,
                cursor: 'pointer',
                opacity: 0.6,
                padding: 4
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Cropper Viewport Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(220px, 38vh, 380px)',
              background: '#050608',
              overflow: 'hidden'
            }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: { background: '#050608' },
                cropAreaStyle: {
                  border: `2px solid ${acid}`,
                  boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.72)'
                }
              }}
            />
          </div>

          {/* Controls Bar */}
          <div
            style={{
              padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(1rem, 2.5vw, 1.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              borderTop: `1px solid ${border}`,
              overflowY: 'auto',
              maxHeight: '35vh'
            }}
          >
            {/* Aspect Ratio Preset Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: isLight ? '#777' : 'rgba(245,245,240,0.5)', marginRight: 4 }}>
                Ratio:
              </span>
              {aspectPresets.map((preset, idx) => {
                const isActive = aspect === preset.value;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAspect(preset.value)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      background: isActive ? acid : isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)',
                      color: isActive ? '#000' : text,
                      border: `1px solid ${isActive ? acid : border}`,
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {preset.label}
                  </button>
                );
              })}

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  type="button"
                  title="Rotate 90 degrees clockwise"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '0.35rem 0.65rem',
                    borderRadius: '8px',
                    background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)',
                    color: text,
                    border: `1px solid ${border}`,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCw size={13} />
                  <span>{rotation}°</span>
                </button>
              </div>
            </div>

            {/* Zoom Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ZoomOut size={16} style={{ opacity: 0.6 }} />
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: acid,
                  cursor: 'pointer'
                }}
              />
              <ZoomIn size={16} style={{ opacity: 0.6 }} />
              <span style={{ fontSize: '0.72rem', minWidth: '40px', textAlign: 'right', opacity: 0.7 }}>
                {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* Pixel Dimension Info */}
            {croppedAreaPixels && (
              <div style={{ fontSize: '0.7rem', color: isLight ? '#888' : 'rgba(245,245,240,0.45)', textAlign: 'right' }}>
                Output Resolution: <strong>{Math.round(croppedAreaPixels.width)} × {Math.round(croppedAreaPixels.height)} px</strong>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div
            style={{
              padding: '0.85rem clamp(1rem, 2.5vw, 1.5rem)',
              background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.3)',
              borderTop: `1px solid ${border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10
            }}
          >
            <button
              type="button"
              onClick={onSkipCrop}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                background: 'transparent',
                border: `1px solid ${border}`,
                color: isLight ? '#555' : 'rgba(245,245,240,0.6)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Skip Crop & Use Original
            </button>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  color: isLight ? '#666' : 'rgba(245,245,240,0.6)',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApplyCrop}
                disabled={processing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '0.55rem 1.4rem',
                  borderRadius: '8px',
                  background: acid,
                  color: '#000',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: processing ? 'wait' : 'pointer',
                  boxShadow: '0 0 14px rgba(196, 236, 13, 0.3)'
                }}
              >
                <Check size={16} />
                <span>{processing ? 'Processing...' : 'Apply Crop & Upload'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
