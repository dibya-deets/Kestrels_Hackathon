// src/pages/team.jsx
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Comfortaa } from "next/font/google";
import Cloud from "@/components/cloud"; // fixed background clouds (ensure file exists)

const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400", "500", "700"] });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Smarter image that avoids cropping portraits.
// - Auto: uses natural dimensions to pick 'contain' for portrait, 'cover' for landscape
// - fitOverride: force 'contain' or 'cover' if you want per-photo control
// - posOverride: e.g. 'object-top' to bias the crop position
function SafeImg({ src, alt, className, fitOverride, posOverride }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [fit, setFit] = useState(null); // 'cover' | 'contain'

  const fitClass =
    (fitOverride === "contain" || fit === "contain") ? "object-contain" : "object-cover";
  const posClass = posOverride || "object-center";

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      className={`${className} ${fitClass} ${posClass}`}
      onLoad={(e) => {
        if (fitOverride) return; // respect manual override
        const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
        // If clearly portrait (taller than wide), don't crop
        setFit(h / w > 1.15 ? "contain" : "cover");
      }}
      onError={() => setImgSrc("/assets/team/placeholder.jpg")}
    />
  );
}

const team = [
  { name: "Jason",  role: "CEO, CMO",           img: "/assets/team/jason.png" },
  { name: "Dibya",  role: "CTO, CIO",           img: "/assets/team/dibya.jpg", fit: "contain" }, 
  { name: "Mahek",  role: "CDO (Data)",         img: "/assets/team/mahek.png" },
  { name: "Keerthi",role: "CFO, CRO (Revenue)", img: "/assets/team/keerthy.png" },
  { name: "Krisha", role: "COO, CDO (Design)",  img: "/assets/team/krisha.png" },
  { name: "Roshan", role: "CEO, CRO (Risk)",    img: "/assets/team/roshan.jpg" },
];

export default function Team() {
  return (
    <>
      <Head>
        <title>InvesTerra — Meet the Team</title>
        <meta name="description" content="The adventurers building the world of InvesTerra." />
      </Head>

      {/* Fixed cloud + stars background */}
      <Cloud />

      {/* One-section layout, everything visible right away */}
      <section
        className="relative min-h-screen w-full overflow-hidden text-white"
        style={{
          backgroundImage:
            "radial-gradient(1200px 500px at 50% -20%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-12">
          {/* Title + subtitle */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center"
          >
            <h1 className="font-['Press_Start_2P'] text-4xl md:text-6xl leading-tight drop-shadow-lg">
              Meet the Team
            </h1>
            <p className={`mt-3 md:mt-4 text-base md:text-lg opacity-90 ${comfortaa.className}`}>
              The adventurers building the world of InvesTerra.
            </p>
          </motion.div>

          {/* Team grid */}
          <motion.div
            className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {team.map((member, idx) => (
              <motion.div
                key={member.name + idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl p-[3px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
                }}
              >
                <article className="pixel-card-neo rounded-2xl overflow-hidden bg-[#0b0b0b]/80 ring-1 ring-white/10 shadow-xl backdrop-blur-sm flex flex-col">
                  {/* Image area (fixed height; SafeImg chooses cover/contain) */}
                  <div className="w-full h-64 bg-black overflow-hidden flex items-center justify-center">
                    <SafeImg
                      src={member.img}
                      alt={`${member.name} — ${member.role}`}
                      className="w-full h-full"
                      fitOverride={member.fit}            // optional per-image control
                      posOverride={member.pos}            // e.g., "object-top"
                    />
                  </div>

                  {/* Text area */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3
                      className={`text-[1.25rem] leading-tight font-semibold ${
                        member.name.length > 12 ? "text-lg" : ""
                      } whitespace-nowrap overflow-hidden text-ellipsis`}
                    >
                      {member.name}
                    </h3>
                    <p className={`mt-1 text-sm opacity-90 ${comfortaa.className} break-words`}>
                      {member.role}
                    </p>
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA row */}
          <div className="mt-10 md:mt-12 flex items-center justify-center gap-3 md:gap-4">
            <Link href="/signup" className="btn-start">
              Join the Quest
            </Link>
            <Link href="/" className="btn-start !bg-yellow-400/70 hover:!bg-yellow-400">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
