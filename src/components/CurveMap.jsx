"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CurveMap({ courseId, completedLessons = [], xp = 0, level = "Seedling" }) {
  const [xpOrbs, setXpOrbs] = useState([]);

  const lessons = [
    { id: "lesson1", title: "Intro to Crypto", x: 50,  y: 50,  requiredXP: 0,    xpReward: 50 },
    { id: "lesson2", title: "Blockchain Basics", x: 450, y: 50,  requiredXP: 50,  xpReward: 70 },
    { id: "lesson3", title: "Wallets & Keys", x: 50,  y: 300, requiredXP: 120, xpReward: 80 },
    { id: "lesson4", title: "Crypto Markets", x: 450, y: 300, requiredXP: 200, xpReward: 100 },
  ];

  const mascotX = lessons[completedLessons.length]?.x - 15 || lessons[0].x - 15;
  const mascotY = (lessons[completedLessons.length]?.y || lessons[0].y) - 50;

  const paths = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
  ];

  const getUnlockedStatus = (lesson, index) => {
    if (index === 0) return true;
    const prevLesson = lessons[index - 1];
    return completedLessons.includes(prevLesson.id) || xp >= lesson.requiredXP;
  };

  // Animate XP orbs when lesson is completed
  useEffect(() => {
    if (completedLessons.length > 0) {
      const lastCompleted = completedLessons[completedLessons.length - 1];
      const lesson = lessons.find(l => l.id === lastCompleted);
      if (lesson) {
        const newOrb = {
          id: Date.now(),
          startX: lesson.x,
          startY: lesson.y,
          endX: mascotX,
          endY: mascotY,
          xpValue: lesson.xpReward
        };
        setXpOrbs(prev => [...prev, newOrb]);
        setTimeout(() => {
          setXpOrbs(prev => prev.filter(o => o.id !== newOrb.id));
        }, 1200);
      }
    }
  }, [completedLessons]);

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
        const unlocked = getUnlockedStatus(lesson, i);
        const completed = completedLessons.includes(lesson.id);

        return (
          <g key={lesson.id}>
            <circle
              cx={lesson.x}
              cy={lesson.y}
              r="20"
              fill={completed ? "#4ade80" : unlocked ? "#facc15" : "#555"}
              stroke="#222"
              strokeWidth="3"
            />
            {unlocked ? (
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
                {lesson.title} 🔒
              </text>
            )}
          </g>
        );
      })}

      {/* XP Orbs Animation */}
      <AnimatePresence>
        {xpOrbs.map((orb) => (
          <motion.circle
            key={orb.id}
            cx={orb.startX}
            cy={orb.startY}
            r="6"
            fill="#FFD700"
            initial={{ cx: orb.startX, cy: orb.startY, opacity: 1 }}
            animate={{ cx: orb.endX, cy: orb.endY, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Mascot */}
      <motion.image
        href="/mascot.png"
        x={mascotX}
        y={mascotY}
        height="30"
        width="30"
        transition={{ duration: 1 }}
      />

      {/* Player XP & Level display */}
      <text x="20" y="330" fill="#fff" fontSize="14">
        XP: {xp} | Level: {level}
      </text>
    </svg>
  );
}
