import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400", "500", "700"] });

/* =========================
   Reveal-on-scroll helper
   ========================= */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVis(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

/* Placeholder data URI in case an asset path is missing */
const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'>
       <defs><linearGradient id='g' x1='0' x2='0' y1='0' y2='1'>
         <stop stop-color='#111' offset='0'/>
         <stop stop-color='#000' offset='1'/>
       </linearGradient></defs>
       <rect width='100%' height='100%' fill='url(#g)'/>
       <g font-family='monospace' font-size='28' fill='#ffd166' opacity='0.9'>
         <text x='50%' y='50%' text-anchor='middle'>pixel media</text>
       </g>
     </svg>`
  );

/* =========================
   Feature row (pixel card)
   ========================= */
function FeatureRow({
  title,
  copy,
  mediaSrc,
  mediaAlt,
  reverse = false,
  accent = "gold", // "gold" | "emerald" | "indigo"
  chip = "10 XP",
}) {
  const [ref, visible] = useReveal();

  const ring =
    accent === "emerald"
      ? "ring-emerald-300/60"
      : accent === "indigo"
      ? "ring-indigo-300/60"
      : "ring-yellow-300/60";

  return (
    <section className="py-20 md:py-28 bg-black">
      <div ref={ref} className="features-grid">
        {/* Media */}
        <div
          className={[
            "reveal-up",
            visible ? "is-visible" : "",
            reverse ? "order-2" : "",
            "col-span-12 md:col-span-6",
          ].join(" ")}
        >
          <div className={`pixel-card-neo p-3 md:p-4 ring-2 ${ring} float-soft`}>
            <div className="relative rounded-xl overflow-hidden bg-black">
              <img
                src={mediaSrc}
                onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                alt={mediaAlt}
                className="w-full h-auto pixel-img"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className={[
            "reveal-up",
            visible ? "is-visible" : "",
            reverse ? "order-1" : "",
            "col-span-12 md:col-span-6",
          ].join(" ")}
        >
          <div className={`${comfortaa.className} max-w-xl ${reverse ? "md:ml-auto" : ""}`}>
            <div className="mb-3">
              <span className="xp-chip">{chip}</span>
            </div>
            <h2 className='text-white font-["Press_Start_2P"] text-[clamp(1.4rem,2.6vw,2.2rem)] leading-tight mb-4'>
              {title}
            </h2>
            <p className="text-gray-300 leading-7">{copy}</p>

            <div className="mt-5 flex items-center gap-2">
              <span className="coin-dot" />
              <span className="coin-dot" />
              <span className="coin-dot" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Type-on-scroll headline
   ========================= */
function TypeOnScrollHeadline() {
  const fullText = "Journey through the world of Finance 🌟";
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStarted(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setTyped("");
    let t;
    const step = () => {
      setTyped(fullText.slice(0, i + 1));
      i += 1;
      if (i < fullText.length) t = setTimeout(step, 38);
    };
    t = setTimeout(step, 100);
    return () => clearTimeout(t);
  }, [started]);

  return (
    <section ref={targetRef} className="py-16 md:py-24 bg-black text-center" aria-label="Journey section">
      <h2 className='text-[clamp(1.1rem,2.4vw,2rem)] leading-tight text-white font-["Press_Start_2P"]'>
        {typed}
        <span className="typing-caret" aria-hidden="true" />
      </h2>
    </section>
  );
}

/* =========================
   Features Section (5 rows, GIF media, no avatar boxes, no CTAs)
   ========================= */
function FeaturesSection() {
  return (
    <div className="features-wrap">
      {/* 1 — Level up your learning (use your Level Up GIF) */}
      <FeatureRow
        title="Level up your learning"
        copy="Gain XP and unlock badges with bite-sized lessons, then watch your progress climb like a stock chart. Our lessons make finance as motivating as your next quest."
        mediaSrc="/assets/features/features-levelup.gif"
        mediaAlt="Level up animation"
        accent="gold"
        chip="20 XP"
      />

      {/* 2 — Practice your skills (GIF) */}
      <FeatureRow
        reverse
        title="Practice your skills"
        copy="Apply what you learn with mini-simulations and challenges. Each lesson adds XP, beat your high score and collect rare badges."
        mediaSrc="/assets/features/features-sim-small.gif"
        mediaAlt="Simulation preview"
        accent="emerald"
        chip="+ Challenge Mode"
      />

      {/* 3 — Earn badges & rewards (use XP GIF) */}
      <FeatureRow
        title="Earn badges & rewards"
        copy="Complete lesson quests to unlock pixel-perfect badges. Three big milestones per course. Collect them all to become a Course Conqueror."
        mediaSrc="/assets/features/features-xp.gif"
        mediaAlt="XP / rewards animation"
        accent="indigo"
        chip="Badge Unlocked"
      />

      {/* 4 — Ask Mentors (GIF) */}
      <FeatureRow
        reverse
        title="Ask Mentors"
        copy="Stuck on a concept? Ping a mentor and get quick, practical guidance. Ask questions, get hints, and keep your streak alive."
        mediaSrc="/assets/features/features-ask-small.gif"
        mediaAlt="Mentor help"
        accent="gold"
        chip="Live Help"
      />

      {/* 5 — Make friends along the way (Community GIF) */}
      <FeatureRow
        title="Make friends along the way"
        copy="Building is so much better together than alone. Join our community forum and Discord to give and receive help, collaborate on projects, and connect over shared passions."
        mediaSrc="/assets/features/features-community-small.gif"
        mediaAlt="Community / Guild"
        accent="emerald"
        chip="Join the Guild"
      />
    </div>
  );
}

/* =========================
   Page
   ========================= */
export default function Home() {
  return (
    <>
      <Head>
        <title>InvesTerra – Gamified Finance Learning</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* HERO */}
      <section className="section section-hero codedex-style">
        <header className="hero-header">
          <img src="/assets/mascot.png" alt="InvesTerra Logo" className="logo" />
          <h1 className="investerra-title">InvesTerra</h1>
        </header>

        <div className="hero-content">
          <p className="hero-subtitle hero-bounce">START YOUR</p>
          <h1 className="hero-title hero-bounce hero-bounce-delay">
            Finance
            <br />
            Adventure
          </h1>

          <p className={`hero-tagline ${comfortaa.className}`}>
            The most fun and beginner-friendly way to learn about finance
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/signup" className="btn-start">Get Started</a>
            <a href="/sign_in" className="btn-start">Sign in</a>
          </div>
        </div>
      </section>

      {/* Spacer + typing headline */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-transparent to-black" />
      <TypeOnScrollHeadline />

      {/* FEATURES */}
      <FeaturesSection />

      {/* CTA */}
      <section className="section section-cta">
        <div className="content">
          <h2>Join InvesTerra Today</h2>
          <p className={comfortaa.className}>
            Ready to master financial literacy in a fun, gamified world? Join <strong>InvesTerra</strong> and start your adventure now!
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn-start" href="/signup">Start Learning For Free</a>
            <a className="btn-start" href="/sign_in">Sign in</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-column">
            <h4 className="footer-heading">LEARN</h4>
            <ul className="footer-links">
              <li><a href="#" className={comfortaa.className}>Crypto Currency</a></li>
              <li><a href="#" className={comfortaa.className}>Introduction to Investment</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">ABOUT</h4>
            <ul className="footer-links">
              <li><a href="#" className={comfortaa.className}>Our Mission</a></li>
              <li><a href="#" className={comfortaa.className}>Team</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">TERMS</h4>
            <ul className="footer-links">
              <li>
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={comfortaa.className}
                >
                  Privacy Policy
                </Link>
              </li>
              <li><a href="#" className={comfortaa.className}>Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
