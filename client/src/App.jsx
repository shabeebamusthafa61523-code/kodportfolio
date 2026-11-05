import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValueEvent, 
  AnimatePresence,
  useMotionValue,
  useSpring
} from "framer-motion";
import { 
  Mail, Phone, Instagram, Globe, Check, Copy, ArrowUp, Send, 
  Sun, Moon, Heart, MessageCircle, Bookmark, Play, X, ChevronLeft, ChevronRight, Shield, Menu 
} from "lucide-react";
import AdminPinModal from "./components/AdminPinModal";
import AdminPanel from "./components/AdminPanel";
import FaviconRain from "./components/FaviconRain";
import { apiUrl } from "./utils/api";

// ── Reusable Reveal Animation ────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 48, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ── Single-Line Seamless Responsive Ticker Component ─────────────────────────
const Ticker = ({ items, C }) => (
  <div
    className="overflow-hidden whitespace-nowrap border-y py-3 select-none"
    style={{
      borderColor: C.border,
      background: "transparent",
      width: "100%",
      maxWidth: "100vw",
      overflow: "hidden"
    }}
  >
    <motion.div
      style={{
        display: "inline-flex",
        gap: "clamp(1.5rem, 3.5vw, 3.5rem)",
        width: "max-content",
        willChange: "transform"
      }}
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          style={{
            fontSize: "clamp(0.72rem, 1.6vw, 0.85rem)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: C.dim,
            display: "inline-flex",
            alignItems: "center"
          }}
        >
          {item}
          <span style={{ margin: "0 clamp(0.75rem, 1.8vw, 1.5rem)", color: i % 2 === 0 ? C.acid : C.blue }}>
            ✦
          </span>
        </span>
      ))}
    </motion.div>
  </div>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const tickerItems = [
  "Brand Strategy",
  "Scripted Ad Films",
  "Visual Identity",
  "Motion Design",
  "Performance Marketing",
  "Web Development",
  "Drone Cinematography",
  "Campaign Direction"
];

const services = [
  {
    title: "Branding & Identity",
    desc: "Brand strategy, positioning, logo & visual identity design, comprehensive guidelines, and lasting brand communication systems."
  },
  {
    title: "Advertising & Digital Marketing",
    desc: "Advertising strategy, social media management, high-ROAS Meta Ads & Google Ads, performance marketing, and integrated campaign execution."
  },
  {
    title: "Creative & Content",
    desc: "Creative concept development, scriptwriting, copywriting, content strategy, creative direction, and viral social media content creation."
  },
  {
    title: "Video & Production",
    desc: "Scripted advertisement films, commercial & promotional videos, post-production editing, editorial photography, and 4K drone cinematography."
  },
  {
    title: "Web Design & Development",
    desc: "Responsive modern web development, corporate websites, high-converting landing pages, e-commerce, redesign, and bespoke UI/UX."
  },
  {
    title: "Design Solutions",
    desc: "Graphic design, digital advertising creatives, social media design systems, keynote presentation design, and marketing collateral."
  }
];

const logos = [
  "/razain.png",
  "/redpex.png",
  "/horizone.png",
  "/inkspire.png",
  "/paris cafe.png",
  "/ipas-logo.png",
  "/brownie-bakes.png",
  "/LOGO 1.png",
  "/LOGO 4.png",
  "/LOGO 5.png",
  "/LOGO 2.png"
];

// ── Authentic Clustered Reels Data (Matching Portfolio FSH) ─────────────────
const reelsData = [
  {
    id: 1,
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Matglober UK • With the Expert",
    thumb: "/reels/shiya-reel-1.jpg",
    url: "https://www.instagram.com/reel/DHx3H4stp47/",
    rotation: "-3.5deg",
    marginTop: "0px",
    zIndex: 2
  },
  {
    id: 2,
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "UK With The Expert • Shiya Hamsa",
    thumb: "/reels/shiya-reel-2.jpg",
    url: "https://www.instagram.com/reel/DQieVaXkuNi/",
    rotation: "2.5deg",
    marginTop: "26px",
    zIndex: 5
  },
  {
    id: 3,
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Practical Learning Series",
    thumb: "/reels/shiya-reel-3.jpg",
    url: "https://www.instagram.com/reel/DW_X_mzkjH7/",
    rotation: "-2deg",
    marginTop: "0px",
    zIndex: 3
  },
  {
    id: 4,
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Free Fly Campus Tour",
    thumb: "/reels/shiya-reel-4.jpg",
    url: "https://www.instagram.com/reel/DO-_YiGkht6/",
    rotation: "3deg",
    marginTop: "26px",
    zIndex: 6
  },
  {
    id: 5,
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Presenter & Storyteller Spotlight",
    thumb: "/reels/shiya-reel-5.jpg",
    url: "https://www.instagram.com/reel/DL4fRrzS0Ic/",
    rotation: "-3deg",
    marginTop: "0px",
    zIndex: 2
  },
  {
    id: 6,
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Academic Counselor Dialogue",
    thumb: "/reels/shiya-reel-6.jpg",
    url: "https://www.instagram.com/reel/DTIOfP-kk2A/",
    rotation: "2.5deg",
    marginTop: "26px",
    zIndex: 4
  },
  {
    id: 7,
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "On-Camera Feature Reel",
    thumb: "/reels/shiya-reel-7.jpg",
    url: "https://www.instagram.com/reel/DWdXDf6krZn/",
    rotation: "-2deg",
    marginTop: "0px",
    zIndex: 3
  },
  {
    id: 8,
    creator: "Fathima Shiya Hamza",
    avatar: "FS",
    title: "Brand Narrative Series",
    thumb: "/reels/shiya-reel-8.jpg",
    url: "https://www.instagram.com/reel/DPBYBI1EnTF/",
    rotation: "3deg",
    marginTop: "26px",
    zIndex: 5
  }
];

// ── Pure Campaign Posters (No client metadata text, logos, or descriptions) ──
const campaignPosters = [
  { id: 1, src: "/paris-2.jpeg", alt: "Paris Cafe Campaign Poster 1" },
  { id: 2, src: "/paris-3.jpeg", alt: "Paris Cafe Campaign Poster 2" },
  { id: 3, src: "/paris-4.jpeg", alt: "Paris Cafe Campaign Poster 3" },
  { id: 4, src: "/ipas-3.jpeg", alt: "IPAS Advisory Campaign Poster 1" },
  { id: 5, src: "/ipas-4.jpeg", alt: "IPAS Advisory Campaign Poster 2" },
  { id: 6, src: "/ipas-5.jpeg", alt: "IPAS Advisory Campaign Poster 3" },
  { id: 7, src: "/redpex-1.jpeg", alt: "Redpex Campaign Poster 1" },
  { id: 8, src: "/redpex-2.png", alt: "Redpex Campaign Poster 2" },
  { id: 9, src: "/redpex-3.jpeg", alt: "Redpex Campaign Poster 3" },
  { id: 10, src: "/horizone-1.jpeg", alt: "Horizone Energy Campaign Poster 1" },
  { id: 11, src: "/horizone-2.jpeg", alt: "Horizone Energy Campaign Poster 2" },
  { id: 12, src: "/horizone-3.jpeg", alt: "Horizone Energy Campaign Poster 3" },
  { id: 13, src: "/inkspire-1.jpeg", alt: "Inkspire Study Point Poster 1" },
  { id: 14, src: "/inkspire-2.jpeg", alt: "Inkspire Study Point Poster 2" },
  { id: 15, src: "/inkspire-3.jpeg", alt: "Inkspire Study Point Poster 3" },
  { id: 16, src: "/works/work-3-branding.jpg", alt: "Visual Branding Poster" },
  { id: 17, src: "/works/work-4-social-media.jpg", alt: "Social Campaign Visual" },
  { id: 18, src: "/works/work-9-digital-ads.jpg", alt: "Commercial Digital Creative" }
];

// ── Featured Showcase Data for Scroll-Driven Sliding Mockup Exhibition ──────
const featuredShowcases = [
  {
    id: "ipas",
    name: "IPAS Advisory",
    sector: "Finance & Consultancy",
    desc: "Accounting, and Business Advisory. Serving clients across India and the UAE, they help businesses stay compliant and achieve sustainable growth.",
    images: [
      { src: "/ipas-3.jpeg", alt: "8 Legal Ways to Earn Tax-Free Income in India", label: "Tax Planning" },
      { src: "/ipas-4.jpeg", alt: "Why Financial Planning Shouldn't Wait Till March", label: "Advisory Series" },
      { src: "/ipas-5.jpeg", alt: "ATTENTION - Don't Fall For Scams", label: "Fraud Alert Campaign" }
    ]
  },
  {
    id: "paris",
    name: "Paris Cafe",
    sector: "Food & Beverage",
    desc: "Paris Cafe is a cozy coffee shop in Malappuram serving delicious artisanal coffee, snacks, and refreshing beverages in a warm and relaxing atmosphere.",
    images: [
      { src: "/paris-2.jpeg", alt: "Paris Cafe Refreshing Beverages", label: "Artisan Brews" },
      { src: "/paris-3.jpeg", alt: "Paris Cafe Signature Treats", label: "Culinary Visuals" },
      { src: "/paris-4.jpeg", alt: "Paris Cafe Coffee Experience", label: "Cafe Atmosphere" }
    ]
  },
  {
    id: "redpex",
    name: "Redpex",
    sector: "E-Commerce",
    desc: "Redpex is a modern digital platform focused on delivering premium product experiences, frictionless retail pathways, and streamlined solutions.",
    images: [
      { src: "/redpex-1.jpeg", alt: "Redpex Brand Launch Visual", label: "Digital Platform" },
      { src: "/redpex-2.png", alt: "Redpex Retail Experience", label: "Store Showcase" },
      { src: "/redpex-3.jpeg", alt: "Redpex Campaign Direction", label: "Campaign Identity" }
    ]
  },
  {
    id: "horizone",
    name: "Horizone Energy",
    sector: "Clean Energy",
    desc: "Horizone Energy provides reliable solar energy solutions designed to help homes and businesses switch to clean, sustainable, and cost-effective power.",
    images: [
      { src: "/horizone-1.jpeg", alt: "Horizone Solar Power Systems", label: "Renewable Energy" },
      { src: "/horizone-2.jpeg", alt: "Horizone Installation Projects", label: "Commercial Scale" },
      { src: "/horizone-3.jpeg", alt: "Horizone Clean Power Tomorrow", label: "Eco Leadership" }
    ]
  },
  {
    id: "inkspire",
    name: "Inkspire Study Point",
    sector: "Education",
    desc: "Inkspire Study Point Tuition Centre is dedicated to helping students achieve academic excellence with experienced mentors across CBSE and State curricula.",
    images: [
      { src: "/inkspire-1.jpeg", alt: "Inkspire Excellence Program", label: "Academics" },
      { src: "/inkspire-2.jpeg", alt: "Inkspire Classroom Visual", label: "Interactive Tuition" },
      { src: "/inkspire-3.jpeg", alt: "Inkspire Student Journey", label: "Student Success" }
    ]
  }
];

// ── Unified Pinned Scroll-Driven Showcase (Merging Mockups & Complete Posters) ─────
const ScrollSlidingShowcase = ({ showcases, allPosters, C, isLight, onPosterClick }) => {
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const containerRef = useRef(null);

  // All campaign posters in the unified scroll-driven exhibition
  const items = useMemo(() => {
    if (allPosters && allPosters.length > 0) {
      return allPosters.map((p, i) => ({
        src: p.src,
        alt: p.alt || p.title || `Campaign Poster ${i + 1}`,
        label: p.campaignTag || p.title || "Visual Campaign"
      }));
    }
    const fallbackImgs = [];
    (showcases || []).forEach((sc) => {
      (sc.images || []).forEach((img) => fallbackImgs.push(img));
    });
    return fallbackImgs;
  }, [allPosters, showcases]);

  const itemCount = items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate dynamic horizontal slide:
  // For 3 items: smooth focal slide from 4% to -22%
  // For larger sets (e.g. All Posters): scales travel distance so every poster glides into view
  const endPercent = itemCount <= 3 ? -22 : -Math.min(84, (itemCount - 2) * 20);
  const x = useTransform(scrollYProgress, [0, 1], ["4%", `${endPercent}%`]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (itemCount > 0) {
      const targetIdx = Math.min(itemCount - 1, Math.floor(latest * itemCount));
      setActiveCardIdx(targetIdx);
    }
  });

  const effectiveActiveIdx = hoveredIdx !== null ? hoveredIdx : activeCardIdx;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: itemCount > 5 ? "320vh" : "250vh", // Dynamic pinned scroll track
        background: "transparent",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "clip"
      }}
    >
      {/* Pinned Sticky Stage */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          width: "100%",
          maxWidth: "100vw",
          padding: "2rem 0"
        }}
      >
        {/* Subtle Diagonal Neon Streak in background matching reference screenshot */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "-5%",
              width: "110%",
              height: "2px",
              background: `linear-gradient(90deg, transparent 0%, ${C.acid}33 30%, ${C.acid} 70%, transparent 100%)`,
              transform: "rotate(-6deg)",
              filter: "blur(0.8px)",
              opacity: isLight ? 0.35 : 0.7
            }}
          />
        </div>


        {/* Sliding Mockup Cards Stage */}
        <div style={{ position: "relative", width: "100%", zIndex: 10, padding: "1rem 0" }}>
          <motion.div
            style={{
              display: "flex",
              gap: "clamp(1.2rem, 3vw, 2.5rem)",
              paddingLeft: "clamp(1.5rem, 5vw, 6vw)",
              paddingRight: "clamp(1.5rem, 5vw, 6vw)",
              width: "max-content",
              x
            }}
          >
            {items.map((imgObj, idx) => {
              const isActive = effectiveActiveIdx === idx;
              // Subtle organic tilt angles for mockup tablets: inactive sit slightly angled, active straightens to 0deg
              const mockupTilts = [-2.2, 1.8, -1.5, 2.4, -1.9, 1.6];
              const idleTilt = mockupTilts[idx % mockupTilts.length];

              return (
                <div
                  key={idx}
                  onClick={() => onPosterClick(imgObj.src)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`scroll-mockup-card ${isActive ? "is-active" : ""}`}
                  style={{
                    aspectRatio: "4 / 5",
                    height: "clamp(290px, 52vh, 520px)",
                    maxWidth: "calc(100vw - 44px)",
                    width: "auto",
                    borderRadius: "18px",
                    background: "#111216",
                    border: isActive
                      ? `2px solid ${C.acid}`
                      : `1px solid ${isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.14)"}`,
                    boxShadow: isActive
                      ? `0 0 35px ${C.acidGlow}, 0 25px 60px rgba(0,0,0,0.7)`
                      : `0 20px 45px rgba(0,0,0,${isLight ? "0.15" : "0.5"})`,
                    transform: isActive
                      ? "translateY(-14px) rotate(0deg) scale(1.025)"
                      : `translateY(0px) rotate(${idleTilt}deg) scale(0.98)`,
                    transformOrigin: "center bottom",
                    zIndex: isActive ? 20 : 5,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  title="Click to view full high-resolution poster"
                >
                  {/* Tablet Mockup Header Bar with 3 Dots */}
                  <div
                    style={{
                      height: "34px",
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "16px",
                      gap: "7px",
                      flexShrink: 0
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                  </div>

                  {/* Poster Graphic Canvas */}
                  <div
                    style={{
                      flex: 1,
                      position: "relative",
                      overflow: "hidden",
                      background: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.85rem"
                    }}
                  >
                    <img
                      src={imgObj.src}
                      alt={imgObj.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Footer Interaction Bar: Dot Indicators / Counter & Scroll Cue */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 6vw",
            marginTop: "1.5rem",
            position: "relative",
            zIndex: 10
          }}
        >
          {/* Active Card Step Indicator */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {itemCount <= 6 ? (
              [...Array(itemCount)].map((_, i) => {
                const isDotActive = effectiveActiveIdx === i;
                return (
                  <div
                    key={i}
                    style={{
                      height: "4px",
                      width: isDotActive ? "28px" : "10px",
                      borderRadius: "2px",
                      background: isDotActive
                        ? C.acid
                        : (isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"),
                      transition: "all 0.3s ease"
                    }}
                  />
                );
              })
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.1rem",
                    color: C.acid
                  }}
                >
                  {(effectiveActiveIdx + 1).toString().padStart(2, "0")}
                </span>
                <span style={{ color: C.dim, fontSize: "0.85rem" }}>/ {itemCount.toString().padStart(2, "0")}</span>
                <div
                  style={{
                    height: "4px",
                    width: "80px",
                    borderRadius: "2px",
                    background: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${((effectiveActiveIdx + 1) / itemCount) * 100}%`,
                      background: C.acid,
                      transition: "width 0.25s ease"
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Scroll Cue Indicator */}
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.dim,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            Scroll to slide next <span style={{ color: C.acid }}>↓</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const goals = [
  "Create distinctive and recognisable brand identities.",
  "Deliver creative solutions aligned with business objectives.",
  "Develop engaging visual stories and advertising campaigns.",
  "Build functional, user-focused digital experiences.",
  "Strengthen brand presence across digital platforms.",
  "Establish lasting partnerships through creativity and consistency."
];

export default function Portfolio() {
  // Set LIGHT theme as default
  const [theme, setTheme] = useState(() => localStorage.getItem("kodbrand-theme") || "light");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [selectedServices, setSelectedServices] = useState(["Branding & Identity"]);
  const [copiedKey, setCopiedKey] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeReel, setActiveReel] = useState(null);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Dynamic Content State (Fetched from MongoDB API with default fallback) ──
  const [dynamicLogos, setDynamicLogos] = useState(logos);
  const [dynamicReels, setDynamicReels] = useState(reelsData);
  const [dynamicPosters, setDynamicPosters] = useState(campaignPosters);
  const [dynamicShowcases, setDynamicShowcases] = useState(featuredShowcases);

  // ── Secret 5-Click Admin Access State ──
  const [logoClickCount, setLogoClickCount] = useState(0);
  const logoClickTimer = useRef(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => Boolean(sessionStorage.getItem('kod_admin_token')));

  // Fetch dynamic content from server on mount
  useEffect(() => {
    fetch(apiUrl('/api/client-logos'))
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDynamicLogos(data);
      })
      .catch(() => {});

    fetch(apiUrl('/api/reels'))
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDynamicReels(data);
      })
      .catch(() => {});

    fetch(apiUrl('/api/posters'))
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDynamicPosters(data);
      })
      .catch(() => {});

    fetch(apiUrl('/api/showcases'))
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDynamicShowcases(data);
      })
      .catch(() => {});
  }, []);

  // Sync URL hash for full-page #admin access
  useEffect(() => {
    const handleRouteCheck = () => {
      const isRouteAdmin = window.location.hash === '#admin' || window.location.pathname === '/admin';
      if (isRouteAdmin) {
        if (sessionStorage.getItem('kod_admin_token')) {
          setShowAdminPanel(true);
        } else {
          setShowPinModal(true);
        }
      }
    };

    handleRouteCheck();
    window.addEventListener('hashchange', handleRouteCheck);
    window.addEventListener('popstate', handleRouteCheck);
    return () => {
      window.removeEventListener('hashchange', handleRouteCheck);
      window.removeEventListener('popstate', handleRouteCheck);
    };
  }, []);

  // Update URL hash and lock body scroll when full-page Admin is toggled
  useEffect(() => {
    if (showAdminPanel) {
      if (window.location.hash !== '#admin') {
        window.history.pushState({ admin: true }, '', '#admin');
      }
      document.body.style.overflow = 'hidden';
    } else {
      if (window.location.hash === '#admin') {
        window.history.pushState(null, '', window.location.pathname);
      }
      document.body.style.overflow = '';
    }
  }, [showAdminPanel]);

  // 5-Click Secret Trigger on the KODBRAND logo
  const handleLogoClick = (e) => {
    const nextCount = logoClickCount + 1;
    setLogoClickCount(nextCount);

    if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
    logoClickTimer.current = setTimeout(() => {
      setLogoClickCount(0);
    }, 2500);

    if (nextCount >= 5) {
      if (e) e.preventDefault();
      setLogoClickCount(0);
      if (isAdminLoggedIn) {
        setShowAdminPanel(true);
      } else {
        setShowPinModal(true);
      }
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminPanel(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('kod_admin_token');
    setIsAdminLoggedIn(false);
    setShowAdminPanel(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const isLight = theme === "light";

  // Mobile viewport detection to prevent horizontal translations on small screens
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll animations for logo transition from Hero into fixed Navbar
  const { scrollY } = useScroll();

  // Hero Logo interpolations (scales down and lifts towards top-left, floating OVER navbar)
  const heroLogoScale = useTransform(scrollY, [0, 220], [1, 0.22]);
  const heroLogoY = useTransform(scrollY, [0, 220], [0, -200]);
  const heroLogoX = useTransform(scrollY, [0, 220], [0, isMobile ? 0 : -35]);
  const heroLogoOpacity = useTransform(scrollY, [160, 230], [1, 0]);

  // Navbar Logo interpolations (fades in and scales into view as hero logo docks)
  const navLogoOpacity = useTransform(scrollY, [180, 230], [0, 1]);
  const navLogoScale = useTransform(scrollY, [180, 230], [0.85, 1]);
  const navLogoY = useTransform(scrollY, [180, 230], [8, 0]);

  // Cursor-following lighting for Hero
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth * 0.65 : 600
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight * 0.35 : 280
  );

  // Smooth luxury spring physics
  const springConfig = { damping: 28, stiffness: 140, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const heroGlowOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (window.scrollY > (window.innerHeight || 800)) return;
      const heroEl = document.getElementById("hero");
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  useEffect(() => {
    localStorage.setItem("kodbrand-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ── Adaptive Color Tokens ────────────────────────────────────────────────
  const C = isLight
    ? {
        bg: "#f8f8f5",
        surface: "#ffffff",
        cardBg: "rgba(18, 19, 24, 0.03)",
        slotBg: "rgba(18, 19, 24, 0.04)",
        phoneBg: "#ffffff",
        text: "#121318",
        dim: "rgba(18, 19, 24, 0.62)",
        dimmer: "rgba(18, 19, 24, 0.35)",
        border: "rgba(18, 19, 24, 0.08)",
        rule: "rgba(18, 19, 24, 0.09)",
        acid: "#8aa800",
        acidBadge: "#c4ec0d",
        acidGlow: "rgba(196, 236, 13, 0.4)",
        blue: "#2446a6",
        ambientGlow: "rgba(36, 70, 166, 0.12)",
        logoSrc: "/kodbrand-logo-transparent.png",
        logoFilter: "brightness(0)",
        headerBg: "rgba(248, 248, 245, 0.88)"
      }
    : {
        bg: "#08090d",
        surface: "rgba(245, 245, 240, 0.025)",
        cardBg: "rgba(245, 245, 240, 0.025)",
        slotBg: "rgba(255, 255, 255, 0.03)",
        phoneBg: "#141622",
        text: "#f5f5f0",
        dim: "rgba(245, 245, 240, 0.38)",
        dimmer: "rgba(245, 245, 240, 0.18)",
        border: "rgba(245, 245, 240, 0.08)",
        rule: "rgba(245, 245, 240, 0.10)",
        acid: "#c4ec0d",
        acidBadge: "#c4ec0d",
        acidGlow: "rgba(196, 236, 13, 0.25)",
        blue: "#2b51b6",
        ambientGlow: "rgba(43, 81, 182, 0.28)",
        logoSrc: "/kodbrand-logo-violet.png",
        logoFilter: "brightness(0) invert(1)",
        headerBg: "rgba(8, 9, 13, 0.85)"
      };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleServiceToggle = (srv) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);

    const payload = {
      ...formData,
      services: selectedServices,
      scopeTag: selectedServices.length > 2 ? "Integrated Scope" : "Focused Scope"
    };

    try {
      await fetch(apiUrl("/api/leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setStatusMsg("Inquiry received! Opening direct WhatsApp connection...");
      setTimeout(() => {
        const text = `Hello Kodbrand Team,\n\nI am ${formData.name}.\nInterested Services: ${selectedServices.join(", ")}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nProject Brief:\n${formData.message}`;
        window.open(`https://wa.me/919678007291?text=${encodeURIComponent(text)}`, "_blank");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSubmitting(false);
      }, 1000);
    } catch {
      const text = `Hello Kodbrand Team,\n\nI am ${formData.name}.\nInterested Services: ${selectedServices.join(", ")}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nProject Brief:\n${formData.message}`;
      window.open(`https://wa.me/919678007291?text=${encodeURIComponent(text)}`, "_blank");
      setSubmitting(false);
    }
  };

  return (
    <div
      className="relative z-10 min-h-screen"
      style={{
        backgroundColor: C.bg,
        color: C.text,
        transition: "background-color 0.4s ease, color 0.4s ease",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "clip",
        position: "relative"
      }}
    >
      <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
        
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,500;0,900;1,300&family=DM+Serif+Display:ital@0;1&display=swap');
          *, *::before, *::after { box-sizing: border-box; }
          ::selection { background: ${C.acidBadge}; color: #000; }
          .grain::after {
            content: '';
            position: fixed; inset: 0; pointer-events: none; z-index:-1;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
            opacity: ${isLight ? 0.08 : 0.15};
          }
          .rule { height: 1px; background: ${C.rule}; transition: background 0.3s; }
          .svc-row { border-bottom: 1px solid ${C.rule}; transition: all 0.3s; }
          .svc-row:hover .svc-num { color: var(--hover-color, ${C.acid}); transition: color 0.3s; }
          .svc-row:hover .svc-arrow { transform: translateX(8px); color: var(--hover-color, ${C.acid}); }

          /* Case Study Cards */
          .cs-block {
            padding: 2.5rem;
            border: 1px solid ${C.border};
            border-radius: 6px;
            background: ${C.cardBg};
            transition: background 0.3s, border-color 0.3s;
          }
          .cs-logo-area {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 130px;
            height: 130px;
            padding: 1rem;
            border: 1px solid ${C.border};
            border-radius: 50%;
            background: #FFFFFF;
            overflow: hidden;
            flex-shrink: 0;
            box-shadow: 0 10px 30px rgba(0,0,0,${isLight ? "0.08" : "0.3"});
          }
          .cs-logo-area img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transform: scale(1.05);
          }
          .cs-sector {
            font-size: 0.72rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: ${C.acid};
            margin-left: auto;
            padding: 0.35rem 0.85rem;
            border: 1px solid ${isLight ? "rgba(138,168,0,0.3)" : "rgba(196,236,13,0.25)"};
            border-radius: 20px;
            font-weight: 600;
          }
          .cs-img-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 4rem;
            padding-bottom: 2rem;
          }
          .cs-img-slot {
            flex: 1;
            min-height: 380px;
            border: 1px solid ${C.border};
            border-radius: 12px;
            overflow: hidden;
            background: ${C.slotBg};
            backdrop-filter: blur(10px);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            box-shadow: 0 20px 40px rgba(0,0,0,${isLight ? "0.06" : "0.3"});
            position: relative;
          }
          .cs-img-slot::before {
            content: '';
            display: block;
            height: 32px;
            width: 100%;
            background: ${isLight ? "rgba(18,19,24,0.04)" : "rgba(255,255,255,0.05)"};
            border-bottom: 1px solid ${C.border};
            flex-shrink: 0;
            z-index: 2;
          }
          .cs-img-slot:hover { 
            border-color: ${C.acid}; 
            transform: translateY(-15px) scale(1.02) !important;
            box-shadow: 0 30px 60px rgba(0,0,0,${isLight ? "0.12" : "0.5"}), 0 0 25px ${C.acidGlow};
          }
          .cs-img-slot img {
            width: 100%; 
            height: 100%; 
            object-fit: cover;
            display: block;
            opacity: 1;
            padding: 1rem;
            background: ${isLight ? "rgba(18,19,24,0.02)" : "rgba(0,0,0,0.2)"};
            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .cs-img-slot:hover img {
            transform: scale(1.02);
          }
          .mockup-controls {
            position: absolute;
            top: 12px;
            left: 14px;
            display: flex;
            gap: 6px;
            z-index: 3;
          }
          .mockup-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: ${isLight ? "rgba(18,19,24,0.25)" : "rgba(255,255,255,0.25)"};
          }

          /* Clustered Overlapping Reel Phone Cards */
          .reel-cluster-card {
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease, border-color 0.45s ease;
          }
          .reel-cluster-card:hover {
            transform: rotate(0deg) scale(1.1) translateY(-26px) !important;
            border-color: ${C.acid} !important;
            box-shadow: 0 35px 70px rgba(0,0,0,${isLight ? "0.22" : "0.75"}), 0 0 35px ${C.acidGlow} !important;
            z-index: 50 !important;
          }

          /* Scroll-Driven Mockup Cards (Matching Reference) */
          .scroll-mockup-card {
            transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .scroll-mockup-card:hover {
            border-color: ${C.acid} !important;
            transform: scale(1.05) translateY(-14px) rotate(0deg) !important;
            box-shadow: 0 0 35px ${C.acidGlow}, 0 35px 70px rgba(0,0,0,0.7) !important;
            z-index: 30 !important;
          }
          .scroll-mockup-card.is-active {
            border: 2px solid ${C.acid} !important;
            box-shadow: 0 0 35px ${C.acidGlow}, 0 30px 65px rgba(0,0,0,0.7) !important;
            transform: rotate(0deg) scale(1.04) translateY(-10px) !important;
            z-index: 20 !important;
          }

          /* Floating Actions */
          .fab-float {
            position: fixed;
            bottom: 24px;
            right: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 99;
          }
          .fab-btn {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${isLight ? "#ffffff" : "rgba(245,245,240,0.08)"};
            border: 1px solid ${C.border};
            color: ${C.text};
            box-shadow: 0 8px 24px rgba(0,0,0,${isLight ? "0.1" : "0.3"});
            backdrop-filter: blur(8px);
            cursor: pointer;
            transition: all 0.3s;
          }
          .fab-btn:hover {
            border-color: ${C.acid};
            background: ${C.acidBadge};
            color: #000;
          }

          html, body, #root {
            width: 100%;
            max-width: 100vw;
            overflow-x: clip;
          }

          .hero-section {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 0 6vw 8vh;
            position: relative;
            z-index: 60;
            pointer-events: none;
            background: transparent;
            overflow: hidden;
            width: 100%;
            max-width: 100vw;
            box-sizing: border-box;
          }

          @media (max-width: 1024px) {
            section { padding-left: 5vw !important; padding-right: 5vw !important; }
            .hero-section {
              min-height: auto !important;
              justify-content: flex-start !important;
              padding-top: 100px !important;
              padding-bottom: 30px !important;
            }
            .svc-row { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
            .cs-img-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
            .cs-img-slot { min-height: 320px; }
          }
          @media (max-width: 900px) {
            #about {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              padding: clamp(2.5rem, 5vh, 4rem) 5vw !important;
            }
            #vision > div {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            #vision {
              padding: clamp(2.5rem, 5vh, 4rem) 5vw !important;
            }
            #contact > div {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
            #contact {
              padding: clamp(2.5rem, 5vh, 4rem) 5vw !important;
            }
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-btn {
              display: flex !important;
            }
          }
          @media (min-width: 901px) {
            .mobile-menu-btn {
              display: none !important;
            }
            .mobile-nav-drawer {
              display: none !important;
            }
          }
          @media (max-width: 640px) {
            .hero-section {
              min-height: auto !important;
              justify-content: flex-start !important;
              padding-top: 85px !important;
              padding-bottom: 20px !important;
              padding-left: 5vw !important;
              padding-right: 5vw !important;
            }
            .hero-logo-img {
              height: clamp(75px, 16vw, 110px) !important;
              max-width: 100% !important;
            }
            .hero-text {
              margin-top: 0.85rem !important;
              font-size: 0.92rem !important;
              line-height: 1.6 !important;
              margin-bottom: 0 !important;
              max-width: 100% !important;
            }
            .hero-ambient-glow {
              width: 200px !important;
              height: 200px !important;
              top: 5% !important;
              right: 0 !important;
            }
            .cs-img-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
            .cs-img-slot { min-height: 260px !important; transform: none !important; }
            .cs-block { padding: 1.5rem !important; }
            .cs-header { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
            .cs-logo-area { width: 110px; height: 110px; }
            .cs-sector { margin-left: 0 !important; }
            .trusted-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .trusted-header { padding-right: 0 !important; border-right: none !important; border-bottom: 1px solid ${C.rule} !important; padding-bottom: 1.5rem !important; }
            .contact-form-row { grid-template-columns: 1fr !important; }
            .svc-num { font-size: 2.2rem !important; min-width: 3.2rem !important; }
            .fab-float { bottom: 16px !important; right: 16px !important; gap: 8px !important; }
            .fab-btn { width: 42px !important; height: 42px !important; }
            footer { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
          }
        `}</style>

        <div className="grain" />

        {/* ── TOP NAVIGATION WITH THEME TOGGLE ── */}
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            maxWidth: "100vw",
            boxSizing: "border-box",
            padding: "0.85rem clamp(1rem, 4vw, 6vw)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 50,
            backdropFilter: "blur(14px)",
            backgroundColor: C.headerBg,
            borderBottom: `1px solid ${C.border}`,
            transition: "background-color 0.3s, border-color 0.3s"
          }}
        >
          <motion.a
            href="#hero"
            onClick={handleLogoClick}
            title="Click 5 times for Admin access"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: navLogoOpacity,
              scale: navLogoScale,
              y: navLogoY,
              pointerEvents: "auto",
              cursor: "pointer"
            }}
          >
            <img src={C.logoSrc} alt="KOD.BRAND" style={{ height: "clamp(30px, 4vw, 40px)", width: "auto" }} />
          </motion.a>

          <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.6rem, 2vw, 2rem)" }}>
            <nav style={{ display: "flex", gap: "2.2rem", alignItems: "center" }} className="desktop-nav">
              <a href="#about" style={{ fontSize: "0.82rem", color: C.dim, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>About</a>
              <a href="#reels" style={{ fontSize: "0.82rem", color: C.dim, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>Reels</a>
              <a href="#works" style={{ fontSize: "0.82rem", color: C.dim, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>Works</a>
              <a href="#services" style={{ fontSize: "0.82rem", color: C.dim, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>Services</a>
              <a href="#contact" style={{ fontSize: "0.82rem", color: C.dim, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>Contact</a>
            </nav>

            {/* Mobile Hamburger Toggle Button (appears first on mobile) */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="mobile-menu-btn"
              aria-label="Toggle Navigation Menu"
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "10px",
                background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${C.border}`,
                color: C.text,
                cursor: "pointer",
                transition: "all 0.2s",
                flexShrink: 0
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: `1px solid ${C.border}`,
                background: isLight ? "#ffffff" : "rgba(245,245,240,0.06)",
                color: C.text,
                cursor: "pointer",
                boxShadow: `0 2px 8px rgba(0,0,0,${isLight ? "0.06" : "0.3"})`,
                transition: "all 0.3s",
                flexShrink: 0
              }}
              aria-label="Toggle Light and Dark Theme"
              title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <a
              href="#contact"
              style={{
                fontSize: "clamp(0.72rem, 1.8vw, 0.82rem)",
                color: "#000",
                background: C.acidBadge,
                padding: "0.45rem clamp(0.75rem, 2vw, 1.2rem)",
                borderRadius: "20px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                boxShadow: `0 0 15px ${C.acidGlow}`,
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              Let’s Talk
            </a>
          </div>
        </header>

        {/* ── Mobile Navigation Drawer ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-nav-drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "fixed",
                top: "62px",
                left: 0,
                width: "100%",
                background: C.headerBg,
                backdropFilter: "blur(20px)",
                borderBottom: `1px solid ${C.border}`,
                zIndex: 49,
                padding: "1.5rem 6vw",
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
                boxShadow: `0 20px 40px rgba(0,0,0,${isLight ? "0.1" : "0.5"})`
              }}
            >
              {[
                { href: "#about", label: "About Us" },
                { href: "#reels", label: "Short-Form Reels" },
                { href: "#works", label: "Visual Campaigns" },
                { href: "#services", label: "What We Do" },
                { href: "#expertise", label: "Expertise & Tools" },
                { href: "#vision", label: "Vision & Goals" },
                { href: "#contact", label: "Contact Us" }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: C.text,
                    textDecoration: "none",
                    padding: "0.4rem 0",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ color: C.acid, fontSize: "0.85rem" }}>→</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HERO ── */}
        <section
          id="hero"
          className="hero-section"
        >
          {/* Simple Cursor-Following Lighting */}
          <motion.div
            className="hero-ambient-glow"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 560,
              height: 560,
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.ambientGlow} 0%, transparent 70%)`,
              pointerEvents: "none",
              zIndex: 0,
              opacity: heroGlowOpacity,
              willChange: "transform"
            }}
          />

          {/* Falling Favicon Particle Rain */}
          <FaviconRain
            density={55}
            isLight={isLight}
            interactive={true}
            iconSrc="/favicon.ico"
          />

          {/* ── HERO LOGO (MORPHS INTO NAVBAR ON SCROLL & 5-CLICK SECRET TRIGGER) ── */}
          <motion.div
            onClick={handleLogoClick}
            title="Click 5 times for Admin access"
            className="hero-logo-box"
            style={{
              position: "relative",
              zIndex: 70,
              pointerEvents: "auto",
              scale: heroLogoScale,
              y: heroLogoY,
              x: heroLogoX,
              opacity: heroLogoOpacity,
              transformOrigin: "bottom left",
              display: "inline-block",
              marginBottom: "1.2rem",
              cursor: "pointer"
            }}
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={C.logoSrc}
              alt="KOD.BRAND Logo"
              className="hero-logo-img"
              style={{
                height: "clamp(120px, 20vw, 240px)",
                width: "auto",
                objectFit: "contain",
                filter: isLight
                  ? "drop-shadow(0 15px 35px rgba(0,0,0,0.06))"
                  : "drop-shadow(0 0 50px rgba(108, 43, 217, 0.45))",
                display: "block"
              }}
            />
          </motion.div>

          <motion.p
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              pointerEvents: "auto",
              marginTop: "2.5rem",
              maxWidth: 540,
              color: C.dim,
              fontSize: "1.08rem",
              lineHeight: 1.7
            }}
          >
            Creative Advertising & Brand Solutions. We build distinctive brand identities, develop compelling visual narratives, and create meaningful digital experiences.
          </motion.p>
        </section>

        <Ticker items={tickerItems} C={C} />

        {/* ── ABOUT ── */}
        <section
          id="about"
          style={{
            padding: "14vh 6vw",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4vw",
            alignItems: "center",
            background: "transparent"
          }}
        >
          <Reveal>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                lineHeight: 0.95,
                fontWeight: 400
              }}
            >
              About<br />
              <span style={{ fontStyle: "italic", color: C.acid }}>Us</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ color: C.dim, lineHeight: 1.85, fontSize: "1.05rem" }}>
              <p style={{ marginBottom: "1.5rem" }}>
                Kodbrand is a creative advertising and brand solutions agency focused on building distinctive brand identities, developing compelling visual narratives, and creating meaningful digital experiences.
              </p>
              <p>
                From brand development and advertising to film production and website development, we approach every project with a commitment to thoughtful creativity, purposeful execution, and lasting value.
              </p>
              <div style={{ marginTop: "2.5rem", display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                {[
                  ["150+", "Campaigns", C.acid],
                  ["10+", "Disciplines", C.blue],
                  ["03", "Languages", C.acid]
                ].map(([num, label, clr]) => (
                  <div key={label}>
                    <div style={{ fontSize: "2.5rem", color: clr, fontWeight: 900 }}>{num}</div>
                    <div style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.dim }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <div className="rule" />

        {/* ── STRATEGIC ALLIANCES / TRUSTED BY ── */}
        <section style={{ padding: "clamp(3.5rem, 8vh, 10vh) 0", background: "transparent", overflow: "hidden", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
          <div className="trusted-layout" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", alignItems: "center", width: "100%" }}>
            <div className="trusted-header" style={{ padding: "0 6vw", borderRight: `1px solid ${C.rule}`, background: "transparent" }}>
              <Reveal>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: C.acid, marginBottom: "1rem", fontWeight: 600 }}>
                  Strategic Alliances
                </p>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)", color: C.text, lineHeight: 1.05, fontWeight: 400 }}>
                  Trusted by <br />
                  <span style={{ fontStyle: "italic", color: C.acid }}>Forward Thinkers</span>
                </h2>
                <p style={{ color: C.dim, fontSize: "0.9rem", marginTop: "1.5rem", lineHeight: 1.6, maxWidth: "340px" }}>
                  Partnering with visionary brands to deliver absolute distinction across digital and visual footprints.
                </p>
              </Reveal>
            </div>

            <div style={{ position: "relative", width: "100%", overflow: "hidden", background: "transparent" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(90deg, ${C.bg} 0%, transparent 15%, transparent 85%, ${C.bg} 100%)`,
                  zIndex: 5,
                  pointerEvents: "none"
                }}
              />
              <div style={{ display: "flex", width: "100%", background: "transparent", padding: "0" }}>
                <motion.div
                  style={{ display: "flex", gap: "6rem", padding: "0 3rem", alignItems: "center" }}
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                >
                  {[...dynamicLogos, ...dynamicLogos].map((logoItem, i) => {
                    const src = typeof logoItem === "string" ? logoItem : logoItem.src;
                    const name = typeof logoItem === "string" ? logoItem : logoItem.name;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.15, opacity: 1 }}
                        initial={{ opacity: isLight ? 0.75 : 0.45 }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          height: "85px",
                          width: "160px",
                          background: "transparent",
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={src}
                          alt={name}
                          style={{
                            width: "auto",
                            maxHeight: "68px",
                            maxWidth: "140px",
                            objectFit: "contain",
                            filter: isLight ? "none" : "brightness(0) invert(1)",
                            WebkitFilter: isLight ? "none" : "brightness(0) invert(1)"
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <div className="rule" />

        {/* ── CLUSTERED AUTOSCROLLING REELS & SHORT-FORM VIDEO SHOWCASE ── */}
        <section id="reels" style={{ padding: "clamp(3.5rem, 8vh, 10vh) 0 clamp(2.5rem, 6vh, 8vh)", background: "transparent", overflow: "hidden", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
          <div style={{ padding: "0 6vw" }}>
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: C.acid, marginBottom: "0.75rem", fontWeight: 600 }}>
                    Short-Form & Commercial Reels
                  </p>
                  <h2
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                      lineHeight: 0.95,
                      fontWeight: 400
                    }}
                  >
                    Dynamic <span style={{ fontStyle: "italic", color: C.acid }}>Video Production</span>
                  </h2>
                </div>
                <p style={{ color: C.dim, maxWidth: 420, fontSize: "0.95rem", lineHeight: 1.6 }}>
                  High-engagement 9:16 vertical storytelling, social video series, and commercials engineered for algorithm momentum and viral watch-time.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Clustered Overlapping Carousel Container with Autoscroll */}
          <div style={{ position: "relative", width: "100%", padding: "4rem 0 5rem", overflow: "hidden" }}>
            {/* Edge Vignette Fades */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "10%",
                background: `linear-gradient(90deg, ${C.bg} 0%, transparent 100%)`,
                zIndex: 25,
                pointerEvents: "none"
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "10%",
                background: `linear-gradient(-90deg, ${C.bg} 0%, transparent 100%)`,
                zIndex: 25,
                pointerEvents: "none"
              }}
            />

            <motion.div
              style={{
                display: "flex",
                width: "max-content",
                padding: "0 4rem",
                alignItems: "center"
              }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            >
              {[...dynamicReels, ...dynamicReels].map((reel, idx) => (
                <div
                  key={idx}
                  className="reel-cluster-card"
                  onClick={() => setActiveReel(reel)}
                  style={{
                    width: "250px",
                    flexShrink: 0,
                    marginRight: "-34px", // Organic clustered overlap matching reference
                    background: "#F6F4EA", // Authentic cream casing matching uploaded design
                    borderRadius: "16px",
                    padding: "10px 10px 12px 10px",
                    border: "1px solid rgba(0,0,0,0.12)",
                    boxShadow: `0 24px 50px rgba(0,0,0,${isLight ? "0.22" : "0.65"}), 0 8px 18px rgba(0,0,0,0.15)`,
                    transform: `rotate(${reel.rotation}) translateY(${reel.marginTop})`,
                    zIndex: reel.zIndex,
                    cursor: "pointer",
                    userSelect: "none",
                    position: "relative"
                  }}
                >
                  {/* Card Header: Circular Avatar Badge & Profile Handle */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "2px 2px" }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#111111",
                        color: "#F6F4EA",
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      {reel.avatar}
                    </div>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "#111111",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {reel.creator}
                    </span>
                  </div>

                  {/* 9:16 Video Canvas Poster */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "350px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#0a0a0a"
                    }}
                  >
                    <img
                      src={reel.thumb}
                      alt={reel.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                      }}
                    />
                    
                    {/* Centered Glassmorphic Play Button Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.14)"
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.95)",
                          color: "#111111",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                          backdropFilter: "blur(6px)"
                        }}
                      >
                        <Play size={22} fill="#111111" style={{ marginLeft: 3 }} />
                      </div>
                    </div>

                    {/* Bottom-left reel icon badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        width: 26,
                        height: 26,
                        borderRadius: "6px",
                        background: "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
                      }}
                    >
                      <Play size={12} fill="#111111" />
                    </div>
                  </div>

                  {/* Reaction Bar: Full Instagram Action Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 8,
                      padding: "4px 4px 0",
                      color: "#111111"
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <Heart size={17} strokeWidth={2} />
                      <MessageCircle size={17} strokeWidth={2} />
                      <Send size={17} strokeWidth={2} />
                    </div>
                    <Bookmark size={17} strokeWidth={2} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Subtle golden/acid accent progress line at bottom matching reference screenshot */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
            <div
              style={{
                width: "88vw",
                height: 2,
                background: `linear-gradient(90deg, transparent 0%, ${C.acid} 50%, transparent 100%)`,
                opacity: isLight ? 0.45 : 0.75
              }}
            />
          </div>
        </section>

        <div className="rule" />

        {/* ── VISUAL CAMPAIGNS HEADER ── */}
        <section id="works" style={{ padding: "clamp(3.5rem, 8vh, 10vh) 6vw 3vh", background: "transparent", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
              <div>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: C.acid, marginBottom: "0.75rem", fontWeight: 600 }}>
                  Curated Portfolio
                </p>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontWeight: 400, lineHeight: 0.95 }}>
                  Visual <span style={{ fontStyle: "italic", color: C.acid }}>Campaigns</span>
                </h2>
              </div>
              <p style={{ color: C.dim, fontSize: "1rem", lineHeight: 1.7, maxWidth: 540 }}>
                We craft distinctive visual stories, strategic brand identities, and high-impact commercial campaigns designed to captivate audiences and elevate market presence.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── UNIFIED PINNED SCROLL-DRIVEN SHOWCASE ── */}
        <ScrollSlidingShowcase
          showcases={dynamicShowcases}
          allPosters={dynamicPosters}
          C={C}
          isLight={isLight}
          onPosterClick={(src) => setSelectedPoster(src)}
        />

        <div className="rule" />

        {/* ── SERVICES (WHAT WE DO) ── */}
        <section id="services" style={{ padding: "clamp(3.5rem, 8vh, 10vh) 6vw", background: "transparent", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem" }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(2.5rem, 8vw, 6.5rem)",
                  lineHeight: 0.95,
                  fontWeight: 400
                }}
              >
                What we<br />
                <span style={{ fontStyle: "italic", color: C.acid }}>do</span>
              </h2>
              <p style={{ color: C.dim, maxWidth: 360, fontSize: "0.95rem", lineHeight: 1.6 }}>
                Integrated Solutions. Thoughtful Execution across branding, production, and digital platforms.
              </p>
            </div>
          </Reveal>

          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div
                className="svc-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                  padding: "2.2rem 0",
                  cursor: "pointer"
                }}
              >
                <span
                  className="svc-num"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "3.2rem",
                    color: isLight ? "rgba(18,19,24,0.14)" : "rgba(245,245,240,0.12)",
                    minWidth: "5rem",
                    "--hover-color": i % 2 === 0 ? C.acid : C.blue
                  }}
                >
                  0{i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 500, marginBottom: "0.5rem" }}>
                    {s.title}
                  </h3>
                  <p style={{ color: C.dim, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 640 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <div className="rule" />

        {/* ── EXPERTISE & TOOLS ── */}
        <section id="expertise" style={{ padding: "clamp(3.5rem, 8vh, 10vh) 6vw", background: "transparent", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
          <Reveal>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 0.95, marginBottom: "1rem" }}>
              Expertise & <span style={{ fontStyle: "italic", color: C.acid }}>Tools</span>
            </h2>
            <p style={{ color: C.dim, fontSize: "1rem", maxWidth: 540, marginBottom: "4rem" }}>
              Creative Thinking. Technical Precision. Industry-standard suites with multilingual capabilities across English, Malayalam, and Hindi.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            <div style={{ border: `1px solid ${C.border}`, padding: "2rem", borderRadius: "6px", background: C.cardBg }}>
              <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", color: C.acid, marginBottom: "1rem" }}>Creative Tools</h4>
              <ul style={{ color: C.dim, fontSize: "0.9rem", lineHeight: 2 }}>
                <li>Adobe Photoshop & Illustrator</li>
                <li>Adobe Premiere Pro & After Effects</li>
                <li>Canva Pro & CapCut</li>
              </ul>
            </div>
            <div style={{ border: `1px solid ${C.border}`, padding: "2rem", borderRadius: "6px", background: C.cardBg }}>
              <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", color: C.blue, marginBottom: "1rem" }}>Marketing & Platforms</h4>
              <ul style={{ color: C.dim, fontSize: "0.9rem", lineHeight: 2 }}>
                <li>Meta Ads Manager (FB & IG)</li>
                <li>Google Ads & Search Campaigns</li>
                <li>Google Analytics & Attribution</li>
              </ul>
            </div>
            <div style={{ border: `1px solid ${C.border}`, padding: "2rem", borderRadius: "6px", background: C.cardBg }}>
              <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", color: C.acid, marginBottom: "1rem" }}>Web & Engineering</h4>
              <ul style={{ color: C.dim, fontSize: "0.9rem", lineHeight: 2 }}>
                <li>HTML5 • CSS3 • JavaScript (ES6+)</li>
                <li>WordPress CMS Development</li>
                <li>Full MERN Stack Architecture</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="rule" />

        {/* ── VISION & GOALS ── */}
        <section id="vision" style={{ padding: "clamp(3.5rem, 8vh, 10vh) 6vw", background: "transparent", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4vw" }}>
            <Reveal>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95, fontWeight: 400 }}>
                Our Vision &<br />
                <span style={{ fontStyle: "italic", color: C.acid }}>Goals</span>
              </h2>
              <p style={{ marginTop: "2rem", color: C.dim, fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 480 }}>
                To shape a creative environment where strategic thinking, compelling storytelling, and digital innovation come together to build meaningful brand experiences.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {goals.map((g, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "1.2rem",
                      alignItems: "flex-start",
                      padding: "1.2rem",
                      border: `1px solid ${C.border}`,
                      borderRadius: "6px",
                      background: C.cardBg
                    }}
                  >
                    <span style={{ color: C.acid, fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem" }}>0{idx + 1}</span>
                    <p style={{ color: C.text, fontSize: "0.95rem", lineHeight: 1.5 }}>{g}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <div className="rule" />

        {/* ── CONTACT & INQUIRY ── */}
        <section id="contact" style={{ padding: "clamp(3.5rem, 8vh, 10vh) 6vw", background: "transparent", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5vw" }}>
            <Reveal>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95, fontWeight: 400 }}>
                Let’s Work<br />
                <span style={{ fontStyle: "italic", color: C.acid }}>Together</span>
              </h2>
              <p style={{ color: C.dim, fontSize: "1rem", lineHeight: 1.8, margin: "2rem 0 3rem", maxWidth: 460 }}>
                Every Idea Deserves the Right Execution. Whether you’re building a new brand, developing a digital presence, or looking for a fresh creative direction, Kodbrand brings the perspective to move your vision forward.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Mail size={20} color={C.acid} />
                  <a href="mailto:kod.brand@gmail.com" style={{ color: C.text, fontSize: "1.05rem" }}>kod.brand@gmail.com</a>
                  <button onClick={() => handleCopy("kod.brand@gmail.com", "email")} style={{ background: "none", border: "none", cursor: "pointer", color: C.dim }}>
                    {copiedKey === "email" ? <Check size={16} color={C.acid} /> : <Copy size={16} />}
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Phone size={20} color={C.acid} />
                  <a href="tel:+919678007291" style={{ color: C.text, fontSize: "1.05rem" }}>+91 9678007291</a>
                  <button onClick={() => handleCopy("+919678007291", "phone")} style={{ background: "none", border: "none", cursor: "pointer", color: C.dim }}>
                    {copiedKey === "phone" ? <Check size={16} color={C.acid} /> : <Copy size={16} />}
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Instagram size={20} color={C.acid} />
                  <a href="https://www.instagram.com/kodbrand.solutions?obrf=MXkxeGkwaG5vcjQ1aw==" target="_blank" rel="noopener noreferrer" style={{ color: C.text, fontSize: "1.05rem" }}>
                    @kodbrand.solutions
                  </a>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Globe size={20} color={C.acid} />
                  <a href="https://kodbrand.com/" target="_blank" rel="noopener noreferrer" style={{ color: C.text, fontSize: "1.05rem" }}>
                    kodbrand.com
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form
                onSubmit={handleSubmit}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  padding: "clamp(1.2rem, 4vw, 2.5rem)",
                  borderRadius: "6px",
                  boxShadow: `0 10px 30px rgba(0,0,0,${isLight ? "0.04" : "0.2"})`
                }}
              >
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                  Start a Conversation
                </h3>
                <p style={{ color: C.dim, fontSize: "0.9rem", marginBottom: "2rem" }}>
                  Select services and outline your project vision.
                </p>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.dim, marginBottom: "0.75rem", fontWeight: 600 }}>
                    Select Services
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {["Branding & Identity", "Ad Films & Video", "Social Media & Reels", "Web Design & Dev", "Meta & Google Ads"].map((srv) => {
                      const isSel = selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => handleServiceToggle(srv)}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.4rem 0.9rem",
                            borderRadius: "20px",
                            border: `1px solid ${isSel ? C.acidBadge : C.border}`,
                            background: isSel ? C.acidBadge : "transparent",
                            color: isSel ? "#000" : C.dim,
                            fontWeight: isSel ? 700 : 500,
                            cursor: "pointer",
                            transition: "0.2s"
                          }}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: C.dim, marginBottom: "0.3rem", fontWeight: 500 }}>Name *</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background: isLight ? "#fbfbfa" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${C.border}`,
                        borderRadius: "4px",
                        color: C.text,
                        outline: "none"
                      }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: C.dim, marginBottom: "0.3rem", fontWeight: 500 }}>Email *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background: isLight ? "#fbfbfa" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${C.border}`,
                        borderRadius: "4px",
                        color: C.text,
                        outline: "none"
                      }}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: C.dim, marginBottom: "0.3rem", fontWeight: 500 }}>Phone / WhatsApp *</label>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: isLight ? "#fbfbfa" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${C.border}`,
                      borderRadius: "4px",
                      color: C.text,
                      outline: "none"
                    }}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: C.dim, marginBottom: "0.3rem", fontWeight: 500 }}>Project Brief</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: isLight ? "#fbfbfa" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${C.border}`,
                      borderRadius: "4px",
                      color: C.text,
                      outline: "none",
                      resize: "vertical"
                    }}
                    placeholder="Tell us about your brand, requirements, or timeline..."
                  />
                </div>

                {statusMsg && (
                  <div style={{ color: C.acid, fontSize: "0.88rem", marginBottom: "1rem", fontWeight: 600 }}>
                    {statusMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "0.95rem",
                    background: C.acidBadge,
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: `0 0 20px ${C.acidGlow}`,
                    transition: "transform 0.2s"
                  }}
                >
                  <span>{submitting ? "Submitting..." : "Send Project Inquiry"}</span>
                  <Send size={16} />
                </button>
              </form>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            padding: "3.5rem 6vw",
            borderTop: `1px solid ${C.rule}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            width: "100%",
            maxWidth: "100vw",
            boxSizing: "border-box"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={C.logoSrc} alt="KOD.BRAND" style={{ height: 34, width: "auto" }} />
            <span style={{ color: C.dim, fontSize: "0.85rem" }}>
              &copy; {new Date().getFullYear()} KODBRAND. All rights reserved.
            </span>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="https://www.instagram.com/kodbrand.solutions?obrf=MXkxeGkwaG5vcjQ1aw==" target="_blank" rel="noopener noreferrer" style={{ color: C.dim, fontSize: "0.85rem", fontWeight: 500 }}>Instagram</a>
            <a href="https://wa.me/919678007291" target="_blank" rel="noopener noreferrer" style={{ color: C.dim, fontSize: "0.85rem", fontWeight: 500 }}>WhatsApp</a>
            <a href="mailto:kod.brand@gmail.com" style={{ color: C.dim, fontSize: "0.85rem", fontWeight: 500 }}>Email</a>
          </div>
        </footer>

        {/* ── ACTIVE REEL MODAL PREVIEW ── */}
        {activeReel && (
          <div
            onClick={() => setActiveReel(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(14px)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem"
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "320px",
                maxWidth: "92vw",
                background: "#F6F4EA",
                borderRadius: "24px",
                padding: "14px 14px 18px 14px",
                border: "1px solid rgba(0,0,0,0.15)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.7)"
              }}
            >
              <button
                onClick={() => setActiveReel(null)}
                style={{
                  position: "absolute",
                  top: "-42px",
                  right: 0,
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  color: "#fff",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(6px)"
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "2px 4px" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#111111", color: "#F6F4EA", fontWeight: 800, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {activeReel.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {activeReel.creator}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(17,17,17,0.65)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {activeReel.title}
                  </div>
                </div>
              </div>

              <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", height: "440px", background: "#0a0a0a" }}>
                <img src={activeReel.thumb} alt={activeReel.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.95)", color: "#111", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                    <Play size={24} fill="#111" style={{ marginLeft: 3 }} />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, padding: "0 6px", color: "#111111" }}>
                <div style={{ display: "flex", gap: 14 }}>
                  <Heart size={20} strokeWidth={2} />
                  <MessageCircle size={20} strokeWidth={2} />
                  <Send size={20} strokeWidth={2} />
                </div>
                <Bookmark size={20} strokeWidth={2} />
              </div>

              {/* Direct Watch Link */}
              <a
                href={activeReel.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 14,
                  padding: "0.6rem 1rem",
                  background: "#111111",
                  color: "#F6F4EA",
                  borderRadius: "20px",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  transition: "opacity 0.2s"
                }}
              >
                <Instagram size={16} /> Watch Reel on Instagram ↗
              </a>
            </div>
          </div>
        )}

        {/* ── SELECTED POSTER LIGHTBOX MODAL ── */}
        {selectedPoster && (
          <div
            onClick={() => setSelectedPoster(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(14px)",
              zIndex: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem"
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "92vw",
                maxHeight: "92vh",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 30px 80px rgba(0,0,0,0.85)",
                border: `1px solid ${C.border}`
              }}
            >
              <button
                onClick={() => setSelectedPoster(null)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  background: "rgba(0,0,0,0.65)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#fff",
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(6px)",
                  zIndex: 10
                }}
              >
                <X size={20} />
              </button>
              <img
                src={selectedPoster}
                alt="High-Res Visual Campaign Poster"
                style={{
                  maxHeight: "86vh",
                  maxWidth: "90vw",
                  objectFit: "contain",
                  display: "block"
                }}
              />
            </div>
          </div>
        )}

        {/* ── FLOATING BUTTONS ── */}
        <div className="fab-float">
          {showScrollTop && (
            <button className="fab-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to Top">
              <ArrowUp size={20} />
            </button>
          )}
        </div>

        {/* ── FLOATING DISCRETE ADMIN BADGE (WHEN AUTHENTICATED) ── */}
        {isAdminLoggedIn && (
          <button
            onClick={() => setShowAdminPanel(true)}
            style={{
              position: "fixed",
              bottom: 24,
              left: 24,
              zIndex: 99,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0.6rem 1.1rem",
              borderRadius: "24px",
              background: C.acidBadge,
              color: "#000",
              fontWeight: 800,
              fontSize: "0.78rem",
              border: "none",
              cursor: "pointer",
              boxShadow: `0 10px 25px rgba(0,0,0,0.4), 0 0 20px ${C.acidGlow}`,
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}
          >
            <Shield size={16} /> Admin Console
          </button>
        )}

        {/* ── SECRET ADMIN PIN AUTHENTICATION MODAL ── */}
        <AdminPinModal
          isOpen={showPinModal}
          onClose={() => setShowPinModal(false)}
          onSuccess={handleAdminLoginSuccess}
          C={C}
          isLight={isLight}
          toggleTheme={toggleTheme}
        />

        {/* ── FULL ADMIN MANAGEMENT DASHBOARD ── */}
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
          onLogout={handleAdminLogout}
          logos={dynamicLogos}
          setLogos={setDynamicLogos}
          reels={dynamicReels}
          setReels={setDynamicReels}
          posters={dynamicPosters}
          setPosters={setDynamicPosters}
          showcases={dynamicShowcases}
          setShowcases={setDynamicShowcases}
          C={C}
          isLight={isLight}
          toggleTheme={toggleTheme}
        />

      </div>
    </div>
  );
}
