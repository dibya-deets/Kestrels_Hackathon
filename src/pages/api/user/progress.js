// src/pages/api/user/progress.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

/** ---- Level system (names you approved) ---- */
const LEVELS = [
  { minXP: 0,    name: "Newbie Trader" },
  { minXP: 200,  name: "Crypto Explorer" },
  { minXP: 500,  name: "Market Strategist" },
  { minXP: 1000, name: "Wealth Builder" },
  { minXP: 2000, name: "Finance Guru" },
];
function levelFromXP(xp) {
  let name = LEVELS[0].name;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXP) name = LEVELS[i].name;
    else break;
  }
  return name;
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, xp: true, level: true, progress: true, email: true, name: true },
  });
  if (!user) return res.status(404).json({ error: "User not found" });

  // ----- GET: return xp/level and (optionally) course progress -----
  if (req.method === "GET") {
    const { courseId } = req.query || {};
    const progress = user.progress || {};

    if (courseId) {
      const course = progress[courseId] || { lessonsCompleted: [] };
      return res.json({
        name: user.name,
        email: user.email,
        xp: user.xp || 0,
        level: user.level || levelFromXP(user.xp || 0),
        lessonsCompleted: course.lessonsCompleted || [],
        progressCount: (course.lessonsCompleted || []).length,
      });
    }

    return res.json({
      name: user.name,
      email: user.email,
      xp: user.xp || 0,
      level: user.level || levelFromXP(user.xp || 0),
      progress,
    });
  }

  // ----- POST: update xp/level + mark lesson complete -----
  if (req.method === "POST") {
    /**
     * Supports two shapes:
     * 1) Increment mode:
     *    { courseId, lessonId, xpGained?: number }
     * 2) Explicit set mode (from your new lesson page):
     *    { courseId, lessonId, xp: number, level?: string }
     */
    const {
      courseId,
      lessonId,
      xpGained,   // optional (increment mode)
      xp,         // optional (explicit set)
      level,      // optional (explicit set)
    } = req.body || {};

    if (!courseId || !lessonId) {
      return res.status(400).json({ error: "courseId and lessonId are required" });
    }

    // Prepare/merge progress JSON
    const progress = (user.progress && typeof user.progress === "object") ? { ...user.progress } : {};
    if (!progress[courseId]) progress[courseId] = { lessonsCompleted: [] };

    const alreadyCompleted = progress[courseId].lessonsCompleted.includes(lessonId);
    if (!alreadyCompleted) {
      progress[courseId].lessonsCompleted.push(lessonId);
    }

    // Decide new XP
    let newXP;
    if (Number.isFinite(xp)) {
      // Explicit override (from your client page)
      newXP = Math.max(0, Math.floor(xp));
    } else {
      // Increment mode (default +50 only if this lesson wasn’t already completed)
      const gain = Number.isFinite(xpGained) ? xpGained : 50;
      newXP = (user.xp || 0) + (alreadyCompleted ? 0 : gain);
    }

    // Decide new Level (string)
    const newLevel = level || levelFromXP(newXP);

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: newXP,
        level: newLevel,
        progress,
        // lastLogin is @updatedAt in your schema, so it'll bump automatically on update
      },
      select: { name: true, email: true, xp: true, level: true, progress: true },
    });

    return res.json(updated);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
