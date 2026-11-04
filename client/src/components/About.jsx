import React from 'react';
import { Globe, PenTool, Award } from 'lucide-react';

export default function About() {
  const stats = [
    { num: '150+', label: 'Campaigns & Productions' },
    { num: '100%', label: 'Bespoke Strategic Solutions' },
    { num: '10+', label: 'Creative Disciplines' },
    { num: '3', label: 'English • Malayalam • Hindi' }
  ];

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">01 // ABOUT US</span>
          <h2 className="section-title">A Different Perspective on Brand Communication.</h2>
        </div>

        <div className="about-grid">
          <div className="about-narrative">
            <p className="about-highlight-lead">
              Kodbrand is a creative advertising and brand solutions agency focused on building <span>distinctive brand identities</span>, developing <span>compelling visual narratives</span>, and creating <span>meaningful digital experiences</span>.
            </p>
            <p className="about-body-text">
              We bring together creativity, strategic thinking, and technology to help businesses communicate with clarity and establish a strong presence across digital and visual platforms.
            </p>
            <p className="about-body-text">
              From brand development and advertising to film production and website development, we approach every project with a commitment to thoughtful creativity, purposeful execution, and lasting value.
            </p>
            <div className="about-quote-box">
              “We believe great work begins with a clear perspective and takes shape through the right combination of ideas, design, and execution.”
            </div>
          </div>

          <div className="about-visual-side">
            <div className="about-brand-card">
              <div className="about-stats-grid">
                {stats.map((s, idx) => (
                  <div key={idx} className="stat-item">
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="pillars-row">
          <div className="pillar-card">
            <div className="pillar-icon">
              <Globe size={24} />
            </div>
            <h4 className="pillar-h4">Thoughtful Creativity</h4>
            <p className="pillar-desc">
              We avoid generic templates. Every idea is grounded in a sharp perspective designed to disrupt and differentiate.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <PenTool size={24} />
            </div>
            <h4 className="pillar-h4">Purposeful Execution</h4>
            <p className="pillar-desc">
              From 4K cinema glass to responsive web code, precision craftsmanship underpins every single deliverable we build.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Award size={24} />
            </div>
            <h4 className="pillar-h4">Lasting Brand Value</h4>
            <p className="pillar-desc">
              We design campaigns and identities that stand the test of time, driving measurable impact and customer brand equity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
