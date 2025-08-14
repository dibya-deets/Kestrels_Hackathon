// src/components/cloud.jsx (or wherever this lives)
import { useEffect, useRef } from "react";

export default function Cloud() {
  const starsRef = useRef(null);
  const shootsRef = useRef(null);

  const fitCanvas = (canvas) => {
    if (!canvas || typeof window === "undefined") return null;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const { innerWidth: w, innerHeight: h } = window;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  };

  // Stars + twinkle
  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = starsRef.current;
    const ctx = fitCanvas(canvas);
    if (!canvas || !ctx) return;

    const STAR_COUNT = 1500;
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.7,
      base: Math.random() * 0.4 + 0.35,
      amp: Math.random() * 0.7 + 0.6,
      phase: Math.random() * Math.PI * 2,
      speedY: Math.random() * 0.12 + 0.08,
      flash: Math.random() * 400 + 200,
    }));

    let af = 0;
    const render = (t) => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";

      for (const s of stars) {
        const tw = s.base + Math.sin(t * 0.006 + s.phase) * s.amp * 0.55;
        s.flash -= 1;
        let alpha = Math.max(0, Math.min(1, tw));
        if (s.flash < 0) {
          alpha = 1;
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

    const onResize = () => fitCanvas(canvas);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(af);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Shooting stars
  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = shootsRef.current;
    const ctx = fitCanvas(canvas);
    if (!canvas || !ctx) return;

    const trails = [];
    let af = 0;
    const spawn = () => {
      if (!canvas) return;
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
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = trails.length - 1; i >= 0; i--) {
        const s = trails[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;

        const grad = ctx.createLinearGradient(s.x - 80, s.y - 20, s.x, s.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, "rgba(255,255,255,0.9)");
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

    const onResize = () => fitCanvas(canvas);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(af);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Parallax (RAF-throttled + null-guarded)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    const root = document.documentElement;

    const tick = () => {
      const y = window.scrollY || 0;
      const starsEl = starsRef.current;
      const shootsEl = shootsRef.current;

      if (starsEl) starsEl.style.transform = `translateY(${y * 0.15}px)`;
      if (shootsEl) shootsEl.style.transform = `translateY(${y * 0.12}px)`;

      root.style.setProperty("--parallax-y1", `${y * 0.35}px`);
      root.style.setProperty("--parallax-y2", `${y * 0.5}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    // initial
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
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
          background-image: url('/assets/images/cloud.png');
          background-repeat: repeat-x;
          background-position: center bottom;
          background-size: auto 100%;
          image-rendering: pixelated;
          opacity: 0.9;
          transform: translateZ(0);
        }
        .cloud-1 {
          animation: drift1 20s linear infinite;
          filter: brightness(0.95);
          transform: translateY(var(--parallax-y1, 0));
        }
        .cloud-2 {
          animation: drift2 35s linear infinite reverse;
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
