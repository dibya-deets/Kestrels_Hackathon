'use client';

import { useEffect, useRef } from 'react';

export default function Cloud() {
  const starsRef = useRef(null);
  const shootsRef = useRef(null);

  const fitCanvas = (canvas) => {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const { innerWidth: w, innerHeight: h } = window;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  };

  // Stars + twinkle
  useEffect(() => {
    const canvas = starsRef.current;
    let ctx = fitCanvas(canvas);

    // Tip: 5000 is heavy on some laptops; 800–1500 often looks great.
    const STAR_COUNT = 1500;
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.7,
      base: Math.random() * 0.4 + 0.35,     // higher base brightness
      amp: Math.random() * 0.7 + 0.6,       // bigger twinkle swing
      phase: Math.random() * Math.PI * 2,
      speedY: Math.random() * 0.12 + 0.08,  // slight drift
      flash: Math.random() * 400 + 200,     // frames until next flash
    }));

    let af;
    const render = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';

      for (const s of stars) {
        // faster twinkle frequency (was 0.002)
        const tw = s.base + Math.sin(t * 0.006 + s.phase) * s.amp * 0.55;

        // occasional quick flash
        s.flash -= 1;
        let alpha = Math.max(0, Math.min(1, tw));
        if (s.flash < 0) {
          alpha = 1;                  // brief pop
          s.flash = Math.random() * 400 + 200;
        }

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.speedY;
        if (s.y > window.innerHeight + 2) s.y = -2;
      }

      ctx.globalAlpha = 1;
      af = requestAnimationFrame(render);
    };

    af = requestAnimationFrame(render);

    const onResize = () => (ctx = fitCanvas(canvas));
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(af);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Shooting stars
  useEffect(() => {
    const canvas = shootsRef.current;
    let ctx = fitCanvas(canvas);

    const trails = [];
    let af;
    const spawn = () => {
      const y = Math.random() * window.innerHeight * 0.6 + 20;
      trails.push({
        x: -50,
        y,
        vx: Math.random() * 5 + 7,
        vy: Math.random() * -1 - 0.4,
        life: 0,
        ttl: 120 + Math.random() * 60,
      });
      setTimeout(spawn, 3000 + Math.random() * 5000);
    };
    setTimeout(spawn, 1500);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = trails.length - 1; i >= 0; i--) {
        const s = trails[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;

        const grad = ctx.createLinearGradient(s.x - 80, s.y - 20, s.x, s.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, 'rgba(255,255,255,0.9)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x - 90, s.y - 25);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        if (s.life > s.ttl || s.x > window.innerWidth + 100) {
          trails.splice(i, 1);
        }
      }
      af = requestAnimationFrame(render);
    };
    af = requestAnimationFrame(render);

    const onResize = () => (ctx = fitCanvas(canvas));
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(af);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      starsRef.current.style.transform = `translateY(${y * 0.15}px)`;
      shootsRef.current.style.transform = `translateY(${y * 0.12}px)`;
      document.documentElement.style.setProperty('--parallax-y1', `${y * 0.35}px`);
      document.documentElement.style.setProperty('--parallax-y2', `${y * 0.5}px`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <canvas ref={starsRef} className="sky-layer pointer-events-none" aria-hidden />
      <canvas ref={shootsRef} className="sky-layer pointer-events-none" aria-hidden />
      <div className="cloud-layer cloud-1 pointer-events-none" aria-hidden />
      <div className="cloud-layer cloud-2 pointer-events-none" aria-hidden />

      <style jsx global>{`
        .sky-layer {
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .cloud-layer {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-image: url('/assets/images/cloud.png'); /* fixed */
          background-repeat: repeat-x;
          background-position: center bottom;
          background-size: auto 100%;
          image-rendering: pixelated;
          opacity: 0.9;
        }
        /* faster clouds */
        .cloud-1 {
          animation: drift1 20s linear infinite;  /* was 120s */
          filter: brightness(0.95);
          transform: translateY(var(--parallax-y1, 0));
        }
        .cloud-2 {
          animation: drift2 35s linear infinite reverse; /* was 180s */
          opacity: 0.6;
          transform: translateY(var(--parallax-y2, 0));
        }
        @keyframes drift1 {
          from { background-position-x: 0; }
          to   { background-position-x: -1600px; }
        }
        @keyframes drift2 {
          from { background-position-x: 0; }
          to   { background-position-x: 1600px; }
        }
      `}</style>
    </>
  );
}
