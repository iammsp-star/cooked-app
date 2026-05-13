"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingBurn() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] gap-8 w-full max-w-2xl mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-mono text-flame uppercase animate-pulse">
        Summoning the Flames...
      </h2>
      
      <div className="w-full h-8 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative">
        <motion.div 
          className="h-full bg-gradient-to-r from-orange-600 via-red-500 to-red-600 relative"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
        </motion.div>
      </div>
      
      <p className="text-gray-400 font-mono">
        {progress >= 100 ? "Ready to burn." : `Extracting data... ${Math.min(progress, 100)}%`}
      </p>
    </motion.div>
  );
}
