import { motion } from "framer-motion";
import Link from "next/link";

export default function CityMap({ courseId, completedLessons }) {
  const lessons = [
    { id: "lesson1", title: "Intro to Crypto", x: 50, y: 50 },
    { id: "lesson2", title: "Blockchain Basics", x: 450, y: 50 },
    { id: "lesson3", title: "Wallets & Keys", x: 50, y: 300 },
    { id: "lesson4", title: "Crypto Markets", x: 450, y: 300 },
  ];

  const paths = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
  ];

  return (
    <svg width="500" height="350" className="bg-[#0D0E1D] rounded-lg">
      {/* Connecting Lines */}
      {paths.map((p, i) => {
        const isCompleted = completedLessons.length > Math.max(p.from, p.to);
        return (
          <line
            key={i}
            x1={lessons[p.from].x}
            y1={lessons[p.from].y}
            x2={lessons[p.to].x}
            y2={lessons[p.to].y}
            stroke={isCompleted ? "#4ade80" : "#555"}
            strokeWidth="4"
          />
        );
      })}

      {/* Lesson Nodes */}
      {lessons.map((lesson, i) => {
        const isUnlocked = i === 0 || completedLessons.includes(lessons[i - 1].id);
        return (
          <g key={lesson.id}>
            <circle
              cx={lesson.x}
              cy={lesson.y}
              r="20"
              fill={isUnlocked ? "#4ade80" : "#555"}
              stroke="#222"
              strokeWidth="3"
            />
            {isUnlocked ? (
              <Link href={`/dashboard/${courseId}/${lesson.id}`}>
                <text
                  x={lesson.x}
                  y={lesson.y - 35}
                  textAnchor="middle"
                  className="fill-green-300 cursor-pointer"
                >
                  {lesson.title}
                </text>
              </Link>
            ) : (
              <text
                x={lesson.x}
                y={lesson.y - 35}
                textAnchor="middle"
                className="fill-gray-400"
              >
                {lesson.title}
              </text>
            )}
          </g>
        );
      })}

      {/* Mascot */}
      <motion.image
        href="/mascot.png"
        x={lessons[completedLessons.length]?.x - 15 || lessons[0].x - 15}
        y={(lessons[completedLessons.length]?.y || lessons[0].y) - 50}
        height="30"
        width="30"
        transition={{ duration: 1 }}
      />
    </svg>
  );
}
