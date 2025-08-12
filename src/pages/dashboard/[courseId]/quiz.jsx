// src/pages/dashboard/[courseId]/quiz.jsx
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import PixelClimber from "@/components/CryptoClimb/PixelClimber";
import rawQuestions from "@/data/cryptoClimbQuestions";

// ===== Helpers =====
const ATTEMPT_SIZE = 10;

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleN(arr, n) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(n, a.length));
}

function prepareQuestions(qs) {
  return shuffleArray(qs).map((q) => {
    const withIdx = q.options.map((text, idx) => ({ text, idx }));
    const shuffled = shuffleArray(withIdx);
    const newAnswerIndex = shuffled.findIndex((o) => o.idx === q.answerIndex);
    return { ...q, options: shuffled.map((o) => o.text), answerIndex: newAnswerIndex };
  });
}

export default function CryptoClimbQuiz({ courseId, lessonId }) {
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shake, setShake] = useState(false);
  const [coinBurstKey, setCoinBurstKey] = useState(0);

  useEffect(() => {
    const picked = sampleN(rawQuestions, ATTEMPT_SIZE);
    setQuestions(prepareQuestions(picked));
  }, []);

  const threshold = useMemo(() => Math.ceil(0.8 * Math.max(1, totalQuestions)), [totalQuestions]);
  const climbLevel = score;

  const current = questions[currentIndex];

  const handleOptionClick = (idx) => {
    if (answered || !current) return;
    setSelectedOption(idx);

    const isCorrect = idx === current.answerIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      setCoinBurstKey((k) => k + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
    setAnswered(true);
  };

  const handleNext = () => {
    if (!answered) return;
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setShowResults(true);
      try {
        const key = `cryptoClimb:${courseId}:${lessonId}`;
        localStorage.setItem(key, JSON.stringify({ score, total: totalQuestions, at: Date.now() }));
      } catch {}
    }
  };

  const handleRetry = () => {
    const picked = sampleN(rawQuestions, ATTEMPT_SIZE);
    setQuestions(prepareQuestions(picked));
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  const handleContinue = async () => {
    try {
      await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course: courseId,
          lessonId,
          passed: true, // no XP
        }),
      });
    } catch (e) {
      console.error(e);
    }
    const nextLesson = Number(lessonId) + 1;
    router.push(`/dashboard/${courseId}/${Number.isFinite(nextLesson) ? nextLesson : ""}`.replace(/\/$/, ""));
  };

  const Coins = ({ k }) => (
    <div key={k} className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className="absolute block w-2.5 h-2.5 rounded-full bg-yellow-300/90 shadow"
          style={{
            left: `${50 + (Math.random() * 40 - 20)}%`,
            top: `${42 + (Math.random() * 18 - 9)}%`,
            animation: `coin-pop ${700 + Math.random() * 300}ms ease-out forwards`,
            transform: `translate(${Math.random() * 80 - 40}px, ${Math.random() * -120 - 40}px)`,
            opacity: 0.9,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes coin-pop {
          0% { transform: translate(0, 0) scale(0.6); opacity: 1; }
          100% { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0E1D] text-white">
      <Header showBackToCourse />

      {/* (Hero removed) */}

      {/* Tip banner */}
      <div className="bg-[#1A1B2D] border-y border-gray-700/60">
        <div className="mx-auto max-w-6xl px-6 py-3 text-sm text-gray-300">
          Tip: Study all sub-lessons before attempting the quiz.
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-2">
        {/* Left: Question card */}
        <div className="relative">
          <AnimatePresence>
            {answered && selectedOption === current?.answerIndex && <Coins k={coinBurstKey} />}
          </AnimatePresence>

          <div className="rounded-xl border border-gray-700 bg-[#1A1B2D] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs text-gray-300">
                Question <span className="font-semibold text-white">{currentIndex + 1}</span> / {totalQuestions}
              </div>
              <div className="text-xs text-gray-300">
                Score <span className="font-semibold text-white">{score}</span>
              </div>
            </div>

            {current ? (
              <>
                <h2 className="mb-4 text-lg font-semibold md:text-xl">{current.question}</h2>

                <div className="space-y-3" role="listbox" aria-label="Answer options">
                  {current.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = answered && idx === current.answerIndex;
                    const isWrong = answered && isSelected && !isCorrect;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleOptionClick(idx)}
                        disabled={answered}
                        aria-pressed={isSelected}
                        className={[
                          "w-full rounded-lg border px-4 py-3 text-left transition",
                          "focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-0",
                          answered
                            ? isCorrect
                              ? "border-emerald-400 bg-emerald-500/10"
                              : isWrong
                              ? "border-rose-400 bg-rose-500/10"
                              : "border-gray-700 bg-[#15162a]"
                            : "border-gray-700 bg-[#15162a] hover:border-indigo-400/70 hover:bg-[#16183a]",
                        ].join(" ")}
                      >
                        <span className="font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!answered}
                    className={[
                      "rounded-lg px-4 py-2 font-semibold",
                      answered ? "bg-indigo-500 hover:bg-indigo-600" : "cursor-not-allowed bg-gray-700 opacity-60",
                    ].join(" ")}
                  >
                    {currentIndex + 1 < totalQuestions ? "Next" : "Show results"}
                  </button>
                </div>
              </>
            ) : (
              <p>Loading questions…</p>
            )}
          </div>
        </div>

        {/* Right: Climb panel + meta */}
        <div className="space-y-4">
          <PixelClimber climbLevel={climbLevel} totalFloors={totalQuestions || 10} shake={shake} />
          <div className="rounded-xl border border-gray-700 bg-[#1A1B2D] p-4">
            <div className="text-sm text-gray-300">
              Required to pass: <span className="font-semibold text-white">≥ {threshold}</span> / {totalQuestions}
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded bg-gray-800">
              <div
                className="h-full bg-indigo-500 transition-all"
                style={{ width: `${(climbLevel / Math.max(1, totalQuestions)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results overlay */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl rounded-2xl border border-gray-700 bg-[#121329] p-6 text-center"
            >
              {score >= threshold ? (
                <>
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {Array.from({ length: 80 }).map((_, i) => (
                      <span
                        key={i}
                        className="absolute block h-3 w-1.5"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `-${Math.random() * 20 + 5}%`,
                          background: `hsl(${Math.random() * 360} 80% 60%)`,
                          transform: `rotate(${Math.random() * 360}deg)`,
                          animation: `confetti-fall ${1200 + Math.random() * 1200}ms linear forwards`,
                        }}
                      />
                    ))}
                    <style jsx global>{`
                      @keyframes confetti-fall {
                        to { transform: translateY(120vh) rotate(360deg); opacity: 0.9; }
                      }
                    `}</style>
                  </div>

                  <h2 className="text-2xl font-black text-emerald-300 md:text-3xl">PASS — Reach the castle!</h2>
                  <p className="mt-2 text-gray-200">
                    You scored <span className="font-semibold">{score}</span> / {totalQuestions}
                  </p>
                  <button
                    onClick={handleContinue}
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold hover:bg-emerald-600"
                  >
                    Continue to Next Level
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-rose-300 md:text-3xl">Try Again</h2>
                  <p className="mt-2 text-gray-200">
                    You scored <span className="font-semibold">{score}</span> / {totalQuestions}. You need{" "}
                    <span className="font-semibold">{threshold}</span> to pass.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-5 py-2.5 font-semibold hover:bg-indigo-600"
                    >
                      Retry Quiz
                    </button>
                    <button
                      onClick={() => router.push(`/dashboard/${courseId}`)}
                      className="inline-flex items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 font-semibold hover:bg-gray-600"
                    >
                      Back to Course
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return { redirect: { destination: "/sign_in", permanent: false } };
  }
  const { courseId } = ctx.params;
  const { lessonId } = ctx.query;

  return {
    props: {
      courseId,
      lessonId: Array.isArray(lessonId) ? lessonId[0] : lessonId || "1",
    },
  };
}
