// src/pages/dashboard/index.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Comfortaa } from "next/font/google";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import lessonContent from "@/data/lessonContent";
import Cloud from "@/components/cloud";

const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400"] });

// ---------- Static course meta ----------
const COURSE_META = {
  investing: {
    title: "Introduction to Investing",
    description:
      "Learn the basics of investing: risk, return, and diversification.",
    banner: "/assets/images/image.gif",
    badge: "Beginner",
  },
  crypto: {
    title: "Cryptocurrency 101",
    description: "Understand blockchain, wallets, and crypto markets.",
    banner: "/assets/images/crypto.gif",
    badge: "Beginner",
  },
};

// ---------- Candidate intro videos ----------
const INTRO_VIDEO_CANDIDATES = {
  crypto: [
    "/assets/images/Crypto_intro.mp4",
    "/assets/Crypto_intro.mp4",
    "/assets/Introcrypto.mp4",
    "/assets/Cryptolesson2.mp4",
    "/assets/videos/crypto-intro.mp4",
  ],
  investing: [
    "/assets/investment_intro.mp4",
    "/assets/videos/investment-intro.mp4",
  ],
};

async function resolveIntroSrc(courseId) {
  const candidates = INTRO_VIDEO_CANDIDATES[courseId] || [];
  for (const url of candidates) {
    try {
      const res = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (res.ok) return url;
    } catch {}
  }
  return null;
}

export default function Dashboard({ user: ssrUser }) {
  const router = useRouter();

  // 🔄 Local user state so we can refresh progress without changing the UI
  const [user, setUser] = useState(ssrUser);

  // Build course cards from CURRENT user state (so they update after refresh)
  const courses = useMemo(() => {
    return Object.keys(COURSE_META)
      .filter((id) => lessonContent[id])
      .map((id) => {
        const meta = COURSE_META[id];
        const totalLessons = Object.keys(lessonContent[id]).length || 0;

        // Cleaned, de-duped, and course-bounded completion list
        const raw = user?.progress?.[id]?.lessonsCompleted || [];
        const validIds = Object.keys(lessonContent[id]);
        const completed = [...new Set(raw)].filter((x) => validIds.includes(x));

        const progress = totalLessons
          ? Math.min(100, Math.round((completed.length / totalLessons) * 100))
          : 0;

        return {
          id,
          ...meta,
          totalLessons,
          completedLessons: completed.length,
          progress,
        };
      });
  }, [user]);

  // ===== Intro overlay state (unchanged) =====
  const [intro, setIntro] = useState({ open: false, id: null, src: "", error: false });
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!intro.open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [intro.open]);

  const routerPushCourse = (id) => router.push(`/dashboard/${id}`);
  const enterCourse = (id) => routerPushCourse(id);

  const handleCourseClick = async (id) => {
    const src = await resolveIntroSrc(id);
    if (src) {
      setIntro({ open: true, id, src, error: false });
      setIsMuted(true);
      setTimeout(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true; // required for autoplay
        v.play?.().catch(() => {});
      }, 0);
    } else {
      enterCourse(id);
    }
  };

  const handleToggleMute = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    try { await v.play(); } catch {}
  };

  // 🔁 PROGRESS REFRESH: on mount + on focus/visibility
  const refreshCourse = async (courseId) => {
    try {
      const res = await fetch(`/api/user/progress?courseId=${courseId}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setUser((prev) => ({
        ...prev,
        xp: data.xp ?? prev.xp,
        level: data.level ?? prev.level,
        progress: {
          ...(prev.progress || {}),
          [courseId]: {
            ...(prev.progress?.[courseId] || { lessonsCompleted: [] }),
            lessonsCompleted: data.lessonsCompleted || [],
          },
        },
      }));
    } catch {}
  };

  useEffect(() => {
    const courseIds = Object.keys(COURSE_META).filter((id) => lessonContent[id]);

    const refreshAll = () => courseIds.forEach((id) => refreshCourse(id));
    // run once on client mount
    refreshAll();

    // run whenever tab gains focus or becomes visible again
    const onFocus = () => refreshAll();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a15] text-white">
      {/* Background */}
      <Cloud />
      <div className="fixed inset-0 z-0 bg-black/30 pointer-events-none" />

      {/* Foreground */}
      <div className="relative z-10">
        <Header />

        <div className="px-6 md:px-8 py-12 max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-arcade text-center mb-10">
            Choose a course to begin
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <motion.article
                key={course.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleCourseClick(course.id)}
                className="cursor-pointer border border-yellow-500 rounded-lg bg-[#1e1e2e] shadow-xl p-4 flex flex-col justify-between"
              >
                <div className="relative w-full overflow-hidden rounded-t-lg bg-[#151524] aspect-[16/9] md:aspect-[5/3]">
                  <Image
                    src={course.banner}
                    alt={`${course.title} banner`}
                    fill
                    unoptimized
                    className="object-cover object-center select-none"
                    priority={course.id === "investing"}
                  />
                </div>

                <div className="mt-3 flex items-start justify-between gap-3">
                  <h2 className="whitespace-normal break-words leading-tight text-lg md:text-xl font-bold">
                    {course.title}
                  </h2>
                  <span className="shrink-0 self-start text-[0.7rem] md:text-sm bg-green-700 text-white px-2 py-1 rounded">
                    {course.badge}
                  </span>
                </div>

                <p className={`${comfortaa.className} text-sm md:text-base text-gray-300 mt-2`}>
                  {course.description}
                </p>

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

                <p className={`${comfortaa.className} text-pink-400 text-xs mt-2`}>
                  🕹 {course.completedLessons}/{course.totalLessons} Lessons Completed
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Intro overlay (unchanged) */}
        {intro.open && (
          <div className="fixed inset-0 z-[9999] bg-black grid grid-rows-[1fr_auto] [--safe-bottom:env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-center px-3">
              <div className="relative w-screen h-[calc(100vh-84px-var(--safe-bottom))]">
                <video
                  key={intro.src}
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                  src={intro.src}
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  autoPlay
                  poster={
                    intro.id === "crypto"
                      ? "/assets/images/crypto.png"
                      : "/assets/images/crypto1.gif"
                  }
                  onLoadedMetadata={() => {
                    const v = videoRef.current;
                    if (!v) return;
                    v.muted = isMuted;
                    v.play?.().catch(() => {});
                  }}
                  onCanPlay={() => {
                    const v = videoRef.current;
                    if (!v) return;
                    v.muted = isMuted;
                    v.play?.().catch(() => {});
                  }}
                  onEnded={() => enterCourse(intro.id)}
                  onError={() => {
                    setIntro((s) => ({ ...s, error: true }));
                    setTimeout(() => enterCourse(intro.id), 900);
                  }}
                  controls={false}
                  controlsList="noplaybackrate nodownload noremoteplayback"
                  disablePictureInPicture
                >
                  <source src={intro.src} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="pb-[max(12px,var(--safe-bottom))] pt-3 flex items-center justify-center gap-3">
              <button
                onClick={handleToggleMute}
                className="bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm px-3 py-2 rounded border border-white/30"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={() => enterCourse(intro.id)}
                className="bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm px-3 py-2 rounded border border-white/30"
                aria-label="Skip intro video"
              >
                Skip intro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- SSR ----------
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/sign_in", permanent: false } };
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, xp: true, level: true, progress: true },
  });
  return { props: { user } };
}
