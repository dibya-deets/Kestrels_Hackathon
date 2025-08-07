// src/pages/dashboard/[courseId]/map.jsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProgressMap from "@/components/ProgressMap";

export default function MapPage() {
  const router = useRouter();
  const { courseId } = router.query;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!courseId) return;
    fetch(`/api/user/progress?courseId=${courseId}`)
      .then(res => res.json())
      .then(data => setProgress(data.progressCount || 0));
  }, [courseId]);

  const handleStageClick = (courseId, lessonId) => {
    router.push(`/dashboard/${courseId}/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-700 text-white">
      <h1 className="text-3xl font-pixel text-center pt-10">
        Your InvesTerra Journey
      </h1>
      <ProgressMap
        progress={progress}
        onStageClick={handleStageClick}
        courseId={courseId}
      />
    </div>
  );
}
