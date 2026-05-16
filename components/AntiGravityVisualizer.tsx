"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AntiGravityVisualizerProps {
  particles: string[];
  onComplete: () => void;
}

export default function AntiGravityVisualizer({ particles, onComplete }: AntiGravityVisualizerProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only access window on the client side
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Transition to reveal after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // If window hasn't loaded sizes yet, don't try to render random positions that depend on it
  if (windowSize.width === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0a0a] z-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff4d4d]/10 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full h-full relative"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
           <h3 className="text-[#ff4d4d] font-mono text-xl tracking-[0.5em] uppercase opacity-50 animate-pulse">
             Isolating Targets
           </h3>
        </div>

        {particles.map((particle, index) => {
          // Generate random start/end coordinates across the screen
          const startX = Math.random() * (windowSize.width * 0.8) + (windowSize.width * 0.1);
          const startY = Math.random() * (windowSize.height * 0.8) + (windowSize.height * 0.1);
          
          const endX = startX + (Math.random() * 200 - 100);
          const endY = startY + (Math.random() * 200 - 100);

          return (
            <motion.div
              key={index}
              initial={{ 
                x: startX, 
                y: startY, 
                opacity: 0, 
                scale: 0.5,
                rotate: Math.random() * 90 - 45
              }}
              animate={{ 
                x: endX, 
                y: endY, 
                opacity: [0, 1, 1, 0], 
                scale: 1,
                rotate: Math.random() * 180 - 90
              }}
              transition={{ 
                duration: 4, 
                ease: "easeInOut",
                times: [0, 0.2, 0.8, 1]
              }}
              className="absolute inline-block px-4 py-2 border border-[#ff4d4d]/40 bg-black/60 backdrop-blur-md text-[#ff4d4d] font-mono font-bold whitespace-nowrap shadow-[0_0_15px_rgba(255,77,77,0.3)]"
            >
              {particle}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
