"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RefreshCcw, Share2 } from "lucide-react";

interface RoastRevealProps {
  roast: string;
  onReset: () => void;
}

export default function RoastReveal({ roast, onReset }: RoastRevealProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + roast.charAt(index));
      index++;
      if (index === roast.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30); // Typing speed
    return () => clearInterval(interval);
  }, [roast]);

  // Determine if we should trigger a shake (on punctuation)
  const isPunctuation = (char: string) => /[.,!?]/.test(char);
  const lastChar = displayedText.slice(-1);
  const isShaking = isTyping && isPunctuation(lastChar);

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center min-h-[80vh] gap-10 w-full max-w-4xl mx-auto px-4 ${isShaking ? "animate-[flicker_0.1s_ease-in-out_2]" : ""}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full p-8 md:p-12 border-2 border-[#ff4d4d] bg-black shadow-[0_0_50px_rgba(255,77,77,0.15)] rounded-lg">
        <h2 className="absolute -top-4 left-8 bg-black px-4 text-[#ff4d4d] font-mono font-bold uppercase tracking-widest text-xl">
          Verdict
        </h2>
        <p className="text-xl md:text-3xl font-mono leading-relaxed text-gray-200">
          {displayedText}
          {isTyping && <span className="inline-block w-3 h-8 ml-1 bg-[#ff4d4d] animate-pulse align-middle"></span>}
        </p>
      </div>

      {!isTyping && (
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just got completely cooked: " + roast.substring(0, 100) + "... Try it at [YOUR_URL]")}`, "_blank")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 border border-zinc-700 hover:border-white text-white font-bold uppercase transition-colors rounded-md"
          >
            <Share2 className="w-5 h-5" />
            Share to X
          </button>
          
          <button 
            onClick={onReset}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#ff4d4d] text-black font-bold uppercase hover:bg-red-500 transition-colors rounded-md"
          >
            <RefreshCcw className="w-5 h-5" />
            Go Again
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
