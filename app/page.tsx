"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Landing from "@/components/Landing";
import Selection from "@/components/Selection";
import LoadingBurn from "@/components/LoadingBurn";
import RoastReveal from "@/components/RoastReveal";

type AppState = "landing" | "selection" | "loading" | "reveal";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [roastData, setRoastData] = useState<string>("");
  const [identity, setIdentity] = useState<string>("ANONYMOUS_USER");
  const [metricsData, setMetricsData] = useState<any>(null);

  const handleEnter = () => setAppState("selection");
  
  const handleSelect = async (platform: "spotify" | "valorant") => {
    setAppState("loading");
    
    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform })
      });
      
      const data = await res.json();
      setRoastData(data.roast || "You broke the AI. Congratulations, you're officially un-roastable.");
      setMetricsData(data.metrics || { status: "critical", damage: "high" });
      setIdentity(data.identity || "GUEST_" + Math.floor(Math.random() * 1000));
    } catch (error) {
      setRoastData("Connection to Hellfire Terminal lost. Your ego is safe... for now.");
    }
    
    setAppState("reveal");
  };

  const handleReset = () => {
    setRoastData("");
    setAppState("landing");
  };

  return (
    <main className="min-h-screen p-4 flex flex-col relative overflow-hidden bg-[#0a0a0a]">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff4d4d]/5 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      <header className="w-full max-w-7xl mx-auto py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-[#ff4d4d] font-mono font-bold tracking-widest text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff4d4d] animate-pulse" />
            HELLFIRE_TERMINAL_V1
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center relative z-10 w-full">
        <AnimatePresence mode="wait">
          {appState === "landing" && <Landing key="landing" onEnter={handleEnter} />}
          {appState === "selection" && <Selection key="selection" onSelect={handleSelect} />}
          {appState === "loading" && <LoadingBurn key="loading" />}
          {appState === "reveal" && <RoastReveal key="reveal" roast={roastData} identity={identity} data={metricsData} onReset={handleReset} />}
        </AnimatePresence>
      </div>
    </main>
  );
}
