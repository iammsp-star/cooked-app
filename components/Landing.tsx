"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface LandingProps {
  onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] gap-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-flame font-mono uppercase">
          Cooked
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-sans max-w-lg mx-auto">
          High-Stakes Ego Destruction. Offer your Spotify or Valorant data to the flames.
        </p>
      </div>

      <button 
        onClick={onEnter}
        className="group relative px-8 py-4 bg-transparent border-2 border-[#ff4d4d] text-[#ff4d4d] font-bold text-2xl uppercase tracking-widest overflow-hidden flame-effect transition-all rounded-md flex items-center gap-3"
      >
        <Flame className="w-6 h-6 group-hover:animate-pulse" />
        Enter The Pit
        <Flame className="w-6 h-6 group-hover:animate-pulse" />
      </button>
    </motion.div>
  );
}
