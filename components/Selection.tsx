"use client";

import { motion } from "framer-motion";
import { Music, Crosshair } from "lucide-react";

interface SelectionProps {
  onSelect: (platform: "spotify" | "valorant") => void;
}

export default function Selection({ onSelect }: SelectionProps) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] gap-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold font-mono text-center text-flame uppercase">
        Choose Your Sacrifice
      </h2>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-4">
        <button 
          onClick={() => onSelect("spotify")}
          className="flex-1 p-12 flex flex-col items-center gap-6 border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 rounded-xl transition-all hover:border-[#ff4d4d] hover:shadow-[0_0_30px_rgba(255,77,77,0.2)] group"
        >
          <Music className="w-20 h-20 text-green-500 group-hover:text-[#ff4d4d] transition-colors" />
          <h3 className="text-3xl font-bold font-mono uppercase">Spotify</h3>
          <p className="text-gray-400 font-sans text-center">
            Let the AI roast your terrible music taste.
          </p>
        </button>

        <button 
          onClick={() => onSelect("valorant")}
          className="flex-1 p-12 flex flex-col items-center gap-6 border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 rounded-xl transition-all hover:border-[#ff4d4d] hover:shadow-[0_0_30px_rgba(255,77,77,0.2)] group"
        >
          <Crosshair className="w-20 h-20 text-red-500 group-hover:text-[#ff4d4d] transition-colors" />
          <h3 className="text-3xl font-bold font-mono uppercase">Valorant</h3>
          <p className="text-gray-400 font-sans text-center">
            Expose your hardstuck rank and KDA.
          </p>
        </button>
      </div>
    </motion.div>
  );
}
