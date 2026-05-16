"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, Crosshair, Terminal, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface SelectionProps {
  onSelect: (platform: "spotify" | "valorant" | "github", accountId: string) => void;
}

export default function Selection({ onSelect }: SelectionProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"spotify" | "valorant" | "github" | null>(null);
  const [accountId, setAccountId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatform && accountId.trim()) {
      onSelect(selectedPlatform, accountId.trim());
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] gap-12 w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold font-mono text-center text-flame uppercase">
        {selectedPlatform ? "Target Lock" : "Choose Your Sacrifice"}
      </h2>

      <div className="w-full px-4 relative min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!selectedPlatform ? (
            <motion.div 
              key="platform-cards"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <button 
                onClick={() => setSelectedPlatform("spotify")}
                className="flex-1 p-12 flex flex-col items-center gap-6 border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 rounded-xl transition-all hover:border-[#ff4d4d] hover:shadow-[0_0_30px_rgba(255,77,77,0.2)] group"
              >
                <Music className="w-20 h-20 text-green-500 group-hover:text-[#ff4d4d] transition-colors" />
                <h3 className="text-3xl font-bold font-mono uppercase">Spotify</h3>
                <p className="text-gray-400 font-sans text-center">
                  Let the AI roast your terrible music taste.
                </p>
              </button>

              <button 
                onClick={() => setSelectedPlatform("valorant")}
                className="flex-1 p-12 flex flex-col items-center gap-6 border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 rounded-xl transition-all hover:border-[#ff4d4d] hover:shadow-[0_0_30px_rgba(255,77,77,0.2)] group"
              >
                <Crosshair className="w-20 h-20 text-red-500 group-hover:text-[#ff4d4d] transition-colors" />
                <h3 className="text-3xl font-bold font-mono uppercase">Valorant</h3>
                <p className="text-gray-400 font-sans text-center">
                  Expose your hardstuck rank and KDA.
                </p>
              </button>

              <button 
                onClick={() => setSelectedPlatform("github")}
                className="flex-1 p-12 flex flex-col items-center gap-6 border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 rounded-xl transition-all hover:border-[#ff4d4d] hover:shadow-[0_0_30px_rgba(255,77,77,0.2)] group"
              >
                <Terminal className="w-20 h-20 text-blue-500 group-hover:text-[#ff4d4d] transition-colors" />
                <h3 className="text-3xl font-bold font-mono uppercase">GitHub</h3>
                <p className="text-gray-400 font-sans text-center">
                  Get destroyed for your spaghetti code.
                </p>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="input-form"
              className="w-full max-w-md p-8 border border-[#ff4d4d] bg-[#110000] rounded-xl flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {selectedPlatform === "spotify" && <Music className="w-16 h-16 text-[#ff4d4d]" />}
              {selectedPlatform === "valorant" && <Crosshair className="w-16 h-16 text-[#ff4d4d]" />}
              {selectedPlatform === "github" && <Terminal className="w-16 h-16 text-[#ff4d4d]" />}
              
              <div className="text-center w-full">
                <h3 className="text-2xl font-bold font-mono uppercase text-[#ff4d4d] mb-2">
                  {selectedPlatform === "spotify" && "Enter Spotify ID"}
                  {selectedPlatform === "valorant" && "Enter Riot ID"}
                  {selectedPlatform === "github" && "Enter GitHub Username"}
                </h3>
                <p className="text-zinc-400 text-sm mb-6">
                  {selectedPlatform === "spotify" && "e.g., your username or profile link"}
                  {selectedPlatform === "valorant" && "e.g., TenZ#NA1"}
                  {selectedPlatform === "github" && "e.g., torvalds"}
                </p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  <input
                    type="text"
                    required
                    placeholder={
                      selectedPlatform === "spotify" 
                        ? "Spotify Username" 
                        : selectedPlatform === "valorant" 
                        ? "Riot ID #TAG" 
                        : "GitHub Username"
                    }
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="w-full bg-black border border-zinc-700 text-white p-4 rounded-md focus:border-[#ff4d4d] focus:outline-none transition-colors font-mono text-center"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 p-4 bg-[#ff4d4d] text-black font-bold uppercase hover:bg-red-500 transition-all rounded-md"
                  >
                    Sync Account
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>

              <button 
                onClick={() => setSelectedPlatform(null)}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mt-2 uppercase text-sm font-bold tracking-widest"
              >
                <ArrowLeft className="w-4 h-4" />
                Change Platform
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
