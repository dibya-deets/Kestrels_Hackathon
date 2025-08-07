import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (req.method === "GET") {
    // Return progress as number of completed lessons for locking logic
    const courseId = req.query.courseId; // optional filter
    let progressData = user.progress || {};

    if (courseId && progressData[courseId]) {
      return res.json({
        xp: user.xp,
        lessonsCompleted: progressData[courseId].lessonsCompleted || [],
        progressCount: progressData[courseId].lessonsCompleted.length,
      });
    }

    return res.json({
      xp: user.xp,
      progress: progressData,
    });
  }

  if (req.method === "POST") {
    const { course, lessonId, xpGained = 20 } = req.body;

    let current = user.progress || {};
    if (!current[course]) {
      current[course] = { lessonsCompleted: [], quizCompleted: false };
    }

    const alreadyDone = current[course].lessonsCompleted.includes(lessonId);

    if (!alreadyDone) {
      current[course].lessonsCompleted.push(lessonId);
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        progress: current,
        xp: alreadyDone ? user.xp : user.xp + xpGained,
      },
    });

    return res.json({
      xp: updated.xp,
      progress: updated.progress,
    });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
