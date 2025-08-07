// pages/dashboard.tsx or components/Dashboard.tsx
import AnimatedCard from "@/components/AnimatedCard";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      <AnimatedCard
        title="Course 1: Python"
        image="/images/python.png"
        description="Learn fundamentals with control flow, variables, and more"
      />
      {/* Add more cards */}
    </div>
  );
}
