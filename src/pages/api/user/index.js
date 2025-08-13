// pages/api/progress/index.js
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { courseId } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { xp: true, level: true, progress: true }
    });

    // Example: Hardcoded stages for now, you can fetch from DB
    const stages = [
      { id: "stage1", lessonId: "lesson1", completed: user.progress?.stage1 || false, xpReward: 50 },
      { id: "stage2", lessonId: "lesson2", completed: user.progress?.stage2 || false, xpReward: 50 },
      { id: "stage3", lessonId: "lesson3", completed: user.progress?.stage3 || false, xpReward: 50 },
      { id: "stage4", lessonId: "lesson4", completed: user.progress?.stage4 || false, xpReward: 50 }
    ];

    return res.status(200).json({
      xp: user.xp,
      level: user.level,
      stages
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
