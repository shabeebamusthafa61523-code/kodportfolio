import React from 'react';
import { Star, BarChart3, FileText, Video, Layout, Palette, Check } from 'lucide-react';

export default function Services() {
  const services = [
    {
      num: '01',
      title: 'BRANDING & IDENTITY',
      desc: 'Building memorable identities that define market leaders and build deep consumer recognition.',
      icon: Star,
      items: [
        'Brand Strategy & Positioning',
        'Logo & Visual Identity Design',
        'Brand Development',
        'Brand Communication'
      ]
    },
    {
      num: '02',
      title: 'ADVERTISING & DIGITAL MARKETING',
      desc: 'Data-backed performance advertising across Meta, Google, and digital ecosystems to accelerate growth.',
      icon: BarChart3,
      items: [
        'Advertising Strategy',
        'Social Media Marketing & Management',
        'Meta Ads & Google Ads',
        'Performance Marketing',
        'Campaign Planning & Execution'
      ]
    },
    {
      num: '03',
      title: 'CREATIVE & CONTENT',
      desc: 'Compelling storytelling and sharp copywriting that captures attention and sparks conversations.',
      icon: FileText,
      items: [
        'Creative Concept Development',
        'Scriptwriting & Copywriting',
        'Content Strategy',
        'Creative Direction',
        'Social Media Content Creation'
      ]
    },
    {
      num: '04',
      title: 'VIDEO & PRODUCTION',
      desc: 'Cinematic film production, commercial shoots, drone vision, and meticulous post-production editing.',
      icon: Video,
      items: [
        'Scripted Video Production',
        'Advertisement Films',
        'Promotional & Corporate Videos',
        'Video Editing & Post-production',
        'Photography & Videography',
        'Drone Photography & Videography'
      ]
    },
    {
      num: '05',
      title: 'WEB DESIGN & DEVELOPMENT',
      desc: 'Fast, modern, and high-converting web experiences engineered for mobile responsiveness and performance.',
      icon: Layout,
      items: [
        'Website Design',
        'Responsive Website Development',
        'Business & Corporate Websites',
        'Landing Page Development',
        'E-commerce Website Development',
        'Website Redesign & Optimisation',
        'User Interface & User Experience Design'
      ]
    },
    {
      num: '06',
      title: 'DESIGN SOLUTIONS',
      desc: 'Pixel-perfect graphics, marketing collateral, and executive presentations crafted for impact.',
      icon: Palette,
      items: [
        'Graphic Design',
        'Digital Advertising Creatives',
        'Social Media Design',
        'Presentation Design',
        'Marketing Collateral'
      ]
    }
  ];

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">03 // WHAT WE DO</span>
          <h2 className="section-title">Integrated Solutions. Thoughtful Execution.</h2>
          <p className="section-desc">
            End-to-end creative capabilities spanning strategy, visual identity, full video production, web engineering, and performance marketing.
          </p>
        </div>

        <div className="services-grid">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div key={srv.num} className="service-card">
                <div className="service-card-header">
                  <div className="service-icon-box">
                    <Icon size={26} />
                  </div>
                  <span className="service-num">{srv.num}</span>
                </div>
                <h3 className="service-card-title">{srv.title}</h3>
                <p className="service-card-desc">{srv.desc}</p>
                <ul className="service-list">
                  {srv.items.map((it, idx) => (
                    <li key={idx} className="service-list-item">
                      <Check size={16} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
