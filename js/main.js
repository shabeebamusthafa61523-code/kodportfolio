/**
 * KODBRAND - Creative Advertising & Brand Solutions
 * Interactive Portfolio Logic & Case Studies Engine
 */

// Portfolio Case Studies Data
const portfolioData = [
  {
    id: 'work-1',
    category: 'video',
    filterTag: 'film',
    title: 'Scripted Advertising Films',
    subtitle: 'The Unseen Horizon - Cinematic Brand Narrative',
    client: 'Aura Luxury Group',
    year: '2026',
    role: 'Scriptwriting, Direction & Post-Production',
    image: 'assets/works/work-1-ad-film.jpg',
    overview: 'A premium cinematic advertisement filmed across dramatic landscapes, conceptualized to evoke emotional resonance and elevate the brand into an aspirational cultural symbol.',
    challenge: 'The client needed to break through standard commercial tropes and create an advertising film that felt like authentic cinema while keeping the product central to the narrative arc.',
    solution: 'Kodbrand developed a complete narrative screenplay, conducted casting and location scouting, executed 4K cinematic cinematography, and finished with orchestral audio scoring and high-end color grading.',
    deliverables: ['Original Screenplay', 'Full 90s Brand Film', '30s & 15s Commercial Cuts', 'Dolby 5.1 Sound Design', 'Theater & OTT Master'],
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Sony Cine FX'],
    metrics: '+420% Organic Watch Time • 2.4M Combined Views'
  },
  {
    id: 'work-2',
    category: 'video',
    filterTag: 'video',
    title: 'Commercial & Promotional Videos',
    subtitle: 'Volt Motion - High-Impact Electric Vehicle Launch',
    client: 'Volt Mobility',
    year: '2026',
    role: 'Commercial Production & Motion FX',
    image: 'assets/works/work-2-commercial.jpg',
    overview: 'A high-energy, kinetic commercial video created for an electric mobility company’s flagship product launch, blending practical action footage with 3D motion graphics.',
    challenge: 'Demonstrate cutting-edge technological speed and eco-friendly performance in an engaging 45-second commercial for digital and broadcast channels.',
    solution: 'Engineered a rhythmic visual edit synchronized to a customized electronic score, integrating dynamic motion graphics and punchy visual typography.',
    deliverables: ['45s Commercial Spot', 'Product Feature Highlights', 'Social Cutdowns (9:16 & 1:1)', 'Trade Show Loop Edit'],
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'Blender', 'Canva Pro'],
    metrics: '35% Higher Engagement vs Industry Benchmark'
  },
  {
    id: 'work-3',
    category: 'brand',
    filterTag: 'brand',
    title: 'Brand Campaigns',
    subtitle: 'Nordic Roasters - 360° Identity & Market Rollout',
    client: 'Nordic Coffee Co.',
    year: '2025 - 2026',
    role: 'Brand Strategy, Identity & Campaign Execution',
    image: 'assets/works/work-3-branding.jpg',
    overview: 'Comprehensive brand creation from naming audit and visual identity system to brand guidelines, retail packaging, and omni-channel launch campaign.',
    challenge: 'Enter a saturated artisanal coffee market and differentiate through distinctive visual branding that communicates Nordic minimalism and sustainability.',
    solution: 'Formulated a distinctive brand positioning strategy, designed a timeless geometric logo mark, eco-friendly packaging, and a compelling digital launch story.',
    deliverables: ['Brand Strategy Deck', 'Logo & Visual Identity System', 'Packaging Design System', 'Brand Guidelines Book', 'Omnichannel Launch Campaign'],
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
    metrics: 'Featured in Global Packaging Awards • 100% Sold Out First Batch'
  },
  {
    id: 'work-4',
    category: 'social',
    filterTag: 'social',
    title: 'Social Media Creatives',
    subtitle: 'Urban Vibe - Kinetic Social Grid & Daily Aesthetics',
    client: 'Urban Apparel',
    year: '2026',
    role: 'Social Media Strategy & Creative Design',
    image: 'assets/works/work-4-social-media.jpg',
    overview: 'A cohesive visual feed transformation designed to turn followers into loyal brand advocates through thumb-stopping carousels, aesthetic typography, and bold creative direction.',
    challenge: 'Overcome declining organic reach and disjointed social visuals by building a unified creative system that performs organically and on paid Meta channels.',
    solution: 'Designed monthly theme grids, multi-slide educational carousels, interactive story sets, and viral meme-marketing graphics tailored to Gen-Z and Millennial consumers.',
    deliverables: ['Monthly Social Calendar', '60+ Feed Creatives', '120+ Story Assets', 'Instagram Grid Redesign', 'Engagement Playbook'],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'CapCut'],
    metrics: '+310% Follower Growth in 90 Days • 4.8x Saves Rate'
  },
  {
    id: 'work-5',
    category: 'video',
    filterTag: 'social',
    title: 'Reels & Short-form Content',
    subtitle: 'Pulse Beats - 9:16 Viral Kinetic Storytelling',
    client: 'Pulse Fitness & Lifestyle',
    year: '2026',
    role: 'Short-Form Production, Fast Editing & Sound Sync',
    image: 'assets/works/work-5-reels.jpg',
    overview: 'Engineered a viral short-form content pipeline producing high-retention vertical videos optimized for Instagram Reels and YouTube Shorts algorithms.',
    challenge: 'Average user attention spans on short-form platforms drop after 3 seconds; needed high-hook retention formats without looking overly staged.',
    solution: 'Utilized pattern interrupts, dynamic text hooks, sound design accents, and kinetic jump-cuts that held viewers through the entire video loop.',
    deliverables: ['30 Vertical Reels/Shorts', 'Custom Motion Subtitles', 'Sound Effects Library', 'Hook & Script Templates'],
    tools: ['CapCut', 'Adobe Premiere Pro', 'Adobe After Effects'],
    metrics: '5.8 Million Total Views • Over 85K Shares'
  },
  {
    id: 'work-6',
    category: 'video',
    filterTag: 'video',
    title: 'Photography & Videography',
    subtitle: 'Lumina Jewels - High-Fashion Editorial & Studio Lighting',
    client: 'Lumina Fine Jewelry',
    year: '2025',
    role: 'Creative Direction, Studio Photography & Macro Cinematography',
    image: 'assets/works/work-6-photo-video.jpg',
    overview: 'Sensory macro photography and atmospheric studio videography showcasing intricate craftsmanship, reflective metals, and faceted gemstone brilliance.',
    challenge: 'Capturing microscopic jewelry facets and true-to-life luster without harsh reflections or dull textures.',
    solution: 'Deployed custom diffuse lighting rigs, specialized macro cinema glass, and delicate turntable movement combined with high-precision color grading.',
    deliverables: ['120 High-Res Editorial Photos', '24 Macro Product Video Clips', 'Website Hero Video Loops', 'Print-Ready Catalog Assets'],
    tools: ['Adobe Photoshop', 'Adobe Lightroom', 'Adobe Premiere Pro'],
    metrics: 'Used across 45 Global Retail Stores and Digital Flagship'
  },
  {
    id: 'work-7',
    category: 'video',
    filterTag: 'video',
    title: 'Drone Cinematography',
    subtitle: 'Skyline Horizon - 4K Aerial Landscape & Architecture',
    client: 'Horizon Luxury Living',
    year: '2026',
    role: 'Licensed Drone Pilot, Aerial Cinematography & Color Grading',
    image: 'assets/works/work-7-drone.jpg',
    overview: 'Spectacular cinematic aerial perspectives capturing luxury architectural estates, sweeping coastal landscapes, and modern urban infrastructure in crystal-clear 4K HDR.',
    challenge: 'Capturing dynamic low-altitude fly-throughs and panoramic vistas in challenging coastal wind conditions with precise framing.',
    solution: 'Executed synchronized FPV and multi-rotor flight patterns during golden hour, delivering fluid cinematic movements and cinematic color tone.',
    deliverables: ['4K ProRes Drone Footage', 'Architectural Showcase Video', 'Social Media Aerial Teasers', 'High-Res Aerial Stills'],
    tools: ['DJI Cinema Drone', 'Adobe Premiere Pro', 'Adobe After Effects'],
    metrics: '98% Client Satisfaction • Accelerated Property Inquiries by 65%'
  },
  {
    id: 'work-8',
    category: 'web',
    filterTag: 'web',
    title: 'Website Design & Development',
    subtitle: 'Nexus Digital - Bespoke Corporate Web Experience',
    client: 'Nexus Global Solutions',
    year: '2026',
    role: 'UI/UX Design, Front-End Engineering & Performance Optimization',
    image: 'assets/works/work-8-web-dev.jpg',
    overview: 'A hyper-responsive, interactive corporate website with silky-smooth micro-animations, fast load times, and an intuitive user conversion pathway.',
    challenge: 'The existing legacy website was clunky, non-responsive on mobile, and failed to communicate the company’s enterprise authority.',
    solution: 'Re-architected user journeys, built a bespoke responsive layout with modern typography, smooth interactive components, and blazing 99/100 Lighthouse performance.',
    deliverables: ['Custom UI/UX Prototypes', 'Responsive Front-End Code', 'WordPress CMS Integration', 'SEO & Speed Optimisation', 'Interactive Contact Funnel'],
    tools: ['HTML5', 'CSS3', 'JavaScript ES6+', 'WordPress', 'Figma'],
    metrics: '0.8s Page Load Time • +78% Qualified Inbound Leads'
  },
  {
    id: 'work-9',
    category: 'social',
    filterTag: 'social',
    title: 'Digital Campaign Creatives',
    subtitle: 'Aura Growth - High-Conversion Meta & Google Ads',
    client: 'Aura Health & Wellness',
    year: '2026',
    role: 'Performance Ad Design, Copywriting & A/B Variations',
    image: 'assets/works/work-9-digital-ads.jpg',
    overview: 'High-converting static and animated ad creative suite tailored specifically for Meta Ads Manager and Google Display Network to drive low customer acquisition costs.',
    challenge: 'Creative fatigue had caused ad performance to plateau, raising CPA across standard social ad sets.',
    solution: 'Engineered 40+ strategic creative angles combining objection-handling hooks, product benefit breakdowns, social proof callouts, and urgency badges.',
    deliverables: ['40+ Meta Feed & Story Ads', 'Google Display Responsive Banners', 'Ad Copy Matrix', 'Performance Creative Playbook'],
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Meta Ads Manager', 'Google Ads'],
    metrics: '4.2x Blended ROAS • -38% Customer Acquisition Cost'
  },
  {
    id: 'work-10',
    category: 'brand',
    filterTag: 'brand',
    title: 'Corporate Presentations',
    subtitle: 'Apex Global - Keynote & Series Pitch Decks',
    client: 'Apex Venture Capital',
    year: '2026',
    role: 'Executive Storytelling, Data Visualization & Presentation Design',
    image: 'assets/works/work-10-corporate.jpg',
    overview: 'Investor-ready, high-stakes keynote and pitch presentation decks crafted to translate complex data and financial projections into clear, persuasive visual narratives.',
    challenge: 'Dense financial metrics and complex product architecture threatened to overwhelm venture capital investors.',
    solution: 'Structured the narrative flow around problem-solution urgency, engineered clean infographics, and designed sleek custom typography that commanded attention.',
    deliverables: ['32-Slide Pitch Deck Master', 'Executive Summary Deck', 'Interactive PDF Handout', 'Custom Chart Templates'],
    tools: ['Adobe Illustrator', 'Canva Pro', 'PowerPoint / Keynote'],
    metrics: 'Successfully Secured \$8.5M in Series-A Funding'
  }
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initMobileMenu();
  initWorksFilter();
  initWorksGrid();
  initModal();
  initEstimateCalculator();
  initContactForm();
  initClipboardButtons();
  initScrollAnimations();
});

/* ==========================================================================
   Theme Mode (Dark / Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('kodbrand-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('kodbrand-theme', next);
    });
  }
}

/* ==========================================================================
   Header Scroll & Active Link Tracking
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   Portfolio Works Rendering & Filter
   ========================================================================== */
function initWorksGrid(filter = 'all') {
  const grid = document.getElementById('worksGrid');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter || item.filterTag === filter);

  grid.innerHTML = filtered.map(item => `
    <article class="work-card" data-id="${item.id}">
      <div class="work-thumbnail-wrap">
        <span class="work-category-badge">${item.subtitle.split(' - ')[0] || 'KODBRAND'}</span>
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="work-overlay-action">
          <button class="btn-view-work" onclick="openWorkModal('${item.id}')">
            <span>Explore Case Study</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      <div class="work-card-content">
        <h3 class="work-card-title">${item.title}</h3>
        <p class="work-card-sub">${item.subtitle}</p>
        <div class="work-card-deliverables">
          ${item.deliverables.slice(0, 3).map(del => `<span class="work-deliverable-chip">${del}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

function initWorksFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';
      initWorksGrid(filter);
    });
  });
}

/* ==========================================================================
   Case Study Lightbox Modal
   ========================================================================== */
const modalOverlay = document.getElementById('workModalOverlay');

function initModal() {
  if (!modalOverlay) return;

  const closeBtn = document.getElementById('modalCloseBtn');
  closeBtn?.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

window.openWorkModal = function(id) {
  const item = portfolioData.find(w => w.id === id);
  if (!item || !modalOverlay) return;

  document.getElementById('modalBannerImg').src = item.image;
  document.getElementById('modalCategoryTag').innerText = item.category.toUpperCase() + ' // ' + item.subtitle.split(' - ')[0];
  document.getElementById('modalTitle').innerText = item.title;
  document.getElementById('modalClient').innerText = item.client;
  document.getElementById('modalYear').innerText = item.year;
  document.getElementById('modalRole').innerText = item.role;
  document.getElementById('modalOverview').innerText = item.overview;
  document.getElementById('modalChallenge').innerText = item.challenge;
  document.getElementById('modalSolution').innerText = item.solution;
  document.getElementById('modalMetrics').innerText = item.metrics;

  const deliverablesContainer = document.getElementById('modalDeliverables');
  if (deliverablesContainer) {
    deliverablesContainer.innerHTML = item.deliverables.map(d => `<span class="tag-pill">${d}</span>`).join('');
  }

  const toolsContainer = document.getElementById('modalTools');
  if (toolsContainer) {
    toolsContainer.innerHTML = item.tools.map(t => `<span class="tag-pill" style="border-color: var(--brand-purple-light);">${t}</span>`).join('');
  }

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
};

// Showreel quick modal trigger
window.openShowreelModal = function() {
  openWorkModal('work-1');
};

/* ==========================================================================
   Interactive Project Quotation / Scope Planner
   ========================================================================== */
function initEstimateCalculator() {
  const checkboxes = document.querySelectorAll('input[name="services"]');
  const estimateBadge = document.getElementById('estimateScopeTag');

  function updateEstimate() {
    const selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    if (!estimateBadge) return;

    if (selected.length === 0) {
      estimateBadge.textContent = 'Custom Scope';
    } else if (selected.length === 1) {
      estimateBadge.textContent = 'Focused Solution';
    } else if (selected.length <= 3) {
      estimateBadge.textContent = 'Integrated Campaign Scope';
    } else {
      estimateBadge.textContent = 'Full 360° Brand Transformation';
    }
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateEstimate));
  updateEstimate();
}

/* ==========================================================================
   Contact Form Submission Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('projectInquiryForm');
  const alertBox = document.getElementById('formAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName')?.value.trim();
    const email = document.getElementById('clientEmail')?.value.trim();
    const phone = document.getElementById('clientPhone')?.value.trim();
    const message = document.getElementById('clientMessage')?.value.trim();

    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked'))
      .map(cb => cb.value)
      .join(', ');

    // Construct nice WhatsApp and email body
    const formattedText = `Hello Kodbrand Team,\n\nI am ${name}.\nInterested Services: ${selectedServices || 'Comprehensive Brand Solutions'}\nEmail: ${email}\nPhone: ${phone}\n\nProject Brief:\n${message}`;

    if (alertBox) {
      alertBox.textContent = `Thank you, ${name}! Your inquiry has been prepared. Opening your direct connection to Kodbrand...`;
      alertBox.classList.add('success');
    }

    // Direct WhatsApp link trigger
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/919678007291?text=${encodeURIComponent(formattedText)}`;
      window.open(whatsappUrl, '_blank');
      form.reset();
    }, 1200);
  });
}

/* ==========================================================================
   Copy to Clipboard Functionality
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy-action');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalTitle = btn.getAttribute('title');
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
        setTimeout(() => {
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        }, 2000);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });
}

/* ==========================================================================
   Scroll Animations & Numbers Counter
   ========================================================================== */
function initScrollAnimations() {
  const statNumbers = document.querySelectorAll('.stat-num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target') || '0', 10);
          const suffix = num.getAttribute('data-suffix') || '';
          if (target > 0) {
            animateNumber(num, target, suffix, 1800);
          }
        });
      }
    });
  }, { threshold: 0.3 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
}

function animateNumber(element, target, suffix, duration) {
  let start = 0;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + suffix;
    }
  }, stepTime);
}
