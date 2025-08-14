// src/pages/dashboard/[courseId]/index.jsx
import Header from "@/components/Header";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import lessonContent from "@/data/lessonContent";
import { Comfortaa } from "next/font/google";
import Link from "next/link";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400"],
});

// Map display names
const COURSE_TITLES = {
  crypto: "Cryptocurrency",
  investing: "Investing",
};

// Map background images
const HERO_BG = {
  crypto: "/assets/crypto1.gif",
  investing: "/assets/investing1.gif",
};

// Per-course background position
const HERO_BG_POS = {
  crypto: "center center",
  investing: "40% bottom",
};

export default function CourseOverview({ user, courseId }) {
  const courseLessons = lessonContent[courseId] ?? {};
  const validLessonIds = Object.keys(courseLessons);

  // CLEANED completed lessons: de-duped + only in this course
  const completedRaw = user.progress?.[courseId]?.lessonsCompleted ?? [];
  const completedLessons = [...new Set(completedRaw)].filter((id) =>
    validLessonIds.includes(id)
  );

  // Unlock rule: first lesson always unlocked; otherwise previous must be completed
  const isUnlocked = (index) => {
    if (index === 0) return true;
    const prevId = validLessonIds[index - 1];
    return completedLessons.includes(prevId);
  };

  // Title + hero
  const title =
    COURSE_TITLES[courseId] ??
    (courseId?.[0]?.toUpperCase() + courseId?.slice(1));
  const heroBg = HERO_BG[courseId] ?? HERO_BG.crypto;
  const heroPos = HERO_BG_POS[courseId] ?? "center center";

  return (
    <div className="min-h-screen bg-[#1A1B2D] text-white">
      <Header userProgress={user.progress} />

      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-bottom px-6 py-20 flex flex-col justify"
        style={{
          backgroundImage: `url('${heroBg}')`,
          backgroundPosition: heroPos,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-3xl md:text-4xl text-white font-bold font-['Press_Start_2P']">
          {title} Course
        </h1>

        <p className={`text-base text-white mt-4 max-w-2xl ${comfortaa.className}`}>
          Dive deep into financial education with interactive lessons, XP progress,
          badges, and quizzes!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-10">
        {/* Lesson Box Container */}
        <div className="md:col-span-2 bg-[#1A1B2D] p-6 rounded-xl border border-gray-700 space-y-4">
          {validLessonIds.map((lessonId, idx) => {
            const lesson = courseLessons[lessonId];
            const unlocked = isUnlocked(idx);
            const completed = completedLessons.includes(lessonId);
            return (
              <div
                key={lessonId}
                className={`border border-gray-700 rounded-lg px-4 py-4 ${
                  unlocked
                    ? "bg-[#24253b] hover:scale-[1.01] transition"
                    : "bg-gray-800 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-['Press_Start_2P'] mb-1">
                      Lesson {lesson.id} – {lesson.title}
                    </h2>
                    <p className={`text-sm text-gray-300 ${comfortaa.className}`}>
                      {lesson.subtitle || "Expand your financial knowledge"}
                    </p>
                  </div>
                  <div>
                    {unlocked ? (
                      <Link
                        href={`/dashboard/${courseId}/${lessonId}`}
                        className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-300"
                      >
                        {completed ? "Review" : "Start"}
                      </Link>
                    ) : (
                      <span className="text-gray-400 font-semibold">🔒 Locked</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Profile Sidebar */}
        <div className="bg-[#1A1B2D] p-4 rounded-xl border border-gray-700 space-y-4">
          <div className={`${comfortaa.className} border-b border-gray-600 pb-3`}>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p>XP: {user.xp}</p>
            <p>Level: {user.level}</p>
          </div>

          <div className={`${comfortaa.className} border-b border-gray-600 pb-3`}>
            <h3 className="font-bold mb-1">Course Progress</h3>
            <p>Lessons Completed: {completedLessons.length}</p>
            <p>Total Lessons: {validLessonIds.length}</p>
          </div>

          <div className={`${comfortaa.className}`}>
            <h3 className="font-bold mb-1">Lesson Progress</h3>
            <ul className="text-sm space-y-1">
              {validLessonIds.map((lessonId, idx) => {
                const lesson = courseLessons[lessonId];
                const done = completedLessons.includes(lessonId);
                return (
                  <li
                    key={lessonId}
                    className={done ? "text-yellow-400 font-semibold" : "text-gray-300"}
                  >
                    {idx + 1}. {lesson.title}
                  </li>
                );
              })}
            </ul>
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

  const { courseId } = context.params;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      xp: true,
      level: true,
      progress: true,
    },
  });

  return {
    props: {
      user,
      courseId,
    },
  };
}
