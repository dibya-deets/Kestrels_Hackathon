// src/components/StageNode.jsx
export default function StageNode({ label, unlocked, completed, onClick }) {
  return (
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center 
        ${completed ? "bg-green-500" : unlocked ? "bg-yellow-400" : "bg-gray-500"}
        ${unlocked ? "cursor-pointer hover:scale-110 transition-transform" : "opacity-50 cursor-not-allowed"}`}
      onClick={unlocked ? onClick : undefined}
    >
      {completed ? "✅" : label.split(" ")[1]}
    </div>
  );
}
