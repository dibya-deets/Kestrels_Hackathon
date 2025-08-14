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

  // ===== Progress refresh (kept) =====
  const refreshProgress = async () => {
    try {
      const res = await fetch(`/api/user/progress?courseId=${courseId}`);
      if (!res.ok) return null;
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

  // ===== Derived values (CLEANED) =====
  const courseLessons = useMemo(() => lessonContent[courseId] || {}, [courseId]);
  const validLessonIds = useMemo(() => Object.keys(courseLessons), [courseLessons]);

  const completedRaw = user.progress?.[courseId]?.lessonsCompleted || [];
  const completedLessonsClean = useMemo(
    () => [...new Set(completedRaw)].filter((id) => validLessonIds.includes(id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(completedRaw), validLessonIds.join("|")]
  );

  const totalLessons = validLessonIds.length;
  const unlockedCount = Math.min(completedLessonsClean.length, totalLessons);

  // make a Set for faster membership checks (for sub-lesson list)
  const markedSet = useMemo(() => new Set(markedOpened.map(toId)), [markedOpened]);

  if (!lesson) return <p className="text-white p-6">Loading lesson...</p>;

  const allSubLessonsOpened = lesson.subLessons.every((s) => markedSet.has(toId(s.id)));
  const levelLabel = user.level || "Seedling";
  const xp = user.xp || 0;
  const xpPct = Math.min(((xp % 100) / 100) * 100, 100);
  const heroBg = courseId === "crypto" ? "/assets/crypto1.gif" : "/assets/investing1.gif";

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
            <p>Lessons Completed: {completedLessonsClean.length}</p>
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

          {/* Course Badges — centered PNGs in circles */}
          <div className={`${comfortaa.className} border-t border-gray-600 pt-4`}>
            <h3 className="font-bold mb-3">Course Badges</h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "b1", img: "/assets/images/badges/badge1.png", label: "First Steps" },
                { id: "b2", img: "/assets/images/badges/badge2.png", label: "Halfway Hero" },
                { id: "b3", img: "/assets/images/badges/badge3.png", label: "Course Conqueror" },
              ].map((b, i) => {
                const unlocked = unlockedCount >= i + 1;
                return (
                  <div key={b.id} className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.28, delay: i * 0.05 }}
                      className={[
                        "relative rounded-full overflow-hidden select-none bg-black",
                        "flex items-center justify-center",               // center the PNG
                        "w-16 h-16 md:w-10 md:h-10",                       // circle size
                        unlocked ? "ring-2 ring-yellow-300/70 shadow" : "ring-2 ring-gray-600/60",
                      ].join(" ")}
                      aria-label={`${b.label} ${unlocked ? "(unlocked)" : "(locked)"}`}
                      title={b.label}
                    >
                      {/* PNG fills most of the circle, stays perfectly centered */}
                      <img
                        src={b.img}
                        alt={b.label}
                        className={[
                          "className='block object-contain object-center w-[90%] h-[90%] md:w-[94%] md:h-[94%] scale-[7.08]'"
                        ].join(" ")}
                      />
                      {!unlocked && (
                        <div className="pointer-events-none absolute inset-0 bg-black/25 flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-85">
                            <path fill="#e5e7eb" d="M17 8V7a5 5 0 1 0-10 0v1H5v13h14V8h-2Zm-8 0V7a3 3 0 1 1 6 0v1H9Zm3 9a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"/>
                          </svg>
                        </div>
                      )}
                    </motion.div>

                    <span className="mt-2 text-[11px] md:text-xs text-gray-200">{b.label}</span>
                    <span className={`text-[10px] ${unlocked ? "text-emerald-400" : "text-gray-400"}`}>
                      {unlocked ? "Unlocked" : "Locked"}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-3 text-[11px] text-gray-400">
              Unlock a badge each time you complete a lesson quiz.
            </p>
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
