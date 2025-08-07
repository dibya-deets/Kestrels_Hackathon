import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const { courseId, stage } = req.body;

  await prisma.lessonProgress.upsert({
    where: {
      userId_courseId_stage: {
        userId: session.user.id,
        courseId,
        stage
      }
    },
    update: { completed: true, completedAt: new Date() },
    create: {
      userId: session.user.id,
      courseId,
      stage,
      completed: true
    }
  });

  res.json({ success: true });
}
