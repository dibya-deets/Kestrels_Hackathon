import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400"],
});

const courses = [
  {
    id: "investing",
    title: "Introduction to Investing",
    description:
      "Learn the basics of investing: risk, return, and diversification.",
    banner: "/assets/images/image.gif", // GIF okay
    badge: "Beginner",
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 4,
  },
  {
    id: "crypto",
    title: "Cryptocurrency 101",
    description:
      "Understand blockchain, wallets, and crypto markets.",
    banner: "/assets/images/crypto.gif",
    badge: "Beginner",
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 4,
  },
];

export default function Dashboard() {
  const router = useRouter();
  const go = (id) => router.push(`/dashboard/${id}`);

  return (
    <div className="min-h-screen bg-[#0a0a15] px-6 md:px-8 py-12 text-white">
      <h1 className="text-3xl md:text-4xl font-bold font-arcade text-center mb-10">
        Choose a course to begin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {courses.map((course) => (
          <motion.article
            key={course.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => go(course.id)}
            className="cursor-pointer border border-yellow-500 rounded-lg bg-[#1e1e2e] shadow-xl p-4 flex flex-col justify-between"
          >
            {/* Banner — proportional, edge-to-edge, rounded, dark bg */}
            <div className="relative w-full overflow-hidden rounded-t-lg bg-[#151524] aspect-[16/9] md:aspect-[5/3]">
              <Image
                src={course.banner}
                alt={`${course.title} banner`}
                fill
                // For GIFs to render as animated without optimization artifacts:
                unoptimized
                className="object-cover object-center select-none"
                priority={course.id === "investing"} // slight perf boost for first card
              />
            </div>

            {/* Title & badge (no overlap, allow wrapping) */}
            <div className="mt-3 flex items-start justify-between gap-3">
              <h2 className="whitespace-normal break-words leading-tight text-lg md:text-xl font-bold">
                {course.title}
              </h2>
              <span className="shrink-0 self-start text-[0.7rem] md:text-sm bg-green-700 text-white px-2 py-1 rounded">
                {course.badge}
              </span>
            </div>

            {/* Description */}
            <p
              className={`${comfortaa.className} text-sm md:text-base text-gray-300 mt-2`}
            >
              {course.description}
            </p>

            {/* Progress */}
            <div className="mt-3 text-xs md:text-sm font-semibold">
              Progress: {course.progress}%
            </div>
            <div className="w-full bg-gray-700 h-2 rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                className="bg-green-400 h-full"
              />
            </div>

            {/* Lesson count */}
            <p className={`${comfortaa.className} text-pink-400 text-xs mt-2`}>
              🕹 {course.lessonsCompleted}/{course.totalLessons} Lessons Completed
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
