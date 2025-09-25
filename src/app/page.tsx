'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showSparkles, setShowSparkles] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSparkles(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch('/api/opinion-count');
        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error('Failed to fetch opinion count:', err);
      }
    }
    fetchCount();
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br px-4 from-[#0b0f3a] via-[#1a1a3c] to-[#0d081f] text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-center px-4 md:px-12 py-4 backdrop-blur-sm bg-white/5 rounded-b-xl shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 object-cover rounded-full ring-2 ring-yellow-400"
          />
          <h1 className="text-xl md:text-2xl font-extrabold tracking-widest text-yellow-400 drop-shadow-lg select-none">
            SPARKTON
          </h1>
        </div>
      </header>

      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 w-[220px] h-[220px] bg-pink-600 opacity-30 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-indigo-700 opacity-25 blur-3xl rounded-full animate-ping" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-16 h-[90vh] max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
          style={{
            textShadow:
              '0 0 2px #000, 0 0 5px #000, 0 0 5px #000',
          }}
        >
          Launching Soon
          <br />
          <span className="text-yellow-400">Your New Learning Hub!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-10 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed text-yellow-100/90 drop-shadow-md"
        >
          Be part of our journey. Share your thoughts and help us shape the future of education.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.1, }}
          whileTap={{ scale: 0.95 }}
          className="z-10"
        >
          <Link href="/opinion">
            <button
              className="px-10 py-4 bg-yellow-500 text-black font-bold text-lg rounded-full shadow-xl
                         hover:bg-yellow-400 hover:shadow-[0_0_15px_3px_rgba(251,191,36,0.7)]
                         transition duration-300 ease-in-out cursor-pointer select-none"
            >
              🚀 I&apos;m Excited!
            </button>
          </Link>
        </motion.div>

        {count !== null && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 text-base sm:text-lg md:text-xl text-yellow-300 drop-shadow-lg"
          >
            {count === 0
              ? "Nobody is excited 😞"
              : `${count} ${count === 1 ? 'person is' : 'people are'} already excited! 🥳`}          </motion.p>
        )}

        {/* Sparkles */}
        {showSparkles && (
          <div className="absolute pointer-events-none select-none">
            {/* Smaller screens */}
            <div className="text-2xl sm:text-3xl md:hidden">
              <div className="absolute top-12 left-20 animate-pulse">✨</div>
              <div className="absolute top-28 right-20 animate-pulse">✨</div>

              <div className="absolute bottom-36 right-38 animate-bounce">🎊</div>
              <div className="absolute bottom-12 left-34 animate-pulse">🌟</div>
            </div>

            {/* Medium and up */}
            <div className="hidden md:block text-5xl">
              <div className="absolute top-16 left-14 animate-pulse">✨</div>
              <div className="absolute bottom-20 right-14 animate-bounce">🎊</div>
              <div className="absolute top-28 right-20 animate-pulse">🌟</div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
