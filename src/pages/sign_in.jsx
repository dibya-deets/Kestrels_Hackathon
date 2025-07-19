'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
      redirect: true,
    });

    if (res?.error) {
      setError("Invalid credentials");
    }
    //  else if (res.ok) {
    //   router.push("/dashboard");
    // } 
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-indigo-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Image src="/assets/mascot.png" width={60} height={60} alt="Mascot" />
          <h1 className="text-2xl font-bold text-indigo-600 mt-2">InvesTerra</h1>
          <p className="text-sm text-gray-500">Welcome back to your finance playground</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="p-3  bg-indigo-600 hover: bg-indigo-600 text-white rounded transition">
            Sign In
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <p className="text-sm text-center mt-6">
          Don’t have an account? <a href="/signup" className=" text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </main>
  );
}
