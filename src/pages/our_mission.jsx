// src/pages/our-mission.jsx
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400", "500", "700"] });

// Lottie (reuse existing project assets)
const LottiePlayer = dynamic(() => import("@/components/LottiePlayer"), { ssr: false });

// ⚠️ Make sure these filenames (including case) match what's in /src/lotties or /lotties
import trackProgress from "@/lotties/track-progress.json";
import champion from "@/lotties/champion.json"; // rename to match file exactly if needed
import coinWing from "@/lotties/coin-wing.json";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function OurMission() {
  return (
    <>
      <Head>
        <title>InvesTerra — Our Mission</title>
        <meta
          name="description"
          content="Empowering the next generation of financially literate adventurers."
        />
      </Head>

      {/* HERO */}
      <section className="section section-hero codedex-style">
        <motion.div
          className="content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Our Mission</h1>
          <p className={`text-lg md:text-xl opacity-90 ${comfortaa.className}`}>
            Empowering the next generation of financially literate adventurers.
          </p>
          <div className="mt-8">
            <Link href="/" className="btn-start">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>

      {/* MISSION BRIEF */}
      <section className="section bg-black">
        <div className="content max-w-3xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Why InvesTerra exists
          </motion.h2>

          <motion.div
            className={`space-y-5 text-base md:text-lg leading-relaxed ${comfortaa.className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <p>
              We believe financial literacy should be{" "}
              <strong>fun, practical, and accessible</strong>. InvesTerra turns complex ideas into
              simple choices and rewarding progress, so anyone can build confidence with money.
            </p>
            <p>
              We use <strong>gamification</strong>, a 24/7 <strong>AI mentor</strong>, and{" "}
              <strong>real-world simulations</strong> to transform theory into hands-on skills you
              can apply immediately.
            </p>
            <p>
              Our mission is to equip learners with skills for their <strong>careers</strong> and{" "}
              <strong>daily lives</strong>—from budgeting and investing to smart financial
              decision-making.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GIF / ANIMATION CARDS */}
      <section className="section bg-black">
        <motion.div
          className="content w-full max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="pixel-card-neo rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-52 h-52 flex items-center justify-center">
                <LottiePlayer animationData={trackProgress} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Learn by Doing</h3>
              <p className={`mt-2 text-sm opacity-90 ${comfortaa.className}`}>
                Bite-sized quests and progress tracking make complex topics simple.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="pixel-card-neo rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-52 h-52 flex items-center justify-center">
                <LottiePlayer animationData={champion} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Motivation that Sticks</h3>
              <p className={`mt-2 text-sm opacity-90 ${comfortaa.className}`}>
                Levels, badges, and leaderboards keep momentum high from day one.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="pixel-card-neo rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-52 h-52 flex items-center justify-center">
                <LottiePlayer animationData={coinWing} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Mentored, Not Alone</h3>
              <p className={`mt-2 text-sm opacity-90 ${comfortaa.className}`}>
                An AI mentor answers questions in context—right when you need it.
              </p>
            </motion.div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/signup" className="btn-start">
              Start Your Quest
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
