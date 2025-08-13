// components/Header.jsx
import Link from "next/link";
import { useRouter } from "next/router";
import { Press_Start_2P } from "next/font/google";
import { signOut } from "next-auth/react";

const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
  const router = useRouter();

  // Route-aware buttons
  const p = router.pathname; // "/", "/dashboard", "/dashboard/[courseId]", "/dashboard/[courseId]/[lessonId]", "/dashboard/[courseId]/quiz"
  const isLanding = p === "/";
  const isCoursePage = p === "/dashboard/[courseId]";
  const isLessonPage = p === "/dashboard/[courseId]/[lessonId]";
  const isQuizPage = p === "/dashboard/[courseId]/quiz";

  // Pull ids from the URL for quiz back link
  const courseId = Array.isArray(router.query.courseId)
    ? router.query.courseId[0]
    : router.query.courseId;
  const lessonId = Array.isArray(router.query.lessonId)
    ? router.query.lessonId[0]
    : router.query.lessonId;

  // Fallback: if lessonId missing, send back to course page instead of lesson page
  const backToLessonHref =
    courseId ? `/dashboard/${courseId}/${lessonId || ""}`.replace(/\/$/, "") : "/dashboard";

  // CTA style: like the logo (no background, yellow text)
  const cta =
    `text-yellow-400 hover:text-yellow-300 px-1 transition-colors ` +
    `${pressStart2P.className}`;

  return (
    <header className="bg-[#0D0E1D] text-white px-4 sm:px-6 py-4 flex items-center justify-between relative">
      {/* Left: Back only on lesson page */}
      <div className="flex items-center min-w-[80px]">
        {isLessonPage && (
          <button
            onClick={() => router.push(`/dashboard/${router.query.courseId}`)}
            className={cta}
            aria-label="Back to Course"
          >
            Back
          </button>
        )}
      </div>

      {/* Center: InvesTerra + mascot as a pure logo (not clickable) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 flex items-center text-yellow-400 text-lg sm:text-xl ${pressStart2P.className}`}
      >
        <img
          src="/assets/mascot.png"
          alt=""
          aria-hidden="true"
          className="w-6 h-6 mr-2"
        />
        InvesTerra
      </div>

      {/* Right: Home (or Back to Lesson on quiz), Dashboard (course/lesson), Logout (all except landing) */}
      <nav className="flex items-center gap-4 min-w-[80px] justify-end">
        {isQuizPage ? (
          <Link href={backToLessonHref} className={cta}>
            Back
          </Link>
        ) : (
          <Link href="/" className={cta}>
            Home
          </Link>
        )}

        {(isCoursePage || isLessonPage) && (
          <Link href="/dashboard" className={cta}>
            Dashboard
          </Link>
        )}

        {!isLanding && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={cta}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
