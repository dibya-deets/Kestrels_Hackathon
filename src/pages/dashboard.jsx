import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import Header from "../components/Header";


export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign_in",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      xp: true,
      level: true,
      createdAt: true,
      lastLogin: true,
    },
  });

  const isFirstLogin = user.createdAt.getTime() === user.lastLogin.getTime();

  return {
    props: {
      user: {
        name: user.name,
        xp: user.xp || 0,
        level: user.level || "Seedling",
        createdAt: user.createdAt.toISOString(),
        lastLogin: user.lastLogin.toISOString(),
        isFirstLogin,
      },
    },
  };
}

export default function DashboardPage({ user }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />

   <div className="p-6">
  <main className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-2">
      {user.isFirstLogin
        ? ` Welcome to InvesTerra, ${user.name}!`
        : `Welcome back, ${user.name}!`}
    </h2>
    <p className="text-gray-600 mb-6">
      {user.isFirstLogin
        ? "Start your journey by choosing a topic from Explore above."
        : "Keep growing your investing skills "}
    </p>

    <div className="border-t pt-4 text-gray-500 italic">
       Start a quiz or browse a lesson to begin earning XP!
    </div>
  </main>
</div>

    </div>
  );
}
