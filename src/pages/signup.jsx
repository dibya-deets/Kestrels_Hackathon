"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Cloud from "@/components/cloud";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/sign_in");
    } else {
      setError("Error creating account.");
    }
  };

  return (
     <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
          {/* Animated background */}
          <Cloud />
              {/* Optional dark tint */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
<div className="flex items-center justify-center min-h-screen relative z-10">
      <div className="z-10 bg-[#fdf2b9] border-2 border-black pixel-card-shadow p-8 w-full max-w-md font-sans">
        <div className="flex flex-col items-center mb-6">
          <Image src="/assets/mascot.png" width={60} height={60} alt="Mascot" />
          <h1 className="text-xl font-pixel text-[#e0c000] mt-4">InvesTerra</h1>
          <p className="text-sm text-gray-600 font-sans text-center mt-1">
            Start your financial adventure
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6f5cff] bg-white text-black placeholder-gray-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6f5cff] bg-white text-black placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6f5cff] bg-white text-black placeholder-gray-500"
          />
          <button type="submit" className="btn-start w-full">Sign Up</button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center font-sans">{error}</p>}

        {/* Agreement + Privacy link (new) */}
        <p className="text-sm text-gray-800 text-center mt-3 font-sans">
          By signing up, I agree to InvesTerra’s{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e0c000] hover:text-yellow-300 hover:underline"
          >
            Privacy Policy
          </a>.
        </p>

        <p className="text-sm text-gray-800 text-center mt-3 font-sans">
          Already have an account?{" "}
          <a href="/sign_in" className="text-[#e0c000] hover:underline">Sign in</a>
        </p>
      </div>
    </div>
      </div>
  );
}
