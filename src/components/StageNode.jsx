"use client";
import { useState } from "react";

export default function StageNode({
  label,
  unlocked,
  completed,
  stageId,
  courseId,
  xpReward = 50,
  onClick,
  refreshProgress
}) {
  const [loading, setLoading] = useState(false);
  const [localCompleted, setLocalCompleted] = useState(completed);

  const handleComplete = async () => {
    if (!unlocked || localCompleted) return;
    setLoading(true);
    try {
      const res = await fetch("/api/progress/complete-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stageId, xpEarned: xpReward }),
      });

      if (res.ok) {
        setLocalCompleted(true);
        if (typeof refreshProgress === "function") {
          refreshProgress();
        }
      } else {
        console.error("Error completing stage:", await res.json());
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Stage Circle */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center
          ${localCompleted ? "bg-green-500" : unlocked ? "bg-yellow-400" : "bg-gray-500"}
          ${unlocked ? "cursor-pointer hover:scale-110 transition-transform" : "opacity-50 cursor-not-allowed"}`}
        onClick={unlocked ? onClick : undefined}
      >
        {localCompleted ? "✅" : label.split(" ")[1]}
      </div>

      {/* XP Button (only if unlocked and not completed) */}
      {unlocked && !localCompleted && (
        <button
          onClick={handleComplete}
          disabled={loading}
          className={`px-3 py-1 text-xs rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "..." : `+${xpReward} XP`}
        </button>
      )}
    </div>
  );
}
