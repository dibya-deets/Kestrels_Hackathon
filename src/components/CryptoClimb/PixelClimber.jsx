// src/components/CryptoClimb/PixelClimber.jsx
import { motion } from "framer-motion";
import { useMemo } from "react";
import PixelAvatar from "@/components/CryptoClimb/PixelAvatar";

// --- tuneables (kept small + explicit pixel math so things touch perfectly) ---
const BRICK_H = 30;               // px per brick row
const GROUND_H = 46;              // MUST match the Tailwind ground height h-16 (16 * 4px = 64px)
const AVATAR_SIZE = 112;          // avatar gif size
const AVATAR_CENTER_TWEAK = -50;   // nudge left/right to visually center over bricks
const AVATAR_FOOT_LIFT = 0;       // tiny lift so feet sit on the grass line
const CASTLE_TOUCH_OVERLAP = 12;  // sink castle into top brick a bit to remove any seam

export default function PixelClimber({ climbLevel = 0, totalFloors = 10, shake = false }) {
  const clampedFloors = Math.max(1, totalFloors);
  const bricksHeight = clampedFloors * BRICK_H;

  // light drifting pixel clouds
  const clouds = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        left: `${10 + i * 30 + Math.random() * 10}%`,
        top: `${8 + Math.random() * 10}%`,
        scale: 1 + Math.random() * 0.4,
        dur: 20 + Math.random() * 10,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div
      className="relative h-[480px] w-full overflow-hidden rounded-xl border border-indigo-500/30"
      role="region"
      aria-label="Crypto Climb blocks"
    >
      {/* Day sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8ec5ff] via-[#b6dbff] to-[#e7f4ff]" />

      {/* Clouds */}
      {clouds.map((c, idx) => (
        <div key={idx} className="absolute" style={{ left: c.left, top: c.top, transform: `scale(${c.scale})` }} aria-hidden="true">
          <motion.div
            initial={{ x: -18, opacity: 0.95 }}
            animate={{ x: 18 }}
            transition={{ duration: c.dur, repeat: Infinity, repeatType: "reverse", delay: c.delay, ease: "linear" }}
          >
            <PixelCloud />
          </motion.div>
        </div>
      ))}

      {/* Brick column (touches the grass exactly) */}
      <div className="absolute inset-x-8" style={{ bottom: GROUND_H }}>
        <div className="relative mx-auto w-[152px]" style={{ height: bricksHeight }}>
          {/* bricks: exact BRICK_H rows */}
          <div className="absolute inset-x-0 bottom-0 grid" style={{ gridTemplateRows: `repeat(${clampedFloors}, ${BRICK_H}px)` }}>
            {Array.from({ length: clampedFloors }).map((_, i) => {
              const reached = i < climbLevel;
              const isTop = i === 0;
              const radius = isTop ? "0px" : "3px"; // no rounding at very top so castle can sit flush
              return (
                <div key={i} className="relative flex items-stretch justify-center">
                  <div
                    className={[
                      "h-full w-[120px] border shadow-inner",
                      "border-[#5a331d]/70",
                      reached ? "bg-[#9a5e34]" : "bg-[#8a4b2a]",
                    ].join(" ")}
                    style={{
                      borderRadius: radius,
                      backgroundImage: `
                        linear-gradient(0deg, rgba(0,0,0,.12), rgba(0,0,0,.12)),
                        linear-gradient(90deg, rgba(0,0,0,.15) 2px, transparent 2px),
                        linear-gradient(0deg, rgba(0,0,0,.15) 2px, transparent 2px)
                      `,
                      backgroundSize: "100% 100%, 20px 100%, 100% 12px",
                      backgroundBlendMode: "overlay, normal, normal",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Castle sits ON the top brick (slight overlap removes seam) */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: bricksHeight - CASTLE_TOUCH_OVERLAP }}
          >
            <Castle tiny />
          </div>
        </div>
      </div>

      {/* Ground (height must equal GROUND_H) */}
      <div className="absolute bottom-0 left-0 right-0 h-16" aria-hidden="true">
        <div
          className="h-6 border-t border-[#2b7c35]"
          style={{ background: "repeating-linear-gradient(90deg,#57d66a 0 6px,#49be5b 6px 12px)" }}
        />
        <div
          className="h-10"
          style={{ background: "repeating-linear-gradient(180deg,#6b3e24 0 6px,#5a331d 6px 12px)" }}
        />
      </div>

      {/* Avatar – centered and standing on the grass, then +brick height per correct answer */}
      <motion.div
        initial={false}
        animate={{ bottom: GROUND_H + AVATAR_FOOT_LIFT + climbLevel * BRICK_H, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.6 }}
        className="absolute left-1/2 -translate-x-1/2"
        aria-label={`Climber position: block ${Math.min(climbLevel, clampedFloors)} of ${clampedFloors}`}
        style={{ marginLeft: AVATAR_CENTER_TWEAK }}
      >
        <motion.div
          animate={{ x: shake ? [0, -10, 10, -6, 6, 0] : 0, y: [0, -1.5, 0] }}
          transition={{
            x: { type: "tween", duration: 0.45, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
          }}
          className="relative"
        >
          <PixelAvatar src="/assets/avatar.gif" size={AVATAR_SIZE} direction="right" bob={false} />
          <AnimateRedFlag visible={shake} />
        </motion.div>
      </motion.div>

      {/* HUD */}
      <div className="absolute right-3 top-3 text-xs text-blue-900/70">
        Floor <span className="font-semibold text-blue-900">{Math.min(climbLevel, clampedFloors)}</span> / {clampedFloors}
      </div>
    </div>
  );
}

/** Small red flag shown when shake = true */
function AnimateRedFlag({ visible }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? -8 : -2 }}
      transition={{ type: "tween", duration: 0.2 }}
      className="absolute -top-3 -right-4"
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="2" height="12" fill="#cbd5ff" />
        <rect x="4" y="3" width="10" height="5" fill="#f43f5e" />
        <rect x="4" y="8" width="8" height="2" fill="#e11d48" />
      </svg>
    </motion.div>
  );
}

/** Pixel cloud */
function PixelCloud() {
  return (
    <svg width="64" height="28" viewBox="0 0 64 28" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
      <rect x="8" y="10" width="8" height="8" fill="#ffffff" />
      <rect x="16" y="8" width="10" height="10" fill="#ffffff" />
      <rect x="26" y="6" width="12" height="12" fill="#ffffff" />
      <rect x="38" y="8" width="10" height="10" fill="#ffffff" />
      <rect x="48" y="10" width="8" height="8" fill="#ffffff" />
      <rect x="18" y="16" width="24" height="6" fill="#ffffff" />
    </svg>
  );
}

/** Tiny castle with flag */
function Castle({ tiny = false }) {
  const s = tiny ? 64 : 80;
  return (
    <svg width={s} height={s} viewBox="0 0 72 72" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg" aria-label="Castle">
      <rect x="10" y="26" width="52" height="34" fill="#2b2f55" />
      <rect x="12" y="28" width="48" height="30" fill="#3a3f6f" />
      <rect x="10" y="22" width="10" height="6" fill="#2b2f55" />
      <rect x="22" y="22" width="10" height="6" fill="#2b2f55" />
      <rect x="34" y="22" width="10" height="6" fill="#2b2f55" />
      <rect x="46" y="22" width="10" height="6" fill="#2b2f55" />
      <rect x="58" y="22" width="4" height="6" fill="#2b2f55" />
      <rect x="30" y="40" width="12" height="20" fill="#6b3e24" />
      <rect x="32" y="42" width="8" height="16" fill="#8a512e" />
      <rect x="54" y="6" width="2" height="18" fill="#cbd5ff" />
      <rect x="56" y="8" width="10" height="6" fill="#f43f5e" style={{ animation: "flag-wave 1.6s infinite" }} />
    </svg>
  );
}
