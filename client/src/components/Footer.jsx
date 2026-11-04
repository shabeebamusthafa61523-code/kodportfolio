import React from 'react';
import { Instagram, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-info">
            <div className="brand-logo-wrap">
              <img src="/kodbrand-logo-violet.png" alt="KOD. brand Logo" className="brand-logo-img logo-dark" style={{ height: 48 }} />
              <img src="/kodbrand-logo-transparent.png" alt="KOD. brand Logo" className="brand-logo-img logo-light" style={{ height: 48 }} />
            </div>
            <p className="footer-brand-tagline">
              Creative Advertising | Brand Solutions | Digital Experiences
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Building distinctive brand identities, developing compelling visual narratives, and creating meaningful digital experiences.
            </p>
          </div>

          <div className="footer-nav-col">
            <h4>Navigation</h4>
            <div className="footer-nav-list">
              <a href="#about">01. About Us</a>
              <a href="#works">02. Our Works</a>
              <a href="#services">03. What We Do</a>
              <a href="#expertise">04. Expertise & Tools</a>
              <a href="#vision">05. Vision & Goals</a>
              <a href="#contact">06. Let’s Work Together</a>
            </div>
          </div>

          <div className="footer-nav-col">
            <h4>Connect Directly</h4>
            <div className="footer-nav-list">
              <a href="mailto:kod.brand@gmail.com">kod.brand@gmail.com</a>
              <a href="tel:+919678007291">+91 9678007291</a>
              <a href="https://www.instagram.com/kodbrand.solutions?obrf=MXkxeGkwaG5vcjQ1aw==" target="_blank" rel="noopener noreferrer">
                Instagram: @kodbrand.solutions
              </a>
              <a href="https://kodbrand.com/" target="_blank" rel="noopener noreferrer">
                kodbrand.com
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} KODBRAND. All rights reserved. MERN Architecture.
          </div>
          <div className="footer-socials">
            <a href="https://www.instagram.com/kodbrand.solutions?obrf=MXkxeGkwaG5vcjQ1aw==" target="_blank" rel="noopener noreferrer" className="social-circle-link">
              <Instagram size={18} />
            </a>
            <a href="https://wa.me/919678007291" target="_blank" rel="noopener noreferrer" className="social-circle-link">
              <MessageCircle size={18} />
            </a>
            <a href="mailto:kod.brand@gmail.com" className="social-circle-link">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
