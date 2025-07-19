'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Gamepad2 } from 'lucide-react'; 

const InvesTerraLanding = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [showFinnyIntro, setShowFinnyIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowFinnyIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50 text-gray-900 relative">
      {/* Hero Section */}
      <header className="w-full bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto text-center py-16 px-4">
         <div className="relative flex justify-center">
  <motion.img
    src="/assets/mascot.png"
    alt="Finny the Mascot"
    className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg"
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: [-10, 0, -10], opacity: 1 }}
    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
  />


            <AnimatePresence>
              {showFinnyIntro && (
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  Hi! I'm Finny! Your learning partner.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl font-extrabold"
          >
            InvesTerra
            <div className="mt-2">
              <span className="text-indigo-600">Finance Learning Made Fun</span>
            </div>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg sm:text-xl text-gray-700 max-w-xl mx-auto"
          >
            Learn finance in just a few minutes a day through gamified lessons and interactive challenges.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row sm:space-x-4 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/signup"> 
              <button className="mb-3 sm:mb-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg">
                Get Started
              </button>
            </Link>
            <Link href="/sign_in">
              <button className="border border-indigo-600 text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50">
                Already Have an Account
              </button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Gamified Features Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true }}
        className="w-full mt-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Track Progress */}
          <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-3">
              <svg className="w-8 h-8 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#E5E7EB" />
                <motion.circle 
                  cx="12" cy="12" r="10" fill="transparent" stroke="#4F46E5" strokeWidth="4"
                  strokeDasharray="62.8 62.8" 
                  strokeDashoffset="62.8"
                  whileInView={{ strokeDashoffset: 18.84 }} 
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <h3 className="text-xl font-semibold">Track Progress</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Visualize your learning journey with progress bars and milestones.
            </p>
            <div className="bg-gray-200 rounded-full h-2 w-full mb-2">
              <motion.div 
                className="h-2 rounded-full bg-indigo-500" 
                initial={{ width: '0%' }} 
                whileInView={{ width: '70%' }} 
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="text-sm text-gray-500">Level 3 of 5</div>
          </div>

          {/* Feature 2: Earn Badges */}
          <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-3">
              <svg className="w-8 h-8 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25l2.95 5.97 6.59.96-4.77 4.65 1.13 6.56L12 17.77l-5.9 3.11 1.13-6.56-4.77-4.65 6.59-.96L12 2.25z"/>
              </svg>
              <h3 className="text-xl font-semibold">Earn Badges</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Collect badges as you hit learning milestones and celebrate your achievements.
            </p>
            <div className="flex space-x-3">
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center shadow">
                ⭐
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center shadow">
                ⭐
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                className="w-10 h-10 rounded-full bg-yellow-600 text-white flex items-center justify-center shadow">
                ⭐
              </motion.div>
            </div>
          </div>

          {/* Feature 3: Interactive Simulations */}
          <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-shadow">
  <div className="flex items-center mb-3">
    <Gamepad2 className="w-8 h-8 text-green-600 mr-2" /> {/* Lucide icon here */}
    <h3 className="text-xl font-semibold">Interactive Simulations</h3>
  </div>
  <p className="text-gray-600 mb-4">
    Experience real-world finance scenarios in a game format. Learn by doing, not just reading.
  </p>
  <motion.div 
    className="text-green-600 font-semibold text-lg mt-4"
    initial={{ opacity: 0, y: 10 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
 Play. Learn. Grow — The InvesTerra Way.
  </motion.div>
</div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-gray-500">
        © 2025 InvesTerra. All rights reserved.
      </footer>

      {/* Cookie Consent Banner */}
        {showCookieBanner && (
        <div className="fixed bottom-0 inset-x-0 bg-gray-800 text-gray-100 text-sm py-4 px-6 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 z-50">
          <span>This site uses cookies to personalize your experience.</span>
          <div>
            <button
              onClick={() => setShowCookieBanner(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded mr-2"
            >
              Accept All
            </button>
            <button
              onClick={() => setShowCookieBanner(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded"
            >
              Reject All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvesTerraLanding;
