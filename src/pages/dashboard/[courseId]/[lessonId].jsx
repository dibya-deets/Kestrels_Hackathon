// src/pages/dashboard/[courseId]/[lessonId].jsx
import lessonContent from "@/data/lessonContent";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400"],
});

export default function LessonPage({ user, courseId, lessonId }) {
  const [lesson, setLesson] = useState(null);
  const [openedSubLessons, setOpenedSubLessons] = useState([]);
  const [markedOpened, setMarkedOpened] = useState([]);

  useEffect(() => {
    if (!lessonContent[courseId]) return;
    const courseLessons = lessonContent[courseId];
    const currentLesson = courseLessons[lessonId];
    if (!currentLesson) return;
    setLesson(currentLesson);
  }, [courseId, lessonId]);

  const toggleSubLesson = (id) => {
    if (!markedOpened.includes(id)) {
      setMarkedOpened((prev) => [...prev, id]);
    }
    setOpenedSubLessons((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  if (!lesson) return <p className="p-6 text-white">Loading lesson...</p>;

  const allSubLessonsOpened = lesson.subLessons.every((sub) =>
    markedOpened.includes(sub.id)
  );

  return (
    <div className="min-h-screen bg-[#0D0E1D] text-white">
      <Header showBackToCourse />

      {/* Hero Section */}
      <div
        className="flex w-full items-start justify-center bg-cover bg-center px-6 py-12"
        style={{ backgroundImage: 'url("/assets/crypto1.gif")', minHeight: "300px" }}
      >
        <div className="flex w-full items-center justify-between">
          <h1 className="font-['Press_Start_2P'] text-3xl text-white md:text-4xl">
            Lesson {lesson.id} – {lesson.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-8 py-10 md:grid-cols-3">
        {/* Sub-lessons */}
        <div className="space-y-4 rounded-xl border border-gray-700 bg-[#1A1B2D] p-6 md:col-span-2">
          {lesson.subLessons.map((sub, idx) => {
            const isOpen = openedSubLessons.includes(sub.id);
            return (
              <div key={sub.id} className="rounded-md border border-gray-700">
                <button
                  type="button"
                  onClick={() => toggleSubLesson(sub.id)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left font-['Press_Start_2P'] text-sm ${
                    isOpen ? "bg-[#24253b]" : "bg-[#1A1B2D]"
                  }`}
                >
                  <span>
                    {idx + 1}. {sub.title}
                  </span>
                  {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                </button>

                {/* Animate only the accordion content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`px-4 py-3 text-sm text-white ${comfortaa.className}`}
                    >
                      {sub.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Lesson Quiz — navigates to full-page Crypto Climb */}
          <div className="mt-6 overflow-hidden rounded-md border border-gray-700">
            <a
              href={`/dashboard/${encodeURIComponent(courseId)}/quiz?lessonId=${encodeURIComponent(lessonId)}`}
              onClick={(e) => {
                if (!allSubLessonsOpened) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              role="button"
              aria-disabled={!allSubLessonsOpened}
              className={[
                "flex w-full select-none items-center justify-between px-4 py-3 text-left font-['Press_Start_2P'] text-sm transition",
                allSubLessonsOpened
                  ? "cursor-pointer bg-[#24253b] hover:bg-[#2b2d46]"
                  : "cursor-not-allowed bg-gray-800 opacity-50",
              ].join(" ")}
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-amber-500/20 ring-1 ring-amber-400/40">
                  🔥
                </span>
                <span>Lesson Quiz</span>
              </span>
              <span>›</span>
            </a>
          </div>
        </div>

        {/* Profile Section*/}
        <div className="space-y-4 rounded-xl border border-gray-700 bg-[#1A1B2D] p-4">
          <div className={`border-b border-gray-600 pb-3 ${comfortaa.className}`}>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p>Level: {user.level}</p>
          </div>

          <div className={`border-b border-gray-600 pb-3 ${comfortaa.className}`}>
            <h3 className="mb-1 font-bold">Course Progress</h3>
            <p>
              Lessons Completed: {user.progress?.[courseId]?.lessonsCompleted?.length || 0}
            </p>
          </div>

          <div className={`border-b border-gray-600 pb-3 ${comfortaa.className}`}>
            <h3 className="mb-1 font-bold">Lesson Progress</h3>
            <ul className="space-y-1">
              {lesson.subLessons.map((sub, idx) => (
                <li
                  key={sub.id}
                  className={`text-sm ${
                    markedOpened.includes(sub.id)
                      ? "font-semibold text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  {idx + 1}. {sub.title}
                </li>
              ))}
            </ul>
          </div>

          <div className={comfortaa.className}>
            <h3 className="font-bold">Course Badges</h3>
            <div className="mt-2 flex gap-2">
              <span className="h-8 w-8 rounded-full bg-yellow-400" />
              <span className="h-8 w-8 rounded-full bg-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/sign_in", permanent: false } };
  }

  const { courseId, lessonId } = context.params;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      xp: true,     // kept in query to avoid changing SSR shape; just not displayed
      level: true,
      progress: true,
    },
  });

  return { props: { user, courseId, lessonId } };
}
