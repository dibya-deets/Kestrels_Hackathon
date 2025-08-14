// components/Header.jsx
import Link from "next/link";
import { useRouter } from "next/router";
import { Press_Start_2P } from "next/font/google";
import { signOut } from "next-auth/react";

const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
  const router = useRouter();

  // Route-aware flags
  const p = router.pathname; // "/", "/dashboard", "/dashboard/[courseId]", "/dashboard/[courseId]/[lessonId]", "/dashboard/[courseId]/quiz"
  const isLanding    = p === "/";
  const isCoursePage = p === "/dashboard/[courseId]";
  const isLessonPage = p === "/dashboard/[courseId]/[lessonId]";
  const isQuizPage   = p === "/dashboard/[courseId]/quiz";

  // URL params
  const courseId = Array.isArray(router.query.courseId)
    ? router.query.courseId[0]
    : router.query.courseId;
  const lessonId = Array.isArray(router.query.lessonId)
    ? router.query.lessonId[0]
    : router.query.lessonId;

  // Right-side quiz "Back" link target
  const backToLessonHref = courseId
    ? `/dashboard/${courseId}/${lessonId || ""}`.replace(/\/$/, "")
    : "/dashboard";

  // CTA style
  const cta = `text-yellow-400 hover:text-yellow-300 px-1 transition-colors ${pressStart2P.className}`;

  // --- Best-effort: flush local quiz-pass flags before logout (unchanged) ---
  async function flushLocalProgress(timeoutMs = 1500) {
    if (typeof window === "undefined") return;

    const patterns = [
      /^quizPassed:([^:]+):([^:]+)$/,             // quizPassed:courseId:lessonId
      /^quiz:([^:]+):([^:]+):passed$/,            // quiz:courseId:lessonId:passed
      /^investerra_quiz_passed_([^_]+)_([^_]+)$/, // investerra_quiz_passed_course_lesson
      /^quiz_passed_([^_]+)_([^_]+)$/,            // quiz_passed_course_lesson
    ];

    const tasks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      for (const re of patterns) {
        const m = key.match(re);
        if (m) {
          const cId = m[1];
          const lId = m[2];
          tasks.push(
            fetch("/api/user/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                course: cId,
                lessonId: lId,
                passed: true,
                xpGained: 40,
              }),
            })
              .then((res) => {
                if (res.ok) localStorage.removeItem(key);
              })
              .catch(() => {})
          );
          break;
        }
      }
    }

    await Promise.race([
      Promise.allSettled(tasks),
      new Promise((resolve) => setTimeout(resolve, timeoutMs)),
    ]);
  }

  async function handleLogout() {
    try {
      await flushLocalProgress();
    } finally {
      await signOut({ callbackUrl: "/sign_in", redirect: true });
    }
  }

  return (
    <header className="bg-[#0D0E1D] text-white px-4 sm:px-6 py-4 flex items-center justify-between relative">
      {/* Left: Back on lesson page AND course page (updated logic) */}
      <div className="flex items-center min-w-[80px]">
        {(isLessonPage || isCoursePage) && (
          <button
            onClick={() => {
              if (isLessonPage) {
                // From a lesson, go to its course overview
                router.push(`/dashboard/${router.query.courseId}`);
              } else if (isCoursePage) {
                // From a course overview, ALWAYS go to dashboard (no history back)
                router.push("/dashboard");
              }
            }}
            className={cta}
            aria-label="Back"
          >
            Back
          </button>
        )}
      </div>

      {/* Center: InvesTerra logo */}
      <div className={`absolute left-1/2 -translate-x-1/2 flex items-center text-yellow-400 text-lg sm:text-xl ${pressStart2P.className}`}>
        <img
          src="/assets/mascot.png"
          alt=""
          aria-hidden="true"
          className="w-6 h-6 mr-2"
        />
        InvesTerra
      </div>

      {/* Right: Home / Dashboard / Logout (quiz keeps its Back link) */}
      <nav className="flex items-center gap-4 min-w-[80px] justify-end">
        {isQuizPage ? (
          <Link href={backToLessonHref} className={cta}>
            Back
          </Link>
        ) : (
          <button
            onClick={() => router.push("/")}
            className={cta}
            aria-label="Home"
          >
            Home
          </button>
        )}

        {(isCoursePage || isLessonPage) && (
          <Link href="/dashboard" className={cta}>
            Dashboard
          </Link>
        )}

        {!isLanding && (
          <button onClick={handleLogout} className={cta} aria-label="Logout">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
