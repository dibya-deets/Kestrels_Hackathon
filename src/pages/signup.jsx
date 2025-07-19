'use client';

import { useState } from "react";
//import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import Image from "next/image";

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
    <main className="min-h-screen bg-gradient-to-br from-white to-indigo-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Image src="/assets/mascot.png" width={60} height={60} alt="Mascot" />
          <h1 className="text-2xl font-bold text-indigo-600 mt-2">InvesTerra</h1>
          <p className="text-sm text-gray-500">Start your financial adventure</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition">
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <p className="text-sm text-center mt-6">
          Already have an account? <a href="/sign_in" className="text-indigo-600 hover:underline">Sign in</a>
        </p>
      </div>
    </main>
  );
}
