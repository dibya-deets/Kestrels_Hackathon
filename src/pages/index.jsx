import Head from "next/head";
import dynamic from "next/dynamic";
import { Comfortaa } from 'next/font/google';
import Link from "next/link";

// Dynamically load LottiePlayer
const LottiePlayer = dynamic(() => import("@/components/LottiePlayer"), { ssr: false });

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// Lottie animations
import trackProgress from "@/lotties/track-progress.json";
import champion from "@/lotties/Champion.json";
import moneyBag from "@/lotties/money-bag.json";
import chatPerson from "@/lotties/chat-person-1.json";

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
          <p className="hero-subtitle">START YOUR</p>
          <h1 className="hero-title">Finance<br />Adventure</h1>
          <p className="hero-tagline" style={{ fontFamily: 'Comfortaa, cursive' }}>
            The most fun and beginner-friendly way to learn about finance
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/signup" className="btn-start">Get Started</a>
            <a href="/sign_in" className="btn-start">Sign in</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <div className="features-wrap">

        {/* Track Your Progress */}
        <div className="feature-block">
          <div className="feature-grid">
            <div className="feature-text">
              <h2 className="feature-title">Track Your Progress</h2>
              <p className="feature-copy">
                Visualize your learning journey with progress bars and milestones
                as you level up your financial skills.
              </p>
            </div>
            <div className="feature-media">
              <div className="media-box">
                <div className="pixel-card-modern">
                  <div className="pixel-card-header">
                    <span className="badge">ZEN</span>
                    <span className="xp">10 XP</span>
                  </div>
                  <div className="pixel-card-icon">
                    <LottiePlayer animationData={trackProgress} />
                  </div>
                  <p className="card-description">Track your milestones and financial mastery.</p>
                  <div className="card-meta">
                    <span>📊 5 Goals</span>
                    <span>⏱️ 30 Mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earn Badges */}
        <div className="feature-block">
          <div className="feature-grid">
            <div className="feature-media">
              <div className="media-box">
                <LottiePlayer animationData={champion} />
              </div>
            </div>
            <div className="feature-text">
              <h2 className="feature-title">Earn Badges</h2>
              <p className="feature-copy">
                Unlock badges for completing challenges, quizzes, and real-life
                financial simulations.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Simulations */}
        <div className="feature-block">
          <div className="feature-grid">
            <div className="feature-text">
              <h2 className="feature-title">Interactive Simulations</h2>
              <p className="feature-copy">
                Step into real-world finance scenarios, from budgeting games to
                investment simulations.
              </p>
            </div>
            <div className="feature-media">
              <div className="media-box">
                <LottiePlayer animationData={moneyBag} />
              </div>
            </div>
          </div>
        </div>

        {/* Ask Mentors */}
        <div className="feature-block">
          <div className="feature-grid">
            <div className="feature-media">
              <div className="media-box">
                <LottiePlayer animationData={chatPerson} />
              </div>
            </div>
            <div className="feature-text">
              <h2 className="feature-title">Ask Mentors</h2>
              <p className="feature-copy">
                Stuck on a concept? Chat with finance mentors to get real-time
                advice and personalised feedback.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="section section-cta">
        <div className="content">
          <h2>Join InvesTerra Today</h2>
          <p className={comfortaa.className}>
            Ready to master financial literacy in a fun, gamified world? Join{" "}
            <strong>InvesTerra</strong> and start your adventure now!
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
