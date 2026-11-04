import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight, Menu, X } from 'lucide-react';

export default function Header({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { num: '01.', label: 'About Us', href: '#about' },
    { num: '02.', label: 'Our Works', href: '#works' },
    { num: '03.', label: 'What We Do', href: '#services' },
    { num: '04.', label: 'Expertise & Tools', href: '#expertise' },
    { num: '05.', label: 'Vision & Goals', href: '#vision' },
    { num: '06.', label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" className="brand-logo-wrap" aria-label="Kodbrand Home">
          <img src="/kodbrand-logo-violet.png" alt="KOD. brand Logo" className="brand-logo-img logo-dark" />
          <img src="/kodbrand-logo-transparent.png" alt="KOD. brand Logo" className="brand-logo-img logo-light" />
        </a>

        {/* Desktop Menu */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link" onClick={handleLinkClick}>
              <span className="nav-num">{link.num}</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="#contact" className="btn-header-cta">
            <span>Let’s Talk</span>
            <ArrowRight size={16} />
          </a>

          {/* Mobile hamburger */}
          <button 
            className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
