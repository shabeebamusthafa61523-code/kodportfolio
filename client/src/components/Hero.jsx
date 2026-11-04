import React from 'react';
import { ArrowRight, MessageSquare, Play, Sparkles } from 'lucide-react';

export default function Hero({ onOpenShowreel }) {
  const marqueeItems = [
    'BRAND IDENTITY',
    'SCRIPTED AD FILMS',
    'DRONE CINEMATOGRAPHY',
    'PERFORMANCE MARKETING',
    'WEBSITE DESIGN & DEV',
    'VIRAL REELS & SHORT FORM',
    'CREATIVE DIRECTION',
    'CORPORATE PRESENTATIONS'
  ];

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-grid-bg"></div>
        <div className="container hero-content">
          <div className="hero-badge-pill">
            <span className="pulse-dot"></span>
            <span>CREATIVE ADVERTISING & BRAND SOLUTIONS</span>
          </div>

          <h1 className="hero-title">
            A DIFFERENT <span className="text-lime">PERSPECTIVE</span> ON <span className="text-purple">BRAND</span> COMMUNICATION.
          </h1>

          <p className="hero-subtitle">
            Kodbrand brings together creativity, strategic thinking, and technology to help businesses communicate with clarity and establish a formidable presence across digital and visual platforms.
          </p>

          <div className="hero-cta-group">
            <a href="#works" className="btn-primary">
              <span>Explore Works</span>
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              <span>Start a Project</span>
              <MessageSquare size={18} />
            </a>
          </div>

          {/* Hero Interactive Featured Card */}
          <div className="hero-card-preview">
            <div className="hero-preview-inner">
              <div className="hero-preview-meta">
                <span className="hero-preview-badge">
                  <Sparkles size={14} />
                  FEATURED SHOWREEL
                </span>
                <h3 className="hero-preview-h3">Crafting Distinctive Narratives & Digital Experiences</h3>
                <p className="hero-preview-text">
                  From scripted advertising films to brand identity and web development — see how we combine creative perspective with precision execution.
                </p>
                <div className="hero-preview-tags">
                  <span className="tag-pill">Ad Films</span>
                  <span className="tag-pill">Brand Identity</span>
                  <span className="tag-pill">Drone 4K</span>
                  <span className="tag-pill">UI/UX & Web</span>
                </div>
              </div>

              <div className="hero-showcase-visual" onClick={onOpenShowreel}>
                <img src="/works/work-1-ad-film.jpg" alt="Showreel Thumbnail" />
                <div className="play-showreel-overlay">
                  <div className="play-btn-circle">
                    <Play size={22} fill="currentColor" />
                  </div>
                  <span>Watch Reel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Ticker */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="marquee-item">
              {item} <span className="marquee-star">✦</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
