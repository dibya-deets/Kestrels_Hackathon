// pages/api/progress/complete-stage.js
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { stageId, xpEarned } = req.body;
  if (!stageId || !xpEarned) {
    return res.status(400).json({ error: "Missing stageId or xpEarned" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { xp: true, level: true, progress: true }
    });

    const updatedProgress = { ...user.progress, [stageId]: true };
    const newXP = user.xp + xpEarned;

    // Calculate new level (example: 100 XP per level)
    const newLevel = Math.floor(newXP / 100) + 1;

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        xp: newXP,
        level: newLevel,
        progress: updatedProgress
      }
    });

    return res.status(200).json({ xp: newXP, level: newLevel, progress: updatedProgress });
  } catch (error) {
    console.error("Error completing stage:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
