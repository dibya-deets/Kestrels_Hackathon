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

const toId = (x) => String(x);
const READ_KEY = (cid, lid) => `investerra:readSubs:${cid}:${lid}`;
const LAST_KEY = (cid, lid) => `investerra:lastOpenSub:${cid}:${lid}`;

export default function LessonPage({ user: initialUser, courseId, lessonId }) {
  const router = useRouter();
  const [lesson, setLesson] = useState(null);
  const [user, setUser] = useState(initialUser);
  const [openedSubLessons, setOpenedSubLessons] = useState([]);
  const [markedOpened, setMarkedOpened] = useState([]);
  const [videoOpen, setVideoOpen] = useState(true);
  const hasMarkedComplete = useRef(false);

  useEffect(() => {
    const courseLessons = lessonContent[courseId];
    if (!courseLessons) return;
    const currentLesson = courseLessons[lessonId];
    if (currentLesson) setLesson({ ...currentLesson, id: lessonId });
  }, [courseId, lessonId]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(READ_KEY(courseId, lessonId));
      if (!raw) return;
      const saved = JSON.parse(raw);
      const savedStr = Array.isArray(saved) ? saved.map(toId) : [];
      const currentIds = (lessonContent[courseId]?.[lessonId]?.subLessons || []).map(s => toId(s.id));
      const currentSet = new Set(currentIds);
      const filtered = savedStr.filter(id => currentSet.has(id));
      setMarkedOpened(filtered);
    } catch {}
  }, [courseId, lessonId]);

  useEffect(() => {
    try {
      localStorage.setItem(READ_KEY(courseId, lessonId), JSON.stringify(markedOpened));
    } catch {}
  }, [markedOpened, courseId, lessonId]);

  useEffect(() => {
    if (!lesson) return;
    const subs = lesson.subLessons || [];
    if (!subs.length) return;
    const subIds = subs.map(s => toId(s.id));
    const markedSetLocal = new Set(markedOpened.map(toId));
    let targetId = subIds.find((id) => !markedSetLocal.has(id));
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

  const toggleSubLesson = (id) => {
    const idStr = toId(id);
    if (!markedOpened.includes(idStr)) {
      setMarkedOpened((prev) => [...prev, idStr]);
    }
    try {
      localStorage.setItem(LAST_KEY(courseId, lessonId), idStr);
    } catch {}
    setOpenedSubLessons((prev) =>
      prev.includes(idStr) ? prev.filter((x) => x !== idStr) : [...prev, idStr]
    );
  };

  const courseLessons = useMemo(() => lessonContent[courseId] || {}, [courseId]);
  const validLessonIds = useMemo(() => Object.keys(courseLessons), [courseLessons]);
  const completedRaw = user.progress?.[courseId]?.lessonsCompleted || [];
  const completedLessonsClean = useMemo(
    () => [...new Set(completedRaw)].filter((id) => validLessonIds.includes(id)),
    [JSON.stringify(completedRaw), validLessonIds.join("|")]
  );
  const totalLessons = validLessonIds.length;
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
                      className={`px-4 py-3 text-sm text-white space-y-3 leading-relaxed ${comfortaa.className}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        dangerouslySetInnerHTML={{
                          __html: sub.content
                            .replace(/^([A-Z][^\n]+):/gm, '<strong class="block text-yellow-300">$1:</strong>')
                            .replace(/• (.+)/g, '<li class="ml-4 list-disc">$1</li>')
                            .replace(/\n\d\) (.+)/g, '<li class="ml-4 list-decimal">$1</li>')
                            .replace(/\n/g, '<br/>')
                        }}
                      />
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
    select: { name: true, xp: true, level: true, progress: true },
  });
  return { props: { user, courseId, lessonId } };
}
