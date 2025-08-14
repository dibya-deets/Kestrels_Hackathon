// src/pages/our-mission.jsx
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Comfortaa, Press_Start_2P } from "next/font/google";

// Fonts
const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400", "500", "700"] });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });

// Client-only components (use RELATIVE paths for Vercel/Linux)
const CloudBg = dynamic(() => import("../components/cloud"), { ssr: false });
const LottiePlayer = dynamic(() => import("../components/LottiePlayer"), { ssr: false });

// Lottie JSON (case-sensitive)
import trackProgress from "../lotties/track-progress.json";
import champion from "../lotties/Champion.json";
import coinWing from "../lotties/coin-wing.json";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function OurMission() {
  return (
    <>
      <Head>
        <title>Why InvesTerra exists</title>
        <meta
          name="description"
          content="Empowering the next generation of financially literate adventurers."
        />
      </Head>

      {/* One viewport, no scroll */}
      <main className="relative h-[100svh] w-full overflow-hidden bg-black text-white">
        <CloudBg />
        <div className="pointer-events-none absolute inset-0 bg-black/60 z-[1]" />

        <section className="relative z-[2] h-full w-full px-4">
          <div
            className={`
              mx-auto h-full max-w-6xl
              grid gap-4 sm:gap-5
              grid-rows-[auto_auto_auto_minmax(0,1fr)_auto]
              py-4 sm:py-6
            `}
          >
            {/* Title */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={`${pressStart.className} text-center leading-tight text-3xl sm:text-4xl md:text-5xl`}
            >
              Why InvesTerra exists
            </motion.h1>

            {/* Paragraphs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={`${comfortaa.className} text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg`}
            >
              <p>
                We believe financial literacy should be <b>fun, practical, and accessible</b>. InvesTerra
                turns complex ideas into simple choices and rewarding progress, so anyone can build
                confidence with money.
              </p>
              <p>
                We use <b>gamification</b>, a <b>24/7 AI mentor</b>, and <b>real-world simulations</b> to
                transform theory into hands-on skills you can apply immediately.
              </p>
              <p>
                Our mission is to equip learners with skills for their <b>careers</b> and <b>daily lives</b>—from
                budgeting and investing to smart financial decision-making.
              </p>
            </motion.div>

            {/* Lottie Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto w-full content-center"
            >
              <Card
                title="Learn by Doing"
                blurb="Bite-sized quests and progress tracking make complex topics simple."
              >
                <Box>
                  <LottiePlayer animationData={trackProgress} />
                </Box>
              </Card>

              <Card
                title="Motivation that Sticks"
                blurb="Levels, badges, and leaderboards keep momentum high from day one."
              >
                <Box>
                  <LottiePlayer animationData={champion} />
                </Box>
              </Card>

              <Card
                title="Mentored, Not Alone"
                blurb="An AI mentor answers questions in context—right when you need it."
              >
                <Box>
                  <LottiePlayer animationData={coinWing} />
                </Box>
              </Card>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center justify-center gap-3 sm:gap-4"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-2xl px-4 sm:px-5 py-2 sm:py-3
                           bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500
                           border-2 border-black shadow-[3px_3px_0_0_#000]
                           text-sm sm:text-base font-bold"
              >
                Join the Quest
              </Link>
              <Link
                href="/"
                  className="inline-flex items-center justify-center rounded-2xl px-4 sm:px-5 py-2 sm:py-3
                           bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500
                           border-2 border-black shadow-[3px_3px_0_0_#000]
                           text-sm sm:text-base font-bold"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Prevent page scrolling on this route */}
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

function Box({ children }) {
  return (
    <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center">
      {children}
    </div>
  );
}

function Card({ title, blurb, children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl border-2 border-black bg-black/35 backdrop-blur shadow-[6px_6px_0_0_#000] p-4 sm:p-5 flex flex-col items-center text-center"
    >
      {children}
      <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold">{title}</h3>
      <p className={`mt-1 sm:mt-2 text-xs sm:text-sm opacity-90 ${comfortaa.className}`}>{blurb}</p>
    </motion.div>
  );
}
