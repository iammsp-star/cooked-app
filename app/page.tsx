"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Landing from "@/components/Landing";
import Selection from "@/components/Selection";
import LoadingBurn from "@/components/LoadingBurn";
import RoastReveal from "@/components/RoastReveal";
import AntiGravityVisualizer from "@/components/AntiGravityVisualizer";

type AppState = "landing" | "selection" | "syncing" | "weightless_drift" | "revealing";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [roastData, setRoastData] = useState<string>("");
  const [identity, setIdentity] = useState<string>("ANONYMOUS_USER");
  const [syncedMetrics, setSyncedMetrics] = useState<string[]>([]);
  const [backendReady, setBackendReady] = useState(false);

  const handleEnter = () => setAppState("selection");
  
  const handleSelect = async (platform: "spotify" | "valorant" | "github" | "linkedin", accountId: string) => {
    setIdentity(accountId);
    setBackendReady(false);
    
    // Set mock data based on platform to feed the Groq AI
    let tokenBadges: string[] = [];
    let platformData: Record<string, unknown> = {};
    
    if (platform === "spotify") {
      tokenBadges = ["Top Artist: Taylor Swift", "Pop", "Indie Rock", "Overplayed: Cruel Summer"];
      platformData = { status: "tragic", vibe: "unbearable", topArtist: "Taylor Swift", topGenre: "Pop" };
    } else if (platform === "valorant") {
      tokenBadges = ["Silver 2", "Jett Instalock", "35% Win Rate", "0.8 KDA"];
      platformData = { status: "critical", rank: "Silver 2", agent: "Jett", kda: "0.8" };
    } else if (platform === "github") {
      tokenBadges = ["500 Commits to Main", "0 Tests Written", "StackOverflow Pro", "Spaghetti Code"];
      platformData = { status: "unemployable", commits: 500, tests: 0, quality: "garbage" };
    } else if (platform === "linkedin") {
      tokenBadges = ["500+ Connections", "Synergistic Visionary", "Open to Work", "Buzzword Enjoyer"];
      platformData = { status: "cringe", connections: "500+", title: "Thought Leader", posts: "AI Generated" };
    }

    setSyncedMetrics(tokenBadges);
    // Transition straight to the visualizer while fetching in the background
    setAppState("weightless_drift");
    
    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: platformData, identity: accountId })
      });
      
      const result = await res.json();
      setRoastData(result.roast || "You broke the AI. Congratulations, you're officially un-roastable.");
    } catch {
      setRoastData("Connection to Hellfire Terminal lost. Your ego is safe... for now.");
    } finally {
      setBackendReady(true);
    }
  };

  const handleReset = () => {
    setRoastData("");
    setSyncedMetrics([]);
    setBackendReady(false);
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
          {appState === "syncing" && <LoadingBurn key="syncing" />}
          {appState === "weightless_drift" && (
            <AntiGravityVisualizer 
              key="drift" 
              particles={syncedMetrics} 
              backendReady={backendReady}
              onComplete={() => setAppState("revealing")} 
            />
          )}
          {appState === "revealing" && (
            <RoastReveal 
              key="reveal" 
              roast={roastData} 
              identity={identity} 
              onReset={handleReset} 
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
