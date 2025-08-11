// pages/api/saveProgress.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"; // adjust path if your auth file lives elsewhere
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ ok: false, error: "Unauthenticated" });
    }

    const { progress } = req.body || {};
    if (!progress || typeof progress !== "object") {
      return res.status(400).json({ ok: false, error: "Invalid progress payload" });
    }

    // Get current progress to merge (so we never overwrite accidentally)
    const current = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { progress: true },
    });

    // Shallow merge: { ...existing, ...incoming }
    // If you save per-course, send payload like { [courseId]: { lessonsCompleted: [...] } }
    const mergedProgress = { ...(current?.progress || {}), ...progress };

    await prisma.user.update({
      where: { email: session.user.email },
      data: { progress: mergedProgress },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("saveProgress error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
