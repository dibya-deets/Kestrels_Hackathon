// src/pages/dashboard/[courseId]/[lessonId].jsx
import { useRouter } from "next/router";
import lessonContent from "@/data/lessonContent";
import { useState, useEffect, useRef, useMemo } from "react";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { Comfortaa } from "next/font/google";
import Image from "next/image";

const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400"] });

// --- Badge logic helper (exactly 3) ---
function getCourseBadges(completedCount, total) {
  const half = Math.ceil(total / 2);
  return [
    { id: "first", label: "First Steps", desc: "Complete your first lesson", earned: completedCount >= 1, img: "/assets/images/badges/badge6.png" },
    { id: "half",  label: "Halfway Hero", desc: `Complete ${half}+ lessons`,    earned: completedCount >= half, img: "/assets/images/badges/badge5.png" },
    { id: "all",   label: "Course Conqueror", desc: "Complete all lessons",      earned: completedCount >= total, img: "/assets/images/badges/badge4.png" },
  ];
}

// --- helpers for persistent "read" sub-lessons + resume point ---
const toId = (x) => String(x);
const READ_KEY = (cid, lid) => `investerra:readSubs:${cid}:${lid}`;
const LAST_KEY = (cid, lid) => `investerra:lastOpenSub:${cid}:${lid}`;

export default function LessonPage({ user: initialUser, courseId, lessonId }) {
  const router = useRouter();
  const [lesson, setLesson] = useState(null);

  // state
  const [user, setUser] = useState(initialUser);
  const [openedSubLessons, setOpenedSubLessons] = useState([]); // UI open state
  const [markedOpened, setMarkedOpened] = useState([]);         // PERSISTED "read" IDs (strings)
  const [videoOpen, setVideoOpen] = useState(true);
  const hasMarkedComplete = useRef(false);

  // derived
  const totalLessons = Object.keys(lessonContent[courseId] || {}).length;
  const prevCompletedCountRef = useRef(
    (initialUser?.progress?.[courseId]?.lessonsCompleted || []).length
  );

  // fetch lesson meta
  useEffect(() => {
    const courseLessons = lessonContent[courseId];
    if (!courseLessons) return;
    const currentLesson = courseLessons[lessonId];
    if (currentLesson) setLesson({ ...currentLesson, id: lessonId });
  }, [courseId, lessonId]);

  // --- Hydrate persisted "read" sub-lessons on load/course/lesson change
  useEffect(() => {
    try {
      const raw = localStorage.getItem(READ_KEY(courseId, lessonId));
      if (!raw) return;

      const saved = JSON.parse(raw);
      const savedStr = Array.isArray(saved) ? saved.map(toId) : [];

      // Intersect with current sub-lessons (normalize both to string)
      const currentIds = (lessonContent[courseId]?.[lessonId]?.subLessons || []).map(s => toId(s.id));
      const currentSet = new Set(currentIds);
      const filtered = savedStr.filter(id => currentSet.has(id));

      setMarkedOpened(filtered);
    } catch {}
  }, [courseId, lessonId]);

  // --- Persist whenever "markedOpened" changes
  useEffect(() => {
    try {
      localStorage.setItem(READ_KEY(courseId, lessonId), JSON.stringify(markedOpened));
    } catch {}
  }, [markedOpened, courseId, lessonId]);

  // ✅ NEW: when arriving (or returning), open the NEXT UNREAD sub-lesson
  // If all are read, open the last saved "last open" id (or the final sub).
  useEffect(() => {
    if (!lesson) return;
    const subs = lesson.subLessons || [];
    if (!subs.length) return;

    const subIds = subs.map(s => toId(s.id));
    const markedSetLocal = new Set(markedOpened.map(toId));

    // Next unread
    let targetId = subIds.find((id) => !markedSetLocal.has(id));

    // If all read, try previously saved last open; fallback to last sub
    if (!targetId) {
      try {
        const savedLast = localStorage.getItem(LAST_KEY(courseId, lessonId));
        if (savedLast && subIds.includes(savedLast)) {
          targetId = savedLast;
        } else {
          targetId = subIds[subIds.length - 1];
        }
      } catch {
        targetId = subIds[subIds.length - 1];
      }
    }

    setOpenedSubLessons([targetId]);
  }, [lesson, markedOpened, courseId, lessonId]);

  // refresh progress and show newly-earned badges (if any)
  const refreshProgress = async () => {
    try {
      const res = await fetch(`/api/user/progress?courseId=${courseId}`);
      if (!res.ok) return null;
      const data = await res.json();

      const before = prevCompletedCountRef.current;
      const after = (data.lessonsCompleted || []).length;

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

      if (after > before) {
        const beforeBadges = getCourseBadges(before, totalLessons);
        const afterBadges = getCourseBadges(after, totalLessons);
        const newly = afterBadges.filter((b, i) => b.earned && !beforeBadges[i].earned);
        if (newly.length) {
          alert(`New badge${newly.length > 1 ? "s" : ""} earned!\n${newly.map(b => `🏅 ${b.label}`).join("\n")}`);
        }
        prevCompletedCountRef.current = after;
      }
      return data;
    } catch (e) {
      console.error("refreshProgress failed", e);
      return null;
    }
  };

  // ✅ QUIZ PASS SYNC
  const quizFlagKeys = [
    `quizPassed:${courseId}:${lessonId}`,
    `quiz:${courseId}:${lessonId}:passed`,
    `investerra_quiz_passed_${courseId}_${lessonId}`,
    `quiz_passed_${courseId}_${lessonId}`,
  ];
  const checkQuizPassedFlag = () => {
    try {
      let found = false;
      for (const k of quizFlagKeys) {
        const v = localStorage.getItem(k);
        if (v && v !== "false" && v !== "0") {
          found = true;
          localStorage.removeItem(k);
        }
      }
      if (found) refreshProgress();
    } catch {}
  };
  useEffect(() => {
    checkQuizPassedFlag();
    const onFocus = () => { checkQuizPassedFlag(); refreshProgress(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, lessonId]);

  // mark complete manually (kept)
  const handleLessonComplete = async () => {
    if (hasMarkedComplete.current) return;
    hasMarkedComplete.current = true;
    try {
      await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId, xpGained: 20 }),
      });
      await refreshProgress();
      alert("🎉 Lesson complete! +20 XP");
    } catch (err) {
      console.error("Error marking lesson complete:", err);
    }
  };

  // open/close accordion; first open marks as "read" and persists (normalize to string)
  const toggleSubLesson = (id) => {
    const idStr = toId(id);

    // Mark as read the first time this sub-lesson is opened
    if (!markedOpened.includes(idStr)) {
      setMarkedOpened((prev) => [...prev, idStr]); // mark "read"
    }

    // Save "resume point" = last opened sub-lesson
    try {
      localStorage.setItem(LAST_KEY(courseId, lessonId), idStr);
    } catch {}

    // Toggle UI open state
    setOpenedSubLessons((prev) =>
      prev.includes(idStr) ? prev.filter((x) => x !== idStr) : [...prev, idStr]
    );
  };

  // make a Set for faster membership checks
  const markedSet = useMemo(() => new Set(markedOpened.map(toId)), [markedOpened]);

  if (!lesson) return <p className="text-white p-6">Loading lesson...</p>;

  const allSubLessonsOpened = lesson.subLessons.every((s) => markedSet.has(toId(s.id)));
  const levelLabel = user.level || "Seedling";
  const xp = user.xp || 0;
  const xpPct = Math.min(((xp % 100) / 100) * 100, 100);
  const completedLessons = user.progress?.[courseId]?.lessonsCompleted || [];
  const badges = getCourseBadges(completedLessons.length, totalLessons);
  const heroBg = courseId === "crypto" ? "/assets/images/crypto.gif" : "/assets/images/image.gif";

  const startGamifiedQuiz = () => {
    try { localStorage.setItem("lastQuizLesson", JSON.stringify({ courseId, lessonId })); } catch {}
    router.push(`/dashboard/${courseId}/quiz?lessonId=${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0E1D] text-white">
      <Header />

      {/* Hero */}
      <div
        className="w-full bg-cover bg-center px-6 py-12 flex flex-col items-start justify-center"
        style={{ backgroundImage: `url("${heroBg}")`, minHeight: "300px" }}
      >
        <div className="flex justify-between w-full items-center">
          <h1 className="text-3xl md:text-4xl text-white font-bold font-['Press_Start_2P']">
            Lesson {lesson.id} – {lesson.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-10">
        {/* Content */}
        <div className="md:col-span-2 bg-[#1A1B2D] p-6 rounded-xl border border-gray-700 space-y-4">
          {/* Intro Video */}
          {lesson.video?.src && (
            <div className="border border-gray-700 rounded-md">
              <button
                onClick={() => setVideoOpen((v) => !v)}
                className={`w-full flex justify-between items-center px-4 py-3 text-left font-['Press_Start_2P'] text-sm ${
                  videoOpen ? "bg-[#24253b]" : "bg-[#1A1B2D]"
                }`}
              >
                <span>{lesson.video.title || "Intro Video"}</span>
                {videoOpen ? <FaChevronDown /> : <FaChevronRight />}
              </button>

              <AnimatePresence>
                {videoOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-3"
                  >
                    <div className="rounded-lg overflow-hidden bg-black">
                      <video src={lesson.video.src} poster={lesson.video.poster} controls preload="metadata" className="w-full h-auto" />
                    </div>
                    <p className={`mt-2 text-xs text-gray-300 ${comfortaa.className}`}>
                      Tip: Use the controls to play/pause or scrub through the video.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Sub Lessons */}
          {lesson.subLessons.map((sub, idx) => {
            const idStr = toId(sub.id);
            const isOpen = openedSubLessons.includes(idStr);
            return (
              <div key={idStr} className="border border-gray-700 rounded-md">
                <button
                  onClick={() => toggleSubLesson(idStr)}
                  className={`w-full flex justify-between items-center px-4 py-3 text-left font-['Press_Start_2P'] text-sm ${
                    isOpen ? "bg-[#24253b]" : "bg-[#1A1B2D]"
                  }`}
                >
                  <span>{idx + 1}. {sub.title}</span>
                  {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                </button>
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

          {/* Gamified Quiz CTA */}
          <div className="mt-6 border border-gray-700 rounded-md overflow-hidden">
            <div className={`w-full flex items-center justify-between px-4 py-3 text-left font-['Press_Start_2P'] text-sm ${allSubLessonsOpened ? "bg-[#24253b]" : "bg-gray-800 opacity-60"}`}>
              <span>Lesson Quiz</span>
              <button
                onClick={startGamifiedQuiz}
                disabled={!allSubLessonsOpened}
                className={["rounded-md px-4 py-2 font-semibold", allSubLessonsOpened ? "bg-indigo-500 hover:bg-indigo-600" : "cursor-not-allowed bg-gray-700"].join(" ")}
              >
                Start Gamified Quiz
              </button>
            </div>
            {!allSubLessonsOpened && (
              <div className={`px-4 py-3 text-xs text-gray-300 ${comfortaa.className}`}>
                Unlocks after you open all sub-lessons at least once.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-[#1A1B2D] p-4 rounded-xl border border-gray-700 space-y-4">
          <div className={`border-b border-gray-600 pb-3 ${comfortaa.className}`}>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p>Level: {levelLabel}</p>
            <p>XP: {xp}</p>
            <div className="w-full bg-gray-700 h-2 rounded overflow-hidden mt-2">
              <div className="bg-yellow-400 h-2" style={{ width: `${xpPct}%` }} />
            </div>
            <p className="text-xs mt-1">{100 - (xp % 100)} XP to next level</p>
          </div>

          <div className={`border-b border-gray-600 pb-3 ${comfortaa.className}`}>
            <h3 className="font-bold mb-1">Course Progress</h3>
            <p>Lessons Completed: {completedLessons.length}</p>
            <p>Total Lessons: {totalLessons}</p>
          </div>

          <div className={`border-b border-gray-600 pb-3 ${comfortaa.className}`}>
            <h3 className="font-bold mb-1">Lesson Progress</h3>
            <ul className="space-y-1">
              {lesson.subLessons.map((sub, idx) => {
                const idStr = toId(sub.id);
                const read = markedSet.has(idStr);
                return (
                  <li
                    key={idStr}
                    className={`text-sm ${read ? "text-yellow-400 font-semibold" : "text-gray-300"}`}
                  >
                    {idx + 1}. {sub.title}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Course Badges */}
          <div className={comfortaa.className}>
            <h3 className="font-bold">Course Badges</h3>
            <div className="mt-6 grid grid-cols-3 gap-8 place-items-center">
              {badges.slice(0, 3).map((b) => {
                const locked = !b.earned;
                return (
                  <div key={b.id} title={`${b.label} — ${b.desc}`} className="text-center">
                    <div
                      className={[
                        "relative w-24 h-24 md:w-28 md:h-28",
                        locked ? "grayscale blur-[1.5px] opacity-60" : "opacity-100",
                        "transition-all duration-300",
                      ].join(" ")}
                      style={{ imageRendering: "pixelated" }}
                    >
                      <Image src={b.img} alt={b.label} fill className="object-contain select-none" />
                    </div>
                    <span className="block text-sm md:text-base mt-3 leading-tight">{b.label}</span>
                  </div>
                );
              })}
            </div>
            {!badges.every((b) => b.earned) && (
              <p className="text-xs text-gray-400 mt-3">Complete lessons to unlock badges.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// SSR initial user
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/sign_in", permanent: false } };
  }
  const { courseId, lessonId } = context.params;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, xp: true, level: true, progress: true },
  });
  return { props: { user, courseId, lessonId } };
}
