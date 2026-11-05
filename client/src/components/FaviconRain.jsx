import React, { useState, useEffect, useRef } from 'react';

/**
 * FaviconRain Component
 * High-performance 2D Canvas particle simulation that drops stylish favicon icons
 * across the hero background with gravity, wind oscillation, rotation, and cursor repulsion.
 */
export default function FaviconRain({
  density = 55,
  isLight = false,
  interactive = true,
  iconSrc = '/favicon.ico',
  minSize = 11,
  maxSize = 22
}) {
  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const checkResize = () => setIsMobileScreen(window.innerWidth <= 768);
    window.addEventListener('resize', checkResize);
    return () => window.removeEventListener('resize', checkResize);
  }, []);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (isMobileScreen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Preload icon image
    const icon = new Image();
    icon.src = iconSrc;
    let imageLoaded = false;

    if (icon.complete && icon.naturalWidth > 0) {
      imageLoaded = true;
    } else {
      icon.onload = () => {
        imageLoaded = true;
      };
      icon.onerror = () => {
        // Fallback to favicon.png if .ico rendering is unsupported by specific browser
        if (iconSrc !== '/favicon.png') {
          icon.src = '/favicon.png';
        }
      };
    }

    // Responsive particle count
    const isMobile = window.innerWidth <= 768;
    const count = isMobile ? Math.floor(density * 0.4) : density;

    // Initialize particles
    const particles = [];
    let isInitialized = false;

    const initParticles = (w, h) => {
      if (isInitialized && particles.length > 0) {
        // Keep active particles on resize without resetting their fall
        particles.forEach((p) => {
          if (p.x > w) p.x = Math.random() * w;
        });
        return;
      }
      isInitialized = true;
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        // Cascade start: staggered above viewport so screen begins empty, then showers down
        particles.push(createParticle(w, h, true, i, count));
      }
    };

    function createParticle(w, h, isCascadeStart = false, index = 0, total = 1) {
      const size = minSize + Math.random() * (maxSize - minSize);
      // Weight / parallax: larger icons fall slightly faster
      const speed = 0.95 + ((size - minSize) / (maxSize - minSize || 1)) * 1.3 + Math.random() * 0.5;

      // Stagger above the screen when opening so it pours down as an initial wave
      const initialY = isCascadeStart
        ? -35 - (index / total) * (h ? Math.min(h * 0.85, 600) : 500) - Math.random() * 60
        : -Math.random() * 120 - 30;

      return {
        x: Math.random() * (w || 800),
        y: initialY,
        size,
        speed,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayAmplitude: 0.6 + Math.random() * 1.2,
        opacity: 0.25 + ((size - minSize) / (maxSize - minSize || 1)) * (isLight ? 0.45 : 0.6)
      };
    }

    // Canvas resize handler with Device Pixel Ratio (DPR)
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      if (particles.length === 0) {
        initParticles(width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse coordinates relative to canvas
    const mouse = { x: -2000, y: -2000, active: false };

    const handleMouseMove = (e) => {
      if (!interactive || isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Pause physics when scrolled out of view to preserve 100% CPU/GPU
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(canvas);
    }

    // Animation Render Loop
    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const repulsionRadius = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Vertical falling
        p.y += p.speed;

        // 2. Horizontal gentle breeze / sway
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * p.swayAmplitude;

        // 3. Angular rotation
        p.rotation += p.rotSpeed;

        // 4. Cursor deflection / repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < repulsionRadius && dist > 1) {
            const force = (1 - dist / repulsionRadius) * 4.2;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // 5. Render particle
        if (imageLoaded) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.opacity;

          ctx.drawImage(icon, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }

        // 6. Recycle when particle falls below hero bounds
        if (p.y > height + 50 || p.x < -80 || p.x > width + 80) {
          particles[i] = createParticle(width, height, false);
        }
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (observer) observer.disconnect();
    };
  }, [density, isLight, interactive, iconSrc, minSize, maxSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
}
