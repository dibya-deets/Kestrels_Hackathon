// src/components/ProfileCard.jsx
export default function ProfileCard({ user }) {
  return (
    <div className="p-4 bg-yellow-100 rounded shadow text-black font-pixel max-w-sm mx-auto mb-6">
      <h2 className="text-xl mb-2">👤 {user?.name || "Investor"}</h2>
      <p>Email: {user?.email}</p>
      <p>XP: {user?.xp || 0}</p>
      <p>Level: {user?.level || "Seedling"}</p>
    </div>
  );
}
