
import Head from "next/head";
import dynamic from "next/dynamic";
import { Comfortaa } from 'next/font/google';

// Dynamically load the LottiePlayer component
const LottiePlayer = dynamic(() => import("@/components/LottiePlayer"), { ssr: false });

const comfortaa = Comfortaa({
  subsets: ['latin'],
    weight: ['400', '500', '700'],  // Add more weights if needed
});
// Lottie animations
import trackProgress from "@/lotties/track-progress.json";
import treasureChest from "@/lotties/treasure-chest.json";
import moneyBag from "@/lotties/money-bag.json";
import chatPerson from "@/lotties/chat-person-1.json";
import coinWing from "@/lotties/coin-wing.json";
import champion from "@/lotties/Champion.json";

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
          <p className="hero-tagline" style={{ fontFamily: 'Comfortaa, cursive' }}>The most fun and beginner-friendly way to learn about finance</p>
          <a href="/signup" className="btn-start">Get Started</a>
        </div>
      </section>

      {/* TRACK PROGRESS */}
      <section className="feature-card-section">
        <div className="feature-card-container">
          <div className="feature-card-text">
            <h2>Track Your Progress</h2>
          <p className={comfortaa.className}>Visualize your learning journey with progress bars and milestones as you level up your financial skills.</p>
          </div>
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
      </section>

      {/* EARN BADGES */}
      <section className="section section-feature">
        <div className="content">
          <h2>Earn Badges</h2>
          <p className={comfortaa.className}>Unlock badges for completing challenges, quizzes, and real-life financial simulations.</p>
        </div>
        <div className="pixel-card-icon">
        <LottiePlayer animationData={champion} className="w-[300px] h-[300px]" />
        </div>
      </section>

      {/* INTERACTIVE SIMULATIONS */}
      <section className="section section-feature alt-bg">
        <div className="content">
          <h2>Interactive Simulations</h2>
            <p className={comfortaa.className}>Step into real-world finance scenarios, from budgeting games to investment simulations.</p>
        </div>
        <div className="pixel-card-icon">
          <LottiePlayer animationData={moneyBag} />
        </div>
      </section>

      {/* ASK MENTORS */}
      <section className="section section-feature">
        <div className="content">
          <h2>Ask Mentors</h2>
          <p className={comfortaa.className}>Stuck on a concept? Chat with finance mentors to get real-time advice and personalized feedback.</p>
        </div>
        <div className="pixel-card-icon">
          <LottiePlayer animationData={chatPerson} />
        </div>
      </section>

      {/* CTA */}
      <section className="section section-cta">
        <div className="content">
          <h2>Join InvesTerra Today</h2>
         <p className={comfortaa.className}>Ready to master financial literacy in a fun, gamified world? Join <strong>InvesTerra</strong> and start your adventure now!</p>
          <a className="btn-start" href="/signup">Start Learning For Free</a>
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
              <li><a href="#" className={comfortaa.className}>Privacy Policy</a></li>
              <li><a href="#" className={comfortaa.className}>Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
