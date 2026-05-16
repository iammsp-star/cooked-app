"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { RefreshCcw, Share2, Share } from "lucide-react";
import { toBlob } from "html-to-image";

interface RoastRevealProps {
  roast: string;
  identity: string;
  data: any;
  onReset: () => void;
}

export default function RoastReveal({ roast, identity, data, onReset }: RoastRevealProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const roastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + roast.charAt(index));
      index++;
      if (index === roast.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [roast]);

  const isPunctuation = (char: string) => /[.,!?]/.test(char);
  const lastChar = displayedText.slice(-1);
  const isShaking = isTyping && isPunctuation(lastChar);

  const handleShareToStory = async () => {
    if (!roastRef.current) return;
    try {
      setIsSharing(true);
      // Generate blob
      const blob = await toBlob(roastRef.current, {
        cacheBust: true,
        backgroundColor: "#0a0a0a",
      });
      
      if (!blob) throw new Error("Failed to generate image blob");
      
      const file = new File([blob], "roast.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Sudo Burn Roast",
          text: "Check out my roast from Hellfire Terminal!",
          files: [file],
        });
      } else {
        // Fallback
        alert("Web Share API is not supported on this browser or device for sharing files.");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      alert("Failed to share image. See console for details.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto gap-8 font-mono pb-20 mt-8">
      
      {/* 1. The Typographic Roast Reveal (The Image Wrapper) */}
      <div 
        ref={roastRef}
        className="relative w-full aspect-[9/16] max-h-[70vh] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden border-y-4 border-[#ff4d4d] shadow-[0_0_50px_rgba(255,77,77,0.2)]"
      >
        {/* Anti-Gravity Particle Badges (Background Margins) */}
        <div className="absolute top-10 left-6 w-8 h-8 rounded-full bg-[#ff4d4d]/20 blur-sm animate-[pulse_4s_infinite_alternate]" />
        <div className="absolute bottom-32 right-8 w-12 h-12 rounded-full border border-[#ff4d4d]/30 rotate-45" />
        <div className="absolute top-1/4 right-10 w-6 h-6 border-b border-r border-[#ff4d4d]/40" />
        <div className="absolute bottom-1/4 left-8 text-[#ff4d4d]/20 font-bold text-4xl select-none">X</div>

        <motion.div 
          className={`relative z-10 w-11/12 p-8 border border-zinc-800 bg-black/80 backdrop-blur-sm rounded-lg ${isShaking ? "animate-[flicker_0.1s_ease-in-out_2]" : ""}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-4 left-0 right-0 flex justify-center">
             <div className="bg-black px-4 text-[#ff4d4d] font-bold uppercase tracking-widest text-lg border border-[#ff4d4d]">
               @{identity || "ANONYMOUS_USER"}
             </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-lg md:text-xl font-mono leading-relaxed text-gray-200 min-h-[200px]">
              {displayedText}
              {isTyping && <span className="inline-block w-3 h-6 ml-1 bg-[#ff4d4d] animate-pulse align-middle"></span>}
            </p>
          </div>
        </motion.div>
      </div>

      {!isTyping && (
        <motion.div 
          className="w-full flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 2. Viral Loop: Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full px-4">
            <button 
              onClick={handleShareToStory}
              disabled={isSharing}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#ff4d4d] text-black font-bold uppercase hover:bg-red-500 transition-all rounded-md disabled:opacity-50"
            >
              <Share className="w-5 h-5" />
              {isSharing ? "Generating..." : "Send to Story"}
            </button>
            <button 
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just got completely cooked by Hellfire Terminal: \n\n" + roast.substring(0, 150) + "...\n\n[YOUR_URL]")}`, "_blank")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 border border-zinc-700 hover:border-white text-white font-bold uppercase transition-colors rounded-md"
            >
              <Share2 className="w-5 h-5" />
              Share to X
            </button>
          </div>


          
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-6 py-3 mt-4 bg-transparent border-none text-zinc-500 hover:text-zinc-300 transition-colors uppercase text-sm font-bold"
          >
            <RefreshCcw className="w-4 h-4" />
            Start Over
          </button>
        </motion.div>
      )}
    </div>
  );
}
