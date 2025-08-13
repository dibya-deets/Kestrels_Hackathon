'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Cloud from "@/components/cloud"; // AnimatedSky

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
    if (res?.error) setError("Invalid credentials");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <Cloud />

      {/* Optional dark tint */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Foreground card */}
      <div className="relative z-10 bg-[#fdf2b9] border-2 border-black pixel-card-shadow p-8 w-full max-w-md font-sans">
        <div className="flex flex-col items-center mb-6">
          <Image src="/assets/mascot.png" width={60} height={60} alt="Mascot" />
          <h1 className="text-xl font-pixel text-[#e0c000] mt-4">InvesTerra</h1>
          <p className="text-xs text-gray-600 font-sans text-center mt-1">
            Welcome back to your finance playground
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6f5cff] bg-white text-black placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6f5cff] bg-white text-black placeholder-gray-500"
          />
          <button type="submit" className="btn-start w-full">
            Sign In
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center font-sans">{error}</p>}

        <p className="text-xs text-gray-600 text-center mt-6 font-sans">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#e0c000] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
