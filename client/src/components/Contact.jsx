import React, { useState } from 'react';
import { Mail, Phone, Instagram, Globe, Copy, Check, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [selectedServices, setSelectedServices] = useState(['Branding & Identity']);
  const [copiedKey, setCopiedKey] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const availableServices = [
    'Branding & Identity',
    'Ad Films & Video',
    'Social Media & Reels',
    'Drone Cinematography',
    'Website Design & Dev',
    'Meta & Google Ads'
  ];

  const handleServiceToggle = (srv) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const calculateScopeTag = () => {
    const len = selectedServices.length;
    if (len === 0) return 'Custom Scope';
    if (len === 1) return 'Focused Solution';
    if (len <= 3) return 'Integrated Campaign Scope';
    return 'Full 360° Brand Transformation';
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    const payload = {
      ...formData,
      services: selectedServices,
      scopeTag: calculateScopeTag()
    };

    try {
      // Send to MERN API
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({
          type: 'success',
          text: `Inquiry saved! Opening your direct WhatsApp connection to Kodbrand...`
        });

        // Open WhatsApp with prefilled message
        setTimeout(() => {
          const text = `Hello Kodbrand Team,\n\nI am ${formData.name}.\nInterested Services: ${selectedServices.join(', ')}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nProject Brief:\n${formData.message}`;
          const waUrl = `https://wa.me/919678007291?text=${encodeURIComponent(text)}`;
          window.open(waUrl, '_blank');
          setFormData({ name: '', email: '', phone: '', message: '' });
          setSubmitting(false);
        }, 1200);
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to submit' });
        setSubmitting(false);
      }
    } catch (err) {
      console.warn('Backend submission error, opening direct WhatsApp:', err);
      const text = `Hello Kodbrand Team,\n\nI am ${formData.name}.\nInterested Services: ${selectedServices.join(', ')}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nProject Brief:\n${formData.message}`;
      const waUrl = `https://wa.me/919678007291?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
      setSubmitting(false);
    }
  };

  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-surface-2)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">06 // LET’S WORK TOGETHER</span>
          <h2 className="section-title">Every Idea Deserves the Right Execution.</h2>
          <p className="section-desc">
            Whether you’re building a new brand, developing a digital presence, or looking for a fresh creative direction, Kodbrand brings the perspective, creativity, and capabilities to help move your vision forward.
          </p>
        </div>

        <div className="contact-hub-grid">
          {/* Direct Channels */}
          <div className="contact-info-col">
            <div className="contact-direct-card">
              <h3>Let’s Start a Conversation.</h3>
              <p>Reach out directly to discuss your brand’s next evolution, schedule a consultation, or request a custom proposal.</p>

              <div className="contact-channels-list">
                {/* Email */}
                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <Mail size={22} />
                  </div>
                  <div className="channel-texts">
                    <span className="channel-type">Official Email</span>
                    <a href="mailto:kod.brand@gmail.com" className="channel-val">kod.brand@gmail.com</a>
                  </div>
                  <button 
                    className="btn-copy-action"
                    onClick={() => handleCopy('kod.brand@gmail.com', 'email')}
                    title="Copy Email"
                  >
                    {copiedKey === 'email' ? <Check size={18} color="var(--brand-green)" /> : <Copy size={18} />}
                  </button>
                </div>

                {/* Phone */}
                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <Phone size={22} />
                  </div>
                  <div className="channel-texts">
                    <span className="channel-type">Call & WhatsApp</span>
                    <a href="tel:+919678007291" className="channel-val">+91 9678007291</a>
                  </div>
                  <button 
                    className="btn-copy-action"
                    onClick={() => handleCopy('+919678007291', 'phone')}
                    title="Copy Phone"
                  >
                    {copiedKey === 'phone' ? <Check size={18} color="var(--brand-green)" /> : <Copy size={18} />}
                  </button>
                </div>

                {/* Instagram */}
                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <Instagram size={22} />
                  </div>
                  <div className="channel-texts">
                    <span className="channel-type">Instagram Direct</span>
                    <a 
                      href="https://www.instagram.com/kodbrand.solutions?obrf=MXkxeGkwaG5vcjQ1aw==" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="channel-val"
                    >
                      @kodbrand.solutions
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <Globe size={22} />
                  </div>
                  <div className="channel-texts">
                    <span className="channel-type">Official Website</span>
                    <a href="https://kodbrand.com/" target="_blank" rel="noopener noreferrer" className="channel-val">
                      kodbrand.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Project Inquiry Form */}
          <div className="inquiry-form-card">
            <div className="inquiry-card-header">
              <span className="section-tag" style={{ marginBottom: 8 }}>PROJECT SCOPE PLANNER</span>
              <h3>Tell Us About Your Vision</h3>
              <p>Select your requirements to quickly outline your project scope.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group-block">
                <label className="form-group-label">Services of Interest:</label>
                <div className="services-select-tags">
                  {availableServices.map((srv) => (
                    <label key={srv} className="checkbox-pill-label">
                      <input 
                        type="checkbox"
                        checked={selectedServices.includes(srv)}
                        onChange={() => handleServiceToggle(srv)}
                      />
                      <span className="checkbox-pill-text">{srv}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row-2col">
                <div className="input-field-wrap">
                  <label>Your Name *</label>
                  <input 
                    type="text" 
                    className="text-input" 
                    placeholder="e.g. Rahul Menon" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="input-field-wrap">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    className="text-input" 
                    placeholder="you@company.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="input-field-wrap">
                  <label>Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    className="text-input" 
                    placeholder="+91 98765 43210" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="input-field-wrap">
                  <label>Scope Category</label>
                  <div className="text-input" style={{ display: 'flex', alignItems: 'center', color: 'var(--brand-green)', fontWeight: 700 }}>
                    {calculateScopeTag()}
                  </div>
                </div>
              </div>

              <div className="form-group-block">
                <label className="form-group-label">Project Brief & Goals</label>
                <textarea 
                  className="text-input" 
                  placeholder="Tell us about your brand, target audience, timeline, or key objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {statusMessage && (
                <div className={`form-status-alert ${statusMessage.type}`} style={{ display: 'block' }}>
                  {statusMessage.text}
                </div>
              )}

              <button type="submit" className="btn-submit-inquiry" disabled={submitting}>
                <span>{submitting ? 'Connecting...' : 'Send Project Inquiry'}</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
