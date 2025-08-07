// components/AnimatedCard.tsx
import { motion } from "framer-motion";

export default function AnimatedCard({ title, image, description }) {
  return (
    <motion.div
      className="bg-[#0F172A] rounded-xl shadow-lg p-4 w-72 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <img src={image} className="rounded-t-xl mb-2" alt={title} />
      <h3 className="text-white text-xl font-bold">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </motion.div>
  );
}
