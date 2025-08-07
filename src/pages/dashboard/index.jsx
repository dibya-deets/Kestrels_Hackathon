import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";

import { Comfortaa } from 'next/font/google';

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['400'],
});
const courses = [
  {
    id: "investing",
    title: "Intro to Investing",
    description:
      "Learn the basics of investing: risk, return, and diversification.",
    banner: "/assets/images/image.png",
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

  const handleClick = (id) => {
   router.push(`/dashboard/${id}`);
 
  };

  return (
    <div className="min-h-screen bg-[#0a0a15] px-8 py-12 text-white">
      <h1 className="text-4xl md:text-4xl font-bold font-arcade text-center mb-12">
        Choose a course to begin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center max-w-6xl mx-auto">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer border border-yellow-500 rounded-lg bg-[#1e1e2e] shadow-xl p-4 flex flex-col justify-between"
            onClick={() => handleClick(course.id)}
          >
            {/* Banner or Lottie/GIF */}
            <div className="h-36 w-full mb-3 relative">
              <Image
                src={course.banner}
                alt={`${course.title} banner`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>

            {/* Title & Badge */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl md:text-2xl font-bold">{course.title}</h2>
              <span className="text-sm bg-green-700 text-white px-2 py-1 rounded">
                {course.badge}
              </span>
            </div>

            {/* Description */}
<p
  className={`text-sm md:text-base mb-4 text-gray-300 ${comfortaa.className}`}
>
  {course.description}
</p>
            {/* Progress Bar */}
            <div className="mb-1 text-sm font-semibold">
              Progress: {course.progress}%
            </div>
            <div className="w-full bg-gray-700 h-2 rounded overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                className="bg-green-400 h-full"
              ></motion.div>
            </div>

            {/* Lesson Count */}
            
  <p className={`text-pink-400 text-xs mt-auto ${comfortaa.className}`}
>
            {/* <p className="text-pink-400 text-xs mt-auto"> */}
              🕹 {course.lessonsCompleted}/{course.totalLessons} Lessons Completed
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
