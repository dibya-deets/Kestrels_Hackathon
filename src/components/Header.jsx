// components/Header.jsx

import Link from "next/link";
import { useRouter } from "next/router";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Header({ showBackButton }) {
  const router = useRouter();
  const isLessonPage = router.pathname.includes("/dashboard/") && router.pathname.split("/").length === 4;

  return (
    <header className="bg-[#0D0E1D] text-white px-4 sm:px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {showBackButton && isLessonPage && (
          <button
            onClick={() => router.push(`/dashboard/${router.query.courseId}`)}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm sm:text-base"
          >
            ← Back to Course
          </button>
        )}
        <Link href="/" legacyBehavior>
          <a className={`text-yellow-400 text-lg sm:text-xl ${pressStart2P.className}`}>
            InvesTerra
          </a>
        </Link>
      </div>
      <div className="flex space-x-6">
        <Link href="/" legacyBehavior>
          <a className={`text-yellow-400 text-sm sm:text-base ${pressStart2P.className}`}>Home</a>
        </Link>
        <Link href="/dashboard" legacyBehavior>
          <a className={`text-yellow-400 text-sm sm:text-base ${pressStart2P.className}`}>Dashboard</a>
        </Link>
      </div>
    </header>
  );
}
