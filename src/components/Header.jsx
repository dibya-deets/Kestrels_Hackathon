import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Header({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
const [exploreOpen, setExploreOpen] = useState(false);
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white shadow h-20">

        <div className="flex items-center gap-6">
         <div className="relative">
  <button
    onClick={() => setExploreOpen(!exploreOpen)}
    className="text-white text-base font-medium hover:underline focus:outline-none"
  >
    Explore ▼
  </button>

  {exploreOpen && (
    <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 border border-gray-200 shadow-md z-50 text-sm font-normal">
      <ul className="divide-y divide-gray-100">
        <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">🧠 Quizzes</li>
        <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">📘 Lessons</li>
        <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">🧩 Modules</li>
      </ul>
    </div>
  )}
</div>

          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded text-black w-64"
          />
        </div>
        <div className="flex items-center gap-2">
          <motion.img
            src="/assets/mascot.png"
            alt="Mascot"
            className="w-10 h-10"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <h1 className="text-2xl font-bold font-serif tracking-wide">InvesTerra</h1>
        </div>
        <div className="relative flex items-center gap-6">
          <div className="relative">
          <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="text-white text-base font-medium hover:underline focus:outline-none"
>
  {user.name.split(" ")[0]} ▾
</button>
           {menuOpen && (
  <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 border border-gray-200 shadow-md z-50 text-sm font-normal">
    <ul className="divide-y divide-gray-100">
      <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-indigo-700">Settings</li>
      <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-indigo-700">Help</li>
      <li
        className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-indigo-700"
        onClick={() => signOut({ callbackUrl: "/sign_in" })}
      >
        Logout
      </li>
    </ul>
  </div>
)}


          </div>
        </div>
      </header>

    <div className="bg-indigo-100 text-indigo-900 px-6 py-3 flex items-center justify-between text-sm font-medium border-t border-indigo-200">

        <span>Start leveling up your financial knowledge!</span>
        <div className="flex items-center gap-4">
          <span>Level 2</span>
          <div className="w-40 bg-white h-3 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-3" style={{ width: `${(user.xp / 500) * 100}%` }}></div>
          </div>
          <span>{user.xp} / 500 XP</span>
        </div>
      </div>
    </>
  );
}
