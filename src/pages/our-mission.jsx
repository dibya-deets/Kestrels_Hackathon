// src/pages/our-mission.jsx
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400", "700"] });
const CloudBg = dynamic(() => import("@/components/cloud"), { ssr: false });

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function OurMission() {
  return (
    <>
      <Head>
        <title>InvesTerra — Our Mission</title>
      </Head>

      {/* Single viewport; no scroll */}
      <main className="relative h-[100svh] w-full overflow-hidden">
        <CloudBg />
        <div className="pointer-events-none absolute inset-0 bg-black/55 z-[1]" />

        <section className="relative z-[2] h-full w-full px-4">
          <div className="mx-auto h-full max-w-6xl grid grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-4 sm:gap-6 py-5 sm:py-6">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center font-bold drop-shadow-lg leading-none text-4xl sm:text-5xl md:text-6xl"
            >
              Our Mission
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className={`${comfortaa.className} text-center mx-auto max-w-3xl text-base sm:text-lg md:text-xl opacity-90`}
            >
              Empowering the next generation of financially literate adventurers.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="grid grid-rows-[auto_auto_auto_1fr] items-start gap-3 sm:gap-4 text-center mx-auto max-w-5xl"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Why InvesTerra exists
              </h2>

              <p className={`${comfortaa.className} text-sm sm:text-base md:text-lg opacity-90 max-w-4xl mx-auto`}>
                We believe financial literacy should be <b>fun, practical, and accessible</b>. InvesTerra
                turns complex ideas into simple choices and rewarding progress, so anyone can build
                confidence with money.
              </p>

              <p className={`${comfortaa.className} text-sm sm:text-base md:text-lg opacity-90 max-w-4xl mx-auto`}>
                We use <b>gamification</b>, a <b>24/7 AI mentor</b>, and <b>real-world simulations</b> to
                transform theory into hands-on skills you can apply immediately.
              </p>

              {/* ⬇️ FIXED: className is on one line (no raw newlines). Also stack on mobile. */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 content-center [--cardPad:theme(spacing.3)] sm:[--cardPad:theme(spacing.4)] [--cardRadius:theme(borderRadius.2xl)]">
                <FeatureCard
                  title="Learn by Doing"
                  blurb="Bite-sized quests turn money skills into muscle memory."
                  emoji="📊"
                />
                <FeatureCard
                  title="Motivation that Sticks"
                  blurb="Levels, badges, and streaks keep you coming back."
                  emoji="🏆"
                />
                <FeatureCard
                  title="Mentored, Not Alone"
                  blurb="An AI mentor answers questions any time you’re stuck."
                  emoji="🌟"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex items-center justify-center gap-3 sm:gap-4"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-2xl px-4 sm:px-5 py-2 sm:py-3 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 border-2 border-black shadow-[3px_3px_0_0_#000] text-sm sm:text-base font-bold"
              >
                Join the Quest
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl px-4 sm:px-5 py-2 sm:py-3 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 border-2 border-black shadow-[3px_3px_0_0_#000] text-sm sm:text-base font-bold"
               >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Prevent scroll only on this route */}
      <style jsx global>{`
        html,
        body {
          height: 100%;
        }
        body {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

function FeatureCard({ title, blurb, emoji }) {
  return (
    <div className="rounded-[var(--cardRadius)] border-2 border-black bg-black/30 backdrop-blur shadow-[6px_6px_0_0_#000] px-[var(--cardPad)] py-[var(--cardPad)] flex flex-col items-center text-white">
      <div className="text-2xl sm:text-3xl md:text-4xl" aria-hidden>
        {emoji}
      </div>
      <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-extrabold leading-tight text-center">
        {title}
      </h3>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base opacity-90 text-center">
        {blurb}
      </p>
    </div>
  );
}
