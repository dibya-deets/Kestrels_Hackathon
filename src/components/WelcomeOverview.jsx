export default function WelcomeOverview({ user }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800">
        {user.isFirstLogin
          ? `Welcome to InvesTerra, ${user.name}!`
          : `Welcome back, ${user.name}!`}
      </h2>

      <p className="text-sm text-gray-600 mt-1">
        {user.isFirstLogin
          ? "Let’s kickstart your financial journey"
          : "Keep growing your investing skills "}
      </p>

      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-700">XP Progress</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
          <div
            className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(user.xp / 1000) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{user.xp} / 1000 XP</p>
      </div>

      <div className="mt-3 text-sm text-gray-700">
         Current Rank: <span className="font-semibold">{user.level}</span>
      </div>
    </div>
  );
}
