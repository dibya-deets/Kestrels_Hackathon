// components/LessonCard.jsx
import Link from "next/link";

export default function LessonCard({ course, href }) {
  return (
    <Link href={href}>
      <div className="bg-white text-black rounded-lg px-6 py-8 shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
        <h3 className="text-lg font-bold">{course.title}</h3>
        <p className="text-xs mt-1">{course.description}</p>
        <div className="mt-4 font-bold text-sm">XP</div>
      </div>
    </Link>
  );
}
