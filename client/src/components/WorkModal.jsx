import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function WorkModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
      <div className="modal-dialog">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <img src={project.image} alt={project.title} className="modal-banner-img" />

        <div className="modal-body">
          <div className="modal-category-tag">
            {project.category?.toUpperCase()} // {project.subtitle?.split(' - ')[0]}
          </div>
          <h2 className="modal-title">{project.title}</h2>

          <div className="modal-meta-grid">
            <div className="meta-box">
              <h5>Client</h5>
              <p>{project.client}</p>
            </div>
            <div className="meta-box">
              <h5>Timeline</h5>
              <p>{project.year}</p>
            </div>
            <div className="meta-box">
              <h5>Core Role</h5>
              <p>{project.role}</p>
            </div>
          </div>

          <h4 style={{ marginBottom: 8, fontFamily: 'var(--font-heading)', fontSize: '1.15rem' }}>Project Overview</h4>
          <p className="modal-narrative">{project.overview}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: 24 }}>
            <div style={{ background: 'var(--bg-surface-2)', padding: 18, borderRadius: 'var(--radius-md)' }}>
              <h5 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: 6 }}>The Challenge</h5>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>{project.challenge}</p>
            </div>
            <div style={{ background: 'var(--bg-surface-2)', padding: 18, borderRadius: 'var(--radius-md)' }}>
              <h5 style={{ color: 'var(--brand-green)', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: 6 }}>The Strategic Solution</h5>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>{project.solution}</p>
            </div>
          </div>

          {project.metrics && (
            <div style={{ marginBottom: 24, padding: '16px 20px', background: 'rgba(198, 231, 36, 0.08)', borderLeft: '3px solid var(--brand-green)', borderRadius: 4 }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                MEASURABLE IMPACT
              </span>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
                {project.metrics}
              </p>
            </div>
          )}

          {project.deliverables && project.deliverables.length > 0 && (
            <>
              <div className="modal-deliverables-title">Key Deliverables</div>
              <div className="modal-tags" style={{ marginBottom: 20 }}>
                {project.deliverables.map((d, idx) => (
                  <span key={idx} className="tag-pill">{d}</span>
                ))}
              </div>
            </>
          )}

          {project.tools && project.tools.length > 0 && (
            <>
              <div className="modal-deliverables-title">Production & Software Tools Used</div>
              <div className="modal-tags">
                {project.tools.map((t, idx) => (
                  <span key={idx} className="tag-pill" style={{ borderColor: 'var(--brand-purple-light)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
