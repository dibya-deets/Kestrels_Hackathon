import { useRouter } from "next/router";
import lessonContent from "@/data/lessonContent";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { Comfortaa } from 'next/font/google';
import Image from "next/image";

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['400'],
});

export default function LessonPage({ user, courseId, lessonId }) {
  const router = useRouter();
  const [lesson, setLesson] = useState(null);
  const [openedSubLessons, setOpenedSubLessons] = useState([]);
  const [markedOpened, setMarkedOpened] = useState([]);
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const hasMarkedComplete = useRef(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    if (!lessonContent[courseId]) return;
    const courseLessons = lessonContent[courseId];
    const currentLesson = courseLessons[lessonId];
    if (!currentLesson) return;
    setLesson(currentLesson);
  }, [courseId, lessonId]);

  const handleLessonComplete = async () => {
    if (hasMarkedComplete.current) return;
    hasMarkedComplete.current = true;
    try {
      await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course: courseId,
          lessonId: lessonId,
          xpGained: 20,
        }),
      });
    } catch (err) {
      console.error("Error marking lesson complete:", err);
    }
  };

  const handleQuizSubmit = () => {
    const correctCount = lesson.quiz.filter(
      (q, i) => selectedAnswers[i] === q.answer
    ).length;
    if (correctCount === lesson.quiz.length) {
      setQuizPassed(true);
      handleLessonComplete();
      alert("🎉 Quiz passed!");
    } else {
      alert("Some answers are incorrect. Try again!");
    }
  };

  const toggleSubLesson = (id) => {
    if (!markedOpened.includes(id)) {
      setMarkedOpened([...markedOpened, id]);
    }

    setOpenedSubLessons((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  if (!lesson) return <p className="text-white p-6">Loading lesson...</p>;

  const allSubLessonsOpened = lesson.subLessons.every((sub) =>
    markedOpened.includes(sub.id)
  );

  return (
    <div className="min-h-screen bg-[#0D0E1D] text-white">
     <Header showBackToCourse />

      {/* Hero Section with animated clouds */}
      <div
        className="w-full bg-cover bg-center px-6 py-12 flex flex-col items-start justify-center"
        style={{
         backgroundImage: 'url("/assets/crypto1.png")',
          minHeight: "300px",
        }}
      >
        <div className="flex justify-between w-full items-center">
          <h1 className="text-3xl md:text-4xl text-white font-bold font-['Press_Start_2P']">
            Lesson {lesson.id} – {lesson.title}
          </h1>
          {/* <button
            onClick={() => router.push(`/dashboard/${courseId}`)}
            className="bg-gray-700 text-white font-bold px-4 py-2 rounded hover:bg-gray-600"
          >
            ← Back to Course
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-10">
        {/* Sub-lessons */}
        <div className="md:col-span-2 bg-[#1A1B2D] p-6 rounded-xl border border-gray-700 space-y-4">
          {lesson.subLessons.map((sub, idx) => {
            const isOpen = openedSubLessons.includes(sub.id);
            return (
              <div key={sub.id} className="border border-gray-700 rounded-md">
                <button
                  onClick={() => toggleSubLesson(sub.id)}
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

          {/* Lesson Quiz */}
          <div className="mt-6 border border-gray-700 rounded-md overflow-hidden">
            <button
              disabled={!allSubLessonsOpened}
              onClick={() => setQuizOpen((prev) => !prev)}
              className={`w-full flex justify-between items-center px-4 py-3 text-left font-['Press_Start_2P'] text-sm ${
                allSubLessonsOpened
                  ? "bg-[#24253b] cursor-pointer"
                  : "bg-gray-800 cursor-not-allowed opacity-50"
              }`}
            >
              <span>Lesson Quiz</span>
              {quizOpen ? <FaChevronDown /> : <FaChevronRight />}
            </button>

            <AnimatePresence>
              {quizOpen && allSubLessonsOpened && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`px-4 py-3 text-white ${comfortaa.className}`}
                >
                  {lesson.quiz.map((q, qi) => (
                    <div key={qi} className="mb-4">
                      <p className="mb-2">{q.question}</p>
                      {q.options.map((opt, oi) => (
                        <label key={oi} className="block">
                          <input
                            type="radio"
                            name={`q-${qi}`}
                            value={oi}
                            checked={selectedAnswers[qi] === oi}
                            onChange={() =>
                              setSelectedAnswers({
                                ...selectedAnswers,
                                [qi]: oi,
                              })
                            }
                          />
                          <span className="ml-2">{opt}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                  <button
                    onClick={handleQuizSubmit}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded mt-4"
                  >
                    Submit Quiz
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-[#1A1B2D] p-4 rounded-xl border border-gray-700 space-y-4">
          <div className={`border-b border-gray-600 pb-3 ${comfortaa.className}`}>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p>XP: {user.xp}</p>
            <p>Level: {user.level}</p>
          </div>

          <div className={`border-b border-gray-600 pb-3 ${comfortaa.className}`}>
            <h3 className="font-bold mb-1">Course Progress</h3>
            <p>
              Lessons Completed:{" "}
              {user.progress?.[courseId]?.lessonsCompleted?.length || 0}
            </p>
            <p>XP Earned: {user.xp}</p>
          </div>

          <div className={`border-b border-gray-600 pb-3 ${comfortaa.className}`}>
            <h3 className="font-bold mb-1">Lesson Progress</h3>
            <ul className="space-y-1">
              {lesson.subLessons.map((sub, idx) => (
                <li
                  key={sub.id}
                  className={`text-sm ${
                    markedOpened.includes(sub.id)
                      ? "text-yellow-400 font-semibold"
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
            <div className="flex gap-2 mt-2">
              <span className="w-8 h-8 bg-yellow-400 rounded-full" />
              <span className="w-8 h-8 bg-gray-500 rounded-full" />
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
      xp: true,
      level: true,
      progress: true,
    },
  });

  return { props: { user, courseId, lessonId } };
}
