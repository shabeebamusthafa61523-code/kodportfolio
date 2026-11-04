import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { fallbackProjects } from '../data/fallbackData';
import { apiUrl } from '../utils/api';

export default function Works({ onSelectProject }) {
  const [projects, setProjects] = useState(fallbackProjects);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(apiUrl('/api/projects'));
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        console.warn('API fetch failed, utilizing client fallback data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filterTabs = [
    { key: 'all', label: 'All Works' },
    { key: 'video', label: 'Films & Video' },
    { key: 'brand', label: 'Brand & Strategy' },
    { key: 'social', label: 'Social & Marketing' },
    { key: 'web', label: 'Web & UI/UX' }
  ];

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter || p.filterTag === filter);

  return (
    <section className="section" id="works" style={{ background: 'var(--bg-surface-2)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">02 // OUR WORKS</span>
          <h2 className="section-title">A Showcase of Creative Execution.</h2>
          <p className="section-desc">
            Our work reflects a multidisciplinary approach to brand communication, combining visual aesthetics, storytelling, and digital creativity.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="works-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              className={`filter-btn ${filter === tab.key ? 'active' : ''}`}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div className="works-grid">
          {filtered.map((item) => (
            <article key={item.slug || item._id} className="work-card">
              <div className="work-thumbnail-wrap">
                <span className="work-category-badge">
                  {item.subtitle ? item.subtitle.split(' - ')[0] : 'KODBRAND'}
                </span>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="work-overlay-action">
                  <button className="btn-view-work" onClick={() => onSelectProject(item)}>
                    <span>Explore Case Study</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
              <div className="work-card-content">
                <h3 className="work-card-title">{item.title}</h3>
                <p className="work-card-sub">{item.subtitle}</p>
                <div className="work-card-deliverables">
                  {item.deliverables && item.deliverables.slice(0, 3).map((del, idx) => (
                    <span key={idx} className="work-deliverable-chip">{del}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
