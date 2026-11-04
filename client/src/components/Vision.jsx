import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Vision() {
  const goals = [
    {
      num: '01',
      title: 'Create Distinctive Brand Identities',
      desc: 'Build recognisable, iconic marks and identities that command immediate authority.'
    },
    {
      num: '02',
      title: 'Deliver Objective-Aligned Solutions',
      desc: 'Deliver creative solutions precisely synchronized with commercial business objectives.'
    },
    {
      num: '03',
      title: 'Develop Engaging Visual Stories',
      desc: 'Craft high-impact narrative advertising campaigns that capture hearts and minds.'
    },
    {
      num: '04',
      title: 'Build Functional Digital Experiences',
      desc: 'Design user-focused, frictionless, and high-performance websites and interfaces.'
    },
    {
      num: '05',
      title: 'Strengthen Omni-Channel Presence',
      desc: 'Reinforce and elevate brand consistency across every digital and visual platform.'
    },
    {
      num: '06',
      title: 'Establish Lasting Partnerships',
      desc: 'Cultivate enduring, trust-anchored relationships through creativity and consistent execution.'
    }
  ];

  return (
    <section className="section" id="vision">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">05 // OUR VISION & GOALS</span>
          <h2 className="section-title">Building Brands With Purpose. Creating With Perspective.</h2>
        </div>

        <div className="vision-goals-grid">
          {/* Vision Column */}
          <div className="vision-card-spotlight">
            <div>
              <span className="vision-badge">
                <Sparkles size={14} />
                OUR VISION
              </span>
              <h3 className="vision-headline">To shape a creative environment where ideas transform into enduring impact.</h3>
              <p className="vision-desc">
                To shape a creative environment where strategic thinking, compelling storytelling, and digital innovation come together to build meaningful brand experiences.
              </p>
              <p className="vision-desc" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                We aspire to help businesses evolve through distinctive communication, thoughtful design, and technology-driven solutions.
              </p>
            </div>
            <div className="vision-decor-sparkle">
              <span>✦ KODBRAND PERSPECTIVE // 2026</span>
            </div>
          </div>

          {/* Goals Column */}
          <div className="goals-column">
            {goals.map((g) => (
              <div key={g.num} className="goal-card-item">
                <div className="goal-index">{g.num}</div>
                <div className="goal-text-content">
                  <h4>{g.title}</h4>
                  <p>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
