// src/components/ProgressMap.jsx
import StageNode from "./StageNode";

export default function ProgressMap({ progress, onStageClick, courseId }) {
  const stages = [
    { id: "lesson-1", label: "Lesson 1" },
    { id: "lesson-2", label: "Lesson 2" },
    { id: "lesson-3", label: "Lesson 3" },
    { id: "lesson-4", label: "Lesson 4" },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Curve path SVG */}
      <svg className="w-full h-32">
        <path
          d="M 50 100 Q 150 0, 300 100 T 550 100"
          stroke="#FFD700"
          strokeWidth="4"
          fill="transparent"
        />
      </svg>

      {/* Lesson Nodes */}
      <div className="flex justify-between w-full px-10 -mt-28">
        {stages.map((stage, index) => {
          const unlocked = index === 0 || progress >= index;
          const completed = progress > index;

          return (
            <StageNode
              key={stage.id}
              label={stage.label}
              unlocked={unlocked}
              completed={completed}
              onClick={() => {
                if (unlocked) {
                  onStageClick(courseId, stage.id);
                } else {
                  alert("🔒 Complete previous lessons first!");
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
