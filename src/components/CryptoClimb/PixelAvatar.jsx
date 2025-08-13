// src/components/CryptoClimb/PixelAvatar.jsx
import { motion } from "framer-motion";

/**
 * Simple pixel avatar that animates shake (wrong answer) and idle bob.
 * No circular imports. Use inside PixelClimber.
 *
 * Props:
 *  - src: string (public path to gif/png)
 *  - size: number (px)
 *  - direction: "left" | "right" (flips horizontally)
 *  - bob: boolean (idle bobbing)
 *  - shake: boolean (short wobble; parent should toggle for ~450ms)
 */
export default function PixelAvatar({
  src = "/assets/avatar.gif",
  size = 56,
  direction = "right",
  bob = false,
  shake = false,
}) {
  const flip = direction === "left" ? "-scale-x-100" : "";

  return (
    <motion.img
      src={src}
      alt="Pixel avatar"
      width={size}
      height={size}
      draggable={false}
      className={`select-none ${flip}`}
      style={{ imageRendering: "pixelated" }}
      initial={false}
      animate={{
        // shake uses tween (springs don't support multi-keyframes on x)
        x: shake ? [0, -10, 10, -6, 6, 0] : 0,
        y: bob ? [0, -1.5, 0] : 0,
      }}
      transition={{
        x: { type: "tween", duration: 0.45, ease: "easeInOut" },
        y: bob ? { repeat: Infinity, duration: 2.2, ease: "easeInOut" } : undefined,
      }}
    />
  );
}
