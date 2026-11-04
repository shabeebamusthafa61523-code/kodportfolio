import React from 'react';
import { 
  Compass, Eye, MessageSquare, PenTool, Target, 
  Share2, Video, Code, Smartphone, Globe, Check 
} from 'lucide-react';

export default function Expertise() {
  const coreExpertise = [
    { name: 'Creative Direction', icon: Compass },
    { name: 'Visual Storytelling', icon: Eye },
    { name: 'Brand Communication', icon: MessageSquare },
    { name: 'Scriptwriting', icon: PenTool },
    { name: 'Campaign Strategy', icon: Target },
    { name: 'Digital Content Development', icon: Share2 },
    { name: 'Video Production', icon: Video },
    { name: 'Website Design & Development', icon: Code },
    { name: 'UI/UX Design', icon: Smartphone }
  ];

  const tools = [
    { code: 'Ps', name: 'Adobe Photoshop', cat: 'Image & Retouching', color: '#31A8FF' },
    { code: 'Ai', name: 'Adobe Illustrator', cat: 'Vector & Branding', color: '#FF9A00' },
    { code: 'Pr', name: 'Adobe Premiere Pro', cat: 'Cinema Editing', color: '#EA77FF' },
    { code: 'Ae', name: 'Adobe After Effects', cat: 'Motion Graphics & VFX', color: '#9999FF' },
    { code: 'Cv', name: 'Canva Pro', cat: 'Rapid Social Assets', color: '#00C4CC' },
    { code: 'Cc', name: 'CapCut Pro', cat: 'Kinetic Reels & Shorts', color: 'var(--brand-green)' }
  ];

  return (
    <section className="section" id="expertise" style={{ background: 'var(--bg-surface-2)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">04 // OUR EXPERTISE & TOOLS</span>
          <h2 className="section-title">Creative Thinking. Technical Precision.</h2>
          <p className="section-desc">
            We combine artistic imagination with industry-standard production and advertising technologies to deliver flawless executions.
          </p>
        </div>

        <div className="expertise-wrapper">
          {/* Core Expertise */}
          <div className="expertise-category-box">
            <h3 className="expertise-box-title">
              <span>CORE EXPERTISE</span>
              <span className="title-badge">Strategic Disciplines</span>
            </h3>
            <div className="expertise-pills-grid">
              {coreExpertise.map((exp, idx) => {
                const Icon = exp.icon;
                return (
                  <div key={idx} className="expertise-pill">
                    <Icon size={18} />
                    <span>{exp.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Creative Tools */}
          <div className="expertise-category-box">
            <h3 className="expertise-box-title">
              <span>CREATIVE & PRODUCTION TOOLS</span>
              <span className="title-badge">Industry Suite</span>
            </h3>
            <div className="tools-grid">
              {tools.map((t, idx) => (
                <div key={idx} className="tool-badge-card">
                  <div className="tool-icon-wrapper" style={{ color: t.color }}>{t.code}</div>
                  <div className="tool-name">{t.name}</div>
                  <div className="tool-category">{t.cat}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Marketing & Web Technologies */}
          <div className="expertise-category-box">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
              <div>
                <h3 className="expertise-box-title">
                  <span>MARKETING PLATFORMS</span>
                </h3>
                <div className="tools-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <div className="tool-badge-card">
                    <div className="tool-icon-wrapper" style={{ color: '#1877F2' }}>FB</div>
                    <div className="tool-name">Meta Ads</div>
                    <div className="tool-category">FB & Instagram</div>
                  </div>
                  <div className="tool-badge-card">
                    <div className="tool-icon-wrapper" style={{ color: '#4285F4' }}>GA</div>
                    <div className="tool-name">Google Ads</div>
                    <div className="tool-category">Search & Display</div>
                  </div>
                  <div className="tool-badge-card">
                    <div className="tool-icon-wrapper" style={{ color: '#F9AB00' }}>📊</div>
                    <div className="tool-name">Analytics</div>
                    <div className="tool-category">Data & Insights</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="expertise-box-title">
                  <span>WEB DEVELOPMENT</span>
                </h3>
                <div className="tools-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  <div className="tool-badge-card">
                    <div className="tool-icon-wrapper" style={{ color: '#E34F26' }}>&lt;/&gt;</div>
                    <div className="tool-name">HTML5</div>
                    <div className="tool-category">Structure</div>
                  </div>
                  <div className="tool-badge-card">
                    <div className="tool-icon-wrapper" style={{ color: '#1572B6' }}>CSS</div>
                    <div className="tool-name">CSS3</div>
                    <div className="tool-category">Styling</div>
                  </div>
                  <div className="tool-badge-card">
                    <div className="tool-icon-wrapper" style={{ color: '#F7DF1E' }}>JS</div>
                    <div className="tool-name">JavaScript</div>
                    <div className="tool-category">Logic</div>
                  </div>
                  <div className="tool-badge-card">
                    <div className="tool-icon-wrapper" style={{ color: '#21759B' }}>WP</div>
                    <div className="tool-name">WordPress</div>
                    <div className="tool-category">CMS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages Banner */}
          <div className="languages-banner">
            <div className="languages-info">
              <div className="service-icon-box" style={{ width: 48, height: 48 }}>
                <Globe size={22} />
              </div>
              <div className="languages-info-text">
                <h4>Multilingual Brand Storytelling</h4>
                <p>Crafting authentic regional nuances and global messages that resonate deeply with diverse audiences.</p>
              </div>
            </div>
            <div className="language-tags-group">
              {['English', 'Malayalam', 'Hindi'].map((lang, idx) => (
                <span key={idx} className="lang-chip">
                  <Check size={14} />
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
